import Link from "next/link";
import SectionHeading from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl, WHATSAPP_COTIZAR_MESSAGE } from "@/lib/site";
import type { SpeciesTab } from "@/types";

export default function SpeciesDetail({ tab }: { tab: SpeciesTab }) {
  const waCotizarHref = whatsappUrl(WHATSAPP_COTIZAR_MESSAGE);

  return (
    <main className="from-secondary bg-gradient-to-b to-[#2a4a7f] px-4 pt-32 pb-20 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="text-sm font-semibold tracking-widest text-green-400 uppercase">
          Nutravit ADE3 Plus
        </p>
        <h1 className="font-heading text-4xl leading-tight font-bold md:text-5xl">
          Núcleo nutricional para {tab.label}
        </h1>
        <p className="max-w-2xl text-lg text-gray-100">
          Fórmula de alta palatabilidad para {tab.label.toLowerCase()} —{" "}
          {tab.subtitle}. Asimilación del 100% y máxima conversión alimenticia.
        </p>
      </div>

      <section className="mt-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          <SectionHeading title={`Beneficios en ${tab.label}`} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {tab.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="border-primary flex flex-col gap-2 rounded-xl border-l-4 bg-white p-6 shadow-md"
              >
                <h2 className="font-heading text-secondary text-lg font-bold">
                  {benefit.title}
                </h2>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row">
            {waCotizarHref ? (
              <a
                href={waCotizarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-bold text-white transition-colors"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Solicitar Cotización
              </a>
            ) : null}
            <Link
              href="/"
              className="inline-block rounded-md border-2 border-white px-6 py-3 font-medium transition-colors hover:bg-white/10"
            >
              Conocer más del producto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
