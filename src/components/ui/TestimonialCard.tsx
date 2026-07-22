"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { DbTestimonial } from "@/lib/types/database";

interface TestimonialCardProps {
  testimonial: DbTestimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const website = testimonial.website_url?.replace(/^https?:\/\//i, "").toUpperCase();
  const company = testimonial.company.toUpperCase();
  const location = testimonial.location?.toUpperCase();

  return (
    <div className="relative mx-auto min-h-[520px] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(15,39,68,0.1)]">
      {/* Top-right blue accent */}
      <div
        className="absolute right-0 top-0 h-0 w-0"
        style={{
          borderLeft: "220px solid transparent",
          borderTop: "220px solid #4BA3E3",
        }}
      />

      {/* Decorative quote mark */}
      <div
        className="pointer-events-none absolute right-10 top-16 select-none font-serif text-[120px] leading-none text-[#4BA3E3]/25"
        aria-hidden
      >
        &ldquo;
      </div>

      {/* Decorative chevrons */}
      <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 space-y-3 opacity-20" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-3 w-3 rotate-45 border-r-2 border-b-2 border-[#4BA3E3]" />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 px-8 pt-8 md:px-12 md:pt-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Clients</p>
        <p className="font-display text-3xl font-bold uppercase tracking-wide text-[#4BA3E3] md:text-4xl" aria-hidden="true">
          Testimonial
        </p>
        <div className="mt-4 flex gap-1" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={18} className="fill-[#EAB308] text-[#EAB308]" aria-hidden="true" />
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="relative z-10 px-8 py-6 text-base leading-relaxed text-foreground md:px-12 md:text-lg md:leading-8">
        {testimonial.quote}
      </blockquote>

      {/* Footer */}
      <div className="relative mt-4 flex min-h-[160px] items-end justify-between px-8 pb-8 md:px-12 md:pb-10">
        {/* Bottom-left: Hussaini IT Services logo */}
        <div className="relative shrink-0">
          <div
            className="absolute -bottom-6 -left-6 h-36 w-36 bg-[#4BA3E3]"
            style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
            aria-hidden
          />
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-xl border border-border/50 bg-white p-3 shadow-md md:h-28 md:w-28">
            <Image
              src="/logo.svg"
              alt="Hussaini IT Services"
              width={80}
              height={80}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Client info + optional client logo */}
        <div className="relative z-10 max-w-[55%] text-right">
          {testimonial.logo_url && (
            <div className="mb-3 ml-auto flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-white p-2 shadow-sm">
              <Image
                src={testimonial.logo_url}
                alt={`${testimonial.company} logo`}
                width={48}
                height={48}
                className="max-h-full max-w-full object-contain"
                unoptimized={testimonial.logo_url.endsWith(".svg")}
              />
            </div>
          )}
          {website && (
            <p className="mb-1 break-all text-[10px] font-medium uppercase tracking-wider text-muted md:text-xs">
              {website}
            </p>
          )}
          <p className="font-display text-lg font-bold uppercase tracking-wide text-foreground md:text-xl">
            {company}
          </p>
          {location && (
            <p className="mt-1 text-xs uppercase tracking-wider text-muted md:text-sm">{location}</p>
          )}
          {!location && testimonial.role && (
            <p className="mt-1 text-xs text-muted">
              {testimonial.name} · {testimonial.role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
