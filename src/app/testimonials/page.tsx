import { Metadata } from "next";
import GoogleReviews from "@/components/GoogleReviewsLazy";
import StarRating from "@/components/StarRating";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionHeading, ButtonLink } from "@/components/ui/Section";
import { getReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "המלצות לקוחות | טל גורן אדריכלית",
  description:
    "קראו מה לקוחות אומרים על העבודה עם טל גורן אדריכלית. ביקורות אמיתיות ממשפחות שבנו את בית חלומותיהן.",
  alternates: { canonical: "/testimonials" },
};

const ORG_ID = "https://talgoren.co.il/#organization";

export default async function Testimonials() {
  // Single source of truth for review data (Business Profile → Places →
  // curated static; see src/lib/reviews.ts). Real text, real dates, real
  // counts — never invent a date/count we don't actually have.
  const data = await getReviews();
  const displayReviews = data.reviews;
  const aggregateRating = { ratingValue: data.rating, reviewCount: data.totalReviews };

  // The single Review/AggregateRating structured-data block for the whole
  // site — placed only here, where every review it describes is genuinely
  // rendered as visible text below (Google's structured-data policy requires
  // review markup to reflect on-page content, and self-serving reviews about
  // a business hosted on its own site aren't rich-result eligible anyway;
  // this stays purely for AI/LLM citation and honest data hygiene).
  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: "טל גורן אדריכלית",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      bestRating: 5,
      reviewCount: aggregateRating.reviewCount,
    },
    review: displayReviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      ...(r.publishTime ? { datePublished: r.publishTime } : {}),
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
        item: { "@id": "https://talgoren.co.il/testimonials", name: "לקוחות מספרים" },
      },
    ],
  };

  return (
    <>
      {/* Escape "<" — review text is third-party content and must not be able
          to break out of the JSON-LD script tag. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeader
        items={[{ label: "ראשי", to: "/" }, { label: "לקוחות מספרים" }]}
        eyebrow="לקוחות מספרים"
        title="מה אומרים עליי"
        lede="הביקורות של המשפחות שליוויתי מדברות בעד עצמן. כולן פורסמו ב־Google, ואפשר לקרוא אותן שם במקור."
      >
        {aggregateRating.reviewCount > 0 && (
          <div className="flex items-center gap-3" dir="rtl">
            <span className="font-headline font-black text-3xl text-primary leading-none">
              {aggregateRating.ratingValue.toFixed(1)}
            </span>
            <StarRating rating={Math.round(aggregateRating.ratingValue)} className="w-5 h-5" />
            <span className="font-body text-base text-secondary">
              מתוך 5 · {aggregateRating.reviewCount} ביקורות בגוגל
            </span>
          </div>
        )}
      </PageHeader>

      {/* Real, crawlable review text. Set as a quotation grid on hairlines —
          the rounded white cards with shadows read as UI chrome around words
          that should feel like they were written by a person. */}
      <Section tone="paper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {displayReviews.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 90}>
              <figure className="flex flex-col h-full border-t border-hairline pt-6">
                <StarRating rating={r.rating} className="w-4 h-4" />
                <blockquote className="font-body text-secondary leading-[1.85] mt-4 flex-1">
                  {r.text}
                </blockquote>
                <figcaption className="mt-6 flex items-baseline justify-between gap-4">
                  <span className="font-headline font-bold text-primary text-base">{r.name}</span>
                  {r.relativeTime && (
                    <span className="font-label font-medium text-[13px] uppercase tracking-[0.13em] text-ink-mute">
                      {r.relativeTime}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Google-native cards — supplementary visual proof */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Google"
          title="עוד ביקורות מגוגל"
          size="sm"
          className="mb-10"
        />
        <GoogleReviews reviews={displayReviews} />

        <Reveal className="mt-16 flex flex-col sm:flex-row gap-4">
          <ButtonLink
            href="https://search.google.com/local/writereview?placeid=ChIJJ3hIcCwPHRURDSsOb8puf5g"
            external
          >
            השאירו ביקורת בגוגל
          </ButtonLink>
          <ButtonLink href="/projects" variant="outline">
            צפו בפרויקטים
          </ButtonLink>
        </Reveal>
      </Section>

      <CtaSection
        title="בואו נבנה גם את הסיפור שלכם"
        subtitle="כל בית שתכננתי התחיל בשיחה. ספרו לי על מה שאתם רוצים לבנות, ונראה יחד איך מגיעים לשם."
        primaryLabel="דברו איתי"
      />
    </>
  );
}
