"use client";

import Script from "next/script";
import { useEffect, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [token, setToken] = useState("");
  const waHref = whatsappUrl();

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
    "border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-secondary";
  const labelClasses = "text-sm font-medium text-gray-700";

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}

      {status === "success" ? (
        <div
          role="status"
          className="animate-pop-in flex flex-col items-center gap-4 rounded-lg bg-gray-50 p-8 text-center"
        >
          <span className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-full">
            <svg
              className="animate-pop-in h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </span>
          <div>
            <p className="font-heading text-secondary text-xl font-bold">
              ¡Solicitud enviada!
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Un asesor te contactará en menos de 24 horas.
            </p>
          </div>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-3 font-bold transition-colors"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Respuesta inmediata por WhatsApp
            </a>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          aria-busy={status === "sending"}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
          <input
            type="hidden"
            name="subject"
            value="Nuevo lead — Nutravit ADE3 Plus"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="contact-name" className={labelClasses}>
                Nombre
              </label>
              <input
                id="contact-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Tu nombre"
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="contact-phone" className={labelClasses}>
                Teléfono / WhatsApp
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+57 300 123 4567"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="contact-email" className={labelClasses}>
              Correo electrónico
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="correo@empresa.com"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="contact-message" className={labelClasses}>
              Mensaje
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="Cuéntanos sobre tu producción (especie, número de animales...)"
              className={inputClasses}
            />
          </div>

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
            className="bg-secondary hover:bg-secondary/90 inline-flex min-w-48 items-center justify-center gap-2 rounded-md px-6 py-3 font-bold text-white transition-colors disabled:opacity-60"
          >
            {status === "sending" && (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                />
              </svg>
            )}
            {status === "sending" ? "Enviando..." : "Enviar solicitud"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Tus datos solo se usan para enviarte la cotización.
          </p>

          {status === "error" && (
            <p role="alert" className="font-medium text-red-600">
              Hubo un error al enviar. Inténtalo de nuevo
              {waHref ? (
                <>
                  {" "}
                  o{" "}
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-700"
                  >
                    escríbenos por WhatsApp
                  </a>
                </>
              ) : null}
              .
            </p>
          )}
        </form>
      )}
    </>
  );
}
