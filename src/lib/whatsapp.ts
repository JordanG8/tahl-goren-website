export const WHATSAPP_NUMBER = "972528345799";
export const PHONE_DISPLAY = "052-8345799";
export const PHONE_HREF = "tel:0528345799";

/**
 * Every WhatsApp CTA on the site opens the chat with a message already typed
 * in. The pre-filled text is what turns a cold tap into a qualified lead —
 * it tells Tahl where the visitor came from and what they were looking at.
 */
export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
