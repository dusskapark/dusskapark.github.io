// Magic UI Animated Theme Toggler, MIT License: https://github.com/magicuidesign/magicui
"use client";

import {
  type ButtonHTMLAttributes,
  type MouseEvent,
} from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

type AnimatedThemeTogglerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  isDark: boolean;
  onToggle: () => void;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>;
  };
};

type PseudoElementAnimationOptions = KeyframeAnimationOptions & {
  pseudoElement: string;
};

export function AnimatedThemeToggler({
  isDark,
  onToggle,
  className,
  ...props
}: AnimatedThemeTogglerProps) {
  async function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    const viewTransitionDocument = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!viewTransitionDocument.startViewTransition || reduceMotion) {
      onToggle();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const transitionStyles = document.createElement("style");
    transitionStyles.textContent = `
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }
      ::view-transition-new(root) {
        z-index: 9999;
      }
    `;
    document.head.append(transitionStyles);

    try {
      const transition = viewTransitionDocument.startViewTransition(() => {
        flushSync(onToggle);
      });
      await transition.ready;

      const animation = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          fill: "both",
          pseudoElement: "::view-transition-new(root)",
        } as PseudoElementAnimationOptions,
      );
      await animation.finished;
    } finally {
      transitionStyles.remove();
    }
  }

  return (
    <button
      type="button"
      className={cn(className)}
      aria-pressed={isDark}
      onClick={toggleTheme}
      {...props}
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
