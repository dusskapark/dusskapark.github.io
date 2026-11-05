import { XMLParser } from "fast-xml-parser";

export const mediumProfile = "https://dusskapark.medium.com";
const feedUrl = `${mediumProfile}/feed`;

export type MediumPost = {
  title: string;
  href: string;
  publishedAt: string;
  language: "ko" | "en";
};

type FeedItem = { title?: unknown; link?: unknown; pubDate?: unknown };

export async function fetchMediumFeed(): Promise<MediumPost[]> {
  const response = await fetch(feedUrl, { signal: AbortSignal.timeout(6000) });
  if (!response.ok) throw new Error(`Medium RSS returned HTTP ${response.status}`);

  const parser = new XMLParser({
    parseTagValue: false,
    processEntities: false,
    stopNodes: ["*.content:encoded", "*.description"],
    isArray: (_tag, path) => path === "rss.channel.item",
  });
  const feed = parser.parse(await response.text()) as {
    rss?: { channel?: { item?: FeedItem[] } };
  };
  const posts = new Map<string, MediumPost>();

  for (const item of feed.rss?.channel?.item ?? []) {
    if (typeof item.title !== "string" || typeof item.link !== "string" ||
        typeof item.pubDate !== "string") continue;
    const title = item.title.trim();
    const timestamp = Date.parse(item.pubDate);
    let url: URL;
    try {
      url = new URL(item.link);
    } catch {
      continue;
    }
    if (!title || !Number.isFinite(timestamp) || url.protocol !== "https:" ||
        (url.hostname !== "medium.com" && !url.hostname.endsWith(".medium.com"))) continue;

    url.search = "";
    url.hash = "";
    posts.set(url.href, {
      title,
      href: url.href,
      publishedAt: new Date(timestamp).toISOString(),
      language: /[가-힣]/.test(title) ? "ko" : "en",
    });
  }

  if (posts.size === 0) throw new Error("Medium RSS did not contain any usable posts");
  return [...posts.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
