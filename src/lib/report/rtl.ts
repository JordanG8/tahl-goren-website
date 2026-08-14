import type { PDFFont, PDFPage, RGB } from "pdf-lib";
import bidiFactory from "bidi-js";

/**
 * Drawing Hebrew into a PDF.
 *
 * There are two reordering steps involved and getting either one wrong silently
 * scrambles the document:
 *
 *  1. A PDF content stream has no reading direction. Glyphs are painted in the
 *     order given, so a mixed Hebrew/number string has to be resolved from
 *     logical order into visual order by the Unicode bidirectional algorithm
 *     (UAX #9). `bidi-js` does that.
 *
 *  2. pdf-lib embeds custom fonts through fontkit, and fontkit's shaper detects
 *     the script of the string it is handed and *reverses the glyph run itself*
 *     for right-to-left scripts. So handing it an already-visual string reverses
 *     it a second time: "225 מ״ר" came out as "מ״ר 522", and "14 באוגוסט 2026"
 *     as "41 באוגוסט 6202" — Hebrew words looked plausible while every number in
 *     the document was backwards.
 *
 * The fix is to stop fighting step 2 and let it do its job: split the string
 * into single-direction runs, hand each run to fontkit in *logical* order, and
 * position the runs ourselves. fontkit reverses the Hebrew runs (correct) and
 * leaves the digit and Latin runs alone (also correct), and neither library
 * ever sees a string whose direction is ambiguous.
 *
 * Verified against Chromium's PDFium rendering of the output, compared with the
 * same strings laid out by the browser's own RTL engine.
 */

const bidi = bidiFactory();

type Run = { text: string; rtl: boolean };

/** Splits a string into runs, already ordered left-to-right on the page. */
export function bidiRuns(text: string): Run[] {
  if (!text) return [];

  const levels = bidi.getEmbeddingLevels(text, "rtl");
  const order = bidi.getReorderedIndices(text, levels);

  const runs: Run[] = [];
  let currentLevel: number | null = null;
  let bucket: number[] = [];

  const flush = () => {
    if (bucket.length === 0 || currentLevel === null) return;
    const rtl = currentLevel % 2 === 1;
    // Within a run the collected logical indices ascend for LTR and descend for
    // RTL. fontkit wants logical order either way, so RTL buckets are flipped
    // back before being turned into a string.
    const indices = rtl ? [...bucket].reverse() : bucket;
    runs.push({ text: indices.map((i) => text[i]).join(""), rtl });
    bucket = [];
  };

  for (const visualPos of order) {
    const level = levels.levels[visualPos];
    if (currentLevel !== null && level !== currentLevel) flush();
    currentLevel = level;
    bucket.push(visualPos);
  }
  flush();

  return runs;
}

export function measureBidiText(text: string, font: PDFFont, size: number): number {
  return bidiRuns(text).reduce((total, run) => total + font.widthOfTextAtSize(run.text, size), 0);
}

/**
 * Draws `text` with its right edge at `right`, which is the reading edge in
 * Hebrew. Returns the width drawn.
 */
export function drawBidiText(
  page: PDFPage,
  text: string,
  opts: { right: number; y: number; size: number; font: PDFFont; color: RGB },
): number {
  const runs = bidiRuns(text);
  const width = runs.reduce((t, r) => t + opts.font.widthOfTextAtSize(r.text, opts.size), 0);

  let x = opts.right - width;
  for (const run of runs) {
    page.drawText(run.text, {
      x,
      y: opts.y,
      size: opts.size,
      font: opts.font,
      color: opts.color,
    });
    x += opts.font.widthOfTextAtSize(run.text, opts.size);
  }
  return width;
}

/** Same, but anchored by its left edge — for figures set against the far margin. */
export function drawBidiTextLeft(
  page: PDFPage,
  text: string,
  opts: { left: number; y: number; size: number; font: PDFFont; color: RGB },
): number {
  const runs = bidiRuns(text);
  let x = opts.left;
  for (const run of runs) {
    page.drawText(run.text, {
      x,
      y: opts.y,
      size: opts.size,
      font: opts.font,
      color: opts.color,
    });
    x += opts.font.widthOfTextAtSize(run.text, opts.size);
  }
  return x - opts.left;
}
