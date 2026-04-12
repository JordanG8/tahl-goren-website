export default function FloatingBar() {
  return (
    <>
      {/* Mobile: full-width bottom bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 w-full h-[10vh] bg-black z-[60] flex">
        <a
          href="https://wa.me/972528345799"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 text-white hover:bg-white/10 transition-colors border-e border-white/20"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
          <span className="font-body font-semibold text-sm">WhatsApp</span>
        </a>
        <a
          href="tel:0528345799"
          className="flex-1 flex items-center justify-center gap-2 text-white hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">call</span>
          <span className="font-body font-semibold text-sm">התקשרו</span>
        </a>
      </div>

      {/* Desktop: floating pill */}
      <div className="hidden sm:flex fixed bottom-8 right-8 z-[60] items-center bg-primary rounded-full px-6 py-3 gap-4 shadow-2xl hover:scale-105 transition-transform duration-300">
        <a href="https://wa.me/972528345799" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
          <span className="font-body font-semibold text-xs">WhatsApp</span>
        </a>
        <div className="w-px h-4 bg-white/20" />
        <a href="tel:0528345799" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined">call</span>
          <span className="font-body font-semibold text-xs">התקשרו</span>
        </a>
      </div>
    </>
  );
}
