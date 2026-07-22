"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroFeatures, stats } from "@/lib/constants";
import { AnimatedText, AnimatedLine } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";
import { Logo } from "@/components/ui/Logo";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <AnimatedLine delay={0.2}>
              <span className="section-badge mb-6 sm:mb-8">
                Premium IT Solutions
              </span>
            </AnimatedLine>

            <AnimatedText
              text="Grow Your Business with Digital Excellence"
              className="mb-5 font-display text-[1.85rem] font-bold leading-[1.15] tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
              delay={0.4}
            />

            <AnimatedLine delay={0.8} className="max-w-xl">
              <p className="text-base leading-relaxed text-muted sm:text-lg md:text-xl">
                We transform visionary ideas into elegant, scalable digital solutions.
                From SEO and social media to web development — we deliver technology that drives growth.
              </p>
            </AnimatedLine>

            <AnimatedLine delay={1} className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <MagneticButton href="/contact" variant="primary" className="w-full sm:w-auto">
                Start Your Project
                <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton href="/portfolio" variant="secondary" className="w-full sm:w-auto">
                View Our Work
              </MagneticButton>
            </AnimatedLine>

            <AnimatedLine delay={1.2} className="mt-10 grid grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-4 sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-xl font-bold accent-text sm:text-2xl md:text-3xl">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-[11px] text-muted sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </AnimatedLine>
          </div>

          <div className="relative hidden items-center justify-center lg:flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-full"
            >
              <div className="premium-card rounded-2xl p-10">
                <div className="mb-10 flex justify-center">
                  <Logo size="lg" showText={false} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {heroFeatures.map((feature, i) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="rounded-lg border border-border bg-surface p-5"
                    >
                      <div className="icon-box mb-3 h-10 w-10">
                        <feature.icon size={18} />
                      </div>
                      <h3 className="mb-1 font-display text-sm font-semibold">{feature.label}</h3>
                      <p className="text-xs text-muted">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:bottom-8 sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-10 w-6 rounded-full border border-border p-1">
            <motion.div
              className="h-2 w-full rounded-full bg-accent"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
