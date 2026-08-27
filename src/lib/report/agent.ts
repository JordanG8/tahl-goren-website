import { generateObject, generateText, stepCountIs, tool } from "ai";
import { z } from "zod";
import { articleSlugs, searchCorpus } from "./knowledge";
import { sanitise } from "./sanitise";
import { narrativeSchema, type Narrative, type QuizAnswers, type Report } from "./schema";

/**
 * The report's prose, written by a model that first reads Tal's own material.
 *
 * Runs on Vercel's AI Gateway. In a Vercel deployment the gateway authenticates
 * with the project's OIDC token automatically, so there is no key to manage;
 * locally, set AI_GATEWAY_API_KEY. Either way, if the gateway is unreachable or
 * unfunded the caller falls back to `fallbackNarrative` and the lead still gets
 * a complete report — see the note in baseline.ts.
 */

/**
 * Models to try, best first.
 *
 * The gateway exposes the current frontier models, but on a free AI Gateway
 * tier every one of them answers with a rate-limit error — only the older cheap
 * models are actually reachable. Hard-coding either choice is wrong: pinning a
 * frontier model breaks the feature today, and pinning a cheap one means the
 * reports stay mediocre forever after somebody tops up the account.
 *
 * So the chain is ordered by quality and simply degrades. The last two entries
 * are the ones a free tier can reach, which is what runs today; the moment
 * credits exist the first entry starts winning, with no code change. Setting
 * QUIZ_MODEL jumps the queue.
 */
const MODEL_CHAIN = [
  process.env.QUIZ_MODEL,
  "anthropic/claude-sonnet-5",
  "google/gemini-3.7-flash",
  "openai/gpt-4o-mini",
  "google/gemini-2.5-flash-lite",
].filter((m): m is string => Boolean(m));

/**
 * The model that last worked, remembered for the life of the process.
 *
 * Walking the chain costs a failed round-trip per unreachable model, and a
 * family is waiting on this request. Only the first request in a warm instance
 * pays that; the rest go straight to whatever answered last time.
 */
let preferredModel: string | null = null;

/**
 * Models known to be refusing us, and until when.
 *
 * Without this, an account whose whole chain is rate-limited pays ~4s per model
 * on *every* submission before falling back — a 20-second wait to produce a
 * report the deterministic path could have written instantly. Ten minutes is
 * long enough to stop the bleeding and short enough that topping up credits
 * takes effect while someone is still watching.
 */
const blockedUntil = new Map<string, number>();
const BLOCK_MS = 10 * 60 * 1000;

/** One attempt per model: a blocked model must fail fast, not retry into the timeout. */
const MAX_RETRIES = 1;

const SYSTEM = `את/ה עוזר/ת כתיבה של טל גורן, אדריכלית רשויה ומורשית היתר עם מעל 25 שנות ניסיון,
שמתמחה אך ורק בתכנון בתים פרטיים בשרון הצפוני, יישובי מנשה וחוף הכרמל.

התפקיד שלך: לכתוב את החלק המילולי של דוח היתכנות אישי למשפחה שמילאה שאלון קצר באתר.

כללים שאין לחרוג מהם:
- כתוב/כתבי בעברית בלבד, בגוף שני רבים ("אתם"), בטון חם, רגוע ומקצועי.
- אל תמציא/י מספרים. כל נתוני העלות, לוחות הזמנים והמחירים כבר חושבו בנפרד ומוצגים בדוח.
  אם את/ה מתייחס/ת לעלות או לזמן — התייחס/י אליהם כאל "ההערכה שבדוח" בלי לצטט ספרות חדשות.
- אל תבטיח/י תוצאות, אל תשתמש/י בסופרלטיבים שיווקיים ואל תלחץ/י על הקורא.
- אל תמציא/י שמות מאמרים או קישורים. השתמש/י אך ורק ב-slugs שהוחזרו מהכלי search_content.
- התייחס/י ספציפית לתשובות שהמשפחה נתנה. דוח גנרי הוא כישלון.
- אם המשפחה סימנה חשש מסוים — התייחס/י אליו ישירות ובראש סדר העדיפויות.

- הקפד/י על עברית תקינה. שים/י לב במיוחד לצורות כמו "לגודל" (ולא "להגודל").

הבחנה קריטית בין שני שדות:
- recommendations = פעולות שהמשפחה צריכה לעשות. כל כותרת מתחילה בפועל בלשון ציווי,
  למשל "בדקו את זכויות הבנייה", "קבעו תקציב לפני שמשרטטים". אף פעם לא שאלה, ואף פעם לא שם של מאמר.
- readingList = מאמרים קיימים באתר. רק כאן מופיעים שמות מאמרים.
דוח שבו ה-recommendations הן שמות מאמרים או שאלות — נחשב פסול.

לפני הכתיבה, השתמש/י בכלי search_content כדי לקרוא מה טל עצמה כתבה בנושאים הרלוונטיים
לתשובות של המשפחה, וכתוב/כתבי בהתאם לעמדות שלה.`;

type AgentInput = {
  answers: QuizAnswers;
  baseline: Omit<Report, "aiAuthored">;
  leadName: string;
};

function researchBrief({ baseline, leadName }: AgentInput) {
  const money = (low: number, high: number) =>
    low === high
      ? `${low.toLocaleString("he-IL")} ₪`
      : `${low.toLocaleString("he-IL")}–${high.toLocaleString("he-IL")} ₪`;

  const costLines = baseline.costs.lines
    .map((l) => `- ${l.label}: ${money(l.low, l.high)}`)
    .join("\n");

  return `שם הפונה: ${leadName || "לא נמסר"}

התשובות שנתנו בשאלון:
${baseline.profile.map((l) => `- ${l}`).join("\n")}

הנתונים שכבר חושבו (אל תשנה/י אותם, אל תצטט/י מהם ספרות חדשות):
${costLines}
- סה"כ הערכה: ${money(baseline.costs.total.low, baseline.costs.total.high)}
- משך כולל מוערך: ${baseline.timeline.totalLabel}
- מסלול הליווי שנבחר: ${baseline.track.name} — ${baseline.track.subtitle}
${baseline.costs.budgetVerdict ? `- השוואה לתקציב שציינו: ${baseline.costs.budgetVerdict}` : ""}`;
}

const searchTool = tool({
  description:
    "חיפוש בתוכן שטל גורן כתבה: מאמרים, עמודי אזור, מסלולי ליווי ושאלות נפוצות. " +
    "השתמש/י בו כדי למצוא את העמדות שלה בנושאים שרלוונטיים לתשובות המשפחה.",
  inputSchema: z.object({
    query: z.string().describe("מונחי חיפוש בעברית, למשל: תקציב בנייה חריגות"),
  }),
  execute: async ({ query }: { query: string }) => {
    const hits = searchCorpus(query, 4);
    return hits.map((d) => ({
      kind: d.kind,
      title: d.title,
      slug: d.slug ?? null,
      excerpt: d.text.slice(0, 1200),
    }));
  },
});

async function runWithModel(model: string, brief: string): Promise<Narrative> {
  // Step 1 — research. A tool loop over Tal's own writing, so the advice that
  // follows is grounded in her published positions rather than in generic
  // construction-industry priors.
  const research = await generateText({
    model,
    system: SYSTEM,
    maxRetries: MAX_RETRIES,
    stopWhen: stepCountIs(6),
    tools: { search_content: searchTool },
    prompt: `${brief}

בצע/י 2–4 חיפושים בתוכן של טל בנושאים שהכי רלוונטיים למשפחה הזו, ואז סכם/י
בנקודות: אילו עמדות של טל רלוונטיות כאן, ואילו מאמרים (עם ה-slug המדויק) כדאי להמליץ להם לקרוא.`,
  });

  // Step 2 — write. Structured output, so the shape is guaranteed and the
  // model cannot invent sections or slip numbers into places we do not render.
  const { object } = await generateObject({
    model,
    system: SYSTEM,
    maxRetries: MAX_RETRIES,
    schema: narrativeSchema,
    prompt: `${brief}

סיכום המחקר שביצעת בתוכן של טל (חומר גלם לשימושך בלבד — אין להעתיק ממנו את המבנה):
${research.text}

כתוב/כתבי כעת את החלק המילולי של הדוח.
חשוב: הטקסט נכתב ישירות לתוך מסמך מעוצב. כתוב/כתבי טקסט רץ בלבד —
בלי Markdown, בלי כוכביות, בלי סולמיות, בלי כותרות ובלי רשימות ממוספרות בתוך השדות.`,
  });

  // The model is told to cite only real slugs; this enforces it, because a
  // dead link in a PDF that lands in someone's inbox is not recoverable.
  const valid = articleSlugs();
  return sanitise({
    ...object,
    readingList: object.readingList.filter((r) => valid.has(r.slug)),
  });
}

export async function generateNarrative(input: AgentInput): Promise<Narrative> {
  const brief = researchBrief(input);
  const chain = preferredModel
    ? [preferredModel, ...MODEL_CHAIN.filter((m) => m !== preferredModel)]
    : MODEL_CHAIN;

  const now = Date.now();
  let lastError: unknown = null;

  for (const model of chain) {
    const blocked = blockedUntil.get(model);
    if (blocked && blocked > now) continue;

    try {
      const narrative = await runWithModel(model, brief);
      preferredModel = model;
      blockedUntil.delete(model);
      return narrative;
    } catch (err) {
      lastError = err;
      blockedUntil.set(model, Date.now() + BLOCK_MS);
      if (preferredModel === model) preferredModel = null;
      console.warn(
        `[quiz] model ${model} unavailable, falling through:`,
        err instanceof Error ? err.message.split("\n")[0] : err,
      );
    }
  }

  // Everything is either blocked or failing; the caller writes the report from
  // the deterministic path instead.
  throw lastError ?? new Error("all_models_blocked");
}
