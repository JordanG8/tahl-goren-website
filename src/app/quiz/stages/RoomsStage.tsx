"use client";

import { useState } from "react";
import RoomPlan, { roomDimensions } from "@/components/RoomPlan";
import { roomPlans } from "@/data/roomPlans";
import {
  FLOORS,
  ROOM_SIZES,
  ROOM_TYPES,
  MAX_ROOMS,
  type FloorId,
  type RoomRow,
} from "@/lib/houseCostCalculator";

/**
 * The room builder.
 *
 * Two columns: pick a room type on the outside, and its size variants open on
 * the inside — each drawn in plan at its true area with real furniture in it.
 * That is the whole reason this screen exists. Asking someone to choose between
 * "קטן" and "גדול" in the abstract is asking them to price square metres they
 * cannot picture; showing a bed, a wardrobe and a desk either fitting or
 * crowding answers the question they are actually asking.
 *
 * Rooms are then added to a list, cart-style, because a house is a collection
 * and people build it up rather than specifying it in one pass.
 */

export default function RoomsStage({
  rooms,
  onChange,
}: {
  rooms: RoomRow[];
  onChange: (rooms: RoomRow[]) => void;
}) {
  const [openType, setOpenType] = useState<string | null>(null);
  // Only rooms we can actually draw are offered, so the picker never shows a
  // variant column it cannot fill.
  const types = ROOM_TYPES.filter((r) => roomPlans[r.label]);
  const full = rooms.length >= MAX_ROOMS;

  const add = (type: string, size: string) => {
    if (full) return;
    onChange([...rooms, { type, size, floor: "ground" }]);
  };

  const update = (i: number, patch: Partial<RoomRow>) =>
    onChange(rooms.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  const remove = (i: number) => onChange(rooms.filter((_, j) => j !== i));

  const openRoom = openType ? ROOM_TYPES.find((r) => r.label === openType) : null;

  return (
    <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)_320px] lg:gap-6">
      {/* ---------- Outer column: the room types ---------- */}
      <div className="lg:order-1 min-w-0">
        <h2 className="font-label font-medium text-[12px] uppercase tracking-[0.14em] text-ink-mute mb-3">
          סוג החדר
        </h2>
        {/* A row that scrolls on phones, a column on desktop. */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:max-h-[52vh] lg:overflow-y-auto pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
          {types.map((r) => {
            const active = r.label === openType;
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => setOpenType(active ? null : r.label)}
                aria-pressed={active}
                className={`shrink-0 lg:shrink w-[132px] lg:w-full flex lg:flex-row flex-col items-center gap-2 lg:gap-3 p-2 border text-start transition-colors duration-300 ${
                  active
                    ? "border-clay bg-clay/8"
                    : "border-hairline bg-surface hover:border-primary/40"
                }`}
              >
                <RoomPlan
                  type={r.label}
                  area={r.baseArea}
                  showDims={false}
                  decorative
                  className="w-full lg:w-[68px] h-16 lg:h-[52px] shrink-0"
                />
                <span className="font-body text-[12px] lg:text-[13px] text-primary leading-tight text-center lg:text-start">
                  {r.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- Inner column: the size variants ---------- */}
      <div className="lg:order-2 min-w-0">
        <h2 className="font-label font-medium text-[12px] uppercase tracking-[0.14em] text-ink-mute mb-3">
          {openRoom ? `${openRoom.label} — בחרו גודל` : "הגודל"}
        </h2>

        {!openRoom ? (
          <div className="h-[38vh] min-h-[220px] flex items-center justify-center border border-dashed border-hairline bg-surface-container-low/50">
            <p className="font-body text-secondary text-center max-w-xs px-6">
              בחרו סוג חדר כדי לראות איך כל גודל נראה בפועל, עם ריהוט בקנה מידה אמיתי.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {(() => {
              // One frame for all four variants, sized to the largest, so the
              // drawings can be compared against each other rather than each
              // being scaled to fill its own card.
              const plan = roomPlans[openRoom.label];
              const biggest = openRoom.baseArea * Math.max(...ROOM_SIZES.map((s) => s.factor));
              const bigD = Math.sqrt(biggest / plan.aspect);
              const frame = Math.max(bigD, biggest / bigD) + 1.6;
              return ROOM_SIZES.map((size) => {
              const area = openRoom.baseArea * size.factor;
              return (
                <button
                  key={size.label}
                  type="button"
                  onClick={() => add(openRoom.label, size.label)}
                  disabled={full}
                  className="group flex flex-col border border-hairline bg-surface p-3 transition-all duration-300 hover:border-clay hover:shadow-[0_2px_0_0_var(--color-clay)] disabled:opacity-40 disabled:pointer-events-none"
                >
                  <RoomPlan
                    type={openRoom.label}
                    area={area}
                    frame={frame}
                    decorative
                    className="w-full h-[22vh] min-h-[150px]"
                  />
                  <span className="mt-2 font-headline font-bold text-[15px] text-primary">
                    {size.label}
                  </span>
                  <span className="font-body text-[13px] text-secondary tabular-nums">
                    {area.toLocaleString("he-IL", { maximumFractionDigits: 1 })} מ&quot;ר
                  </span>
                  {/* The drawing carries the dimensions visually and is marked
                      decorative, so they are stated here for anyone not seeing it. */}
                  <span className="sr-only">
                    {(() => {
                      const d = roomDimensions(openRoom.label, area);
                      return d ? `${d.w.toFixed(1)} על ${d.d.toFixed(1)} מטר` : "";
                    })()}
                  </span>
                  <span className="mt-2 font-label text-[12px] font-medium uppercase tracking-[0.12em] text-clay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    הוסיפו +
                  </span>
                </button>
              );
              });
            })()}
          </div>
        )}
      </div>

      {/* ---------- The house so far ---------- */}
      <div className="lg:order-3 min-w-0">
        <h2 className="font-label font-medium text-[12px] uppercase tracking-[0.14em] text-ink-mute mb-3">
          הבית שלכם · {rooms.length} חדרים
        </h2>

        {rooms.length === 0 ? (
          <p className="font-body text-[14px] text-secondary border border-dashed border-hairline p-5">
            עדיין לא הוספתם חדרים. התחילו מהסלון או מהמטבח.
          </p>
        ) : (
          <ul className="border-t border-hairline lg:max-h-[52vh] lg:overflow-y-auto">
            {rooms.map((room, i) => (
              <li key={i} className="border-b border-hairline py-2.5 flex items-center gap-2">
                <RoomPlan
                  type={room.type}
                  area={
                    (ROOM_TYPES.find((r) => r.label === room.type)?.baseArea ?? 0) *
                    (ROOM_SIZES.find((s) => s.label === room.size)?.factor ?? 1)
                  }
                  showDims={false}
                  decorative
                  className="w-10 h-10 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-body text-[14px] text-primary truncate">
                    {room.type}
                    <span className="text-ink-mute"> · {room.size}</span>
                  </p>
                  <select
                    aria-label={`הקומה של ${room.type}`}
                    value={room.floor}
                    onChange={(e) => update(i, { floor: e.target.value as FloorId })}
                    className="mt-1 w-full bg-transparent border border-hairline px-2 py-1 font-body text-[13px] text-secondary focus:border-clay focus:outline-none"
                  >
                    {FLOORS.map((f) => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label={`הסירו ${room.type}`}
                  className="text-ink-mute hover:text-clay transition-colors duration-300 text-xl leading-none px-1.5 self-start"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {full && (
          <p className="font-body text-[13px] text-clay mt-3">
            הגעתם ל-{MAX_ROOMS} חדרים — המספר המרבי בתחשיב.
          </p>
        )}
      </div>
    </div>
  );
}
