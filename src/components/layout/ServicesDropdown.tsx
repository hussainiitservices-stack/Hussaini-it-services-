"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { allServices, featuredServices } from "@/lib/constants";

interface ServicesDropdownProps {
  open: boolean;
  onClose: () => void;
}

export function ServicesDropdown({ open, onClose }: ServicesDropdownProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[640px] overflow-hidden rounded-lg border border-border-strong bg-card shadow-[0_16px_48px_rgba(15,39,68,0.12)]"
        >
          <div className="border-b border-border bg-surface px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Digital Solutions
            </p>
            <p className="mt-1 text-sm text-muted">
              Full-service web, marketing & design for growing businesses
            </p>
          </div>

          <div className="grid grid-cols-3 gap-0 border-b border-border">
            {featuredServices.map((service) => (
              <Link
                key={service.title}
                href="/services"
                onClick={onClose}
                className="group border-r border-border last:border-r-0 p-5 transition-colors hover:bg-surface"
              >
                <div className="icon-box mb-3 h-10 w-10 group-hover:border-accent/30">
                  <service.icon size={18} />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {service.title.split(" ").slice(0, 2).join(" ")}
                </h4>
                <p className="text-xs text-muted line-clamp-2">{service.description}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-1 p-3">
            {allServices.map((service) => (
              <Link
                key={service.title}
                href="/services"
                onClick={onClose}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <service.icon size={15} className="text-accent shrink-0" />
                {service.title}
              </Link>
            ))}
          </div>

          <div className="border-t border-border bg-surface px-6 py-3">
            <Link
              href="/services"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              View All Services
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
