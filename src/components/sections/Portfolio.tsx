"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          badge="Portfolio"
          title="Our Work Speaks for Itself"
          subtitle="Explore our portfolio of successful projects across web development, ecommerce, and digital marketing."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                className="group premium-card rounded-xl overflow-hidden h-full flex flex-col"
              >
                <div className="h-40 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border-b border-border">
                  <span className="text-4xl font-display font-bold text-accent/30">
                    {project.title.charAt(0)}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-display text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <ul className="space-y-1 mb-4">
                    {project.highlights.map((h) => (
                      <li key={h} className="text-xs text-silver flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-gold" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border px-2 py-0.5 text-[10px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-12 text-center">
          <a
            href="https://www.hussainiitservices.com/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            View Full Portfolio
            <ExternalLink size={14} />
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
