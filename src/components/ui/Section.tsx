import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/Icon";

/* ---------------------------------------------------------------------------
   Section chrome.

   Every section on the old site opened the same way: centred eyebrow, centred
   6xl black headline, centred paragraph. Repeated a dozen times down one page,
   nothing was emphasised because everything was — and the reader had no way to
   tell a chapter opening from a footnote.

   These primitives give sections a shared grammar with real levels:
   a numbered mark and a drawn rule set the chapter, `size` sets its weight in
   the page, and alignment defaults to the reading edge rather than centre.
--------------------------------------------------------------------------- */

type Size = "sm" | "md" | "lg";

const TITLE_SIZE: Record<Size, string> = {
  // Deliberately not "black at every level". Weight drops as size drops so the
  // page has three distinct voices rather than one shouted one.
  sm: "text-2xl sm:text-3xl font-bold",
  md: "text-3xl sm:text-4xl lg:text-5xl font-black",
  lg: "text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-black",
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  align = "start",
  size = "md",
  tone = "ink",
  className = "",
  children,
}: {
  /** Chapter number, e.g. "01". Renders with the drawn rule. */
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  size?: Size;
  /** `paper` inverts the palette for use on ink-coloured backgrounds. */
  tone?: "ink" | "paper";
  className?: string;
  /** Trailing content (links, buttons) laid out under the lede. */
  children?: ReactNode;
}) {
  const centered = align === "center";
  const muted = tone === "paper" ? "text-white/55" : "text-ink-mute";
  const soft = tone === "paper" ? "text-white/70" : "text-secondary";
  const strong = tone === "paper" ? "text-white" : "text-primary";
  const ruleTone = tone === "paper" ? "bg-white/25" : "bg-hairline";

  return (
    <Reveal className={`${centered ? "text-center" : "text-start"} ${className}`}>
      {(index || eyebrow) && (
        <div
          className={`flex items-center gap-4 mb-6 ${centered ? "justify-center" : ""}`}
        >
          {index && (
            <span className={`font-label text-[11px] tracking-[0.2em] ${tone === "paper" ? "text-white/60" : "text-clay"}`}>
              {index}
            </span>
          )}
          <span className={`rule-draw h-px w-10 ${ruleTone}`} />
          {eyebrow && (
            <span className={`font-label text-[10px] uppercase tracking-[0.3em] ${muted}`}>
              {eyebrow}
            </span>
          )}
        </div>
      )}

      <h2
        className={`font-headline ${TITLE_SIZE[size]} ${strong} tracking-tight leading-[1.05]`}
      >
        {title}
      </h2>

      {lede && (
        <p
          className={`font-body text-base sm:text-lg ${soft} leading-relaxed mt-6 measure ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lede}
        </p>
      )}

      {children && <div className="mt-8">{children}</div>}
    </Reveal>
  );
}

/**
 * The site's standard "continue reading" affordance: a label, an underline that
 * draws in from the reading edge, and an arrow that steps forward on hover.
 */
export function ArrowLink({
  href,
  children,
  tone = "ink",
  className = "",
  external = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  tone?: "ink" | "paper" | "clay";
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const color = {
    ink: "text-primary hover:text-clay",
    paper: "text-white/80 hover:text-white",
    clay: "text-clay hover:text-primary",
  }[tone];

  const inner = (
    <>
      <span className="link-quiet">{children}</span>
      <ArrowIcon
        size={18}
        className="transition-transform duration-500 group-hover:-translate-x-1"
      />
    </>
  );

  const classes = `group inline-flex items-center gap-2.5 font-headline font-bold text-sm transition-colors duration-300 ${color} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" onClick={onClick} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {inner}
    </Link>
  );
}

/**
 * Solid and outline buttons. Square corners, wide tracking, no gradient and no
 * drop shadow — the emphasis comes from the fill, not from ornament.
 */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "paper" | "paper-outline";
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const styles = {
    solid: "bg-primary text-white hover:bg-clay",
    outline: "border border-primary/25 text-primary hover:border-primary hover:bg-primary hover:text-white",
    paper: "bg-white text-primary hover:bg-clay hover:text-white",
    "paper-outline": "border border-white/45 text-white hover:bg-white hover:text-primary backdrop-blur-[2px]",
  }[variant];

  const classes = `group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 font-headline font-bold text-[13px] uppercase tracking-[0.18em] transition-all duration-500 ${styles} ${className}`;

  const inner = (
    <>
      {children}
      <ArrowIcon size={17} className="transition-transform duration-500 group-hover:-translate-x-1" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" onClick={onClick} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {inner}
    </Link>
  );
}

/**
 * Standard page section: consistent vertical rhythm and gutters, so the spacing
 * between chapters is a decision made once rather than per-section.
 */
export function Section({
  children,
  className = "",
  tone = "paper",
  width = "wide",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "sand" | "surface" | "ink" | "none";
  width?: "wide" | "text" | "full";
  id?: string;
}) {
  const bg = {
    paper: "bg-background",
    sand: "bg-surface-container-low",
    surface: "bg-surface",
    ink: "bg-primary",
    none: "",
  }[tone];

  const inner = {
    wide: "max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12",
    text: "max-w-4xl mx-auto px-6 sm:px-8",
    full: "",
  }[width];

  return (
    <section id={id} className={`py-24 sm:py-28 lg:py-36 ${bg} ${className}`}>
      <div className={inner}>{children}</div>
    </section>
  );
}
