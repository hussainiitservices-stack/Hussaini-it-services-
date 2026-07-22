import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Services } from "@/components/sections/Services";
import { AllServicesList } from "@/components/sections/AllServicesList";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageSeo } from "@/components/seo/PageSeo";
import { createPageMetadata } from "@/lib/seo";
import { serviceFaqs } from "@/lib/seo/content";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  servicesCatalogJsonLd,
  webPageJsonLd,
} from "@/lib/seo/jsonld";

export const metadata = createPageMetadata({
  title: "Services — SEO, Web Development & Digital Marketing",
  description:
    "SEO, social media management, Google Business Profile, web development, ecommerce, mobile apps, and brand design services from Hussaini IT Services in the UK, UAE, and India.",
  path: "/services",
  keywords: [
    "SEO services",
    "social media management agency",
    "Shopify development",
    "WordPress web design",
    "mobile app development",
    "local SEO services",
  ],
});

export default function ServicesPage() {
  const pageTitle = "Services — SEO, Web Development & Digital Marketing";
  const pageDescription =
    "SEO, social media management, Google Business Profile, web development, ecommerce, mobile apps, and brand design services from Hussaini IT Services in the UK, UAE, and India.";

  return (
    <>
      <PageSeo
        schemas={[
          webPageJsonLd({ title: pageTitle, description: pageDescription, path: "/services" }),
          servicesCatalogJsonLd(),
          faqJsonLd(serviceFaqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <SiteLayout>
        <PageHeader
          badge="Services"
          title="What We Offer"
          subtitle="Comprehensive digital solutions from SEO and social media to web development and ecommerce."
        />
        <Services />
        <section className="border-t border-border bg-surface py-12 sm:py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-3 text-center font-display text-2xl font-bold sm:mb-4 sm:text-3xl">All Services</h2>
            <p className="mx-auto mb-8 max-w-xl text-center text-sm text-muted sm:mb-12 sm:text-base">
              Everything you need to build, market, and grow your business online.
            </p>
            <AllServicesList />
          </div>
        </section>
        <FaqSection items={serviceFaqs} />
      </SiteLayout>
    </>
  );
}
