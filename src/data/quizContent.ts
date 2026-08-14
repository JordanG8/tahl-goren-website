/**
 * The feasibility quiz.
 *
 * Every question here exists because the answer changes the advice. Nothing is
 * asked to profile the visitor or to pad the funnel — if a question would not
 * move the budget range, the timeline, or the recommended track, it is not in
 * the list. That is also what keeps it short enough to finish.
 *
 * `id` values are the contract between the wizard, the API, the AI prompt and
 * the PDF. Renaming one means updating all four.
 */

export type QuizOption = {
  value: string;
  label: string;
  /** Optional second line — used where the label alone would be ambiguous. */
  hint?: string;
};

export type QuizQuestion = {
  id: string;
  /** Shown above the question, small. */
  eyebrow: string;
  /** The question itself. */
  title: string;
  /** Optional reassurance under the question. */
  hint?: string;
  kind: "single" | "multi";
  options: QuizOption[];
  /** Allows the visitor to move on without answering. */
  optional?: boolean;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "project",
    eyebrow: "נתחיל מהגדול",
    title: "מה אתם מתכננים?",
    kind: "single",
    options: [
      { value: "new-build", label: "בית חדש על מגרש", hint: "בנייה מהיסוד" },
      { value: "addition", label: "תוספת בנייה", hint: "הרחבה לבית קיים" },
      { value: "renovation", label: "שיפוץ מקיף", hint: "שינוי פנימי משמעותי" },
      { value: "exploring", label: "עדיין בודקים", hint: "רוצים להבין מה אפשרי" },
    ],
  },
  {
    id: "plot",
    eyebrow: "המגרש",
    title: "יש לכם כבר מגרש?",
    hint: "אין תשובה נכונה — זה רק משנה מאיפה מתחילים.",
    kind: "single",
    options: [
      { value: "owned", label: "כן, בבעלותנו" },
      { value: "buying", label: "בתהליך רכישה" },
      { value: "searching", label: "עדיין מחפשים" },
      { value: "existing-home", label: "יש לנו בית קיים", hint: "מתכננים בו שיפוץ או תוספת" },
    ],
  },
  {
    id: "area",
    eyebrow: "איפה",
    title: "באיזה אזור?",
    kind: "single",
    options: [
      { value: "zichron", label: "זכרון יעקב והסביבה" },
      { value: "binyamina", label: "בנימינה־גבעת עדה" },
      { value: "pardes-hanna", label: "פרדס חנה־כרכור" },
      { value: "menashe", label: "יישובי מנשה", hint: "מאור, קציר, משמרות ועוד" },
      { value: "carmel-coast", label: "חוף הכרמל" },
      { value: "other", label: "אזור אחר" },
    ],
  },
  {
    id: "size",
    eyebrow: "הגודל",
    title: "איזה גודל בית אתם מדמיינים?",
    hint: "הערכה גסה מספיקה לגמרי.",
    kind: "single",
    options: [
      { value: "s", label: "עד 150 מ\"ר" },
      { value: "m", label: "150–200 מ\"ר" },
      { value: "l", label: "200–250 מ\"ר" },
      { value: "xl", label: "250 מ\"ר ומעלה" },
      { value: "unknown", label: "עוד לא יודעים" },
    ],
  },
  {
    id: "household",
    eyebrow: "מי גר בבית",
    title: "מי אמור לגור בבית הזה?",
    hint: "זה מה שקובע כמה הבית צריך להיות גמיש לאורך השנים.",
    kind: "single",
    options: [
      { value: "couple", label: "זוג" },
      { value: "young-family", label: "משפחה עם ילדים קטנים" },
      { value: "teen-family", label: "משפחה עם ילדים גדולים" },
      { value: "multigen", label: "שלושה דורות תחת קורת גג אחת" },
    ],
  },
  {
    id: "design",
    eyebrow: "עיצוב פנים",
    title: "כמה מעיצוב הפנים תרצו שאני אקח על עצמי?",
    hint: "זה ההבדל המרכזי בין מסלולי הליווי.",
    kind: "single",
    options: [
      { value: "full", label: "הכל, מקצה לקצה", hint: "כל חלל בבית מתוכנן ומעוצב" },
      { value: "core", label: "את המטבח וחדרי הרחצה", hint: "האזורים הטכניים והיקרים" },
      { value: "architecture", label: "רק את האדריכלות", hint: "את עיצוב הפנים נעשה בעצמנו" },
      { value: "unsure", label: "עוד לא החלטנו" },
    ],
  },
  {
    id: "budget",
    eyebrow: "התקציב",
    title: "מה התקציב שייעדתם לבנייה עצמה?",
    hint: "לא כולל מגרש. אם עוד לא יודעים — זה בסדר גמור, נעזור לכם להעריך.",
    kind: "single",
    options: [
      { value: "u1_2", label: "עד 1.2 מיליון ₪" },
      { value: "1_2to1_8", label: "1.2–1.8 מיליון ₪" },
      { value: "1_8to2_5", label: "1.8–2.5 מיליון ₪" },
      { value: "o2_5", label: "מעל 2.5 מיליון ₪" },
      { value: "unknown", label: "עוד לא יודעים" },
    ],
  },
  {
    id: "timing",
    eyebrow: "לוח זמנים",
    title: "מתי הייתם רוצים להיכנס לבית?",
    kind: "single",
    options: [
      { value: "asap", label: "כמה שיותר מהר" },
      { value: "1to2", label: "בעוד שנה־שנתיים" },
      { value: "2to3", label: "בעוד שנתיים־שלוש" },
      { value: "flexible", label: "גמישים, אין לחץ" },
    ],
  },
  {
    id: "worries",
    eyebrow: "בכנות",
    title: "מה הכי מדאיג אתכם בתהליך?",
    hint: "אפשר לבחור כמה שרוצים. זה מה שאתייחס אליו קודם כל בדוח.",
    kind: "multi",
    options: [
      { value: "budget", label: "שהתקציב יברח" },
      { value: "timeline", label: "שזה יימשך נצח" },
      { value: "bureaucracy", label: "הבירוקרטיה והוועדות" },
      { value: "start", label: "שאנחנו לא יודעים מאיפה מתחילים" },
      { value: "design", label: "שהבית לא ייצא כמו שדמיינו" },
      { value: "trust", label: "לא יודעים על מי אפשר לסמוך" },
    ],
  },
];

/** Human-readable labels, for the prompt, the PDF and the notification email. */
export function labelFor(questionId: string, value: string): string {
  const q = quizQuestions.find((x) => x.id === questionId);
  return q?.options.find((o) => o.value === value)?.label ?? value;
}

export function describeAnswers(answers: Record<string, string | string[]>): string[] {
  return quizQuestions
    .map((q) => {
      const raw = answers[q.id];
      if (raw === undefined || (Array.isArray(raw) && raw.length === 0)) return null;
      const text = Array.isArray(raw)
        ? raw.map((v) => labelFor(q.id, v)).join(", ")
        : labelFor(q.id, raw);
      return `${q.title} — ${text}`;
    })
    .filter((x): x is string => x !== null);
}
