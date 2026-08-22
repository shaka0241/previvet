import { footerCta } from "@/content/data";
import { siteConfig } from "@/content/data";
import ContactForm from "./contact-form";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-secondary text-white scroll-mt-16">
      <div className="max-w-4xl mx-auto py-20 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight">
            {footerCta.title}
          </h2>
          <p className="text-gray-200">
            Déjanos tus datos y un asesor de {siteConfig.name} te contactará con
            una cotización personalizada.
          </p>
        </div>
        <div className="bg-white text-gray-700 rounded-xl shadow-lg p-6">
          <ContactForm />
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-300 flex items-center gap-2">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
