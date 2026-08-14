import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { articles, articlesBySlug, type Article } from "@/data/articlesContent";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleAuthorBox from "@/components/ArticleAuthorBox";
import { Section, SectionHeading, ButtonLink } from "@/components/ui/Section";
import { ArrowIcon, ChevronIcon } from "@/components/ui/Icon";

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

const ORG_ID = "https://talgoren.co.il/#organization";
const PERSON_ID = "https://talgoren.co.il/about#person";

function ArticleJsonLd({ article }: { article: Article }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: `https://talgoren.co.il/articles/${article.slug}`,
    headline: article.title,
    description: article.metaDescription,
    image: article.heroImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
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
      {
        "@type": "ListItem",
        position: 1,
        item: { "@id": "https://talgoren.co.il/", name: "ראשי" },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: { "@id": "https://talgoren.co.il/articles", name: "מאמרים" },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": `https://talgoren.co.il/articles/${article.slug}`,
          name: article.title,
        },
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

function renderParagraphWithLinks(text: string) {
  // Regex to split by markdown links [text](url)
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      return (
        <Link key={i} href={url} className="text-primary underline hover:text-secondary transition-colors">
          {linkText}
        </Link>
      );
    }

    // Now split the remaining text by phone number patterns (e.g. 052-8345799 or 0528345799)
    const phoneParts = part.split(/(05\d-?\d{7})/g);
    return phoneParts.map((subPart, j) => {
      const phoneMatch = subPart.match(/^(05\d-?\d{7})$/);
      if (phoneMatch) {
        const rawPhone = phoneMatch[1].replace(/-/g, "");
        return (
          <a key={`${i}-${j}`} href={`tel:${rawPhone}`} className="text-primary underline hover:text-secondary transition-colors">
            {phoneMatch[1]}
          </a>
        );
      }
      return subPart;
    });
  });
}

export default async function ArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const article = articlesBySlug[slug];
  if (!article) notFound();

  const relatedArticles = (article.related || [])
    .map((s: string) => articlesBySlug[s])
    .filter(Boolean);

  const isSeries = article.category === "rooms" || article.category === "construction";
  const seriesArticles = isSeries ? articles.filter(a => a.category === article.category) : [];
  const currentIndex = isSeries ? seriesArticles.findIndex(a => a.slug === article.slug) : -1;
  const totalInSeries = seriesArticles.length;

  const prevArticle = currentIndex > 0 ? seriesArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < totalInSeries - 1 ? seriesArticles[currentIndex + 1] : null;

  return (
    <>
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd article={article} />
      <FaqJsonLd faq={article.faq} />

      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[3/2] sm:aspect-[21/9] max-h-[480px] w-full overflow-hidden">
          <Image
            src={article.heroImage}
            alt={article.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-end overflow-hidden">
          <div className="max-w-4xl mx-auto w-full px-8 pb-12 text-right">
            <div className="mb-6">
              <Breadcrumb
                light
                items={[
                  { label: "ראשי", to: "/" },
                  { label: "מאמרים וכתבות", to: "/articles" },
                  { label: article.title },
                ]}
              />
            </div>
            <h1 className="font-headline font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white max-w-3xl">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 mt-6 font-label font-medium text-[13px] text-white/60 flex-row-reverse">
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
      <article className="py-16 md:py-24 px-6 sm:px-8" dir="rtl">
        <div className="max-w-[46rem] mx-auto">
          {/* Intro / quick answer — direct answer up top for readers and AI search */}
          <div className="mb-14 border-s-2 border-clay ps-6">
            <span className="font-label font-medium text-[13px] uppercase tracking-[0.18em] text-clay block mb-3">בקצרה</span>
            <p className="text-primary text-lg md:text-xl leading-[1.75] font-body">
              {article.excerpt}
            </p>
          </div>

          {/* Series Navigation Card */}
          {isSeries && (
            <div className="mb-16 border-y border-hairline py-8">
              <span className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-secondary">
                {article.category === "construction" ? "סדרת שיטות בנייה בישראל" : "סדרת חדר אחר חדר: הבית שעובד בשבילכם"}
              </span>
              <h3 className="font-headline font-black text-xl text-primary mt-2 mb-6">
                מאמר {currentIndex + 1} מתוך {totalInSeries} בסדרה
              </h3>
              <div className="space-y-3">
                <p className="font-headline font-bold text-xs text-secondary mb-4">כל מאמרי הסדרה:</p>
                <ol className="space-y-2 list-decimal list-inside pr-2">
                  {seriesArticles.map((s, idx) => (
                    <li key={s.slug} className="text-sm font-body">
                      {idx === currentIndex ? (
                        <span className="text-primary font-bold">{s.title} <span className="text-xs text-secondary font-normal">(המאמר הנוכחי)</span></span>
                      ) : (
                        <Link href={`/articles/${s.slug}`} className="text-secondary hover:text-primary transition-colors hover:underline">
                          {s.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Article intro — opening paragraphs before the first section */}
          {article.intro?.length ? (
            <div className="mb-12">
              {article.intro.map((p, i) => (
                <p
                  key={i}
                  className="prose-p"
                >
                  {renderParagraphWithLinks(p)}
                </p>
              ))}
            </div>
          ) : null}

          {/* Table of contents */}
          <nav className="mb-16 border-y border-hairline py-7">
            <h2 className="font-label font-medium text-[13px] uppercase tracking-[0.18em] text-ink-mute mb-5">
              תוכן עניינים
            </h2>
            <ol className="space-y-2 list-decimal list-inside">
              {article.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="font-body text-secondary hover:text-clay transition-colors text-base"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
              {article.faq?.length ? (
                <li>
                  <a
                    href="#faq"
                    className="font-body text-secondary hover:text-clay transition-colors text-base"
                  >
                    שאלות נפוצות
                  </a>
                </li>
              ) : null}
            </ol>
          </nav>

          {/* Sections */}
          {article.sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className="mb-16 scroll-mt-28">
              <h2 className="font-headline font-black text-2xl md:text-[2rem] text-primary mb-6 leading-[1.15] tracking-tight">
                {section.heading}
              </h2>
              {section.body.map((p, pi) => (
                <p
                  key={pi}
                  className="prose-p"
                >
                  {renderParagraphWithLinks(p)}
                </p>
              ))}
              {section.list && (
                <ul className="mt-5 space-y-3 ps-1">
                  {section.list.map((item, li) => (
                    <li
                      key={li}
                      className="flex items-start gap-3.5 prose-p !mb-0"
                    >
                      <span className="mt-3 w-1.5 h-1.5 rounded-full bg-clay flex-shrink-0" />
                      {renderParagraphWithLinks(item)}
                    </li>
                  ))}
                </ul>
              )}
              {section.subsections?.map((sub, si) => (
                <div key={si} className="mt-8">
                  <h3 className="font-headline font-bold text-lg md:text-xl text-primary mb-3 leading-snug">
                    {sub.heading}
                  </h3>
                  {sub.body.map((p, pi) => (
                    <p
                      key={pi}
                      className="prose-p"
                    >
                      {renderParagraphWithLinks(p)}
                    </p>
                  ))}
                </div>
              ))}
            </section>
          ))}

          {/* FAQ */}
          {article.faq?.length ? (
            <section id="faq" className="mb-14">
              <h2 className="font-headline font-black text-2xl md:text-3xl text-primary mb-8 leading-tight">
                שאלות נפוצות
              </h2>
              {/* `.faq-item` / `.faq-chevron` / `.faq-answer` were referenced
                  here but never defined in any stylesheet, so these rendered as
                  bare <details> elements: no padding, no separators, a default
                  browser triangle, and a chevron that never turned. Rebuilt on
                  the same ruled-list pattern as the site's other FAQ. */}
              <div className="border-t border-hairline">
                {article.faq.map((item, i) => (
                  <details key={i} className="group border-b border-hairline">
                    <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="font-headline font-bold text-primary text-lg leading-snug transition-colors group-hover:text-clay">
                        {item.question}
                      </span>
                      <ChevronIcon
                        size={20}
                        className="flex-shrink-0 mt-1 text-ink-mute transition-transform duration-500 group-open:rotate-180 group-open:text-clay"
                      />
                    </summary>
                    <div className="pb-7 ps-6 border-s-2 border-clay/50">
                      <p className="prose-p !mb-0">
                        {renderParagraphWithLinks(item.answer)}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {/* Series Next / Previous buttons */}
          {isSeries && (prevArticle || nextArticle) && (
            <div className="mt-16 pt-8 border-t border-outline/10 flex flex-col sm:flex-row justify-between gap-6 text-right">
              {prevArticle ? (
                <Link
                  href={`/articles/${prevArticle.slug}`}
                  className="flex-1 group border border-hairline p-6 hover:border-clay transition-colors duration-500 flex flex-col justify-between"
                >
                  <span className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-ink-mute mb-3 flex items-center gap-2">
                    <ArrowIcon size={14} direction="back" />
                    המאמר הקודם בסדרה
                  </span>
                  <span className="font-headline font-bold text-base text-primary group-hover:text-clay transition-colors line-clamp-2">
                    {prevArticle.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}

              {nextArticle ? (
                <Link
                  href={`/articles/${nextArticle.slug}`}
                  className="flex-1 group border border-hairline p-6 hover:border-clay transition-colors duration-500 flex flex-col justify-between"
                >
                  <span className="font-label font-medium text-[13px] uppercase tracking-[0.14em] text-ink-mute mb-3 flex items-center gap-2">
                    המאמר הבא בסדרה
                    <ArrowIcon size={14} />
                  </span>
                  <span className="font-headline font-bold text-base text-primary group-hover:text-clay transition-colors line-clamp-2">
                    {nextArticle.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 border-y border-hairline py-10">
            <span className="rule-draw block h-px w-12 bg-clay mb-6" />
            <h3 className="font-headline font-black text-2xl text-primary">
              רוצים לשוחח על הפרויקט שלכם?
            </h3>
            <p className="prose-p mt-4">
              פגישת ייעוץ ראשונה — ללא עלות וללא התחייבות. נשמח להכיר ולהתחיל
              לחשוב יחד.
            </p>
            <div className="mt-7">
              <ButtonLink href="/contact">לפגישת ייעוץ</ButtonLink>
            </div>
          </div>

          <ArticleAuthorBox updatedAt={article.updatedAt} />
        </div>
      </article>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <Section tone="sand">
          <div>
            <SectionHeading eyebrow="Related Articles" title="מאמרים נוספים" className="mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                    <Image
                      src={related.heroImage}
                      alt={related.heroAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover img-grayscale"
                    />
                  </div>
                  <div className="pt-5 mt-5 border-t border-hairline">
                    <h3 className="font-headline font-bold text-lg text-primary leading-snug group-hover:text-clay transition-colors">
                      {related.title}
                    </h3>
                    <p className="font-body text-base text-secondary mt-3 leading-relaxed line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 font-headline font-bold text-[13px] text-primary group-hover:text-clay transition-colors">
                      <span className="link-quiet">לקריאה</span>
                      <ArrowIcon size={16} className="transition-transform duration-500 group-hover:-translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
