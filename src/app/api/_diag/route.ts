import { NextResponse } from "next/server";

// TEMPORARY diagnostic endpoint — remove before merging to main.
// Reports the state of the email provider credentials so delivery failures
// can be told apart from a missing key. Gated on DIAG_SECRET.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.DIAG_SECRET;
  const provided = new URL(request.url).searchParams.get("k");

  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const resend = process.env.RESEND_API_KEY ?? "";
  const brevo = process.env.BREVO_API_KEY ?? "";

  return NextResponse.json({
    resend: { present: Boolean(resend), length: resend.length, value: resend },
    brevo: { present: Boolean(brevo), length: brevo.length },
    contactTo: process.env.CONTACT_TO_EMAIL ?? null,
    contactFrom: process.env.CONTACT_FROM_EMAIL ?? null,
  });
}
