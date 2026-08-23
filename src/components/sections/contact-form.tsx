"use client";

import Script from "next/script";
import { useEffect, useState, type FormEvent } from "react";
import {
  parseContactForm,
  submitContact,
  validateContactForm,
  type ContactFieldErrors,
} from "@/lib/contact";
import { contactForm } from "@/content/data";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const fieldIds = ["name", "phone", "email", "message"] as const;

function FieldError({ field, message }: { field: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`error-${field}`} role="alert" className="text-sm text-red-600">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [token, setToken] = useState("");
  const waHref = whatsappUrl();
  const turnstileRequired = Boolean(TURNSTILE_SITE_KEY);
  const canSubmit =
    status !== "sending" && (!turnstileRequired || Boolean(token));

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
    const form = e.currentTarget;
    const data = parseContactForm(form);
    const fieldErrors = validateContactForm(data);

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("sending");

    const result = await submitContact({
      data,
      accessKey: WEB3FORMS_KEY,
      turnstileToken: token,
      subject: `Nuevo lead — Nutravit ADE3 Plus`,
    });

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  const inputBase =
    "border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-secondary";
  const labelClasses = "text-sm font-medium text-gray-700";

  const errorList = fieldIds.filter((f) => errors[f]);
  function describedBy(field: keyof ContactFieldErrors) {
    return errors[field] ? `error-${field}` : undefined;
  }

  function inputClasses(field: keyof ContactFieldErrors) {
    return cn(inputBase, errors[field] && "border-red-400 focus:ring-red-500");
  }

  if (status === "success") {
    return (
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
            {contactForm.successTitle}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {contactForm.successMessage}
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
            {contactForm.successWhatsappCta}
          </a>
        )}
      </div>
    );
  }

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={status === "sending"}
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />

        {errorList.length > 0 && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p className="font-semibold">Revisa los siguientes campos:</p>
            <ul className="mt-1 list-inside list-disc">
              {errorList.map((field) => (
                <li key={field}>
                  <a
                    href={`#contact-${field}`}
                    className="underline hover:text-red-800"
                  >
                    {contactForm.labels[field]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="contact-name" className={labelClasses}>
              {contactForm.labels.name}
            </label>
            <input
              id="contact-name"
              name="name"
              required
              maxLength={80}
              autoComplete="name"
              placeholder={contactForm.placeholders.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              className={inputClasses("name")}
            />
            <FieldError field="name" message={errors.name} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="contact-phone" className={labelClasses}>
              {contactForm.labels.phone}
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              required
              maxLength={20}
              autoComplete="tel"
              placeholder={contactForm.placeholders.phone}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy("phone")}
              className={inputClasses("phone")}
            />
            <FieldError field="phone" message={errors.phone} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="contact-email" className={labelClasses}>
            {contactForm.labels.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            placeholder={contactForm.placeholders.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={inputClasses("email")}
          />
          <FieldError field="email" message={errors.email} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="contact-message" className={labelClasses}>
            {contactForm.labels.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            maxLength={500}
            placeholder={contactForm.placeholders.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            className={inputClasses("message")}
          />
          <FieldError field="message" message={errors.message} />
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
          disabled={!canSubmit}
          title={
            !canSubmit && turnstileRequired
              ? "Espera la verificación anti-spam"
              : undefined
          }
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
          {status === "sending"
            ? contactForm.submittingLabel
            : contactForm.submitLabel}
        </button>

        <p className="text-center text-xs text-gray-500">
          {contactForm.privacyNote}
        </p>

        {status === "error" && (
          <p role="alert" className="font-medium text-red-600">
            {contactForm.errorBeforeLink}
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
                  {contactForm.errorLinkText}
                </a>
              </>
            ) : null}
            .
          </p>
        )}
      </form>
    </>
  );
}
