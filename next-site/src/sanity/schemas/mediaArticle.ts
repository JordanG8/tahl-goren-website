import { defineType, defineField } from "sanity";

export const mediaArticle = defineType({
  name: "mediaArticle",
  title: "Media Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "source", title: "Source", type: "string" }),
    defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});
