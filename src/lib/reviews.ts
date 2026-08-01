import { getGoogleReviews } from "./googleReviews";
import { getBusinessProfileReviews } from "./businessProfile";
import { reviews as staticReviews } from "@/data/reviews";

export type SiteReview = {
  name: string;
  photoUrl?: string | null;
  rating: number;
  text: string;
  relativeTime?: string;
  publishTime?: string;
};

export type SiteReviews = {
  source: "business-profile" | "places" | "static";
  rating: number;
  totalReviews: number;
  reviews: SiteReview[];
};

// The single entry point for review data everywhere on the site, in order of
// preference:
//   1. Business Profile API — the owner's own listing data: every review.
//   2. Places API — public data hard-capped at 5 reviews, so it's blended
//      with the curated static list (also real Google reviews) to keep the
//      carousel from looking starved. Aggregate rating/count stay live.
//   3. Curated static list alone — when no API access is configured.
// Never fabricate a rating, count, or date that didn't come from one of these.
export async function getReviews(): Promise<SiteReviews> {
  const gbp = await getBusinessProfileReviews();
  if (gbp && gbp.reviews.length > 0) return gbp;

  const places = await getGoogleReviews();
  if (places && places.reviews.length > 0) {
    const live: SiteReview[] = places.reviews
      .filter((r) => r.text.trim().length > 0)
      .map((r) => ({
        name: r.name,
        photoUrl: r.photoUrl,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relativeTime,
        publishTime: r.publishTime || undefined,
      }));
    const liveNames = new Set(live.map((r) => r.name.trim()));
    const curated: SiteReview[] = staticReviews
      .filter((r) => !liveNames.has(r.name.trim()))
      .map((r) => ({ name: r.name, rating: r.rating, text: r.text }));
    return {
      source: "places",
      rating: places.rating,
      totalReviews: places.totalReviews,
      reviews: [...live, ...curated],
    };
  }

  const avg =
    staticReviews.reduce((sum, r) => sum + r.rating, 0) / staticReviews.length;
  return {
    source: "static",
    rating: Number(avg.toFixed(1)),
    totalReviews: staticReviews.length,
    reviews: staticReviews.map((r) => ({ name: r.name, rating: r.rating, text: r.text })),
  };
}
