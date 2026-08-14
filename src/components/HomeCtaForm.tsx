"use client";

import { useState } from "react";
import { trackLead } from "@/lib/trackLead";
import { ArrowIcon, PhoneIcon, ChatIcon, CheckIcon } from "@/components/ui/Icon";
import Reveal from "@/components/motion/Reveal";

const CREDENTIALS = [
  "בוגרת הטכניון בהצטיינות",
  "אדריכלית רשויה ומורשית היתר",
  "25+ שנות ניסיון",
];

type HomeCtaFormProps = {
  eyebrow: string;
  heading: string;
  placement: string;
  headingTag?: "h1" | "h2";
  /** Adds the direct phone / WhatsApp row under the form. */
  showDirect?: boolean;
};

/**
 * The site's single lead-capture band.
 *
 * Previously this rendered three times on the homepage with near-identical
 * copy, plus two more standalone CTA sections — five interruptions in one
 * scroll. It now appears twice at most, and reads as a deliberate pause in the
 * page rather than a banner: ink ground, drafting grid, form on the reading
 * edge, proof on the other side.
 */
export default function HomeCtaForm({
  eyebrow,
  heading,
  placement,
  headingTag = "h2",
  showDirect = false,
}: HomeCtaFormProps) {
  const Heading = headingTag;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: "quick@cta.com",
          message: "פניה מהירה מדף הבית",
          website: "",
          sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      trackLead("form", { placement });
      setStatus("success");
      setName("");
      setPhone("");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full bg-white/[0.06] border border-white/20 text-white placeholder-white/45 px-4 py-3.5 font-body text-base rounded-none transition-colors duration-300 focus:outline-none focus:border-clay focus:bg-white/10";

  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-[0.35] pointer-events-none" />
      {/* A single clay hairline at the top edge marks the band without the
          heavy 4px frame the previous version drew on all sides. */}
      <div className="absolute top-0 inset-x-0 h-px bg-clay/70" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Pitch */}
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="rule-draw h-px w-10 bg-white/30" />
              <span className="font-label font-medium text-[13px] uppercase tracking-[0.2em] text-white/50">
                {eyebrow}
              </span>
            </div>
            <Heading className="font-headline font-black text-3xl sm:text-4xl lg:text-[2.75rem] text-white tracking-tight leading-[1.1] measure-tight">
              {heading}
            </Heading>
            <p className="font-body text-white/65 text-base sm:text-lg leading-relaxed mt-6 measure">
              שיחת היכרות קצרה, ללא עלות וללא התחייבות. נבין מה אתם רוצים לבנות,
              ואומר לכם בכנות אם ואיך אני יכולה לעזור.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8">
              {CREDENTIALS.map((c) => (
                <li key={c} className="flex items-center gap-2 text-white/55 font-label font-medium text-[13px]">
                  <CheckIcon size={14} className="text-clay" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal delay={120} className="lg:col-span-6 lg:pr-8">
            {status === "success" ? (
              <div className="border border-white/20 bg-white/[0.06] p-10 text-center">
                <CheckIcon size={30} className="text-clay mx-auto" />
                <h3 className="font-headline font-black text-2xl text-white mt-4">תודה רבה!</h3>
                <p className="font-body text-white/65 mt-2">
                  קיבלתי את הפנייה שלכם ואחזור אליכם בהקדם לשיחה.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="sr-only">שם מלא</span>
                    <input
                      type="text"
                      placeholder="שם מלא"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">מספר טלפון</span>
                    <input
                      type="tel"
                      placeholder="מספר טלפון"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className={field}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group w-full bg-white text-primary px-8 py-4 font-headline font-bold text-[13px] uppercase tracking-[0.13em] transition-colors duration-500 hover:bg-clay hover:text-white disabled:opacity-50 inline-flex items-center justify-center gap-3"
                >
                  {status === "submitting" ? "שולח..." : "דברו איתי"}
                  {status !== "submitting" && (
                    <ArrowIcon
                      size={17}
                      className="transition-transform duration-500 group-hover:-translate-x-1"
                    />
                  )}
                </button>

                {status === "error" && (
                  <p className="font-body text-base text-red-300 mt-1">
                    משהו השתבש בשליחה. אפשר לנסות שוב, או לפנות ישירות בטלפון 052-8345799.
                  </p>
                )}

                {showDirect && (
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-5 pt-5 border-t border-white/12">
                    <a
                      href="tel:0528345799"
                      onClick={() => trackLead("phone", { placement })}
                      className="flex items-center gap-2.5 text-white/65 hover:text-white transition-colors font-label text-sm"
                    >
                      <PhoneIcon size={17} />
                      052-8345799
                    </a>
                    <a
                      href="https://wa.me/972528345799"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackLead("whatsapp", { placement })}
                      className="flex items-center gap-2.5 text-white/65 hover:text-white transition-colors font-label text-sm"
                    >
                      <ChatIcon size={17} />
                      WhatsApp
                    </a>
                  </div>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
