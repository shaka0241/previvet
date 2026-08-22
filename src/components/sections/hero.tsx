import { hero } from "@/content/data";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

export default function Hero() {
  return (
    <section className="from-secondary bg-gradient-to-b to-[#2a4a7f] px-4 pt-32 pb-20 text-white">
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
          <SecondaryButton
            href={hero.secondaryCta.href}
            className="border-white text-white hover:bg-white/10 hover:text-white"
          >
            {hero.secondaryCta.label}
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
