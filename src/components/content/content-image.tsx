import Image from "next/image";
import type { CSSProperties } from "react";

export type ContentImageData = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
};

export function ContentImage({
  src,
  alt = "",
  width,
  height,
  className,
  sizes = "(max-width: 768px) 100vw, 1120px",
  style,
  loading = "lazy",
}: ContentImageData & {
  className?: string;
  sizes?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
}) {
  const normalizedSrc = src.startsWith("//") ? `https:${src}` : src;
  if (width && height) {
    return (
      <Image
        src={normalizedSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        className={className}
        style={style}
        unoptimized={
          !normalizedSrc.startsWith("/") ||
          /\.(gif|svg)(?:[?#]|$)/i.test(normalizedSrc)
        }
      />
    );
  }
  // Historical remote assets have no trustworthy dimensions. A native image
  // preserves their original aspect ratio without inventing a crop or size.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={normalizedSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
