"use client";

import type { StepOption } from "@/data/calculatorSteps";
import { StageFrame } from "./StageFrame";

/**
 * Build method, drawn as a wall section.
 *
 * The three methods differ in what a wall is made of, which is invisible in any
 * finished photograph and obvious in a section. Each layer is labelled, because
 * "GSB או ICF" means nothing to most people until they see that the insulation
 * is the wall rather than a layer stuck onto it.
 */

type Layer = { w: number; className: string; label: string; dark?: boolean };

const SECTIONS: Record<string, Layer[]> = {
  "קונבנציונלית 'רגילה'": [
    { w: 26, className: "fill-surface-container-highest", label: "טיח" },
    { w: 88, className: "fill-primary/85", label: "בלוק בטון", dark: true },
    { w: 34, className: "fill-tertiary/50", label: "בידוד" },
    { w: 26, className: "fill-surface-container-highest", label: "טיח חוץ" },
  ],
  "בניה מתקדמת": [
    { w: 26, className: "fill-surface-container-highest", label: "טיח" },
    { w: 70, className: "fill-primary/85", label: "שלד מתועש", dark: true },
    { w: 62, className: "fill-tertiary/50", label: "בידוד מוגבר" },
    { w: 26, className: "fill-clay/70", label: "חיפוי", dark: true },
  ],
  "GSB או ICF": [
    { w: 26, className: "fill-surface-container-highest", label: "טיח" },
    { w: 40, className: "fill-tertiary/50", label: "תבנית מבודדת" },
    { w: 62, className: "fill-primary/85", label: "ליבת בטון", dark: true },
    { w: 40, className: "fill-tertiary/50", label: "תבנית מבודדת" },
  ],
};

const SCALE = 2.1;

export default function MethodStage({
  options,
  value,
  onChange,
}: {
  options: StepOption[];
  value: string | null;
  onChange: (label: string) => void;
}) {
  const layers = value ? SECTIONS[value] ?? [] : [];
  const total = layers.reduce((sum, l) => sum + l.w, 0);
  // Cumulative x offset per layer, computed up front so the render itself
  // stays pure — no running counter mutated inside the map below.
  const offsets = layers.reduce<number[]>(
    (acc, l, i) => [...acc, (acc[i] ?? 0) + l.w],
    [0],
  );

  return (
    <StageFrame options={options} value={value} onChange={onChange}>
      <div className="absolute inset-0 flex items-center justify-center p-6 pb-32 sm:pb-36">
        <svg viewBox="0 0 420 250" className="w-full h-full max-w-xl" role="img"
             aria-label={value ? `חתך קיר — ${value}` : "חתך קיר"}>
          {/* Inside / outside, so the section has an orientation. */}
          <text x={8} y={22} className="fill-ink-mute font-label" fontSize={13}>פנים</text>
          <text x={412} y={22} textAnchor="end" className="fill-ink-mute font-label" fontSize={13}>חוץ</text>

          <g transform={`translate(${(420 - total * SCALE) / 2}, 40)`}>
            {layers.map((l, i) => {
              const px = offsets[i] * SCALE;
              const w = l.w * SCALE;
              return (
                <g key={`${value}-${l.label}`}>
                  <rect
                    x={px}
                    y={0}
                    width={w}
                    height={190}
                    className={`${l.className} layer-grow`}
                    style={{ animationDelay: `${i * 70}ms` }}
                  />
                  {/* Set vertically inside the layer, the way a real wall
                      section is annotated — thin layers have no room for a
                      horizontal label, and leader lines fight each other. */}
                  <text
                    transform={`translate(${px + w / 2}, 95) rotate(-90)`}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={l.dark ? "fill-white/85" : "fill-secondary"}
                    fontSize={12}
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}
            <rect x={0} y={0} width={total * SCALE} height={190} className="fill-none stroke-primary/40" strokeWidth={1.5} />
          </g>
        </svg>
      </div>
    </StageFrame>
  );
}
