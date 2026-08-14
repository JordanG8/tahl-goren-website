"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import { PhoneIcon, MenuIcon, InstagramIcon, FacebookIcon } from '@/components/ui/Icon';

const desktopLinks = [
  { to: '/projects', label: 'פרויקטים' },
  { to: '/about', label: 'אודות' },
  // "מסלולים ומחירים" now lives inside the Services page rather than the top nav.
  { to: '/services', label: 'שירותים' },
  { to: '/articles', label: 'מאמרים' },
  { to: '/faq', label: 'שאלות ותשובות' },
  { to: '/testimonials', label: 'לקוחות מספרים' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const transparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 w-full z-50 transition-[background-color,border-color,box-shadow] duration-700 ${
          transparent
            ? 'bg-transparent border-b border-transparent'
            : isScrolled
              ? 'bg-background/92 backdrop-blur-md border-b border-hairline'
              : 'bg-background border-b border-hairline'
        }`}
      >
        <div className={`flex justify-between items-center px-6 sm:px-8 lg:px-12 max-w-[1920px] mx-auto ${isHome ? '' : 'transition-all duration-500'} ${isScrolled ? 'py-2.5' : 'py-4'}`}>
          {/* Right side (reading edge): logo + primary navigation */}
          <div className="flex items-center gap-8 flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="טל גורן אדריכלית — לדף הבית">
              <Image
                id="site-logo-navbar"
                src="/images/logo-v2.png"
                alt="TAL GOREN"
                width={280}
                height={94}
                className={`w-auto object-contain transition-all duration-500 ${
                  isScrolled ? 'h-9 sm:h-10' : 'h-12 sm:h-16'
                } ${transparent ? 'brightness-0 invert drop-shadow-md' : ''}`}
                priority
              />
            </Link>

            <div className={`hidden lg:block w-px transition-all duration-500 ${isScrolled ? 'h-7' : 'h-10'} ${transparent ? 'bg-white/25' : 'bg-hairline'}`} />

            {/* Nav labels are set in the label face at a small size with wide
                tracking, not in bold uppercase headline type. The previous
                version also re-tracked each label on hover, which nudged every
                item in the bar; the underline alone carries the state now. */}
            <div className="hidden lg:flex gap-9 items-center font-label font-medium text-[13px] tracking-[0.06em]">
              {desktopLinks.map((link) => {
                const isActive = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative group py-1.5 transition-colors duration-500 ${
                      transparent
                        ? isActive ? 'text-white' : 'text-white/75 hover:text-white'
                        : isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 right-0 h-px transition-all duration-500 ${
                        transparent ? 'bg-white' : 'bg-clay'
                      } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Left side: socials + CTA + hamburger */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className={`hidden lg:flex items-center gap-4 border-e pe-5 transition-colors duration-500 ${transparent ? 'border-white/25' : 'border-hairline'}`}>
              <a
                href="https://www.facebook.com/tahlgoren"
                target="_blank"
                rel="noreferrer"
                className={`transition-colors duration-300 ${transparent ? 'text-white/70 hover:text-white' : 'text-ink-mute hover:text-primary'}`}
              >
                <FacebookIcon size={17} title="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/tahlgoren/"
                target="_blank"
                rel="noreferrer"
                className={`transition-colors duration-300 ${transparent ? 'text-white/70 hover:text-white' : 'text-ink-mute hover:text-primary'}`}
              >
                <InstagramIcon size={17} title="Instagram" />
              </a>
            </div>

            <Link
              href="/contact"
              className={`flex items-center gap-2 font-headline font-bold text-[13px] sm:text-xs uppercase tracking-[0.13em] transition-colors duration-500 px-5 sm:px-8 py-2.5 sm:py-3 ${
                transparent
                  ? 'border border-white/60 text-white hover:bg-white hover:text-primary backdrop-blur-[2px]'
                  : 'bg-primary text-white hover:bg-clay animate-contact-glow-scale'
              }`}
              style={!transparent ? ({ '--glow-color': 'rgba(169, 111, 87, 0.28)' } as React.CSSProperties) : undefined}
            >
              <PhoneIcon size={15} />
              <span>צור קשר</span>
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="פתיחת תפריט"
              className={`lg:hidden flex items-center justify-center w-11 h-11 border transition-colors duration-300 active:scale-95 ${
                transparent
                  ? 'border-white/45 text-white hover:bg-white/10'
                  : 'border-hairline text-primary hover:bg-surface-container-low'
              }`}
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
