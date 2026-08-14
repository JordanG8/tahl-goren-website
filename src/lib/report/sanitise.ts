import type { Narrative } from "./schema";

/**
 * Strips markdown and note-taking scaffolding out of model prose.
 *
 * Smaller models hand back their working: the research step is asked for notes
 * in bullets, and the writing step then leaks that shape into the report —
 * a summary that arrived as "### עמדות רלוונטיות 1. **ניהול תקציב**: …" and
 * rendered with the hashes and asterisks visible on the results page and in the
 * PDF. Prompting alone does not reliably prevent it, so the output is cleaned
 * on the way out as well.
 */
export function clean(text: string, maxSentences?: number): string {
  let out = (text ?? "").replace(/```[\s\S]*?```/g, " ");

  // A markdown heading anywhere in the string marks where the prose stopped and
  // the model started reciting its notes; everything from there on is dropped.
  // Matching only at line start is not enough — the leak arrived mid-paragraph
  // as "…בדיוק לכך. ### עמדות רלוונטיות 1. **ניהול תקציב**: …".
  out = out.split(/#{2,}/)[0];

  out = out
    .replace(/^\s*#{1,6}\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/^\s*\d+[.)]\s+/gm, "")
    .replace(/^\s*[-–•*]\s+/gm, "")
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  let sentences = out.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (maxSentences && sentences.length > maxSentences) {
    sentences = sentences.slice(0, maxSentences);
  }
  // Drop a trailing fragment left by the cut, so the text never ends mid-thought.
  while (sentences.length > 1 && !/[.!?]$/.test(sentences[sentences.length - 1].trim())) {
    sentences.pop();
  }
  return sentences.join(" ").trim();
}

export function sanitise(narrative: Narrative): Narrative {
  return {
    headline: clean(narrative.headline, 1).slice(0, 90),
    summary: clean(narrative.summary, 4),
    recommendations: narrative.recommendations.map((r) => ({
      title: clean(r.title, 1).slice(0, 70),
      body: clean(r.body, 3),
    })),
    watchouts: narrative.watchouts.map((w) => clean(w, 2)),
    trackReason: clean(narrative.trackReason, 3),
    readingList: narrative.readingList.map((r) => ({
      title: clean(r.title, 1),
      slug: r.slug,
      why: clean(r.why, 1),
    })),
  };
}

