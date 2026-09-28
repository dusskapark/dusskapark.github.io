import type { Metadata } from "next";
import type { ContentEntry } from "./content";
import { getContentUrl, getTranslations } from "./content";
import { site, isPreview } from "./site";

export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title,
      description,
      url: pathname,
      siteName: site.name,
      type: "website",
      images: [{ url: "/images/social.jpeg", alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/social.jpeg"],
    },
    robots: isPreview
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function contentMetadata(entry: ContentEntry): Metadata {
  const pathname = getContentUrl(entry);
  const description = entry.description || entry.subtitle || entry.title;
  const translations = getTranslations(entry);
  const alternates =
    translations.length > 1
      ? Object.fromEntries(
          translations.map((item) => [item.lang, getContentUrl(item)]),
        )
      : undefined;
  return {
    ...pageMetadata(entry.title, description, pathname),
    alternates: { canonical: pathname, languages: alternates },
    openGraph: {
      title: entry.title,
      description,
      url: pathname,
      siteName: site.name,
      type: "article",
      locale: entry.lang === "ko" ? "ko_KR" : "en_US",
      publishedTime: entry.date,
      authors: entry.authors?.length ? entry.authors : [site.author],
      images: [{ url: entry.hero || "/images/social.jpeg", alt: entry.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description,
      images: [entry.hero || "/images/social.jpeg"],
    },
  };
}
