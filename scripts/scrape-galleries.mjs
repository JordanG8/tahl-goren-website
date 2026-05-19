/**
 * Scrapes every completed project page on the old WordPress site
 * (talgoren.co.il) and writes the full image list per project to
 * src/data/projectGalleries.json — which the project pages render
 * as a per-house gallery.
 *
 * Run it from a machine/network that can reach talgoren.co.il:
 *
 *   node scripts/scrape-galleries.mjs
 *
 * Requires Node 18+ (uses global fetch). No external dependencies.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_DATA = join(ROOT, "src/data/siteData.ts");
const OUT = join(ROOT, "src/data/projectGalleries.json");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const EXCLUDE = /(logo|favicon|icon|avatar|placeholder|sprite|cropped-|loading|spinner|1x1|emoji)/i;
const IMG_RE =
  /https?:\/\/talgoren\.co\.il\/wp-content\/uploads\/[^\s"'<>\\)]+?\.(?:jpe?g|png|webp)/gi;

/** Extract { id, originalLink } for completed projects from siteData.ts. */
function readProjects() {
  const src = readFileSync(SITE_DATA, "utf8");
  const seg = src.split("projects: [")[1].split("],")[0];
  const re =
    /id:\s*"([^"]+)"[\s\S]*?originalLink:\s*"([^"]+)"[\s\S]*?status:\s*"([^"]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(seg))) {
    if (m[3] === "completed") out.push({ id: m[1], url: m[2] });
  }
  return out;
}

/** Collapse WordPress size variants (name-1024x683.jpg) to the best version. */
function pickBest(urls) {
  const groups = new Map();
  for (const url of urls) {
    if (EXCLUDE.test(url)) continue;
    const dim = url.match(/-(\d+)x(\d+)(?=\.\w+$)/);
    const canonical = url.replace(/-\d+x\d+(?=\.\w+$)/, "").replace(/-scaled(?=\.\w+$)/, "");
    const area = dim ? Number(dim[1]) * Number(dim[2]) : Infinity; // no suffix = original
    const prev = groups.get(canonical);
    if (!prev || area > prev.area) groups.set(canonical, { url, area });
  }
  return [...groups.values()].map((g) => g.url);
}

async function fetchHtml(url, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      if (i === tries) throw err;
      await new Promise((r) => setTimeout(r, i * 2000));
    }
  }
}

async function main() {
  const projects = readProjects();
  console.log(`Found ${projects.length} completed projects.\n`);
  const result = {};

  for (const { id, url } of projects) {
    try {
      const html = await fetchHtml(url);
      const found = [...new Set(html.match(IMG_RE) || [])];
      const images = pickBest(found);
      result[id] = images;
      console.log(`✓ ${id.padEnd(18)} ${images.length} images`);
    } catch (err) {
      result[id] = [];
      console.log(`✗ ${id.padEnd(18)} FAILED: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 800)); // be polite
  }

  writeFileSync(OUT, JSON.stringify(result, null, 2) + "\n");
  const total = Object.values(result).reduce((n, a) => n + a.length, 0);
  console.log(`\nWrote ${OUT} — ${total} images across ${projects.length} projects.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
