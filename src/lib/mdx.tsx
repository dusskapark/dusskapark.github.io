import type { ComponentPropsWithoutRef } from "react";
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
  ButtonLink,
} from "@/components/content";

/** Markdown images and <ContentImage> share the responsive, size-reserving renderer. */
function ContentImage({
  src,
  alt,
  width,
  height,
  className,
}: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;
  return (
    <OptimizedContentImage
      src={src}
      alt={alt || ""}
      width={width ? Number(width) : undefined}
      height={height ? Number(height) : undefined}
      className={className}
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
  ButtonLink,
  ContentImage,
  img: ContentImage,
  a: ContentLink,
} as unknown as Record<
  string,
  React.ComponentType<Record<string, unknown>>
>;
