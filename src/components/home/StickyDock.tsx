"use client";

import { useEffect, useState } from "react";
import { PhoneLink, WhatsAppLink } from "./ContactLinks";
import { PHONE_DISPLAY } from "@/lib/whatsapp";

/**
 * Slides up once the visitor is past the hero and clearly reading. Holding it
 * back until then keeps the first screen calm — the dock is for someone who
 * already has a question, not a greeting.
 */
export default function StickyDock() {
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Retract over the footer: it carries the same phone and email, and a
    // floating bar that permanently covers the last rows reads as broken.
    const footer = document.querySelector("footer");
    const observer = footer
      ? new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting), { threshold: 0 })
      : null;
    if (footer && observer) observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !atFooter;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-outline/70 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] print:hidden"
      style={{ transform: visible ? "translateY(0)" : "translateY(110%)" }}
      aria-hidden={!visible}
    >
      <div className="max-w-[1680px] mx-auto px-5 sm:px-10 py-3.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <p className="m-0 font-body font-light text-[15px] sm:text-base text-secondary text-center">
          יש לכם מגרש ושאלה אחת שמפריעה לכם?{" "}
          <span className="font-semibold text-primary">כתבו לי, אני עונה בעצמי.</span>
        </p>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <PhoneLink
            placement="home_dock"
            className="inline-flex items-center gap-2 border border-outline/90 text-primary px-5 py-3 font-headline font-medium text-sm hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-lg">call</span>
            <span>{PHONE_DISPLAY}</span>
          </PhoneLink>
          <WhatsAppLink
            placement="home_dock"
            message="היי טל, יש לי שאלה אחת שמפריעה לי לגבי הבנייה."
            className="inline-flex items-center gap-2 bg-primary text-white px-[22px] py-3 font-headline font-medium text-sm hover:bg-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              chat
            </span>
            <span>וואטסאפ</span>
          </WhatsAppLink>
        </div>
      </div>
    </div>
  );
}
