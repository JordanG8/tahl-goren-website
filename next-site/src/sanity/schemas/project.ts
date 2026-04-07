import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "originalLink", title: "Original Link", type: "url" }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: [{ title: "Completed", value: "completed" }, { title: "In Design", value: "in-design" }] }, initialValue: "completed" }),
    defineField({ name: "orderRank", title: "Order", type: "string" }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
