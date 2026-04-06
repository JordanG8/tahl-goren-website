import { siteData } from '../data/siteData';

export default function Social() {

  return (
    <>
      {/* Header */}
      <section className="py-20 px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-9xl tracking-tight leading-[0.9] text-primary">
            עקבו אחריי.
          </h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-8">
            בואו לקבל הצצה אל מאחורי הקלעים, תהליכי עבודה מהשטח, והשראה יומיומית לעיצוב הבית שלכם.
          </p>
        </div>
      </section>

      {/* Social Hub */}
      <section className="pb-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Instagram */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between border-b border-outline/20 pb-4">
                <div className="flex items-center gap-4">
                  <svg className="w-8 h-8 fill-primary" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <h2 className="font-headline font-black text-2xl text-primary">Instagram @tahlgoren</h2>
                </div>
                <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noopener noreferrer" className="font-label text-[10px] uppercase tracking-widest font-bold text-secondary hover:text-primary transition-colors">מעבר לפרופיל</a>
              </div>

              {/* Reels Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {siteData.instagramReels.map((reel) => (
                  <a
                    key={reel.id}
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-[9/16] overflow-hidden bg-surface-container"
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

            {/* sidebar links */}
            <div className="space-y-12">
              {/* Facebook */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-outline/20 pb-4">
                  <svg className="w-8 h-8 fill-primary" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V7.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <h2 className="font-headline font-black text-2xl text-primary">Facebook</h2>
                </div>
                <div className="space-y-4">
                  <p className="font-body text-secondary text-sm leading-relaxed">
                    הצטרפו לקהילה שלי בפייסבוק - דיונים על עיצוב, שיתופים מתוך תהליכי תכנון, ומאמרים מקצועיים.
                  </p>
                  <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-8 py-3 font-headline font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">עקבו בפייסבוק</a>
                </div>
              </div>

              {/* YouTube */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-outline/20 pb-4">
                  <svg className="w-8 h-8 fill-primary" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <h2 className="font-headline font-black text-2xl text-primary">YouTube</h2>
                </div>
                <div className="space-y-4">
                  <p className="font-body text-secondary text-sm leading-relaxed">
                    ערוץ היוטיוב שלי מציג סרטוני תדמית, ראיונות מקצועיים ומבטים פנורמיים על פרויקטים נבחרים.
                  </p>
                  <a href="https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-8 py-3 font-headline font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">צפו ביוטיוב</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
