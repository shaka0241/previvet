import { afterEach, describe, expect, it } from "vitest";
import siteUrl, {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  SOCIAL_LINKS,
  TIKTOK_URL,
  whatsappUrl,
} from "./site";

const ENV_KEY = "NEXT_PUBLIC_WHATSAPP_NUMBER";
const original = process.env[ENV_KEY];

afterEach(() => {
  if (original === undefined) delete process.env[ENV_KEY];
  else process.env[ENV_KEY] = original;
});

describe("siteUrl", () => {
  it("usa el fallback del dominio de Vercel", () => {
    expect(siteUrl).toBe("https://vetlinenutrition.vercel.app");
  });
});

describe("whatsappUrl", () => {
  it("devuelve cadena vacía si no hay número configurado", () => {
    delete process.env[ENV_KEY];
    expect(whatsappUrl()).toBe("");
  });

  it("construye la URL wa.me con mensaje codificado", () => {
    process.env[ENV_KEY] = "573001234567";
    const url = whatsappUrl("Hola, quiero cotizar");
    expect(url).toBe(
      "https://wa.me/573001234567?text=Hola%2C%20quiero%20cotizar",
    );
  });
});

describe("contacto y redes sociales", () => {
  it("expone el email comercial confirmado", () => {
    expect(CONTACT_EMAIL).toBe("vetlinenutrition@gmail.com");
  });

  it("expone URLs https canónicas de IG y TikTok", () => {
    expect(INSTAGRAM_URL).toBe(
      "https://www.instagram.com/vetlinenutrition/",
    );
    expect(TIKTOK_URL).toBe("https://www.tiktok.com/@vetlinenutrition");
    for (const url of [INSTAGRAM_URL, TIKTOK_URL]) {
      expect(url.startsWith("https://")).toBe(true);
    }
  });

  it("SOCIAL_LINKS tiene 3 entradas sin hrefs vacíos", () => {
    expect(SOCIAL_LINKS).toHaveLength(3);
    for (const link of SOCIAL_LINKS) {
      expect(link.href).toBeTruthy();
      expect(link.label).toBeTruthy();
    }
  });

  it("email usa mailto:", () => {
    const email = SOCIAL_LINKS.find((l) => l.id === "email");
    expect(email?.href).toBe(`mailto:${CONTACT_EMAIL}`);
  });
});
