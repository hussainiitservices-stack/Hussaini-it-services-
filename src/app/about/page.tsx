import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PageSeo } from "@/components/seo/PageSeo";
import { createPageMetadata } from "@/lib/seo";
import { aboutPageJsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";

export const metadata = createPageMetadata({
  title: "About Us — Web Development & Digital Marketing Agency",
  description:
    "Learn about Hussaini IT Services — a premium web development and digital marketing agency serving clients in High Wycombe UK, UAE, India, and worldwide.",
  path: "/about",
  keywords: [
    "about Hussaini IT Services",
    "web agency High Wycombe",
    "digital marketing team UAE",
    "IT services Ujjain India",
  ],
});

export default function AboutPage() {
  const pageTitle = "About Us — Web Development & Digital Marketing Agency";
  const pageDescription =
    "Learn about Hussaini IT Services — a premium web development and digital marketing agency serving clients in High Wycombe UK, UAE, India, and worldwide.";

  return (
    <>
      <PageSeo
        schemas={[
          webPageJsonLd({ title: pageTitle, description: pageDescription, path: "/about" }),
          aboutPageJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <SiteLayout>
        <PageHeader
          badge="About Us"
          title="Discover the Power of Digital Excellence"
          subtitle="We combine technical excellence with strategic marketing to deliver solutions that drive real business growth."
        />
        <About />
        <WhyChooseUs />
      </SiteLayout>
    </>
  );
}
