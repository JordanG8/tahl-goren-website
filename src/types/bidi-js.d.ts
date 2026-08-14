/**
 * `bidi-js` ships no types. Only the two entry points the PDF renderer uses are
 * declared here — see src/lib/report/pdf.ts for why the library is needed at
 * all (PDF content streams have no notion of reading direction, so Hebrew has
 * to be reordered from logical to visual order before it is drawn).
 */
declare module "bidi-js" {
  export type EmbeddingLevels = {
    levels: Uint8Array;
    paragraphs: { start: number; end: number; level: number }[];
  };

  export type Bidi = {
    /** Computes UAX #9 embedding levels for a string. */
    getEmbeddingLevels(text: string, baseDirection?: "ltr" | "rtl" | "auto"): EmbeddingLevels;
    /** Reorders a string from logical order into visual order. */
    getReorderedString(text: string, embeddingLevels: EmbeddingLevels): string;
    getReorderedIndices(text: string, embeddingLevels: EmbeddingLevels): number[];
    getMirroredCharacter(char: string): string | null;
  };

  export default function bidiFactory(): Bidi;
}
