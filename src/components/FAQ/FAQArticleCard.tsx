
import React from 'react';
import Link from 'next/link';
import { FAQArticle } from '@/data/faqData';

interface FAQArticleCardProps {
  article: FAQArticle;
  seriesTitle?: string;
}

const FAQArticleCard: React.FC<FAQArticleCardProps> = ({ article, seriesTitle }) => {
  return (
    <Link 
      href={`/faq/${article.slug}`}
      className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-6 flex flex-col h-full">
        {seriesTitle && (
          <span className="text-[10px] uppercase tracking-wider text-primary/60 font-bold mb-2">
            {seriesTitle}
          </span>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
          {article.question}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {article.shortAnswer.replace(/\*\*\*.*?\*\*\*/g, '').trim()}
        </p>
        <div className="flex items-center text-primary font-bold text-sm">
          <span>קרא עוד</span>
          <svg 
            className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default FAQArticleCard;
