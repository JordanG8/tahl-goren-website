import { siteData } from "@/data/siteData";
import { getGoogleReviews } from "@/data/googleReviews";
import HomePage from "./HomePage";

export default async function Page() {
  const projects = siteData.projects;
  const reels = siteData.instagramReels;

  let reviewsData = null;
  try {
    reviewsData = await getGoogleReviews();
  } catch {}

  return <HomePage projects={projects} faqItems={[]} reels={reels} reviewsData={reviewsData} />;
}
