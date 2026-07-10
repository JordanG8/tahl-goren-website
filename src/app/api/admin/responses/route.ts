import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pwd = searchParams.get("pwd");

  // Simple password check
  // You should set ADMIN_PASSWORD in your Vercel project environment variables.
  const expectedPwd = process.env.ADMIN_PASSWORD || "admin123"; 

  if (pwd !== expectedPwd) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await sql`
      SELECT id, name, phone, email, message, source_page, created_at
      FROM form_responses
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ responses: rows });
  } catch {
    // Falls back to the pre-migration schema so the panel still works
    // if source_page hasn't been added to form_responses yet.
    try {
      const { rows } = await sql`
        SELECT id, name, phone, email, message, created_at
        FROM form_responses
        ORDER BY created_at DESC
      `;
      return NextResponse.json({ responses: rows });
    } catch (err2) {
      console.error("Failed to fetch responses", err2);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }
}
