"use client";

import Script from "next/script";
import { useEffect, useState, type FormEvent } from "react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [token, setToken] = useState("");

  useEffect(() => {
    (
      window as { onTurnstileSuccess?: (t: string) => void }
    ).onTurnstileSuccess = setToken;
    return () => {
      delete (window as { onTurnstileSuccess?: (t: string) => void })
        .onTurnstileSuccess;
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data, turnstile_response: token }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
        <input
          type="hidden"
          name="subject"
          value="Nuevo lead — Nutravit ADE3 Plus"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            name="name"
            required
            placeholder="Nombre"
            aria-label="Nombre"
            className={inputClasses}
          />
          <input
            name="phone"
            required
            placeholder="Teléfono / WhatsApp"
            aria-label="Teléfono"
            className={inputClasses}
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          aria-label="Correo"
          className={inputClasses}
        />
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Cuéntanos sobre tu producción (especie, número de animales...)"
          aria-label="Mensaje"
          className={inputClasses}
        />

        {TURNSTILE_SITE_KEY && (
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-callback="onTurnstileSuccess"
          />
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-secondary hover:bg-secondary/90 rounded-md px-6 py-3 font-bold text-white transition-colors disabled:opacity-60"
        >
          {status === "sending" ? "Enviando..." : "Enviar solicitud"}
        </button>

        {status === "success" && (
          <p className="text-primary font-medium">
            ¡Gracias! Te contactaremos pronto.
          </p>
        )}
        {status === "error" && (
          <p className="font-medium text-red-600">
            Hubo un error al enviar. Inténtalo de nuevo o escríbenos por
            WhatsApp.
          </p>
        )}
      </form>
    </>
  );
}
