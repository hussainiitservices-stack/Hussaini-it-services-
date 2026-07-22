"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[active];

  return (
    <section id="testimonials" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by businesses across industries — from industrial B2B to hospitality and creative professionals."
        />

        <RevealOnScroll>
          <div className="relative mx-auto max-w-4xl">
            <div className="premium-card rounded-2xl p-10 md:p-16">
              <Quote size={40} className="text-accent/30 mb-6" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-gold text-gold" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl leading-relaxed text-foreground mb-8">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  <div>
                    <p className="font-display font-semibold">{current.name}</p>
                    <p className="text-sm text-muted">
                      {current.role}, {current.company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === active ? "w-8 bg-accent" : "w-2 bg-border"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted hover:text-foreground hover:border-accent/40 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted hover:text-foreground hover:border-accent/40 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
