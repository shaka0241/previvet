import Image from "next/image";
import { siteConfig } from "@/content/data";
import { PrimaryButton } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";

export default function Navbar() {
  const waHref = whatsappUrl();

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#inicio" className="flex items-center gap-2">
          <Image
            src={siteConfig.logo}
            alt={`Inicio — ${siteConfig.name}`}
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
          <PrimaryButton href="#contacto">{siteConfig.ctaLabel}</PrimaryButton>
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
          popoverTarget="menu-movil"
          aria-label="Abrir menú"
          className="p-2 text-secondary md:hidden"
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
        <PrimaryButton href="#contacto" className="mt-1 text-center">
          {siteConfig.ctaLabel}
        </PrimaryButton>
        {waHref && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary inline-flex min-h-[44px] items-center gap-2 font-medium"
          >
            <WhatsAppIcon className="text-primary h-5 w-5" />
            WhatsApp
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
