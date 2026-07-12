"use client";

import { useState } from "react";
import { trackLead } from "@/lib/trackLead";

const CREDENTIALS = [
  { icon: "school", label: "בוגרת הטכניון בהצטיינות" },
  { icon: "verified_user", label: "אדריכלית רשויה מ-2014" },
  { icon: "workspace_premium", label: "מורשית היתר — לא לכל אדריכל/ית יש" },
  { icon: "home_work", label: "100+ בתים פרטיים" },
];

type HomeCtaFormProps = {
  eyebrow: string;
  heading: string;
  placement: string;
};

export default function HomeCtaForm({ eyebrow, heading, placement }: HomeCtaFormProps) {
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
    <section className="relative border-y-[6px] border-[#d4af37] bg-[#0b1116] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-8 py-20 lg:py-28 flex flex-col items-center text-center">
        <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d4af37] mb-5">
          {eyebrow}
        </span>

        <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] mb-6 max-w-3xl">
          {heading}
        </h2>

        <p className="font-headline font-bold text-xl sm:text-2xl text-[#d4af37] mb-10 max-w-2xl">
          עדיף לשלם טוב פעם אחת — מאשר לשלם פעמיים ביוקר.
        </p>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 pb-12 border-b border-white/10 w-full max-w-3xl">
          {CREDENTIALS.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-white/85">
              <span className="material-symbols-outlined text-[#d4af37] text-xl flex-shrink-0">{c.icon}</span>
              <span className="font-label text-xs sm:text-sm tracking-wide">{c.label}</span>
            </div>
          ))}
        </div>

        {status === "success" ? (
          <div className="bg-white p-8 text-center w-full max-w-md mx-auto shadow-2xl">
            <h3 className="font-headline font-black text-2xl text-primary mb-2">תודה רבה!</h3>
            <p className="font-body text-secondary">קיבלנו את פנייתך. נחזור אליך בהקדם לשיחה.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 w-full bg-white text-primary placeholder-secondary/60 px-6 py-5 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/50 font-body rounded-none"
              />
              <input
                type="tel"
                placeholder="מספר טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="flex-1 w-full bg-white text-primary placeholder-secondary/60 px-6 py-5 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/50 font-body rounded-none"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto bg-[#d4af37] text-[#1a1206] px-10 py-5 font-headline font-black text-lg uppercase tracking-widest hover:bg-[#e8c34f] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 whitespace-nowrap"
              >
                {status === "submitting" ? "שולח..." : "דברו איתי עכשיו"}
              </button>
            </form>
            {status === "error" && (
              <p className="font-body text-sm text-red-400 mt-4">
                משהו השתבש בשליחה. אפשר לנסות שוב, או לפנות ישירות בטלפון 052-8345799.
              </p>
            )}
            <p className="font-body text-white/50 text-sm mt-6">
              ייעוץ ראשוני ללא עלות וללא התחייבות · מענה אישי תוך יום עסקים
            </p>
          </>
        )}
      </div>
    </section>
  );
}
