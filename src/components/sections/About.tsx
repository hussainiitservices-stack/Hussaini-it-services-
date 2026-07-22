"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="section-divider mb-32" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll direction="right">
            <span className="section-badge mb-4">
              About Us
            </span>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl mb-6">
              Who We Are
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Hussaini IT Services is a premium digital solutions studio specializing in web
              development, mobile applications, SEO, and social media management. We partner
              with startups and enterprises to build technology that drives real business growth.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              From industrial B2B brands to ecommerce stores and hospitality businesses, we combine
              technical excellence with strategic marketing to deliver solutions that perform —
              on time, on budget, and with uncompromising quality.
            </p>
            <MagneticButton href="#services" variant="secondary">
              Our Services
              <ArrowRight size={16} />
            </MagneticButton>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
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
                  className="premium-card rounded-xl p-6"
                >
                  <span className="text-2xl font-display font-bold text-accent/40">{item.step}</span>
                  <h3 className="font-display font-semibold mt-2 mb-1">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
