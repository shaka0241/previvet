import { afterEach, describe, expect, it } from "vitest";
import siteUrl, { whatsappUrl } from "./site";

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
