import { defineType, defineField } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "url", title: "YouTube URL", type: "url", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "thumbnail" },
  },
});
