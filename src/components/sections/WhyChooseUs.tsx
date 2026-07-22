"use client";

import { motion } from "framer-motion";
import { whyChooseUs, trackRecord } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CountUp } from "@/components/ui/CountUp";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Us"
          title="Grow Your Business with Our Agency"
          subtitle="We combine technical excellence with business acumen to deliver solutions that drive real results."
        />

        <div className="mb-12 grid gap-6 sm:mb-16 md:mb-24 md:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -4 }} className="premium-card h-full rounded-xl p-5 sm:p-6">
                <div className="icon-box mb-4 h-12 w-12">
                  <item.icon size={22} />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="premium-card rounded-2xl border border-border p-6 sm:p-10 md:p-16">
            <h3 className="mb-8 text-center font-display text-xl font-bold sm:mb-12 sm:text-2xl md:text-3xl">
              Our Track Record
            </h3>
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
              {trackRecord.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="font-display text-3xl font-bold accent-text sm:text-4xl md:text-5xl">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-xs text-muted sm:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
