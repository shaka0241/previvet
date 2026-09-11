"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  clearPosthogStorage,
  getConsent,
  setConsent,
  type AnalyticsConsent,
} from "@/lib/consent";
import { initPostHogIfConsented, optOutPostHog } from "@/lib/posthog-init";

export default function CookieBanner() {
  // null en SSR y en el primer render del cliente para evitar hydration mismatch.
  // Solo tras montar leemos localStorage.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- leer localStorage solo es posible tras montar; es el patrón hidratación-segura
      setVisible(true);
    }
  }, []);

  const choose = useCallback((value: Exclude<AnalyticsConsent, null>) => {
    setConsent(value);
    if (value === "accepted") {
      initPostHogIfConsented();
    } else {
      optOutPostHog();
      clearPosthogStorage();
    }
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies y analítica"
      className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4"
    >
      <div className="bg-secondary mx-auto flex max-w-3xl flex-col gap-3 rounded-xl p-5 text-white shadow-2xl">
        <p className="text-sm leading-relaxed">
          Usamos analítica (PostHog) solo si la aceptas, para medir visitas y
          clics y mejorar el sitio. Sin tu aceptación no se activa ningún
          rastreo.{" "}
          <Link
            href="/politica-de-cookies"
            className="underline underline-offset-4 hover:text-gray-200"
          >
            Política de Cookies
          </Link>{" "}
          ·{" "}
          <Link
            href="/politica-de-privacidad"
            className="underline underline-offset-4 hover:text-gray-200"
          >
            Privacidad
          </Link>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/40 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="bg-primary hover:bg-primary/90 inline-flex min-h-[44px] items-center justify-center rounded-md px-5 py-2 text-sm font-bold text-white transition-colors"
          >
            Aceptar analítica
          </button>
        </div>
      </div>
    </div>
  );
}
