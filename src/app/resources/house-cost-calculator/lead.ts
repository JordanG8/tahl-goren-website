/**
 * The details a visitor gives before the calculator opens.
 *
 * Kept in one place because three components and the API all speak about the
 * same four fields, and because the storage below is a promise: we remember the
 * visitor on their own device so a second visit does not ask again.
 *
 * The store is exposed through `useSyncExternalStore` rather than an effect.
 * `localStorage` does not exist while the page is rendered on the server, so
 * the server snapshot is deliberately "not read yet" — the page holds an empty
 * frame for it — and the client snapshot is read once, lazily, and cached.
 */

export type CalculatorLead = {
  name: string;
  email: string;
  /** The town they plan to build in, free text — Israel has too many to list. */
  city: string;
  /** Permission to email the calculation once. Always true once given. */
  consent: true;
};

/** `ready` is false only before the browser has had a chance to look. */
export type LeadState = { ready: boolean; lead: CalculatorLead | null };

const KEY = "tg-calculator-lead";

const SERVER_STATE: LeadState = { ready: false, lead: null };

let clientState: LeadState | null = null;
const listeners = new Set<() => void>();

/** Reads a lead saved on a previous visit. Storage can throw, so it never does. */
function read(): CalculatorLead | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const { name, email, city, consent } = parsed as Record<string, unknown>;
    if (typeof name !== "string" || typeof email !== "string" || typeof city !== "string") return null;
    if (consent !== true || !name.trim() || !email.trim() || !city.trim()) return null;
    return { name, email, city, consent: true };
  } catch {
    return null;
  }
}

export function subscribeLead(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getLeadSnapshot(): LeadState {
  // Cached, because useSyncExternalStore compares snapshots by identity and a
  // fresh object every call would loop forever.
  if (!clientState) clientState = { ready: true, lead: read() };
  return clientState;
}

export function getServerLeadSnapshot(): LeadState {
  return SERVER_STATE;
}

export function saveLead(lead: CalculatorLead) {
  clientState = { ready: true, lead };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lead));
  } catch {
    // A visitor with storage blocked simply fills the form again next time.
  }
  for (const listener of listeners) listener();
}
