"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Expand, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ContentImage, type ContentImageData } from "./content-image";
import { ImageLightbox } from "./image-lightbox";

export type GalleryProps = {
  images: ContentImageData[];
  /** 1 renders a carousel; 2 or 3 render a grid. */
  columns?: 1 | 2 | 3;
  caption?: ReactNode;
  fullWidth?: boolean;
  /** Accessible name for the carousel or image group. */
  label?: string;
};

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
const isDocumentVisible = () => document.visibilityState === "visible";

function isPlainClick(event: MouseEvent) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function Gallery({
  images,
  columns = 2,
  caption,
  fullWidth = false,
  label = "Project images",
}: GalleryProps) {
  const rootRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLAnchorElement | null>(null);
  const autoplay = useRef(
    Autoplay({ delay: 6000, playOnInit: false, stopOnInteraction: false }),
  );
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, prefersReducedMotion, () => false);
  const documentVisible = useSyncExternalStore(subscribeVisibility, isDocumentVisible, () => true);
  const carousel = columns === 1 && images.length > 1;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !carousel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [carousel]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActive(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Autoplay only while the slideshow is wanted, visible, and not being read.
  const shouldPlay =
    carousel &&
    playing &&
    !paused &&
    visible &&
    documentVisible &&
    !reducedMotion &&
    viewerIndex === null;
  useEffect(() => {
    if (!api) return;
    const plugin = autoplay.current;
    if (shouldPlay) plugin.play();
    else plugin.stop();
  }, [api, shouldPlay]);

  function openImage(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    openerRef.current = event.currentTarget;
    setViewerIndex(index);
  }

  if (!images.length) return null;

  const slides = images.map((image, index) => (
    <a
      href={image.src}
      className="content-gallery-image-link"
      onClick={(event) => openImage(event, index)}
      aria-label={`Enlarge: ${image.alt || `image ${index + 1}`}`}
    >
      <ContentImage
        {...image}
        alt={image.alt || ""}
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
  ));

  return (
    <figure
      ref={rootRef}
      className={cn("content-gallery", fullWidth && "content-wide")}
      data-columns={columns}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setPaused(false);
      }}
    >
      {carousel ? (
        <Carousel
          setApi={setApi}
          opts={{ loop: true, duration: reducedMotion ? 1 : 28 }}
          plugins={[autoplay.current]}
          aria-label={label}
          className="content-gallery-carousel"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={`${image.src}-${index}`}
                className="content-gallery-slide"
                aria-label={`${index + 1} of ${images.length}`}
              >
                {slides[index]}
                {image.caption && (
                  <p className="content-caption">{image.caption}</p>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="content-gallery-controls">
            <div
              className="content-gallery-pagination"
              aria-live={shouldPlay ? "off" : "polite"}
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
                  {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="content-icon-button"
                aria-label="Previous image"
                onClick={() => api?.scrollPrev()}
              >
                <ArrowLeft aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="content-icon-button"
                aria-label="Next image"
                onClick={() => api?.scrollNext()}
              >
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Carousel>
      ) : (
        <div className="content-gallery-grid" role="group" aria-label={label}>
          {images.map((image, index) => (
            <div className="content-gallery-slide" key={`${image.src}-${index}`}>
              {slides[index]}
              {image.caption && <p className="content-caption">{image.caption}</p>}
            </div>
          ))}
        </div>
      )}
      {caption && <figcaption className="content-caption">{caption}</figcaption>}
      <ImageLightbox
        images={images}
        index={viewerIndex}
        onIndexChange={setViewerIndex}
        onClose={() => setViewerIndex(null)}
        returnFocus={() => openerRef.current?.focus()}
      />
    </figure>
  );
}
