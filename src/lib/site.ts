const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vetlinenutrition.vercel.app";

export default siteUrl;

export const WHATSAPP_COTIZAR_MESSAGE = "Hola, quiero hacer una cotización";

export const WHATSAPP_ASESOR_MESSAGE = "Hola, quiero hablar con un asesor";

export const WHATSAPP_DEFAULT_MESSAGE = WHATSAPP_COTIZAR_MESSAGE;

export function whatsappUrl(message = WHATSAPP_DEFAULT_MESSAGE): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
