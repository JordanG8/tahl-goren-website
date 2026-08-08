import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata: Metadata = {
  title: "צ'ק-ליסט: מה בודקים במגרש לפני שבונים בית פרטי | טל גורן אדריכלית",
  description:
    "צ'ק-ליסט מקצועי וחינמי מאת אדריכלית: 12 דברים שחייבים לבדוק במגרש לפני קניה או תחילת תכנון בית פרטי — זכויות בנייה, תשתיות, קרקע, גישה ועוד.",
  alternates: { canonical: "/resources/plot-checklist" },
};

type ChecklistItem = { title: string; text: string };

const checklist: ChecklistItem[] = [
  {
    title: "ייעוד הקרקע והתב\"ע החלה",
    text: "ודאו מול הוועדה המקומית מה התוכנית התקפה (תב\"ע) על המגרש, ושהייעוד אכן מאפשר בניית בית מגורים צמוד קרקע.",
  },
  {
    title: "זכויות הבנייה בפועל",
    text: "אחוזי בנייה, קווי בניין (מרחק חובה מגבולות המגרש), גובה מותר ומספר קומות — אלו הנתונים שקובעים כמה בית אפשר לבנות בפועל, ולא רק גודל המגרש הכולל.",
  },
  {
    title: "סוג הקרקע ותכונותיה",
    text: "קרקע סלעית, חרסיתית או תופחת משפיעה משמעותית על עלויות עבודות העפר והיסודות. במגרשים לא מוכרים כדאי לשקול בדיקת קרקע מקדימה.",
  },
  {
    title: "תשתיות זמינות בגבול המגרש",
    text: "מים, ביוב, חשמל ותקשורת — בדקו שהתשתיות קיימות בסמוך למגרש, ומה עלות החיבור אם הן רחוקות ממנו.",
  },
  {
    title: "גישה וכביש גישה מאושר",
    text: "האם למגרש יש גישה מכביש מוכר ומאושר בתוכנית, או שנדרשת הסדרה נוספת מול הוועדה?",
  },
  {
    title: "טופוגרפיה ושיפוע",
    text: "מגרש עם הפרשי גובה משמעותיים יכול לייקר את עבודות העפר, אך גם לפתוח הזדמנויות תכנוניות (כמו קומת מרתף טבעית).",
  },
  {
    title: "כיווני אוויר ואוריינטציה",
    text: "מיקום השמש והרוחות ביחס למגרש משפיעים ישירות על תכנון החללים, ההצללה וההוצאה העתידית על מיזוג וחימום.",
  },
  {
    title: "עצים בוגרים על המגרש",
    text: "עצים בוגרים עשויים לדרוש היתר כריתה או העתקה, ולעיתים אף משפיעים על מיקום המבנה המותר.",
  },
  {
    title: "מפגעים סביבתיים בקרבת מקום",
    text: "קווי מתח גבוה, נחלים, אזורים רגישים להצפה או מפגעי ריח ורעש — כדאי לבדוק לפני שמתאהבים במגרש.",
  },
  {
    title: "מצב רישומי בטאבו",
    text: "שעבודים, עיקולים או זכויות צד שלישי הרשומים על המגרש עלולים לעכב את התהליך משמעותית — בדיקה משפטית מקדימה חוסכת הפתעות.",
  },
  {
    title: "היטלי פיתוח והשבחה",
    text: "כדאי לברר מראש מול הרשות המקומית אם צפויים היטלי פיתוח או היטל השבחה על המגרש, ומה גובהם המשוער.",
  },
  {
    title: "תוכניות עתידיות באזור",
    text: "בדקו אם קיימות תוכניות מתאר עתידיות (כביש, מבנה ציבור, שכונה סמוכה) שעלולות להשפיע על איכות החיים או שווי הנכס בעתיד.",
  },
];

export default function PlotChecklistPage() {
  return (
    <>
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-4xl mx-auto text-right">
          <Breadcrumb items={[{ label: "ראשי", to: "/" }, { label: "צ'ק-ליסט לבדיקת מגרש" }]} />
          <h1 className="font-headline font-black text-4xl md:text-6xl tracking-tight leading-[1.05] text-primary max-w-3xl">
            צ&apos;ק-ליסט: מה בודקים במגרש לפני שבונים
          </h1>
          <div className="mb-2 mt-6 p-6 bg-surface-container-low border-r-4 border-tertiary">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary block mb-2">בקצרה</span>
            <p className="text-primary text-lg leading-relaxed font-body font-medium">
              12 נקודות מפתח לבדיקה לפני רכישת מגרש או תחילת תכנון בית פרטי —
              מזכויות בנייה ועד תשתיות וגישה — כדי שלא תגלו הפתעות יקרות
              בהמשך הדרך.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 px-8 bg-surface">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div>
            <ol className="space-y-8">
              {checklist.map((item, i) => (
                <li key={item.title} className="flex gap-5">
                  <span className="font-headline font-black text-2xl text-accent flex-shrink-0 w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-headline font-bold text-lg text-primary mb-1.5">{item.title}</h2>
                    <p className="font-body text-secondary text-base leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-16 p-8 bg-surface-container-low text-right">
              <h2 className="font-headline font-black text-xl text-primary mb-3">מגרש שכבר ברשותכם?</h2>
              <p className="font-body text-secondary leading-relaxed mb-6">
                הרשימה הזו נותנת לכם בסיס טוב, אבל בדיקה מקצועית של המגרש
                הספציפי שלכם — כולל זכויות הבנייה המדויקות והפוטנציאל
                התכנוני — היא הדרך הבטוחה למנוע טעויות יקרות.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-headline font-bold text-sm hover:bg-secondary transition-colors"
              >
                לשיחת ייעוץ
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </Link>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <LeadMagnetForm placement="plot_checklist_page" />
          </div>
        </div>
      </section>
    </>
  );
}
