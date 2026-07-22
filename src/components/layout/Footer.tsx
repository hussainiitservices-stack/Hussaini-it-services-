"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { allServices, companyInfo } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-navy pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo className="mb-6 [&_span]:text-white [&_.text-silver]:text-slate-400" />
            <p className="text-sm text-slate-300 leading-relaxed">
              We transform visionary ideas into elegant, scalable digital solutions.
              From startups to enterprises, we deliver technology that drives growth.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-blue-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-blue-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider mb-4 text-white">
              Our Services
            </h3>
            <ul className="space-y-3">
              {allServices.slice(0, 7).map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="text-sm text-slate-300 hover:text-blue-300 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider mb-4 text-white">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-blue-300" />
                {companyInfo.location}
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="group inline-flex items-center gap-2 hover:text-blue-300 transition-colors"
                >
                  <Mail size={14} className="text-blue-300" />
                  {companyInfo.email}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-blue-300 transition-colors"
                >
                  <Phone size={14} className="text-blue-300" />
                  {companyInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row"
        >
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.
          </p>
          <p className="text-sm text-slate-500">
            Crafted with precision & elegance
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
