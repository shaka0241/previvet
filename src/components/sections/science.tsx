import { scienceIntro, scienceBlocks } from "@/content/data";

export default function Science() {
  return (
    <section id="ciencia" className="py-20 px-4 bg-gray-50 scroll-mt-16">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-secondary text-center">
          La Ciencia de nuestra Fórmula
        </h2>
        <p className="text-center text-gray-600">{scienceIntro}</p>
        <div className="flex flex-col gap-4">
          {scienceBlocks.map((block) => (
            <details
              key={block.title}
              className="group bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <summary className="flex items-center justify-between cursor-pointer font-heading font-semibold text-secondary list-none">
                {block.title}
                <span className="transition-transform duration-300 group-open:rotate-45 text-primary text-xl">
                  +
                </span>
              </summary>
              <p className="mt-4 text-gray-600">{block.description}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
