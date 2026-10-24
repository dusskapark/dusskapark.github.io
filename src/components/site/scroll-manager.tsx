import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores scroll on navigation: jumps to an in-page anchor when the URL has a
 * hash (e.g. /#about, /#contact), otherwise returns to the top of the new page.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const frame = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
