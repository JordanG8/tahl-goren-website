import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { siteData } from '../data/siteData';

export default function Home() {
  useScrollReveal();
  const counterRef = useRef(null);

  const animateCounters = useCallback(() => {
    const el = counterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-count'), 10);
            const suffix = target.getAttribute('data-suffix') || '';
            let current = 0;
            const duration = 2000;
            const stepTime = Math.max(Math.floor(duration / countTo), 30);
            const timer = setInterval(() => {
              current += 1;
              target.textContent = current + suffix;
              if (current >= countTo) clearInterval(timer);
            }, stepTime);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.5 }
    );

    el.querySelectorAll('[data-count]').forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return animateCounters();
  }, [animateCounters]);

  const featuredProjects = siteData.projects.slice(0, 3);
  const featuredReels = siteData.instagramReels.slice(0, 4);

  return (
    <>
      {/* ======== SECTION 1: HERO ======== */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 lg:pt-0 lg:pb-0 overflow-hidden">
        {/* Blueprint grid background decoration */}
        <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Hero Text */}
            <div className="flex-1 space-y-8 text-center lg:text-right">
              {/* Badge */}
              <div className="reveal">
                <span className="inline-block bg-surface-container-low px-5 py-2 font-label text-xs tracking-widest text-secondary uppercase">
                  <span className="material-symbols-outlined text-sm align-middle ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  מעל 25 שנות ניסיון באדריכלות
                </span>
              </div>

              {/* Headline */}
              <h1 className="reveal font-headline font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-primary leading-[1.1] tracking-tight">
                אדריכלות<br />שמחזיקה לך<br />את היד.
              </h1>

              {/* Subtitle */}
              <p className="reveal font-body text-lg sm:text-xl text-secondary max-w-lg mx-auto lg:mx-0 leading-relaxed">
                מהרעיון הראשון ועד למפתח בדלת. תכנון אדריכלי, ליווי סטטוטורי ופיקוח עליון &mdash; הכל תחת קורת גג אחת, עם יחס אישי וללא פשרות.
              </p>

              {/* CTA Buttons */}
              <div className="reveal flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/projects" className="bg-primary text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity text-center">
                  לפרויקטים
                </Link>
                <Link to="/contact" className="border-2 border-primary text-primary px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 text-center">
                  שיחת ייעוץ
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 relative reveal">
              <div className="relative">
                {/* Decorative grid element behind image */}
                <div className="absolute -top-6 -left-6 w-32 h-32 blueprint-grid opacity-60 hidden lg:block"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-outline/20 hidden lg:block"></div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL_iP4RlYy7YnuljA-GBtvmBY9t82wQG-PFlu2dX54J7sAyvVnPqbKzZrrENtMZnk6mUXgW-05ZVQ7nmXpSQWOEvjiycnWU6KbpR68BgXZSR_OrOv_52MofGoWAoQBLUJ0rVss-ohMQ9KfJSLgL0T4GqJpFzR9nuX0z2Bt1qhvqzieEzSK3Qf67F0b0W4wilLwwoHODvz07tX8g18zE4lz9fW3S0PI-jh_V_udKzSQUbTUcSNm047nz6pcrFkZfwJ9Logsjv87cgXP"
                  alt="בית פרטי בתכנון טל גורן אדריכלית - אדריכלות מודרנית עם חומרים טבעיים"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover img-grayscale"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-secondary/50">
          <span className="font-label text-[10px] tracking-[0.3em] uppercase">גלילה</span>
          <div className="w-px h-8 bg-secondary/30"></div>
        </div>
      </section>


      {/* ======== SECTION 2: PROCESS OVERVIEW ======== */}
      <section className="py-24 lg:py-32 bg-surface-container-low">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">

          {/* Section Header */}
          <div className="text-center mb-20 space-y-4">
            <span className="reveal font-label text-[10px] tracking-[0.3em] text-secondary uppercase">איך זה עובד</span>
            <h2 className="reveal font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">
              תהליך עבודה מובנה
            </h2>
            <p className="reveal font-body text-lg text-secondary max-w-2xl mx-auto">
              כל פרויקט מלווה בתהליך מסודר ושקוף, מהרגע הראשון ועד לכניסה לבית החדש.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 stagger">

            {/* Step 1 */}
            <div className="reveal bg-surface p-8 lg:p-10 space-y-5 card-hover relative">
              <span className="font-headline font-black text-6xl text-surface-container-highest leading-none">01</span>
              <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">architecture</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-primary">תכנון ופרוגרמה</h3>
              <p className="font-body text-sm text-secondary leading-relaxed">
                הגדרת הצרכים, בניית תוכנית אדריכלית ועיצוב הקונספט. שלב שבו כל חלום מקבל צורה.
              </p>
            </div>

            {/* Step 2 */}
            <div className="reveal bg-surface p-8 lg:p-10 space-y-5 card-hover relative">
              <span className="font-headline font-black text-6xl text-surface-container-highest leading-none">02</span>
              <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">description</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-primary">רישוי וביורוקרטיה</h3>
              <p className="font-body text-sm text-secondary leading-relaxed">
                הגשת בקשות להיתר בנייה, מול הוועדות המקומיות והרשויות. אנחנו מטפלים בהכל עבורכם.
              </p>
            </div>

            {/* Step 3 */}
            <div className="reveal bg-surface p-8 lg:p-10 space-y-5 card-hover relative">
              <span className="font-headline font-black text-6xl text-surface-container-highest leading-none">03</span>
              <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">engineering</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-primary">ליווי בביצוע</h3>
              <p className="font-body text-sm text-secondary leading-relaxed">
                פיקוח עליון על הבנייה, ביקורות באתר והתאמות בזמן אמת. כדי שהתוצאה תהיה בדיוק כמו שתכננו.
              </p>
            </div>

            {/* Step 4 */}
            <div className="reveal bg-surface p-8 lg:p-10 space-y-5 card-hover relative">
              <span className="font-headline font-black text-6xl text-surface-container-highest leading-none">04</span>
              <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-primary">כניסה הביתה</h3>
              <p className="font-body text-sm text-secondary leading-relaxed">
                הרגע שכולם מחכים לו. קבלת המפתח לבית שתוכנן בדיוק עבורכם, ללא פשרות.
              </p>
            </div>

          </div>

          {/* Link to full process page */}
          <div className="reveal text-center mt-16">
            <Link to="/process" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>לתהליך העבודה המלא</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>

        </div>
      </section>


      {/* ======== SECTION 3: FEATURED PROJECTS ======== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="reveal font-label text-[10px] tracking-[0.3em] text-secondary uppercase">פרויקטים נבחרים</span>
              <h2 className="reveal font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">
                מהעשייה שלנו
              </h2>
            </div>
            <Link to="/projects" className="reveal inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>כל הפרויקטים</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="reveal group relative block overflow-hidden card-hover"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[400px] object-cover img-grayscale transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-8">
                  <h3 className="font-headline font-bold text-xl text-white mb-1">{project.title}</h3>
                  <span className="font-label text-xs text-white/70 tracking-wide">{project.location}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* ======== SECTION 4: WHY CHOOSE ME ======== */}
      <section className="py-24 lg:py-32 bg-surface-container" ref={counterRef}>
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Image with counter overlay */}
            <div className="flex-1 relative reveal">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACbE9Cnfjo1iORbficNIsPOn91AeTraXJqWJf0MFabjk-dFJEYfX6xONs5bxxv8KXm3EteJHeyOnm-hsfMq4h3sfF83LfTCt4XY09VoCkKEE-U2_E10hKB9wuzb2WP7xtruIXkyW6WAy5VdO0m9j5YJpAGArZS-mqdzVgty0sk4OrFy2oe6OX-C9EmklPUU-Fs2zPuwJ9UzIXH10pD0TQpqbpYf79La6XBQZ2EUII7-r-81jitIdTo7gmw6Da24Y9gzm5l_EX0w8gx"
                alt="טל גורן אדריכלית בעבודה - למעלה מ-25 שנות ניסיון באדריכלות"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover img-grayscale"
              />
              {/* Counter overlay */}
              <div className="absolute bottom-8 left-8 bg-primary text-white p-6 sm:p-8">
                <span className="font-headline font-black text-5xl sm:text-6xl block leading-none" data-count="25" data-suffix="+">0</span>
                <span className="font-label text-xs tracking-widest uppercase mt-2 block text-white/70">שנות ניסיון</span>
              </div>
            </div>

            {/* Value Props */}
            <div className="flex-1 space-y-6">
              <span className="reveal font-label text-[10px] tracking-[0.3em] text-secondary uppercase">למה לבחור בנו</span>
              <h2 className="reveal font-headline font-black text-4xl sm:text-5xl text-primary tracking-tight leading-tight">
                ניסיון, מקצועיות<br />ויחס אישי
              </h2>

              <div className="space-y-10 mt-10 stagger">
                {/* Value 1 */}
                <div className="reveal flex gap-6 items-start">
                  <div className="w-14 h-14 bg-surface-container-low flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline font-bold text-lg text-primary">מומחיות מוכחת</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      למעלה מ-25 שנות ניסיון בתכנון בתים פרטיים, שיפוצים והרחבות. כל פרויקט מקבל את מלוא תשומת הלב והמקצועיות.
                    </p>
                  </div>
                </div>

                {/* Value 2 */}
                <div className="reveal flex gap-6 items-start">
                  <div className="w-14 h-14 bg-surface-container-low flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">bolt</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline font-bold text-lg text-primary">תהליך יעיל ומהיר</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      ניהול פרויקט מסודר, עמידה בלו&quot;ז ותקציב. אנחנו יודעים לנווט את הביורוקרטיה ולהביא תוצאות בזמן.
                    </p>
                  </div>
                </div>

                {/* Value 3 */}
                <div className="reveal flex gap-6 items-start">
                  <div className="w-14 h-14 bg-surface-container-low flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">family_restroom</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline font-bold text-lg text-primary">ליווי אישי ומשפחתי</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      אני מלווה אתכם לאורך כל הדרך, מהפגישה הראשונה ועד הכניסה הביתה. תמיד זמינה, תמיד עם תשובה.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ======== SECTION 5: TESTIMONIAL QUOTE ======== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">

          <div className="reveal max-w-4xl mx-auto text-center space-y-8">
            {/* Large quote marks */}
            <span className="font-headline text-8xl sm:text-9xl text-surface-container-highest leading-none select-none block">&ldquo;</span>

            <blockquote className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-primary leading-relaxed -mt-12">
              טל ליוותה אותנו מהרגע הראשון עד הכניסה לבית. היא הקשיבה לכל בקשה, הבינה בדיוק מה אנחנו צריכים, והתוצאה הסופית עלתה על כל הציפיות שלנו.
            </blockquote>

            <div className="space-y-1">
              <span className="font-headline font-bold text-sm text-primary block">משפחת כהן</span>
              <span className="font-label text-xs text-secondary tracking-wide">בית פרטי, גבעת עדה</span>
            </div>

            {/* Link to all testimonials */}
            <div className="pt-4">
              <Link to="/testimonials" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
                <span>כל ההמלצות</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* ======== SECTION: SOCIAL PRESENCE ======== */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="text-right">
              <span className="reveal font-label text-[10px] tracking-[0.3em] text-secondary uppercase">Social Presence</span>
              <h2 className="reveal font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight mt-4 italic">
                TAL GOREN <span className="text-secondary opacity-50 block sm:inline">LIVE</span>
              </h2>
            </div>
            <Link to="/social" className="reveal inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>לכל התכנים מהרשתות</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Reels Preview Column */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
                {featuredReels.map((reel) => (
                  <a
                    key={reel.id}
                    href={reel.url}
                    target="_blank"
                    rel="noreferrer"
                    className="reveal group relative block overflow-hidden card-hover"
                  >
                    <img
                      src={reel.thumbnail}
                      alt="Instagram Reel"
                      className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-4xl opacity-80 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links Column */}
            <div className="lg:col-span-4 space-y-8 reveal">
              <div className="p-8 bg-surface-container-low border border-outline/10">
                <h3 className="font-headline font-bold text-xl mb-6">עקבו באינסטגרם</h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">הצצה יומיומית אל מאחורי הקלעים, פרויקטים בתהליך וטיפים לעיצוב הבית.</p>
                <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                  <span className="font-label font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-colors">@tahlgoren</span>
                  <svg className="w-6 h-6 fill-current text-secondary group-hover:text-primary transition-colors" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>

              <div className="p-8 bg-surface-container border border-outline/5">
                <h3 className="font-headline font-bold text-xl mb-6">דף הפייסבוק</h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">מאמרים קצרים, מחשבות על אדריכלות ושיתופים מהיומיום במשרד.</p>
                <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                  <span className="font-label font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-colors">TAL GOREN ARCHITECTS</span>
                  <svg className="w-6 h-6 fill-current text-secondary group-hover:text-primary transition-colors" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V7.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              </div>

              <div className="p-8 bg-surface-container-highest border border-outline/5">
                <h3 className="font-headline font-bold text-xl mb-6">ערוץ היוטיוב</h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">סיורים מצולמים בבתים שתכננתי והסברים על תהליכי תכנון.</p>
                <a href="https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                  <span className="font-label font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-colors">WATCH ON YOUTUBE</span>
                  <svg className="w-6 h-6 fill-current text-secondary group-hover:text-primary transition-colors" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ======== SECTION: FAQ ======== */}
      <section className="py-24 lg:py-32 bg-surface-container-low">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">

          {/* Section Header */}
          <div className="text-center mb-20 space-y-4">
            <span className="reveal font-label text-[10px] tracking-[0.3em] text-secondary uppercase">שאלות נפוצות</span>
            <h2 className="reveal font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight">
              שאלות ותשובות
            </h2>
            <p className="reveal font-body text-lg text-secondary max-w-2xl mx-auto">
              ריכזנו עבורכם את השאלות הנפוצות ביותר שלקוחות שואלים לפני ובמהלך תהליך הבנייה והתכנון האדריכלי.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto space-y-0 stagger">
            {siteData.faq.map((item, index) => (
              <div key={index}>
                <details className="faq-item reveal bg-surface">
                  <summary>
                    <span className="font-headline font-bold text-base sm:text-lg text-primary leading-relaxed pl-4">{item.question}</span>
                    <span className="material-symbols-outlined faq-chevron text-2xl">expand_more</span>
                  </summary>
                  <div className="faq-answer">
                    <p className="font-body text-sm sm:text-base text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
                {index < siteData.faq.length - 1 && <div className="faq-divider"></div>}
              </div>
            ))}
          </div>

          {/* Link to full FAQ page */}
          <div className="reveal text-center mt-16">
            <Link to="/faq" className="inline-flex items-center gap-2 font-headline font-bold text-sm text-primary hover:text-secondary transition-colors group">
              <span>לכל השאלות והתשובות</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            </Link>
          </div>

        </div>
      </section>


      {/* ======== SECTION: CTA ======== */}
      <section className="py-24 lg:py-32 bg-primary relative overflow-hidden">
        {/* Decorative blueprint grid */}
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)' }}></div>

        <div className="relative z-10 max-w-[1920px] mx-auto px-8 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <span className="reveal font-label text-[10px] tracking-[0.3em] text-white/50 uppercase">בואו נתחיל</span>
            <h2 className="reveal font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              הבית הבא שלכם<br />מתחיל כאן
            </h2>
            <p className="reveal font-body text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              מוזמנים לפנות אליי לשיחת ייעוץ ראשונית ללא עלות. נשב יחד, נבין את הצרכים שלכם, ונתחיל לתכנן את הבית שתמיד חלמתם עליו.
            </p>
            <div className="reveal">
              <Link to="/contact" className="inline-block bg-white text-primary px-12 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">
                לפגישת ייעוץ
              </Link>
            </div>
            <div className="reveal flex justify-center gap-8 pt-4">
              <a href="tel:0528345799" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-label text-sm">
                <span className="material-symbols-outlined text-lg">call</span>
                052-8345799
              </a>
              <a href="https://wa.me/972528345799" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-label text-sm">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
