import { articles } from "@/data/articlesContent";
import { areas } from "@/data/areasContent";
import { packages, packageSpecs, packagesFootnote } from "@/data/packagesContent";
import faqData from "@/data/faqData.json";

/**
 * The corpus the agent is allowed to research.
 *
 * "Research the input" for this task does not mean the open web — it means
 * Tal's own writing. She has ~44 articles, area pages and a documented set of
 * packages; a report that quotes her positions back to a family is both more
 * accurate and more useful than one assembled from an internet average. It also
 * means every claim in the report can be traced to something she published.
 */

export type Doc = {
  id: string;
  kind: "article" | "area" | "package" | "faq";
  title: string;
  /** Where the visitor can read it, when there is such a page. */
  slug?: string;
  text: string;
};

let cache: Doc[] | null = null;

export function corpus(): Doc[] {
  if (cache) return cache;

  const docs: Doc[] = [];

  for (const a of articles) {
    const body = [
      a.excerpt,
      ...(a.intro ?? []),
      ...a.sections.flatMap((s) => [s.heading, ...s.body, ...(s.list ?? [])]),
      ...(a.faq ?? []).flatMap((f) => [f.question, f.answer]),
    ].join("\n");
    docs.push({
      id: `article:${a.slug}`,
      kind: "article",
      title: a.title,
      slug: a.slug,
      // Long articles are truncated: the agent needs enough to judge relevance
      // and quote a position, not the full text of forty guides in one context.
      text: body.slice(0, 3500),
    });
  }

  for (const area of areas) {
    docs.push({
      id: `area:${area.slug}`,
      kind: "area",
      title: area.h1,
      slug: `areas/${area.slug}`,
      text: [area.intro, area.localContext, `אזור: ${area.region}`]
        .join("\n")
        .slice(0, 2500),
    });
  }

  for (const p of packages) {
    docs.push({
      id: `package:${p.id}`,
      kind: "package",
      title: p.name,
      slug: "packages",
      text: [
        p.subtitle,
        `מחיר: ${p.price.toLocaleString("he-IL")} ₪ לפני מע"מ (${p.priceWithVat.toLocaleString("he-IL")} ₪ כולל).`,
        `למי זה מתאים: ${p.forWhom}`,
        `מה כלול: ${p.weDo}`,
        `מה נשאר באחריות הלקוח: ${p.remainsWithYou}`,
        p.includesDesign.length ? `עיצוב פנים כלול: ${p.includesDesign.join("; ")}` : "",
        packageSpecs.map((s) => `${s.label}: ${s.values.join(" / ")}`).join("\n"),
        packagesFootnote,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }

  for (const [i, f] of (faqData as { question: string; answer: string }[]).entries()) {
    docs.push({
      id: `faq:${i}`,
      kind: "faq",
      title: f.question,
      slug: "faq",
      text: f.answer.slice(0, 1500),
    });
  }

  cache = docs;
  return docs;
}

/**
 * Keyword search over the corpus.
 *
 * Deliberately not embeddings: the corpus is a few hundred short Hebrew
 * documents, the queries are domain terms the articles themselves use, and a
 * scored token match returns the right guide essentially every time — without
 * an embedding provider, an index to keep warm, or another network hop inside
 * a request a family is waiting on.
 */
export function searchCorpus(query: string, limit = 4): Doc[] {
  const terms = query
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length > 2);
  if (terms.length === 0) return [];

  const scored = corpus().map((doc) => {
    const haystack = `${doc.title}\n${doc.text}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      // Title hits are worth far more than body hits.
      if (doc.title.toLowerCase().includes(t)) score += 6;
      const matches = haystack.split(t).length - 1;
      score += Math.min(matches, 6);
    }
    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.doc);
}

/** Slugs the model is allowed to cite in the reading list. */
export function articleSlugs(): Set<string> {
  return new Set(articles.map((a) => a.slug));
}
