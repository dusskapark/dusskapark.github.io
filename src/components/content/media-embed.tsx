"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type MediaEmbedProps = {
  src: string;
  title?: string;
  caption?: ReactNode;
  fullWidth?: boolean;
  aspectRatio?: string;
  originalUrl?: string;
};

function mediaDetails(src: string) {
  try {
    const url = new URL(src);
    if (/(^|\.)youtube(?:-nocookie)?\.com$/.test(url.hostname)) {
      const id = url.pathname.split("/").filter(Boolean).at(-1);
      const playlist = url.searchParams.get("list");
      return {
        label: "YouTube",
        href:
          id === "videoseries" && playlist
            ? `https://www.youtube.com/playlist?list=${playlist}`
            : `https://www.youtube.com/watch?v=${id}${playlist ? `&list=${playlist}` : ""}`,
        title: "YouTube video",
      };
    }
    if (/(^|\.)vimeo\.com$/.test(url.hostname))
      return {
        label: "Vimeo",
        href: `https://vimeo.com/${url.pathname.split("/").at(-1)}`,
        title: "Vimeo video",
      };
    if (/(^|\.)slideshare\.net$/.test(url.hostname))
      return {
        label: "SlideShare",
        href: src,
        title: "SlideShare presentation",
      };
    return { label: "original", href: src, title: "Embedded media" };
  } catch {
    return { label: "original", href: src, title: "Embedded media" };
  }
}

export function MediaEmbed({
  src,
  title,
  caption,
  fullWidth = false,
  aspectRatio = "16 / 9",
  originalUrl,
}: MediaEmbedProps) {
  const normalizedSrc = src.startsWith("//") ? `https:${src}` : src;
  const nativeVideo = /\.(mp4|webm|ogg|mov)(?:[?#]|$)/i.test(normalizedSrc);
  const details = mediaDetails(normalizedSrc);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<
    "waiting" | "loading" | "loaded" | "failed"
  >("waiting");

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState((value) => (value === "waiting" ? "loading" : value));
        observer.disconnect();
      },
      { rootMargin: "300px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (state !== "loading") return;
    const timeout = window.setTimeout(() => setState("failed"), 15000);
    return () => window.clearTimeout(timeout);
  }, [state]);

  return (
    <figure className={cn("content-embed", fullWidth && "content-wide")}>
      <div className="content-embed-frame" style={{ aspectRatio }}>
        {nativeVideo ? (
          <video
            controls
            preload="metadata"
            playsInline
            src={normalizedSrc}
            aria-label={title || "Project video"}
          >
            Your browser does not support embedded video.{" "}
            <a href={normalizedSrc}>Open the video</a>.
          </video>
        ) : (
          <iframe
            ref={frameRef}
            src={normalizedSrc}
            title={title || details.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => setState("loaded")}
            onError={() => setState("failed")}
          />
        )}
      </div>
      <div className="content-embed-footer">
        <span className="content-embed-status" role="status">
          {state === "loading"
            ? "Loading media…"
            : state === "failed"
              ? "Media unavailable here. Open the original below."
              : ""}
        </span>
        <a
          className="content-original-link"
          href={originalUrl || details.href}
          target="_blank"
          rel="noreferrer"
        >
          {nativeVideo ? "Open original video" : `Open on ${details.label}`}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      {caption && (
        <figcaption className="content-caption">{caption}</figcaption>
      )}
    </figure>
  );
}
