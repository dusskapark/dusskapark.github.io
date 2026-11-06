import type { ComponentPropsWithoutRef } from "react";
import { ContentImage as OptimizedContentImage } from "./content-image";

/** Shared responsive image behavior for project content. */
export function ContentImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  sizes,
  loading,
}: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;
  return (
    <OptimizedContentImage
      src={src}
      alt={alt || ""}
      width={width ? Number(width) : undefined}
      height={height ? Number(height) : undefined}
      className={className}
      style={style}
      sizes={sizes}
      loading={loading}
    />
  );
}

/** Open external content links safely in a new tab. */
export function ContentLink({
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
