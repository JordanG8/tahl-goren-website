"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  { src: "/images/projects/barak-bathroom.jpg", alt: "Barak Bathroom", orientation: "portrait" },
  { src: "/images/projects/barak-detail.jpg", alt: "Barak Detail", orientation: "landscape" },
  { src: "/images/projects/barak-dining.jpg", alt: "Barak Dining", orientation: "landscape" },
  { src: "/images/projects/barak-exterior.jpg", alt: "Barak Exterior", orientation: "landscape" },
  { src: "/images/projects/barak-kitchen.jpg", alt: "Barak Kitchen", orientation: "landscape" },
  { src: "/images/projects/barak-living.jpg", alt: "Barak Living", orientation: "landscape" },
  { src: "/images/projects/gaz-bathroom.png", alt: "Gaz Bathroom", orientation: "portrait" },
  { src: "/images/projects/katznelson-aerial.jpg", alt: "Katznelson Aerial", orientation: "landscape" },
  { src: "/images/projects/nucham-detail.jpg", alt: "Nucham Detail", orientation: "portrait" },
  { src: "/images/projects/nucham-living.jpg", alt: "Nucham Living", orientation: "landscape" },
  { src: "/images/projects/persman-exterior.jpg", alt: "Persman Exterior", orientation: "landscape" },
  { src: "/images/projects/persman-interior.jpg", alt: "Persman Interior", orientation: "portrait" },
  { src: "/images/projects/ram-1.jpg", alt: "Ram Project 1", orientation: "landscape" },
  { src: "/images/projects/ram-2.jpg", alt: "Ram Project 2", orientation: "landscape" },
  { src: "/images/projects/shacham-door.jpg", alt: "Shacham Door", orientation: "portrait" },
  { src: "/images/projects/shacham-entrance.jpg", alt: "Shacham Entrance", orientation: "landscape" },
  { src: "/images/projects/shacham-living.jpg", alt: "Shacham Living", orientation: "landscape" },
  { src: "/images/projects/shakolnik-detail.jpg", alt: "Shakolnik Detail", orientation: "landscape" },
  { src: "/images/projects/shakolnik-interior.jpg", alt: "Shakolnik Interior", orientation: "landscape" },
  { src: "/images/projects/shakolnik-living.jpg", alt: "Shakolnik Living", orientation: "landscape" },
  { src: "/images/projects/shakolnik-warm.jpg", alt: "Shakolnik Warm", orientation: "portrait" },
  { src: "/images/projects/shvaidel-bathroom.jpg", alt: "Shvaidel Bathroom", orientation: "portrait" },
  { src: "/images/projects/shvaidel-bedroom.jpg", alt: "Shvaidel Bedroom", orientation: "landscape" },
  { src: "/images/projects/vanish-bedroom.jpg", alt: "Vanish Bedroom", orientation: "landscape" },
  { src: "/images/projects/vild-detail.jpg", alt: "Vild Detail", orientation: "portrait" },
  { src: "/images/projects/vild-living.jpg", alt: "Vild Living", orientation: "landscape" },
];

// Shuffle array for a more dynamic feel (only once on mount)
function shuffleArray(array: any[]) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function GalleryGrid() {
  const [shuffledImages, setShuffledImages] = useState<typeof images>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  useEffect(() => {
    // Only shuffle on the client side to avoid hydration mismatch
    setShuffledImages(shuffleArray(images));
  }, []);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') showPrev(); // Hebrew UI direction
      if (e.key === 'ArrowLeft') showNext();  // Hebrew UI direction
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, shuffledImages]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);

  const showNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % shuffledImages.length);
  };

  const showPrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + shuffledImages.length) % shuffledImages.length);
  };

  return (
    <>
      {/* Masonry CSS Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {shuffledImages.map((img, index) => (
          <div
            key={index}
            className="group relative break-inside-avoid overflow-hidden bg-surface cursor-pointer rounded-sm"
            onClick={() => setSelectedImageIndex(index)}
          >
            {/* The image itself */}
            <div className="relative w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 ease-out delay-100">
                fullscreen
              </span>
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
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/70 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex(null);
            }}
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          {/* Navigation Buttons */}
          <button 
            className="absolute right-4 lg:right-12 text-white/50 hover:text-white transition-colors p-4 hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            <span className="material-symbols-outlined text-5xl">chevron_right</span>
          </button>
          
          <button 
            className="absolute left-4 lg:left-12 text-white/50 hover:text-white transition-colors p-4 hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <span className="material-symbols-outlined text-5xl">chevron_left</span>
          </button>

          {/* Main Image */}
          <div 
            className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center px-4 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shuffledImages[selectedImageIndex].src}
              alt={shuffledImages[selectedImageIndex].alt}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            />
            
            {/* Mobile Navigation Area (Invisible overlay to click next/prev on mobile) */}
            <div className="absolute inset-0 flex md:hidden">
              <div className="w-1/2 h-full" onClick={showPrev}></div>
              <div className="w-1/2 h-full" onClick={showNext}></div>
            </div>
          </div>
          
          {/* Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-label text-xs tracking-[0.2em] text-white/60">
            {selectedImageIndex + 1} / {shuffledImages.length}
          </div>
        </div>
      )}
    </>
  );
}
