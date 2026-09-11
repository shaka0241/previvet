import type { SocialLink } from "@/types";

export const CANONICAL_SITE_URL = "https://vetline-nutrition.com";

function resolveSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) return url.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "NEXT_PUBLIC_SITE_URL no está definida. Usando canónico https://vetline-nutrition.com. Fíjala en Vercel → Settings → Environment Variables (Production) para evitar esta advertencia.",
    );
  }
  return CANONICAL_SITE_URL;
}

const siteUrl = resolveSiteUrl();

export default siteUrl;

export const CONTACT_EMAIL = "vetlinenutrition@gmail.com";

export const INSTAGRAM_URL = "https://www.instagram.com/vetlinenutrition/";

export const TIKTOK_URL = "https://www.tiktok.com/@vetlinenutrition";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram de Vetline Nutrition",
    href: INSTAGRAM_URL,
  },
  {
    id: "tiktok",
    label: "TikTok de Vetline Nutrition",
    href: TIKTOK_URL,
  },
  {
    id: "email",
    label: "Correo de Vetline Nutrition",
    href: `mailto:${CONTACT_EMAIL}`,
  },
];

export const WHATSAPP_COTIZAR_MESSAGE = "Hola, quiero hacer una cotización";

export const WHATSAPP_ASESOR_MESSAGE = "Hola, quiero hablar con un asesor";

export const WHATSAPP_DEFAULT_MESSAGE = WHATSAPP_COTIZAR_MESSAGE;

export function whatsappUrl(message = WHATSAPP_DEFAULT_MESSAGE): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const CONTACT_FALLBACK_HREF = "/#contacto";

export function hasWhatsappNumber(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
}

/** Href de contacto resiliente: wa.me si hay número, si no cae a #contacto. Nunca ocultar el CTA. */
export function contactHref(message = WHATSAPP_DEFAULT_MESSAGE): string {
  return whatsappUrl(message) || CONTACT_FALLBACK_HREF;
}
