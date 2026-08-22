import { hero } from "@/content/data";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";

export default function Hero() {
  const waHref = whatsappUrl();

  return (
    <section
      id="inicio"
      className="from-secondary bg-gradient-to-b to-[#2a4a7f] px-4 pt-32 pb-20 text-white"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="text-sm font-semibold tracking-widest text-green-400 uppercase">
          {hero.preTitle}
        </p>
        <h1 className="font-heading text-4xl leading-tight font-bold md:text-5xl">
          {hero.title}
        </h1>
        <p className="max-w-2xl text-lg text-gray-100 md:text-xl">
          {hero.subtitle}
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <PrimaryButton href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </PrimaryButton>
          {waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white px-6 py-3 font-medium transition-colors hover:bg-white/10"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {hero.secondaryCta.label}
            </a>
          ) : (
            <SecondaryButton
              href={hero.secondaryCta.href}
              className="border-white text-white hover:bg-white/10 hover:text-white"
            >
              {hero.secondaryCta.label}
            </SecondaryButton>
          )}
        </div>
      </div>
    </section>
  );
}
