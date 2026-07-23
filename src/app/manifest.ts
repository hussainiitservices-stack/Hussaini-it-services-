import type { MetadataRoute } from "next";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Hussaini IT",
    description:
      "Premium web development, SEO, and digital marketing services for growing businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0F2744",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
