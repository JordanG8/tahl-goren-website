import { defineType, defineField } from "sanity";

export const instagramReel = defineType({
  name: "instagramReel",
  title: "Instagram Reel",
  type: "document",
  fields: [
    defineField({ name: "url", title: "Reel URL", type: "url", validation: (r) => r.required() }),
    defineField({ name: "videoUrl", title: "Direct Video URL (mp4)", type: "url" }),
    defineField({ name: "video", title: "Video File", type: "file", options: { accept: "video/mp4,video/webm" } }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
  ],
});
