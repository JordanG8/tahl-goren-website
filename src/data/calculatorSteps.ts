/**
 * Copy for the calculator's house-profile steps.
 *
 * The factors themselves are NOT here — they live in `houseCostCalculator.ts`,
 * ported from the office's workbook, and this file only ever refers to options
 * by their Hebrew label. Two sources for one number is how the page and the
 * office end up quoting different prices, so the labels below are the join key
 * and the figures stay in one place.
 *
 * Every option carries a `blurb`: the sentence shown over the visualisation
 * when that option is selected. A visitor choosing a finish level is committing
 * to a real difference in money, and "משופר" on its own does not tell them what
 * they are buying.
 */

export type StepId = "region" | "standard" | "roof" | "method";

export type StepOption = {
  /** Must match a label in the corresponding table in houseCostCalculator.ts. */
  label: string;
  /** Shown under the label — what this choice actually means on site. */
  blurb: string;
  /** Public path to the option's image, where the step is image-led. */
  image?: string;
};

export type Step = {
  id: StepId;
  eyebrow: string;
  title: string;
  hint?: string;
  options: StepOption[];
};

export const steps: Step[] = [
  {
    id: "region",
    eyebrow: "המיקום",
    title: "איפה אתם מתכננים לבנות?",
    hint: "המרחק מהמרכז משפיע על עלויות העבודה והחומרים — לא על איכות הבנייה.",
    options: [
      {
        label: "אזור המרכז",
        blurb:
          "גוש דן והסביבה. הביקוש לקבלנים גבוה, עלויות העבודה יקרות יותר, ולא פעם גם הגישה למגרש מורכבת יותר.",
      },
      {
        label: "אזור חדרה-גדרה",
        blurb:
          "הרצועה שבין חדרה לגדרה — השרון והשפלה. זהו קו הבסיס שכל שאר האזורים נמדדים ביחס אליו.",
      },
      {
        label: "פריפריה",
        blurb:
          "הצפון והדרום. עלויות העבודה נמוכות יותר, אך כדאי לקחת בחשבון הובלת חומרים למרחקים ארוכים.",
      },
    ],
  },
  {
    id: "standard",
    eyebrow: "רמת הגימור",
    title: "באיזו רמת גימור תרצו לבנות?",
    hint: "אותו בית, אותה זווית צילום — רק החומרים והריהוט מתחלפים.",
    options: [
      {
        label: "צנוע וסגפני",
        image: "/images/standards/modest.webp",
        blurb:
          "טיח צבוע, ריצוף פורצלן בסיסי, חזיתות מטבח מלמינציה וכלים סטנדרטיים. הכול פונקציונלי, בלי מותרות.",
      },
      {
        label: "בסיסי",
        image: "/images/standards/basic.webp",
        blurb:
          "אותו קו מחשבה, עם קצת יותר הקפדה: ריצוף קרמי נקי, חזיתות MDF לבנות ומשטח למינציה. מתאים כשהתקציב מיועד למקומות אחרים.",
      },
      {
        label: "סטנדרטי",
        image: "/images/standards/standard.webp",
        blurb:
          "קו האמצע, וגם נקודת הייחוס של התחשיב. חומרים טובים ומוצרי מדף איכותיים, בלי התאמות אישיות יקרות.",
      },
      {
        label: "משופר",
        image: "/images/standards/improved.webp",
        blurb:
          "טיח בגימור עשיר יותר, פורצלן גדול-ממדים, חזיתות צבועות ומשטח קוורץ. כאן כבר מרגישים את ההבדל במגע.",
      },
      {
        label: "גבוה",
        image: "/images/standards/high.webp",
        blurb:
          "מיקרו-בטון וחיפויי אבן, נגרות בהתאמה אישית, משטחי אבן ותאורה אינטגרלית. רמת פירוט שדורשת גם תכנון צמוד יותר.",
      },
      {
        label: "יוקרתי ומפנק",
        image: "/images/standards/luxury.webp",
        blurb:
          "אבן טבעית, שיש בהתאמת פסים, נגרות אלון מלא וכלים מעוצבים. כל פרט נבחר בנפרד — וזה בדיוק מה שמייקר.",
      },
    ],
  },
  {
    id: "roof",
    eyebrow: "הגג",
    title: "איזה גג מתאים לבית שלכם?",
    hint: "לפני שהגג הוא בחירה עיצובית, הוא החלטה הנדסית.",
    options: [
      {
        label: "גג שטוח",
        blurb:
          "הפשוט והזול מבין השלושה. משטח שימושי למערכות ולדודי שמש, ומחייב איטום קפדני ותחזוקה לאורך השנים.",
      },
      {
        label: "גג רעפים",
        blurb:
          "מחייב קונסטרוקציה משופעת, בידוד ועבודת רעפים — ולכן היקר מבין השלושה. מנקז מי גשם באופן טבעי.",
      },
      {
        label: "משולב שטוח ורעפים",
        blurb:
          "חלק שטוח למערכות וחלק משופע לחזית. מוסיף מורכבות בנקודות החיבור, אך עדיין זול מגג רעפים מלא.",
      },
    ],
  },
  {
    id: "method",
    eyebrow: "שיטת הבנייה",
    title: "באיזו שיטה ייבנה השלד?",
    hint: "ההחלטה משפיעה על לוח הזמנים ועל איכות הבידוד, לא רק על העלות.",
    options: [
      {
        label: "קונבנציונלית 'רגילה'",
        blurb:
          "בטון ובלוקים — השיטה המקובלת בישראל. רוב הקבלנים מכירים אותה היטב, ולכן קל יותר לתמחר ולהשוות הצעות.",
      },
      {
        label: "בניה מתקדמת",
        blurb:
          "רכיבים מתועשים עם בידוד משופר וסטיות קטנות יותר באתר. יקרה יותר בבנייה, וחוסכת באנרגיה לאורך השנים.",
      },
      {
        label: "GSB או ICF",
        blurb:
          "קירות מתבניות בידוד שנמזגות בבטון. בנייה מהירה ובידוד מצוין, אך פחות קבלנים בארץ מנוסים בשיטה.",
      },
    ],
  },
];
