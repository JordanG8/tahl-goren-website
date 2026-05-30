/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { areas, areasBySlug } from "@/data/areasContent";
import { projects } from "@/data/projectsContent";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = areasBySlug[slug];
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `/areas/${area.slug}`,
    },
  };
}

// Pick projects in/near the area, then top up to 3 with other completed work.
function featuredProjects(locations: string[]) {
  const matched = projects.filter((p) =>
    locations.some((loc) => p.location.includes(loc))
  );
  const rest = projects.filter((p) => !matched.includes(p));
  return [...matched, ...rest].slice(0, 3);
}

const selectionCriteria = (cityWithPrep: string) => [
  "ניסיון מוכח — שנות ותק ומספר פרויקטים שהושלמו בהצלחה.",
  "מוניטין והמלצות — חוות דעת של לקוחות קודמים על התהליך והתוצאה.",
  "תיק עבודות — עיינו בפרויקטים קודמים ובדקו אם הסגנון מדבר אליכם.",
  "פגישת היכרות — כימיה אישית ותקשורת טובה הן קריטיות לאורך הפרויקט.",
  "ליווי מלא — אדריכל שמלווה אתכם מהתכנון והרישוי ועד גמר הביצוע.",
  `היכרות עם האזור — הבנה של הוועדה המקומית ושל תנאי הבנייה ${cityWithPrep}.`,
];

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = areasBySlug[slug];
  if (!area) notFound();

  const featured = featuredProjects(area.projectLocations);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "תכנון אדריכלי ועיצוב פנים לבית פרטי",
    name: area.h1,
    description: area.metaDescription,
    areaServed: { "@type": "Place", name: area.city },
    provider: {
      "@type": "ProfessionalService",
      name: "טל גורן אדריכלית",
      telephone: "+972-52-8345799",
      url: "https://talgoren.co.il",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="py-16 px-8 bg-surface">
        <div className="max-w-6xl mx-auto text-right">
          <Breadcrumb items={[{ label: "ראשי", to: "/" }, { label: "אזורי שירות" }, { label: area.city }]} />
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
            {area.h1}
          </h1>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-3xl mt-8">
            {area.intro}
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10 mr-0 ml-auto"></div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28 px-8 bg-surface-container-low">
        <div className="max-w-3xl mx-auto text-right space-y-14">
          <div>
            <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary mb-5">
              תכנון ובנייה {area.cityWithPrep}
            </h2>
            <p className="text-secondary text-lg leading-relaxed">{area.localContext}</p>
          </div>

          <div>
            <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary mb-5">
              מה תפקידו של אדריכל?
            </h2>
            <p className="text-secondary text-lg leading-relaxed">
              אדריכל הוא איש המקצוע שמלווה אתכם מהרעיון ועד הבית הבנוי. תפקידו אינו מסתכם ב&quot;ציור
              תוכניות&quot; — הוא אחראי על תכנון פונקציונלי ואסתטי של הבית, על התאמתו לצרכים שלכם ולמגרש,
              על עמידה בתקנות ובדרישות הרישוי ועל ליווי הביצוע מול הקבלן והיועצים. אדריכל טוב חוסך לכם כסף,
              זמן וטעויות — ומבטיח שהבית שתקבלו יהיה בדיוק הבית שחלמתם עליו.
            </p>
          </div>

          <div>
            <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary mb-5">
              החשיבות בעבודה עם אדריכל בעל ניסיון ומוניטין
            </h2>
            <p className="text-secondary text-lg leading-relaxed">
              בנייה או שיפוץ של בית הם פרויקט מורכב ויקר, שמלווה אתכם לשנים רבות. עבודה עם אדריכל בעל ניסיון
              ומוניטין {area.cityWithPrep} מבטיחה שהפרויקט יתוכנן נכון מההתחלה — תכנון שמונע טעויות יקרות,
              מנצל את המגרש בצורה מיטבית ועומד בלוחות הזמנים ובתקציב. הניסיון בא לידי ביטוי בכל שלב: מהבנת
              הצרכים שלכם, דרך ההתמודדות עם אתגרי המגרש והרישוי, ועד הפיקוח על הביצוע.
            </p>
          </div>

          <div>
            <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary mb-5">
              איך לבחור אדריכל {area.cityWithPrep}?
            </h2>
            <p className="text-secondary text-lg leading-relaxed mb-6">
              בחירת האדריכל הנכון היא ההחלטה החשובה ביותר בתחילת הדרך. הנה כמה דברים שכדאי לבדוק:
            </p>
            <ul className="space-y-3">
              {selectionCriteria(area.cityWithPrep).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-secondary text-lg leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xl mt-1 shrink-0">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary mb-5">
              אמרתם אדריכל {area.city} – אמרתם טל גורן
            </h2>
            <p className="text-secondary text-lg leading-relaxed">
              משרד האדריכלות של טל גורן ממוקם במושבה גבעת עדה, ומלווה משפחות בתכנון, רישוי ובניית בתים פרטיים
              בכל אזור {area.region}. עם ניסיון של למעלה מ-25 שנה ומאות פרויקטים, אני מאמינה בליווי אישי וצמוד —
              בית שמתוכנן סביב המשפחה שגרה בו, ותהליך בנייה רגוע ושקוף מהרעיון הראשון ועד המפתח.
            </p>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="py-24 px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-right">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">Projects</span>
              <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight text-primary mt-4">
                פרויקטים נבחרים
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featured.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group card-hover block bg-surface-container-low overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover img-grayscale" />
                  </div>
                  <div className="p-8 text-right">
                    <h3 className="font-headline font-bold text-xl text-primary leading-tight group-hover:text-secondary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-secondary text-sm mt-2">{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-8 bg-surface-container-low">
        <div className="max-w-5xl mx-auto p-12 bg-surface-container text-right border border-outline/10">
          <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight leading-tight text-primary mb-6">
            רוצים להתחיל לתכנן את הבית שלכם {area.cityWithPrep}?
          </h2>
          <p className="text-lg text-secondary mb-10 max-w-2xl leading-relaxed">
            פגישת ייעוץ ראשונה ללא עלות וללא התחייבות. נכיר, נבין מה אתם צריכים, ואלווה אתכם בבחירת המסלול
            הנכון לפרויקט שלכם.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 font-headline font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            לקביעת פגישת ייעוץ
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
        </div>
      </section>
    </>
  );
}
