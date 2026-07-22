import type { Metadata } from "next";
import { companyInfo } from "@/lib/constants";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || companyInfo.website;

export const siteName = companyInfo.name;

export const defaultDescription =
  "Premium web development, SEO, social media management, and Google Business Profile optimization. Transform your digital presence with Hussaini IT Services.";

export const defaultKeywords = [
  "Hussaini IT Services",
  "web development UK",
  "SEO agency UAE",
  "digital marketing India",
  "Google Business Profile optimization",
  "social media management",
  "ecommerce development",
  "Next.js web agency",
  "local SEO High Wycombe",
  "web design Ujjain",
];

export const geoLocations = [
  {
    name: "High Wycombe, United Kingdom",
    region: "GB-BKM",
    placename: "High Wycombe",
    position: "51.6286;-0.7482",
    icbm: "51.6286, -0.7482",
  },
  {
    name: "Ujjain, India",
    region: "IN-MP",
    placename: "Ujjain",
    position: "23.1765;75.7885",
    icbm: "23.1765, 75.7885",
  },
];

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
  keywords?: string[];
  noindex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noindex = false,
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = `${siteUrl}/logo.svg`;
  const mergedKeywords = [...new Set([...defaultKeywords, ...keywords])];
  const primaryGeo = geoLocations[0];

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
      languages: {
        "en-GB": url,
        "en-AE": url,
        "en-IN": url,
        "x-default": url,
      },
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "technology",
    other: {
      "geo.region": primaryGeo.region,
      "geo.placename": primaryGeo.placename,
      "geo.position": primaryGeo.position,
      ICBM: primaryGeo.icbm,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      locale: "en_GB",
      alternateLocale: ["en_AE", "en_IN"],
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
    description: defaultDescription,
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "India" },
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "High Wycombe",
        addressRegion: "Buckinghamshire",
        addressCountry: "GB",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Ujjain",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      email: companyInfo.email,
      contactType: "customer service",
      areaServed: ["GB", "AE", "IN"],
      availableLanguage: ["English", "Hindi"],
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
    inLanguage: "en-GB",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.6286,
      longitude: -0.7482,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "High Wycombe",
      addressRegion: "Buckinghamshire",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "India" },
    ],
    serviceType: [
      "Web Development",
      "Search Engine Optimization",
      "Social Media Management",
      "Google Business Profile Optimization",
      "Ecommerce Development",
      "Digital Marketing",
      "Mobile App Development",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}
