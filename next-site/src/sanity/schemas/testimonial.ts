import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "clientName", title: "Client Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "projectType", title: "Project Type", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.min(1).max(5), initialValue: 5 }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "orderRank", title: "Order", type: "string" }),
  ],
  preview: {
    select: { title: "clientName", subtitle: "projectType" },
  },
});
