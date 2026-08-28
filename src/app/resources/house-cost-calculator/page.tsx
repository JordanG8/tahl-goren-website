import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import HouseCostCalculator from "./HouseCostCalculator";

export const metadata: Metadata = {
  title: 'מחשבון עלות בניית בית פרטי | טל גורן אדריכלית',
  description:
    'מחשבון עלויות בנייה חינמי מאת אדריכלית: בנו את הבית שלכם חדר אחר חדר וקבלו הערכת עלות מיידית לפי מיקום, סטנדרט הבניה, סוג הגג ושיטת הבניה — לפי מקדמי התכנון של המשרד.',
  alternates: { canonical: "/resources/house-cost-calculator" },
  openGraph: {
    title: "כמה יעלה לבנות את הבית שלכם? מחשבון עלויות בנייה",
    description:
      'בנו את תוכנית החדרים וקבלו הערכת עלות בנייה מיידית, כולל מע"מ — לפי מקדמי התכנון של משרד טל גורן אדריכלית.',
  },
};

// The page answers one question, so it is marked up as that question. This is
// the visible content restated for search engines, not extra claims.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "כמה עולה לבנות בית פרטי?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'העלות נגזרת משטח הבית, מהמיקום הגאוגרפי, מרמת הגימור, מסוג הגג ומשיטת הבנייה. המחשבון מבקש את כל אלה ומחשב לפיהם, על בסיס מקדמי התכנון שהמשרד עובד איתם מול לקוחות.',
      },
    },
    {
      "@type": "Question",
      name: "מה ההערכה כוללת?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'ההערכה כוללת מע"מ, שטחי קירות ושטחי מעברים ופחת. היא אינה כוללת עלויות תכנון ורישוי (אגרות, היטלים, מתכננים ויועצים), אינה כוללת מערכות ותשתיות מיוחדות כגון תאים סולריים, חימום תת רצפתי או בריכת שחייה, ואינה כוללת איבזור של הבית כגון רהיטים, גופי תאורה ומכשירי חשמל.',
      },
    },
    {
      "@type": "Question",
      name: "למה קומת מרתף מייקרת את הבנייה?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "עבודות העפר, הדיפון והאיטום שמרתף דורש מייקרים אותו משמעותית לעומת שטח זהה בקומת הקרקע. קומה עליונה ועליית גג, לעומת זאת, מעט זולות יותר לבנייה.",
      },
    },
  ],
};

export default function HouseCostCalculatorPage() {
  return (
    <main className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHeader
        eyebrow="כלי עזר"
        title={<>כמה יעלה לבנות<br />את הבית שלכם?</>}
        lede="בנו את הבית חדר אחר חדר, בחרו את הסטנדרט והמיקום, וקבלו הערכת עלות בנייה מיידית — לפי אותם מקדמי תכנון שהמשרד עובד איתם מול לקוחות."
        items={[
          { label: "ראשי", to: "/" },
          { label: "כלי עזר" },
          { label: "מחשבון עלות בנייה" },
        ]}
      />

      <HouseCostCalculator />
    </main>
  );
}
