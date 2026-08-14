import { packages } from "@/data/packagesContent";
import { describeAnswers } from "@/data/quizContent";
import type { QuizAnswers, Report } from "./schema";

/**
 * The deterministic half of the report.
 *
 * Every number a family sees is produced here, by arithmetic they could redo
 * themselves, from assumptions written down in this file. The model never
 * touches them. Two reasons:
 *
 *  1. These figures go out under a licensed architect's name. A hallucinated
 *     budget line is not a bad answer, it is a professional liability.
 *  2. The same inputs must always produce the same numbers, so Tal can stand
 *     behind a report a client waves at her three months later.
 *
 * The rates below are deliberately wide bands for a well-finished private home
 * in the northern Sharon / Menashe region, and every surface that displays them
 * says clearly that they are a preliminary estimate, not a quote.
 */

/** ₪ per built m², construction only (shell + finishes), before VAT. */
const RATE_PER_SQM = { low: 9_000, high: 12_000 };

/**
 * Consultants and reserve are single rates, not ranges.
 *
 * Applying a low-and-high percentage on top of an already-wide construction
 * band compounds the worst case against itself and produces a spread so broad
 * it stops being information. The genuine variable here is the build rate; the
 * rest scales with it.
 */
const CONSULTANTS_RATE = 0.07;
const RESERVE_RATE = 0.1;

/** Assumed built area per size bracket, in m². */
const SQM_BY_SIZE: Record<string, number> = {
  s: 130,
  m: 175,
  l: 225,
  xl: 285,
};

/** A renovation or an addition costs less than building the same area new. */
const PROJECT_FACTOR: Record<string, number> = {
  "new-build": 1,
  addition: 0.9,
  renovation: 0.62,
  exploring: 1,
};

/** Budget brackets, in ₪, used only to compare against the estimate. */
const BUDGET_BY_VALUE: Record<string, { low: number; high: number }> = {
  u1_2: { low: 0, high: 1_200_000 },
  "1_2to1_8": { low: 1_200_000, high: 1_800_000 },
  "1_8to2_5": { low: 1_800_000, high: 2_500_000 },
  o2_5: { low: 2_500_000, high: 4_500_000 },
};

const TRACK_BY_DESIGN: Record<string, (typeof packages)[number]["id"]> = {
  full: "total-design",
  core: "worthwhile",
  architecture: "basic",
  unsure: "worthwhile",
};

const round = (n: number) => Math.round(n / 10_000) * 10_000;

function first(answers: QuizAnswers, key: string): string | undefined {
  const v = answers[key];
  return Array.isArray(v) ? v[0] : v;
}

function buildTimeline(answers: QuizAnswers) {
  const project = first(answers, "project") ?? "new-build";
  const isSmallWork = project === "renovation" || project === "addition";

  // Straight from the scope line shared by all three packages; the construction
  // window narrows for a renovation or an addition.
  const steps = [
    {
      title: "בירורים מקדימים",
      duration: "2–4 שבועות",
      detail: "בדיקת המגרש, זכויות הבנייה והמגבלות התכנוניות — לפני שמשרטטים קו.",
    },
    {
      title: "תכנון מוקדם",
      duration: "1–2 חודשים",
      detail: "מהצרכים של המשפחה לתכנית: העמדה, חלוקת החללים והאופי של הבית.",
    },
    {
      title: "רישוי מלא",
      duration: isSmallWork ? "4–7 חודשים" : "6–9 חודשים",
      detail: "הגשה לוועדה, ריכוז היועצים והרשויות, עד קבלת היתר הבנייה ביד.",
    },
    {
      title: "תכניות עבודה 1:50",
      duration: "2–3 חודשים",
      detail: "תכניות מפורטות לביצוע, כתב כמויות וייעוץ בבחירת חומרי הגמר.",
    },
    {
      title: "ביצוע ופיקוח עליון",
      duration: isSmallWork ? "6–10 חודשים" : "12–18 חודשים",
      detail: "ביקורי פיקוח באתר לאורך הבנייה, עד תעודת גמר וכניסה הביתה.",
    },
  ];

  // Stages overlap in practice, so the total is not the sum of the parts.
  const totalLabel = isSmallWork ? "כשנה וחצי עד שנתיים" : "כשנתיים עד שנתיים וחצי";
  return { steps, totalLabel };
}

export function buildBaseline(answers: QuizAnswers): Omit<Report, "aiAuthored"> {
  const size = first(answers, "size") ?? "unknown";
  const project = first(answers, "project") ?? "new-build";
  const designAnswer = first(answers, "design") ?? "unsure";
  const budgetAnswer = first(answers, "budget");

  const sqm = SQM_BY_SIZE[size] ?? null;
  const factor = PROJECT_FACTOR[project] ?? 1;

  const trackId = TRACK_BY_DESIGN[designAnswer] ?? "worthwhile";
  const pkg = packages.find((p) => p.id === trackId) ?? packages[1];

  const lines: Report["costs"]["lines"] = [];
  let totalLow = 0;
  let totalHigh = 0;

  if (sqm) {
    const buildLow = round(sqm * RATE_PER_SQM.low * factor);
    const buildHigh = round(sqm * RATE_PER_SQM.high * factor);
    lines.push({
      label: "בנייה וגמר",
      low: buildLow,
      high: buildHigh,
      note: `${sqm} מ"ר לפי ${RATE_PER_SQM.low.toLocaleString("he-IL")}–${RATE_PER_SQM.high.toLocaleString("he-IL")} ₪ למ"ר`,
    });

    // Structural engineer, surveyor, soil, safety, committee fees and levies.
    const consultLow = round(buildLow * CONSULTANTS_RATE);
    const consultHigh = round(buildHigh * CONSULTANTS_RATE);
    lines.push({
      label: "יועצים, אגרות והיטלים",
      low: consultLow,
      high: consultHigh,
      note: "קונסטרוקטור, מודד, יועץ קרקע, בטיחות ואגרות ועדה",
    });

    lines.push({
      label: "תכנון אדריכלי וליווי",
      low: pkg.price,
      high: pkg.price,
      note: `מסלול ${pkg.name}, לפני מע"מ`,
    });

    const subtotalLow = buildLow + consultLow + pkg.price;
    const subtotalHigh = buildHigh + consultHigh + pkg.price;

    const reserveLow = round(subtotalLow * RESERVE_RATE);
    const reserveHigh = round(subtotalHigh * RESERVE_RATE);
    lines.push({
      label: "רזרבה",
      low: reserveLow,
      high: reserveHigh,
      note: "10%. הסעיף שהכי כדאי לא לוותר עליו",
    });

    totalLow = subtotalLow + reserveLow;
    totalHigh = subtotalHigh + reserveHigh;
  }

  let budgetVerdict: string | null = null;
  const stated = budgetAnswer ? BUDGET_BY_VALUE[budgetAnswer] : undefined;
  // The question asks what they set aside "לבנייה עצמה", so it is compared
  // against the construction line. Measuring a construction-only budget against
  // a total that also carries consultants, fees, the architect and a reserve
  // would tell almost everyone they are underfunded, which is not true and not
  // useful.
  const buildLine = lines.find((l) => l.label === "בנייה וגמר");
  if (stated && buildLine) {
    if (stated.high < buildLine.low) {
      budgetVerdict =
        "התקציב שייעדתם לבנייה נמוך מההערכה לבנייה בהיקף כזה. זה לגמרי פתיר — בדרך כלל על ידי התאמת השטח הבנוי או רמת הגמר — אבל עדיף לדעת את זה עכשיו ולא אחרי ההיתר. שימו לב גם שמעבר לבנייה עצמה יש יועצים, אגרות ורזרבה.";
    } else if (stated.low > buildLine.high) {
      budgetVerdict =
        "התקציב שייעדתם לבנייה נדיב ביחס להיקף שתיארתם. יש לכם מרווח אמיתי לרמת גמר גבוהה יותר, לשטח בנוי גדול יותר, או פשוט לרזרבה נוחה.";
    } else {
      budgetVerdict =
        "התקציב שייעדתם לבנייה נמצא בטווח ההערכה לבנייה בהיקף כזה. זו נקודת פתיחה בריאה — צריך רק לוודא שיש מעליו מקום ליועצים, לאגרות ולרזרבה.";
    }
  }

  return {
    headline: "בדיקת ההיתכנות שלכם",
    summary: "",
    profile: describeAnswers(answers),
    costs: {
      lines,
      total: { low: totalLow, high: totalHigh },
      perSqm: sqm
        ? { low: Math.round(totalLow / sqm), high: Math.round(totalHigh / sqm) }
        : null,
      assumedSqm: sqm,
      budgetVerdict,
    },
    timeline: buildTimeline(answers),
    track: {
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      priceWithVat: pkg.priceWithVat,
      subtitle: pkg.subtitle,
      reason: "",
    },
    recommendations: [],
    watchouts: [],
    readingList: [],
  };
}

/**
 * Prose for when the model is unavailable — no key, no credits, gateway down.
 *
 * A lead who filled in nine questions gets a real report either way. It is less
 * personal than the model's version, but it is correct, it is specific to the
 * answers, and it never leaves someone staring at an error page after they have
 * handed over their email address.
 */
export function fallbackNarrative(answers: QuizAnswers, base: Omit<Report, "aiAuthored">) {
  const worries = (answers.worries as string[]) ?? [];
  const project = first(answers, "project") ?? "new-build";
  const plot = first(answers, "plot");

  const recommendations: Report["recommendations"] = [];

  if (plot === "searching" || plot === "buying") {
    recommendations.push({
      title: "בדקו את המגרש לפני שחותמים",
      body: "זכויות בנייה, קווי בניין, טופוגרפיה וחיבורי תשתית משנים דרמטית מה אפשר לבנות ובכמה. בדיקה של כמה שעות לפני רכישה חוסכת שינויים יקרים אחר כך.",
    });
  }
  if (worries.includes("budget") || first(answers, "budget") === "unknown") {
    recommendations.push({
      title: "קבעו תקציב לפני שמשרטטים",
      body: "רוב חריגות התקציב לא נולדות באתר הבנייה אלא בהחלטה תכנונית שהתקבלה בלי לבדוק כמה היא עולה. תקציב שנקבע מראש הופך כל החלטה בהמשך לפשוטה יותר.",
    });
  }
  if (worries.includes("bureaucracy")) {
    recommendations.push({
      title: "אל תנהלו את הרישוי לבד",
      body: "אדריכלית מורשית היתר מגישה ומנהלת את התהליך מול הוועדה במקומכם. זה ההבדל בין לקבל עדכונים לבין לקבל משימות.",
    });
  }
  if (project === "exploring") {
    recommendations.push({
      title: "שיחה אחת תחסוך לכם חודשים",
      body: "בשלב הזה השאלה היא לא איך הבית ייראה אלא מה בכלל ריאלי עבורכם. פגישת היכרות קצרה עונה על זה בלי שתתחייבו לכלום.",
    });
  }
  recommendations.push({
    title: "תכננו בית שגדל עם המשפחה",
    body: "הצרכים של משפחה משתנים כל כמה שנים. תכנון גמיש — חדר שמשנה תפקיד, קומה שנפתחת בהמשך — עולה מעט מאוד בשלב התכנון והרבה מאוד אחריו.",
  });

  const watchouts: string[] = [];
  if (base.costs.budgetVerdict) watchouts.push(base.costs.budgetVerdict);
  watchouts.push(
    "ההערכות בדוח הזה מבוססות על טווחי עלות מקובלים באזור ועל התשובות שמסרתם. הן נועדו לתת סדר גודל, לא הצעת מחיר.",
  );
  if (first(answers, "timing") === "asap") {
    watchouts.push(
      "שלב הרישוי הוא הארוך ביותר ותלוי בוועדה המקומית — הוא כמעט תמיד הגורם שקובע מתי נכנסים הביתה.",
    );
  }

  return {
    headline: "בדיקת ההיתכנות שלכם",
    summary:
      "ריכזנו כאן הערכה ראשונית לפרויקט שתיארתם: סדר גודל של עלויות, לוח זמנים ריאלי לכל שלב, ומסלול הליווי שנראה מתאים לכם. זו נקודת פתיחה לשיחה — לא תחליף לה.",
    recommendations: recommendations.slice(0, 5),
    watchouts: watchouts.slice(0, 4),
    trackReason: `לפי מה שסימנתם לגבי עיצוב הפנים, ${base.track.name} הוא המסלול שמתאים ביותר. ${base.track.subtitle}.`,
    readingList: [] as Report["readingList"],
  };
}
