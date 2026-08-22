const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://previvet.vercel.app";

export default siteUrl;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola, quiero cotizar Nutravit ADE3 Plus para mi producción.";

export function whatsappUrl(message = WHATSAPP_DEFAULT_MESSAGE): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
