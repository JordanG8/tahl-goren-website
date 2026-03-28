import { useEffect } from 'react';

export function useNavScroll() {
  useEffect(() => {
    const handler = () => {
      const nav = document.querySelector('nav');
      if (!nav) return;
      if (window.scrollY > 80) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}
