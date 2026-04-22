import { siteData } from "@/data/siteData";
import HomePage from "./HomePage";

export default async function Page() {
  const projects = siteData.projects;

  return <HomePage projects={projects} faqItems={[]} />;
}
