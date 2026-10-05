"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight, Expand, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ContentImage, type ContentImageData } from "./content-image";

export type GalleryProps = {
  images: ContentImageData[];
  columns?: 1 | 2 | 3;
  caption?: ReactNode;
  fullWidth?: boolean;
};

const subscribeHydration = () => () => {};
const hydrated = () => true;
const notHydrated = () => false;
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDocumentVisible = () => document.visibilityState === "visible";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export function Gallery({
  images,
  columns = 2,
  caption,
  fullWidth = false,
}: GalleryProps) {
  const id = useId();
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLAnchorElement | null>(null);
  const enhanced = useSyncExternalStore(
    subscribeHydration,
    hydrated,
    notHydrated,
  );
  const [active, setActive] = useState(0);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const documentVisible = useSyncExternalStore(
    subscribeVisibility,
    isDocumentVisible,
    hydrated,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    prefersReducedMotion,
    hydrated,
  );
  const carousel = columns === 1 && images.length > 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const next = (index + images.length) % images.length;
      const slide = track.children[next] as HTMLElement | undefined;
      if (!slide) return;
      track.scrollTo({
        left: slide.offsetLeft,
        behavior: reducedMotion ? "instant" : "smooth",
      });
    },
    [images.length, reducedMotion],
  );

  const autoplay =
    carousel &&
    playing &&
    visible &&
    documentVisible &&
    !hovered &&
    !focused &&
    !reducedMotion &&
    viewerIndex === null;
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => goTo(active + 1), 6000);
    return () => window.clearInterval(timer);
  }, [active, autoplay, goTo]);

  function openImage(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    openerRef.current = event.currentTarget;
    setViewerIndex(index);
  }

  function updateActive() {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    let closest = 0;
    let distance = Infinity;
    slides.forEach((slide, index) => {
      const nextDistance = Math.abs(slide.offsetLeft - track.scrollLeft);
      if (nextDistance < distance) {
        distance = nextDistance;
        closest = index;
      }
    });
    setActive(closest);
  }

  const selected = viewerIndex === null ? undefined : images[viewerIndex];
  if (!images.length) return null;

  return (
    <figure
      ref={rootRef}
      className={cn("content-gallery", fullWidth && "content-wide")}
      data-columns={columns}
      data-enhanced={enhanced ? "true" : "false"}
      aria-label="Project image gallery"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false);
      }}
    >
      <div
        id={`${id}-slides`}
        ref={trackRef}
        className={cn(
          "content-gallery-track",
          columns === 1 ? "content-gallery-carousel" : "content-gallery-grid",
        )}
        onScroll={carousel ? updateActive : undefined}
        role={carousel ? "group" : undefined}
        aria-roledescription={carousel ? "carousel" : undefined}
        aria-label={carousel ? "Project images" : undefined}
        onKeyDown={(event) => {
          if (
            !carousel ||
            (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
          )
            return;
          event.preventDefault();
          goTo(active + (event.key === "ArrowRight" ? 1 : -1));
        }}
      >
        {images.map((image, index) => (
          <div
            className="content-gallery-slide"
            key={`${image.src}-${index}`}
            role={carousel ? "group" : undefined}
            aria-roledescription={carousel ? "slide" : undefined}
            aria-label={
              carousel ? `${index + 1} of ${images.length}` : undefined
            }
          >
            <a
              href={image.src}
              className="content-gallery-image-link"
              onClick={(event) => openImage(event, index)}
              aria-label={`Enlarge ${image.alt || `image ${index + 1}`}`}
            >
              <ContentImage
                {...image}
                alt={
                  image.alt || `Project image ${index + 1} of ${images.length}`
                }
                sizes={
                  columns === 1
                    ? "(max-width: 768px) 100vw, 1120px"
                    : `(max-width: 768px) 100vw, ${Math.round(1120 / columns)}px`
                }
              />
              <span className="content-gallery-expand" aria-hidden="true">
                <Expand size={16} />
              </span>
            </a>
            {image.caption && (
              <p className="content-caption">{image.caption}</p>
            )}
          </div>
        ))}
      </div>
      {carousel && enhanced && (
        <div className="content-gallery-controls">
          <div
            className="content-gallery-pagination"
            aria-live={autoplay ? "off" : "polite"}
            aria-atomic="true"
          >
            <span>{String(active + 1).padStart(2, "0")}</span>
            <span aria-hidden="true"> / </span>
            <span className="content-gallery-total">
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
          <div className="content-gallery-actions">
            {!reducedMotion && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="content-icon-button"
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                aria-pressed={!playing}
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <Pause aria-hidden="true" />
                ) : (
                  <Play aria-hidden="true" />
                )}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="content-icon-button"
              aria-controls={`${id}-slides`}
              aria-label="Previous image"
              onClick={() => goTo(active - 1)}
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="content-icon-button"
              aria-controls={`${id}-slides`}
              aria-label="Next image"
              onClick={() => goTo(active + 1)}
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
      {caption && (
        <figcaption className="content-caption">{caption}</figcaption>
      )}
      <Dialog
        open={viewerIndex !== null}
        onOpenChange={(open) => {
          if (!open) setViewerIndex(null);
        }}
      >
        <DialogContent
          className="content-lightbox"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            openerRef.current?.focus();
          }}
          onKeyDown={(event) => {
            if (
              viewerIndex === null ||
              !["ArrowLeft", "ArrowRight"].includes(event.key)
            )
              return;
            event.preventDefault();
            setViewerIndex(
              (viewerIndex +
                (event.key === "ArrowRight" ? 1 : -1) +
                images.length) %
                images.length,
            );
          }}
        >
          <DialogTitle className="content-sr-only">
            {selected?.alt || "Project image"}
          </DialogTitle>
          <DialogDescription className="content-sr-only">
            Image {(viewerIndex ?? 0) + 1} of {images.length}. Use the arrow
            keys to browse and Escape to close.
          </DialogDescription>
          {selected && (
            <div className="content-lightbox-image">
              <ContentImage {...selected} loading="eager" sizes="100vw" />
            </div>
          )}
          <div className="content-lightbox-footer">
            <span aria-live="polite">
              {(viewerIndex ?? 0) + 1} / {images.length}
              {selected?.caption ? ` — ${selected.caption}` : ""}
            </span>
            <div className="content-gallery-actions">
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="content-icon-button"
                    aria-label="Previous enlarged image"
                    onClick={() =>
                      setViewerIndex(
                        ((viewerIndex ?? 0) - 1 + images.length) %
                          images.length,
                      )
                    }
                  >
                    <ArrowLeft aria-hidden="true" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="content-icon-button"
                    aria-label="Next enlarged image"
                    onClick={() =>
                      setViewerIndex(((viewerIndex ?? 0) + 1) % images.length)
                    }
                  >
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </>
              )}
              <a
                href={selected?.src}
                target="_blank"
                rel="noreferrer"
                className="content-original-link"
              >
                Open original ↗
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </figure>
  );
}
