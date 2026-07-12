import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  website?: string;
  sourcePage?: string;
};

const escapeHtml = (input: string) =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot check
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const sourcePage = (body.sourcePage ?? "").trim().slice(0, 200) || null;

  if (!name || !phone || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "message_too_long" }, { status: 400 });
  }

  // 1. Store in Database
  let dbStored = false;
  try {
    // source_page requires a migration: ALTER TABLE form_responses ADD COLUMN IF NOT EXISTS source_page TEXT;
    await sql`
      INSERT INTO form_responses (name, phone, email, message, source_page)
      VALUES (${name}, ${phone}, ${email}, ${message}, ${sourcePage})
    `;
    dbStored = true;
  } catch {
    // Falls back to the pre-migration schema so submissions still get captured
    // if the source_page column hasn't been added yet.
    try {
      await sql`
        INSERT INTO form_responses (name, phone, email, message)
        VALUES (${name}, ${phone}, ${email}, ${message})
      `;
      dbStored = true;
    } catch (dbErr2) {
      console.error("[contact] database insertion error", dbErr2);
    }
  }

  // 2. Send via Email (Resend)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "jordangoren1234@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Tal Goren Site <onboarding@resend.dev>";

  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
      <h2>פנייה חדשה מהאתר</h2>
      <p><strong>שם:</strong> ${escapeHtml(name)}</p>
      <p><strong>טלפון:</strong> ${escapeHtml(phone)}</p>
      <p><strong>אימייל:</strong> ${escapeHtml(email)}</p>
      <p><strong>הודעה:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      ${sourcePage ? `<p><strong>דף מקור:</strong> ${escapeHtml(sourcePage)}</p>` : ""}
    </div>
  `;

  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY not set — logging submission instead");
    console.log({ name, phone, email, message });
    return NextResponse.json({ ok: true, delivered: false, stored: dbStored });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `פנייה חדשה מהאתר - ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] resend error", res.status, detail);
      // Even if email fails, if it's stored in DB, we can return success
      if (dbStored) {
        return NextResponse.json({ ok: true, delivered: false, stored: true });
      }
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true, stored: dbStored });
  } catch (err) {
    console.error("[contact] resend exception", err);
    if (dbStored) {
      return NextResponse.json({ ok: true, delivered: false, stored: true });
    }
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
