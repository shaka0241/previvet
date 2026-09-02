import Image from "next/image";
import { siteConfig } from "@/content/data";
import { WhatsAppIcon } from "@/components/ui/icons";
import {
  whatsappUrl,
  WHATSAPP_ASESOR_MESSAGE,
  WHATSAPP_COTIZAR_MESSAGE,
} from "@/lib/site";

export default function Navbar() {
  const waCotizarHref = whatsappUrl(WHATSAPP_COTIZAR_MESSAGE);
  const waAsesorHref = whatsappUrl(WHATSAPP_ASESOR_MESSAGE);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 py-2 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a
          href="#inicio"
          className="absolute left-1/2 -translate-x-1/2 items-center gap-2 md:static md:translate-x-0"
        >
          <Image
            src={siteConfig.logo}
            alt={`Inicio — ${siteConfig.name}`}
            width={64}
            height={64}
            className="h-16 w-auto rounded-md md:h-10"
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
          {waCotizarHref ? (
            <a
              href={waCotizarHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-bold text-white transition-colors"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {siteConfig.ctaLabel}
            </a>
          ) : null}
          {waAsesorHref && (
            <a
              href={waAsesorHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablar con un asesor por WhatsApp"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
          )}
        </div>

        <button
          type="button"
          popoverTarget="menu-movil"
          aria-label="Abrir menú"
          className="text-secondary ml-auto p-2 md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <div
        id="menu-movil"
        popover="auto"
        className="fixed inset-x-0 top-16 bottom-auto m-0 flex-col gap-1 rounded-none border-t border-gray-100 bg-white px-4 pt-2 pb-4 shadow-lg md:hidden"
      >
        {siteConfig.navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-secondary inline-flex min-h-[44px] items-center font-medium"
          >
            {link.label}
          </a>
        ))}
        {waCotizarHref ? (
          <a
            href={waCotizarHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 mt-1 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-6 py-3 text-center font-bold text-white transition-colors"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {siteConfig.ctaLabel}
          </a>
        ) : null}
        {waAsesorHref && (
          <a
            href={waAsesorHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary inline-flex min-h-[44px] items-center gap-2 font-medium"
          >
            <WhatsAppIcon className="text-primary h-5 w-5" />
            Hablar con un asesor
          </a>
        )}
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html:
            'document.addEventListener("hashchange",function(){var m=document.getElementById("menu-movil");if(m&&m.matches(":popover-open"))m.hidePopover();});',
        }}
      />
    </nav>
  );
}
