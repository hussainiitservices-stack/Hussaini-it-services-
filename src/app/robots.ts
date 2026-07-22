import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llm.txt", "/sitemap.txt"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "Google-Extended", "PerplexityBot"],
        allow: ["/", "/llm.txt", "/sitemap.txt"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
