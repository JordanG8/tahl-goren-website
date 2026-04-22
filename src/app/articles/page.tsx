/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from 'next/link';
import { siteData } from '@/data/siteData';
import { articles as siteArticles } from '@/data/articlesContent';

export const metadata: Metadata = {
  title: "מאמרים וטיפים מקצועיים | טל גורן אדריכלות",
  description: "מאמרים מקצועיים על תכנון בית פרטי, עלויות בנייה, אדריכלות מודרנית, שיפוצים ועוד. טיפים מעשיים מהאדריכלית טל גורן.",
};

export default async function Articles() {
  const mediaArticles: any[] = siteData.mediaArticles;

  return (
    <>

      {/* Page Header */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto text-right">
          <div className="flex items-center justify-start gap-1 mb-10 font-label text-xs text-secondary tracking-wide flex-row-reverse">
            <Link href="/" className="hover:text-primary transition-colors">ראשי</Link>
            <span className="breadcrumb-sep"></span>
            <span className="text-primary font-medium">מאמרים וכתבות</span>
          </div>
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
            תוכן<br/>והשראה
          </h1>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
            טיפים מקצועיים, כתבות בתקשורת ותהליכי תכנון מאחורי הקלעים.
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10 mr-0 ml-auto"></div>
        </div>
      </section>

      {/* Site Articles Section */}
      <section className="py-24 md:py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-right">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">Blog & Tips</span>
            <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary mt-4">מאמרים וטיפים מקצועיים</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group card-hover block bg-surface overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={article.heroImage}
                    alt={article.heroAlt}
                    className="w-full h-full object-cover img-grayscale"
                  />
                </div>
                <div className="p-8 text-right">
                  <h3 className="font-headline font-bold text-xl text-primary leading-tight group-hover:text-secondary transition-colors">{article.title}</h3>
                  <p className="text-secondary text-sm mt-3 leading-relaxed line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="font-label text-[10px] text-secondary">{article.readingTimeMin} דק׳ קריאה</span>
                    <div className="inline-flex items-center gap-2 font-headline font-bold text-xs text-primary group-hover:text-secondary transition-colors">
                      לקריאה
                      <span className="material-symbols-outlined text-base group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Media Mentions Section */}
      {mediaArticles && mediaArticles.length > 0 && (
        <section className="py-24 md:py-32 px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-right">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">Media & Press</span>
              <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary mt-4">בתקשורת ובכתבות</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaArticles.map((article: any, index: number) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card-hover block bg-surface-container p-8 text-right"
                >
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">{article.source}</span>
                  <h3 className="font-headline font-bold text-lg text-primary mt-3 leading-tight group-hover:text-secondary transition-colors">{article.title}</h3>
                  <p className="text-secondary text-sm mt-3 leading-relaxed">{article.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 font-headline font-bold text-xs text-primary group-hover:text-secondary transition-colors">
                    לכתבה המלאה
                    <span className="material-symbols-outlined text-base group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facebook CTA */}
      <section className="py-20 px-8 bg-surface-container-highest">
        <div className="max-w-5xl mx-auto">
          <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noopener noreferrer" className="block bg-surface group card-hover overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-5 aspect-video md:aspect-auto md:h-full overflow-hidden">
                <img
                  src="https://talgoren.co.il/wp-content/uploads/2020/03/כמה-עולה-לבנות-בית-ו-אדריכלות.jpg"
                  alt="כתבות פייסבוק"
                  className="w-full h-full object-cover img-grayscale"
                />
              </div>
              <div className="md:col-span-7 p-12 flex flex-col gap-6 text-right">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">Facebook Articles</span>
                <h3 className="font-headline font-black text-3xl tracking-tight text-primary leading-tight">
                  עוד כתבות ותכנים בפייסבוק
                </h3>
                <p className="text-secondary text-lg leading-relaxed">
                  מוזמנים לעקוב אחרי דף הפייסבוק שלי לעדכונים יומיומיים, תמונות מפרויקטים בשטח ומאמרים קצרים.
                </p>
                <div className="inline-flex items-center justify-end gap-3 font-headline font-bold text-sm text-primary group-hover:text-secondary transition-colors">
                  לעמודי המאמרים המלאים
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

    </>
  );
}
