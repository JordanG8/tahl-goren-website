import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(orderRank)`
);

export const ARTICLES_QUERY = defineQuery(
  `*[_type == "article"] | order(_createdAt desc)`
);

export const MEDIA_ARTICLES_QUERY = defineQuery(
  `*[_type == "mediaArticle"] | order(_createdAt desc)`
);

export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial"] | order(orderRank)`
);

export const FAQ_QUERY = defineQuery(
  `*[_type == "faq"] | order(orderRank)`
);

export const VIDEOS_QUERY = defineQuery(
  `*[_type == "video"] | order(_createdAt desc)`
);

export const INSTAGRAM_REELS_QUERY = defineQuery(
  `*[_type == "instagramReel"] | order(_createdAt desc)`
);

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]`
);
