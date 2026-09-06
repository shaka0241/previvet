import Link from "next/link";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { LEGAL_DRAFT_NOTICE, type LegalDoc } from "@/content/legal";
import { siteConfig } from "@/content/data";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <a
        href="#contenido"
        className="focus:bg-secondary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:p-3 focus:text-white"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-4 py-24">
          <Link
            href="/"
            className="text-primary inline-flex min-h-[44px] items-center font-medium underline underline-offset-4"
          >
            ← Volver al inicio
          </Link>
          <h1 className="font-heading text-secondary mt-4 text-3xl font-bold md:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {siteConfig.name} · Última actualización: {doc.updated}
          </p>
          <p
            role="note"
            className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
          >
            {LEGAL_DRAFT_NOTICE}
          </p>
          <nav aria-label="Contenido del documento" className="mt-8">
            <ul className="flex flex-col gap-1">
              {doc.sections.map((section, i) => (
                <li key={section.heading}>
                  <a
                    href={`#seccion-${i + 1}`}
                    className="text-primary inline-flex min-h-[44px] items-center underline underline-offset-4"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 flex flex-col gap-8">
            {doc.sections.map((section, i) => (
              <section key={section.heading} id={`seccion-${i + 1}`}>
                <h2 className="font-heading text-secondary text-xl font-bold">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mt-3 text-gray-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
