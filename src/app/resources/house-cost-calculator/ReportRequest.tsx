"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icon";
import type { RoomRow, Selections } from "@/lib/houseCostCalculator";

/**
 * The reason this page exists.
 *
 * The calculator answers the visitor's question for free, which is what earns
 * the right to ask for anything at all. This block is where that exchange is
 * made: a real document, described honestly, for a name and an email.
 *
 * The report is also offered as a direct download once it is ready, so a
 * misconfigured mail provider or an over-eager spam filter cannot swallow the
 * one thing the visitor came here for.
 */

export default function ReportRequest({
  selections,
  rooms,
  disabled,
}: {
  selections: Selections;
  rooms: RoomRow[];
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [emailed, setEmailed] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOk || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/cost-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: {
            region: selections.region,
            standard: selections.standard,
            roof: selections.roofType,
            method: selections.buildMethod,
          },
          rooms,
          name,
          email,
          phone,
          website,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "invalid_email"
            ? "כתובת האימייל לא נראית תקינה."
            : data.error === "no_rooms"
              ? "הוסיפו חדרים לבית לפני שליחת הדוח."
              : "משהו השתבש. נסו שוב בעוד רגע.",
        );
        return;
      }
      setDone(true);
      setEmailed(Boolean(data.emailed));
      if (data.pdf) {
        // Held as a blob so the visitor can save the document immediately,
        // whether or not the email reaches them.
        const bytes = Uint8Array.from(atob(data.pdf), (c) => c.charCodeAt(0));
        setPdfUrl(URL.createObjectURL(new Blob([bytes], { type: "application/pdf" })));
      }
    } catch {
      setError("אין חיבור לשרת כרגע. נסו שוב.");
    } finally {
      setBusy(false);
    }
  };

  const field =
    "w-full bg-surface border border-hairline px-4 py-3 font-body text-[16px] text-primary " +
    "transition-colors duration-300 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/25";

  if (done) {
    return (
      <div className="bg-surface border border-clay/40 p-7">
        <p className="flex items-start gap-3 font-headline font-bold text-lg text-primary">
          <CheckIcon size={22} className="text-clay shrink-0 mt-0.5" />
          <span>{emailed ? "הדוח נשלח אליכם למייל" : "הדוח מוכן"}</span>
        </p>
        <p className="font-body text-[15px] text-secondary leading-relaxed mt-3">
          {emailed
            ? "אם הוא לא הגיע תוך כמה דקות, כדאי לבדוק בתיקיית הספאם."
            : "אפשר להוריד אותו כאן. נחזור אליכם גם בקרוב."}
        </p>
        {pdfUrl && (
          <a
            href={pdfUrl}
            download="דוח-עלויות-טל-גורן.pdf"
            className="group mt-5 inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-clay"
          >
            הורידו את הדוח
            <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="bg-primary text-white p-7">
      <h2 className="font-headline font-black text-2xl tracking-tight">
        רוצים את המספרים המלאים?
      </h2>
      <p className="font-body text-[15px] text-white/75 leading-relaxed mt-3">
        המספר שלמעלה הוא עלות הבנייה בלבד. בדוח המפורט תקבלו גם את מה שנוסף מעליה —
        יועצים, אגרות ורזרבה — לוח זמנים ריאלי לכל שלב, והמלצות שמותאמות לבית שהרכבתם.
      </p>

      <ul className="mt-5 space-y-2">
        {[
          "פירוט מלא של סעיפי העלות",
          "לוח זמנים משוער עד הכניסה הביתה",
          "המלצות אישיות לפי הבחירות שלכם",
        ].map((line) => (
          <li key={line} className="flex items-start gap-2.5 font-body text-[14px] text-white/85">
            <CheckIcon size={16} className="text-clay shrink-0 mt-0.5" />
            {line}
          </li>
        ))}
      </ul>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={disabled}
          className="group mt-6 w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-clay text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-white hover:text-primary disabled:opacity-40 disabled:pointer-events-none"
        >
          שלחו לי את הדוח המפורט
          <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
        </button>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-3" noValidate>
          <input
            aria-label="שם"
            placeholder="שם"
            className={field}
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            aria-label="אימייל"
            placeholder="אימייל"
            type="email"
            dir="ltr"
            className={`${field} text-start`}
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            aria-label="טלפון (לא חובה)"
            placeholder="טלפון (לא חובה)"
            type="tel"
            dir="ltr"
            className={`${field} text-start`}
            value={phone}
            autoComplete="tel"
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="absolute w-px h-px overflow-hidden -m-px" aria-hidden>
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          {error && <p role="alert" className="font-body text-[14px] text-white bg-clay/80 px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={busy || !emailOk}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-clay text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-white hover:text-primary disabled:opacity-40"
          >
            {busy ? "מכינים את הדוח…" : "שלחו לי את הדוח"}
          </button>
          <p className="font-body text-[13px] text-white/55 leading-relaxed">
            הפרטים משמשים לשליחת הדוח ולחזרה אליכם בלבד.
          </p>
        </form>
      )}
    </div>
  );
}
