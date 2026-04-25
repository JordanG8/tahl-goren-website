"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import ArchFrame from '@/components/ArchFrame';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import HomeCtaForm from '@/components/HomeCtaForm';


const heroVideos = ['/videos/hero-1.mp4', '/videos/hero-2.mp4', '/videos/hero-3.mp4'];

import { articles as siteArticles } from '@/data/articlesContent';

const homepageFaq = siteArticles.filter(a => a.faq).slice(0, 9);

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

  return (
    <>
      {/* 1. HERO */}
      <section className="relative h-dvh w-full overflow-hidden">
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
          <h1 className="font-headline font-black text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight drop-shadow-lg">טל גורן</h1>
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
              <p className="font-body text-lg text-secondary leading-relaxed max-w-md">אדריכלית שמאמינה שבית טוב הוא כזה שגדל עם המשפחה. מתמחה בתכנון בתים פרטיים באזור השרון הצפוני, ומלווה משפחות מהשלב הראשון ועד הכניסה לבית.</p>
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

      {/* 3. PROJECTS */}
      <section className="py-24 lg:py-32 -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="mb-16 text-center">
            <div className="space-y-4">
              <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">פרויקטים נבחרים</span>
              <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">מהעשייה שלנו</h2>
              <Link href="/projects/completed" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group mt-2">
                <span>כל הפרויקטים</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
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

      {/* 4. TESTIMONIALS — Google Reviews */}
      <section className="py-12 md:py-24 lg:py-32 bg-surface-container-low -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="text-center mb-16 space-y-4">
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
              <a href="tel:0528345799" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-label text-sm">
                <span className="material-symbols-outlined text-lg">call</span>052-8345799
              </a>
              <a href="https://wa.me/972528345799" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-label text-sm">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* 7. FAQ (new content with article links) */}
      <section className="py-24 lg:py-32 -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="text-center mb-20 space-y-4">
            <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">שאלות נפוצות</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">שאלות ותשובות</h2>
            <p className="font-body text-lg text-secondary max-w-2xl mx-auto">ריכזנו עבורכם את השאלות הנפוצות ביותר שלקוחות שואלים לפני ובמהלך תהליך הבנייה והתכנון האדריכלי.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepageFaq.map((item, index) => (
              <Link 
                key={index} 
                href={`/articles/${item.slug}`}
                className="group p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 text-right flex flex-col h-full"
              >
                <h3 className="font-headline font-bold text-xl text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-secondary leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {item.excerpt}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <span>קרא עוד</span>
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/articles" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>לכל השאלות והתשובות</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FORM CTA SECTION */}
      <section className="py-24 lg:py-32 bg-surface-container-highest relative overflow-hidden -mt-1 text-center">
        <div className="max-w-5xl mx-auto px-8 relative z-10 flex flex-col items-center">
          <span className="material-symbols-outlined text-6xl text-primary/30 mb-6 animate-bounce">arrow_downward</span>
          <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary mb-6 tracking-tight">שנתחיל לתכנן את הבית שלכם?</h2>
          <p className="font-body text-xl text-secondary mb-12 max-w-2xl mx-auto">השאירו פרטים ואחזור אליכם בהקדם האפשרי לשיחת היכרות ראשונית, ללא התחייבות.</p>
          <HomeCtaForm />
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
            <div className="flex-1 relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
              <Image src="/images/tahl-goren-first-meeting.jpeg" alt="טל גורן אדריכלית בעבודה" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover img-grayscale" />
              <div className="absolute bottom-8 left-8 bg-primary text-white p-6 sm:p-8">
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
                  { icon: 'bolt', title: 'תהליך יעיל ומהיר', text: 'ניהול פרויקט מסודר, עמידה בלו"ז ותקציב. אנחנו יודעים לנווט את הביורוקרטיה ולהביא תוצאות בזמן.', fill: false },
                  { icon: 'family_restroom', title: 'ליווי אישי ומשפחתי', text: 'אני מלווה אתכם לאורך כל הדרך, מהפגישה הראשונה ועד הכניסה הביתה. תמיד זמינה, תמיד עם תשובה.', fill: false },
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
