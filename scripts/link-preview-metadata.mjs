import { load } from "cheerio";

export function httpUrl(value, base) {
  if (!value) return undefined;
  try {
    const url = new URL(value, base);
    return ["http:", "https:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

/** Read actual document metadata, preferring OG over Twitter and HTML defaults. */
export function parseMetadata(html, url) {
  const $ = load(html);
  const meta = (key) => $("meta").filter((_, el) =>
    ($(el).attr("property") || $(el).attr("name"))?.toLowerCase() === key
  ).first().attr("content")?.trim();
  return {
    url,
    title: meta("og:title") || meta("twitter:title") || $("title").text().trim() || new URL(url).hostname,
    description: meta("og:description") || meta("twitter:description") || meta("description") || "",
    image: httpUrl(meta("og:image") || meta("twitter:image"), url),
    imageAlt: meta("og:image:alt") || "",
    siteName: meta("og:site_name") || new URL(url).hostname,
    fetchedAt: new Date().toISOString(),
  };
}
