"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navCategories = [
  {
    label: 'ראשי',
    links: [
      { to: '/projects', label: 'פרויקטים' },
      { to: '/about', label: 'אודות' },
    ],
  },
  {
    label: 'תוכן',
    links: [
      { to: '/articles', label: 'מאמרים' },
      { to: '/faq', label: 'שאלות ותשובות' },
      { to: '/videos', label: 'סרטונים' },
    ],
  },
  {
    label: 'קהילה',
    links: [
      { to: '/testimonials', label: 'לקוחות מספרים' },
      { to: '/social', label: 'רשתות חברתיות' },
    ],
  },
];

const legalLinks = [
  { to: '/privacy', label: 'מדיניות פרטיות' },
  { to: '/terms', label: 'תנאי שימוש' },
];

// Precompute stagger indices for link animations
const navCategoriesWithIndices = navCategories.map((cat, catIdx) => {
  const baseIdx = navCategories
    .slice(0, catIdx)
    .reduce((sum, c) => sum + c.links.length, 0);
  return {
    ...cat,
    links: cat.links.map((link, linkIdx) => ({ ...link, staggerIdx: baseIdx + linkIdx })),
  };
});

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[70] transition-all duration-500 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`absolute inset-y-0 right-0 w-full max-w-[420px] bg-background flex flex-col shadow-2xl transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-outline/20">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/5 transition-all duration-500 hover:rotate-90"
          >
            <span className="material-symbols-outlined text-primary text-2xl">close</span>
          </button>
          <Link href="/" onClick={onClose} className="flex items-center">
            <Image 
              src="/images/logo-v2.png" 
              alt="TAL GOREN" 
              width={210} 
              height={68} 
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex-grow overflow-y-auto px-8 py-8">
          {/* Home button */}
          <div
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
            }}
          >
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full border border-primary/30 text-primary py-3 px-8 font-body text-base hover:bg-primary/5 transition-colors mb-8 text-right"
            >
              <span className="material-symbols-outlined text-base">home</span>
              עמוד הבית
            </Link>
          </div>

          {/* Categorised navigation */}
          <nav className="flex flex-col gap-7 text-right">
            {navCategoriesWithIndices.map((category, catIdx) => (
              <div key={category.label}>
                <span
                  className="block font-body text-[10px] uppercase tracking-[0.25em] text-secondary/50 mb-3"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.15 + catIdx * 0.1}s`,
                  }}
                >
                  {category.label}
                </span>
                <div className="flex flex-col gap-3">
                  {category.links.map((link) => {
                    const isActive = pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        href={link.to}
                        onClick={onClose}
                        className={`relative font-headline font-bold text-[1.5rem] leading-tight inline-block transition-all duration-500 group ${
                          isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                        }`}
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
                          transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.2 + link.staggerIdx * 0.06}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.2 + link.staggerIdx * 0.06}s, color 0.3s ease`,
                        }}
                      >
                        {link.label}
                        <span
                          className={`absolute bottom-[-4px] right-0 h-[2px] bg-secondary transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Divider */}
          <div
            className="h-px bg-outline/20 my-8 origin-right transition-transform duration-600"
            style={{
              transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: isOpen ? '0.85s' : '0s',
            }}
          />

          {/* Legal links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-end">
            {legalLinks.map((link, i) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={onClose}
                className="font-body text-sm text-secondary/60 hover:text-primary transition-colors"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.4s ease ${0.90 + i * 0.05}s, transform 0.4s ease ${0.90 + i * 0.05}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-8"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease 1.0s, transform 0.4s ease 1.0s',
            }}
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="block w-full text-center bg-primary text-white py-4 px-8 font-headline font-bold text-sm uppercase tracking-[0.2em] hover:bg-tertiary transition-colors"
            >
              צור קשר
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-6 border-t border-outline/20"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 0.95s, transform 0.5s ease 0.95s',
          }}
        >
          <div className="flex justify-center gap-6 mb-3">
            <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V7.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <div className="text-center font-body text-[11px] tracking-[0.15em] text-secondary/40">
            052-8345799 &middot; tahl.goren.arch@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
