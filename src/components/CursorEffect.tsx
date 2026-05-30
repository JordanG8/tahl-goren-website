"use client";

import { useEffect, useRef, useState } from "react";

const parseRadius = (radiusStr: string, elementWidth: number, elementHeight: number): number => {
  if (!radiusStr) return 0;
  if (radiusStr.includes('%')) {
    const pct = parseFloat(radiusStr) / 100;
    return Math.min(elementWidth, elementHeight) * pct;
  }
  const px = parseFloat(radiusStr);
  return isNaN(px) ? 0 : px;
};

const getPerimeterDistance = (x: number, y: number, w: number, h: number): number => {
  const dLeft = x;
  const dRight = w - x;
  const dTop = y;
  const dBottom = h - y;
  const minDist = Math.min(dLeft, dRight, dTop, dBottom);

  if (minDist === dTop) {
    return x;
  } else if (minDist === dRight) {
    return w + y;
  } else if (minDist === dBottom) {
    return w + h + (w - x);
  } else {
    return w + h + w + (h - y);
  }
};

const HOVER_PADDING = 6; // px padding on each side to prevent feeling claustrophobic

// The wrap-around border only appears for explicit buttons — not for every
// clickable element (links, inputs, labels, etc.). Add `data-cursor-wrap` to
// any other element you also want wrapped.
const WRAP_SELECTOR = 'button, [role="button"], [data-cursor-wrap]';

// House cursor geometry. viewBox is 24x24; the icon is rendered at ICON_PX.
const ICON_PX = 32;
const SCALE = ICON_PX / 24;
// Chimney tip in viewBox units → screen offset from the cursor (icon is centered).
const CHIMNEY_TIP_VB = { x: 16.5, y: 3 };
const TIP_OFFSET_X = CHIMNEY_TIP_VB.x * SCALE - ICON_PX / 2;
const TIP_OFFSET_Y = CHIMNEY_TIP_VB.y * SCALE - ICON_PX / 2;

const PARTICLE_COUNT = 16;

type Particle = {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
};

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const borderRectRef = useRef<SVGRectElement | null>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let ringW = 24;
    let ringH = 24;
    let ringRadius = 12;
    let borderOpacityVal = 0;
    let contactPerimeterDist = 0;
    let strokeDrawDist = 0;
    let hoverStartTime = 0;
    let hasMoved = false;
    let raf = 0;
    let hoveredEl: HTMLElement | null = null;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      active: false, x: 0, y: 0, vx: 0, vy: 0, age: 0, life: 0,
    }));
    let lastEmit = 0;
    let lastTime = performance.now();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }
    };

    const animate = () => {
      const now = performance.now();
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      let targetBorderOpacity = 0;

      if (hoveredEl) {
        const rect = hoveredEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          ringX = rect.left + rect.width / 2;
          ringY = rect.top + rect.height / 2;
          ringW = rect.width + 2 * HOVER_PADDING;
          ringH = rect.height + 2 * HOVER_PADDING;
          const style = window.getComputedStyle(hoveredEl);
          ringRadius = parseRadius(style.borderRadius, rect.width, rect.height) + HOVER_PADDING;
          targetBorderOpacity = 1;
        }
      }

      const P = 2 * (ringW + ringH);

      if (hoveredEl) {
        const elapsed = now - hoverStartTime;
        let progress = 0;
        if (elapsed <= 50) {
          progress = (elapsed / 50) * 0.33;
        } else if (elapsed <= 250) {
          progress = 0.33 + ((elapsed - 50) / 200) * 0.67;
        } else {
          progress = 1.0;
        }
        strokeDrawDist = progress * (P / 2);
      } else {
        strokeDrawDist += (0 - strokeDrawDist) * 0.18;
      }

      borderOpacityVal += (targetBorderOpacity - borderOpacityVal) * 0.13;

      if (ringRef.current && hasMoved) {
        ringRef.current.style.width = `${ringW}px`;
        ringRef.current.style.height = `${ringH}px`;
        ringRef.current.style.borderRadius = `${ringRadius}px`;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        ringRef.current.style.opacity = `${borderOpacityVal}`;
      }

      if (borderRectRef.current) {
        const rxVal = `${ringRadius}px`;
        borderRectRef.current.style.rx = rxVal;
        borderRectRef.current.style.ry = rxVal;
        borderRectRef.current.setAttribute("rx", rxVal);
        borderRectRef.current.setAttribute("ry", rxVal);
        borderRectRef.current.setAttribute("pathLength", String(P));
        borderRectRef.current.style.strokeDasharray = `${2 * strokeDrawDist} ${P - 2 * strokeDrawDist}`;
        borderRectRef.current.style.strokeDashoffset = `${strokeDrawDist - contactPerimeterDist}`;
      }

      if (dotRef.current && hasMoved) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Chimney smoke — only while hovering a button.
      if (hoveredEl && hasMoved && now - lastEmit > 90) {
        lastEmit = now;
        const p = particles.find((pp) => !pp.active);
        if (p) {
          p.active = true;
          p.x = mouseX + TIP_OFFSET_X + (Math.random() * 2 - 1);
          p.y = mouseY + TIP_OFFSET_Y;
          p.vx = Math.random() * 0.03 - 0.015;
          p.vy = -(0.04 + Math.random() * 0.03);
          p.age = 0;
          p.life = 700 + Math.random() * 450;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const el = particleRefs.current[i];
        if (!el) continue;
        if (!p.active) {
          el.style.opacity = "0";
          continue;
        }
        p.age += dt;
        if (p.age >= p.life) {
          p.active = false;
          el.style.opacity = "0";
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.99;
        const t = p.age / p.life;
        el.style.opacity = `${(1 - t) * 0.85}`;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${0.5 + t * 1.6})`;
      }

      raf = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const wrappable = target.closest(WRAP_SELECTOR) as HTMLElement | null;

      if (wrappable && wrappable !== hoveredEl) {
        strokeDrawDist = 0;
        hoverStartTime = performance.now();

        const rect = wrappable.getBoundingClientRect();
        const wExt = rect.width + 2 * HOVER_PADDING;
        const hExt = rect.height + 2 * HOVER_PADDING;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const x = Math.max(0, Math.min(wExt, mouseX - cx + wExt / 2));
        const y = Math.max(0, Math.min(hExt, mouseY - cy + hExt / 2));
        contactPerimeterDist = getPerimeterDistance(x, y, wExt, hExt);
      }

      hoveredEl = wrappable;
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (hasMoved && dotRef.current) dotRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  // mix-blend-mode: difference keeps the white icon/puffs always contrasting
  // against whatever is behind them — light or dark — in an elegant way.
  return (
    <>
      {/* Ultra-abstract home glyph: silhouette + cut-out window + chimney */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0 transition-opacity duration-300"
        style={{ width: ICON_PX, height: ICON_PX, willChange: "transform", mixBlendMode: "difference" }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full block" aria-hidden="true">
          {/* chimney */}
          <rect x="15.5" y="3" width="2" height="5" fill="white" />
          {/* house body + roof, with the window as an even-odd cut-out */}
          <path
            fillRule="evenodd"
            fill="white"
            d="M12 3 L21 11 L21 21 L3 21 L3 11 Z M10.5 14 L13.5 14 L13.5 17.5 L10.5 17.5 Z"
          />
        </svg>
      </div>

      {/* Chimney smoke particles */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el;
          }}
          className="pointer-events-none fixed top-0 left-0 z-[9998] w-1 h-1 rounded-full bg-white opacity-0"
          style={{ willChange: "transform, opacity", mixBlendMode: "difference" }}
        />
      ))}

      {/* Wrap-around border (buttons only) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-6 h-6 opacity-0 box-border"
        style={{ willChange: "transform, width, height, border-radius", mixBlendMode: "difference" }}
      >
        <svg
          className="w-full h-full absolute top-0 left-0 text-white pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <rect
            ref={borderRectRef}
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </>
  );
}
