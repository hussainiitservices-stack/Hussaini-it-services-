"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  { step: "01", title: "Research", desc: "We analyze your business, audience, and competitors." },
  { step: "02", title: "Strategy", desc: "A tailored plan aligned with your growth goals." },
  { step: "03", title: "Execution", desc: "Expert delivery with transparent communication." },
  { step: "04", title: "Growth", desc: "Ongoing optimization for lasting results." },
];

export function HomeAboutPreview() {
  return (
    <section className="relative py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll direction="right">
            <SectionHeader
              badge="About Us"
              title="Who We Are"
              subtitle="A premium digital studio partnering with startups and enterprises to build technology that drives real business growth."
              align="left"
              className="mb-0"
            />
            <p className="mt-6 text-muted leading-relaxed">
              From industrial B2B brands to ecommerce stores and hospitality businesses, we combine
              technical excellence with strategic marketing — on time, on budget, and with
              uncompromising quality.
            </p>
            <ExploreLink href="/about" label="Read more about us" className="mt-8" />
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {steps.map((item) => (
                <div key={item.step} className="premium-card rounded-xl p-5">
                  <span className="font-display text-xl font-bold text-accent/40">{item.step}</span>
                  <h3 className="mt-2 font-display text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
