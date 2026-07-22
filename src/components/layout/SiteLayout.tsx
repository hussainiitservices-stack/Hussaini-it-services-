"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PremiumBackground } from "@/components/ui/PremiumBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <SmoothScroll>
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>
      <PremiumBackground />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
