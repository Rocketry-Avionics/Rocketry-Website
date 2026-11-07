import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faq } from "@/content/faq";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    }))
  ),
};

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-b border-line/60">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow={faq.eyebrow}
          title={faq.title}
          description={faq.description}
        />
        {faq.groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-sky">
              {group.title}
            </h3>
            {group.items.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-line bg-surface transition-colors open:border-flame/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 font-display text-base font-semibold text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-flame/60 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 group-open:text-flame"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
