import type { ComponentPropsWithoutRef } from "react";
import mediaManifest from "../../migration/media-manifest.json";
import { ContentImage as OptimizedContentImage } from "@/components/content/content-image";
import {
  Gallery,
  MediaEmbed,
  QuoteCard,
  StoreBadges,
  AppDownloads,
  LinkPreview,
  LinkPreviewGrid,
  TweetEmbed,
  Timeline,
  TimelineItem,
  Figure,
} from "@/components/content";

type MediaItem = { src: string; width?: number; height?: number };
const imageMetadata = new Map(
  (mediaManifest as MediaItem[]).map((image) => [decodeURI(image.src), image]),
);

/** Resolves known intrinsic dimensions so images reserve space and avoid layout shift. */
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
      width={metadata?.width ?? (width ? Number(width) : undefined)}
      height={metadata?.height ?? (height ? Number(height) : undefined)}
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
      target={external ? "_blank" : props.target}
    >
      {children}
    </a>
  );
}

/** Custom components available to every MDX project/post body. */
export const mdxComponents = {
  Gallery,
  MediaEmbed,
  QuoteCard,
  StoreBadges,
  AppDownloads,
  LinkPreview,
  LinkPreviewGrid,
  TweetEmbed,
  Timeline,
  TimelineItem,
  Figure,
  ContentImage,
  img: ContentImage,
  a: ContentLink,
} as unknown as Record<
  string,
  React.ComponentType<Record<string, unknown>>
>;
