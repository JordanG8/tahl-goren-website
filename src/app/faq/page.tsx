import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import faqData from "@/data/faqData.json";

export const metadata: Metadata = {
  title: "שאלות נפוצות | טל גורן אדריכלית",
  description: "כל התשובות לשאלות הנפוצות ביותר על תכנון, רישוי ובניית בית פרטי. מידע מקצועי וטיפים מטל גורן, אדריכלית מורשית היתר.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item: any) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ראשי", item: "https://talgoren.co.il/" },
      { "@type": "ListItem", position: 2, name: "שאלות ותשובות", item: "https://talgoren.co.il/faq" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Page Header */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto text-right">
          <Breadcrumb current="שאלות ותשובות" />
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
            שאלות<br/>ותשובות
          </h1>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
            ריכזתי עבורכם את כל השאלות שאני נשאלת הכי הרבה. מניסיון, הבנה מוקדמת של התהליך מונעת טעויות יקרות ושומרת על התקציב שלכם.
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10 mr-0 ml-auto"></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-right">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">Q&A</span>
            <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary mt-4">שאלות נפוצות</h2>
          </div>
          
          <FaqAccordion />

          <div className="mt-24 p-12 bg-surface-container text-right border border-outline/10">
            <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight leading-tight text-primary mb-6">לא מצאתם את התשובה שחיפשתם?</h2>
            <p className="text-lg text-secondary mb-10 max-w-2xl leading-relaxed">
              אני כאן כדי לעזור. דברו איתי ויחד נבין מה המסלול הנכון עבור הפרויקט שלכם.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 font-headline font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                לקביעת פגישת ייעוץ
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </Link>
              <a
                href="https://wa.me/972528345799"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-primary/30 text-primary px-8 py-4 font-headline font-bold text-xs uppercase tracking-widest hover:bg-primary/5 transition-colors"
              >
                שלחו לי הודעה בוואטסאפ
                <span className="material-symbols-outlined text-lg">chat</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
