import posthog from "posthog-js";

function safeCapture(event: string, properties?: Record<string, unknown>) {
  try {
    posthog.capture(event, properties);
  } catch {
    // Analytics nunca debe romper la conversión
  }
}

export function trackWhatsappClick(location: string) {
  safeCapture("whatsapp_click", { location });
}

export function trackSocialClick(network: "instagram" | "tiktok" | "email") {
  safeCapture("social_click", { network });
}

export function trackCtaClick(cta: string, location: string) {
  safeCapture("cta_click", { cta, location });
}
