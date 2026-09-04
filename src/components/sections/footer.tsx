import {
  footerCta,
  footerContent,
  legalInfo,
  siteConfig,
} from "@/content/data";
import { primaryButtonClasses } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";
import SocialLinks from "@/components/ui/social-links";
import { whatsappUrl } from "@/lib/site";

export default function Footer() {
  const waHref = whatsappUrl();

  return (
    <footer id="contacto" className="bg-secondary scroll-mt-16 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
        <h2 className="font-heading text-3xl leading-tight font-bold md:text-4xl">
          {footerCta.title}
        </h2>
        <p className="max-w-xl text-gray-200">{footerContent.intro}</p>
        {waHref && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryButtonClasses + " mt-2"}
          >
            <span className="flex items-center gap-2">
              <WhatsAppIcon className="h-5 w-5" />
              {footerContent.whatsappCta}
            </span>
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
      </div>
    </footer>
  );
}
