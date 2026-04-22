"use client";

import React from "react";

const reviewImages = [
  "המלצת לקוח על טל גורן 01.jpg",
  "המלצת לקוח על טל גורן 02.jpg",
  "המלצת לקוח על טל גורן 03.jpg",
  "המלצת לקוח על טל גורן 04.jpg",
  "המלצת לקוח על טל גורן 05.jpg",
  "המלצת לקוח על טל גורן 06.jpg",
  "המלצת לקוח על טל גורן 07.jpg",
  "המלצת לקוח על טל גורן 08.jpg",
  "המלצת לקוח על טל גורן 09.jpg",
  "המלצת לקוח על טל גורן 10.jpg",
  "המלצת לקוח על טל גורן 11.jpg",
  "המלצת לקוח על טל גורן 12.jpg",
  "המלצת לקוח על טל גורן 13.jpg",
  "המלצת לקוח על טל גורן 14.jpg",
  "המלצת לקוח על טל גורן 15.jpg",
  "המלצת לקוח על טל גורן 16.jpg",
  "המלצת לקוח על טל גורן 17.jpg",
  "המלצת לקוח על טל גורן 18.jpg",
  "המלצת לקוח על טל גורן 19.jpg",
  "המלצת לקוח על טל גורן 20.jpg",
  "המלצת לקוח על טל גורן 21.jpg",
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const half = Math.ceil(reviewImages.length / 2);
  const row1 = reviewImages.slice(0, half);
  const row2 = reviewImages.slice(half);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewImages.length);
    }, 3250); // 3000ms stay + 250ms transition
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden flex flex-col gap-10">
      {/* Map Embed */}
      <div className="w-full flex justify-center px-4" dir="ltr">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3364.294181639358!2d35.0034882!3d32.5182891!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d0f2c70487827%3A0x987f6eca6f0e2b0d!2z15DXk9eo15nXm9ec15nXqiDXmNecINeS15XXqNefIC0g15zXlNeS16nXmdedINec157Xqdek15fXlCDXqdec15og15HXmdeqINeS157XmdepLCDXmdei15nXnCDXldee16LXldem15E!5e0!3m2!1siw!2sil!4v1776844849551!5m2!1siw!2sil"
          width="100%"
          height="400"
          style={{ border: 0, maxWidth: "800px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Mobile-only Stepped Carousel */}
      <div className="md:hidden relative w-full px-4 overflow-hidden" dir="ltr">
        <div 
          className="flex transition-transform duration-[250ms] ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviewImages.map((img, i) => (
            <div key={i} className="w-full flex-shrink-0 flex justify-center px-2">
              <img 
                src={"/images/reviews/" + encodeURIComponent(img)} 
                alt="המלצת לקוח" 
                className="w-full max-w-sm rounded-xl shadow-lg"
              />
            </div>
          ))}
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center gap-1.5 mt-6 flex-wrap px-4">
          {reviewImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop-only Layered Carousels */}
      <div className="hidden md:flex flex-col gap-6 relative w-full pt-10" dir="ltr">
        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-300px * ${row1.length})); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(calc(-300px * ${row2.length})); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
            display: flex;
            width: calc(300px * ${row1.length * 2});
          }
          .animate-scroll-right {
            animation: scroll-right 40s linear infinite;
            display: flex;
            width: calc(300px * ${row2.length * 2});
          }
          .animate-scroll-left:hover, .animate-scroll-right:hover {
            animation-play-state: paused;
          }
          .review-card {
            width: 300px;
            padding: 0 15px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
          }
          .review-card img {
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
          .review-card img:hover {
            transform: scale(1.03);
          }
        `}</style>
        
        {/* Row 1: moves left */}
        <div className="overflow-hidden w-full flex">
          <div className="animate-scroll-left">
            {[...row1, ...row1].map((img, i) => (
              <div key={i} className="review-card">
                <img src={"/images/reviews/" + encodeURIComponent(img)} alt="המלצת לקוח" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: moves right */}
        <div className="overflow-hidden w-full flex">
          <div className="animate-scroll-right">
            {[...row2, ...row2].map((img, i) => (
              <div key={i} className="review-card">
                <img src={"/images/reviews/" + encodeURIComponent(img)} alt="המלצת לקוח" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
