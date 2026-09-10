import posthog from "posthog-js";
import { canTrack } from "./consent";

let initialized = false;

export function initPostHogIfConsented(): boolean {
  try {
    if (initialized || !canTrack() || posthog.__loaded) return posthog.__loaded;
    const token =
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
      process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
    if (!token) return false;
    posthog.init(token, {
      api_host: host,
      defaults: "2026-05-30",
      // El pageview lo captura PostHogPageview en cada cambio de ruta
      // (evita doble $pageview en la carga inicial del App Router).
      capture_pageview: false,
      persistence: "localStorage+cookie",
    });
    initialized = true;
    return true;
  } catch {
    return false;
  }
}

export function optOutPostHog(): void {
  try {
    if (posthog.__loaded) posthog.opt_out_capturing();
  } catch {
    // no-op
  }
}
