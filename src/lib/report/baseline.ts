import { FLOORS, type RoomRow, type Selections } from "@/lib/houseCostCalculator";
import type { Report } from "./schema";

/**
 * The report's words.
 *
 * The numbers are computed in calculatorBaseline.ts from the office's
 * workbook; this file supplies the prose that goes around them, chosen from
 * the same selections. It is written by rule rather than by a model, which is
 * the right shape for a calculator: instant, free, and identical for identical
 * input, with nothing that can hallucinate a figure or fail at three in the
 * morning.
 *
 * Every paragraph below is here because some specific answer selected it. A
 * report that says the same thing to a modest single-storey house and to a
 * luxury build with a basement is not advice, it is filler — so nothing
 * generic gets added just to make the page look fuller.
 */

type Words = {
  headline: string;
  summary: string;
  recommendations: Report["recommendations"];
  watchouts: string[];
  trackReason: string;
  readingList: Report["readingList"];
};

/**
 * The region, phrased to follow "בית ב…".
 *
 * Stripping "אזור " off the label and prefixing ב־ produces "בהמרכז", so the
 * inflected form is written out rather than derived.
 */
const REGION_IN: Record<string, string> = {
  "אזור המרכז": "במרכז",
  "אזור חדרה-גדרה": "באזור חדרה-גדרה",
  "פריפריה": "בפריפריה",
};

/** The roof label as a noun phrase, for "עם …". */
const roofPhrase = (label: string) =>
  label.startsWith("גג") ? label : `גג ${label}`;

/** Articles that exist on the site, keyed to the answer that makes them relevant. */
const READING: Record<string, { title: string; slug: string; why: string }> = {
  budget: {
    title: "עלויות בנייה ותקציב",
    slug: "building-costs-budget-2026",
    why: "פירוט של הסעיפים שמרכיבים את התקציב, ואיפה הוא בדרך כלל נשבר.",
  },
  advisors: {
    title: "היועצים שצריך בדרך",
    slug: "required-advisors",
    why: "מי הם היועצים שנוספים לאדריכלית, ומתי כל אחד נכנס לתמונה.",
  },
  rooms: {
    title: "הבית שעובד בשבילכם",
    slug: "rooms-intro",
    why: "איך מחליטים כמה חדרים באמת צריך, ובאיזה גודל.",
  },
};

export function buildNarrative(
  selections: Selections,
  rooms: RoomRow[],
  base: Report,
): Words {
  const { region, standard, roofType, buildMethod } = selections;
  const hasBasement = rooms.some((r) => r.floor === "basement");
  const hasAttic = rooms.some((r) => r.floor === "attic");
  const floors = FLOORS.filter((f) => rooms.some((r) => r.floor === f.id));
  const lavish = standard === "גבוה" || standard === "יוקרתי ומפנק";
  const frugal = standard === "צנוע וסגפני" || standard === "בסיסי";

  const recommendations: Report["recommendations"] = [
    {
      title: "קבעו תקציב לפני שמשרטטים",
      body: "רוב חריגות התקציב לא נולדות באתר הבנייה אלא בהחלטה תכנונית שהתקבלה בלי לבדוק כמה היא עולה. תקציב שנקבע מראש הופך כל החלטה בהמשך לפשוטה יותר.",
    },
    {
      title: "בדקו את זכויות הבנייה במגרש",
      body: `אחוזי בנייה, קווי בניין וגובה מותר קובעים כמה בית אפשר לבנות בפועל. הבית שהרכבתם משתרע על ${floors.length === 1 ? "קומה אחת" : `${floors.length} קומות`} — כדאי לוודא שזה אפשרי במגרש שלכם לפני שמתקדמים.`,
    },
  ];

  if (hasBasement) {
    recommendations.push({
      title: "התייחסו למרתף מוקדם",
      body: "מרתף הוא ההחלטה היקרה ביותר בתוכנית, בגלל עבודות העפר, הדיפון והאיטום. הוא גם דורש החלטות מוקדמות על אוורור ועל הכנסת אור טבעי, שקשה להוסיף בדיעבד.",
    });
  }

  if (lavish) {
    recommendations.push({
      title: "סגרו מפרט טכני מוקדם",
      body: "ברמת הגימור שבחרתם רוב ההפרש בעלות מגיע מבחירת חומרים וכלים. מפרט מדויק לפני יציאה לקבלנים הופך את ההצעות להשוואה אמיתית במקום לניחוש.",
    });
  } else {
    recommendations.push({
      title: "השוו הצעות על אותו מפרט",
      body: "הצעות קבלנים נראות שונות מאוד כשכל אחת מתמחרת מפרט אחר. אותו כתב כמויות לכולם הוא הדרך היחידה לדעת מי באמת זול יותר.",
    });
  }

  if (roofType === "משולב שטוח ורעפים") {
    recommendations.push({
      title: "תכננו את מפגש הגגות",
      body: "השילוב בין גג שטוח לגג רעפים יפה בחזית ותובעני בפרט. נקודות המפגש הן מקור נפוץ לנזילות, וכדאי שהן ייפתרו בשלב התכנון ולא באתר.",
    });
  } else if (roofType === "גג שטוח") {
    recommendations.push({
      title: "נצלו את הגג השטוח",
      body: "גג שטוח הוא משטח שימושי למערכות, לדודי שמש ולתאים סולריים. אם זה מעניין אתכם, כדאי להיערך לכך בתכנון החשמל והאיטום מראש.",
    });
  }

  if (buildMethod !== "קונבנציונלית 'רגילה'") {
    recommendations.push({
      title: "ודאו זמינות קבלנים לשיטה",
      body: `${buildMethod} מציעה יתרונות אמיתיים בבידוד ובלוח הזמנים, אך פחות קבלנים בארץ מנוסים בה. כדאי לוודא זמינות ומחיר באזור שלכם לפני שמתחייבים לשיטה.`,
    });
  }

  const watchouts: string[] = [
    "ההערכה מבוססת על מקדמי התכנון של המשרד ועל החדרים שהרכבתם. היא נועדה לתת סדר גודל לתכנון תקציב מוקדם — לא הצעת מחיר.",
    "עלות הבנייה אינה כוללת מערכות מיוחדות (סולארי, חימום תת רצפתי, בריכה) ואינה כוללת ריהוט ואבזור.",
  ];
  if (region === "פריפריה") {
    watchouts.push(
      "בפריפריה עלות העבודה נמוכה יותר, אך כדאי לתקצב הובלת חומרים למרחקים ארוכים ולוודא זמינות קבלנים באזור.",
    );
  } else if (region === "אזור המרכז") {
    watchouts.push(
      "במרכז הביקוש לקבלנים גבוה, ולוחות הזמנים שלהם מתמלאים מוקדם. כדאי להתחיל לאתר קבלן מוקדם מהמקובל.",
    );
  }
  if (hasAttic) {
    watchouts.push(
      "עליית גג נחשבת שטח זול יחסית לבנייה, אך גובה, בידוד ואוורור הם מה שקובע אם היא תהיה חלל שמשתמשים בו או מחסן.",
    );
  }
  if (frugal) {
    watchouts.push(
      "ברמת גימור חסכונית ההפרש מול רמה גבוהה יותר מורגש בעיקר בחומרים הנוגעים ביד — ריצוף, כלים ונגרות. אלה גם הדברים שהכי יקר להחליף בהמשך.",
    );
  }

  const reading = [READING.budget, READING.advisors];
  if (rooms.length >= 12) reading.push(READING.rooms);

  const roomsLabel = `${rooms.length} חדרים`;
  const floorsLabel =
    floors.length === 1 ? "קומה אחת" : `${floors.length} קומות`;

  return {
    headline: `בית של ${roomsLabel} ${REGION_IN[region] ?? ""}`.trim(),
    summary:
      `הרכבתם בית של ${roomsLabel} על ${floorsLabel}, ברמת גימור ${standard}, ` +
      `עם ${roofPhrase(roofType)} ובשיטת בנייה ${buildMethod}. ` +
      `הדוח מרכז את עלות הבנייה המשוערת, את הסעיפים שנוספים מעליה, ולוח זמנים ריאלי לכל שלב. ` +
      `זו נקודת פתיחה לשיחה — לא תחליף לה.`,
    recommendations: recommendations.slice(0, 5),
    watchouts: watchouts.slice(0, 4),
    trackReason: `לפי רמת הגימור שבחרתם, ${base.track.name} הוא המסלול שמתאים ביותר. ${base.track.subtitle}.`,
    readingList: reading,
  };
}
