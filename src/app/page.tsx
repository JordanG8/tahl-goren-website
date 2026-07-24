import type { Metadata } from "next";
import { siteData } from "@/data/siteData";
import { reviews as staticReviews } from "@/data/reviews";
import { getGoogleReviews } from "@/lib/googleReviews";
import type { CarouselReview } from "@/components/ReviewsCarousel";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function Page() {
  const projects = siteData.projects;

  const live = await getGoogleReviews();
  const reviews: CarouselReview[] =
    live && live.reviews.length > 0
      ? live.reviews.map((r) => ({
          name: r.name,
          photoUrl: r.photoUrl,
          rating: r.rating,
          text: r.text,
          relativeTime: r.relativeTime,
        }))
      : staticReviews.map((r) => ({ name: r.name, rating: r.rating, text: r.text }));

  return <HomePage projects={projects} faqItems={[]} reviews={reviews} />;
}
