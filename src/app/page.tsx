import { HomePage } from "@/components/HomePage";
import { PageSeo } from "@/components/seo/PageSeo";
import { fetchPortfolio, fetchTestimonials } from "@/lib/data/fetch";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";

export const metadata = createPageMetadata({
  title: "Premium Web Development, SEO & Digital Marketing",
  description:
    "Hussaini IT Services delivers premium web development, SEO, social media management, and Google Business Profile optimization for businesses in the UK, UAE, and India.",
  path: "/",
  keywords: [
    "web development agency",
    "SEO services UK",
    "digital marketing UAE",
    "Google Business Profile expert",
  ],
});

export default async function Home() {
  const [portfolio, testimonials] = await Promise.all([
    fetchPortfolio(),
    fetchTestimonials(),
  ]);

  const pageTitle = "Premium Web Development, SEO & Digital Marketing";
  const pageDescription =
    "Hussaini IT Services delivers premium web development, SEO, social media management, and Google Business Profile optimization for businesses in the UK, UAE, and India.";

  return (
    <>
      <PageSeo
        schemas={[
          webPageJsonLd({ title: pageTitle, description: pageDescription, path: "/" }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
        ]}
      />
      <HomePage portfolio={portfolio.slice(0, 4)} testimonials={testimonials} />
    </>
  );
}
