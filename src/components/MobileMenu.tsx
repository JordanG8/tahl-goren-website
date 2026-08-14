"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { trackLead } from '@/lib/trackLead';
import {
  CloseIcon,
  PhoneIcon,
  ChatIcon,
  ArrowIcon,
  InstagramIcon,
  FacebookIcon,
} from '@/components/ui/Icon';

const navLinks = [
  { to: '/', label: 'עמוד הבית' },
  { to: '/quiz', label: 'בדיקת היתכנות' },
  { to: '/projects', label: 'פרויקטים' },
  { to: '/about', label: 'אודות' },
  // "מסלולים ומחירים" now lives inside the Services page rather than the top nav.
  { to: '/services', label: 'שירותים' },
  { to: '/articles', label: 'מאמרים' },
  { to: '/faq', label: 'שאלות ותשובות' },
  { to: '/videos', label: 'סרטונים' },
  { to: '/testimonials', label: 'לקוחות מספרים' },
];

/**
 * Mobile navigation.
 *
 * Was a two-column grid of bordered tiles, each carrying a Material icon that
 * added no information ("person" next to אודות) and, until the icon font
 * loaded, rendered the literal word "person" instead. It is now a ruled index:
 * numbered entries on hairlines, set large enough to be an easy target, which
 * matches how the rest of the site organises a list.
 */
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

  // Escape closes the sheet — it covers the whole screen, so a keyboard or
  // switch user otherwise has to tab all the way to the close button.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-500 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 h-[100dvh] w-full bg-background flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-y-0' : '-translate-y-3'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-hairline shrink-0">
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
            className="w-11 h-11 flex items-center justify-center border border-hairline text-primary hover:bg-surface-container-low transition-colors duration-300"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Ruled index — fits one screen without scrolling */}
        <nav className="flex-1 min-h-0 flex flex-col justify-center px-6 overflow-y-auto">
          <ul>
            {navLinks.map((link, i) => {
              const isActive = pathname === link.to;
              return (
                <li key={link.to} className="border-b border-hairline last:border-b-0">
                  <Link
                    href={link.to}
                    onClick={onClose}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group flex items-baseline gap-4 py-4 transition-colors duration-300 ${
                      isActive ? 'text-clay' : 'text-primary'
                    }`}
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
                      transition: `opacity 0.5s var(--ease-quiet) ${0.1 + i * 0.045}s, transform 0.5s var(--ease-quiet) ${0.1 + i * 0.045}s, color 0.3s ease`,
                    }}
                  >
                    <span className="font-label font-medium text-[13px] tracking-[0.14em] text-ink-mute w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-headline font-bold text-2xl leading-none flex-1">
                      {link.label}
                    </span>
                    <ArrowIcon
                      size={18}
                      className="text-ink-mute transition-transform duration-500 group-hover:-translate-x-1"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer: CTA + quick actions + legal */}
        <div
          className="shrink-0 px-6 pb-6 pt-4 space-y-3 border-t border-hairline"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.6s ease 0.45s',
          }}
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2.5 w-full bg-primary text-white py-4 px-8 font-headline font-bold text-[13px] uppercase tracking-[0.13em] hover:bg-clay transition-colors duration-500"
          >
            <PhoneIcon size={16} />
            לשיחת ייעוץ ללא עלות
          </Link>

          <div className="flex gap-3">
            <a
              href="https://wa.me/972528345799"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLead('whatsapp', { placement: 'mobile_menu' })}
              className="flex-1 flex items-center justify-center gap-2 border border-hairline text-secondary py-3 font-body text-sm hover:border-primary/40 hover:text-primary transition-colors"
            >
              <ChatIcon size={16} />
              WhatsApp
            </a>
            <a
              href="tel:0528345799"
              onClick={() => trackLead('phone', { placement: 'mobile_menu' })}
              className="flex-1 flex items-center justify-center gap-2 border border-hairline text-secondary py-3 font-body text-sm hover:border-primary/40 hover:text-primary transition-colors"
            >
              <PhoneIcon size={16} />
              052-8345799
            </a>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-5">
              <a href="https://www.instagram.com/tahlgoren/" target="_blank" rel="noreferrer" className="text-ink-mute hover:text-primary transition-colors">
                <InstagramIcon size={16} title="Instagram" />
              </a>
              <a href="https://www.facebook.com/tahlgoren" target="_blank" rel="noreferrer" className="text-ink-mute hover:text-primary transition-colors">
                <FacebookIcon size={16} title="Facebook" />
              </a>
            </div>
            <div className="flex gap-4 font-label font-medium text-[13px] tracking-wide text-ink-mute">
              <Link href="/privacy" onClick={onClose} className="hover:text-primary transition-colors">פרטיות</Link>
              <Link href="/terms" onClick={onClose} className="hover:text-primary transition-colors">תנאי שימוש</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
