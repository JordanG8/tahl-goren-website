"use client";

import dynamic from "next/dynamic";
import type { CarouselReview } from "./ReviewsCarousel";

// ReviewsCarousel pulls in Swiper (~32KB brotli) purely for a below-the-fold
// carousel — no reason to ship that in the initial JS bundle. Code-split it
// and skip SSR (the review text is already rendered server-side elsewhere on
// the page for crawlability; this is just the interactive carousel chrome).
const ReviewsCarousel = dynamic(() => import("./ReviewsCarousel"), {
  ssr: false,
  loading: () => <div className="w-full h-[420px]" aria-hidden="true" />,
});

export default function ReviewsCarouselLazy({ reviews }: { reviews: CarouselReview[] }) {
  return <ReviewsCarousel reviews={reviews} />;
}
