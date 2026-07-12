"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { trackLead } from '@/lib/trackLead';

const navLinks = [
  { to: '/', label: 'עמוד הבית', icon: 'home' },
  { to: '/projects', label: 'פרויקטים', icon: 'apartment' },
  { to: '/about', label: 'אודות', icon: 'person' },
  { to: '/services', label: 'שירותים', icon: 'design_services' },
  { to: '/articles', label: 'מאמרים', icon: 'menu_book' },
  { to: '/faq', label: 'שאלות ותשובות', icon: 'quiz' },
  { to: '/videos', label: 'סרטונים', icon: 'play_circle' },
  { to: '/testimonials', label: 'לקוחות מספרים', icon: 'star' },
];

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-400 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div
        className={`absolute inset-0 h-[100dvh] w-full bg-background flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-y-0' : '-translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-outline/15 shrink-0">
          <Link href="/" onClick={onClose} className="flex items-center">
            <Image
              src="/images/logo-v2.png"
              alt="TAL GOREN"
              width={210}
              height={68}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="סגירת תפריט"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-primary/5 border border-primary/15 hover:bg-primary/10 transition-all duration-300 hover:rotate-90"
          >
            <span className="material-symbols-outlined text-primary text-2xl">close</span>
          </button>
        </div>

        {/* Nav grid — sized to fit a single screen, no scrolling */}
        <nav className="flex-1 min-h-0 grid grid-cols-2 auto-rows-fr gap-3 content-center px-6 py-6">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                href={link.to}
                onClick={onClose}
                className={`flex flex-col items-start justify-center gap-2 py-5 px-5 border transition-all duration-400 ${
                  isActive ? 'border-primary/30 bg-primary/5 text-primary' : 'border-outline/15 text-secondary hover:border-primary/25 hover:text-primary'
                }`}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.4s ease ${0.08 + i * 0.04}s, transform 0.4s ease ${0.08 + i * 0.04}s, border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease`,
                }}
              >
                <span className="material-symbols-outlined text-2xl">{link.icon}</span>
                <span className="font-headline font-bold text-base leading-tight">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer: CTA + quick actions + legal */}
        <div
          className="shrink-0 px-6 pb-6 pt-2 space-y-3 border-t border-outline/15"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.5s ease 0.4s',
          }}
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3.5 px-8 font-headline font-bold text-sm uppercase tracking-[0.15em] hover:bg-tertiary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">call</span>
            צור קשר
          </Link>

          <div className="flex gap-3">
            <a
              href="https://wa.me/972528345799"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLead('whatsapp', { placement: 'mobile_menu' })}
              className="flex-1 flex items-center justify-center gap-2 border border-outline/20 text-secondary py-2.5 font-body text-sm hover:border-primary/30 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              WhatsApp
            </a>
            <a
              href="tel:0528345799"
              onClick={() => trackLead('phone', { placement: 'mobile_menu' })}
              className="flex-1 flex items-center justify-center gap-2 border border-outline/20 text-secondary py-2.5 font-body text-sm hover:border-primary/30 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              052-8345799
            </a>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-4">
              <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V7.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
            <div className="flex gap-3 font-label text-[10px] tracking-wide text-secondary/50">
              <Link href="/privacy" onClick={onClose} className="hover:text-primary transition-colors">פרטיות</Link>
              <Link href="/terms" onClick={onClose} className="hover:text-primary transition-colors">תנאי שימוש</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
