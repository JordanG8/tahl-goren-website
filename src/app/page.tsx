import { sanityFetch } from "@/sanity/lib/fetch";
import { PROJECTS_QUERY, INSTAGRAM_REELS_QUERY } from "@/sanity/lib/queries";
import { siteData } from "@/data/siteData";
import HomePage from "./HomePage";

export default async function Page() {
  let projects = siteData.projects;
  let reels = siteData.instagramReels;

  try {
    const sanityProjects = await sanityFetch<any[]>({ query: PROJECTS_QUERY });
    if (sanityProjects?.length) {
      projects = sanityProjects.map((p: any) => ({
        id: p.slug?.current || p._id,
        title: p.title,
        location: p.location,
        image: p.image?.asset?.url || p.image,
        description: p.description,
        originalLink: p.originalLink || "#",
        status: p.status,
      }));
    }
  } catch {}

  try {
    const sanityReels = await sanityFetch<any[]>({ query: INSTAGRAM_REELS_QUERY });
    if (sanityReels?.length) {
      reels = sanityReels.map((r: any) => ({
        id: r._id,
        url: r.url,
        thumbnail: r.thumbnail?.asset?.url || r.thumbnail,
        videoUrl: r.videoUrl || r.video?.asset?.url || r.video,
      }));
    }
  } catch {}

  return <HomePage projects={projects} faqItems={[]} reels={reels} />;
}
