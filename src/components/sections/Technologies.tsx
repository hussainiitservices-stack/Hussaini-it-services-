"use client";

import { technologies } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marquee } from "@/components/ui/Marquee";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Technologies() {
  return (
    <section id="technologies" className="relative overflow-hidden bg-surface py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Trusted Technologies"
          title="Built with Industry-Leading Tools"
          subtitle="We leverage cutting-edge technologies to deliver robust, scalable solutions."
        />
      </div>

      <RevealOnScroll>
        <Marquee items={technologies} speed={25} className="py-8" />
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <Marquee items={[...technologies].reverse()} speed={30} className="py-8" />
      </RevealOnScroll>
    </section>
  );
}
