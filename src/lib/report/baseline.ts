import type { QuizAnswers, Report } from "./schema";

/**
 * Prose for when the model is unavailable — no key, no credits, gateway down.
 *
 * The numbers never come from here; they are computed in calculatorBaseline.ts
 * from the office's workbook. This file only supplies the words that would
 * otherwise have been written by the model, so a family that filled in the
 * whole flow still receives a complete, specific document rather than an
 * apology.
 */

function first(answers: QuizAnswers, key: string): string | undefined {
  const v = answers[key];
  return Array.isArray(v) ? v[0] : v;
}

export function fallbackNarrative(answers: QuizAnswers, base: Omit<Report, "aiAuthored">) {
  const standard = first(answers, "standard");
  const region = first(answers, "region");

  const recommendations: Report["recommendations"] = [
    {
      title: "קבעו תקציב לפני שמשרטטים",
      body: "רוב חריגות התקציב לא נולדות באתר הבנייה אלא בהחלטה תכנונית שהתקבלה בלי לבדוק כמה היא עולה. תקציב שנקבע מראש הופך כל החלטה בהמשך לפשוטה יותר.",
    },
    {
      title: "בדקו את זכויות הבנייה במגרש",
      body: "אחוזי בנייה, קווי בניין וגובה מותר קובעים כמה בית אפשר לבנות בפועל. כדאי לוודא שהתוכנית שאתם מדמיינים בכלל אפשרית לפני שמתקדמים.",
    },
  ];

  if (standard === "גבוה" || standard === "יוקרתי ומפנק") {
    recommendations.push({
      title: "סגרו מפרט טכני מוקדם",
      body: "ברמת גימור כזו רוב ההפרש בעלות מגיע מבחירת חומרים וכלים. מפרט מדויק לפני יציאה לקבלנים הופך את ההצעות להשוואות אמיתיות.",
    });
  } else {
    recommendations.push({
      title: "השוו הצעות על אותו מפרט",
      body: "הצעות קבלנים נראות שונות מאוד כשכל אחת מתמחרת מפרט אחר. אותו כתב כמויות לכולם הוא הדרך היחידה לדעת מי באמת זול יותר.",
    });
  }

  recommendations.push({
    title: "תכננו בית שגדל עם המשפחה",
    body: "הצרכים של משפחה משתנים כל כמה שנים. תכנון גמיש — חדר שמשנה תפקיד, קומה שנפתחת בהמשך — עולה מעט מאוד בשלב התכנון והרבה מאוד אחריו.",
  });

  const watchouts: string[] = [
    'ההערכה מבוססת על מקדמי התכנון של המשרד ועל החדרים שהרכבתם. היא נועדה לתת סדר גודל לתכנון תקציב מוקדם — לא הצעת מחיר.',
    "עלות הבנייה אינה כוללת מערכות מיוחדות (סולארי, חימום תת רצפתי, בריכה) ואינה כוללת ריהוט ואבזור.",
  ];
  if (region === "פריפריה") {
    watchouts.push(
      "בפריפריה עלות העבודה נמוכה יותר, אך כדאי לתקצב הובלת חומרים למרחקים ארוכים ולוודא זמינות של קבלנים באזור.",
    );
  }

  return {
    headline: "הערכת העלות שלכם",
    summary:
      "ריכזנו כאן הערכה ראשונית לבית שהרכבתם: עלות הבנייה לפי מקדמי המשרד, הסעיפים שנוספים מעליה, לוח זמנים ריאלי לכל שלב ומסלול הליווי שנראה מתאים. זו נקודת פתיחה לשיחה — לא תחליף לה.",
    recommendations: recommendations.slice(0, 5),
    watchouts: watchouts.slice(0, 4),
    trackReason: `לפי רמת הגימור שבחרתם, ${base.track.name} הוא המסלול שמתאים ביותר. ${base.track.subtitle}.`,
    readingList: [] as Report["readingList"],
  };
}
