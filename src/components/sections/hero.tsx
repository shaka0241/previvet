import { hero } from "@/content/data";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/site";

export default function Hero() {
  const waHref = whatsappUrl();

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-secondary px-4 pt-32 pb-20 text-white"
    >
      <link
        rel="preload"
        as="image"
        imageSrcSet="/images/hero_section_image_obscure-1280.webp 1280w, /images/hero_section_image_obscure-1920.webp 1920w, /images/hero_section_image_obscure.webp 2752w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <picture aria-hidden="true" className="absolute inset-0 -z-10">
        <source
          type="image/webp"
          srcSet="/images/hero_section_image_obscure-1280.webp 1280w, /images/hero_section_image_obscure-1920.webp 1920w, /images/hero_section_image_obscure.webp 2752w"
          sizes="100vw"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero_section_image_obscure.jpeg"
          alt=""
          width={2752}
          height={1536}
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/55 via-secondary/25 to-[#2a4a7f]/40"
      />
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center [text-shadow:0_1px_14px_rgba(0,0,0,0.55)]">
        <p className="text-sm font-semibold tracking-widest text-green-300 uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          {hero.preTitle}
        </p>
        <h1 className="font-heading text-4xl leading-tight font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:text-5xl">
          {hero.title}
        </h1>
        <p className="max-w-2xl text-lg text-gray-50 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] md:text-xl">
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
