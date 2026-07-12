"use client";

import Link from 'next/link';
import { trackLead } from '@/lib/trackLead';

type Props = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  className?: string;
};

export default function CtaSection({
  title = 'מוכנים לצאת לדרך?',
  subtitle = 'הצעד הראשון לבית החלומות שלכם מתחיל בשיחה. פגישת ייעוץ ראשונה ללא עלות.',
  primaryLabel = 'לקביעת פגישת ייעוץ',
  primaryHref = '/contact',
  className = '',
}: Props) {
  return (
    <section className={`py-20 lg:py-28 bg-surface-container-low relative overflow-hidden border-y border-outline/10 ${className}`}>
      <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
        <h2 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-primary mb-5 tracking-tight">{title}</h2>
        <p className="font-body text-lg text-secondary mb-10 max-w-xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href={primaryHref}
            className="bg-primary text-white px-10 py-4 font-headline font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity animate-contact-glow-scale"
            style={{ '--glow-color': 'rgba(169, 111, 87, 0.7)' } as React.CSSProperties}
          >
            {primaryLabel}
          </Link>
          <div className="flex gap-6">
            <a href="tel:0528345799" onClick={() => trackLead('phone', { placement: 'cta_section' })} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-label text-sm">
              <span className="material-symbols-outlined text-lg">call</span>052-8345799
            </a>
            <a href="https://wa.me/972528345799" target="_blank" rel="noreferrer" onClick={() => trackLead('whatsapp', { placement: 'cta_section' })} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-label text-sm">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
