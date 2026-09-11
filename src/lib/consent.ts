export const CONSENT_KEY = "vetline-analytics-consent";
export const CONSENT_EVENT = "vetline:consent-changed";

export type AnalyticsConsent = "accepted" | "rejected" | null;

export function getConsent(): AnalyticsConsent {
  if (typeof window === "undefined" || typeof localStorage === "undefined")
    return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "rejected"): void {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // storage lleno/bloqueado: el banner volverá a mostrarse, no rompe nada
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  } catch {
    // no-op
  }
}

export function canTrack(): boolean {
  return getConsent() === "accepted";
}

export function clearPosthogStorage(): void {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && (k.includes("_posthog") || k.includes("posthog")))
        localStorage.removeItem(k);
    }
  } catch {
    // no-op
  }
  try {
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0]?.trim() ?? "";
      if (name.includes("_posthog") || name.includes("posthog")) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      }
    }
  } catch {
    // no-op
  }
}
