import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Wraps a page's <main> in a React ViewTransition so route changes animate.
 *
 * Navigations tagged via <Link transitionTypes={["nav-forward" | "nav-back"]}>
 * slide directionally (content moves left going deeper, right coming back).
 * Untyped navigations — browser back/forward, in-page hash links — fall through
 * to `default: "none"` and swap instantly, which is the expected behaviour.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
