import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { PageSeo } from "@/components/seo/PageSeo";
import { fetchTestimonials } from "@/lib/data/fetch";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, testimonialsItemListJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";

export const metadata = createPageMetadata({
  title: "Client Testimonials & Reviews",
  description:
    "Read verified client reviews for Hussaini IT Services — trusted for web development, SEO, social media, and digital marketing across B2B, ecommerce, and hospitality.",
  path: "/testimonials",
  keywords: [
    "Hussaini IT Services reviews",
    "web development testimonials",
    "SEO client feedback",
    "digital marketing reviews UAE",
  ],
});

export default async function TestimonialsPage() {
  const items = await fetchTestimonials();

  const pageTitle = "Client Testimonials & Reviews";
  const pageDescription =
    "Read verified client reviews for Hussaini IT Services — trusted for web development, SEO, social media, and digital marketing across B2B, ecommerce, and hospitality.";

  return (
    <>
      <PageSeo
        schemas={[
          webPageJsonLd({ title: pageTitle, description: pageDescription, path: "/testimonials" }),
          testimonialsItemListJsonLd(items),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Testimonials", path: "/testimonials" },
          ]),
        ]}
      />
      <SiteLayout>
        <PageHeader
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by businesses across industries — from industrial B2B to hospitality and creative professionals."
        />
        <section className="py-12 sm:py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TestimonialsCarousel items={items} />
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
