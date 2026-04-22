/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InteractiveProjectsMap from '@/components/InteractiveProjectsMap';
import { siteData } from '@/data/siteData';

const categories = [
  {
    href: '/projects/completed',
    title: 'בתים מאוכלסים',
    description: 'בתים גמורים שתוכננו ונבנו — צילומי הפרויקטים המאוכלסים שלנו.',
    icon: 'home',
    image: siteData.projects[0]?.image,
  },
  {
    href: '/projects/in-design',
    title: 'בתים בתכנון',
    description: 'הצצה לפרויקטים בשלבי תכנון — הדמיות אדריכליות של הבתים שייבנו בקרוב.',
    icon: 'architecture',
    image: siteData.projects[2]?.image,
  },
];

export default function Projects() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-8 lg:px-12 max-w-[1920px] mx-auto">
        <div>
          <Breadcrumb current="פרויקטים" />
          <h1 className="font-headline font-black text-4xl md:text-6xl lg:text-7xl text-primary leading-tight mb-4">פרויקטים</h1>
          <p className="font-body text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">למעלה מ-100 בתים פרטיים שתוכננו ונבנו באזור השרון הצפוני.<span className="hidden md:inline"> לחצו על אזור במפה לצפייה בפרויקטים.</span></p>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="hidden md:block px-8 lg:px-12 py-20 max-w-[1920px] mx-auto">
        <InteractiveProjectsMap />
      </section>

      {/* Category Cards */}
      <section className="px-8 lg:px-12 pb-24 max-w-[1920px] mx-auto">
        <h2 className="font-headline font-bold text-2xl text-primary mb-8">קטגוריות</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group block relative overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                {page.image ? (
                  <img
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 img-grayscale"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-secondary/30">{page.icon}</span>
                  </div>
                )}
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">arrow_back</span>
              </div>

              {/* Title bar */}
              <div className="bg-primary px-6 py-5">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{page.icon}</span>
                  <div>
                    <h3 className="font-headline font-bold text-base text-white">{page.title}</h3>
                    <p className="font-label text-white/60 text-xs mt-1 leading-relaxed">{page.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="blueprint-grid bg-surface-container-low">
        <div className="px-8 lg:px-12 py-24 md:py-32 max-w-[1920px] mx-auto text-center">
          <h2 className="font-headline font-black text-3xl md:text-5xl text-primary mb-6">יש לכם פרויקט?</h2>
          <p className="font-body text-secondary text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">בואו נדבר על הבית שאתם חולמים עליו. נשמח להכיר, להקשיב ולהתחיל לתכנן יחד.</p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
            <span>בואו נדבר</span>
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
        </div>
      </section>
    </>
  );
}
