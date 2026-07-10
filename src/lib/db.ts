import { sql } from "@vercel/postgres";

export async function createFormResponsesTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS form_responses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        source_page TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    // Idempotent: patches tables created before source_page existed.
    await sql`ALTER TABLE form_responses ADD COLUMN IF NOT EXISTS source_page TEXT;`;
    console.log("Table 'form_responses' checked/created.");
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}
