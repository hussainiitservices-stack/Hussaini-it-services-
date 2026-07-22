"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import type { DbTestimonial } from "@/lib/types/database";

interface HomeTestimonialsPreviewProps {
  items: DbTestimonial[];
}

export function HomeTestimonialsPreview({ items }: HomeTestimonialsPreviewProps) {
  if (!items.length) return null;

  return (
    <section className="relative border-t border-border bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by businesses across industries — from industrial B2B to hospitality and creative professionals."
        />

        <TestimonialsCarousel items={items} />

        <div className="mt-10 text-center">
          <ExploreLink href="/testimonials" label="Read more testimonials" />
        </div>
      </div>
    </section>
  );
}
