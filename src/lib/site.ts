import type { SocialLink } from "@/types";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vetlinenutrition.vercel.app";

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
