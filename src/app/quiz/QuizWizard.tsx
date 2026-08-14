"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { quizQuestions } from "@/data/quizContent";
import type { Report } from "@/lib/report/schema";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icon";
import { trackLead } from "@/lib/trackLead";

/**
 * The feasibility wizard.
 *
 * The design brief was "fun and non-threatening", which in practice means: one
 * question per screen so nothing looks like a form, answers that advance on a
 * single tap so there is no Next button to hunt for, a visible and honest sense
 * of how much is left, and the ability to go back without losing anything.
 *
 * The contact step comes last, after nine questions the visitor has already
 * answered. Asking for an email first is what makes this kind of thing feel
 * like a toll gate.
 */

type Answers = Record<string, string | string[]>;
type Phase = "intro" | "questions" | "details" | "working" | "done" | "error";

const WORKING_STAGES = [
  "קוראים את התשובות שלכם",
  "בודקים מה טל כתבה בנושאים האלה",
  "מחשבים טווחי עלות ולוח זמנים",
  "מתאימים מסלול ליווי",
  "מרכיבים את הדוח ושולחים אליכם למייל",
];

const shekels = (n: number) => `${n.toLocaleString("he-IL")} ₪`;

export default function QuizWizard() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [report, setReport] = useState<Report | null>(null);
  const [emailed, setEmailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [stage, setStage] = useState(0);
  const headingRef = useRef<HTMLDivElement>(null);

  const total = quizQuestions.length;
  const question = quizQuestions[step];

  // Each screen change moves focus to the new question, so a screen-reader or
  // keyboard user is not left at the bottom of the previous one.
  useEffect(() => {
    if (phase === "questions" || phase === "details") headingRef.current?.focus();
  }, [phase, step]);

  // The status lines advance on their own while the request is in flight. They
  // describe work that is genuinely happening, in order — not a fake progress
  // bar timed to a guess.
  useEffect(() => {
    if (phase !== "working") return;
    const timer = setInterval(
      () => setStage((s) => Math.min(s + 1, WORKING_STAGES.length - 1)),
      2600,
    );
    return () => clearInterval(timer);
  }, [phase]);

  const choose = (q: (typeof quizQuestions)[number], value: string) => {
    if (q.kind === "multi") {
      const current = (answers[q.id] as string[]) ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [q.id]: next });
      return;
    }
    setAnswers({ ...answers, [q.id]: value });
    // A single-choice answer advances on its own, after just long enough for
    // the selected state to register.
    window.setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setPhase("details");
    }, 260);
  };

  const isSelected = (q: (typeof quizQuestions)[number], value: string) => {
    const a = answers[q.id];
    return Array.isArray(a) ? a.includes(value) : a === value;
  };

  const back = () => {
    if (phase === "details") {
      setPhase("questions");
      setStep(total - 1);
      return;
    }
    if (step > 0) setStep(step - 1);
    else setPhase("intro");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStage(0);
    setPhase("working");
    setErrorMsg("");

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, name, email, phone, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(
          data.error === "invalid_email"
            ? "כתובת האימייל אינה תקינה."
            : "משהו השתבש. אפשר לנסות שוב, או לפנות ישירות בטלפון 052-8345799.",
        );
        setPhase("error");
        return;
      }
      trackLead("form", { placement: "quiz" });
      setReport(data.report);
      setEmailed(Boolean(data.emailed));
      setPhase("done");
    } catch {
      setErrorMsg("אירעה שגיאה ברשת. אפשר לנסות שוב, או לפנות ישירות בטלפון 052-8345799.");
      setPhase("error");
    }
  };

  /* ---------------------------------------------------------------- intro */
  if (phase === "intro") {
    return (
      <Shell>
        <span className="font-label font-medium text-sm uppercase tracking-[0.14em] text-clay">
          בדיקת היתכנות · ללא עלות
        </span>
        <h1 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.05] mt-6">
          כמה יעלה הבית
          <br />
          שאתם מדמיינים?
        </h1>
        <p className="font-body text-lg sm:text-xl text-secondary leading-[1.75] mt-7 measure">
          תשע שאלות קצרות, בערך שתי דקות. בסוף תקבלו למייל דוח אישי עם הערכת
          עלויות, לוח זמנים ריאלי לכל שלב, ומסלול הליווי שמתאים לכם — בלי
          התחייבות ובלי שיחת מכירה.
        </p>

        <ul className="mt-9 space-y-3">
          {[
            "הערכת תקציב לפי הגודל והסוג שתבחרו",
            "לוח זמנים לכל שלב, מהבירורים ועד המפתח",
            "המלצות שמבוססות על מה שטל עצמה כתבה",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3 font-body text-base text-secondary">
              <CheckIcon size={18} className="text-clay mt-1 flex-shrink-0" />
              {line}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setPhase("questions")}
          className="group inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-[1.15rem] mt-10 font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-clay"
        >
          נתחיל
          <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
        </button>
      </Shell>
    );
  }

  /* ------------------------------------------------------------ questions */
  if (phase === "questions") {
    return (
      <Shell>
        <Progress current={step + 1} total={total + 1} />
        <div ref={headingRef} tabIndex={-1} className="outline-none">
          <span className="font-label font-medium text-sm uppercase tracking-[0.14em] text-clay">
            {question.eyebrow}
          </span>
          <h1 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight leading-[1.1] mt-5">
            {question.title}
          </h1>
          {question.hint && (
            <p className="font-body text-base sm:text-lg text-secondary leading-relaxed mt-4 measure">
              {question.hint}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
          {question.options.map((opt) => {
            const selected = isSelected(question, opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => choose(question, opt.value)}
                aria-pressed={selected}
                className={`group text-start border p-5 sm:p-6 transition-all duration-300 ${
                  selected
                    ? "border-clay bg-clay/[0.07]"
                    : "border-hairline bg-surface hover:border-primary/40 hover:-translate-y-0.5"
                }`}
              >
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-headline font-bold text-lg text-primary leading-snug">
                      {opt.label}
                    </span>
                    {opt.hint && (
                      <span className="block font-body text-base text-ink-mute mt-1.5 leading-snug">
                        {opt.hint}
                      </span>
                    )}
                  </span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 border flex items-center justify-center transition-colors duration-300 ${
                      selected ? "border-clay bg-clay text-white" : "border-hairline text-transparent"
                    } ${question.kind === "multi" ? "" : "rounded-full"}`}
                  >
                    <CheckIcon size={14} />
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-6 mt-10">
          <button
            type="button"
            onClick={back}
            className="group inline-flex items-center gap-2.5 font-headline font-bold text-base text-ink-mute hover:text-primary transition-colors"
          >
            <ArrowIcon size={17} direction="back" className="transition-transform duration-500 group-hover:translate-x-1" />
            חזרה
          </button>

          {/* Multi-select has nothing to advance on, so it gets its own control;
              so does a question the visitor would rather skip. */}
          <button
            type="button"
            onClick={() => (step < total - 1 ? setStep(step + 1) : setPhase("details"))}
            className="group inline-flex items-center gap-2.5 font-headline font-bold text-base text-primary hover:text-clay transition-colors"
          >
            <span className="link-quiet">
              {question.kind === "multi" || answers[question.id] ? "המשך" : "דלגו על השאלה"}
            </span>
            <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
          </button>
        </div>
      </Shell>
    );
  }

  /* -------------------------------------------------------------- details */
  if (phase === "details") {
    const field =
      "w-full bg-transparent border-0 border-b border-hairline py-3.5 px-0 focus:outline-none focus:border-clay transition-colors duration-300 font-body text-lg text-primary placeholder:text-ink-mute/70";
    return (
      <Shell>
        <Progress current={total + 1} total={total + 1} />
        <div ref={headingRef} tabIndex={-1} className="outline-none">
          <span className="font-label font-medium text-sm uppercase tracking-[0.14em] text-clay">
            כמעט סיימנו
          </span>
          <h1 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight leading-[1.1] mt-5">
            לאן לשלוח את הדוח?
          </h1>
          <p className="font-body text-base sm:text-lg text-secondary leading-relaxed mt-4 measure">
            הדוח נשלח אליכם כקובץ PDF. לא נרשם אתכם לשום דיוור, ולא נעביר את
            הפרטים לאף אחד.
          </p>
        </div>

        <form onSubmit={submit} className="mt-10 space-y-8 max-w-xl">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden
          />
          <div className="space-y-2">
            <label htmlFor="q-name" className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-ink-mute">
              שם
            </label>
            <input
              id="q-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
              placeholder="איך לפנות אליכם?"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="q-email" className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-ink-mute">
              אימייל <span className="text-clay">·</span> חובה
            </label>
            <input
              id="q-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
              placeholder="לשם יישלח הדוח"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="q-phone" className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-ink-mute">
              טלפון <span className="text-ink-mute">· לא חובה</span>
            </label>
            <input
              id="q-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={field}
              placeholder="אם תרצו שטל תחזור אליכם"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-[1.15rem] font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-clay"
            >
              שלחו לי את הדוח
              <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
            </button>
            <button
              type="button"
              onClick={back}
              className="group inline-flex items-center gap-2.5 font-headline font-bold text-base text-ink-mute hover:text-primary transition-colors"
            >
              <ArrowIcon size={17} direction="back" className="transition-transform duration-500 group-hover:translate-x-1" />
              חזרה
            </button>
          </div>
        </form>
      </Shell>
    );
  }

  /* -------------------------------------------------------------- working */
  if (phase === "working") {
    return (
      <Shell>
        <span className="font-label font-medium text-sm uppercase tracking-[0.14em] text-clay">
          רגע אחד
        </span>
        <h1 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight leading-[1.1] mt-5">
          בונים את הדוח שלכם
        </h1>
        <ol className="mt-10 border-t border-hairline max-w-xl">
          {WORKING_STAGES.map((label, i) => (
            <li
              key={label}
              className="flex items-center gap-4 py-4 border-b border-hairline transition-opacity duration-700"
              style={{ opacity: i <= stage ? 1 : 0.35 }}
            >
              <span
                className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                  i < stage ? "border-clay bg-clay text-white" : "border-hairline text-transparent"
                }`}
              >
                <CheckIcon size={13} />
              </span>
              <span
                className={`font-body text-base sm:text-lg ${
                  i === stage ? "text-primary font-semibold" : "text-secondary"
                }`}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
        <p className="font-body text-base text-ink-mute mt-7">
          זה לוקח בערך חצי דקה. אל תסגרו את החלון.
        </p>
      </Shell>
    );
  }

  /* ---------------------------------------------------------------- error */
  if (phase === "error") {
    return (
      <Shell>
        <h1 className="font-headline font-black text-3xl sm:text-4xl text-primary tracking-tight leading-tight">
          לא הצלחנו לשלוח
        </h1>
        <p className="font-body text-lg text-secondary leading-relaxed mt-5 measure">{errorMsg}</p>
        <div className="flex flex-wrap gap-6 mt-9">
          <button
            type="button"
            onClick={() => setPhase("details")}
            className="group inline-flex items-center gap-3 bg-primary text-white px-9 py-4 font-headline font-bold text-[15px] uppercase tracking-[0.1em] hover:bg-clay transition-colors duration-500"
          >
            לנסות שוב
            <ArrowIcon size={17} />
          </button>
          <a
            href="tel:0528345799"
            className="inline-flex items-center gap-2.5 font-headline font-bold text-base text-primary hover:text-clay transition-colors"
          >
            <span className="link-quiet">052-8345799</span>
          </a>
        </div>
      </Shell>
    );
  }

  /* ----------------------------------------------------------------- done */
  return (
    <Shell wide>
      <span className="font-label font-medium text-sm uppercase tracking-[0.14em] text-clay">
        הדוח מוכן
      </span>
      <h1 className="font-headline font-black text-4xl sm:text-5xl text-primary tracking-tight leading-[1.05] mt-5">
        {report?.headline ?? "בדיקת ההיתכנות שלכם"}
      </h1>
      {report?.summary && (
        <p className="font-body text-lg sm:text-xl text-secondary leading-[1.75] mt-6 measure">
          {report.summary}
        </p>
      )}

      <p className="font-body text-base text-primary bg-clay/[0.08] border-s-2 border-clay ps-5 py-4 mt-8 max-w-xl">
        {emailed
          ? `שלחנו את הדוח המלא ל-${email}. אם הוא לא הגיע תוך כמה דקות, כדאי להציץ בתיקיית הספאם.`
          : "הדוח מוכן ומוצג כאן. לא הצלחנו לשלוח אותו למייל — אפשר לפנות לטל ישירות ונשלח שוב."}
      </p>

      {report && report.costs.lines.length > 0 && (
        <section className="mt-14">
          <h2 className="font-headline font-black text-2xl text-primary">הערכת עלויות</h2>
          <div className="border-t border-hairline mt-6">
            {report.costs.lines.map((l) => (
              <div key={l.label} className="flex items-baseline justify-between gap-6 py-4 border-b border-hairline">
                <div>
                  <span className="font-headline font-bold text-lg text-primary">{l.label}</span>
                  {l.note && (
                    <span className="block font-body text-base text-ink-mute mt-1">{l.note}</span>
                  )}
                </div>
                <span className="font-headline font-bold text-lg text-primary whitespace-nowrap">
                  {l.low === l.high ? shekels(l.low) : `${shekels(l.low)} – ${shekels(l.high)}`}
                </span>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 py-5">
              <span className="font-headline font-black text-xl text-primary">סה״כ הערכה</span>
              <span className="font-headline font-black text-xl text-clay whitespace-nowrap">
                {shekels(report.costs.total.low)} – {shekels(report.costs.total.high)}
              </span>
            </div>
          </div>
          <p className="font-body text-base text-ink-mute mt-4 measure">
            הערכה ראשונית בלבד, לפי טווחי עלות מקובלים באזור והתשובות שמסרתם — לא הצעת מחיר.
          </p>
        </section>
      )}

      {report && (
        <section className="mt-14">
          <h2 className="font-headline font-black text-2xl text-primary">מסלול הליווי שמתאים לכם</h2>
          <div className="border-t border-hairline mt-6 pt-6">
            <span className="font-headline font-black text-xl text-primary">{report.track.name}</span>
            <p className="font-body text-lg text-secondary leading-relaxed mt-3 measure">
              {report.track.reason || report.track.subtitle}
            </p>
          </div>
        </section>
      )}

      {report && report.recommendations.length > 0 && (
        <section className="mt-14">
          <h2 className="font-headline font-black text-2xl text-primary">מה כדאי לעשות עכשיו</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mt-6">
            {report.recommendations.map((r, i) => (
              <div key={r.title} className="border-t border-hairline pt-5">
                <span className="font-label font-semibold text-sm tracking-[0.14em] text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-headline font-bold text-lg text-primary mt-2">{r.title}</h3>
                <p className="font-body text-base text-secondary leading-relaxed mt-2">{r.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap items-center gap-6 mt-16 pt-10 border-t border-hairline">
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-[1.15rem] font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-clay"
        >
          לפגישת ייעוץ ללא עלות
          <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
        </Link>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2.5 font-headline font-bold text-base text-primary hover:text-clay transition-colors"
        >
          <span className="link-quiet">לצפייה בפרויקטים</span>
          <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
        </Link>
      </div>
    </Shell>
  );
}

function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`mx-auto px-6 sm:px-8 py-16 sm:py-24 ${wide ? "max-w-4xl" : "max-w-2xl"}`}>
      {children}
    </div>
  );
}

function Progress({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-ink-mute">
          שאלה {current} מתוך {total}
        </span>
        <span className="font-label font-medium text-[13px] text-ink-mute">
          {Math.round((current / total) * 100)}%
        </span>
      </div>
      <div className="h-px bg-hairline w-full overflow-hidden">
        <div
          className="h-full bg-clay transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
