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
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Table 'form_responses' checked/created.");
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}
