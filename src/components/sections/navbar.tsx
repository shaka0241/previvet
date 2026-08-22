"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [open]);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} Logo`}
            width={40}
            height={40}
            className="h-10 w-auto rounded-md"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-secondary font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors"
          >
            Cotizar
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-secondary"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-3">
          {siteConfig.navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-secondary font-medium py-2">
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-secondary text-white px-4 py-2 rounded-md text-center"
          >
            Cotizar
          </a>
        </div>
      )}
    </nav>
  );
}
