import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { fetchPortfolio } from "@/lib/data/fetch";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Portfolio — Web Development & Digital Marketing Projects",
  description:
    "Explore completed web development, ecommerce, and digital marketing projects delivered by Hussaini IT Services for clients worldwide.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const items = await fetchPortfolio();

  return (
    <SiteLayout>
      <PageHeader
        badge="Portfolio"
        title="Our Work Speaks for Itself"
        subtitle="Successful projects across web development, ecommerce, and digital marketing."
      />
      <section className="py-24" aria-labelledby="portfolio-projects-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 id="portfolio-projects-heading" className="sr-only">
            Featured client projects
          </h2>
          <PortfolioGrid items={items} showHeader />
        </div>
      </section>
    </SiteLayout>
  );
}
