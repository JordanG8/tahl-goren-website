type SendArgs = {
  subject: string;
  html: string;
  replyTo?: string;
};

export type SendResult = {
  delivered: boolean;
  provider: "brevo" | "resend" | "none";
  error?: string;
};

const DEFAULT_TO = "tahl.goren.arch@gmail.com";

// Accepts a comma-separated list, e.g. "tahl@…,jordan@…"
function recipients(): string[] {
  return (process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO)
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);
}

// "Name <addr@example.com>" or a bare address.
function parseSender(raw: string): { name: string; email: string } {
  const match = raw.match(/^\s*(.*?)\s*<\s*([^>]+)\s*>\s*$/);
  if (match) return { name: match[1] || "Tal Goren Site", email: match[2] };
  return { name: "Tal Goren Site", email: raw.trim() };
}

async function sendViaBrevo(apiKey: string, args: SendArgs): Promise<SendResult> {
  const sender = parseSender(
    process.env.CONTACT_FROM_EMAIL ?? "אתר טל גורן <tahl.goren.arch@gmail.com>",
  );

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender,
      to: recipients().map((email) => ({ email })),
      subject: args.subject,
      htmlContent: args.html,
      ...(args.replyTo ? { replyTo: { email: args.replyTo } } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return { delivered: false, provider: "brevo", error: `${res.status} ${detail}` };
  }
  return { delivered: true, provider: "brevo" };
}

async function sendViaResend(apiKey: string, args: SendArgs): Promise<SendResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Tal Goren Site <onboarding@resend.dev>",
      to: recipients(),
      reply_to: args.replyTo,
      subject: args.subject,
      html: args.html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return { delivered: false, provider: "resend", error: `${res.status} ${detail}` };
  }
  return { delivered: true, provider: "resend" };
}

/**
 * Sends a notification to the site owner. Prefers Brevo — its senders are
 * verified by emailed code rather than DNS, so it can reach any recipient
 * without owning the sending domain. Falls back to Resend when only that key
 * is configured.
 */
export async function sendNotificationEmail(args: SendArgs): Promise<SendResult> {
  const brevoKey = process.env.BREVO_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  try {
    if (brevoKey) return await sendViaBrevo(brevoKey, args);
    if (resendKey) return await sendViaResend(resendKey, args);
    return { delivered: false, provider: "none", error: "no_provider_configured" };
  } catch (err) {
    return {
      delivered: false,
      provider: brevoKey ? "brevo" : "resend",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
