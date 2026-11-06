"use client";

import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContentImage, type ContentImageData } from "./content-image";

export type LightboxImage = Omit<ContentImageData, "caption"> & {
  caption?: ReactNode;
};

/** Shared full-size viewer for galleries and single figures (shadcn Dialog). */
export function ImageLightbox({
  images,
  index,
  onIndexChange,
  onClose,
  returnFocus,
}: {
  images: LightboxImage[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  returnFocus?: () => void;
}) {
  const selected = index === null ? undefined : images[index];
  const step = (delta: number) =>
    index !== null &&
    onIndexChange((index + delta + images.length) % images.length);

  return (
    <Dialog open={index !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        closeLabel="Close image viewer"
        className="content-lightbox"
        onCloseAutoFocus={(event) => {
          if (!returnFocus) return;
          event.preventDefault();
          returnFocus();
        }}
        onKeyDown={(event) => {
          if (images.length < 2) return;
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          step(event.key === "ArrowRight" ? 1 : -1);
        }}
      >
        <DialogTitle className="content-sr-only">
          {selected?.alt || "Image"}
        </DialogTitle>
        <DialogDescription className="content-sr-only">
          {images.length > 1
            ? `Image ${(index ?? 0) + 1} of ${images.length}. Use the arrow keys to browse and Escape to close.`
            : "Press Escape to close."}
        </DialogDescription>
        {selected && (
          <div className="content-lightbox-image">
            <ContentImage
              src={selected.src}
              alt={selected.alt}
              loading="eager"
              sizes="94vw"
            />
          </div>
        )}
        <div className="content-lightbox-footer">
          <span aria-live="polite">
            {images.length > 1 && `${(index ?? 0) + 1} / ${images.length}`}
            {images.length > 1 && selected?.caption ? " — " : ""}
            {selected?.caption}
          </span>
          <div className="content-gallery-actions">
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="content-icon-button"
                  aria-label="Previous image"
                  onClick={() => step(-1)}
                >
                  <ArrowLeft aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="content-icon-button"
                  aria-label="Next image"
                  onClick={() => step(1)}
                >
                  <ArrowRight aria-hidden="true" />
                </Button>
              </>
            )}
            {selected && (
              <a
                href={selected.src}
                target="_blank"
                rel="noreferrer"
                className="content-original-link"
              >
                Open original ↗
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
