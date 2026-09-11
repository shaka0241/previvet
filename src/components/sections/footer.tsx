import {
  footerCta,
  footerContent,
  legalInfo,
  siteConfig,
} from "@/content/data";
import { legalDocs } from "@/content/legal";
import { primaryButtonClasses } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";
import SocialLinks from "@/components/ui/social-links";
import Link from "next/link";
import { contactHref, whatsappUrl, CONTACT_EMAIL } from "@/lib/site";

export default function Footer() {
  const waHref = whatsappUrl();
  const ctaHref = contactHref();

  return (
    <footer id="contacto" className="bg-secondary scroll-mt-16 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
        <h2 className="font-heading text-3xl leading-tight font-bold md:text-4xl">
          {footerCta.title}
        </h2>
        <p className="max-w-xl text-gray-200">{footerContent.intro}</p>
        <a
          href={ctaHref}
          {...(waHref ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          data-track={waHref ? "whatsapp_click" : "cta_click"}
          data-location="footer"
          data-cta="whatsapp"
          className={primaryButtonClasses + " mt-2"}
        >
          <span className="flex items-center gap-2">
            <WhatsAppIcon className="h-5 w-5" />
            {footerContent.whatsappCta}
          </span>
        </a>
        {!waHref && (
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Cotización Nutravit ADE3 Plus")}`}
            data-track="cta_click"
            data-location="footer"
            data-cta="email-fallback"
            className="inline-flex min-h-[44px] items-center text-sm text-gray-200 underline underline-offset-4 hover:text-white"
          >
            O escríbenos a {CONTACT_EMAIL}
          </a>
        )}
        <div className="mt-2 flex flex-col items-center gap-3">
          <h3 className="text-sm font-semibold tracking-wide text-gray-200 uppercase">
            {footerContent.socialTitle}
          </h3>
          <SocialLinks />
        </div>
      </div>
      <div className="border-t border-white/10">
        {(legalInfo.legalName ||
          legalInfo.taxId ||
          legalInfo.address ||
          legalInfo.arcoEmail) && (
          <div className="mx-auto max-w-6xl px-4 pt-6 text-xs text-gray-300">
            {legalInfo.legalName && (
              <p>
                {legalInfo.legalName}
                {legalInfo.taxId ? ` — ${legalInfo.taxId}` : ""}
              </p>
            )}
            {legalInfo.address && <p>{legalInfo.address}</p>}
            {legalInfo.arcoEmail && (
              <p>
                Para ejercer tus derechos de protección de datos (acceso,
                actualización, rectificación, supresión) escríbenos a{" "}
                <a
                  href={`mailto:${legalInfo.arcoEmail}`}
                  className="underline hover:text-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {legalInfo.arcoEmail}
                </a>
                .
              </p>
            )}
          </div>
        )}
        <p className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-6 text-sm text-gray-300">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
          reservados.
        </p>
        <nav
          aria-label="Documentos legales"
          className="mx-auto max-w-6xl px-4 pb-6"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalDocs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/${doc.slug}`}
                  className="inline-flex min-h-[44px] items-center text-sm text-gray-300 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
