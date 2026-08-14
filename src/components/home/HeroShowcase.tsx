"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "@/data/heroSlides";
import { ArrowIcon } from "@/components/ui/Icon";

const SLIDE_MS = 7000;

/**
 * The hero's photographic layer.
 *
 * Three things it has to do at once: show the work at full bleed, keep Hebrew
 * type readable over it, and let a visitor who is struck by a house actually
 * go and see that house.
 *
 * The scrim is two stacked gradients rather than one flat wash. A single
 * uniform darkening is what kills photographs in most hero sections — it
 * lowers contrast everywhere, including the parts of the frame with no text on
 * them. Here one gradient runs bottom-to-top and one runs from the reading
 * edge inwards, so the type sits on dark ground while the far side of the
 * photograph stays bright.
 */
export default function HeroShowcase({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [slides.length, paused]);

  const current = slides[index];

  return (
    <>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            fill
            sizes="100vw"
            quality={82}
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            className="object-cover hero-kenburns"
            style={{ objectPosition: slide.focus ?? "50% 50%" }}
          />
        </div>
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(20,29,36,0.86) 0%, rgba(20,29,36,0.34) 42%, rgba(20,29,36,0.58) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(20,29,36,0.82) 0%, rgba(20,29,36,0.42) 44%, transparent 76%)",
        }}
      />

      {/* Credit + link. The whole point of showing the work at this scale is
          that someone falls for a house; this is the door out of the hero and
          into that project. Kept to a hairline chip at the far corner so it
          never competes with the headline. */}
      {current && (
        <div className="absolute bottom-7 sm:bottom-9 inset-x-0 z-20 px-6 sm:px-10 pointer-events-none">
          <div className="max-w-[1680px] mx-auto flex items-end justify-between gap-6">
            <Link
              href={`/projects/${current.projectId}`}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="group pointer-events-auto inline-flex items-center gap-3 sm:gap-4 border border-white/25 bg-black/25 backdrop-blur-[3px] px-4 sm:px-5 py-2.5 sm:py-3 transition-colors duration-500 hover:border-white/60 hover:bg-black/40"
            >
              <span className="flex flex-col text-start">
                <span className="font-label font-medium text-[13px] sm:text-xs uppercase tracking-[0.13em] text-white/60">
                  מתוך הפרויקטים
                </span>
                <span className="font-headline font-bold text-base sm:text-base text-white leading-tight mt-1">
                  {current.title} · {current.location}
                </span>
              </span>
              <ArrowIcon
                size={19}
                className="text-white/70 transition-all duration-500 group-hover:text-white group-hover:-translate-x-1.5"
              />
            </Link>

            {/* Slide markers, doubling as a manual control. */}
            <div className="pointer-events-auto hidden sm:flex items-center gap-2.5 pb-1">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`מעבר לתמונה ${i + 1}: ${slide.title}, ${slide.location}`}
                  aria-current={i === index}
                  className={`h-[3px] transition-all duration-700 ${
                    i === index ? "w-11 bg-white" : "w-5 bg-white/40 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
