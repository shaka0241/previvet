import { faqItems } from "@/content/data";
import SectionHeading from "@/components/ui/section-heading";

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 bg-gray-50 px-4 py-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <SectionHeading title="Preguntas Frecuentes" />
        <div className="flex flex-col gap-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
            >
              <summary className="font-heading text-secondary flex cursor-pointer list-none items-center justify-between font-semibold">
                {item.question}
                <span className="text-primary text-xl transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
