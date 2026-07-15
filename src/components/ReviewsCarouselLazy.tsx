"use client";

import dynamic from "next/dynamic";

// ReviewsCarousel pulls in Swiper (~32KB brotli) purely for a below-the-fold
// screenshot gallery — no reason to ship that in the initial JS bundle.
// Code-split it and skip SSR (it's client-only imagery, not crawlable content
// the way the real review text elsewhere on the page is).
const ReviewsCarousel = dynamic(() => import("./ReviewsCarousel"), {
  ssr: false,
  loading: () => <div className="w-full h-[420px]" aria-hidden="true" />,
});

export default ReviewsCarousel;
