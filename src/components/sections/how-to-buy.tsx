import { howToBuy, siteConfig } from "@/content/data";
import SectionHeading from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";

export default function HowToBuy() {
  const waHref = whatsappUrl();

  return (
    <section id="como-comprar" className="scroll-mt-16 bg-white px-4 py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <SectionHeading title="Cómo Comprar" />

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {howToBuy.steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-6"
            >
              <span className="bg-primary font-heading flex h-10 w-10 items-center justify-center rounded-full font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-heading text-secondary text-lg font-bold">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </li>
          ))}
        </ol>

        {(howToBuy.moq || howToBuy.countries.length > 0) && (
          <div className="flex flex-col items-center gap-3 text-center">
            {howToBuy.moq && (
              <p className="text-secondary font-semibold">{howToBuy.moq}</p>
            )}
            {howToBuy.countries.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-2">
                {howToBuy.countries.map((country) => (
                  <li
                    key={country}
                    className="rounded-full border border-gray-200 px-4 py-1 text-sm text-gray-600"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {howToBuy.registries.length > 0 && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm font-medium text-gray-500">
              Registros sanitarios
            </p>
            <ul className="flex flex-wrap justify-center gap-3">
              {howToBuy.registries.map((registry) => (
                <li
                  key={registry}
                  className="border-primary text-primary rounded-full border-2 px-4 py-1.5 text-sm font-semibold"
                >
                  {registry}
                </li>
              ))}
            </ul>
          </div>
        )}

        {waHref && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border-primary text-primary hover:bg-primary/10 mx-auto inline-flex w-fit items-center gap-2 rounded-md border-2 px-5 py-3 font-bold transition-colors"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Consulta a {siteConfig.name} por WhatsApp
          </a>
        )}
      </div>
    </section>
  );
}
