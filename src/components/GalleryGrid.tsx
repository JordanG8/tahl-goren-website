"use client";

import React, { useState, useEffect } from "react";
import { CloseIcon, ChevronIcon, ExpandIcon } from "@/components/ui/Icon";

export type GalleryImage = { src: string; alt: string; fullSrc?: string };

const defaultImages: GalleryImage[] = [
  { src: "/images/projects/barak-bathroom.jpg", alt: "Barak Bathroom" },
  { src: "/images/projects/barak-detail.jpg", alt: "Barak Detail" },
  { src: "/images/projects/barak-dining.jpg", alt: "Barak Dining" },
  { src: "/images/projects/barak-exterior.jpg", alt: "Barak Exterior" },
  { src: "/images/projects/barak-kitchen.jpg", alt: "Barak Kitchen" },
  { src: "/images/projects/barak-living.jpg", alt: "Barak Living" },
  { src: "/images/projects/gaz-bathroom.png", alt: "Gaz Bathroom" },
  { src: "/images/projects/katznelson-aerial.jpg", alt: "Katznelson Aerial" },
  { src: "/images/projects/nucham-detail.jpg", alt: "Nucham Detail" },
  { src: "/images/projects/nucham-living.jpg", alt: "Nucham Living" },
  { src: "/images/projects/persman-exterior.jpg", alt: "Persman Exterior" },
  { src: "/images/projects/persman-interior.jpg", alt: "Persman Interior" },
  { src: "/images/projects/ram-1.jpg", alt: "Ram Project 1" },
  { src: "/images/projects/ram-2.jpg", alt: "Ram Project 2" },
  { src: "/images/projects/shacham-door.jpg", alt: "Shacham Door" },
  { src: "/images/projects/shacham-entrance.jpg", alt: "Shacham Entrance" },
  { src: "/images/projects/shacham-living.jpg", alt: "Shacham Living" },
  { src: "/images/projects/shakolnik-detail.jpg", alt: "Shakolnik Detail" },
  { src: "/images/projects/shakolnik-interior.jpg", alt: "Shakolnik Interior" },
  { src: "/images/projects/shakolnik-living.jpg", alt: "Shakolnik Living" },
  { src: "/images/projects/shakolnik-warm.jpg", alt: "Shakolnik Warm" },
  { src: "/images/projects/shvaidel-bathroom.jpg", alt: "Shvaidel Bathroom" },
  { src: "/images/projects/shvaidel-bedroom.jpg", alt: "Shvaidel Bedroom" },
  { src: "/images/projects/vanish-bedroom.jpg", alt: "Vanish Bedroom" },
  { src: "/images/projects/vild-detail.jpg", alt: "Vild Detail" },
  { src: "/images/projects/vild-living.jpg", alt: "Vild Living" },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function GalleryGrid({ images }: { images?: GalleryImage[] }) {
  // When images are provided (e.g. a single project) keep their order;
  // otherwise fall back to the shuffled default site-wide gallery.
  const useProvided = Array.isArray(images) && images.length > 0;
  const [displayImages, setDisplayImages] = useState<GalleryImage[]>(
    useProvided ? images! : []
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!useProvided) setDisplayImages(shuffleArray(defaultImages));
  }, [useProvided]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowRight") showPrev(); // Hebrew UI direction
      if (e.key === "ArrowLeft") showNext(); // Hebrew UI direction
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageIndex, displayImages]);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImageIndex]);

  const showNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % displayImages.length);
  };

  const showPrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(
      (selectedImageIndex - 1 + displayImages.length) % displayImages.length
    );
  };

  return (
    <>
      {/* Masonry CSS Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {displayImages.map((img, index) => (
          <div
            key={index}
            className="group relative break-inside-avoid overflow-hidden bg-surface cursor-pointer rounded-sm"
            onClick={() => setSelectedImageIndex(index)}
          >
            <div className="relative w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <ExpandIcon
                size={34}
                className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 ease-out delay-100"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center opacity-100 transition-opacity duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            aria-label="סגירת התצוגה המוגדלת"
            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/70 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex(null);
            }}
          >
            <CloseIcon size={30} />
          </button>

          <button
            aria-label="התמונה הקודמת"
            className="absolute right-4 lg:right-12 text-white/50 hover:text-white transition-colors p-4 hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            <ChevronIcon size={38} direction="end" />
          </button>

          <button
            aria-label="התמונה הבאה"
            className="absolute left-4 lg:left-12 text-white/50 hover:text-white transition-colors p-4 hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <ChevronIcon size={38} direction="start" />
          </button>

          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center px-4 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImages[selectedImageIndex].fullSrc || displayImages[selectedImageIndex].src}
              alt={displayImages[selectedImageIndex].alt}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            />

            <div className="absolute inset-0 flex md:hidden">
              <div className="w-1/2 h-full" onClick={showPrev}></div>
              <div className="w-1/2 h-full" onClick={showNext}></div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-label font-medium text-[13px] tracking-[0.14em] text-white/60">
            {selectedImageIndex + 1} / {displayImages.length}
          </div>
        </div>
      )}
    </>
  );
}
