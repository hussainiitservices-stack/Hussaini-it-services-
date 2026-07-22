"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { featuredServices } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

function ServicePreviewCard({
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
    <RevealOnScroll delay={index * 0.1}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="group premium-card h-full rounded-xl p-6"
      >
        <div className="icon-box mb-5 h-12 w-12">
          <service.icon size={22} />
        </div>
        <h3 className="mb-2 font-display text-lg font-bold">{service.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{service.description}</p>
      </motion.div>
    </RevealOnScroll>
  );
}

export function HomeServicesPreview() {
  return (
    <section className="relative border-t border-border bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Services"
          title="What We Offer"
          subtitle="Focused digital marketing and web solutions to grow your brand, improve visibility, and drive measurable results."
        />

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) => (
            <ServicePreviewCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <ExploreLink href="/services" label="Explore all services" />
        </div>
      </div>
    </section>
  );
}
