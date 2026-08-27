import { roomPlans, type Anchor, type Item } from "@/data/roomPlans";

/**
 * A room drawn in plan, at true scale.
 *
 * Dimensions come from the room's area, which comes from the workbook — so the
 * drawing is a consequence of the price, not decoration next to it. Furniture is
 * placed by rule against the walls it belongs on; when a room is small, pieces
 * crowd, and that crowding is the honest signal the visitor is here for.
 *
 * Deliberately spare: hairline walls, unfilled furniture, one dimension line.
 * It should read like the corner of a drawing, not like a game.
 */

const WALL = 0.12; // wall thickness in metres, drawn for weight rather than accuracy

/**
 * The room's width and depth, in metres, for a given area.
 *
 * Exported so callers can state the dimensions in text as well as in the
 * drawing — the drawing is marked decorative inside controls, and the size of
 * the room is too important to exist only as pixels.
 */
export function roomDimensions(type: string, area: number) {
  const plan = roomPlans[type];
  if (!plan) return null;
  const d = Math.sqrt(area / plan.aspect);
  return { w: area / d, d };
}

/** Places one piece against its anchor, inset from the wall. */
function place(item: Item, W: number, D: number) {
  const m = 0.08; // clearance from the wall face
  const off = item.offset ?? 0;
  const xs: Record<string, number> = {
    W: m,
    E: W - item.w - m,
    C: (W - item.w) / 2,
  };
  const ys: Record<string, number> = {
    N: m,
    S: D - item.d - m,
    C: (D - item.d) / 2,
  };
  const at: Anchor = item.at;
  const ew = at.includes("W") ? "W" : at.includes("E") ? "E" : "C";
  const ns = at.includes("N") ? "N" : at.includes("S") ? "S" : "C";
  return { x: xs[ew] + off, y: ys[ns] + (at === "N" || at === "S" ? 0 : 0) };
}

/** Chairs set around a table, for the rooms whose whole point is seating. */
function seats(item: Item, x: number, y: number, count: number) {
  const s = 0.45;
  const gap = 0.12;
  const perSide = Math.ceil(count / 2);
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < perSide; i++) {
    const cx = x + ((i + 0.5) * item.w) / perSide - s / 2;
    out.push({ x: cx, y: y - s - gap });
    if (out.length < count) out.push({ x: cx, y: y + item.d + gap });
  }
  return out.slice(0, count);
}

export default function RoomPlan({
  type,
  area,
  className = "",
  showDims = true,
  /**
   * Hides the drawing from assistive tech. Set this wherever the plan sits
   * inside a control that already names itself — otherwise the button reads out
   * as "תוכנית סלון, 5.7 על 4.4 מטר סלון".
   */
  decorative = false,
  /**
   * Width, in metres, that the drawing area represents.
   *
   * Without this each plan is scaled to fill its own box, so a 12 m² room and a
   * 17 m² room render exactly the same size on screen — which defeats the point
   * of drawing them at all. Passing one frame across a set of variants puts them
   * on a common scale, and the bigger room is visibly bigger.
   */
  frame,
}: {
  type: string;
  /** Floor area in m², already multiplied by the size factor. */
  area: number;
  className?: string;
  showDims?: boolean;
  decorative?: boolean;
  frame?: number;
}) {
  const plan = roomPlans[type];
  if (!plan) return null;

  // Area and aspect fix the room's proportions.
  const D = Math.sqrt(area / plan.aspect);
  const W = area / D;

  const pad = 0.9; // drawing margin, in metres, for the dimension line
  // With a shared frame the room is centred inside it, so rooms of different
  // areas keep their relative sizes; without one it fills its own box.
  const vbW = frame ?? W + pad * 2;
  const vbH = frame ?? D + pad * 2;
  const originX = frame ? (frame - W) / 2 : pad;
  const originY = frame ? (frame - D) / 2 - 0.3 : pad;

  const fmt = (n: number) => n.toFixed(1).replace(/\.0$/, "");

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className={className}
      {...(decorative
        ? { "aria-hidden": true, role: "presentation" as const }
        : { role: "img" as const, "aria-label": `תוכנית ${type}, ${fmt(W)} על ${fmt(D)} מטר` })}
    >
      <g transform={`translate(${originX}, ${originY})`}>
        {/* Wall envelope. */}
        <rect
          x={-WALL}
          y={-WALL}
          width={W + WALL * 2}
          height={D + WALL * 2}
          className="fill-none stroke-primary"
          strokeWidth={WALL}
        />
        <rect x={0} y={0} width={W} height={D} className="fill-surface" />

        {/* Door: a gap in the wall with its swing. */}
        {(() => {
          const dw = 0.85;
          const { wall, at } = plan.door;
          const horizontal = wall === "N" || wall === "S";
          const px = horizontal ? (W - dw) * at : wall === "W" ? 0 : W;
          const py = horizontal ? (wall === "N" ? 0 : D) : (D - dw) * at;
          return (
            <g className="stroke-primary fill-none" strokeWidth={0.03}>
              <rect
                x={horizontal ? px : px - WALL / 2}
                y={horizontal ? py - WALL / 2 : py}
                width={horizontal ? dw : WALL}
                height={horizontal ? WALL : dw}
                className="fill-background stroke-none"
              />
              <path
                d={
                  horizontal
                    ? `M${px} ${py} a${dw} ${dw} 0 0 ${wall === "N" ? 1 : 0} ${dw} ${wall === "N" ? dw : -dw}`
                    : `M${px} ${py} a${dw} ${dw} 0 0 ${wall === "W" ? 0 : 1} ${wall === "W" ? dw : -dw} ${dw}`
                }
                className="stroke-hairline"
                strokeWidth={0.025}
              />
            </g>
          );
        })()}

        {/* Furniture. */}
        {plan.items.map((item, i) => {
          const { x, y } = place(item, W, D);
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={item.w}
                height={item.d}
                rx={item.round ? 0.28 : 0.03}
                className={`fill-surface-container ${
                  item.primary ? "stroke-primary/85" : "stroke-primary/60"
                }`}
                strokeWidth={item.primary ? 0.055 : 0.04}
              />
              {item.seats &&
                seats(item, x, y, item.seats).map((s, j) => (
                  <rect
                    key={j}
                    x={s.x}
                    y={s.y}
                    width={0.45}
                    height={0.45}
                    rx={0.06}
                    className="fill-none stroke-primary/35"
                    strokeWidth={0.028}
                  />
                ))}
            </g>
          );
        })}

        {/* One dimension line along the bottom, so the scale is stated. */}
        {showDims && (
          <g className="stroke-clay" strokeWidth={0.025}>
            <path d={`M0 ${D + 0.42} H${W}`} />
            <path d={`M0 ${D + 0.3} V${D + 0.54}`} />
            <path d={`M${W} ${D + 0.3} V${D + 0.54}`} />
            <text
              x={W / 2}
              y={D + 0.78}
              textAnchor="middle"
              className="fill-clay stroke-none"
              style={{ fontSize: 0.34, fontWeight: 600 }}
            >
              {fmt(W)} × {fmt(D)} מ׳
            </text>
          </g>
        )}
      </g>
    </svg>
  );
}
