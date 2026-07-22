"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { companyInfo } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function CTA() {
  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="premium-card rounded-2xl border border-border p-6 text-center sm:p-12 md:p-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 inline-block section-badge sm:mb-6"
            >
              Get Started
            </motion.span>

            <h2 className="mb-4 font-display text-2xl font-bold sm:mb-6 sm:text-4xl md:text-5xl">
              Do You Have a Project and Want to Discuss With Us?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted sm:mb-10 sm:text-lg">
              Partner with us to build exceptional digital products. From concept to deployment,
              we bring your vision to life with precision and elegance.
            </p>

            <div className="mb-6 flex w-full flex-col items-stretch justify-center gap-3 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <MagneticButton href={`mailto:${companyInfo.email}`} variant="primary" className="w-full sm:w-auto">
                <Calendar size={16} />
                Schedule a Consultation
              </MagneticButton>
              <MagneticButton href="/portfolio" variant="secondary" className="w-full sm:w-auto">
                Explore Our Work
                <ArrowRight size={16} />
              </MagneticButton>
            </div>

            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-accent sm:text-base"
            >
              <Phone size={16} />
              Call Us: {companyInfo.phone}
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
