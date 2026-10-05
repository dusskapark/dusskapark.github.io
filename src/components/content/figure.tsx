import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ContentImage, type ContentImageData } from "./content-image";

export function Figure({
  caption,
  fullWidth = false,
  id,
  linkLabel,
  ...image
}: Omit<ContentImageData, "caption"> & {
  caption?: ReactNode;
  fullWidth?: boolean;
  id?: string;
  linkLabel?: string;
}) {
  return (
    <figure
      id={id}
      className={cn("content-figure", fullWidth && "content-wide")}
    >
      <a
        className="content-figure-link"
        href={image.src}
        target="_blank"
        rel="noreferrer"
        aria-label={linkLabel || `Open original ${image.alt || "image"}`}
      >
        <ContentImage {...image} />
      </a>
      {caption && (
        <figcaption className="content-caption">{caption}</figcaption>
      )}
    </figure>
  );
}
