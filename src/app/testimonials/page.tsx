import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { reviews as staticReviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "המלצות לקוחות | טל גורן אדריכלות",
  description:
    "קראו מה לקוחות אומרים על העבודה עם טל גורן אדריכלית. ביקורות אמיתיות ממשפחות שבנו את בית חלומותיהן.",
  alternates: { canonical: "/testimonials" },
};

import { getGoogleReviews, GoogleReview } from "@/data/googleReviews";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-lg"
          style={{
            fontVariationSettings: "'FILL' 1",
            color: i < count ? "#FBBC04" : "#e0e0e0",
          }}
        >
          star
        </span>
      ))}
    </div>
  );
}

function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} text-[#4285F4]`} fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function ReviewJsonLd({ reviewData, totalReviews, avgRating }: { reviewData: any[]; totalReviews: number; avgRating: number }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "טל גורן אדריכלות",
    image: "https://talgoren.co.il/images/tahl-portrait.jpg",
    address: { "@type": "PostalAddress", streetAddress: "העלייה 22", addressLocality: "גבעת עדה", addressCountry: "IL" },
    telephone: "+972-52-834-5799",
    aggregateRating: { "@type": "AggregateRating", ratingValue: String(avgRating), reviewCount: String(totalReviews), bestRating: "5" },
    review: reviewData.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
      reviewBody: r.text,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default async function Testimonials() {
  const googleData = await getGoogleReviews();

  // Use Google reviews if available, otherwise fall back to static
  const displayReviews = googleData?.reviews.length
    ? googleData.reviews.map((r) => ({ name: r.name, text: r.text, rating: r.rating, location: undefined as string | undefined, relativeTime: r.relativeTime, photoUrl: r.photoUrl }))
    : staticReviews.map((r) => ({ name: r.name, text: r.text, rating: r.rating, location: r.location, relativeTime: undefined as string | undefined, photoUrl: null as string | null }));

  const avgRating = googleData?.rating || 5;
  const totalReviews = googleData?.totalReviews || displayReviews.length;

  return (
    <>
      <ReviewJsonLd reviewData={displayReviews} totalReviews={totalReviews} avgRating={avgRating} />

      {/* Header */}
      <section className="pt-32 pb-12 px-8 lg:px-12 max-w-[1920px] mx-auto">
        <Breadcrumb items={[{ label: "ראשי", to: "/" }, { label: "לקוחות מספרים" }]} />
        <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-5xl">
          מה אומרים עלינו
        </h1>
        <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-8">
          הביקורות של הלקוחות שלנו מדברות בעד עצמן. מוזמנים לקרוא, ולהשאיר ביקורת משלכם.
        </p>

        {/* Aggregate rating */}
        <div className="flex items-center gap-4 mt-10 p-6 bg-surface-container-low inline-flex">
          <div className="flex items-center gap-2">
            <span className="font-headline font-black text-4xl text-primary">{avgRating.toFixed(1)}</span>
            <Stars count={Math.round(avgRating)} />
          </div>
          <div className="w-px h-10 bg-outline/20" />
          <div>
            <span className="font-headline font-bold text-sm text-primary block">{totalReviews} ביקורות</span>
            <span className="font-label text-xs text-secondary">מלקוחות מאומתים</span>
          </div>
          <div className="w-px h-10 bg-outline/20" />
          <GoogleIcon className="w-6 h-6" />
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="px-8 lg:px-12 pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, index) => (
            <div key={index} className="bg-surface border border-outline/10 p-8 flex flex-col gap-5 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {review.photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={review.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-headline font-bold text-sm flex-shrink-0">
                      {review.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <span className="font-headline font-bold text-sm text-primary block">{review.name}</span>
                    {review.location && <span className="font-label text-xs text-secondary">{review.location}</span>}
                    {review.relativeTime && <span className="font-label text-xs text-secondary">{review.relativeTime}</span>}
                  </div>
                </div>
                <GoogleIcon />
              </div>
              <Stars count={review.rating} />
              <p className="font-body text-sm text-secondary leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

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
