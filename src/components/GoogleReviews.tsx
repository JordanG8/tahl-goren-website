"use client";

import React from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import type { SiteReview } from "@/lib/reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

// Google Maps assigns each account without a photo a solid-color monogram
// circle; mirror that (deterministically per name) so photo-less reviewers
// still read as Google accounts rather than site-invented testimonials.
const AVATAR_COLORS = ["#7B1FA2", "#00796B", "#C2185B", "#5D4037", "#455A64", "#E64A19", "#303F9F", "#00838F"];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C41 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z"/>
    </svg>
  );
}

function ReviewCard({ review }: { review: SiteReview }) {
  return (
    <div className="rounded-lg bg-white border border-[#e8eaed] shadow-[0_1px_2px_rgba(60,64,67,0.15)] p-5 flex flex-col gap-2.5 h-full">
      <div className="flex items-center gap-3">
        {review.photoUrl ? (
          <Image
            src={review.photoUrl}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full text-white font-medium text-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: avatarColor(review.name) }}
            aria-hidden="true"
          >
            {review.name.trim().charAt(0) || "?"}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-medium text-[#202124] text-[15px] truncate">{review.name}</p>
          <p className="text-xs text-[#70757a]">ביקורת ב-Google</p>
        </div>
        <GoogleG className="w-5 h-5 flex-shrink-0" />
      </div>
      <div className="flex items-center gap-2">
        <StarRating rating={review.rating} />
        {review.relativeTime && (
          <span className="text-xs text-[#70757a]">{review.relativeTime}</span>
        )}
      </div>
      <p className="font-body text-sm text-[#3c4043] leading-relaxed line-clamp-6">{review.text}</p>
    </div>
  );
}

export default function GoogleReviews({ reviews }: { reviews: SiteReview[] }) {
  if (reviews.length === 0) return null;

  const half = Math.ceil(reviews.length / 2);
  const row1 = reviews.slice(0, half);
  const row2 = reviews.slice(half);
  const canLoopRows = row1.length > 0 && row2.length > 0;

  return (
    <div className="w-full overflow-hidden flex flex-col gap-6 md:gap-10">
      {/* Mobile: stacked-cards swiper */}
      <div className="md:hidden relative w-full px-4 overflow-hidden py-10" dir="ltr">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          loop={reviews.length > 1}
          modules={[EffectCards, Pagination, Autoplay]}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="w-[280px] sm:w-[320px] !pb-12 reviews-mobile-swiper"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i} className="rounded-lg !h-[420px]" dir="rtl">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
        <style dangerouslySetInnerHTML={{__html: `
          .reviews-mobile-swiper .swiper-slide:not(.swiper-slide-active) {
            filter: blur(2px);
            opacity: 0.8;
          }
          .reviews-mobile-swiper .swiper-slide-active {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4) !important;
          }
        `}} />
      </div>

      {/* Desktop: two counter-scrolling marquee rows, paused on hover */}
      <div className="hidden md:flex flex-col gap-6 relative w-full pt-10" dir="ltr">
        <style>{`
          @keyframes gr-scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-320px * ${row1.length})); }
          }
          @keyframes gr-scroll-right {
            0% { transform: translateX(calc(-320px * ${row2.length})); }
            100% { transform: translateX(0); }
          }
          .gr-row-left {
            animation: gr-scroll-left 40s linear infinite;
            display: flex;
            width: calc(320px * ${row1.length * 2});
          }
          .gr-row-right {
            animation: gr-scroll-right 40s linear infinite;
            display: flex;
            width: calc(320px * ${row2.length * 2});
          }
          .gr-row-left:hover, .gr-row-right:hover {
            animation-play-state: paused;
          }
          .gr-card-slot {
            width: 320px;
            padding: 0 12px;
            flex-shrink: 0;
            height: 250px;
          }
        `}</style>

        <div className="overflow-hidden w-full flex">
          <div className={canLoopRows ? "gr-row-left" : "flex"} dir="rtl">
            {(canLoopRows ? [...row1, ...row1] : row1).map((review, i) => (
              <div key={i} className="gr-card-slot">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {row2.length > 0 && (
          <div className="overflow-hidden w-full flex">
            <div className={canLoopRows ? "gr-row-right" : "flex"} dir="rtl">
              {(canLoopRows ? [...row2, ...row2] : row2).map((review, i) => (
                <div key={i} className="gr-card-slot">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
