"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in ms, applied to this element's transition delay. */
  delay?: number;
  /**
   * How far into the viewport the element must travel before it reveals.
   * Expressed as a bottom-margin on the observer root, so `120` means "start
   * 120px before the element would otherwise count as visible".
   */
  offset?: number;
  className?: string;
  as?: ElementType;
  id?: string;
};

/**
 * Reveals its children once, when they scroll into view.
 *
 * The visual behaviour lives in globals.css under `[data-reveal]`, inside a
 * `prefers-reduced-motion: no-preference` query — so a visitor who has asked
 * for less motion gets the fully-composed page with no JS-dependent hiding.
 * That is also why the initial state is `"out"` rather than `hidden`: nothing
 * here can leave content permanently invisible if the observer never fires.
 */
export default function Reveal({
  children,
  delay = 0,
  offset = 80,
  className = "",
  as: Tag = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer support: show everything on the next frame. Deferred rather
    // than set synchronously here, both to avoid a cascading render and so the
    // transition still runs instead of the content snapping in.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: `0px 0px -${offset}px 0px`, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [offset]);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={shown ? "in" : "out"}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
