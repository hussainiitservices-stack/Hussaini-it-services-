"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredServices } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof featuredServices)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <RevealOnScroll delay={index * 0.15}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="group premium-card h-full rounded-xl p-5 sm:p-8"
      >
        <div className="icon-box mb-5 h-12 w-12 sm:mb-6 sm:h-14 sm:w-14">
          <service.icon size={26} />
        </div>

        <h3 className="mb-3 font-display text-lg font-bold sm:text-xl">{service.title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-muted sm:text-base">{service.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.a
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent group/link"
          whileHover={{ x: 4 }}
        >
          Learn More
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </motion.a>
      </motion.div>
    </RevealOnScroll>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Services"
          title="Featured Services"
          subtitle="Focused digital marketing solutions to grow your brand, improve visibility, and drive measurable business results."
        />

        <div className="grid gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
