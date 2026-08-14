/**
 * Inline hairline icon set.
 *
 * Replaces the Google "Material Symbols" ligature font for all new markup.
 * Two reasons, one practical and one visual:
 *
 *  - Practical: the ligature font is a render-blocking third-party stylesheet,
 *    and until it loads the browser paints the raw ligature text — visitors saw
 *    the literal strings "arrow_back" and "verified" in the layout.
 *  - Visual: Material's icons are drawn at a much heavier weight than Heebo at
 *    the sizes used here, so every arrow read as a blob next to its label.
 *    These are drawn on the same 1.25px hairline as the rules and borders, so
 *    icons and typography share one line weight across the site.
 *
 * All icons inherit `currentColor` and size from the `size` prop (default 20).
 * They are decorative by default (`aria-hidden`); pass a `title` only when an
 * icon is the sole content of a control.
 */

type IconProps = {
  size?: number;
  className?: string;
  title?: string;
  strokeWidth?: number;
};

function svgProps({ size = 20, className = "", title, strokeWidth = 1.25 }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: `inline-block flex-shrink-0 ${className}`,
    "aria-hidden": title ? undefined : true,
    role: title ? "img" : undefined,
  };
}

/**
 * The site's directional arrow: a long rule with a small head, pointing along
 * the reading direction. Hebrew reads right-to-left, so "forward" points left
 * — which is why the legacy markup used Material's `arrow_back` to mean "next".
 * Here the intent is named instead: `direction="forward"` always means onward.
 */
export function ArrowIcon({
  direction = "forward",
  size = 20,
  className = "",
  title,
  strokeWidth,
}: IconProps & { direction?: "forward" | "back" }) {
  const flip = direction === "back";
  return (
    <svg {...svgProps({ size, className, title, strokeWidth })}>
      {title && <title>{title}</title>}
      <g transform={flip ? "translate(24 0) scale(-1 1)" : undefined}>
        <path d="M20 12H4" />
        <path d="M9.5 6.5 4 12l5.5 5.5" />
      </g>
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="M6.5 3h3l1.5 4-2 1.4a12 12 0 0 0 6.6 6.6L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5A16.8 16.8 0 0 1 3.5 5.7 2.5 2.5 0 0 1 6 3Z" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.1 9.1 0 0 1-3.3-.7L3 21l1.9-5.4A8.3 8.3 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3.5 6 8.5 6.5L20.5 6" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5 16 12l-6 3.5Z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="M3 7h18M3 12h18M3 17h12" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function ChevronIcon({
  direction = "down",
  ...props
}: IconProps & { direction?: "down" | "up" | "start" | "end" }) {
  const rotate = { down: 0, up: 180, start: 90, end: -90 }[direction];
  return (
    <svg {...svgProps(props)} style={{ transform: `rotate(${rotate}deg)` }}>
      {props.title && <title>{props.title}</title>}
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Subject icons for the "why work with me" column. Deliberately drawn as
   architectural marks rather than generic UI glyphs: a stamped seal, a measured
   budget line, a plan with a person on it.
--------------------------------------------------------------------------- */

export function SealIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <circle cx="12" cy="10" r="6" />
      <path d="m9.5 10 1.8 1.8 3.2-3.4" />
      <path d="M8.5 15.4 7 21l5-2 5 2-1.5-5.6" />
    </svg>
  );
}

export function BudgetIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="M3 20h18" />
      <path d="M4 16.5 9.5 11l4 3.5L20 7" />
      <path d="M20 11V7h-4" />
    </svg>
  );
}

export function PlanIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 10h18M10 10v10" />
      <circle cx="15.5" cy="14" r="1.6" />
    </svg>
  );
}

/** Enlarge — the four corner marks of a crop frame. */
export function ExpandIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />
    </svg>
  );
}

/** Area — a dimension line with end ticks, as it appears on a plan. */
export function RulerIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="M4 6v12M20 6v12M4 12h16" />
      <path d="m8.5 9.5-2.5 2.5 2.5 2.5M15.5 9.5l2.5 2.5-2.5 2.5" />
    </svg>
  );
}

/** Storeys — stacked slabs in section. */
export function LayersIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 17 9 4.5 9-4.5" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      {props.title && <title>{props.title}</title>}
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-1.8 4.2L9 15l1.8-4.2L15 9Z" />
    </svg>
  );
}

/* Brand marks are solid, not hairline — social logos are recognised by their
   filled silhouette, and outlining them makes them read as generic shapes. */

export function InstagramIcon({ size = 20, className = "", title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className = "", title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V7.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20, className = "", title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.52A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.25 3.6Z" />
    </svg>
  );
}
