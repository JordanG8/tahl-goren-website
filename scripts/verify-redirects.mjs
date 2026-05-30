#!/usr/bin/env node
/**
 * Verifies that every URL indexed in the OLD WordPress sitemap resolves to a
 * live page on the NEW site (no 404s, no redirect chains ending in an error).
 *
 * Usage:
 *   node scripts/verify-redirects.mjs                       # tests against the Vercel preview
 *   node scripts/verify-redirects.mjs https://talgoren.co.il   # tests against production after cutover
 *
 * Exit code is non-zero if any old URL ends in a non-2xx response, so it can
 * gate CI / a pre-cutover check.
 */

const OLD_ORIGIN = "https://talgoren.co.il";
const OLD_SITEMAP_INDEX = `${OLD_ORIGIN}/sitemap.xml`;
const TARGET = (process.argv[2] || "https://tahl-goren-website.vercel.app").replace(/\/$/, "");

const locsFrom = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

async function getXml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "redirect-verifier" } });
  if (!res.ok) throw new Error(`Failed to fetch sitemap ${url}: ${res.status}`);
  return res.text();
}

async function collectOldUrls() {
  const index = await getXml(OLD_SITEMAP_INDEX);
  const childSitemaps = locsFrom(index);
  const all = new Set();
  for (const sm of childSitemaps) {
    try {
      const xml = await getXml(sm);
      for (const u of locsFrom(xml)) all.add(u);
    } catch (e) {
      console.warn(`  ! could not read sub-sitemap ${sm}: ${e.message}`);
    }
  }
  return [...all];
}

async function checkUrl(oldUrl) {
  // Re-point the old URL's path onto the target host being tested.
  const path = oldUrl.replace(OLD_ORIGIN, "");
  const testUrl = `${TARGET}${path}`;
  try {
    const res = await fetch(testUrl, { redirect: "follow", headers: { "User-Agent": "redirect-verifier" } });
    return { path, status: res.status, finalUrl: res.url, ok: res.ok };
  } catch (e) {
    return { path, status: 0, finalUrl: "(network error)", ok: false, error: e.message };
  }
}

(async () => {
  console.log(`Old sitemap: ${OLD_SITEMAP_INDEX}`);
  console.log(`Testing against: ${TARGET}\n`);

  const oldUrls = await collectOldUrls();
  console.log(`Found ${oldUrls.length} indexed URLs in the old sitemap.\n`);

  const results = [];
  for (const u of oldUrls) results.push(await checkUrl(u));

  const failures = results.filter((r) => !r.ok);
  for (const r of results) {
    const flag = r.ok ? "OK " : "ERR";
    console.log(`[${flag}] ${r.status}  ${decodeURIComponent(r.path)}  ->  ${decodeURIComponent(r.finalUrl)}`);
  }

  console.log(`\n${results.length - failures.length}/${results.length} resolved successfully.`);
  if (failures.length) {
    console.error(`\n${failures.length} URL(s) did NOT resolve (404 / error):`);
    for (const f of failures) console.error(`   ${decodeURIComponent(f.path)} (status ${f.status})`);
    process.exit(1);
  }
  console.log("All old URLs resolve on the new site. ✅");
})();
