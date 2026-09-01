"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/ui/Icon";
import type { CalculatorLead } from "./lead";

/**
 * The door to the calculator.
 *
 * The tool costs the office something real to give away — it is the practice's
 * own pricing model — so it opens after four details and not before: a name,
 * an email, the town they plan to build in, and permission to send the result
 * there once.
 *
 * The permission is asked for plainly and only for the one email. Nobody
 * arrives at a cost calculator wanting a mailing list, and a checkbox that
 * quietly signs them up for one would poison the exchange that makes the rest
 * of the page work.
 */

const field =
  "w-full bg-surface border border-hairline px-4 py-3 font-body text-[16px] text-primary " +
  "transition-colors duration-300 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/25";

const labelClass =
  "block font-label font-medium text-[12px] uppercase tracking-[0.14em] text-ink-mute mb-2";

export default function CalculatorGate({
  onUnlock,
}: {
  onUnlock: (lead: CalculatorLead) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [touched, setTouched] = useState(false);

  const nameOk = name.trim().length >= 2;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const cityOk = city.trim().length >= 2;
  const ready = nameOk && emailOk && cityOk && consent;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!ready || website.trim() !== "") return;
    onUnlock({
      name: name.trim(),
      email: email.trim(),
      city: city.trim(),
      consent: true,
    });
  };

  const problem = (ok: boolean) => touched && !ok;

  return (
    <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_440px] gap-10 lg:gap-16 items-start">
        {/* What they get, before they are asked for anything. */}
        <div className="min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-clay" />
            <span className="font-label font-medium text-sm uppercase tracking-[0.14em] text-ink-mute">
              לפני שמתחילים
            </span>
          </div>

          <h2 className="font-headline font-black text-3xl sm:text-4xl text-primary tracking-tight">
            ארבעה פרטים, ואפשר להתחיל
          </h2>

          <p className="font-body text-secondary leading-relaxed measure mt-5">
            המחשבון בנוי על מקדמי התכנון שהמשרד עובד איתם מול לקוחות, ואנחנו פותחים אותו
            לשימוש חופשי. בתמורה אנחנו מבקשים לדעת מי אתם ואיפה אתם מתכננים לבנות — כדי שנוכל
            לשלוח לכם את תוצאות החישוב ולהתאים אותן לאזור שלכם.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              ["בנייה חדר אחר חדר", "מוסיפים את החדרים שאתם רוצים, בוחרים גודל וקומה, וההערכה מתעדכנת מיד."],
              ["מספר, לא טווח מעורפל", 'הערכת עלות בנייה כוללת מע"מ, לפי מיקום, סטנדרט, סוג גג ושיטת בנייה.'],
              ["דוח מסודר במייל", "אם תבקשו, נשלח את החישוב המלא כקובץ PDF — פעם אחת, בלי רשימת תפוצה."],
            ].map(([title, body]) => (
              <li key={title} className="flex gap-4">
                <span className="mt-[0.85rem] h-px w-5 bg-clay shrink-0" />
                <span>
                  <span className="block font-headline font-bold text-[17px] text-primary">{title}</span>
                  <span className="block font-body text-[15px] text-secondary leading-relaxed mt-1">
                    {body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* The four details. */}
        <div className="bg-primary text-white p-7 sm:p-8 lg:sticky lg:top-24">
          <h3 className="font-headline font-black text-2xl tracking-tight">
            פתיחת המחשבון
          </h3>
          <p className="font-body text-[15px] text-white/75 leading-relaxed mt-3">
            הפרטים נשמרים אצלנו בלבד ומשמשים לשליחת החישוב ולחזרה אליכם.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
            <div>
              <label htmlFor="gate-name" className={`${labelClass} text-white/55`}>
                שם
              </label>
              <input
                id="gate-name"
                className={field}
                placeholder="השם שלכם"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={problem(nameOk)}
              />
              {problem(nameOk) && (
                <p className="font-body text-[13px] text-white bg-clay/80 px-2.5 py-1 inline-block mt-2">נשמח לדעת איך לפנות אליכם.</p>
              )}
            </div>

            <div>
              <label htmlFor="gate-email" className={`${labelClass} text-white/55`}>
                כתובת מייל
              </label>
              <input
                id="gate-email"
                type="email"
                dir="ltr"
                className={`${field} text-start`}
                placeholder="name@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={problem(emailOk)}
              />
              {problem(emailOk) && (
                <p className="font-body text-[13px] text-white bg-clay/80 px-2.5 py-1 inline-block mt-2">כתובת האימייל לא נראית תקינה.</p>
              )}
            </div>

            <div>
              <label htmlFor="gate-city" className={`${labelClass} text-white/55`}>
                הישוב שבו מתכננים לבנות
              </label>
              <input
                id="gate-city"
                className={field}
                placeholder="למשל: בנימינה"
                autoComplete="address-level2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-invalid={problem(cityOk)}
              />
              {problem(cityOk) && (
                <p className="font-body text-[13px] text-white bg-clay/80 px-2.5 py-1 inline-block mt-2">
                  כתבו את שם הישוב, גם אם עוד לא סגרתם על מגרש.
                </p>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 accent-clay cursor-pointer"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-invalid={problem(consent)}
              />
              <span className="font-body text-[14px] text-white/85 leading-relaxed">
                אני מאשר/ת שתשלחו לי את תוצאות החישוב במייל.
                <span className="block text-white/55 mt-1">
                  מייל אחד, לא רשימת תפוצה. לא נשלח דיוור ולא נעביר את הפרטים לאף אחד.
                </span>
              </span>
            </label>
            {problem(consent) && (
              <p className="font-body text-[13px] text-white bg-clay/80 px-2.5 py-1 inline-block">
                בלי האישור הזה אין לאן לשלוח את החישוב.
              </p>
            )}

            <div className="absolute w-px h-px overflow-hidden -m-px" aria-hidden>
              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-clay text-white font-headline font-bold text-[15px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-white hover:text-primary"
            >
              פתחו את המחשבון
              <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
