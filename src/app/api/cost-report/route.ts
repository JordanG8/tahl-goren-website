import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { buildNarrative } from "@/lib/report/baseline";
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
import { renderReportPdf } from "@/lib/report/pdf";
import { deliverReport } from "@/lib/report/email";
import type { CalculatorAnswers, Report } from "@/lib/report/schema";

/**
 * Turns a completed calculator run into a report, a PDF and two emails.
 *
 * The ordering matters: the numbers are computed first and never depend on the
 * model, the model's prose is layered on top and is allowed to fail, and the
 * lead is stored before anything that can throw. A family that built their
 * house in the calculator and handed over their email gets a real document
 * even if delivery or rendering goes wrong.
 */

// Renders a PDF, stores the lead and sends two emails. All fast and all
// deterministic — the platform default of 10s is the only thing that is not
// enough.
export const maxDuration = 30;
export const runtime = "nodejs";

type Payload = {
  answers?: CalculatorAnswers;
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
function readSelections(raw: CalculatorAnswers): Selections | null {
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
  answers: CalculatorAnswers,
  report: Report,
) {
  try {
    // The table keeps its original name so the leads already captured under it
    // stay in one place; every row now comes from the cost calculator.
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
        ${JSON.stringify(answers)}, ${JSON.stringify(report)}, false
      )
    `;
    return true;
  } catch (err) {
    console.error("[cost-report] failed to store lead", err);
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
  const answers: CalculatorAnswers = { ...selections };

  // 1. Numbers. Straight from the workbook, never model-authored.
  const baseline = buildCalculatorBaseline(selections, rooms);

  // 2. Prose. Written from the same answers, by rule.
  //
  //    This used to call a language model. It does not any more: the whole
  //    point of this tool is that it is the office's calculator, and a
  //    calculator that phones a model is slower, costs money per submission,
  //    can fail, and can be argued with. Everything the report says is now
  //    derived from the visitor's own selections, so it is instant, free, and
  //    identical for identical input.
  const words = buildNarrative(selections, rooms, baseline);
  const report: Report = {
    ...baseline,
    headline: words.headline,
    summary: words.summary,
    recommendations: words.recommendations,
    watchouts: words.watchouts,
    readingList: words.readingList,
    track: { ...baseline.track, reason: words.trackReason },
  };

  const lead = { name, email, phone };

  // 3. Persist before doing anything else that can fail.
  await storeLead(lead, { ...answers, rooms: rooms.map((r) => `${r.type}|${r.size}|${r.floor}`) }, report);

  // 4. PDF, then delivery. A failure in either still returns the report, so the
  //    results screen renders and the visitor sees their answers were not lost.
  let pdf: Uint8Array | null = null;
  try {
    pdf = await renderReportPdf(report, lead);
  } catch (err) {
    console.error("[cost-report] pdf render failed", err);
  }

  let delivery: { leadEmailed: boolean; ownerNotified: boolean; error?: string } = {
    leadEmailed: false,
    ownerNotified: false,
    error: "not_attempted",
  };
  try {
    delivery = await deliverReport(report, lead, pdf);
    // A silent delivery failure is the worst kind: the visitor is told the
    // report is on its way, the owner never sees the lead, and nothing in the
    // logs says why. The provider's own error text is the only thing that
    // distinguishes "no key configured" from "sender not verified".
    if (!delivery.leadEmailed || !delivery.ownerNotified) {
      console.error(
        `[cost-report] delivery incomplete — lead:${delivery.leadEmailed} owner:${delivery.ownerNotified} ${delivery.error ?? ""}`,
      );
    }
  } catch (err) {
    console.error("[cost-report] delivery failed", err);
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
