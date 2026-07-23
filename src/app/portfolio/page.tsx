import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { PageSeo } from "@/components/seo/PageSeo";
import { fetchPortfolio } from "@/lib/data/fetch";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, portfolioItemListJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Portfolio — Web Development & Digital Marketing Projects",
  description:
    "Explore completed web development, ecommerce, Shopify, and digital marketing projects delivered by Hussaini IT Services for clients in the UK, UAE, India, and worldwide.",
  path: "/portfolio",
  keywords: [
    "web development portfolio",
    "Shopify ecommerce projects",
    "React website examples",
    "digital marketing case studies",
  ],
});

export default async function PortfolioPage() {
  const items = await fetchPortfolio();

  const pageTitle = "Portfolio — Web Development & Digital Marketing Projects";
  const pageDescription =
    "Explore completed web development, ecommerce, Shopify, and digital marketing projects delivered by Hussaini IT Services for clients in the UK, UAE, India, and worldwide.";

  return (
    <>
      <PageSeo
        schemas={[
          webPageJsonLd({ title: pageTitle, description: pageDescription, path: "/portfolio" }),
          portfolioItemListJsonLd(items),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
          ]),
        ]}
      />
      <SiteLayout>
        <PageHeader
          badge="Portfolio"
          title="Our Work Speaks for Itself"
          subtitle="Successful projects across web development, ecommerce, and digital marketing."
        />
        <section className="py-12 sm:py-16 md:py-24" aria-labelledby="portfolio-projects-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="portfolio-projects-heading" className="sr-only">
              Featured client projects
            </h2>
            <PortfolioGrid items={items} showHeader />
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
