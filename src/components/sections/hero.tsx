import { hero } from "@/content/data";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-secondary to-[#2a4a7f] text-white pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <p className="text-primary font-semibold uppercase tracking-widest text-sm">
          {hero.preTitle}
        </p>
        <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight">
          {hero.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
          {hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <PrimaryButton href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </PrimaryButton>
          <SecondaryButton href={hero.secondaryCta.href} className="text-white border-white hover:bg-white/10 hover:text-white">
            {hero.secondaryCta.label}
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
