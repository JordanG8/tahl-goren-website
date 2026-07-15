import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ReviewsCarousel from "@/components/ReviewsCarouselLazy";
import { reviews as staticReviews } from "@/data/reviews";
import { getGoogleReviews } from "@/lib/googleReviews";

export const metadata: Metadata = {
  title: "המלצות לקוחות | טל גורן אדריכלות",
  description:
    "קראו מה לקוחות אומרים על העבודה עם טל גורן אדריכלית. ביקורות אמיתיות ממשפחות שבנו את בית חלומותיהן.",
  alternates: { canonical: "/testimonials" },
};

const ORG_ID = "https://talgoren.co.il/#organization";

export default async function Testimonials() {
  const live = await getGoogleReviews();

  // Prefer live Google review data (real text, real dates, real counts).
  // Fall back to the hand-curated static list only when no API key is
  // configured — and never invent a date/count we don't actually have.
  const displayReviews = live && live.reviews.length > 0
    ? live.reviews.map((r) => ({
        name: r.name,
        text: r.text,
        rating: r.rating,
        datePublished: r.publishTime || undefined,
        relativeTime: r.relativeTime,
      }))
    : staticReviews.map((r) => ({
        name: r.name,
        text: r.text,
        rating: r.rating,
        datePublished: undefined as string | undefined,
        relativeTime: undefined as string | undefined,
      }));

  const aggregateRating = live
    ? { ratingValue: live.rating, reviewCount: live.totalReviews }
    : {
        ratingValue: Number(
          (staticReviews.reduce((sum, r) => sum + r.rating, 0) / staticReviews.length).toFixed(1)
        ),
        reviewCount: staticReviews.length,
      };

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
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ראשי", item: "https://talgoren.co.il/" },
      { "@type": "ListItem", position: 2, name: "לקוחות מספרים", item: "https://talgoren.co.il/testimonials" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 px-8 lg:px-12 max-w-[1920px] mx-auto">
        <Breadcrumb items={[{ label: "ראשי", to: "/" }, { label: "לקוחות מספרים" }]} />
        <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-5xl">
          מה אומרים עלינו
        </h1>
        <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-8">
          הביקורות של הלקוחות שלנו מדברות בעד עצמן. מוזמנים להתרשם מהמלצות של משפחות שליווינו לאורך השנים.
        </p>
        {aggregateRating.reviewCount > 0 && (
          <p className="font-body text-base text-secondary mt-4 flex items-center gap-2" dir="ltr">
            <span className="material-symbols-outlined text-yellow-500 text-xl" aria-hidden="true">star</span>
            <span dir="rtl">
              {aggregateRating.ratingValue.toFixed(1)} מתוך 5 · {aggregateRating.reviewCount} ביקורות בגוגל
            </span>
          </p>
        )}
      </section>

      {/* Real, crawlable review text */}
      <section className="px-8 lg:px-12 pb-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-1" aria-label={`דירוג ${r.rating} מתוך 5`}>
                {Array.from({ length: 5 }).map((_, star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined text-lg"
                    style={{ color: star < r.rating ? "#eab308" : "#e5e7eb" }}
                    aria-hidden="true"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-body text-secondary leading-relaxed">{r.text}</p>
              <div className="mt-auto pt-2 flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium text-primary">{r.name}</span>
                {r.relativeTime && <span>{r.relativeTime}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshot gallery — supplementary visual proof, not tied to structured data above */}
      <section className="px-8 lg:px-12 pb-12 md:pb-24 max-w-[1920px] mx-auto">
        <h2 className="font-headline font-bold text-2xl text-primary mb-6">
          עוד ביקורות מגוגל
        </h2>
        <ReviewsCarousel />

        {/* Actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJJ3hIcCwPHRURDSsOb8puf5g"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors group"
          >
            <span>השאירו ביקורת בגוגל</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">edit</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border-2 border-primary text-primary px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors group"
          >
            <span>בואו נדבר</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/95" />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">הסיפור הבא</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tight leading-[0.95] text-white">
            בואו נבנה גם את<br />הסיפור שלכם.
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            כל בית שתכננתי התחיל בשיחה. ספרו לי על החלום שלכם ונהפוך אותו יחד למציאות.
          </p>
          <div className="flex flex-col sm:flex-row gap-0 mt-6">
            <Link href="/contact" className="inline-flex items-center justify-center gap-4 bg-white text-primary px-12 py-5 font-headline font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors group">
              דברו איתי
              <span className="material-symbols-outlined group-hover:translate-x-[-6px] transition-transform">arrow_back</span>
            </Link>
            <Link href="/projects" className="inline-flex items-center justify-center gap-4 bg-white/10 text-white px-12 py-5 font-headline font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-colors">
              צפו בפרויקטים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
