import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Access to this route is gated server-side by middleware (HTTP Basic Auth).
// There is no in-handler password check and no query-string credential.
export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, name, phone, email, message, source_page, created_at
      FROM form_responses
      ORDER BY created_at DESC
    `;
    return NextResponse.json(
      { responses: rows },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    // Falls back to the pre-migration schema so the panel still works
    // if source_page hasn't been added to form_responses yet.
    try {
      const { rows } = await sql`
        SELECT id, name, phone, email, message, created_at
        FROM form_responses
        ORDER BY created_at DESC
      `;
      return NextResponse.json(
        { responses: rows },
        { headers: { "Cache-Control": "no-store" } }
      );
    } catch (err2) {
      console.error("Failed to fetch responses", err2);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }
}
