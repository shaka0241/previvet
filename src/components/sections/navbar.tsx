import Image from "next/image";
import { siteConfig } from "@/content/data";
import { PrimaryButton } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";
import MobileMenu from "./mobile-menu";

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

        <MobileMenu
          links={siteConfig.navLinks}
          ctaLabel={siteConfig.ctaLabel}
          whatsappHref={waHref}
        />
      </div>
    </nav>
  );
}
