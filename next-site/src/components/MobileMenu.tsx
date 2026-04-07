"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryLinks = [
  { to: '/projects', label: 'פרויקטים' },
  { to: '/process', label: 'תהליך העבודה' },
  { to: '/services', label: 'שירותים' },
  { to: '/about', label: 'אודות' },
  { to: '/testimonials', label: 'לקוחות מספרים' },
  { to: '/social', label: 'רשתות חברתיות' },
];

const secondaryLinks = [
  { to: '/articles', label: 'מאמרים' },
  { to: '/faq', label: 'שאלות ותשובות' },
  { to: '/videos', label: 'סרטונים' },
];

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
        <div className="flex justify-between items-center px-8 py-6 border-b border-outline/20">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/5 transition-all duration-500 hover:rotate-90"
          >
            <span className="material-symbols-outlined text-primary text-2xl">close</span>
          </button>
          <span className="text-xl font-bold text-primary tracking-tighter font-headline">TAL GOREN</span>
        </div>

        <div className="flex-grow overflow-y-auto px-8 py-10">
          <nav className="flex flex-col gap-5 text-right">
            {primaryLinks.map((link, i) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={onClose}
                  className={`relative font-headline font-bold text-[1.65rem] leading-tight inline-block transition-all duration-500 group ${
                    isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                  }`}
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.07}s, color 0.3s ease`,
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
          </nav>

          <div
            className="h-px bg-outline/20 my-8 origin-right transition-transform duration-600"
            style={{
              transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: isOpen ? '0.5s' : '0s',
            }}
          />

          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-end">
            {secondaryLinks.map((link, i) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={onClose}
                className="font-label text-sm tracking-wide text-secondary/60 hover:text-primary transition-colors"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.4s ease ${0.55 + i * 0.05}s, transform 0.4s ease ${0.55 + i * 0.05}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div
            className="mt-10"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease 0.72s, transform 0.4s ease 0.72s',
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

        <div
          className="px-8 py-6 border-t border-outline/20"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s',
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
          <div className="text-center font-label text-[11px] tracking-[0.15em] text-secondary/40">
            052-8345799 &middot; tahl.goren.arch@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
