"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export function Marquee({ items, speed = 30, className }: MarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} aria-label="Technologies we use">
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" aria-hidden="true" />

      <div
        className="flex w-max animate-marquee gap-8"
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap text-lg font-medium text-muted/70"
          >
            <span className="text-accent/60">—</span>
            {item}
          </span>
        ))}
      </div>

      <p className="sr-only">{items.join(", ")}</p>
    </div>
  );
}
