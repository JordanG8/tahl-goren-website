import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { siteData } from '@/data/siteData';

export default function ProjectsMap() {
  const locations = [...new Set(siteData.projects.map(p => p.location))];

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-8 lg:px-12 max-w-[1920px] mx-auto">
        <div>
          <Breadcrumb items={[
            { label: 'ראשי', to: '/' },
            { label: 'פרויקטים', to: '/projects' },
            { label: 'מפת הפרויקטים' },
          ]} />
          <h1 className="font-headline font-black text-4xl md:text-6xl lg:text-7xl text-primary leading-tight mb-4">מפת הפרויקטים</h1>
          <p className="font-body text-secondary text-lg md:text-xl max-w-2xl leading-relaxed">כל הפרויקטים שתכננו לאורך השנים — מנתניה ועד חיפה ומעבר לכך.</p>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-8 lg:px-12 pb-12 max-w-[1920px] mx-auto">
        <div className="aspect-[16/9] md:aspect-[21/9] bg-surface-container-low overflow-hidden">
          <iframe
            title="מפת הפרויקטים של טל גורן אדריכלות"
            src="https://maps.google.com/maps?q=%D7%92%D7%91%D7%A2%D7%AA+%D7%A2%D7%93%D7%94&t=&z=10&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Locations Legend */}
      <section className="px-8 lg:px-12 pb-24 max-w-[1920px] mx-auto">
        <div className="bg-surface-container-low p-8 md:p-12">
          <h3 className="font-headline font-bold text-xl text-primary mb-6">אזורי פעילות</h3>
          <div className="flex flex-wrap gap-4">
            {locations.map((loc) => {
              const count = siteData.projects.filter(p => p.location === loc).length;
              return (
                <div key={loc} className="flex items-center gap-2 bg-surface px-4 py-2">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                  <span className="font-label text-sm text-primary">{loc}</span>
                  <span className="font-label text-xs text-secondary">({count})</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="blueprint-grid bg-surface-container-low">
        <div className="px-8 lg:px-12 py-24 md:py-32 max-w-[1920px] mx-auto text-center">
          <h2 className="font-headline font-black text-3xl md:text-5xl text-primary mb-6">הבית הבא על המפה יכול להיות שלכם</h2>
          <p className="font-body text-secondary text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">בואו נדבר על הפרויקט שלכם ונוסיף אותו למפה.</p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity">
            <span>בואו נדבר</span>
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
        </div>
      </section>
    </>
  );
}
