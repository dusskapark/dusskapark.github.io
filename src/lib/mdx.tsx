import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import GithubSlugger from "github-slugger";
import { createProcessor } from "@mdx-js/mdx";
import type { ComponentPropsWithoutRef } from "react";
import type { ContentEntry, ContentHeading } from "./content-schema";
import mediaManifest from "../../migration/media-manifest.json";
import { ContentImage as OptimizedContentImage } from "@/components/content/content-image";
import {
  Gallery,
  MediaEmbed,
  QuoteCard,
  StoreBadges,
  TweetEmbed,
  Timeline,
  TimelineItem,
  Figure,
} from "@/components/content";

type HtmlNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HtmlNode[];
};
const nodeText = (node: HtmlNode): string =>
  node.type === "text"
    ? node.value || ""
    : (node.children || []).map(nodeText).join("");
const headingKey = (text: string) =>
  text
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

/** Preserve the heading anchors published by Jekyll, including its punctuation rules. */
function legacyHeadingIds(headings: ContentHeading[]) {
  return function plugin() {
    return function transform(tree: HtmlNode) {
      const byText = new Map<string, string[]>();
      for (const heading of headings) {
        const key = headingKey(heading.text);
        byText.set(key, [...(byText.get(key) || []), heading.id]);
      }
      function visit(node: HtmlNode) {
        if (node.tagName && /^h[1-6]$/.test(node.tagName)) {
          const id = byText.get(headingKey(nodeText(node)))?.shift();
          if (id) node.properties = { ...node.properties, id };
        }
        node.children?.forEach(visit);
      }
      visit(tree);
    };
  };
}

type MarkdownNode = {
  type: string;
  value?: string;
  depth?: number;
  children?: MarkdownNode[];
};
function markdownText(node: MarkdownNode): string {
  if (node.type === "html") return (node.value || "").replace(/<[^>]*>/g, "");
  if (node.value !== undefined) return node.value;
  return (node.children || []).map(markdownText).join("");
}

/** The body is authoritative; frozen metadata only supplies already-published ids. */
function currentHeadings(entry: ContentEntry): ContentHeading[] {
  const legacy = new Map<string, string[]>();
  for (const heading of entry.headings) {
    const key = headingKey(heading.text);
    legacy.set(key, [...(legacy.get(key) || []), heading.id]);
  }
  const slugger = new GithubSlugger();
  const result: ContentHeading[] = [];
  const tree = createProcessor({ remarkPlugins: [remarkGfm] }).parse(
    entry.body,
  ) as MarkdownNode;
  function visit(node: MarkdownNode) {
    if (node.type === "heading" && node.depth) {
      const text = markdownText(node).trim();
      const generated = slugger.slug(text);
      result.push({
        depth: node.depth,
        text,
        id: legacy.get(headingKey(text))?.shift() || generated,
      });
    }
    node.children?.forEach(visit);
  }
  visit(tree);
  return result;
}
export function getTableOfContents(entry: ContentEntry): ContentHeading[] {
  return currentHeadings(entry).filter((heading) => heading.depth <= 3);
}

const imageMetadata = new Map(
  mediaManifest.map((image) => [decodeURI(image.src), image]),
);
function ContentImage({
  src,
  alt,
  width,
  height,
  className,
  style,
}: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;
  const metadata = imageMetadata.get(decodeURI(src));
  return (
    <OptimizedContentImage
      src={src}
      alt={alt || ""}
      width={
        metadata && "width" in metadata
          ? metadata.width
          : width
            ? Number(width)
            : undefined
      }
      height={
        metadata && "height" in metadata
          ? metadata.height
          : height
            ? Number(height)
            : undefined
      }
      className={className}
      style={style}
    />
  );
}
function ContentLink({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const external = href?.startsWith("https://") || href?.startsWith("http://");
  return (
    <a
      {...props}
      href={href}
      rel={external ? "noopener noreferrer" : props.rel}
    >
      {children}
    </a>
  );
}

export async function ContentBody({ entry }: { entry: ContentEntry }) {
  const { content } = await compileMDX({
    source: entry.body,
    components: {
      Gallery,
      MediaEmbed,
      QuoteCard,
      StoreBadges,
      TweetEmbed,
      Timeline,
      TimelineItem,
      Figure,
      ContentImage,
      img: ContentImage,
      a: ContentLink,
    },
    options: {
      // Only local, reviewed repository content is compiled. Preserve literal JSX
      // props and fragments while retaining the dangerous-JavaScript guard.
      blockJS: false,
      blockDangerousJS: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          legacyHeadingIds(currentHeadings(entry)),
          [
            rehypePrettyCode,
            {
              theme: "github-dark-default",
              keepBackground: false,
              defaultLang: { block: "plaintext", inline: "plaintext" },
            },
          ],
        ],
      },
    },
  });
  return (
    <div className="prose content-body" lang={entry.lang}>
      {content}
    </div>
  );
}
