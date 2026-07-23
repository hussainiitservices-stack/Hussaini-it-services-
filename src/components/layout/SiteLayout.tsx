"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PremiumBackground } from "@/components/ui/PremiumBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <SmoothScroll>
      <PremiumBackground />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
