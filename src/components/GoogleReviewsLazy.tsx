"use client";

import dynamic from "next/dynamic";
import type { SiteReview } from "@/lib/reviews";

// GoogleReviews pulls in Swiper (~32KB brotli) purely for a below-the-fold
// carousel — no reason to ship that in the initial JS bundle. Code-split it
// and skip SSR; the crawlable review text lives in the server-rendered grid
// on /testimonials, not here.
const GoogleReviews = dynamic(() => import("./GoogleReviews"), {
  ssr: false,
  loading: () => <div className="w-full h-[420px]" aria-hidden="true" />,
});

export default function GoogleReviewsLazy({ reviews }: { reviews: SiteReview[] }) {
  return <GoogleReviews reviews={reviews} />;
}
