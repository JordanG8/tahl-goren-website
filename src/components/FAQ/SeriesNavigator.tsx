
import React from 'react';
import Link from 'next/link';
import { FAQArticle, faqSeries } from '@/data/faqData';
import { faqArticles } from '@/data/faqArticles';

interface SeriesNavigatorProps {
  currentArticle: FAQArticle;
}

const SeriesNavigator: React.FC<SeriesNavigatorProps> = ({ currentArticle }) => {
  const series = faqSeries.find(s => s.id === currentArticle.seriesId);
  if (!series) return null;

  const currentIndex = series.articles.indexOf(currentArticle.slug);
  const prevSlug = currentIndex > 0 ? series.articles[currentIndex - 1] : null;
  const nextSlug = currentIndex < series.articles.length - 1 ? series.articles[currentIndex + 1] : null;

  const prevArticle = prevSlug ? faqArticles.find(a => a.slug === prevSlug) : null;
  const nextArticle = nextSlug ? faqArticles.find(a => a.slug === nextSlug) : null;

  return (
    <div className="mt-16 pt-8 border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {prevArticle ? (
          <Link 
            href={`/faq/${prevArticle.slug}`}
            className="flex-1 group p-6 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors text-right"
          >
            <span className="text-xs text-gray-400 block mb-2 font-medium">הקודם בסדרה</span>
            <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors block">
              {prevArticle.question}
            </span>
          </Link>
        ) : <div className="flex-1" />}

        {nextArticle ? (
          <Link 
            href={`/faq/${nextArticle.slug}`}
            className="flex-1 group p-6 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors text-right md:text-left"
          >
            <span className="text-xs text-gray-400 block mb-2 font-medium">הבא בסדרה</span>
            <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors block">
              {nextArticle.question}
            </span>
          </Link>
        ) : <div className="flex-1" />}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/faq"
          className="text-primary font-bold hover:underline"
        >
          חזרה לכל השאלות והמדריכים
        </Link>
      </div>
    </div>
  );
};

export default SeriesNavigator;
