"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import ArchFrame from '@/components/ArchFrame';
import ProcessSteps from '@/components/ProcessSteps';
import ShapeDivider from '@/components/ShapeDivider';
import GoogleReviewsWidget from '@/components/GoogleReviewsWidget';
import { reviews as staticReviews } from '@/data/reviews';
import { GoogleReview } from '@/data/googleReviews';

const heroVideos = ['/videos/hero-1.mp4', '/videos/hero-2.mp4', '/videos/hero-3.mp4'];

const homepageFaq: { question: string; answer: string; articleSlug: string }[] = [
  { question: "למה חובה להיעזר באדריכלית כשבונים בית?", answer: "בחירת אדריכלית היא ההחלטה החשובה ביותר לקראת בניית בית. היא בעלת המקצוע היחידה אשר מוסמכת חוקית ומקצועית לתת מענה משולב ל-3 תחומים: תכנון הבית, עיצוב הבית, ורישוי בניה. רק שילוב מקצועי של שלושת התחומים עומד בדרישות החוק ומבטיח בית שתהנו ממנו לאורך שנים.", articleSlug: "why-architect" },
  { question: "איך לבחור אדריכלית?", answer: "בחירת אדריכלית היא תהליך דו-שלבי. בשלב הראשון, חשוב לבצע בדיקה מקצועית: לוודא שהיא בעלת ההסמכה החוקית הנדרשת וניסיון רלוונטי בתכנון בתים, ולקבל עליה המלצות חמות. לאחר מכן, חשוב לוודא שיש ביניכם כימיה טובה ושאתם סומכים עליה שתוביל את הפרויקט להצלחה.", articleSlug: "choose-architect" },
  { question: "איך לא לבחור אדריכלית?", answer: "חשוב להימנע משתי טעויות נפוצות. ראשית, לא מומלץ לבחור רק על סמך הצעת המחיר הנמוכה ביותר, כי תכנון איכותי הוא השקעה שחוסכת עלויות בנייה יקרות בהמשך. שנית, לא כדאי לפסול אדריכלית בגלל סגנון עיצובי של פרויקט ספציפי.", articleSlug: "how-not-to-choose-architect" },
  { question: "מהם שלבי העבודה בתכנון ובניית בית?", answer: "תהליך התכנון והבנייה מחולק לשישה שלבים מרכזיים: בירורים מקדימים, תכנון מוקדם, רישוי, תכניות עבודה, בנייה, וסיום ואיכלוס. כל שלב מתבסס על קודמו ודורש תשומת לב מקצועית כדי להבטיח תוצאה מיטבית.", articleSlug: "building-stages" },
  { question: "מה תפקיד האדריכלית בכל אחד משלבי התכנון והבניה?", answer: "תפקידי כאדריכלית הוא ללוות, לייעץ ולהוביל מקצועית את הפרויקט בכל ששת שלביו — מסיוע בבחינת המגרש ועד סיוע בקבלת תעודת גמר.", articleSlug: "architect-role-stages" },
  { question: "באיזה שלב של הפרויקט כדאי לערב את האדריכלית?", answer: "מומלץ לערב את האדריכלית בשלב מוקדם ככל האפשר, אפילו לפני רכישת המגרש. השלב שבו המעורבות הופכת להכרחית הוא שלב התכנון המוקדם, שכן על פי החוק נדרשת חתימת אדריכלית על הבקשה להיתר.", articleSlug: "when-to-involve-architect" },
  { question: "כמה זמן לוקח לתכנן ולבנות בית?", answer: "תהליך התכנון והבנייה המלא נמשך בדרך כלל כשנתיים. התהליך כולל: תכנון מוקדם (3-5 חודשים), רישוי (כחצי שנה עד שנה) ובנייה בפועל (כ-12 חודשים).", articleSlug: "building-timeline" },
  { question: "כמה תעלה לנו הבנייה בסך הכל?", answer: "ככלל אצבע, העלות המינימלית כיום (2025) מתחילה ב-10,000-12,000 ₪ למ\"ר, רק תשלום לקבלן. המחיר הסופי מושפע מהיקף הבנייה, סטנדרט הגמרים, תנאי השטח, ומספר החלונות והדלתות.", articleSlug: "building-cost-total" },
  { question: "באיזה אזור גאוגרפי את עובדת?", answer: "משרדי ממוקם בגבעת עדה, ועיקר פעילותי מתרכזת באזור השרון הצפוני — כל המרחב שבין נתניה לחיפה ועד עפולה במזרח. בין היתר: פרדס חנה-כרכור, אור עקיבא, בנימינה, זכרון יעקב, חדרה, קיסריה והסביבה.", articleSlug: "service-area" },
  { question: "מה כדאי להכין לקראת הפגישה הראשונה?", answer: "אמנם אין חובה להכין דבר, אך כדי להפיק מהפגישה את המירב, מומלץ להגיע עם פרטי המגרש (אם קיים), מסגרת תקציב כללית, ורשימת צרכים וחלומות ראשונית.", articleSlug: "first-meeting-prep" },
  { question: "כמה יעלו שירותי התכנון והעיצוב האדריכלי?", answer: "עלות התכנון בדרך כלל נעה בין 3-5% מעלות הפרויקט כולו. גיבשתי שלוש חבילות שירות במחיר קבוע, הנבדלות בהיקף עבודת עיצוב הפנים — מתכנון בסיסי ועד ליווי מקיף.", articleSlug: "planning-cost" },
  { question: "האם כדאי להשקיע גם בעיצוב פנים?", answer: "בהחלט. מה הופך בית יפה ופונקציונלי לבית עם נשמה? עיצוב פנים מדויק. אני מציעה שירותי עיצוב פנים כחלק מחבילות התכנון המורחבות, כדי להבטיח תוצאה שלמה.", articleSlug: "interior-design-value" },
  { question: "מהו הצעד הראשון כשרוצים לתכנן בית?", answer: "הצעד הראשון הוא לוודא שיש סנכרון בין 3 גורמים: החלום (מהם הצרכים שלכם?), המציאות (מה זכויות הבנייה מאפשרות?), והתקציב (מהי המסגרת הכלכלית?).", articleSlug: "first-step" },
  { question: "אילו בעלי מקצוע מרכזיים יש בתחום התכנון?", answer: "תפגשו שלושה בעלי מקצוע מרכזיים: אדריכלות (תכנון, עיצוב ורישוי), הנדסת בניין (חוזק ובטיחות המבנה), ועיצוב פנים (תכנון החללים הפנימיים). חשוב להכיר את ההבדלים ביניהם.", articleSlug: "professionals-credentials" },
  { question: "כמה באמת עולה לבנות בית פרטי בישראל?", answer: "עלות הבנייה תלויה בגורמים ייחודיים לפרויקט שלכם ובמחירי השוק הדינמיים. תפקידי הוא להתחיל על בסיס כללי אצבע ולהפנות אתכם לאומדן מקצועי שיתבסס על התכנון הספציפי שלכם.", articleSlug: "real-building-cost" },
  { question: "איך מוודאים שלא חורגים מהתקציב?", answer: "באמצעות הגדרת תקציב מראש, ליווי צמוד עם \"דגלים אדומים\", בדיקות תקופתיות בנקודות מפתח, ותכנון גמיש שמשאיר שוליים לקיצוצים ללא פגיעה במהות הבית.", articleSlug: "budget-control" },
  { question: "אילו \"עלויות נסתרות\" יש בתהליך?", answer: "טעות נפוצה היא לחשוב שמחיר הקבלן הוא העלות הכוללת. יש עלויות \"לפני הבנייה\" (מיסים, אגרות, יועצים) ו\"אחרי הבנייה\" (ריהוט, גינון, מיזוג). אלו יכולות להצטבר למאות אלפי שקלים.", articleSlug: "hidden-costs" },
  { question: "מה זה היתר בנייה, והאם הוא מספיק כדי להתחיל לבנות?", answer: "היתר בנייה הוא האישור החוקי להקמת ביתכם. כאדריכלית מורשית היתר, יש לי סמכות להנפיק היתר בתהליך מקוצר של \"רישוי עצמי\". חשוב לדעת: נדרש גם \"אישור תחילת עבודה\" מהוועדה.", articleSlug: "building-permit" },
  { question: "אילו שיטות בנייה עיקריות קיימות בישראל?", answer: "השיטה הנפוצה היא הקונבנציונלית (בטון ובלוקים). לצדה קיימות שיטות מתקדמות (שלד פלדה/עץ) ושיטות מבודדות (ICF, GSB). אני מכווינה כל משפחה לשיטה המתאימה ביותר.", articleSlug: "construction-methods-overview" },
  { question: "האם ניתן להוסיף יחידת דיור או משרד במגרש?", answer: "התשובה תלויה בתב\"ע החלה על המגרש שלכם. תב\"עות רבות גמישות יותר לגבי משרד מאשר יחידת דיור. חיוני להתייעץ עם אדריכלית שתבחן את ההיתכנות ותתכנן פתרון גמיש.", articleSlug: "housing-unit-addition" },
  { question: "איך לוודא שהסגנון העיצובי יקלע לטעמנו?", answer: "התהליך מתחיל בניתוח השראות ויזואליות שלכם. לאחר מכן, אני יוצרת הדמיות תלת-ממדיות ריאליסטיות המאפשרות לכם 'לטייל' בבית העתידי לפני תחילת הבנייה.", articleSlug: "design-style-match" },
];

const featuredArticles = [
  { slug: "costs", title: "עלויות בניה ומחיר אדריכלות", image: "https://talgoren.co.il/wp-content/uploads/2020/03/כמה-עולה-לבנות-בית-ו-אדריכלות.jpg", excerpt: "חוששים להיכנס ל'בור' של הוצאות בלתי נגמרות? מדריך מפורט על עלויות הבנייה." },
  { slug: "choose-architect", title: "איך לבחור אדריכלית?!", image: "https://talgoren.co.il/wp-content/uploads/2020/03/12496261_1550603918564055_4078115768814528292_o-1.jpg", excerpt: "כאשר עומדים לפני פרויקט בניה של בית חדש, איזו אדריכלית לבחור?" },
  { slug: "living-room-guide", title: "הסלון – טיפים וכלים מעשיים לתכנון", image: "https://talgoren.co.il/wp-content/uploads/2021/01/טבת-אסנת-טל-קבצים-קטנים-22.jpg", excerpt: "חדר המגורים הוא בדרך כלל המרחב הגדול ביותר בבית. טיפים לתכנון נכון." },
];

type Props = {
  projects: any[];
  faqItems: any[];
  reels: any[];
};

export default function HomePage({ projects, reels }: Props) {
  // Use static fallbacks for top rating box (widget handles the live data)
  const avgRating = 5.0;
  const totalReviewsCount = 60;

  const featuredProjects = projects.slice(0, 6);
  const featuredReels = reels.slice(0, 6);

  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const socialCarouselRef = useRef<HTMLDivElement | null>(null);
  const reelVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeReel, setActiveReel] = useState(0);

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

  useEffect(() => {
    reelVideoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeReel) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeReel]);

  const getReelVideoSrc = (reel: any) =>
    reel.videoUrl ||
    reel.video?.asset?.url ||
    reel.video ||
    reel.mp4Url ||
    null;

  const scrollToReel = (index: number) => {
    const container = socialCarouselRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>(`[data-reel-index="${index}"]`);
    if (!card) return;
    const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left, behavior: 'smooth' });
  };

  const handleReelScroll = () => {
    const container = socialCarouselRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-reel-index]'));
    if (!cards.length) return;

    const center = container.scrollLeft + container.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    if (nearest !== activeReel) setActiveReel(nearest);
  };

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

      {/* Hero → About divider */}
      <div className="relative -mt-24 z-10">
        <ShapeDivider shape="wave" fillColor="#eeeeea" height={100} />
      </div>

      {/* 2. ABOUT */}
      <section className="py-24 lg:py-32 bg-surface-container-low overflow-hidden -mt-1">
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

      {/* About → Projects divider */}
      <ShapeDivider shape="curve" fillColor="#fbf9f6" height={70} className="bg-surface-container-low" />

      {/* 3. PROJECTS */}
      <section className="py-24 lg:py-32 -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="mb-16">
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

      {/* Projects → Testimonial divider */}
      <ShapeDivider shape="tilt" fillColor="#eeeeea" height={60} className="bg-surface" />

      {/* 4. TESTIMONIALS — Google Reviews */}
      <section className="py-24 lg:py-32 bg-surface-container-low -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">המלצות לקוחות</span>
              <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">מה אומרים עלינו</h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1", color: '#FBBC04' }}>star</span>
                  ))}
                </div>
                <span className="font-headline font-bold text-sm text-primary">{avgRating % 1 !== 0 ? avgRating.toFixed(1) : avgRating.toFixed(1)}</span>
                <span className="font-label text-xs text-secondary">· {totalReviewsCount} ביקורות בגוגל</span>
              </div>

            </div>
            <Link href="/testimonials" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>כל ההמלצות</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>
          <GoogleReviewsWidget />
        </div>
      </section>

      {/* Testimonial → CTA divider */}
      <ShapeDivider shape="wave" fillColor="#30332f" height={100} className="bg-surface-container-low" />

      {/* 5. CTA / CONTACT */}
      <section className="py-24 lg:py-32 bg-primary relative overflow-hidden -mt-1">
        <img
          src="/images/projects/vild-detail.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-15"
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

      {/* 6. PROCESS STEPS (collapsible flowchart) */}
      <ProcessSteps />

      {/* Process → FAQ divider */}
      <ShapeDivider shape="curve" fillColor="#fbf9f6" height={70} className="bg-surface-container-low" />

      {/* 7. FAQ (new content with article links) */}
      <section className="py-24 lg:py-32 -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="text-center mb-20 space-y-4">
            <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">שאלות נפוצות</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">שאלות ותשובות</h2>
            <p className="font-body text-lg text-secondary max-w-2xl mx-auto">ריכזנו עבורכם את השאלות הנפוצות ביותר שלקוחות שואלים לפני ובמהלך תהליך הבנייה והתכנון האדריכלי.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-0">
            {homepageFaq.map((item, index) => (
              <div key={index}>
                <details className="faq-item bg-surface">
                  <summary>
                    <span className="font-headline font-bold text-base sm:text-lg text-primary leading-relaxed pl-4">{item.question}</span>
                    <span className="material-symbols-outlined faq-chevron text-2xl">expand_more</span>
                  </summary>
                  <div className="faq-answer">
                    <p className="font-body text-sm sm:text-base text-secondary leading-relaxed mb-4">{item.answer}</p>
                    <Link
                      href={`/articles/${item.articleSlug}`}
                      className="inline-flex items-center gap-2 font-headline font-bold text-xs text-primary hover:text-secondary transition-colors group"
                    >
                      <span>למאמר המלא</span>
                      <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                    </Link>
                  </div>
                </details>
                {index < homepageFaq.length - 1 && <div className="faq-divider" />}
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

      {/* FAQ → Articles divider */}
      <ShapeDivider shape="tilt" fillColor="#eeeeea" height={60} className="bg-surface" />

      {/* 8. ARTICLES (new section) */}
      <section className="py-24 lg:py-32 bg-surface-container-low -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="mb-16 space-y-4">
            <span className="font-label text-[10px] tracking-[0.3em] text-secondary uppercase">מאמרים ומדריכים</span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">ידע שחוסך לכם כסף</h2>
            <p className="font-body text-lg text-secondary max-w-2xl">מאמרים מקצועיים בנושאי תכנון, בנייה ועיצוב — כדי שתגיעו מוכנים לתהליך.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group card-hover block bg-surface overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover img-grayscale"
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

      {/* Articles → Why Choose Me divider */}
      <ShapeDivider shape="drops" fillColor="#f5f3f0" height={70} className="bg-surface-container-low" />

      {/* 9. WHY CHOOSE ME */}
      <section className="py-24 lg:py-32 bg-surface-container -mt-1">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 relative">
              <img src="/images/projects/nucham-living.jpg" alt="טל גורן אדריכלית בעבודה" className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover img-grayscale" />
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

      {/* Why Choose Me → Social divider */}
      <ShapeDivider shape="curve" fillColor="#fbf9f6" height={80} className="bg-surface-container" />

      {/* 10. SOCIAL */}
      <section className="py-24 lg:py-32 bg-surface -mt-1">
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
              <div className="relative">
                <div
                  ref={socialCarouselRef}
                  onScroll={handleReelScroll}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 no-scrollbar"
                >
                  {featuredReels.map((reel: any, index: number) => {
                    const videoSrc = getReelVideoSrc(reel);
                    const isActive = index === activeReel;
                    return (
                      <a
                        key={reel.id}
                        data-reel-index={index}
                        href={reel.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`group relative block flex-shrink-0 snap-center overflow-hidden transition-all duration-300 ${isActive ? 'basis-[80%] md:basis-[52%]' : 'basis-[70%] md:basis-[42%] opacity-85'}`}
                      >
                        <div className="relative h-[360px] md:h-[420px]">
                          {isActive && videoSrc ? (
                            <video
                              ref={(el) => { reelVideoRefs.current[index] = el; }}
                              src={videoSrc}
                              poster={reel.thumbnail}
                              muted
                              loop
                              playsInline
                              autoPlay
                              preload="metadata"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={reel.thumbnail}
                              alt="Instagram Reel thumbnail"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                          <div className={`absolute inset-0 transition-colors duration-300 flex items-center justify-center ${isActive ? 'bg-black/10' : 'bg-black/25 group-hover:bg-black/40'}`}>
                            <span className="material-symbols-outlined text-white text-4xl opacity-90 transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>
                              {isActive && videoSrc ? 'volume_off' : 'play_circle'}
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
                <button
                  onClick={() => scrollToReel(Math.max(activeReel - 1, 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/45 text-white flex items-center justify-center hover:bg-black/65 transition-colors"
                  aria-label="הקודם"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
                <button
                  onClick={() => scrollToReel(Math.min(activeReel + 1, featuredReels.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/45 text-white flex items-center justify-center hover:bg-black/65 transition-colors"
                  aria-label="הבא"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <div className="flex items-center justify-center gap-2 mt-5">
                  {featuredReels.map((reel: any, index: number) => (
                    <button
                      key={reel.id}
                      onClick={() => scrollToReel(index)}
                      className={`h-1.5 transition-all ${index === activeReel ? 'w-8 bg-primary' : 'w-3 bg-outline/40'}`}
                      aria-label={`מעבר לסרטון ${index + 1}`}
                    />
                  ))}
                </div>
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
    </>
  );
}
