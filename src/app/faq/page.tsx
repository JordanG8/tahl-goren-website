"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ChevronDown, BookOpen } from "lucide-react";
import faqData from "@/data/faqData.json";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20">
      <Head>
        <title>שאלות נפוצות | טל גורן אדריכלית</title>
        <meta
          name="description"
          content="כל התשובות לשאלות הנפוצות ביותר על תכנון, רישוי ובניית בית פרטי. מידע מקצועי וטיפים מטל גורן, אדריכלית מורשית היתר."
        />
      </Head>

      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6 font-serif">
            שאלות ותשובות
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            ריכזתי עבורכם את כל השאלות שאני נשאלת הכי הרבה. מניסיון, הבנה מוקדמת של התהליך מונעת טעויות יקרות ושומרת על התקציב שלכם.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border transition-all duration-300 ${
                  isOpen ? "border-stone-400 shadow-md" : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <button
                  className="w-full text-right px-6 py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <h3 className={`text-lg md:text-xl font-bold pr-4 ${isOpen ? "text-stone-800" : "text-stone-700"}`}>
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "bg-stone-800 text-white rotate-180" : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 pr-10">
                    <p className="text-stone-600 leading-relaxed whitespace-pre-line text-lg">
                      {faq.answer}
                    </p>
                    
                    {faq.slug && (
                      <div className="mt-6">
                        <Link
                          href={`/articles/${faq.slug}`}
                          className="inline-flex items-center text-stone-800 font-bold hover:text-stone-600 transition-colors gap-2 group"
                        >
                          <BookOpen className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                          <span>למאמר המלא בנושא</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-stone-800 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4 font-serif">לא מצאתם את התשובה שחיפשתם?</h2>
          <p className="text-lg text-stone-300 mb-8 max-w-xl mx-auto">
            אני כאן כדי לעזור. דברו איתי ויחד נבין מה המסלול הנכון עבור הפרויקט שלכם.
          </p>
          <a
            href="https://wa.me/972528345799"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-stone-800 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-stone-100 transition-all hover:scale-105"
          >
            שלחו לי הודעה בוואטסאפ
          </a>
        </div>
      </div>
    </div>
  );
}
