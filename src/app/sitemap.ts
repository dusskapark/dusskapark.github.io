import type { MetadataRoute } from "next";
import { getAllContent, getContentUrl } from "@/lib/content";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/projects", "/blog", "/about"].map((path) => ({
      url: `${site.url}${path}`,
    })),
    ...[...getAllContent("project", true), ...getAllContent("post", true)].map(
      (entry) => ({ url: `${site.url}${getContentUrl(entry)}` }),
    ),
  ];
}
