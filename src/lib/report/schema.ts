import { z } from "zod";

/**
 * The shape of a feasibility report.
 *
 * Deliberately narrow. The model fills a form; it does not get to invent
 * sections, and it never supplies the numbers — those come from `baseline.ts`
 * and are merged in afterwards. That split is the whole safety story here: a
 * language model writing free-form currency figures into a document that goes
 * to a real family, under an architect's name, is not something to ship.
 */

export const moneyRangeSchema = z.object({
  low: z.number(),
  high: z.number(),
});

export const costLineSchema = z.object({
  label: z.string(),
  low: z.number(),
  high: z.number(),
  note: z.string().optional(),
});

export const timelineStepSchema = z.object({
  title: z.string(),
  duration: z.string(),
  detail: z.string(),
});

/** The parts the model is allowed to author: prose, tailored to the answers. */
export const narrativeSchema = z.object({
  headline: z
    .string()
    .describe(
      "כותרת קצרה לדוח, עד 7 מילים, בעברית. בלי המילה 'דוח' ובלי שם המשפחה — " +
        'תארי את מה שהם מתכננים. לדוגמה: "בית חדש על מגרש בבנימינה".',
    ),
  summary: z
    .string()
    .describe(
      "פסקה אחת, 3–4 משפטים, שמסכמת את המצב של המשפחה הזו ומה הצעד הבא. " +
        "פתח/י ישירות בעובדות שלהם, לא במשפט מוטיבציה כללי. " +
        "בעברית תקינה, חם ולא מאיים, בלי סופרלטיבים, בלי שבחים על המיקום ובלי הבטחות.",
    ),
  recommendations: z
    .array(
      z.object({
        title: z
          .string()
          .describe(
            'פעולה בלשון ציווי, עד 6 מילים. חייבת להתחיל בפועל. לדוגמה: "קבעו תקציב לפני שמשרטטים". ' +
              "אסור בשום אופן לנסח את הכותרת כשאלה ואסור שתהיה שם של מאמר.",
          ),
        body: z
          .string()
          .describe(
            "2–3 משפטים שמסבירים מה לעשות בפועל ולמה זה חשוב דווקא למשפחה הזו, " +
              "בהתבסס על התשובות הספציפיות שלהם. לא תיאור של מאמר.",
          ),
      }),
    )
    .min(3)
    .max(5)
    .describe(
      "המלצות פעולה מעשיות. זה לא רשימת קריאה — לרשימת הקריאה יש שדה נפרד בשם readingList.",
    ),
  watchouts: z
    .array(z.string())
    .min(2)
    .max(4)
    .describe("נקודות לשים לב אליהן, משפט אחד כל אחת, ספציפיות לתשובות"),
  trackReason: z
    .string()
    .describe(
      "2–3 משפטים שמסבירים למה מסלול הליווי שנבחר מתאים להם. חובה להזכיר את שם המסלול במפורש, " +
        "ולקשור אותו לתשובה שלהם על כמה מעיצוב הפנים הם רוצים שטל תיקח על עצמה.",
    ),
  readingList: z
    .array(
      z.object({
        title: z.string(),
        slug: z.string().describe("ה-slug המדויק של המאמר באתר"),
        why: z.string().describe("משפט אחד: למה דווקא הם צריכים לקרוא את זה"),
      }),
    )
    .max(3)
    .describe("מאמרים קיימים באתר שרלוונטיים להם. רק slugs שקיימים באמת."),
});

export type Narrative = z.infer<typeof narrativeSchema>;

/** The full report: deterministic numbers plus the model's prose. */
export type Report = {
  headline: string;
  summary: string;
  /** Free text the visitor gave us, echoed back for context. */
  profile: string[];
  costs: {
    lines: z.infer<typeof costLineSchema>[];
    total: z.infer<typeof moneyRangeSchema>;
    perSqm: z.infer<typeof moneyRangeSchema> | null;
    assumedSqm: number | null;
    /** Set when the visitor gave a budget we can compare against. */
    budgetVerdict: string | null;
  };
  timeline: {
    steps: z.infer<typeof timelineStepSchema>[];
    totalLabel: string;
  };
  track: {
    id: string;
    name: string;
    price: number;
    priceWithVat: number;
    subtitle: string;
    reason: string;
  };
  recommendations: { title: string; body: string }[];
  watchouts: string[];
  readingList: { title: string; slug: string; why: string }[];
};

export type QuizAnswers = Record<string, string | string[]>;

export type QuizLead = {
  name: string;
  email: string;
  phone?: string;
};
