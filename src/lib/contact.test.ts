import { describe, expect, it } from "vitest";
import {
  parseContactForm,
  validateContactForm,
  type ContactFormData,
} from "./contact";

const valid: ContactFormData = {
  name: "Alberto Rojas",
  phone: "+57 300 123 4567",
  email: "alberto@finca.com",
  message: "Necesito cotización para 200 vacas lecheras en Antioquia.",
};

describe("validateContactForm", () => {
  it("acepta un formulario válido", () => {
    expect(validateContactForm(valid)).toEqual({});
  });

  it("email es opcional", () => {
    expect(validateContactForm({ ...valid, email: "" })).toEqual({});
  });

  it("rechaza nombre demasiado corto", () => {
    const errors = validateContactForm({ ...valid, name: "A" });
    expect(errors.name).toBeTruthy();
  });

  it("rechaza teléfonos inválidos", () => {
    for (const phone of [
      "123",
      "abc-def-ghij",
      "",
      "+57 300 123 4567 ext 90210",
    ]) {
      const errors = validateContactForm({ ...valid, phone });
      expect(errors.phone, `falló con: "${phone}"`).toBeTruthy();
    }
  });

  it("acepta formatos de teléfono comunes", () => {
    for (const phone of ["3001234567", "+573001234567", "(601) 555-0000"]) {
      const errors = validateContactForm({ ...valid, phone });
      expect(errors.phone, `falló con: "${phone}"`).toBeUndefined();
    }
  });

  it("rechaza email mal formado", () => {
    const errors = validateContactForm({ ...valid, email: "no-es-email" });
    expect(errors.email).toBeTruthy();
  });

  it("rechaza mensaje demasiado corto", () => {
    const errors = validateContactForm({ ...valid, message: "hola" });
    expect(errors.message).toBeTruthy();
  });
});

describe("parseContactForm", () => {
  it("extrae y recorta los campos del formulario", () => {
    const form = new FormData();
    form.set("name", "  Alberto  ");
    form.set("phone", "3001234567");
    form.set("email", "");
    form.set("message", "Cotización");
    const data = parseContactForm(form);
    expect(data).toEqual({
      name: "Alberto",
      phone: "3001234567",
      email: "",
      message: "Cotización",
    });
  });
});
