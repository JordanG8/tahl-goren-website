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

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const hoveringRef = useRef(false);

  useEffect(() => {
    hoveringRef.current = hovering;
  }, [hovering]);

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
    let borderWidthVal = 0;
    let arrowOpacityVal = 1;

    let vx = 0;
    let vy = 0;
    let vW = 0;
    let vH = 0;
    let vRadius = 0;

    let currentAngle = 0;
    let targetAngle = 0;
    let stretch = 1;
    let squash = 1;
    let dotScale = 1;
    let hasMoved = false;
    let raf = 0;
    let hoveredEl: HTMLElement | null = null;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!hasMoved) {
        hasMoved = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = hoveringRef.current ? "0.95" : "0.65";
      }
    };

    const animate = () => {
      // Spring physics for smooth trailing momentum
      const stiffness = 0.15;
      const damping = 0.68;

      let targetX = mouseX;
      let targetY = mouseY;
      let targetW = 24;
      let targetH = 24;
      let targetRadius = 12;
      let targetBorderWidth = 0;
      let targetArrowOpacity = 1;
      let targetAngle = 0;

      if (hoveredEl) {
        const rect = hoveredEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          targetX = rect.left + rect.width / 2;
          targetY = rect.top + rect.height / 2;
          const padding = 12;
          targetW = rect.width + padding;
          targetH = rect.height + padding;
          
          const style = window.getComputedStyle(hoveredEl);
          targetRadius = parseRadius(style.borderRadius, rect.width, rect.height) + padding / 2;
          targetBorderWidth = 1.5;
          targetArrowOpacity = 0;
          targetAngle = 0;
        }
      }

      // Position physics
      const ax = (targetX - ringX) * stiffness;
      const ay = (targetY - ringY) * stiffness;
      vx += ax;
      vy += ay;
      vx *= damping;
      vy *= damping;
      ringX += vx;
      ringY += vy;

      // Width and Height physics
      const aW = (targetW - ringW) * stiffness;
      const aH = (targetH - ringH) * stiffness;
      vW += aW;
      vH += aH;
      vW *= damping;
      vH *= damping;
      ringW += vW;
      ringH += vH;

      // Radius physics
      const aRadius = (targetRadius - ringRadius) * stiffness;
      vRadius += aRadius;
      vRadius *= damping;
      ringRadius += vRadius;

      // Lerp for border width and arrow opacity
      borderWidthVal += (targetBorderWidth - borderWidthVal) * 0.25;
      arrowOpacityVal += (targetArrowOpacity - arrowOpacityVal) * 0.25;

      const speed = Math.sqrt(vx * vx + vy * vy);

      if (!hoveredEl) {
        if (speed > 0.5) {
          targetAngle = Math.atan2(vy, vx);
        }
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        currentAngle += angleDiff * 0.18;
      } else {
        let angleDiff = -currentAngle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        currentAngle += angleDiff * 0.18;
      }

      const targetStretch = hoveredEl ? 1 : (1 + Math.min(speed * 0.035, 0.4));
      const targetSquash = 1 / targetStretch;
      stretch += (targetStretch - stretch) * 0.15;
      squash += (targetSquash - squash) * 0.15;

      const targetDotScale = hoveredEl ? 0.3 : 1.0;
      dotScale += (targetDotScale - dotScale) * 0.15;

      if (ringRef.current && hasMoved) {
        ringRef.current.style.width = `${ringW}px`;
        ringRef.current.style.height = `${ringH}px`;
        ringRef.current.style.borderRadius = `${ringRadius}px`;
        ringRef.current.style.border = `${borderWidthVal}px solid white`;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${currentAngle}rad) scale(${stretch}, ${squash})`;
      }

      if (arrowRef.current) {
        arrowRef.current.style.opacity = `${arrowOpacityVal}`;
        arrowRef.current.style.transform = `scale(${arrowOpacityVal})`;
      }

      if (dotRef.current && hasMoved) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      raf = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], summary, input, textarea, select, label'
      ) as HTMLElement | null;
      
      hoveredEl = interactive;
      const isInteractive = !!interactive;
      hoveringRef.current = isInteractive;
      setHovering(isInteractive);
      
      if (hasMoved && ringRef.current) {
        ringRef.current.style.opacity = isInteractive ? "0.95" : "0.65";
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = hoveringRef.current ? "0.95" : "0.65";
      }
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

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-1.5 h-1.5 rounded-full bg-white mix-blend-difference opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
      {/* Momentum-based trailing arrow */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-6 h-6 mix-blend-difference opacity-0 transition-opacity duration-300 flex items-center justify-center box-border"
        style={{ willChange: "transform, width, height, border-radius, border" }}
      >
        <svg
          ref={arrowRef}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white absolute"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Sleek aerodynamic arrow pointing to the right (0 rad) */}
          <path d="M21 12L5 5l3 7-3 7z" />
        </svg>
      </div>
    </>
  );
}
