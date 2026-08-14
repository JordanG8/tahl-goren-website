"use client";

import { trackLead } from '@/lib/trackLead';
import Reveal from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/Section';
import { PhoneIcon, ChatIcon } from '@/components/ui/Icon';

type Props = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  className?: string;
};

/**
 * The closing invitation on inner pages.
 *
 * Deliberately the quiet counterpart to the ink `HomeCtaForm` band: laid out on
 * the reading edge between two hairlines, with the direct-contact options as
 * plain text beside the button. It used to be a centred grey box whose button
 * pulsed and scaled every few seconds — on pages that already end with a
 * contact form, that read as a second, louder ask.
 */
export default function CtaSection({
  title = 'מוכנים לצאת לדרך?',
  subtitle = 'הצעד הראשון לבית החלומות שלכם מתחיל בשיחה. פגישת ייעוץ ראשונה ללא עלות.',
  primaryLabel = 'לקביעת פגישת ייעוץ',
  primaryHref = '/contact',
  className = '',
}: Props) {
  return (
    <section className={`bg-background border-t border-hairline ${className}`}>
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-24">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <span className="rule-draw block h-px w-12 bg-clay mb-7" />
            <h2 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight leading-[1.08]">
              {title}
            </h2>
            <p className="font-body text-lg text-secondary mt-5 measure leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <a
                href="tel:0528345799"
                onClick={() => trackLead('phone', { placement: 'cta_section' })}
                className="flex items-center gap-2.5 text-secondary hover:text-primary transition-colors font-label text-sm"
              >
                <PhoneIcon size={16} />
                052-8345799
              </a>
              <a
                href="https://wa.me/972528345799"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackLead('whatsapp', { placement: 'cta_section' })}
                className="flex items-center gap-2.5 text-secondary hover:text-primary transition-colors font-label text-sm"
              >
                <ChatIcon size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
