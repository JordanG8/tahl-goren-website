"use client";

import React, { useState } from "react";
import faqData from "@/data/faqData.json";
import { ArrowLink } from "@/components/ui/Section";
import { ChevronIcon } from "@/components/ui/Icon";

type FaqItem = {
  question: string;
  answer: string;
  slug?: string;
};

/**
 * FAQ list.
 *
 * Was a stack of bordered white cards, each with its own shadow — six boxes
 * shouting at the same volume. It is now a single ruled list: questions
 * separated by hairlines, the open one marked by a clay rule on the reading
 * edge. Nothing moves except the row you asked to open.
 */
export default function FaqAccordion({ limit }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = (faqData as FaqItem[]).slice(0, limit ?? faqData.length);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-hairline">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b border-hairline">
            <h3>
              <button
                className="w-full text-start py-6 sm:py-7 flex items-start justify-between gap-6 group"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
              >
                <span
                  className={`font-headline text-lg sm:text-xl leading-snug transition-colors duration-300 ${
                    isOpen ? "font-bold text-primary" : "font-medium text-primary group-hover:text-clay"
                  }`}
                >
                  {faq.question}
                </span>
                <ChevronIcon
                  size={22}
                  className={`flex-shrink-0 mt-1 transition-all duration-500 ${
                    isOpen ? "rotate-180 text-clay" : "text-ink-mute group-hover:text-clay"
                  }`}
                />
              </button>
            </h3>

            {/* Height animates via grid-template-rows rather than a guessed
                max-height, so long and short answers open at the same speed and
                nothing jumps at the end of the transition. */}
            <div
              id={`faq-panel-${index}`}
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div
                  // The open answer is indented from the reading edge behind a
                  // clay rule, so it reads as a margin note on its question.
                  className={`pb-8 ps-6 pe-4 border-s-2 transition-colors duration-500 ${
                    isOpen ? "border-clay/50" : "border-transparent"
                  }`}
                >
                  <p className="font-body text-secondary leading-[1.85] whitespace-pre-line text-base sm:text-base measure">
                    {faq.answer}
                  </p>

                  {faq.slug && (
                    <div className="mt-6">
                      <ArrowLink href={`/articles/${faq.slug}`} tone="clay">
                        למאמר המלא בנושא
                      </ArrowLink>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
