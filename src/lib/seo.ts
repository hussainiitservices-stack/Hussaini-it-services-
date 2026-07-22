import type { Metadata } from "next";
import { companyInfo } from "@/lib/constants";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || companyInfo.website;

export const siteName = companyInfo.name;

export const defaultDescription =
  "Premium web development, SEO, social media management, and Google Business Profile optimization. Transform your digital presence with Hussaini IT Services.";

export const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/testimonials", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" as const },
];

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = `${siteUrl}/logo.svg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      locale: "en_GB",
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    email: companyInfo.email,
    telephone: companyInfo.phone,
    areaServed: ["United Kingdom", "United Arab Emirates", "India"],
    address: {
      "@type": "PostalAddress",
      addressLocality: companyInfo.location,
    },
    sameAs: [companyInfo.website],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: `${siteUrl}/logo.svg`,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    url: siteUrl,
    image: `${siteUrl}/logo.svg`,
    description: defaultDescription,
    email: companyInfo.email,
    telephone: companyInfo.phone,
    priceRange: "$$",
    areaServed: ["GB", "AE", "IN"],
    serviceType: [
      "Web Development",
      "Search Engine Optimization",
      "Social Media Management",
      "Google Business Profile Optimization",
      "Ecommerce Development",
      "Digital Marketing",
    ],
  };
}
