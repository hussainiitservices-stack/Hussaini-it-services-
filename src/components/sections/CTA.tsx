"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { companyInfo } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function CTA() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RevealOnScroll>
          <div className="premium-card rounded-2xl p-12 md:p-20 text-center border border-border">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6 inline-block section-badge"
            >
              Get Started
            </motion.span>

            <h2 className="font-display text-4xl font-bold md:text-5xl mb-6">
              Do You Have a Project and Want to Discuss With Us?
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-muted mb-10 leading-relaxed">
              Partner with us to build exceptional digital products. From concept to deployment,
              we bring your vision to life with precision and elegance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <MagneticButton href={`mailto:${companyInfo.email}`} variant="primary">
                <Calendar size={16} />
                Schedule a Consultation
              </MagneticButton>
              <MagneticButton href="/portfolio" variant="secondary">
                Explore Our Work
                <ArrowRight size={16} />
              </MagneticButton>
            </div>

            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
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
