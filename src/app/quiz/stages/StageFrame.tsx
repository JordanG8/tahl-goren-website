"use client";

import type { ReactNode } from "react";
import type { StepOption } from "@/data/calculatorSteps";

/**
 * The shared furniture of a question screen.
 *
 * Every step is the same three things: one large visual that responds to the
 * choice, a row of selectors, and a line of prose explaining what the selected
 * option actually means. Keeping that skeleton identical across steps is what
 * lets each *visual* be wildly different without the page feeling like four
 * unrelated screens — the visitor learns the controls once.
 *
 * The blurb sits in a scrim over the visual rather than below it, so the
 * explanation and the thing it explains are read together.
 */
export function StageFrame({
  children,
  options,
  value,
  onChange,
  /** Renders the selector as image thumbnails instead of text chips. */
  thumbnails = false,
  /**
   * A taller frame, for a visual that needs vertical room. A photograph reads
   * fine in a wide letterbox; a map of a long, narrow country does not.
   */
  tall = false,
}: {
  children: ReactNode;
  options: StepOption[];
  value: string | null;
  onChange: (label: string) => void;
  thumbnails?: boolean;
  tall?: boolean;
}) {
  const selected = options.find((o) => o.label === value) ?? null;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* The visual, and the explanation laid over its foot.
          The height is stated outright rather than inherited through a chain of
          flex parents: the visual is the whole point of the screen, and it must
          never be at the mercy of an ancestor resolving to zero. */}
      <div
        className={`relative overflow-hidden bg-surface-container-low border border-hairline ${
          tall
            ? "h-[52vh] sm:h-[58vh] lg:h-[64vh] min-h-[340px]"
            : "h-[40vh] sm:h-[44vh] lg:h-[48vh] min-h-[260px]"
        }`}
      >
        {children}

        {selected && (
          <div
            key={selected.label}
            className="stage-blurb pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6 pt-10 sm:pt-12
                       bg-[linear-gradient(to_top,rgba(37,50,60,0.94)_0%,rgba(37,50,60,0.86)_55%,rgba(37,50,60,0)_100%)]"
          >
            <h3 className="font-headline font-bold text-lg sm:text-xl text-white">
              {selected.label}
            </h3>
            <p className="font-body text-[15px] sm:text-base text-white/80 leading-relaxed mt-1.5 max-w-2xl">
              {selected.blurb}
            </p>
          </div>
        )}
      </div>

      {/* The selectors. */}
      <div
        className={
          thumbnails
            ? "grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3"
            : "flex flex-wrap gap-2 sm:gap-3"
        }
      >
        {options.map((o) => {
          const active = o.label === value;
          return thumbnails ? (
            <button
              key={o.label}
              type="button"
              onClick={() => onChange(o.label)}
              aria-pressed={active}
              className={`group relative aspect-[4/3] overflow-hidden border transition-all duration-300 ${
                active
                  ? "border-clay ring-2 ring-clay/30"
                  : "border-hairline hover:border-primary/40"
              }`}
            >
              {o.image && (
                // A plain img: these are six fixed local webp files at a known
                // size, so next/image's resizing pipeline buys nothing here.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={o.image}
                  alt={o.label}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    active ? "" : "opacity-75 group-hover:opacity-100"
                  }`}
                />
              )}
              <span
                className={`absolute inset-x-0 bottom-0 px-1.5 py-1 font-label text-[10px] sm:text-[11px] font-medium tracking-wide text-white truncate transition-colors duration-300 ${
                  active ? "bg-clay" : "bg-primary/75 group-hover:bg-primary"
                }`}
              >
                {o.label}
              </span>
            </button>
          ) : (
            <button
              key={o.label}
              type="button"
              onClick={() => onChange(o.label)}
              aria-pressed={active}
              className={`px-5 sm:px-6 py-3 font-headline font-bold text-[14px] sm:text-[15px] border transition-all duration-300 ${
                active
                  ? "bg-primary text-white border-primary"
                  : "bg-surface text-primary border-hairline hover:border-primary/50"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
