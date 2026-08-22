"use client";

import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";
import type { NavLink } from "@/types";

export default function MobileMenu({
  links,
  ctaLabel,
  whatsappHref,
}: {
  links: NavLink[];
  ctaLabel: string;
  whatsappHref: string;
}) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onHashChange = () => {
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef}>
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-secondary p-2 md:hidden"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {open ? (
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-gray-100 bg-white px-4 pt-2 pb-4 shadow-lg md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-secondary inline-flex min-h-[44px] items-center font-medium"
            >
              {link.label}
            </a>
          ))}
          <PrimaryButton href="#contacto" className="mt-1 text-center">
            {ctaLabel}
          </PrimaryButton>
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary inline-flex min-h-[44px] items-center gap-2 font-medium"
            >
              <WhatsAppIcon className="text-primary h-5 w-5" />
              WhatsApp
            </a>
          )}
        </div>
      )}
    </div>
  );
}
