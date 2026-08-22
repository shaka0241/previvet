import { scienceIntro, scienceBlocks, sectionTitles } from "@/content/data";
import SectionHeading from "@/components/ui/section-heading";

export default function Science() {
  return (
    <section id="ciencia" className="scroll-mt-16 bg-gray-50 px-4 py-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <SectionHeading title={sectionTitles.science} intro={scienceIntro} />
        <div className="flex flex-col gap-4">
          {scienceBlocks.map((block) => (
            <details
              key={block.title}
              className="group rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
            >
              <summary className="font-heading text-secondary flex cursor-pointer list-none items-center justify-between font-semibold">
                {block.title}
                <span className="text-primary text-xl transition-transform duration-300 group-open:rotate-45">
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
