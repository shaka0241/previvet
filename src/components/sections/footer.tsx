import { footerCta, footerContent, siteConfig } from "@/content/data";
import { primaryButtonClasses } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";
import ContactForm from "./contact-form";

export default function Footer() {
  const waHref = whatsappUrl();

  return (
    <footer id="contacto" className="bg-secondary scroll-mt-16 text-white">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 px-4 py-20 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="font-heading text-3xl leading-tight font-bold md:text-4xl">
            {footerCta.title}
          </h2>
          <p className="text-gray-200">{footerContent.intro}</p>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryButtonClasses + " w-fit"}
            >
              <span className="flex items-center gap-2">
                <WhatsAppIcon className="h-5 w-5" />
                {footerContent.whatsappCta}
              </span>
            </a>
          )}
        </div>
        <div className="rounded-xl bg-white p-6 text-gray-700 shadow-lg">
          <ContactForm />
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-6 text-sm text-gray-300">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
