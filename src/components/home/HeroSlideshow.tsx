"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_MS = 6500;

export default function HeroSlideshow({ images }: { images: { src: string; alt: string }[] }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => setSlide((s) => (s + 1) % images.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ opacity: slide === i ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            quality={82}
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            className="object-cover animate-kenburns"
          />
        </div>
      ))}

      {/* Two stacked scrims: one lifts the copy off the photo bottom-to-top,
          one darkens the start edge so RTL text always has contrast. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(26,38,46,0.88) 0%, rgba(26,38,46,0.5) 45%, rgba(26,38,46,0.66) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to left, rgba(26,38,46,0.85) 0%, rgba(26,38,46,0.55) 42%, transparent 78%)",
        }}
      />

      <div className="absolute bottom-8 left-10 z-10 flex gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`מעבר לתמונת רקע ${i + 1}`}
            aria-current={slide === i}
            className="h-[3px] border-0 p-0 cursor-pointer transition-all duration-500"
            style={{
              width: slide === i ? 38 : 16,
              background: slide === i ? "#ffffff" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </>
  );
}
