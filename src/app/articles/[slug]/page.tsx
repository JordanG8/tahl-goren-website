import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, articlesBySlug, type Article } from "@/data/articlesContent";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = articlesBySlug[slug];
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [{ url: article.heroImage, alt: article.heroAlt }],
    },
  };
}

function ArticleJsonLd({ article }: { article: Article }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.heroImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: "טל גורן",
      url: "https://talgoren.co.il/about",
    },
    publisher: {
      "@type": "Organization",
      name: "טל גורן אדריכלות",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({ article }: { article: Article }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ראשי", item: "/" },
      { "@type": "ListItem", position: 2, name: "מאמרים", item: "/articles" },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `/articles/${article.slug}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function FaqJsonLd({ faq }: { faq: Article["faq"] }) {
  if (!faq?.length) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const article = articlesBySlug[slug];
  if (!article) notFound();

  const relatedArticles = article.related
    .map((s) => articlesBySlug[s])
    .filter(Boolean);

  return (
    <>
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd article={article} />
      <FaqJsonLd faq={article.faq} />

      {/* Hero */}
      <section className="relative">
        <div className="aspect-[3/2] sm:aspect-[21/9] max-h-[480px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.heroImage}
            alt={article.heroAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-end overflow-hidden">
          <div className="max-w-4xl mx-auto w-full px-8 pb-12 text-right">
            <div className="flex items-center gap-1 mb-6 font-label text-xs text-white/70 tracking-wide flex-row-reverse">
              <Link href="/" className="hover:text-white transition-colors">
                ראשי
              </Link>
              <span className="breadcrumb-sep" style={{ color: "rgba(255,255,255,0.4)" }} />
              <Link
                href="/articles"
                className="hover:text-white transition-colors"
              >
                מאמרים
              </Link>
              <span className="breadcrumb-sep" style={{ color: "rgba(255,255,255,0.4)" }} />
              <span className="text-white font-medium">{article.title}</span>
            </div>
            <h1 className="font-headline font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white max-w-3xl">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 mt-6 font-label text-xs text-white/60 flex-row-reverse">
              <span>טל גורן</span>
              <span>·</span>
              <time dateTime={article.updatedAt}>
                {new Date(article.updatedAt).toLocaleDateString("he-IL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{article.readingTimeMin} דק׳ קריאה</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 md:py-24 px-8" dir="rtl">
        <div className="max-w-3xl mx-auto">
          {/* Intro */}
          <p className="text-secondary text-lg md:text-xl leading-relaxed mb-12 font-body">
            {article.excerpt}
          </p>
          <div className="w-12 h-[2px] bg-secondary mb-12 mr-0 ml-auto" />

          {/* Table of contents */}
          <nav className="mb-16 p-6 bg-surface-container rounded">
            <h2 className="font-headline font-bold text-sm text-primary mb-4">
              תוכן עניינים
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              {article.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="font-body text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
              {article.faq?.length ? (
                <li>
                  <a
                    href="#faq"
                    className="font-body text-secondary hover:text-primary transition-colors text-sm"
                  >
                    שאלות נפוצות
                  </a>
                </li>
              ) : null}
            </ol>
          </nav>

          {/* Sections */}
          {article.sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className="mb-14">
              <h2 className="font-headline font-black text-2xl md:text-3xl text-primary mb-6 leading-tight">
                {section.heading}
              </h2>
              {section.body.map((p, pi) => (
                <p
                  key={pi}
                  className="text-secondary text-base md:text-lg leading-relaxed mb-4 font-body"
                >
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2 pr-4">
                  {section.list.map((item, li) => (
                    <li
                      key={li}
                      className="flex items-start gap-3 text-secondary text-base leading-relaxed font-body"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* FAQ */}
          {article.faq?.length ? (
            <section id="faq" className="mb-14">
              <h2 className="font-headline font-black text-2xl md:text-3xl text-primary mb-8 leading-tight">
                שאלות נפוצות
              </h2>
              <div className="border border-outline/20 rounded overflow-hidden">
                {article.faq.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="font-headline font-bold text-primary text-base">
                      {item.question}
                      <span className="material-symbols-outlined faq-chevron">
                        expand_more
                      </span>
                    </summary>
                    <div className="faq-answer">
                      <p className="text-secondary text-base leading-relaxed font-body">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {/* CTA */}
          <div className="mt-16 p-8 md:p-12 bg-surface-container-low rounded text-right">
            <h3 className="font-headline font-black text-xl md:text-2xl text-primary mb-4">
              רוצים לשוחח על הפרויקט שלכם?
            </h3>
            <p className="text-secondary text-base leading-relaxed mb-6 font-body">
              פגישת ייעוץ ראשונה — ללא עלות וללא התחייבות. נשמח להכיר
              ולהתחיל לחשוב יחד.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-headline font-bold text-sm hover:bg-secondary transition-colors"
            >
              לפגישת ייעוץ
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
            </Link>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 md:py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-right">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
                Related Articles
              </span>
              <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary mt-4">
                מאמרים נוספים
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.slug}`}
                  className="group card-hover block bg-surface overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={related.heroImage}
                      alt={related.heroAlt}
                      className="w-full h-full object-cover img-grayscale"
                    />
                  </div>
                  <div className="p-8 text-right">
                    <h3 className="font-headline font-bold text-xl text-primary leading-tight group-hover:text-secondary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-secondary text-sm mt-3 leading-relaxed line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 font-headline font-bold text-xs text-primary group-hover:text-secondary transition-colors">
                      לקריאה
                      <span className="material-symbols-outlined text-base group-hover:translate-x-[-4px] transition-transform">
                        arrow_back
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
