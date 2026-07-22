import { HomePage } from "@/components/HomePage";
import { fetchPortfolio, fetchTestimonials } from "@/lib/data/fetch";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Premium Web Development, SEO & Digital Marketing",
  description:
    "Hussaini IT Services delivers premium web development, SEO, social media management, and Google Business Profile optimization for businesses in the UK, UAE, and India.",
  path: "/",
});

export default async function Home() {
  const [portfolio, testimonials] = await Promise.all([
    fetchPortfolio(),
    fetchTestimonials(),
  ]);

  return (
    <HomePage
      portfolio={portfolio.slice(0, 4)}
      testimonials={testimonials}
    />
  );
}
