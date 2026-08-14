"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import { trackLead } from "@/lib/trackLead";
import { ArrowIcon, ChatIcon, PhoneIcon, MailIcon, PinIcon, CheckIcon } from "@/components/ui/Icon";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Contact page.
 *
 * The page used to open with the compact homepage lead band (carrying the h1)
 * and then present the full contact form a screen below — two forms asking for
 * overlapping information, with the small one first. There is now one form,
 * and the page opens by saying who it is for.
 */
export default function ContactClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          website,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          data.error === "missing_fields"
            ? "יש למלא את כל השדות"
            : data.error === "invalid_email"
              ? "כתובת האימייל אינה תקינה"
              : "אירעה שגיאה. נסו שוב או צרו קשר בוואטסאפ."
        );
        return;
      }
      trackLead("form", { placement: "contact_page" });
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("אירעה שגיאה ברשת. נסו שוב או צרו קשר בוואטסאפ.");
    }
  };

  const whatsappHref = (() => {
    const text = `שלום טל, שמי ${name || "[שם]"}.\n${message || "[הודעה]"}\nטלפון: ${phone || "[טלפון]"}\nאימייל: ${email || "[אימייל]"}`;
    return `https://wa.me/972528345799?text=${encodeURIComponent(text)}`;
  })();

  // Underlined fields rather than filled boxes: on a page that is mostly form,
  // four grey rectangles dominate everything. The rule turns clay on focus, so
  // the active field is unmistakable without a heavy ring.
  const field =
    "w-full bg-transparent border-0 border-b border-hairline py-3.5 px-0 focus:outline-none focus:border-clay transition-colors duration-300 font-body text-lg text-primary placeholder:text-ink-mute/70";
  const labelCls = "font-label font-medium text-[13px] uppercase tracking-[0.16em] text-ink-mute";

  const contactRows = [
    { Icon: PhoneIcon, label: "טלפון", value: "052-8345799", href: "tel:0528345799", track: true },
    { Icon: MailIcon, label: "אימייל", value: "tahl.goren.arch@gmail.com", href: "mailto:tahl.goren.arch@gmail.com" },
    { Icon: PinIcon, label: "המשרד", value: "רחוב האלה 22, גבעת עדה" },
  ];

  return (
    <>
      <section className="bg-background border-b border-hairline">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-16 sm:pt-20 sm:pb-20">
          <Reveal>
            <Breadcrumb current="צור קשר" />
            <div className="flex items-center gap-4 mb-6">
              <span className="rule-draw h-px w-10 bg-hairline" />
              <span className="font-label font-medium text-[13px] uppercase tracking-[0.2em] text-ink-mute">
                צור קשר
              </span>
            </div>
            <h1 className="font-headline font-black text-4xl sm:text-6xl lg:text-7xl text-primary tracking-tight leading-[0.98] max-w-3xl">
              מתכננים לבנות<br />או לשפץ?
            </h1>
            <p className="font-body text-lg sm:text-xl text-secondary leading-relaxed mt-8 measure">
              אני מתמחה באדריכלות בתי מגורים באזור השרון הצפוני — בין נתניה לחיפה,
              ומזרחה עד עפולה. השאירו פרטים ואחזור אליכם בהקדם, לשיחת היכרות ללא
              עלות וללא התחייבות.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-background">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
            {/* Details + map */}
            <Reveal className="lg:col-span-5">
              <ul className="border-t border-hairline">
                {contactRows.map(({ Icon, label, value, href, track }) => (
                  <li key={label} className="border-b border-hairline py-7 flex items-start gap-5">
                    <Icon size={22} className="text-clay mt-1.5" />
                    <div className="min-w-0">
                      <span className={`${labelCls} block`}>{label}</span>
                      {href ? (
                        <a
                          href={href}
                          onClick={track ? () => trackLead("phone", { placement: "contact_page_info" }) : undefined}
                          className="font-headline font-bold text-xl sm:text-2xl text-primary hover:text-clay transition-colors duration-300 mt-2 block break-all"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-headline font-bold text-xl sm:text-2xl text-primary mt-2">
                          {value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 aspect-[4/3] bg-surface-container-low overflow-hidden relative border border-hairline">
                <iframe
                  title="מיקום המשרד - רחוב האלה 22, גבעת עדה"
                  src="https://maps.google.com/maps?q=%D7%94%D7%90%D7%9C%D7%94+22+%D7%92%D7%91%D7%A2%D7%AA+%D7%A2%D7%93%D7%94&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={140} className="lg:col-span-7">
              <div className="border-t border-hairline pt-10">
                <h2 className="font-headline font-black text-3xl sm:text-4xl text-primary tracking-tight">
                  שלחו הודעה
                </h2>

                {status === "success" ? (
                  <div className="mt-10">
                    <CheckIcon size={32} className="text-clay" />
                    <h3 className="font-headline font-black text-2xl text-primary mt-5">תודה רבה!</h3>
                    <p className="font-body text-secondary leading-relaxed mt-3 measure">
                      ההודעה התקבלה ואחזור אליכם בהקדם האפשרי. בינתיים, אתם מוזמנים
                      לעיין בפרויקטים שלי.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="group inline-flex items-center gap-2.5 font-headline font-bold text-sm text-primary hover:text-clay transition-colors mt-8"
                    >
                      <span className="link-quiet">שליחת הודעה נוספת</span>
                      <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
                    </button>
                  </div>
                ) : (
                  <form className="mt-10 space-y-9" onSubmit={handleSubmit} noValidate>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
                      <div className="space-y-2">
                        <label htmlFor="name" className={labelCls}>שם מלא</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={field}
                          placeholder="איך לקרוא לכם?"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className={labelCls}>טלפון</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={field}
                          placeholder="איפה אפשר להשיג אתכם?"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className={labelCls}>אימייל</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={field}
                        placeholder="כתובת האימייל שלכם"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className={labelCls}>הודעה</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`${field} resize-none`}
                        placeholder="ספרו לי קצת על הפרויקט..."
                      />
                    </div>

                    {status === "error" && (
                      <p className="font-body text-base text-red-600" role="alert">{errorMsg}</p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group flex-1 inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 font-headline font-bold text-[13px] uppercase tracking-[0.13em] transition-colors duration-500 hover:bg-clay disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "submitting" ? "שולח..." : "שלחו הודעה"}
                        {status !== "submitting" && (
                          <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
                        )}
                      </button>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackLead("whatsapp", { placement: "contact_page_form" })}
                        className="flex-1 inline-flex items-center justify-center gap-3 border border-primary/25 text-primary px-8 py-4 font-headline font-bold text-[13px] uppercase tracking-[0.13em] transition-colors duration-500 hover:border-primary hover:bg-primary hover:text-white"
                      >
                        שליחה בוואטסאפ
                        <ChatIcon size={17} />
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
