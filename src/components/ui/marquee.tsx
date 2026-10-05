import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** How many times the content repeats to keep the track seamless. */
  repeat?: number;
  /** Pause the scroll while the pointer is over the track. */
  pauseOnHover?: boolean;
  /** Scroll the opposite direction. */
  reverse?: boolean;
  /** Scroll vertically instead of horizontally. */
  vertical?: boolean;
}

/**
 * Marquee — an infinite, auto-scrolling track (Magic UI style), built in this
 * codebase's custom-CSS idiom so it plays nicely with Tailwind v4. The first
 * copy of the content stays fully interactive; every repeat is a decorative
 * clone — hidden from assistive tech, kept out of the tab order, and flagged so
 * globals.css can strip its shared view-transition names (otherwise the cloned
 * cards would collide with the real one during the page morph). Layout lives in
 * globals.css (`.marquee`).
 */
export function Marquee({
  className,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  vertical = false,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "marquee",
        vertical && "marquee-vertical",
        reverse && "marquee-reverse",
        pauseOnHover && "marquee-pause-on-hover",
        className,
      )}
    >
      {Array.from({ length: Math.max(1, repeat) }).map((_, group) => {
        const decorative = group > 0;
        return (
          <div
            className="marquee-group"
            key={group}
            aria-hidden={decorative || undefined}
          >
            {decorative
              ? Children.map(children, (child) =>
                  isValidElement(child)
                    ? cloneElement(
                        child as ReactElement<{ decorative?: boolean }>,
                        { decorative: true },
                      )
                    : child,
                )
              : children}
          </div>
        );
      })}
    </div>
  );
}
