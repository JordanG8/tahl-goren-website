/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, projectsBySlug, type ProjectDetail } from "@/data/projectsContent";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectsBySlug[slug];
  if (!project) return {};
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      type: "article",
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

function ProjectJsonLd({ project }: { project: ProjectDetail }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalProject",
    name: project.title,
    description: project.metaDescription,
    image: project.image,
    locationCreated: {
      "@type": "Place",
      name: project.location,
      address: { "@type": "PostalAddress", addressLocality: project.location, addressCountry: "IL" },
    },
    creator: {
      "@type": "Person",
      name: "טל גורן",
      jobTitle: "אדריכלית",
      url: "https://talgoren.co.il/about",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({ project }: { project: ProjectDetail }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ראשי", item: "https://talgoren.co.il/" },
      { "@type": "ListItem", position: 2, name: "פרויקטים", item: "https://talgoren.co.il/projects" },
      { "@type": "ListItem", position: 3, name: "בתים מאוכלסים", item: "https://talgoren.co.il/projects/completed" },
      { "@type": "ListItem", position: 4, name: project.title, item: `https://talgoren.co.il/projects/${project.slug}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProjectPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const project = projectsBySlug[slug];
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const relatedProjects = projects
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.location === project.location ? 0 : 1;
      const bMatch = b.location === project.location ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 3);

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <ProjectJsonLd project={project} />
      <BreadcrumbJsonLd project={project} />

      {/* Hero */}
      <section className="relative">
        <div className="aspect-[3/2] sm:aspect-[21/9] max-h-[560px] w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1920px] mx-auto w-full px-8 lg:px-12 pb-12 text-right">
            <Breadcrumb
              items={[
                { label: "ראשי", to: "/" },
                { label: "פרויקטים", to: "/projects" },
                { label: "בתים מאוכלסים", to: "/projects/completed" },
                { label: project.title },
              ]}
              light
            />
            <h1 className="font-headline font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white max-w-3xl mt-4">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 mt-4 font-label text-xs text-white/60 flex-row-reverse">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {project.location}
              </span>
              {project.area !== "לא צוין" && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">straighten</span>
                    {project.area}
                  </span>
                </>
              )}
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">layers</span>
                {project.floors}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-8" dir="rtl">
        <div className="max-w-4xl mx-auto">
          {/* Quick facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-surface-container p-6 text-center">
              <span className="material-symbols-outlined text-2xl text-secondary mb-2 block">location_on</span>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block mb-1">מיקום</span>
              <span className="font-headline font-bold text-sm text-primary">{project.location}</span>
            </div>
            <div className="bg-surface-container p-6 text-center">
              <span className="material-symbols-outlined text-2xl text-secondary mb-2 block">straighten</span>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block mb-1">שטח</span>
              <span className="font-headline font-bold text-sm text-primary">{project.area}</span>
            </div>
            <div className="bg-surface-container p-6 text-center">
              <span className="material-symbols-outlined text-2xl text-secondary mb-2 block">layers</span>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block mb-1">קומות</span>
              <span className="font-headline font-bold text-sm text-primary">{project.floors}</span>
            </div>
            <div className="bg-surface-container p-6 text-center">
              <span className="material-symbols-outlined text-2xl text-secondary mb-2 block">palette</span>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block mb-1">סגנון</span>
              <span className="font-headline font-bold text-sm text-primary">{project.style}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-16">
            <h2 className="font-headline font-black text-2xl md:text-3xl text-primary mb-6">אודות הפרויקט</h2>
            <p className="text-secondary text-lg md:text-xl leading-relaxed font-body">
              {project.fullDescription}
            </p>
          </div>

          {/* Features */}
          {project.features.length > 0 && (
            <div className="mb-16">
              <h2 className="font-headline font-black text-2xl md:text-3xl text-primary mb-6">מאפיינים עיקריים</h2>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary text-base md:text-lg leading-relaxed font-body">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5 flex-shrink-0">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="p-8 md:p-12 bg-surface-container-low text-right">
            <h3 className="font-headline font-black text-xl md:text-2xl text-primary mb-4">
              רוצים בית שמותאם בדיוק אליכם?
            </h3>
            <p className="text-secondary text-base leading-relaxed mb-6 font-body">
              כל בית שאני מתכננת הוא ייחודי – כי הוא משקף את הסיפור, הטעם והאופי של המשפחה. פגישת ייעוץ ראשונה ללא עלות.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-headline font-bold text-sm hover:bg-secondary transition-colors"
            >
              לפגישת ייעוץ
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </Link>
          </div>

          {/* Prev/Next navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-outline/20">
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                <div className="text-right">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block">הפרויקט הבא</span>
                  <span className="line-clamp-1">{nextProject.title}</span>
                </div>
              </Link>
            ) : <div />}
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors text-left"
              >
                <div className="text-left">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block">הפרויקט הקודם</span>
                  <span className="line-clamp-1">{prevProject.title}</span>
                </div>
                <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 md:py-24 px-8 bg-surface-container-low">
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 text-right">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
              More Projects
            </span>
            <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary mt-4">
              פרויקטים נוספים
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((related) => (
              <Link
                key={related.slug}
                href={`/projects/${related.slug}`}
                className="group card-hover block relative overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover img-grayscale"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-primary px-4 py-3 flex justify-between items-center">
                  <div className="flex flex-col text-right">
                    <h3 className="font-headline font-light text-[10px] sm:text-[11px] text-white uppercase tracking-[0.15em] leading-tight">{related.title}</h3>
                    <span className="font-label text-white/50 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] mt-0.5">{related.location}</span>
                  </div>
                  <span className="material-symbols-outlined text-white text-sm translate-x-0 group-hover:-translate-x-1 transition-transform duration-300">arrow_back</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
