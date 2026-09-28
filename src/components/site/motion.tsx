"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** The server output is fully visible; motion is a progressive enhancement. */
export function PortraitMotion({ children }: { children: ReactNode }) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
    );
    const target = element.current;
    if (!target || !media.matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = target.getBoundingClientRect();
      const progress = Math.max(
        -1,
        Math.min(
          1,
          (top + height / 2 - window.innerHeight / 2) / window.innerHeight,
        ),
      );
      target.style.setProperty("--portrait-shift", `${progress * 20}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onPreference = () => {
      if (!media.matches) {
        window.removeEventListener("scroll", onScroll);
        target.style.removeProperty("--portrait-shift");
      } else {
        window.addEventListener("scroll", onScroll, { passive: true });
      }
    };
    media.addEventListener("change", onPreference);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", onPreference);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={element} className="portrait-motion">
      {children}
    </div>
  );
}

const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;
const serverScrollState = () => 0;

export function CarouselFrame({ children }: { children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const ready = useSyncExternalStore(
    subscribeHydration,
    clientHydrated,
    serverHydrated,
  );
  const subscribeScroll = useCallback((onChange: () => void) => {
    const element = viewport.current;
    if (!element) return () => {};
    const observer = new ResizeObserver(onChange);
    observer.observe(element);
    element.addEventListener("scroll", onChange, { passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", onChange);
    };
  }, []);
  const getScrollState = useCallback(() => {
    const element = viewport.current;
    if (!element) return 0;
    return (
      (element.scrollLeft > 4 ? 1 : 0) |
      (element.scrollLeft + element.clientWidth < element.scrollWidth - 4
        ? 2
        : 0)
    );
  }, []);
  const scrollState = useSyncExternalStore(
    subscribeScroll,
    getScrollState,
    serverScrollState,
  );
  const canPrevious = Boolean(scrollState & 1);
  const canNext = Boolean(scrollState & 2);

  const move = (direction: number) => {
    const element = viewport.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>(".project-card");
    const gap =
      Number.parseFloat(window.getComputedStyle(element).columnGap) || 24;
    const distance = card
      ? card.getBoundingClientRect().width + gap
      : element.clientWidth;
    element.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <div
      className="projects-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects"
    >
      <div
        ref={viewport}
        className="projects-carousel-viewport"
        tabIndex={0}
        aria-label="Scroll through selected projects"
      >
        {children}
      </div>
      {ready ? (
        <div className="carousel-controls">
          <span>Explore the projects</span>
          <div>
            <button
              className="round-button"
              type="button"
              onClick={() => move(-1)}
              disabled={!canPrevious}
              aria-label="Previous projects"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              className="round-button"
              type="button"
              onClick={() => move(1)}
              disabled={!canNext}
              aria-label="Next projects"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
