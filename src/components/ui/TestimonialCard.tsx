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
    <div className="relative mx-auto min-h-0 max-w-4xl overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(15,39,68,0.1)] sm:min-h-[480px] md:min-h-[520px]">
      {/* Top-right blue accent — scaled down on mobile */}
      <div
        className="absolute right-0 top-0 h-0 w-0 scale-50 origin-top-right sm:scale-75 md:scale-100"
        style={{
          borderLeft: "220px solid transparent",
          borderTop: "220px solid #4BA3E3",
        }}
        aria-hidden
      />

      {/* Decorative quote mark */}
      <div
        className="pointer-events-none absolute right-4 top-10 select-none font-serif text-[72px] leading-none text-[#4BA3E3]/25 sm:right-10 sm:top-16 sm:text-[120px]"
        aria-hidden
      >
        &ldquo;
      </div>

      {/* Decorative chevrons — hide on very small screens */}
      <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 space-y-3 opacity-20 sm:left-6 sm:block" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-3 w-3 rotate-45 border-r-2 border-b-2 border-[#4BA3E3]" />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 px-5 pt-6 sm:px-8 sm:pt-8 md:px-12 md:pt-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground sm:text-sm">Clients</p>
        <p className="font-display text-2xl font-bold uppercase tracking-wide text-[#4BA3E3] sm:text-3xl md:text-4xl" aria-hidden="true">
          Testimonial
        </p>
        <div className="mt-3 flex gap-1 sm:mt-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={16} className="fill-[#EAB308] text-[#EAB308] sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="relative z-10 break-safe px-5 py-4 text-sm leading-relaxed text-foreground sm:px-8 sm:py-6 sm:text-base md:px-12 md:text-lg md:leading-8">
        {testimonial.quote}
      </blockquote>

      {/* Footer */}
      <div className="relative mt-2 flex min-h-[120px] items-end justify-between gap-3 px-5 pb-5 sm:mt-4 sm:min-h-[160px] sm:gap-4 sm:px-8 sm:pb-8 md:px-12 md:pb-10">
        {/* Bottom-left: Hussaini IT Services logo */}
        <div className="relative shrink-0">
          <div
            className="absolute -bottom-4 -left-4 h-24 w-24 bg-[#4BA3E3] sm:-bottom-6 sm:-left-6 sm:h-36 sm:w-36"
            style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
            aria-hidden
          />
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-xl border border-border/50 bg-white p-2 shadow-md sm:h-24 sm:w-24 sm:p-3 md:h-28 md:w-28">
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
        <div className="relative z-10 min-w-0 max-w-[58%] text-right sm:max-w-[55%]">
          {testimonial.logo_url && (
            <div className="mb-2 ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white p-1.5 shadow-sm sm:mb-3 sm:h-14 sm:w-14 sm:p-2">
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
            <p className="mb-1 break-all text-[9px] font-medium uppercase tracking-wider text-muted sm:text-[10px] md:text-xs">
              {website}
            </p>
          )}
          <p className="break-safe font-display text-sm font-bold uppercase tracking-wide text-foreground sm:text-lg md:text-xl">
            {company}
          </p>
          {location && (
            <p className="mt-1 text-[10px] uppercase tracking-wider text-muted sm:text-xs md:text-sm">{location}</p>
          )}
          {!location && testimonial.role && (
            <p className="mt-1 text-[10px] text-muted sm:text-xs">
              {testimonial.name} · {testimonial.role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
