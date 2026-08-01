import type { Metadata } from "next";
import { siteData } from "@/data/siteData";
import { getReviews } from "@/lib/reviews";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function Page() {
  const projects = siteData.projects;
  const reviewsData = await getReviews();

  return <HomePage projects={projects} faqItems={[]} reviewsData={reviewsData} />;
}
