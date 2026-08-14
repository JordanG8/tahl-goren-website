import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { quizQuestions } from "@/data/quizContent";
import { buildBaseline, fallbackNarrative } from "@/lib/report/baseline";
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

const VALID = new Map(quizQuestions.map((q) => [q.id, q]));

type Payload = {
  answers?: QuizAnswers;
  name?: string;
  email?: string;
  phone?: string;
  /** Honeypot. */
  website?: string;
};

/** Drops anything that is not a known question with known option values. */
function sanitiseAnswers(raw: QuizAnswers): QuizAnswers {
  const clean: QuizAnswers = {};
  for (const [key, value] of Object.entries(raw ?? {})) {
    const q = VALID.get(key);
    if (!q) continue;
    const allowed = new Set(q.options.map((o) => o.value));
    if (q.kind === "multi") {
      const list = (Array.isArray(value) ? value : [value]).filter((v) => allowed.has(v));
      if (list.length) clean[key] = list;
    } else {
      const single = Array.isArray(value) ? value[0] : value;
      if (typeof single === "string" && allowed.has(single)) clean[key] = single;
    }
  }
  return clean;
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

  const answers = sanitiseAnswers(body.answers ?? {});
  if (Object.keys(answers).length < 3) {
    return NextResponse.json({ error: "not_enough_answers" }, { status: 400 });
  }

  // 1. Numbers. Deterministic, never model-authored.
  const baseline = buildBaseline(answers);

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
  await storeLead(lead, answers, report);

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
  });
}
