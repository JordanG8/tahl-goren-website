"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/data/articlesContent';
import Reveal from '@/components/motion/Reveal';
import { ArrowIcon } from '@/components/ui/Icon';

interface ArticlesGridProps {
  articles: Article[];
}

const categories = [
  { id: 'all', label: 'הכל' },
  { id: 'guides', label: 'מדריכים וטיפים' },
  { id: 'construction', label: 'שיטות בנייה' },
  { id: 'rooms', label: 'תכנון לפי חדרים' },
] as const;

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]['id']>('all');

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Filters as a ruled tab strip. Solid filled pills read as four
          competing buttons; an underline marks the active one without adding
          four blocks of colour above the grid. */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-hairline">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={isActive}
              className={`relative pb-4 font-label text-[13px] tracking-[0.04em] transition-colors duration-300 ${
                isActive ? 'text-primary' : 'text-ink-mute hover:text-primary'
              }`}
            >
              {cat.label}
              <span
                className={`absolute -bottom-px right-0 h-[2px] bg-clay transition-all duration-500 ${
                  isActive ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {filteredArticles.map((article, i) => (
          <Reveal key={article.slug} delay={(i % 3) * 90}>
            <Link href={`/articles/${article.slug}`} className="group block h-full">
              <div className="aspect-[4/3] overflow-hidden relative bg-surface-container-low">
                <Image
                  src={article.heroImage}
                  alt={article.heroAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover img-grayscale"
                  loading="lazy"
                />
              </div>
              <div className="pt-5 mt-5 border-t border-hairline">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                  {article.readingTimeMin} דק׳ קריאה
                </span>
                <h3 className="font-headline font-bold text-lg text-primary leading-snug mt-2.5 transition-colors duration-300 group-hover:text-clay">
                  {article.title}
                </h3>
                <p className="font-body text-[15px] text-secondary mt-3 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 font-headline font-bold text-[13px] text-primary group-hover:text-clay transition-colors mt-5">
                  <span className="link-quiet">לקריאה</span>
                  <ArrowIcon size={16} className="transition-transform duration-500 group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <p className="text-center py-20 font-body text-secondary text-lg">
          לא נמצאו מאמרים בקטגוריה זו.
        </p>
      )}
    </div>
  );
}
