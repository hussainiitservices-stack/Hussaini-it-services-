import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    // Do not set `host` — Googlebot ignores it (Yandex-only) and Search Console warns.
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
