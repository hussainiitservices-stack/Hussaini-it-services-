"use client";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Technologies } from "@/components/sections/Technologies";
import { CTA } from "@/components/sections/CTA";
import { HomeAboutPreview } from "@/components/sections/home/HomeAboutPreview";
import { HomeServicesPreview } from "@/components/sections/home/HomeServicesPreview";
import { HomePortfolioPreview } from "@/components/sections/home/HomePortfolioPreview";
import { HomeTestimonialsPreview } from "@/components/sections/home/HomeTestimonialsPreview";
import type { DbPortfolio, DbTestimonial } from "@/lib/types/database";

interface HomePageProps {
  portfolio: DbPortfolio[];
  testimonials: DbTestimonial[];
}

export function HomePage({ portfolio, testimonials }: HomePageProps) {
  return (
    <SiteLayout>
      <Hero />
      <HomeAboutPreview />
      <HomeServicesPreview />
      <WhyChooseUs />
      <HomePortfolioPreview items={portfolio} />
      <Technologies />
      <HomeTestimonialsPreview items={testimonials} />
      <CTA />
    </SiteLayout>
  );
}
