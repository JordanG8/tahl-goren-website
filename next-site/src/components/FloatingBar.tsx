export default function FloatingBar() {
  return (
    <div className="fixed bottom-8 right-8 z-[60] flex items-center bg-primary rounded-full px-6 py-3 gap-4 shadow-2xl hover:scale-105 transition-transform duration-300">
      <a href="https://wa.me/972528345799" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
        <span className="font-body font-semibold text-xs hidden sm:inline">WhatsApp</span>
      </a>
      <div className="w-px h-4 bg-white/20" />
      <a href="tel:0528345799" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
        <span className="material-symbols-outlined">call</span>
        <span className="font-body font-semibold text-xs hidden sm:inline">התקשרו</span>
      </a>
    </div>
  );
}
