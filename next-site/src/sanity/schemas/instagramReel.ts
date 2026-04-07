import { defineType, defineField } from "sanity";

export const instagramReel = defineType({
  name: "instagramReel",
  title: "Instagram Reel",
  type: "document",
  fields: [
    defineField({ name: "url", title: "Reel URL", type: "url", validation: (r) => r.required() }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
  ],
});
