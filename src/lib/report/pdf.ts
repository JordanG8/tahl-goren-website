import { PDFDocument, PDFFont, PDFPage, rgb, type RGB } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "node:fs";
import path from "node:path";
import { drawBidiText, drawBidiTextLeft, measureBidiText } from "./rtl";
import type { Report, QuizLead } from "./schema";

/**
 * The PDF report.
 *
 * Hebrew in a PDF is the hard part; see rtl.ts for the two reordering steps
 * involved and why naive approaches to either produce a document full of
 * backwards numbers. Everything here draws through those helpers.
 *
 * Fonts are vendored next to this file rather than fetched: this runs inside a
 * request a family is waiting on, and a font CDN is not a dependency worth
 * having there. Assistant is OFL-licensed; see fonts/LICENSE.txt.
 */

const A4 = { w: 595.28, h: 841.89 };
const MARGIN = 52;
const CONTENT_W = A4.w - MARGIN * 2;

const INK = rgb(0.18, 0.26, 0.31);
const INK_SOFT = rgb(0.35, 0.42, 0.46);
const INK_MUTE = rgb(0.58, 0.63, 0.66);
const CLAY = rgb(0.66, 0.44, 0.34);
const HAIRLINE = rgb(0.87, 0.84, 0.8);
const PAPER = rgb(0.984, 0.98, 0.973);

function fontPath(file: string) {
  // Resolved relative to this module so it works from .next output too. The
  // fonts directory is included via `outputFileTracingIncludes` in next.config.
  return path.join(process.cwd(), "src/lib/report/fonts", file);
}

type Fonts = { regular: PDFFont; semi: PDFFont; bold: PDFFont };

/** A cursor over a growing document, which starts a new page when it runs out. */
class Layout {
  doc: PDFDocument;
  fonts: Fonts;
  page: PDFPage;
  y: number;
  pageIndex = 1;

  constructor(doc: PDFDocument, fonts: Fonts) {
    this.doc = doc;
    this.fonts = fonts;
    this.page = this.newPage();
    this.y = A4.h - MARGIN - 30;
  }

  newPage() {
    const page = this.doc.addPage([A4.w, A4.h]);
    page.drawRectangle({ x: 0, y: 0, width: A4.w, height: A4.h, color: PAPER });
    return page;
  }

  /** Reserves vertical space, breaking to a new page if it will not fit. */
  need(height: number) {
    if (this.y - height < MARGIN + 40) {
      this.page = this.newPage();
      this.pageIndex += 1;
      this.y = A4.h - MARGIN;
    }
  }

  /** Draws one line, right-aligned (the reading edge in Hebrew). */
  line(
    text: string,
    opts: { font?: PDFFont; size?: number; color?: RGB; indent?: number } = {},
  ) {
    drawBidiText(this.page, text, {
      right: A4.w - MARGIN - (opts.indent ?? 0),
      y: this.y,
      size: opts.size ?? 11,
      font: opts.font ?? this.fonts.regular,
      color: opts.color ?? INK_SOFT,
    });
  }

  /**
   * Wraps and draws a paragraph. Wrapping happens on the *logical* string —
   * breaking a line after it has been reordered would scramble it.
   */
  paragraph(
    text: string,
    opts: { font?: PDFFont; size?: number; color?: RGB; indent?: number; leading?: number } = {},
  ) {
    const font = opts.font ?? this.fonts.regular;
    const size = opts.size ?? 11;
    const leading = opts.leading ?? size * 1.65;
    const maxWidth = CONTENT_W - (opts.indent ?? 0);

    const words = text.split(/\s+/).filter(Boolean);
    let current = "";
    const lines: string[] = [];
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (measureBidiText(candidate, font, size) > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);

    for (const l of lines) {
      this.need(leading);
      this.line(l, { ...opts, font, size });
      this.y -= leading;
    }
  }

  gap(h: number) {
    this.y -= h;
  }

  rule(color: RGB = HAIRLINE, width = CONTENT_W) {
    this.need(10);
    this.page.drawRectangle({
      x: A4.w - MARGIN - width,
      y: this.y,
      width,
      height: 0.75,
      color,
    });
    this.y -= 10;
  }

  heading(text: string, index?: string) {
    this.need(56);
    this.gap(14);
    if (index) {
      this.line(index, { font: this.fonts.semi, size: 9.5, color: CLAY });
      this.gap(14);
    }
    this.line(text, { font: this.fonts.bold, size: 17, color: INK });
    this.gap(10);
    this.rule();
    this.gap(6);
  }
}

const shekels = (n: number) => `${n.toLocaleString("he-IL")} ₪`;

function drawCover(L: Layout, report: Report, lead: QuizLead) {
  const { page, fonts } = L;

  // Ink band across the top, with the report title reversed out of it.
  page.drawRectangle({ x: 0, y: A4.h - 210, width: A4.w, height: 210, color: INK });
  page.drawRectangle({ x: 0, y: A4.h - 213, width: A4.w, height: 3, color: CLAY });

  drawBidiText(page, "דוח היתכנות אישי", {
    right: A4.w - MARGIN,
    y: A4.h - 108,
    size: 30,
    font: fonts.bold,
    color: rgb(1, 1, 1),
  });

  drawBidiText(page, "טל גורן · אדריכלות ועיצוב פנים", {
    right: A4.w - MARGIN,
    y: A4.h - 134,
    size: 12,
    font: fonts.regular,
    color: rgb(0.78, 0.82, 0.84),
  });

  const dateLine = `${lead.name ? `נערך עבור ${lead.name} · ` : ""}${new Date().toLocaleDateString(
    "he-IL",
    { day: "numeric", month: "long", year: "numeric" },
  )}`;
  drawBidiText(page, dateLine, {
    right: A4.w - MARGIN,
    y: A4.h - 172,
    size: 10,
    font: fonts.regular,
    color: rgb(0.68, 0.73, 0.76),
  });

  L.y = A4.h - 258;
}

function drawCosts(L: Layout, report: Report) {
  if (report.costs.lines.length === 0) return;

  L.heading("הערכת עלויות", "02");

  const colValue = 190; // width reserved for the range column, on the left
  for (const item of report.costs.lines) {
    L.need(34);
    L.line(item.label, { font: L.fonts.semi, size: 11.5, color: INK });

    const range =
      item.low === item.high ? shekels(item.low) : `${shekels(item.low)} – ${shekels(item.high)}`;
    drawBidiTextLeft(L.page, range, {
      left: MARGIN,
      y: L.y,
      size: 11.5,
      font: L.fonts.semi,
      color: INK,
    });
    L.y -= 15;
    if (item.note) {
      L.line(item.note, { size: 9.5, color: INK_MUTE });
      L.y -= 13;
    }
    L.gap(4);
    L.rule(HAIRLINE, CONTENT_W - colValue > 0 ? CONTENT_W : CONTENT_W);
  }

  // Total, emphasised.
  L.need(40);
  L.gap(6);
  L.line("סה\"כ הערכה", { font: L.fonts.bold, size: 13, color: INK });
  drawBidiTextLeft(L.page, `${shekels(report.costs.total.low)} – ${shekels(report.costs.total.high)}`, {
    left: MARGIN,
    y: L.y,
    size: 13,
    font: L.fonts.bold,
    color: CLAY,
  });
  L.y -= 20;

  if (report.costs.perSqm && report.costs.assumedSqm) {
    L.line(
      `לפי הנחת עבודה של ${report.costs.assumedSqm} מ"ר בנוי · ${shekels(report.costs.perSqm.low)}–${shekels(report.costs.perSqm.high)} למ"ר`,
      { size: 9.5, color: INK_MUTE },
    );
    L.y -= 16;
  }

  if (report.costs.budgetVerdict) {
    L.gap(8);
    L.paragraph(report.costs.budgetVerdict, { size: 10.5, color: INK_SOFT, indent: 14 });
  }

  L.gap(6);
  L.paragraph(
    'המספרים לעיל הם הערכה ראשונית בלבד, המבוססת על טווחי עלות מקובלים באזור ועל התשובות שמסרתם. הם נועדו לתת סדר גודל — לא הצעת מחיר, ולא התחייבות. המחיר בפועל נקבע לפי המגרש, רמת הגמר, תנאי השטח והצעות הקבלנים.',
    { size: 9, color: INK_MUTE },
  );
}

function drawTimeline(L: Layout, report: Report) {
  L.heading("לוח זמנים משוער", "03");

  for (const step of report.timeline.steps) {
    L.need(40);
    L.line(step.title, { font: L.fonts.semi, size: 11.5, color: INK });
    drawBidiTextLeft(L.page, step.duration, {
      left: MARGIN,
      y: L.y,
      size: 10.5,
      font: L.fonts.semi,
      color: CLAY,
    });
    L.y -= 15;
    L.paragraph(step.detail, { size: 10, color: INK_SOFT, leading: 15 });
    L.gap(6);
  }

  L.gap(2);
  L.line(`משך כולל משוער: ${report.timeline.totalLabel}`, {
    font: L.fonts.bold,
    size: 11.5,
    color: INK,
  });
  L.y -= 16;
  L.paragraph(
    "השלבים חופפים חלקית, ולכן המשך הכולל קצר מסכום השלבים. שלב הרישוי הוא המשתנה הגדול ביותר והוא תלוי בוועדה המקומית.",
    { size: 9, color: INK_MUTE },
  );
}

function drawFooters(doc: PDFDocument, fonts: Fonts) {
  const pages = doc.getPages();
  pages.forEach((page, i) => {
    drawBidiTextLeft(page, "talgoren.co.il · 052-8345799", {
      left: MARGIN,
      y: 30,
      size: 8,
      font: fonts.regular,
      color: INK_MUTE,
    });
    drawBidiText(page, `עמוד ${i + 1} מתוך ${pages.length}`, {
      right: A4.w - MARGIN,
      y: 30,
      size: 8,
      font: fonts.regular,
      color: INK_MUTE,
    });
    page.drawRectangle({
      x: MARGIN,
      y: 46,
      width: CONTENT_W,
      height: 0.5,
      color: HAIRLINE,
    });
  });
}

export async function renderReportPdf(report: Report, lead: QuizLead): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);

  const fonts: Fonts = {
    regular: await doc.embedFont(fs.readFileSync(fontPath("Assistant_400Regular.ttf")), {
      subset: true,
    }),
    semi: await doc.embedFont(fs.readFileSync(fontPath("Assistant_600SemiBold.ttf")), {
      subset: true,
    }),
    bold: await doc.embedFont(fs.readFileSync(fontPath("Assistant_700Bold.ttf")), {
      subset: true,
    }),
  };

  doc.setTitle("דוח היתכנות אישי — טל גורן אדריכלית");
  doc.setAuthor("טל גורן אדריכלית");
  doc.setSubject("הערכה ראשונית לתכנון ובניית בית פרטי");
  doc.setCreator("talgoren.co.il");

  const L = new Layout(doc, fonts);
  drawCover(L, report, lead);

  // 01 — the summary and what they told us.
  L.line(report.headline, { font: fonts.bold, size: 19, color: INK });
  L.gap(26);
  L.paragraph(report.summary, { size: 12, color: INK_SOFT, leading: 20 });

  L.heading("מה סיפרתם לנו", "01");
  for (const item of report.profile) {
    L.need(18);
    L.paragraph(`· ${item}`, { size: 10, color: INK_SOFT, leading: 16 });
  }

  drawCosts(L, report);
  drawTimeline(L, report);

  // 04 — recommended track.
  L.heading("מסלול הליווי שמתאים לכם", "04");
  L.line(report.track.name, { font: fonts.bold, size: 14, color: INK });
  L.y -= 20;
  L.paragraph(report.track.subtitle, { size: 11, color: INK_SOFT });
  L.gap(4);
  L.line(
    `${shekels(report.track.price)} לפני מע"מ · ${shekels(report.track.priceWithVat)} כולל מע"מ`,
    { font: fonts.semi, size: 11, color: CLAY },
  );
  L.y -= 20;
  if (report.track.reason) {
    L.paragraph(report.track.reason, { size: 11, color: INK_SOFT });
  }

  // 05 — recommendations.
  if (report.recommendations.length) {
    L.heading("מה כדאי לעשות עכשיו", "05");
    report.recommendations.forEach((rec, i) => {
      L.need(56);
      L.line(`${String(i + 1).padStart(2, "0")}`, { font: fonts.semi, size: 9.5, color: CLAY });
      L.y -= 15;
      L.line(rec.title, { font: fonts.semi, size: 12, color: INK });
      L.y -= 17;
      L.paragraph(rec.body, { size: 10.5, color: INK_SOFT, leading: 16.5 });
      L.gap(10);
    });
  }

  // 06 — watch-outs.
  if (report.watchouts.length) {
    L.heading("נקודות לשים לב אליהן", "06");
    for (const w of report.watchouts) {
      L.need(30);
      L.paragraph(`· ${w}`, { size: 10.5, color: INK_SOFT, leading: 16.5 });
      L.gap(6);
    }
  }

  // 07 — further reading.
  if (report.readingList.length) {
    L.heading("קריאה נוספת מהאתר", "07");
    for (const r of report.readingList) {
      L.need(38);
      L.line(r.title, { font: fonts.semi, size: 11, color: INK });
      L.y -= 15;
      L.paragraph(r.why, { size: 10, color: INK_SOFT, leading: 15 });
      L.line(`talgoren.co.il/articles/${r.slug}`, { size: 9, color: CLAY });
      L.y -= 16;
    }
  }

  // Closing.
  L.need(120);
  L.gap(16);
  L.rule(CLAY, 90);
  L.gap(8);
  L.paragraph(
    "הדוח הזה נועד לתת לכם נקודת פתיחה — לא להחליף שיחה. אשמח לשבת אתכם לפגישת היכרות ללא עלות, לעבור על המספרים האלה מול המגרש והצרכים האמיתיים שלכם, ולומר לכם בכנות מה ריאלי.",
    { size: 11, color: INK_SOFT, leading: 18 },
  );
  L.gap(6);
  L.line("טל גורן, אדריכלית רשויה ומורשית היתר", { font: fonts.semi, size: 11, color: INK });
  L.y -= 16;
  L.line("052-8345799 · tahl.goren.arch@gmail.com", { size: 10, color: INK_SOFT });

  drawFooters(doc, fonts);
  return doc.save();
}
