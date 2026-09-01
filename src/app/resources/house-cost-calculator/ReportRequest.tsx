"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icon";
import type { RoomRow, Selections } from "@/lib/houseCostCalculator";
import type { CalculatorLead } from "./lead";

/**
 * The reason this page exists.
 *
 * The details were already given at the door, so this block does not ask for
 * them again: it says where the report is going and sends it on one press. The
 * only thing still worth offering is a phone number, and that stays optional.
 *
 * The report is also offered as a direct download once it is ready, so a
 * misconfigured mail provider or an over-eager spam filter cannot swallow the
 * one thing the visitor came here for.
 */

export default function ReportRequest({
  lead,
  selections,
  rooms,
  disabled,
}: {
  lead: CalculatorLead;
  selections: Selections;
  rooms: RoomRow[];
  disabled: boolean;
}) {
  const [phone, setPhone] = useState("");
  const [askPhone, setAskPhone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [emailed, setEmailed] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const send = async () => {
    if (busy) return;
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
          name: lead.name,
          email: lead.email,
          city: lead.city,
          consent: lead.consent,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "invalid_email"
            ? "כתובת האימייל לא נראית תקינה."
            : data.error === "no_rooms"
              ? "הוסיפו חדרים לבית לפני שליחת הדוח."
              : data.error === "consent_required"
                ? "צריך את האישור שלכם כדי לשלוח את הדוח למייל."
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

      <p className="font-body text-[14px] text-white/70 leading-relaxed mt-5">
        נשלח אל <span dir="ltr" className="text-white">{lead.email}</span>, כפי שאישרתם בכניסה.
      </p>

      {askPhone ? (
        <input
          aria-label="טלפון (לא חובה)"
          placeholder="טלפון (לא חובה)"
          type="tel"
          dir="ltr"
          className={`${field} text-start mt-4`}
          value={phone}
          autoComplete="tel"
          onChange={(e) => setPhone(e.target.value)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setAskPhone(true)}
          className="mt-4 font-body text-[14px] text-white/60 underline underline-offset-4 hover:text-white transition-colors duration-300"
        >
          להוסיף טלפון, אם נוח לכם שנחזור אליכם
        </button>
      )}

      {error && (
        <p role="alert" className="font-body text-[14px] text-white bg-clay/80 px-3 py-2 mt-4">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={send}
        disabled={disabled || busy}
        className="group mt-5 w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-clay text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-white hover:text-primary disabled:opacity-40 disabled:pointer-events-none"
      >
        {busy ? "מכינים את הדוח…" : "שלחו לי את החישוב למייל"}
        {!busy && (
          <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
        )}
      </button>

      <p className="font-body text-[13px] text-white/55 leading-relaxed mt-3">
        הפרטים משמשים לשליחת הדוח ולחזרה אליכם בלבד.
      </p>
    </div>
  );
}
