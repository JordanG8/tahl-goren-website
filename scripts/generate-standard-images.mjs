/**
 * Renders the six build-standard images for the calculator's "סטנדרט הבניה" step.
 *
 * The point of these images is a fair comparison, so they are not six unrelated
 * photographs. One base image is generated for the middle level, and the other
 * five are image-to-image edits of that exact file: same camera, same room, same
 * openings, same daylight. What changes is the finish — materials, fixtures,
 * joinery — and the furniture pieces themselves, because a frugal house and an
 * indulgent one genuinely do not own the same sofa. The arrangement stays fixed
 * so the visitor is comparing budgets, not floor plans.
 *
 * Run:  AI_GATEWAY_API_KEY=... node scripts/generate-standard-images.mjs
 * Then: convert to webp into public/images/standards/ (see README note below).
 *
 * Costs roughly one cent per image. Do not re-run casually — the committed
 * webp files in public/images/standards/ are the deliverable.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const KEY = process.env.AI_GATEWAY_API_KEY;
if (!KEY) {
  console.error('AI_GATEWAY_API_KEY is not set.');
  process.exit(1);
}

const MODEL = 'openai/gpt-image-2';
const OUT = 'scripts/.out/standards';
const SIZE = '1536x1024';

/** The middle level. Everything else is an edit of this file. */
const BASE_PROMPT = `Interior photograph of the open living-and-dining space of a contemporary
Israeli private house. Camera at standing eye level, one-point perspective looking toward a
large window wall opening to a garden. Bright Mediterranean daylight from the left.
In frame: sofa and coffee table in the foreground, dining table with chairs mid-ground,
kitchen counter along the right wall, plaster ceiling, stone-tiled floor.
Mid-range finish quality: solid but unremarkable materials, standard fixtures.
No people. No text, no lettering, no logos, no watermarks.

Style: soft matte architectural visualisation, diffuse light, low contrast, muted paper-like
palette of warm off-white, greige and terracotta accents, subtle materiality, no harsh
reflections. Understated and drawn-feeling rather than photographic.`;

/** Held constant across every edit, so only the budget reads as different. */
const LOCK = `Keep the exact same camera angle, framing, composition, perspective and room
geometry: identical wall positions, ceiling height, window and door openings, and the same
view of the same garden outside. Keep the same daylight direction, intensity and white
balance — the exposure must match exactly across versions.

Keep the same furniture ARRANGEMENT and types in the same places: a sofa with a coffee table
in the left foreground, a dining table with chairs in the centre against the window, a single
occasional chair to its right, and a kitchen counter run along the right-hand wall.

You SHOULD replace the individual furniture and lighting pieces with different designs
appropriate to the budget described below — different sofa, dining table, chairs, occasional
chair and pendant. Same role and position, different piece.
No people. No text, no lettering, no watermarks.`;

/** Keyed by the file name; the labels they map to live in houseCostCalculator.ts. */
const LEVELS = {
  modest: `Finish and furnish to a MODEST, FRUGAL budget: plain painted plaster walls, basic
    grey porcelain floor tiles, flat white laminate kitchen fronts with a thin laminate worktop,
    plain chrome fixtures, a simple surface-mounted shade. Furniture is inexpensive high-street:
    a plain fabric sofa, a simple rectangular table with basic chairs.`,
  basic: `Finish and furnish to a BASIC but sound budget: painted plaster walls, plain
    beige-grey ceramic floor tiles, simple white MDF kitchen fronts with a laminate worktop,
    standard fixtures. Furniture is entry-level but tidier: a plain upholstered sofa,
    a straightforward wooden table with simple chairs.`,
  improved: `Finish and furnish to an IMPROVED, above-standard budget: quality plaster with
    a light textured finish, good large-format porcelain floor tiles, sprayed MDF kitchen fronts
    with a quartz worktop, brushed fixtures, a tiled splashback. Furniture is mid-market design:
    a well-tailored fabric sofa, a solid oak table with comfortable upholstered chairs.`,
  high: `Finish and furnish to a HIGH, premium budget: fine micro-cement and stone-clad wall
    surfaces, large honed stone floor tiles, bespoke veneered joinery with a thick stone worktop,
    designer fixtures, integrated lighting. Furniture is premium: a generous designer sofa,
    a substantial stone or solid-timber table with designer chairs, a sculptural pendant.`,
  luxury: `Finish and furnish to a LUXURIOUS, INDULGENT budget: honed natural stone and fine
    micro-cement walls, large book-matched marble floor slabs, bespoke solid-oak joinery with a
    thick stone waterfall worktop, designer matte-black fixtures. Furniture is high-end designer:
    a deep sculptural upholstered sofa, a stone or burl-wood dining table with designer chairs,
    a statement sculptural pendant.`,
};

const bytes = async (item) =>
  item.b64_json
    ? Buffer.from(item.b64_json, 'base64')
    : Buffer.from(await (await fetch(item.url)).arrayBuffer());

async function post(path, body, headers = {}) {
  const res = await fetch(`https://ai-gateway.vercel.sh/v1/images/${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, ...headers },
    body,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const item = (await res.json()).data?.[0];
  if (!item) throw new Error('no image in response');
  return bytes(item);
}

mkdirSync(OUT, { recursive: true });

process.stdout.write('standard (base) ... ');
const base = await post(
  'generations',
  JSON.stringify({ model: MODEL, prompt: BASE_PROMPT, size: SIZE, n: 1 }),
  { 'Content-Type': 'application/json' },
);
writeFileSync(`${OUT}/standard.png`, base);
console.log('ok');

for (const [name, change] of Object.entries(LEVELS)) {
  process.stdout.write(`${name} ... `);
  const form = new FormData();
  form.append('model', MODEL);
  form.append('prompt', `${change}\n\n${LOCK}`);
  form.append('size', SIZE);
  form.append('image', new Blob([readFileSync(`${OUT}/standard.png`)], { type: 'image/png' }), 'base.png');
  writeFileSync(`${OUT}/${name}.png`, await post('edits', form));
  console.log('ok');
}

console.log(`\nWrote PNGs to ${OUT}/`);
console.log('Convert to webp before committing, e.g.:');
console.log(`  npx sharp-cli -i ${OUT}/*.png -o public/images/standards --format webp --width 1400`);
