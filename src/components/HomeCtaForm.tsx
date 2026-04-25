"use client";

import { useState } from "react";

export default function HomeCtaForm() {
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
        body: JSON.stringify({ name, phone, email: "quick@cta.com", message: "פניה מהירה מדף הבית", website: "" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setPhone("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-surface border border-outline/10 p-8 text-center rounded-2xl w-full max-w-md mx-auto shadow-sm">
        <h3 className="font-headline font-bold text-2xl text-primary mb-2">תודה רבה!</h3>
        <p className="font-body text-secondary">קיבלנו את פנייתך. נחזור אליך בהקדם לשיחה.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl mx-auto relative items-center">
      <input
        type="text"
        placeholder="שם מלא"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="flex-1 w-full bg-surface border-2 border-outline/20 text-primary placeholder-secondary/50 px-6 py-5 focus:outline-none focus:border-primary transition-colors font-body rounded-none"
      />
      <input
        type="tel"
        placeholder="מספר טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="flex-1 w-full bg-surface border-2 border-outline/20 text-primary placeholder-secondary/50 px-6 py-5 focus:outline-none focus:border-primary transition-colors font-body rounded-none"
      />
      <div className="relative w-full sm:w-auto">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto bg-primary text-white px-10 py-5 font-headline font-black text-lg uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-3 relative z-10"
        >
          {status === "submitting" ? "שולח..." : "דברו איתי"}
        </button>
        {/* Animated Arrow pointing to the button */}
        <span className="material-symbols-outlined absolute -left-12 top-1/2 -translate-y-1/2 text-4xl text-primary animate-bounce hidden lg:block" style={{ animationDirection: "alternate-reverse" }}>arrow_right_alt</span>
      </div>
    </form>
  );
}
