"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import ArchFrame from '@/components/ArchFrame';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import HomeCtaForm from '@/components/HomeCtaForm';
import FaqAccordion from '@/components/FaqAccordion';
import { aboutExcerpt } from '@/data/siteData';
import { packages as homePackages } from '@/data/packagesContent';
import { trackLead } from '@/lib/trackLead';


const heroVideos = ['/videos/hero-1.mp4', '/videos/hero-2.mp4', '/videos/hero-3.mp4'];

const HERO_LOGO_ID = 'site-logo-hero';
const NAV_LOGO_ID = 'site-logo-navbar';
const DOCK_SCROLL_THRESHOLD = 20;

type LogoRect = { top: number; left: number; width: number; height: number };

function readRect(el: Element | null): LogoRect | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

// The navbar's own logo shrinks (h-12/h-16 -> h-9/h-10) via a separate
// component's scroll listener, which commits a frame or two after ours.
// Poll until that class swap has actually landed before trusting its rect,
// instead of guessing a fixed delay (which would read a stale size and
// make the clone "jump-correct" partway through the flight).
function waitForDockedNavRect(onReady: (rect: LogoRect | null) => void, attempt = 0) {
  const el = document.getElementById(NAV_LOGO_ID);
  const isDockedSize = !!el && (el.className.includes('h-9') || el.className.includes('h-10'));
  if (isDockedSize || attempt > 15) {
    onReady(readRect(el));
    return;
  }
  requestAnimationFrame(() => waitForDockedNavRect(onReady, attempt + 1));
}

const featuredArticles = [
  { slug: "building-cost-total", title: "כמה תעלה לנו הבניה בסך הכל?", image: "/images/blog/building-cost-total.png", excerpt: "חוששים להיכנס ל'בור' של הוצאות בלתי נגמרות? המדריך המלא להכנת תקציב ריאלי לבניית בית פרטי בישראל." },
  { slug: "choose-architect", title: "איך בוחרים אדריכלית לבניית בית פרטי?", image: "/images/blog/choose-architect.png", excerpt: "המדריך המלא לבחירת האדריכלית שתוביל את הפרויקט הכי חשוב בחיים שלכם." },
  { slug: "building-timeline", title: "כמה זמן יקח לנו לתכנן ולבנות בית פרטי?", image: "/images/blog/building-timeline.png", excerpt: "מה שחשוב לדעת לפני שיוצאים לדרך – שלב אחרי שלב, עם לוחות זמנים ריאליים וכל הגורמים שמשפיעים עליהם." },
];

type Props = {
  projects: any[];
  faqItems: any[];
};

export default function HomePage({ projects }: Props) {
  const featuredProjects = projects.slice(0, 6);

  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % heroVideos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.play().catch(() => {});
    });
  }, []);

  useEffect(() => {
    const nextIndex = (activeVideo + 1) % heroVideos.length;
    const nextVideo = videoRefs.current[nextIndex];
    if (nextVideo && nextVideo.preload === 'none') {
      nextVideo.preload = 'auto';
      nextVideo.load();
    }
  }, [activeVideo]);

  // Logo dock: the monochrome hero logo "flies" up into the navbar's logo
  // slot and turns to full color the moment the user scrolls past the hero.
  const [docked, setDocked] = useState(false);
  const [heroRect, setHeroRect] = useState<LogoRect | null>(null);
  const [navRect, setNavRect] = useState<LogoRect | null>(null);
  const [transitionsReady, setTransitionsReady] = useState(false);
  const dockedRef = useRef(false);

  useEffect(() => {
    // Measuring a DOM rect right after mount (to seed the fixed clone's
    // starting position) has to happen in an effect: it needs the real
    // client-rendered layout, which doesn't exist during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeroRect(readRect(document.getElementById(HERO_LOGO_ID)));

    const initialDocked = window.scrollY > DOCK_SCROLL_THRESHOLD;
    dockedRef.current = initialDocked;
    setDocked(initialDocked);
    if (initialDocked) {
      waitForDockedNavRect(setNavRect);
    }

    // Skip the initial mount transition so the logo doesn't animate in from
    // nowhere on first paint — only actual scroll crossings should animate.
    const readyFrame = requestAnimationFrame(() => setTransitionsReady(true));

    const handleScroll = () => {
      const nowDocked = window.scrollY > DOCK_SCROLL_THRESHOLD;
      if (nowDocked !== dockedRef.current) {
        dockedRef.current = nowDocked;
        setDocked(nowDocked);
        if (nowDocked) {
          waitForDockedNavRect(setNavRect);
        } else {
          setHeroRect(readRect(document.getElementById(HERO_LOGO_ID)));
        }
      }
    };
    const handleResize = () => {
      if (!dockedRef.current) {
        setHeroRect(readRect(document.getElementById(HERO_LOGO_ID)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(readyFrame);
    };
  }, []);

  const activeLogoRect = docked ? navRect ?? heroRect : heroRect ?? navRect;

  return (
    <>
      {/* Flying logo clone: docks white-in-hero -> colored-in-navbar on scroll */}
      {activeLogoRect && (
        <div
          id="hero-logo-clone"
          aria-hidden
          className="fixed z-[60] pointer-events-none top-0 left-0"
          style={{
            width: activeLogoRect.width,
            height: activeLogoRect.height,
            transform: `translate3d(${activeLogoRect.left}px, ${activeLogoRect.top}px, 0)`,
            filter: docked ? 'none' : 'brightness(0) invert(1)',
            transition: transitionsReady
              ? 'transform 480ms cubic-bezier(0.16,1,0.3,1), width 480ms cubic-bezier(0.16,1,0.3,1), height 480ms cubic-bezier(0.16,1,0.3,1), filter 320ms ease 80ms'
              : 'none',
          }}
        >
          <Image
            src="/images/logo-v2.png"
            alt=""
            width={280}
            height={94}
            className="w-full h-full object-contain drop-shadow-lg"
            priority
          />
        </div>
      )}

      {/* 1. HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden -mt-20 sm:-mt-24">
        {heroVideos.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={src}
            muted
            loop
            playsInline
            autoPlay
            preload={i === 0 ? 'auto' : 'none'}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: activeVideo === i ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="sr-only">טל גורן אדריכלות</h1>
          <div className="w-[240px] sm:w-[320px] lg:w-[420px]">
            <Image
              id={HERO_LOGO_ID}
              src="/images/logo-v2.png"
              alt=""
              width={280}
              height={94}
              className="w-full h-auto object-contain opacity-0"
              priority
            />
          </div>
          <p className="mt-4 font-headline font-bold text-white/90 text-lg sm:text-xl lg:text-2xl tracking-wide drop-shadow-md max-w-2xl">ליווי מקצועי ואישי לחווית בניה רגועה</p>
          <p className="mt-2 font-body text-white/70 text-base sm:text-lg lg:text-xl drop-shadow-md max-w-xl">תכנון אדריכלי חכם לבית שגדל עם המשפחה</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/projects" className="bg-white text-black px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-white/80 transition-colors">לפרויקטים</Link>
            <Link href="/contact" className="border-2 border-white text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">שיחת ייעוץ</Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="font-label text-[10px] tracking-[0.3em] uppercase">גלילה</span>
          <div className="w-px h-8 bg-white/30" />
        </div>
        <div className="absolute bottom-8 right-8 flex gap-2">
          {heroVideos.map((_, i) => (
            <button key={i} onClick={() => setActiveVideo(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${activeVideo === i ? 'bg-white w-6' : 'bg-white/40'}`} />
          ))}
        </div>
      </section>

      {/* 2. ABOUT */}
      <section className="py-24 lg:py-32 bg-surface-container-low overflow-hidden -mt-1">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="flex justify-center lg:justify-start">
              <ArchFrame className="w-full max-w-xs sm:max-w-sm">
                <div className="aspect-[3/4] relative">
                  <Image src="/images/tahl-portrait.jpg" alt="טל גורן אדריכלית" fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover object-top img-grayscale" />
                </div>
              </ArchFrame>
            </div>
            <div className="space-y-8">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">אודות</span>
              <h2 className="font-headline font-black text-5xl lg:text-6xl xl:text-7xl text-primary tracking-tight leading-[0.88]">נעים<br />מאוד,<br />אני טל.</h2>
              <p className="font-body text-lg text-secondary leading-relaxed max-w-md">{aboutExcerpt}</p>
              <div className="flex gap-10 py-8 border-y border-outline/10">
                <div><span className="font-headline font-black text-4xl text-primary block">25+</span><span className="font-label text-[10px] text-secondary uppercase tracking-widest">שנות ניסיון</span></div>
                <div><span className="font-headline font-black text-4xl text-primary block">100+</span><span className="font-label text-[10px] text-secondary uppercase tracking-widest">בתים שתוכננו</span></div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['מורשית היתר', 'בוגרת הטכניון', 'אדריכלות ועיצוב פנים'].map((b) => (
                  <span key={b} className="font-label text-[10px] uppercase tracking-[0.15em] text-secondary border border-outline/30 px-3 py-1.5">{b}</span>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
                <span>קראו עוד עליי</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FORM CTA — TOP */}
      <HomeCtaForm
        eyebrow="כמה מילים עליי"
        heading="מתכננים לבנות את הבית הבא שלכם?"
        placement="home_cta_top"
      />

      {/* LEAD MAGNET — free plot checklist */}
      <section className="py-16 md:py-20 bg-surface -mt-1 border-y border-outline/10">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-right">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl">checklist</span>
            </div>
            <div className="flex-1">
              <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">מתנה ממני</span>
              <h2 className="font-headline font-black text-2xl sm:text-3xl text-primary tracking-tight mt-2">צ&apos;ק-ליסט חינמי: מה בודקים במגרש לפני שבונים</h2>
              <p className="font-body text-secondary mt-2 max-w-xl">12 נקודות מפתח שיחסכו לכם טעויות יקרות — עוד לפני שקבעתם פגישת ייעוץ.</p>
            </div>
            <Link href="/resources/plot-checklist" className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-white px-8 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-secondary transition-colors">
              לצ&apos;ק-ליסט החינמי
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS — Google Reviews */}
      <section className="py-12 md:py-24 lg:py-32 bg-surface-container-low -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="text-center mb-16 space-y-4 flex flex-col items-center">
            <a href="https://maps.app.goo.gl/6hAN8p1iuDtFnb77A" target="_blank" rel="noreferrer" className="inline-block hover:-translate-y-1 transition-transform drop-shadow hover:drop-shadow-md mb-2">
              <Image src="/images/google-maps-logo.svg" alt="Google Maps Reviews" width={56} height={56} className="w-14 h-14" />
            </a>
            <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">המלצות לקוחות</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">מה אומרים עלינו</h2>
            <Link href="/testimonials" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group mt-2">
              <span>כל ההמלצות</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>
          <ReviewsCarousel />
        </div>
      </section>

      {/* 3. PROJECTS */}
      <section className="py-24 lg:py-32 -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="mb-16 text-center">
            <div className="space-y-4">
              <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">פרויקטים נבחרים</span>
              <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">מהעשייה שלנו</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.slice(0, 3).map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/* 4th Project Placeholder - Blurred out */}
            {projects.length > 3 && (
              <div className="relative group overflow-hidden rounded-2xl h-full shadow-lg border border-gray-100">
                {/* The actual project card underneath */}
                <div className="h-full select-none pointer-events-none">
                  <ProjectCard project={projects[3]} />
                </div>
                {/* Obscuring Overlay */}
                <div className="absolute inset-x-0 bottom-0 top-1/4 bg-gradient-to-t from-surface via-surface/95 to-transparent backdrop-blur-[3px] flex flex-col items-center justify-center pt-20 pb-8">
                  <Link href="/projects/completed" className="bg-primary text-white px-8 py-4 font-headline font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl hover:-translate-y-1 rounded-full flex items-center gap-3 pointer-events-auto">
                    <span>לכל הפרויקטים</span>
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3.5 PACKAGES / PRICING */}
      <section className="py-24 lg:py-32 bg-surface-container -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="mb-16 text-center space-y-4">
            <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">מסלולי ליווי</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">איזה מסלול מתאים לכם?</h2>
            <p className="font-body text-lg text-secondary max-w-2xl mx-auto">שלושה מסלולי ליווי אדריכלי, שקופים ומוגדרים מראש — כדי שתדעו בדיוק מה כלול ותוכלו לבחור את המסלול שמתאים לתקציב ולצרכים שלכם.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {homePackages.map((pkg) => (
              <Link
                key={pkg.id}
                href="/packages"
                className={`group flex flex-col text-right border transition-all duration-300 hover:-translate-y-1 ${
                  pkg.recommended ? "border-accent shadow-xl md:-translate-y-3" : "border-outline/10 bg-surface"
                }`}
              >
                <div className={`px-6 pt-6 pb-4 ${pkg.recommended ? "bg-accent text-white" : "bg-primary text-white"}`}>
                  {pkg.recommended && (
                    <span className="inline-block bg-white/20 font-label text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 mb-2">
                      הבחירה המומלצת
                    </span>
                  )}
                  <h3 className="font-headline font-black text-lg leading-tight">{pkg.name}</h3>
                </div>
                <div className="px-6 py-5 bg-surface flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-headline font-black text-3xl text-primary">{pkg.price.toLocaleString("he-IL")} ₪</span>
                    <p className="font-body text-xs text-secondary mt-3 leading-relaxed">{pkg.subtitle}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 font-headline font-bold text-xs text-primary group-hover:text-secondary transition-colors mt-6">
                    <span>לפרטים המלאים</span>
                    <span className="material-symbols-outlined text-base group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BUTTON */}
      <section className="py-24 bg-surface relative overflow-hidden -mt-1 text-center border-y border-outline/10">
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <h2 className="font-headline font-black text-4xl sm:text-5xl text-primary mb-6">מוכנים לצאת לדרך?</h2>
          <p className="font-body text-xl text-secondary mb-10">הצעד הראשון לבית החלומות שלכם מתחיל בשיחה.</p>
          <div className="relative inline-block w-fit">
            {/* Right Arrow (Physical Right) */}
            <div className="absolute -right-16 top-0 bottom-0 items-center justify-center hidden md:flex">
              <div className="animate-bounce">
                <span className="material-symbols-outlined text-5xl text-primary rotate-180 block">arrow_right_alt</span>
              </div>
            </div>
            {/* Left Arrow (Physical Left) */}
            <div className="absolute -left-16 top-0 bottom-0 items-center justify-center hidden md:flex">
              <div className="animate-bounce">
                <span className="material-symbols-outlined text-5xl text-primary block">arrow_right_alt</span>
              </div>
            </div>

            {/* Glowing Border Wrapper */}
            <div className="relative inline-flex overflow-hidden p-[2px] transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#d4af37_50%,transparent_100%)]" />
              <Link href="/contact" className="relative inline-flex items-center justify-center h-full w-full bg-primary text-white px-12 py-5 font-headline font-black text-lg uppercase tracking-widest transition-colors hover:bg-primary/95">
                לקביעת פגישת ייעוץ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ (accordion with full-article links) */}
      <section className="py-24 lg:py-32 -mt-1">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16 space-y-4">
            <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">שאלות נפוצות</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">שאלות ותשובות</h2>
            <p className="font-body text-lg text-secondary max-w-2xl mx-auto">ריכזנו עבורכם את השאלות הנפוצות ביותר שלקוחות שואלים לפני ובמהלך תהליך הבנייה והתכנון האדריכלי. לחצו על שאלה לתשובה מלאה.</p>
          </div>

          <FaqAccordion limit={6} />

          <div className="mt-14 flex flex-col items-center gap-5">
            <Link
              href="/articles"
              className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-secondary transition-colors"
            >
              לכל המאמרים
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 font-headline font-bold text-xs text-secondary hover:text-primary transition-colors"
            >
              לכל השאלות הנפוצות
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FORM CTA — MID */}
      <HomeCtaForm
        eyebrow="יש עוד שאלה?"
        heading="נשמח לענות ולעזור לכם להתקדם"
        placement="home_cta_mid"
      />

      {/* 5. CTA / CONTACT */}
      <section className="py-24 lg:py-32 bg-primary relative overflow-hidden -mt-1">
        <Image
          src="/images/projects/vild-detail.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          quality={80}
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-[1920px] mx-auto px-8 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <span className="font-label text-[10px] tracking-[0.3em] text-white/50 uppercase">בואו נתחיל</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">הבית הבא שלכם<br />מתחיל כאן</h2>
            <p className="font-body text-lg text-white/70 max-w-xl mx-auto leading-relaxed">מוזמנים לפנות אליי לשיחת ייעוץ ראשונית ללא עלות. נשב יחד, נבין את הצרכים שלכם, ונתחיל לתכנן את הבית שתמיד חלמתם עליו.</p>
            <div>
              <Link href="/contact" className="inline-block bg-white text-primary px-12 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">לפגישת ייעוץ</Link>
            </div>
            <div className="flex justify-center gap-8 pt-4">
              <a href="tel:0528345799" onClick={() => trackLead("phone", { placement: "home_hero" })} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-label text-sm">
                <span className="material-symbols-outlined text-lg">call</span>052-8345799
              </a>
              <a href="https://wa.me/972528345799" target="_blank" rel="noreferrer" onClick={() => trackLead("whatsapp", { placement: "home_hero" })} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-label text-sm">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ARTICLES (new section) */}
      <section className="py-24 lg:py-32 bg-surface-container-low -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="mb-16 space-y-4 text-center">
            <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">מאמרים ומדריכים</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">ידע שחוסך לכם כסף</h2>
            <p className="font-body text-lg text-secondary max-w-2xl mx-auto">מאמרים מקצועיים בנושאי תכנון, בנייה ועיצוב — כדי שתגיעו מוכנים לתהליך.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group card-hover block bg-surface overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover img-grayscale"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 text-right">
                  <h3 className="font-headline font-bold text-xl text-primary leading-tight group-hover:text-secondary transition-colors">{article.title}</h3>
                  <p className="text-secondary text-sm mt-3 leading-relaxed line-clamp-2">{article.excerpt}</p>
                  <div className="mt-6 inline-flex items-center gap-2 font-headline font-bold text-xs text-primary group-hover:text-secondary transition-colors">
                    לקריאה
                    <span className="material-symbols-outlined text-base group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/articles" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>לכל המאמרים</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE ME */}
      <section className="py-24 lg:py-32 bg-surface-container -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 relative w-full aspect-[4/3] sm:aspect-auto sm:h-[400px] lg:h-[600px]">
              <Image src="/images/tahl-goren-first-meeting.jpeg" alt="טל גורן אדריכלית בעבודה" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center img-grayscale" />
              <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-primary text-white p-4 sm:p-6 lg:p-8 scale-75 sm:scale-100 origin-bottom-left">
                <span className="font-headline font-black text-5xl sm:text-6xl block leading-none">25+</span>
                <span className="font-label text-xs tracking-widest uppercase mt-2 block text-white/70">שנות ניסיון</span>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">למה לבחור בנו</span>
              <h2 className="font-headline font-black text-4xl sm:text-5xl text-primary tracking-tight leading-tight">ניסיון, מקצועיות<br />ויחס אישי</h2>
              <div className="space-y-10 mt-10">
                {[
                  { icon: 'verified', title: 'מומחיות מוכחת', text: 'למעלה מ-25 שנות ניסיון בתכנון בתים פרטיים, שיפוצים והרחבות. כל פרויקט מקבל את מלוא תשומת הלב והמקצועיות.', fill: true },
                  { icon: 'account_balance_wallet', title: 'שליטה מלאה בתקציב', text: 'אני מכירה את החשש מ"בור" תקציבי ללא תחתית. לכן אני בונה איתכם תקציב ריאלי כבר בפגישה הראשונה, מלווה אתכם צמוד מול הוועדות והיועצים, ודואגת שהחלטות תכנוניות לא יהפכו בהמשך לחריגות ולטעויות יקרות.', fill: false },
                  { icon: 'family_restroom', title: 'ליווי אישי שחוסך לכם כאב ראש', text: 'אני מלווה אתכם לאורך כל הדרך, מהפגישה הראשונה ועד הכניסה הביתה — כולל מול הבירוקרטיה שמלחיצה הכי הרבה. תמיד זמינה, תמיד עם תשובה.', fill: false },
                ].map((v) => (
                  <div key={v.title} className="flex gap-6 items-start">
                    <div className="w-14 h-14 bg-surface-container-low flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl" style={v.fill ? { fontVariationSettings: "'FILL' 1" } : undefined}>{v.icon}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-headline font-bold text-lg text-primary">{v.title}</h3>
                      <p className="font-body text-sm text-secondary leading-relaxed">{v.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM CTA — BOTTOM */}
      <HomeCtaForm
        eyebrow="מוכנים להתחיל?"
        heading="שנתחיל לתכנן את הבית שלכם?"
        placement="home_cta_bottom"
      />

      {/* 10. SOCIAL */}
      <section className="py-24 lg:py-32 bg-surface -mt-1 text-center">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="max-w-2xl mx-auto space-y-8">
            <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">הישארו מעודכנים</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl text-primary tracking-tight">עקבו אחרינו ברשתות</h2>
            <p className="font-body text-lg text-secondary leading-relaxed">
              הצצה יומיומית אל מאחורי הקלעים, פרויקטים בתהליך, סיורים מצולמים וטיפים לעיצוב הבית.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noreferrer" className="bg-surface-container-low border border-outline/10 text-primary px-8 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined">photo_camera</span>
                Instagram
              </a>
              <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noreferrer" className="bg-surface-container-low border border-outline/10 text-primary px-8 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined">thumb_up</span>
                Facebook
              </a>
              <a href="https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" target="_blank" rel="noreferrer" className="bg-surface-container-low border border-outline/10 text-primary px-8 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
