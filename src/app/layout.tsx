import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  defaultDescription,
  localBusinessJsonLd,
  organizationJsonLd,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

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
  keywords: [
    "SEO",
    "social media management",
    "Google Business Profile",
    "web development",
    "ecommerce",
    "digital marketing",
    "Hussaini IT Services",
    "UK web agency",
    "UAE digital marketing",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteUrl },
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
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), localBusinessJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
