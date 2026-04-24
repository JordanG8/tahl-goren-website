<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:article-format-rules -->
# Article Data Format

When adding or modifying articles in `src/data/articlesContent.ts`, always follow this TypeScript structure for the `Article` object:

```typescript
export type ArticleSection = {
  heading: string;
  body: string[]; // Array of strings, each string represents a paragraph
  list?: string[]; // Optional array of strings for bulleted lists
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  heroImage: string; // Typically "/images/blog/your-image-name.png"
  heroAlt: string;
  keywords: string[];
  publishedAt: string; // Format: "YYYY-MM-DD"
  updatedAt: string;   // Format: "YYYY-MM-DD"
  readingTimeMin: number;
  sections: ArticleSection[];
  faq?: ArticleFaq[];
  related?: string[]; // Array of related article slugs
  legacyPaths?: string[]; // Used for redirects from old URLs
};
```

**Important Notes for Articles:**
- All article contents must be added directly to the `articles` array in `src/data/articlesContent.ts`.
- Use markdown links syntax `[Link Text](/path)` for links inside the `body` string arrays.
- Generate images using your tools and place them in `public/images/blog/`, then reference them in `heroImage`.
<!-- END:article-format-rules -->
