import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Us — Web Development & Digital Marketing Agency",
  description:
    "Learn about Hussaini IT Services — a premium web development and digital marketing agency serving clients in the UK, UAE, and India.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        badge="About Us"
        title="Discover the Power of Digital Excellence"
        subtitle="We combine technical excellence with strategic marketing to deliver solutions that drive real business growth."
      />
      <About />
      <WhyChooseUs />
    </SiteLayout>
  );
}
