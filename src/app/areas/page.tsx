import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceAreasMap from "@/components/ServiceAreasMap";
import { areas } from "@/data/areasContent";
import { ArrowIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "אדריכלים בצפון: כל אזורי השירות | טל גורן אדריכלית",
  description:
    "מחפשים אדריכל בצפון? טל גורן אדריכלית מלווה משפחות בתכנון ועיצוב בתים פרטיים בזכרון יעקב, חוף הכרמל, פרדס חנה-כרכור, בנימינה-גבעת עדה, קיסריה, חדרה ועוד. מפת אזורי השירות והעמודים לכל אזור.",
  alternates: { canonical: "/areas" },
  openGraph: { url: "/areas" },
};

const breadcrumbJsonLd = {
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
      item: { "@id": "https://talgoren.co.il/areas", name: "אזורי שירות" },
    },
  ],
};

export default function ServiceAreasIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto text-right">
          <Breadcrumb items={[{ label: "ראשי", to: "/" }, { label: "אזורי שירות" }]} />
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
            אזורי שירות
          </h1>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-3xl mt-8">
            מחפשים אדריכל בצפון? משרד האדריכלות של טל גורן ממוקם בגבעת עדה, ומלווה משפחות בתכנון, רישוי
            ובניית בתים פרטיים ברחבי חיפה, חוף הכרמל, מנשה והשרון. בחרו את האזור שלכם במפה או מהרשימה למטה.
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10 mr-0 ml-auto"></div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 px-8 bg-surface">
        <ServiceAreasMap />
      </section>

      {/* Areas grid */}
      <section className="py-20 md:py-28 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-right">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">Service Areas</span>
            <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight text-primary mt-4">
              כל אזורי השירות
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group card-hover block bg-surface p-8 text-right border border-outline/10"
              >
                <div className="flex items-center justify-end gap-3 mb-3">
                  <h3 className="font-headline font-bold text-xl text-primary leading-tight group-hover:text-secondary transition-colors">
                    {area.h1}
                  </h3>
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: area.color }} />
                </div>
                <p className="text-secondary text-sm leading-relaxed line-clamp-3">{area.intro}</p>
                <div className="inline-flex items-center gap-2 font-headline font-bold text-xs text-primary group-hover:text-secondary transition-colors mt-6">
                  לעמוד האזור
                  <ArrowIcon size={16} className="group-hover:-translate-x-1 transition-transform duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-surface">
        <div className="max-w-5xl mx-auto p-12 bg-surface-container text-right border border-outline/10">
          <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight leading-tight text-primary mb-6">
            לא מצאתם את האזור שלכם?
          </h2>
          <p className="text-lg text-secondary mb-10 max-w-2xl leading-relaxed">
            אני עובדת ברחבי הצפון והשרון, וגם בפרויקטים מעניינים באזורים נוספים. פגישת ייעוץ ראשונה ללא
            עלות וללא התחייבות — נכיר ונבין איך אפשר לעזור.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 font-headline font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            לקביעת פגישת ייעוץ
            <ArrowIcon size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
