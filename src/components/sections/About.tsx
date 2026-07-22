"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-32">
      <div className="section-divider mb-12 sm:mb-20 md:mb-32" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll direction="right">
            <span className="section-badge mb-4">
              About Us
            </span>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl">
              Who We Are
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted sm:text-base">
              Hussaini IT Services is a premium digital solutions studio specializing in web
              development, mobile applications, SEO, and social media management. We partner
              with startups and enterprises to build technology that drives real business growth.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted sm:text-base">
              From industrial B2B brands to ecommerce stores and hospitality businesses, we combine
              technical excellence with strategic marketing to deliver solutions that perform —
              on time, on budget, and with uncompromising quality.
            </p>
            <MagneticButton href="/services" variant="secondary" className="w-full sm:w-auto">
              Our Services
              <ArrowRight size={16} />
            </MagneticButton>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { step: "01", title: "Research", desc: "We analyze your business, audience, and competitors." },
                { step: "02", title: "Strategy", desc: "A tailored plan aligned with your growth goals." },
                { step: "03", title: "Execution", desc: "Expert delivery with transparent communication." },
                { step: "04", title: "Growth", desc: "Ongoing optimization for lasting results." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="premium-card rounded-xl p-4 sm:p-6"
                >
                  <span className="font-display text-xl font-bold text-accent/40 sm:text-2xl">{item.step}</span>
                  <h3 className="mb-1 mt-2 font-display text-sm font-semibold sm:text-base">{item.title}</h3>
                  <p className="text-xs text-muted sm:text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
