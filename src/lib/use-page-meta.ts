import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "./site";

function setMeta(attribute: "name" | "property", name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function usePageMeta(title?: string, description?: string, image = "/images/social.jpeg") {
  const { pathname } = useLocation();
  useEffect(() => {
    const pageTitle = title
      ? `${title} | ${site.name}`
      : `${site.name} — Product builder`;
    const pageDescription = description || site.description;
    const canonical = new URL(pathname, site.url).href;
    const imageUrl = new URL(image, site.url).href;
    document.title = pageTitle;
    setMeta("name", "description", pageDescription);
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);
    setMeta("name", "twitter:image", imageUrl);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [title, description, image, pathname]);
}
