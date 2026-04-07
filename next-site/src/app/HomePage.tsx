"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import ArchFrame from '@/components/ArchFrame';
import ProcessSteps from '@/components/ProcessSteps';

const heroVideos = ['/videos/hero-1.mp4', '/videos/hero-2.mp4', '/videos/hero-3.mp4'];

type Props = {
  projects: any[];
  faqItems: any[];
  reels: any[];
};

export default function HomePage({ projects, faqItems, reels }: Props) {
  const featuredProjects = projects.slice(0, 6);
  const featuredReels = reels.slice(0, 4);

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
      {/* HERO */}
      <section className="relative h-dvh w-full overflow-hidden -mt-24">
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

      {/* SHORT ABOUT */}
      <section className="py-24 lg:py-32 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="flex justify-center lg:justify-start">
              <ArchFrame className="w-full max-w-xs sm:max-w-sm">
                <div className="aspect-[3/4]">
                  <img src="/images/tahl-portrait.jpg" alt="טל גורן אדריכלית" className="w-full h-full object-cover object-top img-grayscale" />
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

      {/* FEATURED PROJECTS */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">פרויקטים נבחרים</span>
              <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">מהעשייה שלנו</h2>
            </div>
            <Link href="/projects/completed" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>כל הפרויקטים</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessSteps />

      {/* WHY CHOOSE ME */}
      <section className="py-24 lg:py-32 bg-surface-container">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuACbE9Cnfjo1iORbficNIsPOn91AeTraXJqWJf0MFabjk-dFJEYfX6xONs5bxxv8KXm3EteJHeyOnm-hsfMq4h3sfF83LfTCt4XY09VoCkKEE-U2_E10hKB9wuzb2WP7xtruIXkyW6WAy5VdO0m9j5YJpAGArZS-mqdzVgty0sk4OrFy2oe6OX-C9EmklPUU-Fs2zPuwJ9UzIXH10pD0TQpqbpYf79La6XBQZ2EUII7-r-81jitIdTo7gmw6Da24Y9gzm5l_EX0w8gx" alt="טל גורן אדריכלית בעבודה" className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover img-grayscale" />
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

      {/* TESTIMONIAL */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="font-headline text-8xl sm:text-9xl text-surface-container-highest leading-none select-none block">&ldquo;</span>
            <blockquote className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-primary leading-relaxed -mt-12">
              טל ליוותה אותנו מהרגע הראשון עד הכניסה לבית. היא הקשיבה לכל בקשה, הבינה בדיוק מה אנחנו צריכים, והתוצאה הסופית עלתה על כל הציפיות שלנו.
            </blockquote>
            <div className="space-y-1">
              <span className="font-headline font-bold text-sm text-primary block">משפחת כהן</span>
              <span className="font-label text-xs text-secondary tracking-wide">בית פרטי, גבעת עדה</span>
            </div>
            <div className="pt-4">
              <Link href="/testimonials" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
                <span>כל ההמלצות</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="text-right">
              <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">Social Presence</span>
              <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight mt-4 italic">TAL GOREN <span className="text-secondary opacity-50 block sm:inline">LIVE</span></h2>
            </div>
            <Link href="/social" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>לכל התכנים מהרשתות</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredReels.map((reel: any) => (
                  <a key={reel.id} href={reel.url} target="_blank" rel="noreferrer" className="group relative block overflow-hidden card-hover">
                    <img src={reel.thumbnail} alt="Instagram Reel" className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-4xl opacity-80 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-surface-container-low border border-outline/10">
                <h3 className="font-headline font-bold text-xl mb-6">עקבו באינסטגרם</h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">הצצה יומיומית אל מאחורי הקלעים, פרויקטים בתהליך וטיפים לעיצוב הבית.</p>
                <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                  <span className="font-label font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-colors">@tahlgoren</span>
                </a>
              </div>
              <div className="p-8 bg-surface-container border border-outline/5">
                <h3 className="font-headline font-bold text-xl mb-6">דף הפייסבוק</h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">מאמרים קצרים, מחשבות על אדריכלות ושיתופים מהיומיום במשרד.</p>
                <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                  <span className="font-label font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-colors">TAL GOREN ARCHITECTS</span>
                </a>
              </div>
              <div className="p-8 bg-surface-container-highest border border-outline/5">
                <h3 className="font-headline font-bold text-xl mb-6">ערוץ היוטיוב</h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">סיורים מצולמים בבתים שתכננתי והסברים על תהליכי תכנון.</p>
                <a href="https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                  <span className="font-label font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-colors">WATCH ON YOUTUBE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-surface-container-low">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="text-center mb-20 space-y-4">
            <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">שאלות נפוצות</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">שאלות ותשובות</h2>
            <p className="font-body text-lg text-secondary max-w-2xl mx-auto">ריכזנו עבורכם את השאלות הנפוצות ביותר שלקוחות שואלים לפני ובמהלך תהליך הבנייה והתכנון האדריכלי.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-0">
            {faqItems.map((item: any, index: number) => (
              <div key={index}>
                <details className="faq-item bg-surface">
                  <summary>
                    <span className="font-headline font-bold text-base sm:text-lg text-primary leading-relaxed pl-4">{item.question}</span>
                    <span className="material-symbols-outlined faq-chevron text-2xl">expand_more</span>
                  </summary>
                  <div className="faq-answer">
                    <p className="font-body text-sm sm:text-base text-secondary leading-relaxed">{item.answer}</p>
                  </div>
                </details>
                {index < faqItems.length - 1 && <div className="faq-divider" />}
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/faq" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>לכל השאלות והתשובות</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)' }} />
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
    </>
  );
}
