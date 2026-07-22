import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Services } from "@/components/sections/Services";
import { AllServicesList } from "@/components/sections/AllServicesList";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Services — SEO, Web Development & Digital Marketing",
  description:
    "SEO, social media management, Google Business Profile, web development, ecommerce, mobile apps, and brand design services from Hussaini IT Services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        badge="Services"
        title="What We Offer"
        subtitle="Comprehensive digital solutions from SEO and social media to web development and ecommerce."
      />
      <Services />
      <section className="py-24 border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-4">All Services</h2>
          <p className="text-muted text-center mb-12 max-w-xl mx-auto">
            Everything you need to build, market, and grow your business online.
          </p>
          <AllServicesList />
        </div>
      </section>
    </SiteLayout>
  );
}
