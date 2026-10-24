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
  style,
  loading = "lazy",
}: ContentImageData & {
  className?: string;
  /** Accepted for call-site compatibility; native <img> ignores it without srcset. */
  sizes?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
}) {
  const normalizedSrc = src.startsWith("//") ? `https:${src}` : src;
  return (
    <img
      src={normalizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
