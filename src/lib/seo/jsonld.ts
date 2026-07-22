import { companyInfo, featuredServices, allServices } from "@/lib/constants";
import type { DbPortfolio, DbTestimonial } from "@/lib/types/database";
import { defaultDescription, siteName, siteUrl } from "@/lib/seo";

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteUrl}${path}`,
    isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
    about: { "@type": "Organization", name: siteName, url: siteUrl },
    inLanguage: "en-GB",
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function servicesCatalogJsonLd() {
  const featured = featuredServices.map((service) => ({
    title: service.title,
    description: service.description,
  }));

  const additional = allServices.map((service) => ({
    title: service.title,
    description: `${service.title} services by ${siteName}.`,
  }));

  const unique = new Map<string, { title: string; description: string }>();
  for (const service of [...featured, ...additional]) {
    if (!unique.has(service.title)) {
      unique.set(service.title, service);
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteName} Services`,
    description: "Digital marketing, SEO, web development, and ecommerce services.",
    itemListElement: [...unique.values()].map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
        },
        areaServed: ["United Kingdom", "United Arab Emirates", "India"],
      },
    })),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteName}`,
    description: `Contact ${siteName} for web development, SEO, and digital marketing inquiries.`,
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      email: companyInfo.email,
      telephone: companyInfo.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: companyInfo.location,
        addressCountry: "GB",
      },
    },
  };
}

export function portfolioItemListJsonLd(items: DbPortfolio[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteName} Portfolio`,
    description: "Web development, ecommerce, and digital marketing projects delivered for global clients.",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        description: item.description,
        genre: item.category,
        url: item.project_url || `${siteUrl}/portfolio`,
        creator: { "@type": "Organization", name: siteName, url: siteUrl },
        keywords: item.tags?.join(", "),
      },
    })),
  };
}

export function testimonialsItemListJsonLd(items: DbTestimonial[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteName} Client Reviews`,
    description: defaultDescription,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: item.name,
          jobTitle: item.role,
        },
        reviewBody: item.quote,
        reviewRating: {
          "@type": "Rating",
          ratingValue: item.rating,
          bestRating: 5,
        },
        itemReviewed: {
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
        },
      },
    })),
  };
}

export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteName}`,
    description: `Learn about ${siteName} — a premium web development and digital marketing agency serving the UK, UAE, and India.`,
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      description: defaultDescription,
      email: companyInfo.email,
      telephone: companyInfo.phone,
      foundingDate: "2024",
      knowsAbout: [
        "Web Development",
        "Search Engine Optimization",
        "Social Media Marketing",
        "Ecommerce Development",
        "Google Business Profile",
      ],
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "India" },
      ],
    },
  };
}
