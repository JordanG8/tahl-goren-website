import { siteData } from "@/data/siteData";
import { getGoogleReviews } from "@/data/googleReviews";
import HomePage from "./HomePage";

export default async function Page() {
  const projects = siteData.projects;

  let reviewsData = null;
  try {
    reviewsData = await getGoogleReviews();
  } catch {}

  return <HomePage projects={projects} faqItems={[]} reviewsData={reviewsData} />;
}
