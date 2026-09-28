import type { MetadataRoute } from "next";
import { site, isPreview } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPreview ? { disallow: "/" } : { allow: "/" }),
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
