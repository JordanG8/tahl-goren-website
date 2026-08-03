"use client";

import { useEffect } from "react";

/**
 * Fades `[data-reveal]` elements in as they enter the viewport.
 *
 * The hiding is applied from JS rather than CSS on purpose: if this never
 * runs (JS off, script error), every section stays plainly visible instead of
 * leaving the page blank. Users who ask for reduced motion get the same
 * no-op path.
 */
export default function RevealObserver() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(26px)";
      el.style.transition =
        "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
