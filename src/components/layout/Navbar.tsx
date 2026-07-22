"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks, allServices } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Logo } from "@/components/ui/Logo";
import { ServicesDropdown } from "@/components/layout/ServicesDropdown";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const linkClass = (href: string) =>
    cn(
      "text-sm font-medium transition-colors",
      pathname === href ? "text-accent" : "text-muted hover:text-foreground"
    );

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8",
            scrolled && "nav-glass mx-2 rounded-lg py-3 sm:mx-4"
          )}
        >
          <Link href="/" className="group min-w-0 shrink" aria-label="Hussaini IT Services home">
            <Logo size="sm" />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>

            {navLinks.slice(0, 1).map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  pathname === "/services" ? "text-accent" : "text-muted hover:text-foreground"
                )}
              >
                Services
                <ChevronDown
                  size={14}
                  className={cn("transition-transform duration-200", servicesOpen && "rotate-180")}
                />
              </button>
              <ServicesDropdown open={servicesOpen} onClose={() => setServicesOpen(false)} />
            </div>

            {navLinks.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <MagneticButton href="/contact" variant="primary" className="!px-6 !py-2.5 !text-xs">
              Contact Us
            </MagneticButton>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-navy/20 backdrop-blur-[2px] lg:hidden"
              aria-label="Close menu overlay"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-3 top-[4.5rem] z-50 max-h-[min(80vh,calc(100dvh-5.5rem))] overflow-y-auto rounded-lg nav-glass p-5 sm:inset-x-4 sm:top-20 sm:p-6 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                <Link href="/" onClick={() => setMobileOpen(false)} className="py-2.5 text-muted hover:text-foreground">
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 text-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-muted hover:text-foreground"
                >
                  Services
                </Link>
                <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-widest text-silver">
                  All Services
                </p>
                {allServices.map((service) => (
                  <Link
                    key={service.title}
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-2.5 text-sm text-muted hover:text-foreground"
                  >
                    <service.icon size={14} className="shrink-0 text-accent" />
                    {service.title}
                  </Link>
                ))}
                <MagneticButton href="/contact" variant="primary" className="mt-4 w-full">
                  Contact Us
                </MagneticButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
