"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { dosages, sectionTitles } from "@/content/data";

type PresentationOption = {
  id: string;
  label: string;
  fullLabel: string;
  alt: string;
  src: string;
  srcSet: string;
  fallbackSrc: string;
};

const PRESENTATIONS: PresentationOption[] = [
  {
    id: "balde",
    label: "Balde",
    fullLabel: "Balde de 20 kg",
    alt: "Balde plástico de Nutravit ADE3 Plus de 20 kg",
    src: "/images/pote.webp",
    srcSet:
      "/images/pote-400.webp 400w, /images/pote-800.webp 800w, /images/pote.webp 1200w",
    fallbackSrc: "/images/pote.webp",
  },
  {
    id: "bolsa",
    label: "Bolsa",
    fullLabel: "Bolsa de 20 kg",
    alt: "Saco o bolsa de Nutravit ADE3 Plus de 20 kg",
    src: "/images/saco.webp",
    srcSet:
      "/images/saco-400.webp 400w, /images/saco-800.webp 800w, /images/saco.webp 1856w",
    fallbackSrc: "/images/saco.webp",
  },
];

export default function Presentations() {
  const [activeId, setActiveId] = useState<string>(PRESENTATIONS[0].id);
  const active =
    PRESENTATIONS.find((p) => p.id === activeId) ?? PRESENTATIONS[0];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = PRESENTATIONS.length;
    let next = -1;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const target = PRESENTATIONS[next];
    setActiveId(target.id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      id="presentaciones"
      className="scroll-mt-16 bg-white px-4 py-20"
      aria-labelledby="titulo-presentaciones"
    >
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* Tarjeta presentación - interactiva */}
        <div className="from-primary/90 to-primary flex flex-col gap-6 rounded-xl bg-gradient-to-br p-8 text-white shadow-lg">
          <h2
            id="titulo-presentaciones"
            className="font-heading text-3xl font-bold"
          >
            {sectionTitles.presentations}
          </h2>

          {/* Visor de imagen - cambia según botón seleccionado - sin cuadro: imagen recortada sin fondo */}
          <div
            id="panel-presentacion"
            role="tabpanel"
            aria-live="polite"
            aria-atomic="true"
            aria-labelledby={`tab-${active.id}`}
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/[0.06]"
          >
            {/* key fuerza re-mount para animar el cambio */}
            <picture
              key={active.id}
              className="flex h-full w-full items-center justify-center"
            >
              <source
                type="image/webp"
                srcSet={active.srcSet}
                sizes="(max-width: 1024px) 90vw, 420px"
              />
              <img
                src={active.fallbackSrc}
                srcSet={active.srcSet}
                sizes="(max-width: 1024px) 90vw, 420px"
                alt={active.alt}
                width={800}
                height={800}
                loading="eager"
                decoding="async"
                className="animate-fade-up h-full max-h-[280px] w-full object-contain [filter:drop-shadow(0_6px_16px_rgba(0,0,0,0.14))_drop-shadow(0_2px_6px_rgba(0,0,0,0.10))]"
              />
            </picture>

            {/* Badge 20 kg siempre visible, anclado a la imagen */}
            <span className="bg-secondary pointer-events-none absolute right-3 bottom-3 rounded-full px-3.5 py-1 text-sm font-bold tracking-wide text-white shadow-md">
              20 kg
            </span>
          </div>

          {/* Selector Balde / Bolsa - estado seleccionado muy evidente */}
          <div
            role="tablist"
            aria-label="Selecciona la presentación"
            className="flex gap-3"
          >
            {PRESENTATIONS.map((p, i) => {
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={isActive}
                  aria-controls="panel-presentacion"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(p.id)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isActive
                      ? "border-white bg-white text-primary shadow-md ring-1 ring-black/5 focus-visible:outline-white"
                      : "border-white/60 bg-white/10 text-white hover:border-white hover:bg-white/15 focus-visible:outline-white"
                  }`}
                >
                  {/* Indicador visual de selección */}
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isActive
                        ? "border-primary bg-primary text-white"
                        : "border-white/70 bg-transparent"
                    }`}
                  >
                    {isActive ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-3 w-3"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 10.5L9 13.5L14 7.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </span>
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Texto descriptivo ligado al tabpanel para contexto */}
          <p className="text-center text-sm leading-none font-medium text-white/90">
            {active.fullLabel}
            <span className="text-white/70"> · presentación disponible</span>
          </p>
        </div>

        {/* Dosificación - sin cambios funcionales */}
        <ul className="flex flex-col gap-4" aria-label="Dosificación por especie">
          {dosages.map((dose) => (
            <li
              key={dose.species}
              className="flex flex-col gap-2 rounded-xl bg-gray-50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-heading text-secondary font-semibold">
                {dose.species}
              </span>
              <span className="text-gray-600">{dose.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
