"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/ui/Icon";

/**
 * The contact step.
 *
 * It comes last, after the visitor has already built a whole house, because
 * asking for an email up front is what makes a tool like this feel like a toll
 * gate. By this point they have spent real effort and the exchange is legible:
 * their details for the document.
 *
 * Either an email or a phone number is enough. Insisting on both, when only one
 * is needed to send the report, costs completions for nothing.
 */

export type Contact = { name: string; email: string; phone: string; website: string };

export default function ContactStage({
  value,
  onChange,
  onSubmit,
  submitting,
  error,
}: {
  value: Contact;
  onChange: (c: Contact) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const [touched, setTouched] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email.trim());
  const phoneOk = value.phone.replace(/\D/g, "").length >= 9;
  const nameOk = value.name.trim().length > 1;
  // The report is delivered by email, so an address is required; a phone number
  // is offered as well because most people here would rather be called.
  const canSend = nameOk && emailOk;

  const field =
    "w-full bg-surface border border-hairline px-4 py-3 font-body text-[16px] text-primary " +
    "transition-colors duration-300 hover:border-primary/40 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/25";
  const label =
    "block font-label font-medium text-[12px] uppercase tracking-[0.14em] text-ink-mute mb-2";

  return (
    <div className="max-w-xl mx-auto w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (canSend && !submitting) onSubmit();
        }}
        className="border border-hairline bg-surface p-6 sm:p-8"
        noValidate
      >
        <div className="space-y-5">
          <div>
            <label htmlFor="c-name" className={label}>שם</label>
            <input
              id="c-name"
              className={field}
              value={value.name}
              autoComplete="name"
              onChange={(e) => onChange({ ...value, name: e.target.value })}
            />
            {touched && !nameOk && (
              <p className="font-body text-[13px] text-clay mt-1.5">נשמח לדעת איך לפנות אליכם.</p>
            )}
          </div>

          <div>
            <label htmlFor="c-email" className={label}>אימייל</label>
            <input
              id="c-email"
              type="email"
              inputMode="email"
              dir="ltr"
              className={`${field} text-start`}
              value={value.email}
              autoComplete="email"
              onChange={(e) => onChange({ ...value, email: e.target.value })}
            />
            {touched && !emailOk && (
              <p className="font-body text-[13px] text-clay mt-1.5">
                לשם שליחת הדוח נדרשת כתובת אימייל תקינה.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="c-phone" className={label}>
              טלפון <span className="normal-case tracking-normal">(לא חובה)</span>
            </label>
            <input
              id="c-phone"
              type="tel"
              inputMode="tel"
              dir="ltr"
              className={`${field} text-start`}
              value={value.phone}
              autoComplete="tel"
              onChange={(e) => onChange({ ...value, phone: e.target.value })}
            />
            {value.phone.length > 0 && !phoneOk && (
              <p className="font-body text-[13px] text-ink-mute mt-1.5">
                מספר קצר מהצפוי — אפשר גם להשאיר ריק.
              </p>
            )}
          </div>

          {/* Honeypot: hidden from people, tempting to bots. */}
          <div className="absolute w-px h-px overflow-hidden -m-px" aria-hidden>
            <label htmlFor="c-website">אתר</label>
            <input
              id="c-website"
              tabIndex={-1}
              autoComplete="off"
              value={value.website}
              onChange={(e) => onChange({ ...value, website: e.target.value })}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="font-body text-[14px] text-clay mt-5 border-e-2 border-clay pe-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group mt-7 w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-clay disabled:opacity-50"
        >
          {submitting ? "מכינים את הדוח…" : "שלחו לי את הדוח"}
          {!submitting && (
            <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
          )}
        </button>

        <p className="font-body text-[13px] text-ink-mute leading-relaxed mt-4">
          הפרטים משמשים לשליחת הדוח ולחזרה אליכם בלבד. אפשר לבקש מחיקה בכל רגע.
        </p>
      </form>
    </div>
  );
}
