import type { Metadata } from "next";
import { siteData } from "@/data/siteData";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function Page() {
  const projects = siteData.projects;

  return <HomePage projects={projects} faqItems={[]} />;
}
