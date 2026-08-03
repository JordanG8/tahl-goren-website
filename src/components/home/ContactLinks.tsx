"use client";

import { trackLead } from "@/lib/trackLead";
import { PHONE_HREF, waLink } from "@/lib/whatsapp";

type Props = {
  /** Pre-filled WhatsApp message. Also what identifies the CTA in analytics. */
  message?: string;
  placement: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * The page is a server component, but every contact CTA has to report itself
 * to PostHog — so the links themselves are the client boundary. Keeping them
 * this small means the rest of the homepage still ships as static HTML.
 */
export function WhatsAppLink({ message = "", placement, className, style, children }: Props) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackLead("whatsapp", { placement })}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

export function PhoneLink({
  placement,
  className,
  style,
  children,
}: Omit<Props, "message">) {
  return (
    <a
      href={PHONE_HREF}
      onClick={() => trackLead("phone", { placement })}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
