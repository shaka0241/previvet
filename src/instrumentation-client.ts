import { canTrack, CONSENT_EVENT } from "./lib/consent";
import { initPostHogIfConsented } from "./lib/posthog-init";

try {
  // Solo inicializa si ya hay consentimiento previo. Sin opt-in, no se
  // crea ninguna cookie ni se envía nada a PostHog (Ley 1581 / LOPDP / LPDP / LFPDPPP).
  if (canTrack()) initPostHogIfConsented();

  if (typeof window !== "undefined") {
    window.addEventListener(CONSENT_EVENT, (e) => {
      try {
        if ((e as CustomEvent).detail === "accepted") initPostHogIfConsented();
      } catch {
        // no-op
      }
    });
  }
} catch {
  // Analytics nunca debe romper la app
}
