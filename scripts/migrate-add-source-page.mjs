#!/usr/bin/env node
/**
 * One-time migration: adds the source_page column to form_responses so
 * contact submissions can be traced back to the page that produced them.
 * The API route already falls back gracefully if this hasn't run yet,
 * so this is safe to run whenever Postgres env vars are available.
 *
 * Usage: node scripts/migrate-add-source-page.mjs
 * Requires POSTGRES_URL (or the other @vercel/postgres env vars) to be set,
 * e.g. via `vercel env pull` or running through `vercel dev`/`vercel exec`.
 */
import { sql } from "@vercel/postgres";

try {
  await sql`ALTER TABLE form_responses ADD COLUMN IF NOT EXISTS source_page TEXT;`;
  console.log("form_responses.source_page is present.");
} catch (err) {
  console.error("Migration failed:", err);
  process.exit(1);
}
