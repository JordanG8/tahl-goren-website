"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

const LOADING_IMAGES = [
  "/images/projects/nucham-living.jpg",
  "/images/projects/persman-exterior.jpg",
  "/images/projects/shakolnik-warm.jpg",
  "/images/projects/vild-living.jpg",
  "/images/projects/persman-interior.jpg",
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("tg_loaded") === "1") {
      setVisible(false);
      return;
    }

    const rotate = setInterval(() => {
      setActiveIndex((i) => (i + 1) % LOADING_IMAGES.length);
    }, 450);

    const hideTimer = setTimeout(() => setHiding(true), 1900);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("tg_loaded", "1");
    }, 2500);

    return () => {
      clearInterval(rotate);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {LOADING_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: i === activeIndex ? 0.45 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <span className="font-headline font-black text-white text-5xl sm:text-6xl tracking-tight drop-shadow-lg">
          טל גורן
        </span>
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-white/70">
          אדריכלות
        </span>
        <div className="mt-4 w-40 h-px bg-white/20 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-white animate-loadingBar" />
        </div>
      </div>
    </div>
  );
}
