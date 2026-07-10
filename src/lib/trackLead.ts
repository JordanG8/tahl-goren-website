import posthog from "posthog-js";

type LeadChannel = "phone" | "whatsapp" | "form";

export function trackLead(channel: LeadChannel, extra?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  posthog.capture("lead_click", {
    channel,
    source_page: window.location.pathname,
    ...extra,
  });
}
