"use client";

import {
  useCallback,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
