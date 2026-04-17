export default function FloatingBar() {
  return (
    <>
      {/* Mobile: full-width bottom bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 w-full h-[10vh] bg-primary z-[60] flex shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <a
          href="https://wa.me/972528345799"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 text-white hover:bg-white/10 transition-colors border-e border-white/20"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
          <span className="font-headline font-bold text-sm">WhatsApp</span>
        </a>
        <a
          href="tel:0528345799"
          className="flex-1 flex items-center justify-center gap-2 text-white hover:bg-white/10 transition-colors border-e border-white/20"
        >
          <span className="material-symbols-outlined text-xl">call</span>
          <span className="font-headline font-bold text-sm">התקשרו</span>
        </a>
        <a
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 bg-white text-primary hover:bg-white/90 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">calendar_month</span>
          <span className="font-headline font-bold text-sm">פגישת ייעוץ</span>
        </a>
      </div>

      {/* Desktop: floating bar - more prominent */}
      <div className="hidden sm:flex fixed bottom-8 right-8 z-[60] items-center bg-primary rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105">
        <a href="/contact" className="flex items-center gap-2 text-primary bg-white hover:bg-white/90 transition-colors px-5 py-3.5 rounded-r-full font-headline font-bold text-xs tracking-wide">
          <span className="material-symbols-outlined text-lg">calendar_month</span>
          פגישת ייעוץ חינם
        </a>
        <a href="https://wa.me/972528345799" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity px-4 py-3.5">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
          <span className="font-body font-semibold text-xs">WhatsApp</span>
        </a>
        <div className="w-px h-4 bg-white/20" />
        <a href="tel:0528345799" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity px-4 py-3.5 rounded-l-full">
          <span className="material-symbols-outlined">call</span>
          <span className="font-body font-semibold text-xs">052-8345799</span>
        </a>
      </div>
    </>
  );
}
