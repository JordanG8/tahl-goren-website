import type { Report, QuizLead } from "./schema";

/**
 * Delivery for the feasibility report.
 *
 * The existing `sendNotificationEmail` helper only ever mails the site owner —
 * its recipient list is fixed in env. This sends to the *lead*, with the PDF
 * attached, so it needs its own path rather than a widened version of that one
 * (a helper that can be pointed at an arbitrary address is a helper that can be
 * turned into an open relay by a bad caller).
 */

const escapeHtml = (input: string) =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Same env var, and the same default shape, as `sendNotificationEmail` — the
 * two senders should never disagree about who the site sends mail as. The old
 * default here was `onboarding@resend.dev`, which is Resend's sandbox address
 * and is not a valid Brevo sender at all.
 */
const FROM =
  process.env.CONTACT_FROM_EMAIL ?? "טל גורן אדריכלית <tahl.goren.arch@gmail.com>";

type SendArgs = {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachment?: { filename: string; content: string };
};

async function send(args: SendArgs): Promise<{ ok: boolean; error?: string }> {
  const brevoKey = process.env.BREVO_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  // Brevo is tried first, for the reason given in sendNotificationEmail: its
  // senders are verified by emailed code rather than by DNS, so it can mail
  // anyone. Resend on an unverified domain will only deliver to the account
  // owner's own address — which is invisible on the contact form, because that
  // form only ever mails the owner, but fatal here, where the whole point is to
  // send a report to whoever filled the thing in.
  try {
    if (brevoKey) {
      const match = FROM.match(/^\s*(.*?)\s*<\s*([^>]+)\s*>\s*$/);
      const sender = match
        ? { name: match[1] || "טל גורן אדריכלית", email: match[2] }
        : { name: "טל גורן אדריכלית", email: FROM.trim() };
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "api-key": brevoKey,
        },
        body: JSON.stringify({
          sender,
          to: args.to.map((email) => ({ email })),
          subject: args.subject,
          htmlContent: args.html,
          ...(args.replyTo ? { replyTo: { email: args.replyTo } } : {}),
          ...(args.attachment
            ? { attachment: [{ name: args.attachment.filename, content: args.attachment.content }] }
            : {}),
        }),
      });
      if (!res.ok) return { ok: false, error: `brevo ${res.status} ${await res.text()}` };
      return { ok: true };
    }

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: FROM,
          to: args.to,
          reply_to: args.replyTo,
          subject: args.subject,
          html: args.html,
          attachments: args.attachment
            ? [{ filename: args.attachment.filename, content: args.attachment.content }]
            : undefined,
        }),
      });
      if (!res.ok) return { ok: false, error: `resend ${res.status} ${await res.text()}` };
      return { ok: true };
    }

    return { ok: false, error: "no_provider_configured" };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

const shekels = (n: number) => `${n.toLocaleString("he-IL")} ₪`;

function leadHtml(report: Report, lead: QuizLead) {
  const greeting = lead.name ? `${escapeHtml(lead.name)},` : "שלום,";
  const hasCosts = report.costs.lines.length > 0;

  return `<!doctype html>
<html dir="rtl" lang="he"><body style="margin:0;padding:0;background:#FBFAF8;">
  <div style="max-width:600px;margin:0 auto;padding:40px 28px;font-family:Assistant,Arial,sans-serif;color:#3A4C59;direction:rtl;text-align:right;">
    <div style="border-bottom:3px solid #A96F57;padding-bottom:18px;margin-bottom:32px;">
      <div style="font-size:22px;font-weight:700;color:#2E4250;">טל גורן · אדריכלות ועיצוב פנים</div>
    </div>

    <p style="font-size:18px;line-height:1.7;margin:0 0 18px;color:#2E4250;font-weight:700;">${greeting}</p>

    <p style="font-size:16px;line-height:1.85;margin:0 0 18px;">
      תודה שמילאתם את השאלון. מצורף כאן דוח ההיתכנות האישי שלכם —
      הערכה ראשונית של עלויות, לוח זמנים ריאלי לכל שלב, ומסלול הליווי שנראה מתאים לכם.
    </p>

    <p style="font-size:16px;line-height:1.85;margin:0 0 26px;">${escapeHtml(report.summary)}</p>

    ${
      hasCosts
        ? `<table style="width:100%;border-collapse:collapse;margin:0 0 26px;">
        <tr>
          <td style="padding:16px 0;border-top:1px solid #DDD6CB;border-bottom:1px solid #DDD6CB;">
            <div style="font-size:13px;letter-spacing:0.1em;color:#93A0A8;">הערכת עלות כוללת</div>
            <div style="font-size:22px;font-weight:700;color:#2E4250;margin-top:6px;">
              ${shekels(report.costs.total.low)} – ${shekels(report.costs.total.high)}
            </div>
            <div style="font-size:13px;color:#93A0A8;margin-top:6px;">הערכה ראשונית, לא הצעת מחיר</div>
          </td>
        </tr>
      </table>`
        : ""
    }

    <div style="margin:0 0 26px;">
      <div style="font-size:13px;letter-spacing:0.1em;color:#93A0A8;">מסלול הליווי המתאים</div>
      <div style="font-size:17px;font-weight:700;color:#2E4250;margin-top:6px;">${escapeHtml(report.track.name)}</div>
      <div style="font-size:15px;line-height:1.7;margin-top:6px;">${escapeHtml(report.track.subtitle)}</div>
    </div>

    <p style="font-size:16px;line-height:1.85;margin:0 0 30px;">
      הדוח נועד לתת נקודת פתיחה, לא להחליף שיחה. אם תרצו, נשב לפגישת היכרות קצרה
      ללא עלות ונעבור על המספרים מול המגרש והצרכים האמיתיים שלכם.
    </p>

    <a href="https://talgoren.co.il/contact"
       style="display:inline-block;background:#2E4250;color:#ffffff;text-decoration:none;padding:16px 32px;font-size:15px;font-weight:700;letter-spacing:0.06em;">
      לקביעת פגישת ייעוץ
    </a>

    <div style="margin-top:36px;padding-top:22px;border-top:1px solid #DDD6CB;font-size:14px;line-height:1.8;color:#93A0A8;">
      טל גורן, אדריכלית רשויה ומורשית היתר<br>
      <a href="tel:0528345799" style="color:#A96F57;text-decoration:none;">052-8345799</a> ·
      <a href="https://talgoren.co.il" style="color:#A96F57;text-decoration:none;">talgoren.co.il</a>
    </div>
  </div>
</body></html>`;
}

function ownerHtml(report: Report, lead: QuizLead) {
  const rows = report.profile
    .map(
      (p) =>
        `<tr><td style="padding:7px 0;border-bottom:1px solid #eee;font-size:15px;">${escapeHtml(p)}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;direction:rtl;text-align:right;color:#2E4250;">
    <h2 style="margin:0 0 6px;">ליד חדש מהשאלון באתר</h2>
    <p style="color:#666;margin:0 0 20px;font-size:14px;">
    </p>

    <p style="font-size:16px;">
      <strong>שם:</strong> ${escapeHtml(lead.name || "—")}<br>
      <strong>אימייל:</strong> ${escapeHtml(lead.email)}<br>
      <strong>טלפון:</strong> ${escapeHtml(lead.phone || "—")}
    </p>

    <h3 style="margin:24px 0 8px;">התשובות</h3>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>

    <h3 style="margin:24px 0 8px;">מה נשלח אליהם</h3>
    <p style="font-size:15px;line-height:1.7;">${escapeHtml(report.summary)}</p>
    <p style="font-size:15px;">
      <strong>מסלול מומלץ:</strong> ${escapeHtml(report.track.name)}<br>
      ${
        report.costs.total.high
          ? `<strong>הערכת עלות:</strong> ${shekels(report.costs.total.low)} – ${shekels(report.costs.total.high)}`
          : ""
      }
    </p>
  </div>`;
}

export async function deliverReport(
  report: Report,
  lead: QuizLead,
  pdf: Uint8Array | null,
): Promise<{ leadEmailed: boolean; ownerNotified: boolean; error?: string }> {
  const attachment = pdf
    ? {
        filename: "דוח-היתכנות-טל-גורן.pdf",
        content: Buffer.from(pdf).toString("base64"),
      }
    : undefined;

  const toLead = await send({
    to: [lead.email],
    subject: "דוח ההיתכנות שלכם — טל גורן אדריכלית",
    html: leadHtml(report, lead),
    replyTo: "tahl.goren.arch@gmail.com",
    attachment,
  });

  const owners = (process.env.CONTACT_TO_EMAIL ?? "tahl.goren.arch@gmail.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const toOwner = await send({
    to: owners,
    subject: `ליד חדש מהשאלון: ${lead.name || lead.email}`,
    html: ownerHtml(report, lead),
    replyTo: lead.email,
    attachment,
  });

  return {
    leadEmailed: toLead.ok,
    ownerNotified: toOwner.ok,
    error: toLead.error ?? toOwner.error,
  };
}
