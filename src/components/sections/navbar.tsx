"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/data";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const waHref = whatsappUrl();

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [open]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2">
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} Logo`}
            width={40}
            height={40}
            className="h-10 w-auto rounded-md"
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-secondary hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-secondary hover:bg-secondary/90 rounded-md px-4 py-2 text-white transition-colors"
          >
            Cotizar
          </a>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
          )}
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
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
          >
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-3 border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-secondary py-2 font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-secondary rounded-md px-4 py-2 text-center text-white"
          >
            Cotizar
          </a>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary inline-flex items-center gap-2 py-2 font-medium"
            >
              <WhatsAppIcon className="text-primary h-5 w-5" />
              WhatsApp
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
