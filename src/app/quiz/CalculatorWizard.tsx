"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { steps, type StepId } from "@/data/calculatorSteps";
import { ArrowIcon } from "@/components/ui/Icon";
import RegionStage from "./stages/RegionStage";
import StandardStage from "./stages/StandardStage";
import RoofStage from "./stages/RoofStage";
import MethodStage from "./stages/MethodStage";
import RoomsStage from "./stages/RoomsStage";
import ContactStage, { type Contact } from "./stages/ContactStage";
import ResultStage from "./stages/ResultStage";
import type { Report } from "@/lib/report/schema";
import { trackLead } from "@/lib/trackLead";
import type { RoomRow } from "@/lib/houseCostCalculator";

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

/** Four house-profile questions, then rooms, then contact. */
const ROOMS_INDEX = steps.length;
const CONTACT_INDEX = steps.length + 1;
const TOTAL = steps.length + 2;

const STAGES = {
  region: RegionStage,
  standard: StandardStage,
  roof: RoofStage,
  method: MethodStage,
} as const;

export default function CalculatorWizard() {
  // Progress is one value so that restoring it is a single write rather than a
  // chain of them.
  const [progress, setProgress] = useState<{
    index: number;
    answers: Answers;
    rooms: RoomRow[];
  }>({ index: 0, answers: {}, rooms: [] });
  const [restored, setRestored] = useState(false);
  const [contact, setContact] = useState<Contact>({ name: "", email: "", phone: "", website: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [emailed, setEmailed] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { index, answers, rooms } = progress;

  // The page is server-rendered, so saved progress cannot be read until the
  // client is running — this has to happen in an effect. The lint rule guards
  // against setState in effects causing cascading renders; here it runs once on
  // mount, sets one piece of state, and has an empty dependency list.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as {
          answers?: Answers;
          index?: number;
          rooms?: RoomRow[];
        };
        setProgress({
          index: Math.min(Math.max(saved.index ?? 0, 0), TOTAL - 1),
          answers: saved.answers ?? {},
          rooms: Array.isArray(saved.rooms) ? saved.rooms : [],
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

  const onRooms = index === ROOMS_INDEX;
  const onContact = index === CONTACT_INDEX;
  const step = onRooms || onContact ? null : steps[index];
  const value = step ? answers[step.id] ?? null : null;
  const answered = onRooms ? rooms.length > 0 : onContact ? true : Boolean(value);
  const Stage = step ? STAGES[step.id] : null;

  const choose = (label: string) =>
    setProgress((p) =>
      step ? { ...p, answers: { ...p.answers, [step.id]: label } } : p,
    );

  const setRooms = (next: RoomRow[]) =>
    setProgress((p) => ({ ...p, rooms: next }));

  /**
   * Sends the finished house for a report.
   *
   * The server recomputes every figure from the workbook; nothing priced is
   * taken from this client. What goes up is the visitor's choices and their
   * details, and what comes back is the document.
   */
  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          rooms,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          website: contact.website,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "invalid_email"
            ? "כתובת האימייל לא נראית תקינה. בדקו אותה ונסו שוב."
            : data.error === "no_rooms"
              ? "נראה שלא נשמרו חדרים. חזרו צעד אחורה והוסיפו לפחות חדר אחד."
              : "משהו השתבש בדרך. נסו שוב בעוד רגע, ואם זה חוזר — כתבו לנו.",
        );
        return;
      }
      setReport(data.report);
      setEmailed(Boolean(data.emailed));
      trackLead("form", { source: "calculator", standard: answers.standard ?? null });
    } catch {
      setError("אין חיבור לשרת כרגע. בדקו את החיבור ונסו שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  const go = (delta: number) =>
    setProgress((p) => ({
      ...p,
      index: Math.min(Math.max(p.index + delta, 0), TOTAL - 1),
    }));

  return (
    <div className="flex flex-col min-h-[70svh] bg-background">
      {/* ---------- Progress and the question ---------- */}
      <header className="shrink-0 border-b border-hairline bg-background">
        <div
          className="h-[3px] bg-clay transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${((index + 1) / TOTAL) * 100}%` }}
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-label="התקדמות בשאלון"
        />
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 py-5 sm:py-6">
          <div className="flex items-center gap-4 mb-3">
            <span dir="ltr" className="font-label font-semibold text-[13px] tracking-[0.14em] text-clay">
              {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-hairline" />
            <span className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-ink-mute">
              {step ? step.eyebrow : onRooms ? "תוכנית החדרים" : "כמעט סיימנו"}
            </span>
          </div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-headline font-black text-2xl sm:text-4xl lg:text-5xl text-primary tracking-tight leading-[1.05] outline-none"
          >
            {step
              ? step.title
              : onRooms
                ? "אילו חדרים יהיו בבית?"
                : report
                  ? "הנה ההערכה שלכם"
                  : "לאן לשלוח את הדוח?"}
          </h1>
          <p className="font-body text-[15px] sm:text-base text-secondary mt-2.5 measure">
            {step
              ? step.hint
              : onRooms
                ? "כל גודל מצויר בקנה מידה אמיתי, עם ריהוט — כדי שתראו מה נכנס לחדר לפני שתבחרו."
                : report
                  ? "הדוח המלא בדרך אליכם למייל. אפשר גם להמשיך לשחק עם המספרים במחשבון."
                  : "נשלח אליכם דוח מפורט עם פירוט העלויות, לוח זמנים והמלצות — ללא עלות."}
          </p>
        </div>
      </header>

      {/* ---------- The visualisation ---------- */}
      <main className="flex-1 min-h-0 max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div
          key={step?.id ?? (onRooms ? "rooms" : "contact")}
          className={`stage-enter stage-${step?.id ?? (onRooms ? "rooms" : "contact")}`}
        >
          {step && Stage ? (
            <Stage options={step.options} value={value} onChange={choose} />
          ) : onRooms ? (
            <RoomsStage rooms={rooms} onChange={setRooms} />
          ) : report ? (
            <ResultStage report={report} emailed={emailed} />
          ) : (
            <ContactStage
              value={contact}
              onChange={setContact}
              onSubmit={submit}
              submitting={submitting}
              error={error}
            />
          )}
        </div>
      </main>

      {/* ---------- Navigation ---------- */}
      {!report && (
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
                screens rather than moving with the content above it. The
                contact screen supplies its own submit, so none is shown there. */}
            {!onContact && (
              <button
                type="button"
                onClick={() => go(1)}
                disabled={!answered}
                className="group inline-flex items-center gap-3 px-10 sm:px-14 py-3.5 sm:py-4 bg-primary text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-clay disabled:opacity-30 disabled:pointer-events-none"
              >
                {index === steps.length - 1
                  ? "לתוכנית החדרים"
                  : onRooms
                    ? "לקבלת הדוח"
                    : "הבא"}
                <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
              </button>
            )}
          </div>
          {!answered && !onContact && (
            <p className="pb-4 text-center font-body text-[13px] text-ink-mute">
              {onRooms ? "הוסיפו לפחות חדר אחד כדי להמשיך" : "בחרו אפשרות כדי להמשיך"}
            </p>
          )}
        </footer>
      )}

      <Link href="/" className="sr-only focus:not-sr-only">חזרה לדף הבית</Link>
    </div>
  );
}
