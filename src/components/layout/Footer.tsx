"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { allServices, companyInfo } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";
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

const socialLinks = [
  { label: "LinkedIn", href: companyInfo.socials.linkedin, Icon: LinkedInIcon },
  { label: "Instagram", href: companyInfo.socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: companyInfo.socials.facebook, Icon: FacebookIcon },
  { label: "WhatsApp", href: companyInfo.socials.whatsapp, Icon: WhatsAppIcon },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-navy pt-12 pb-8 text-white sm:pt-16 md:pt-20 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo className="mb-6 [&_span]:text-white [&_.text-muted]:text-slate-400" />
            <p className="text-sm leading-relaxed text-slate-300">
              We transform visionary ideas into elegant, scalable digital solutions.
              From startups to enterprises, we deliver technology that drives growth.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-blue-200 transition-colors hover:border-blue-300/40 hover:bg-accent hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-blue-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
              Our Services
            </h3>
            <ul className="space-y-3">
              {allServices.slice(0, 7).map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="text-sm text-slate-300 transition-colors hover:text-blue-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-blue-300" />
                <span>
                  {companyInfo.locations.map((loc) => (
                    <span key={loc} className="block">
                      {loc}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="group inline-flex items-center gap-2 transition-colors hover:text-blue-300"
                >
                  <Mail size={14} className="shrink-0 text-blue-300" />
                  <span className="break-all">{companyInfo.email}</span>
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </li>
              {companyInfo.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2 transition-colors hover:text-blue-300"
                  >
                    <Phone size={14} className="shrink-0 text-blue-300" />
                    <span>
                      {phone.display}
                      <span className="ml-1 text-xs text-slate-500">({phone.label})</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={companyInfo.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-blue-300"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 text-blue-300" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:mt-16 sm:flex-row"
        >
          <p className="text-center text-sm text-slate-400 sm:text-left">
            © {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.
          </p>
          <p className="text-sm text-slate-500">Crafted with precision & elegance</p>
        </motion.div>
      </div>
    </footer>
  );
}
