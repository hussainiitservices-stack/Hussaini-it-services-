interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
}

export function FaqSection({
  title = "Frequently Asked Questions",
  subtitle = "Quick answers about our services, process, and how we work with clients.",
  items,
}: FaqSectionProps) {
  return (
    <section className="border-t border-border bg-surface py-12 sm:py-16 md:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 id="faq-heading" className="mb-3 font-display text-2xl font-bold text-center sm:mb-4 sm:text-3xl">
          {title}
        </h2>
        <p className="mb-8 text-center text-sm text-muted sm:mb-10 sm:text-base">{subtitle}</p>
        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="premium-card group rounded-lg p-4 sm:p-5"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-semibold text-foreground sm:items-center sm:gap-4">
                <span className="min-w-0 flex-1 text-left text-sm sm:text-base">{item.question}</span>
                <span className="mt-0.5 shrink-0 text-xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
