import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import {
  defaultDescription,
  defaultKeywords,
  geoLocations,
  localBusinessJsonLd,
  organizationJsonLd,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F2744",
  viewportFit: "cover",
};

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Premium Web & Digital Marketing`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  other: {
    "geo.region": geoLocations[0].region,
    "geo.placename": geoLocations[0].placename,
    "geo.position": geoLocations[0].position,
    ICBM: geoLocations[0].icbm,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-GB": siteUrl,
      "en-AE": siteUrl,
      "en-IN": siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title: `${siteName} | Premium Web & Digital Marketing`,
    description: "Crafting digital excellence with premium web and marketing solutions.",
    url: siteUrl,
    siteName,
    locale: "en_GB",
    type: "website",
    images: [{ url: "/logo.svg", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Premium Web & Digital Marketing`,
    description: "Crafting digital excellence with premium web and marketing solutions.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <GoogleAnalytics />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), localBusinessJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
