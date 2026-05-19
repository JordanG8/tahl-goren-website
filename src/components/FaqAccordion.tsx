"use client";

import React, { useState } from "react";
import Link from "next/link";
import faqData from "@/data/faqData.json";

type FaqItem = {
  question: string;
  answer: string;
  slug?: string;
};

export default function FaqAccordion({ limit }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = (faqData as FaqItem[]).slice(0, limit ?? faqData.length);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`bg-surface overflow-hidden transition-all duration-300 card-hover ${
              isOpen ? "border-primary" : "border-outline/20"
            } border`}
          >
            <button
              className="w-full text-right px-8 py-6 flex items-center justify-between focus:outline-none group"
              onClick={() => toggleFaq(index)}
              aria-expanded={isOpen}
            >
              <h3 className={`font-headline text-lg md:text-xl leading-tight pl-4 transition-colors ${isOpen ? "font-bold text-primary" : "font-medium text-primary group-hover:text-secondary"}`}>
                {faq.question}
              </h3>
              <div
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-primary" : "text-secondary"
                }`}
              >
                <span className="material-symbols-outlined text-2xl">
                  expand_more
                </span>
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-8 pb-8 pt-2 text-right">
                <p className="text-secondary leading-relaxed whitespace-pre-line text-base">
                  {faq.answer}
                </p>

                {faq.slug && (
                  <div className="mt-7 flex justify-start">
                    <Link
                      href={`/articles/${faq.slug}`}
                      className="group/link inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-headline font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
                    >
                      למאמר המלא בנושא
                      <span className="material-symbols-outlined text-base transition-transform group-hover/link:-translate-x-1">arrow_back</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
