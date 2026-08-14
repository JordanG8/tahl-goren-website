"use client";

import Link from 'next/link';
import Image from 'next/image';
import { trackLead } from '@/lib/trackLead';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/ui/Icon';

const NAV = [
  { href: '/projects', label: 'פרויקטים' },
  { href: '/about', label: 'אודות' },
  { href: '/services', label: 'שירותים' },
  { href: '/packages', label: 'מסלולים ומחירים' },
  { href: '/articles', label: 'מאמרים' },
  { href: '/faq', label: 'שאלות ותשובות' },
];

const SOCIAL = [
  { href: 'https://www.instagram.com/tahlgoren/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/tahlgoren', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://www.youtube.com/channel/UCme0hzUzQzMlsqO394pF3mg/', label: 'YouTube', Icon: YoutubeIcon },
];

/**
 * Footer — the colophon.
 *
 * Set on ink rather than on another pale grey band, so the page has a definite
 * end instead of trailing off into a fourth shade of the same colour.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-ink-deep text-white">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 py-20 lg:py-24">
          {/* Identity */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-v2.png"
                alt="TAL GOREN ARCHITECTS"
                width={220}
                height={74}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="font-body text-white/60 leading-relaxed mt-7 measure-tight">
              ליווי מקצועי ואישי לחוויית בנייה רגועה. תכנון אדריכלי חכם לבית שגדל
              עם המשפחה — למעלה מ-25 שנות ניסיון.
            </p>
            <div className="flex gap-5 mt-8">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Icon size={19} title={label} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h2 className="font-label text-[10px] uppercase tracking-[0.28em] text-white/40">ניווט</h2>
            <ul className="mt-6 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-[15px] text-white/70 hover:text-white transition-colors duration-300 link-quiet"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="font-label text-[10px] uppercase tracking-[0.28em] text-white/40">יצירת קשר</h2>
            <div className="mt-6 space-y-3 font-body text-[15px]">
              <a
                href="tel:0528345799"
                onClick={() => trackLead('phone', { placement: 'footer' })}
                className="block text-white/70 hover:text-white transition-colors duration-300"
              >
                052-8345799
              </a>
              <a
                href="mailto:tahl.goren.arch@gmail.com"
                className="block text-white/70 hover:text-white transition-colors duration-300 break-all"
              >
                tahl.goren.arch@gmail.com
              </a>
              <p className="text-white/50">רחוב האלה 22, גבעת עדה</p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-3.5 mt-8 font-headline font-bold text-[12px] uppercase tracking-[0.18em] hover:bg-white hover:text-primary transition-colors duration-500"
            >
              לפגישת ייעוץ
            </Link>
          </div>
        </div>

        <div className="border-t border-white/12 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-label text-[10px] tracking-[0.2em] text-white/35 uppercase text-center">
            &copy; {new Date().getFullYear()} TAL GOREN ARCHITECTS
          </span>
          <div className="flex flex-wrap justify-center gap-6 font-label text-[10px] tracking-[0.2em] uppercase">
            <Link href="/privacy" className="text-white/35 hover:text-white transition-colors">מדיניות פרטיות</Link>
            <Link href="/accessibility" className="text-white/35 hover:text-white transition-colors">הצהרת נגישות</Link>
            <Link href="/terms" className="text-white/35 hover:text-white transition-colors">תנאי שימוש</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
