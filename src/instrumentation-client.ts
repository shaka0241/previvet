import posthog from "posthog-js";

try {
  const token =
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
    process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  if (token) {
    posthog.init(token, {
      api_host: host,
      defaults: "2026-05-30",
      // El pageview lo captura PostHogPageview en cada cambio de ruta
      // (evita doble $pageview en la carga inicial del App Router).
      capture_pageview: false,
    });
  }
} catch {
  // Analytics nunca debe romper la app
}
