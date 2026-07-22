"use client";

import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { DbPortfolio } from "@/lib/types/database";

interface HomePortfolioPreviewProps {
  items: DbPortfolio[];
}

export function HomePortfolioPreview({ items }: HomePortfolioPreviewProps) {
  if (!items.length) return null;

  return (
    <section className="relative border-t border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Portfolio"
          title="Our Work Speaks for Itself"
          subtitle="Successful projects across web development, ecommerce, and digital marketing for clients worldwide."
        />

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((project, i) => (
            <RevealOnScroll key={project.id} delay={i * 0.08}>
              <PortfolioCard project={project} />
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ExploreLink href="/portfolio" label="Explore full portfolio" />
        </div>
      </div>
    </section>
  );
}
