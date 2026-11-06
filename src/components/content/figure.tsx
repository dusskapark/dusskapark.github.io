"use client";

import { useRef, useState, type ReactNode } from "react";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentImage, type ContentImageData } from "./content-image";
import { ImageLightbox } from "./image-lightbox";

/** A single captioned image that opens the shared full-size viewer. */
export function Figure({
  caption,
  fullWidth = false,
  id,
  ...image
}: Omit<ContentImageData, "caption"> & {
  caption?: ReactNode;
  fullWidth?: boolean;
  id?: string;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <figure
      id={id}
      className={cn("content-figure", fullWidth && "content-wide")}
    >
      <a
        ref={linkRef}
        className="content-gallery-image-link content-figure-link"
        href={image.src}
        aria-label={`Enlarge: ${image.alt || "image"}`}
        onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        <ContentImage
          {...image}
          sizes={fullWidth ? "(max-width: 768px) 100vw, 1120px" : "(max-width: 768px) 100vw, 760px"}
        />
        <span className="content-gallery-expand" aria-hidden="true">
          <Expand size={16} />
        </span>
      </a>
      {caption && <figcaption className="content-caption">{caption}</figcaption>}
      <ImageLightbox
        images={[{ ...image, caption }]}
        index={open ? 0 : null}
        onIndexChange={() => {}}
        onClose={() => setOpen(false)}
        returnFocus={() => linkRef.current?.focus()}
      />
    </figure>
  );
}
