import { capture } from "@/lib/posthog-client";

export function trackWhatsappClick(location: string) {
  capture("whatsapp_click", { location });
}

export function trackSocialClick(network: "instagram" | "tiktok" | "email") {
  capture("social_click", { network });
}

export function trackCtaClick(cta: string, location: string) {
  capture("cta_click", { cta, location });
}
