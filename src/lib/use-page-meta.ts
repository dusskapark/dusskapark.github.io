import { useEffect } from "react";
import { site } from "./site";

function setMeta(name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Sets the document title and description for a route. Replaces Next.js metadata
 * exports — in a client SPA the title updates on navigation.
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${site.name}`
      : `${site.name} — Product builder`;
    if (description) setMeta("description", description);
  }, [title, description]);
}
