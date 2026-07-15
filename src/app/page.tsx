import type { Metadata } from "next";
import { siteData } from "@/data/siteData";
import { reviews as staticReviews } from "@/data/reviews";
import { getGoogleReviews } from "@/lib/googleReviews";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function Page() {
  const projects = siteData.projects;

  const live = await getGoogleReviews();
  const rating = {
    value: live
      ? live.rating
      : Number((staticReviews.reduce((sum, r) => sum + r.rating, 0) / staticReviews.length).toFixed(1)),
    count: live ? live.totalReviews : staticReviews.length,
  };

  return <HomePage projects={projects} faqItems={[]} rating={rating} />;
}
