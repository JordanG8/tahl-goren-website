import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { Section, ButtonLink } from "@/components/ui/Section";
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
      {
        "@type": "ListItem",
        position: 1,
        item: { "@id": "https://talgoren.co.il/", name: "ראשי" },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: { "@id": "https://talgoren.co.il/faq", name: "שאלות ותשובות" },
      },
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
      <PageHeader
        current="שאלות ותשובות"
        eyebrow="Q&amp;A"
        title={<>שאלות<br />ותשובות</>}
        lede="ריכזתי כאן את כל השאלות שאני נשאלת הכי הרבה. מניסיון, הבנה מוקדמת של התהליך מונעת טעויות יקרות ושומרת על התקציב שלכם."
      />

      <Section tone="sand" width="text">
        <Reveal>
          <FaqAccordion />
        </Reveal>

        {/* Closing offer, set as a ruled block rather than a bordered grey
            panel — same weight as the questions above it, not a second banner. */}
        <Reveal className="mt-20 pt-14 border-t border-hairline">
          <h2 className="font-headline font-black text-3xl sm:text-4xl tracking-tight leading-tight text-primary">
            לא מצאתם את התשובה שחיפשתם?
          </h2>
          <p className="font-body text-lg text-secondary mt-5 measure leading-relaxed">
            אני כאן כדי לעזור. דברו איתי ויחד נבין מה המסלול הנכון עבור הפרויקט שלכם.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-9">
            <ButtonLink href="/contact">לקביעת פגישת ייעוץ</ButtonLink>
            <ButtonLink href="https://wa.me/972528345799" variant="outline" external>
              הודעה בוואטסאפ
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
