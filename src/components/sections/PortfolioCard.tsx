"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PortfolioCover, getPortfolioCoverProps } from "@/components/ui/PortfolioCover";
import { normalizeExternalUrl } from "@/lib/utils";
import type { DbPortfolio } from "@/lib/types/database";

interface PortfolioCardProps {
  project: DbPortfolio;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const href = normalizeExternalUrl(project.project_url);

  const body = (
    <>
      <PortfolioCover {...getPortfolioCoverProps(project)} />

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
          {project.category}
        </span>
        <h3 className="mb-2 font-display text-lg font-bold transition-colors group-hover/card:text-accent">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        {project.highlights?.length > 0 && (
          <ul className="mb-4 space-y-1">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-xs text-silver">
                <span className="h-1 w-1 rounded-full bg-gold" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {project.tags?.length > 0 && (
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
        )}

        {href && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
            Visit website
            <ExternalLink size={12} />
          </span>
        )}
      </div>
    </>
  );

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`group premium-card flex h-full flex-col overflow-hidden rounded-xl ${
        href ? "cursor-pointer" : ""
      }`}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/card flex h-full flex-col"
          aria-label={`Visit ${project.title} website`}
        >
          {body}
        </a>
      ) : (
        <div className="flex h-full flex-col">{body}</div>
      )}
    </motion.article>
  );
}
