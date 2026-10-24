import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fades each route in on navigation. Keying the wrapper by pathname re-mounts it
 * per page so the CSS animation re-runs. (Replaces the Next-only React
 * ViewTransition, which depended on the App Router's navigation hooks.)
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
