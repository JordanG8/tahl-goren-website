"use client";

import type { StepOption } from "@/data/calculatorSteps";
import { StageFrame } from "./StageFrame";

/**
 * Roof type, drawn rather than photographed.
 *
 * A roof is a section decision — pitch, structure, drainage — and a photograph
 * of a finished house hides exactly the part that costs money. Three sections
 * of the same house are cross-faded so the difference reads as one building
 * changing its hat, not three separate buildings.
 */

const SHAPES: Record<string, React.ReactNode> = {
  "גג שטוח": (
    <>
      <path d="M120 250 h360 v-14 h-360 z" className="fill-primary" />
      <path d="M132 236 h336" className="stroke-white/25" strokeWidth={2} />
      {/* Solar panels — the practical argument for a flat roof. */}
      <g className="fill-tertiary/70">
        <rect x={190} y={214} width={62} height={20} rx={2} transform="skewX(-14)" />
        <rect x={272} y={214} width={62} height={20} rx={2} transform="skewX(-14)" />
      </g>
    </>
  ),
  "גג רעפים": (
    <>
      <path d="M104 250 L300 132 L496 250 Z" className="fill-clay" />
      <path d="M300 132 L300 250" className="stroke-white/25" strokeWidth={2} />
      {[168, 196, 224].map((y, i) => (
        <path
          key={y}
          d={`M${300 - (y - 132) * 1.66} ${y} H${300 + (y - 132) * 1.66}`}
          className="stroke-white/20"
          strokeWidth={1.5}
          style={{ transitionDelay: `${i * 60}ms` }}
        />
      ))}
    </>
  ),
  "משולב שטוח ורעפים": (
    <>
      <path d="M300 250 L300 168 L488 250 Z" className="fill-clay" />
      <path d="M120 250 h180 v-14 h-180 z" className="fill-primary" />
      <g className="fill-tertiary/70">
        <rect x={172} y={214} width={58} height={20} rx={2} transform="skewX(-14)" />
      </g>
    </>
  ),
};

export default function RoofStage({
  options,
  value,
  onChange,
}: {
  options: StepOption[];
  value: string | null;
  onChange: (label: string) => void;
}) {
  return (
    <StageFrame options={options} value={value} onChange={onChange}>
      <div className="absolute inset-0 flex items-center justify-center p-6 pb-32 sm:pb-36">
        <svg viewBox="0 0 600 380" className="w-full h-full max-w-2xl" role="img"
             aria-label={value ? `סכמה של ${value}` : "סכמת גג"}>
          {/* The house below the roof never changes — that is the point. */}
          <rect x={120} y={250} width={360} height={104} className="fill-surface stroke-hairline" strokeWidth={2} />
          <rect x={168} y={286} width={54} height={68} className="fill-background stroke-hairline" strokeWidth={2} />
          <rect x={266} y={286} width={68} height={44} className="fill-background stroke-hairline" strokeWidth={2} />
          <rect x={378} y={286} width={54} height={68} className="fill-background stroke-hairline" strokeWidth={2} />
          <path d="M60 354 H540" className="stroke-primary/30" strokeWidth={2} />

          {options.map((o) => (
            <g
              key={o.label}
              className="transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: o.label === value ? 1 : 0 }}
              aria-hidden={o.label !== value}
            >
              {SHAPES[o.label]}
            </g>
          ))}
        </svg>
      </div>
    </StageFrame>
  );
}
