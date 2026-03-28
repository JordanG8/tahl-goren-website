import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Breadcrumb from '../components/Breadcrumb';
import { siteData } from '../data/siteData';

export default function Videos() {
  const ref = useScrollReveal();

  const bgClasses = [
    'bg-surface-container',
    'bg-surface-container-low',
    'bg-surface-container-low',
    'bg-surface-container',
  ];

  const hoverBgClasses = [
    'group-hover:bg-surface-container-low',
    'group-hover:bg-surface-container',
    'group-hover:bg-surface-container',
    'group-hover:bg-surface-container-low',
  ];

  return (
    <main ref={ref} className="pt-24 min-h-screen">

      {/* Page Header */}
      <section className="py-16 px-8 bg-surface reveal">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb current="סרטונים" />
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary max-w-4xl">
            סרטונים ותוכן
          </h1>
          <p className="text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-8">
            צפו בפרויקטים שלי, טיפים לבנייה וסיורים וירטואליים
          </p>
          <div className="w-16 h-[2px] bg-secondary mt-10"></div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">YouTube</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
              <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary">מערוץ היוטיוב</h2>
              <a href="https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-headline font-bold text-sm text-secondary hover:text-primary transition-colors group">
                לערוץ המלא
                <span className="material-symbols-outlined text-xl group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 stagger">
            {siteData.videos.map((video, index) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group card-hover block"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-container">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover img-grayscale"
                  />
                  <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/50 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                  </div>
                </div>
                <div className={`p-8 ${bgClasses[index] || 'bg-surface-container'} ${hoverBgClasses[index] || 'group-hover:bg-surface-container-low'} transition-colors duration-300`}>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">{video.category}</span>
                  <h3 className="font-headline font-bold text-xl text-primary mt-2">{video.title}</h3>
                  <p className="text-secondary text-sm mt-2 leading-relaxed">{video.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Media Mentions Section */}
      <section className="py-24 md:py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">Media</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
              <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary">אזכורים בתקשורת</h2>
              <p className="text-secondary text-lg max-w-xl">
                טל גורן בראיונות וכתבות מקצועיות בכלי התקשורת המובילים.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
            {siteData.mediaArticles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group card-hover block bg-surface p-8 text-right"
              >
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">{article.source}</span>
                <h3 className="font-headline font-bold text-lg text-primary mt-3 leading-tight group-hover:text-secondary transition-colors">{article.title}</h3>
                <p className="text-secondary text-sm mt-3 leading-relaxed">{article.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 font-headline font-bold text-xs text-primary group-hover:text-secondary transition-colors">
                  לכתבה המלאה
                  <span className="material-symbols-outlined text-base group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-24 md:py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 reveal">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">Instagram Reels</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
              <div>
                <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tight leading-tight text-primary">מהאינסטגרם שלי</h2>
                <p className="text-secondary text-lg mt-3">
                  <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@tahlgoren</a>
                </p>
              </div>
              <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-headline font-bold text-sm text-secondary hover:text-primary transition-colors group">
                לפרופיל המלא
                <span className="material-symbols-outlined text-xl group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 stagger">
            {siteData.instagramReels.map((reel) => (
              <a
                key={reel.id}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group relative aspect-[9/16] overflow-hidden bg-surface-container"
              >
                <img
                  src={reel.thumbnail}
                  alt="Instagram Reel"
                  className="w-full h-full object-cover img-grayscale"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Facebook Banner */}
      <section className="py-20 px-8 bg-surface-container-low reveal">
        <div className="max-w-5xl mx-auto">
          <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noopener noreferrer" className="block bg-surface group card-hover overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-5 aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                <img
                  src="https://talgoren.co.il/wp-content/uploads/2021/01/צילום-עיצוב-פנים.jpg"
                  alt="טל גורן אדריכלית - פייסבוק"
                  className="w-full h-full object-cover img-grayscale"
                />
              </div>
              <div className="md:col-span-7 p-12 md:p-16 flex flex-col gap-6 text-right">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary text-center md:text-right">Facebook</span>
                <h3 className="font-headline font-black text-3xl md:text-4xl tracking-tight text-primary leading-tight text-center md:text-right">
                  עקבו אחריי בפייסבוק
                </h3>
                <p className="text-secondary text-lg leading-relaxed text-center md:text-right">
                  הצטרפו לקהילה שלי בפייסבוק לעדכונים שוטפים על פרויקטים חדשים, טיפים לבנייה ותוכן מקצועי.
                </p>
                <div className="inline-flex items-center justify-center md:justify-start gap-3 font-headline font-bold text-sm text-primary group-hover:text-secondary transition-colors">
                  לעמוד הפייסבוק
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* CTA - Follow on Social */}
      <section className="py-32 px-8 bg-primary blueprint-grid relative overflow-hidden reveal">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-white/50">ברשתות החברתיות</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tight leading-[0.95] text-white">
            רוצים לראות עוד?<br/>עקבו אחריי ברשתות
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            טיפים, סיורים בפרויקטים, מאחורי הקלעים ועוד - בכל הפלטפורמות.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <a href="https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-primary px-10 py-4 font-headline font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              YouTube
            </a>
            <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white/10 text-white px-10 py-4 font-headline font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined">photo_camera</span>
              Instagram
            </a>
            <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white/10 text-white px-10 py-4 font-headline font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined">group</span>
              Facebook
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
