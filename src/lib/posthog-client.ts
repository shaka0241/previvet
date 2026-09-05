// Cliente mínimo de PostHog (~1KB) vía Capture API.
// Evita los ~90KB gzip del SDK posthog-js para respetar el presupuesto
// de bundle del sitio. Cubre pageviews + eventos custom.
// Si a futuro se necesitan session replay, flags o autocapture,
// reinstalar posthog-js y subir el límite en scripts/check-bundle-size.mjs.

const DISTINCT_KEY = "ph_distinct_id";

function getDistinctId(): string {
  try {
    let id = localStorage.getItem(DISTINCT_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `anon-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(DISTINCT_KEY, id);
    }
    return id;
  } catch {
    return "anon-server";
  }
}

export function capture(
  event: string,
  properties?: Record<string, unknown>,
): void {
  try {
    const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!token) return;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
    const payload = {
      api_key: token,
      event,
      distinct_id: getDistinctId(),
      properties: {
        $current_url:
          typeof window !== "undefined" ? window.location.href : undefined,
        ...properties,
      },
      timestamp: new Date().toISOString(),
    };
    void fetch(`${host}/i/v0/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics nunca debe romper la app
  }
}
