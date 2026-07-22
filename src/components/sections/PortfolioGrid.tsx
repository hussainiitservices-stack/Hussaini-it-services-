"use client";

import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { DbPortfolio } from "@/lib/types/database";

interface PortfolioGridProps {
  items: DbPortfolio[];
  showHeader?: boolean;
}

export function PortfolioGrid({ items, showHeader = false }: PortfolioGridProps) {
  if (!items.length) {
    return (
      <p className="text-center text-muted py-20">No portfolio projects yet. Check back soon.</p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((project, i) => (
        <RevealOnScroll key={project.id} delay={showHeader ? i * 0.08 : 0}>
          <PortfolioCard project={project} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
