"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
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
    let vx = 0;
    let vy = 0;
    let currentAngle = 0;
    let targetAngle = 0;
    let stretch = 1;
    let squash = 1;
    let hoverScale = 1;
    let dotScale = 1;
    let hasMoved = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!hasMoved) {
        hasMoved = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = hoveringRef.current ? "0.95" : "0.65";
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
    };

    const animate = () => {
      // Spring physics for smooth trailing momentum
      const stiffness = 0.12;
      const damping = 0.65;

      const ax = (mouseX - ringX) * stiffness;
      const ay = (mouseY - ringY) * stiffness;
      vx += ax;
      vy += ay;
      vx *= damping;
      vy *= damping;
      ringX += vx;
      ringY += vy;

      const speed = Math.sqrt(vx * vx + vy * vy);

      // Only update target angle if moving significantly to prevent jitter at rest
      if (speed > 0.5) {
        targetAngle = Math.atan2(vy, vx);
      }

      // Smooth angle interpolation (wrapping-safe)
      let angleDiff = targetAngle - currentAngle;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      currentAngle += angleDiff * 0.18;

      // Dynamic stretch based on speed
      const targetStretch = 1 + Math.min(speed * 0.035, 0.4);
      const targetSquash = 1 / targetStretch;
      stretch += (targetStretch - stretch) * 0.15;
      squash += (targetSquash - squash) * 0.15;

      // Smooth hover scale
      const targetHoverScale = hoveringRef.current ? 1.6 : 1.0;
      hoverScale += (targetHoverScale - hoverScale) * 0.15;

      // Smooth dot scale
      const targetDotScale = hoveringRef.current ? 0.5 : 1.0;
      dotScale += (targetDotScale - dotScale) * 0.15;

      if (ringRef.current && hasMoved) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${currentAngle}rad) scale(${stretch * hoverScale}, ${squash * hoverScale})`;
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
      );
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
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-6 h-6 mix-blend-difference opacity-0 transition-opacity duration-300 flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-white"
        >
          {/* Sleek aerodynamic arrow pointing to the right (0 rad) */}
          <path d="M21 12L5 5l3 7-3 7z" />
        </svg>
      </div>
    </>
  );
}
