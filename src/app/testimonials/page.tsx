import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { fetchTestimonials } from "@/lib/data/fetch";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Client Testimonials & Reviews",
  description:
    "Read what clients say about Hussaini IT Services — trusted for web development, SEO, and digital marketing across industries.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const items = await fetchTestimonials();

  return (
    <SiteLayout>
      <PageHeader
        badge="Testimonials"
        title="What Our Clients Say"
        subtitle="Trusted by businesses across industries — from industrial B2B to hospitality and creative professionals."
      />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <TestimonialsCarousel items={items} />
        </div>
      </section>
    </SiteLayout>
  );
}
