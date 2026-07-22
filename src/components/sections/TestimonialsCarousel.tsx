"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { DbTestimonial } from "@/lib/types/database";

interface TestimonialsCarouselProps {
  items: DbTestimonial[];
}

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [active, setActive] = useState(0);

  if (!items.length) {
    return (
      <p className="text-center text-muted py-20">No testimonials yet. Check back soon.</p>
    );
  }

  const next = () => setActive((prev) => (prev + 1) % items.length);
  const prev = () => setActive((prev) => (prev - 1 + items.length) % items.length);
  const current = items[active];

  return (
    <RevealOnScroll>
      <div className="relative mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
          >
            <TestimonialCard testimonial={current} />
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-8 bg-[#4BA3E3]" : "w-2 bg-border"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2 self-end sm:self-auto">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-[#4BA3E3]/40 hover:text-foreground"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-[#4BA3E3]/40 hover:text-foreground"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
