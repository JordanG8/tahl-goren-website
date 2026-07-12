"use client";

import { useState } from "react";
import { trackLead } from "@/lib/trackLead";

const CREDENTIALS_LINE = "בוגרת הטכניון בהצטיינות · אדריכלית רשויה ומורשית היתר · 25+ שנות ניסיון";

type HomeCtaFormProps = {
  eyebrow: string;
  heading: string;
  placement: string;
  headingTag?: "h1" | "h2";
};

export default function HomeCtaForm({ eyebrow, heading, placement, headingTag = "h2" }: HomeCtaFormProps) {
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

  return (
    <section className="relative border-y-4 border-[#A96F57] bg-primary blueprint-grid overflow-hidden">
      <div className="absolute inset-0 bg-primary/95" />
      <div className="relative z-10 max-w-xl mx-auto px-6 py-10 md:py-12 flex flex-col items-center text-center">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">
          {eyebrow}
        </span>

        <Heading className="font-headline font-black text-2xl sm:text-3xl text-white tracking-tight leading-[1.2] mb-2 max-w-sm">
          {heading}
        </Heading>

        <p className="font-body text-sm text-white/60 mb-6 max-w-xs">
          השאירו פרטים לשיחת היכרות קצרה — ללא עלות וללא התחייבות.
        </p>

        {status === "success" ? (
          <div className="bg-white p-6 text-center w-full max-w-sm mx-auto shadow-xl">
            <h3 className="font-headline font-black text-xl text-primary mb-1">תודה רבה!</h3>
            <p className="font-body text-sm text-secondary">קיבלנו את פנייתך. נחזור אליך בהקדם לשיחה.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-full max-w-xs mx-auto">
              <input
                type="text"
                placeholder="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white text-primary placeholder-secondary px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#A96F57] font-body text-sm rounded-none"
              />
              <input
                type="tel"
                placeholder="מספר טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-white text-primary placeholder-secondary px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#A96F57] font-body text-sm rounded-none"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-white text-primary px-8 py-3.5 font-headline font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "שולח..." : "דברו איתי"}
              </button>
            </form>
            {status === "error" && (
              <p className="font-body text-xs text-red-300 mt-3">
                משהו השתבש בשליחה. אפשר לנסות שוב, או לפנות ישירות בטלפון 052-8345799.
              </p>
            )}
          </>
        )}

        <p className="font-label text-[10px] text-white/35 tracking-wide mt-5">
          {CREDENTIALS_LINE}
        </p>
      </div>
    </section>
  );
}
