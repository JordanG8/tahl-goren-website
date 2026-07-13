"use client";

import { useState } from "react";
import { trackLead } from "@/lib/trackLead";

export default function LeadMagnetForm({ placement }: { placement: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: phone || "לא צוין",
          email,
          message: "בקשה לקבלת הצ'ק-ליסט לבדיקת מגרש לפני בנייה, ולבדיקת המגרש שלי מול טל.",
          website: "",
          sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      trackLead("form", { placement });
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white p-6 md:p-8 text-center border border-outline/10">
        <h3 className="font-headline font-black text-xl text-primary mb-2">תודה, {name || ""}!</h3>
        <p className="font-body text-sm text-secondary leading-relaxed">
          קיבלנו את הפרטים. הצ&apos;ק-ליסט המלא נמצא ממש כאן למטה בעמוד — ואם
          תרצו, אחזור אליכם גם באופן אישי כדי לעבור יחד על המגרש הספציפי
          שלכם.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 border border-outline/10">
      <h3 className="font-headline font-black text-xl text-primary mb-1">רוצים שאעבור איתכם על המגרש?</h3>
      <p className="font-body text-sm text-secondary mb-6 leading-relaxed">
        השאירו פרטים ואחזור אליכם — ללא עלות וללא התחייבות.
      </p>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-surface-container-low text-primary placeholder-secondary px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent font-body text-sm"
        />
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-surface-container-low text-primary placeholder-secondary px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent font-body text-sm"
        />
        <input
          type="tel"
          placeholder="טלפון (לא חובה)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-surface-container-low text-primary placeholder-secondary px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent font-body text-sm"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-accent text-white px-8 py-3.5 font-headline font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "submitting" ? "שולח..." : "שלחו לי פרטים"}
        </button>
      </div>
      {status === "error" && (
        <p className="font-body text-xs text-red-500 mt-3">
          משהו השתבש בשליחה. אפשר לנסות שוב, או לפנות ישירות בטלפון 052-8345799.
        </p>
      )}
    </form>
  );
}
