import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { fallbackNarrative } from "@/lib/report/baseline";
import { buildCalculatorBaseline } from "@/lib/report/calculatorBaseline";
import {
  BUILD_METHODS,
  FLOORS,
  REGIONS,
  ROOF_TYPES,
  ROOM_SIZES,
  ROOM_TYPES,
  MAX_ROOMS,
  STANDARDS,
  type RoomRow,
  type Selections,
} from "@/lib/houseCostCalculator";
import { generateNarrative } from "@/lib/report/agent";
import { renderReportPdf } from "@/lib/report/pdf";
import { deliverReport } from "@/lib/report/email";
import type { QuizAnswers, Report } from "@/lib/report/schema";

/**
 * Turns a completed quiz into a report, a PDF and two emails.
 *
 * The ordering matters: the numbers are computed first and never depend on the
 * model, the model's prose is layered on top and is allowed to fail, and the
 * lead is stored before anything that can throw. A family that filled in nine
 * questions and handed over their email gets a real document even when the AI
 * gateway is down, out of credits, or slow.
 */

// The agent does a tool loop plus a structured-output call, then renders a PDF.
// The platform default (10s) is not enough; 60s is the Hobby-plan ceiling.
export const maxDuration = 60;
export const runtime = "nodejs";

type Payload = {
  answers?: QuizAnswers;
  rooms?: RoomRow[];
  name?: string;
  email?: string;
  phone?: string;
  /** Honeypot. */
  website?: string;
};

/** Labels the client may send, taken from the workbook's own tables. */
const ALLOWED = {
  region: new Set(REGIONS.map((o) => o.label)),
  standard: new Set(STANDARDS.map((o) => o.label)),
  roof: new Set(ROOF_TYPES.map((o) => o.label)),
  method: new Set(BUILD_METHODS.map((o) => o.label)),
};
const ALLOWED_ROOM = new Set(ROOM_TYPES.map((r) => r.label));
const ALLOWED_SIZE = new Set(ROOM_SIZES.map((s) => s.label));
const ALLOWED_FLOOR = new Set(FLOORS.map((f) => f.id));

/**
 * The request is untrusted, and every value it carries is a key into a pricing
 * table. Anything not in the workbook is dropped rather than defaulted, so a
 * tampered payload cannot conjure a factor that does not exist.
 */
function readSelections(raw: QuizAnswers): Selections | null {
  const pick = (key: keyof typeof ALLOWED) => {
    const v = raw?.[key];
    const s = Array.isArray(v) ? v[0] : v;
    return typeof s === "string" && ALLOWED[key].has(s) ? s : null;
  };
  const region = pick("region");
  const standard = pick("standard");
  const roofType = pick("roof");
  const buildMethod = pick("method");
  if (!region || !standard || !roofType || !buildMethod) return null;
  return { region, standard, roofType, buildMethod };
}

function readRooms(raw: unknown): RoomRow[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (r): r is RoomRow =>
        !!r &&
        typeof r === "object" &&
        ALLOWED_ROOM.has((r as RoomRow).type) &&
        ALLOWED_SIZE.has((r as RoomRow).size) &&
        ALLOWED_FLOOR.has((r as RoomRow).floor),
    )
    .slice(0, MAX_ROOMS);
}

async function storeLead(
  lead: { name: string; email: string; phone: string },
  answers: QuizAnswers,
  report: Report,
) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        answers JSONB NOT NULL,
        report JSONB,
        ai_authored BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      INSERT INTO quiz_leads (name, email, phone, answers, report, ai_authored)
      VALUES (
        ${lead.name}, ${lead.email}, ${lead.phone},
        ${JSON.stringify(answers)}, ${JSON.stringify(report)}, ${report.aiAuthored}
      )
    `;
    return true;
  } catch (err) {
    console.error("[quiz] failed to store lead", err);
    return false;
  }
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (body.website && body.website.trim() !== "") {
    // Honeypot tripped — answer as if it worked, do nothing.
    return NextResponse.json({ ok: true, report: null });
  }

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const phone = (body.phone ?? "").trim().slice(0, 40);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const selections = readSelections(body.answers ?? {});
  if (!selections) {
    return NextResponse.json({ error: "not_enough_answers" }, { status: 400 });
  }

  const rooms = readRooms(body.rooms);
  if (rooms.length === 0) {
    return NextResponse.json({ error: "no_rooms" }, { status: 400 });
  }

  // Stored and shown as the visitor's answers.
  const answers: QuizAnswers = { ...selections };

  // 1. Numbers. Straight from the workbook, never model-authored.
  const baseline = buildCalculatorBaseline(selections, rooms);

  // 2. Prose. Best effort — the fallback is a complete report, not an apology.
  let report: Report;
  try {
    const narrative = await generateNarrative({ answers, baseline, leadName: name });
    report = {
      ...baseline,
      headline: narrative.headline,
      summary: narrative.summary,
      recommendations: narrative.recommendations,
      watchouts: narrative.watchouts,
      readingList: narrative.readingList,
      track: { ...baseline.track, reason: narrative.trackReason },
      aiAuthored: true,
    };
  } catch (err) {
    console.error("[quiz] narrative generation failed, using fallback", err);
    const fb = fallbackNarrative(answers, baseline);
    report = {
      ...baseline,
      headline: fb.headline,
      summary: fb.summary,
      recommendations: fb.recommendations,
      watchouts: fb.watchouts,
      readingList: fb.readingList,
      track: { ...baseline.track, reason: fb.trackReason },
      aiAuthored: false,
    };
  }

  const lead = { name, email, phone };

  // 3. Persist before doing anything else that can fail.
  await storeLead(lead, { ...answers, rooms: rooms.map((r) => `${r.type}|${r.size}|${r.floor}`) }, report);

  // 4. PDF, then delivery. A failure in either still returns the report, so the
  //    results screen renders and the visitor sees their answers were not lost.
  let pdf: Uint8Array | null = null;
  try {
    pdf = await renderReportPdf(report, lead);
  } catch (err) {
    console.error("[quiz] pdf render failed", err);
  }

  let delivery: { leadEmailed: boolean; ownerNotified: boolean; error?: string } = {
    leadEmailed: false,
    ownerNotified: false,
    error: "not_attempted",
  };
  try {
    delivery = await deliverReport(report, lead, pdf);
  } catch (err) {
    console.error("[quiz] delivery failed", err);
  }

  return NextResponse.json({
    ok: true,
    report,
    emailed: delivery.leadEmailed,
    hasPdf: pdf !== null,
    // The document travels back with the response as well as by email. A
    // missing mail provider, a bounced address or an over-eager spam filter
    // should not be able to swallow the one thing the visitor asked for.
    pdf: pdf ? Buffer.from(pdf).toString("base64") : null,
  });
}
