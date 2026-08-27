"use client";

import type { StepOption } from "@/data/calculatorSteps";
import { StageFrame } from "./StageFrame";

/**
 * Finish level, shown as the same room six times.
 *
 * The images are edits of one base render, so camera, geometry and daylight are
 * identical and only the finish and furniture move. That is the whole argument
 * of this screen: the visitor is not choosing between six houses, they are
 * watching one house get more or less expensive.
 *
 * All six are stacked and cross-faded rather than swapped, so the transition
 * reads as the same room changing rather than a slideshow advancing.
 */
export default function StandardStage({
  options,
  value,
  onChange,
}: {
  options: StepOption[];
  value: string | null;
  onChange: (label: string) => void;
}) {
  return (
    <StageFrame options={options} value={value} onChange={onChange} thumbnails>
      <div className="absolute inset-0">
        {options.map((o) => (
          <div
            key={o.label}
            className="absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ opacity: o.label === value ? 1 : 0 }}
            aria-hidden={o.label !== value}
          >
            {o.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={o.image}
                alt={`גימור ${o.label}`}
                className="h-full w-full object-cover"
                // The first level is likely to be shown immediately; the rest
                // load as the visitor moves along the row.
                loading={o.label === options[0].label ? "eager" : "lazy"}
              />
            )}
          </div>
        ))}
      </div>
    </StageFrame>
  );
}
