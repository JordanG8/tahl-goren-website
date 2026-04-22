
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { faqArticles } from "@/data/faqArticles";
import SeriesNavigator from "@/components/FAQ/SeriesNavigator";

export async function generateStaticParams() {
  return faqArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = faqArticles.find(a => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | טל גורן אדריכלות`,
    description: article.shortAnswer.substring(0, 160),
  };
}

export default async function FAQArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const article = faqArticles.find(a => a.slug === slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-white pb-20 pt-32" dir="rtl">
      <article className="max-w-4xl mx-auto px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-primary">ראשי</Link>
          <span>/</span>
          <Link href="/faq" className="hover:text-primary">שאלות ומדריכים</Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{article.title}</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            {article.content.intro}
          </p>
        </header>

        {article.image && (
          <div className="mb-16 rounded-3xl overflow-hidden aspect-[16/9] shadow-2xl">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-12">
          {article.content.sections.map((section, idx) => (
            <section key={idx} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-lg text-gray-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {section.list && (
                <ul className="mt-6 space-y-3 pr-4">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-3 text-lg text-gray-700">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 md:p-12 bg-primary/5 rounded-3xl border border-primary/10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">עדיין יש לכם שאלות?</h3>
          <p className="text-lg text-gray-600 mb-8">
            כל פרויקט הוא ייחודי. אני מזמינה אתכם לשיחת ייעוץ ראשונה ללא עלות, שבה נעשה סדר בתהליך ונבין איך להפוך את החזון שלכם למציאות.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition-colors text-lg"
          >
            בואו נדבר
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        {/* Series Navigation */}
        <SeriesNavigator currentArticle={article} />
      </article>
    </main>
  );
}
