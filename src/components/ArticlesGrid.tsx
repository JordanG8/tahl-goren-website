"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { Article } from '@/data/articlesContent';

interface ArticlesGridProps {
  articles: Article[];
}

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'guides' | 'construction' | 'rooms'>('all');

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'guides', label: 'מדריכים וטיפים' },
    { id: 'construction', label: 'שיטות בנייה' },
    { id: 'rooms', label: 'תכנון לפי חדרים' },
  ] as const;

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-end gap-3 border-b border-outline/10 pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-3 font-headline font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-primary text-white scale-100'
                : 'bg-surface text-secondary hover:bg-surface-container hover:text-primary'
            } border border-outline/5`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group card-hover block bg-surface overflow-hidden transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden bg-surface-container-low">
              <img
                src={article.heroImage}
                alt={article.heroAlt}
                className="w-full h-full object-cover img-grayscale transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-8 text-right">
              <h3 className="font-headline font-bold text-xl text-primary leading-tight group-hover:text-secondary transition-colors">
                {article.title}
              </h3>
              <p className="text-secondary text-sm mt-3 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between mt-6">
                <span className="font-label text-[10px] text-secondary">
                  {article.readingTimeMin} דק׳ קריאה
                </span>
                <div className="inline-flex items-center gap-2 font-headline font-bold text-xs text-primary group-hover:text-secondary transition-colors">
                  לקריאה
                  <span className="material-symbols-outlined text-base group-hover:translate-x-[-4px] transition-transform">
                    arrow_back
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-20 bg-surface">
          <p className="text-secondary text-lg">לא נמצאו מאמרים בקטגוריה זו.</p>
        </div>
      )}
    </div>
  );
}
