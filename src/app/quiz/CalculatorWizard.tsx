"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { steps, type StepId } from "@/data/calculatorSteps";
import { ArrowIcon } from "@/components/ui/Icon";
import RegionStage from "./stages/RegionStage";
import StandardStage from "./stages/StandardStage";
import RoofStage from "./stages/RoofStage";
import MethodStage from "./stages/MethodStage";

/**
 * The house-profile wizard.
 *
 * One decision per screen, with the screen given over to showing what the
 * decision means rather than to the control that makes it. The controls are
 * deliberately small and identical between steps; the visual is what changes.
 *
 * Answers are written to localStorage on every change, so a refresh, a phone
 * call mid-quiz or a back-navigation does not cost the visitor their progress.
 * Nothing here is sent anywhere until the contact step much later.
 */

const STORAGE_KEY = "tg-calculator-v1";

type Answers = Partial<Record<StepId, string>>;

const STAGES = {
  region: RegionStage,
  standard: StandardStage,
  roof: RoofStage,
  method: MethodStage,
} as const;

export default function CalculatorWizard() {
  // Progress is one value so that restoring it is a single write rather than a
  // chain of them.
  const [progress, setProgress] = useState<{ index: number; answers: Answers }>({
    index: 0,
    answers: {},
  });
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { index, answers } = progress;

  // The page is server-rendered, so saved progress cannot be read until the
  // client is running — this has to happen in an effect. The lint rule guards
  // against setState in effects causing cascading renders; here it runs once on
  // mount, sets one piece of state, and has an empty dependency list.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { answers?: Answers; index?: number };
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot restore on mount
        setProgress({
          index: Math.min(Math.max(saved.index ?? 0, 0), steps.length - 1),
          answers: saved.answers ?? {},
        });
      }
    } catch {
      // A corrupt or unavailable store is not worth failing the page over.
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Private mode, quota, blocked storage — the quiz still works.
    }
  }, [progress, restored]);

  // Each new question takes focus, so a screen-reader or keyboard user is not
  // left at the bottom of the previous screen.
  useEffect(() => {
    headingRef.current?.focus();
  }, [index]);

  const step = steps[index];
  const value = answers[step.id] ?? null;
  const answered = Boolean(value);
  const isLast = index === steps.length - 1;
  const Stage = STAGES[step.id];

  const choose = (label: string) =>
    setProgress((p) => ({ ...p, answers: { ...p.answers, [step.id]: label } }));

  const go = (delta: number) =>
    setProgress((p) => ({
      ...p,
      index: Math.min(Math.max(p.index + delta, 0), steps.length - 1),
    }));

  return (
    <div className="flex flex-col min-h-[70svh] bg-background">
      {/* ---------- Progress and the question ---------- */}
      <header className="shrink-0 border-b border-hairline bg-background">
        <div
          className="h-[3px] bg-clay transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label="התקדמות בשאלון"
        />
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 py-5 sm:py-6">
          <div className="flex items-center gap-4 mb-3">
            <span dir="ltr" className="font-label font-semibold text-[13px] tracking-[0.14em] text-clay">
              {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-hairline" />
            <span className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-ink-mute">
              {step.eyebrow}
            </span>
          </div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-headline font-black text-2xl sm:text-4xl lg:text-5xl text-primary tracking-tight leading-[1.05] outline-none"
          >
            {step.title}
          </h1>
          {step.hint && (
            <p className="font-body text-[15px] sm:text-base text-secondary mt-2.5 measure">
              {step.hint}
            </p>
          )}
        </div>
      </header>

      {/* ---------- The visualisation ---------- */}
      <main className="flex-1 min-h-0 max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div key={step.id} className={`stage-enter stage-${step.id}`}>
          <Stage options={step.options} value={value} onChange={choose} />
        </div>
      </main>

      {/* ---------- Navigation ---------- */}
      <footer className="shrink-0 border-t border-hairline bg-surface">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 font-headline font-bold text-[15px] text-primary border border-hairline transition-colors duration-300 hover:border-primary disabled:opacity-0 disabled:pointer-events-none"
          >
            <ArrowIcon size={17} className="rotate-180 transition-transform duration-500 group-hover:translate-x-1" />
            הקודם
          </button>

          {/* The forward action is the loud one, and it stays put between
              screens rather than moving with the content above it. */}
          <button
            type="button"
            onClick={() => !isLast && go(1)}
            disabled={!answered || isLast}
            className="group inline-flex items-center gap-3 px-10 sm:px-14 py-3.5 sm:py-4 bg-primary text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-clay disabled:opacity-30 disabled:pointer-events-none"
          >
            {isLast ? "לתוכנית החדרים" : "הבא"}
            <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
          </button>
        </div>
        {!answered && (
          <p className="pb-4 text-center font-body text-[13px] text-ink-mute">
            בחרו אפשרות כדי להמשיך
          </p>
        )}
      </footer>

      <Link href="/" className="sr-only focus:not-sr-only">חזרה לדף הבית</Link>
    </div>
  );
}
