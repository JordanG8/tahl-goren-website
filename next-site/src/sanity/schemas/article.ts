import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "originalLink", title: "Original Link", type: "url" }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
