"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImageVariants } from "@/components/content/content-image";
import { HeroVideoDialog } from "@/components/magicui/hero-video-dialog";

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

/** Returns the 11-character video ID for single-video YouTube URLs. */
export function youtubeVideoId(src: string) {
  try {
    const url = new URL(src.startsWith("//") ? `https:${src}` : src);
    const host = url.hostname.replace(/^www\./, "");
    let id: string | null | undefined;
    if (host === "youtu.be") id = url.pathname.slice(1);
    else if (/^(m\.)?youtube(-nocookie)?\.com$/.test(host))
      id = url.pathname.startsWith("/embed/")
        ? url.pathname.split("/")[2]
        : url.searchParams.get("v");
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) && id !== "videoseries"
      ? id
      : undefined;
  } catch {
    return undefined;
  }
}

export function withYouTubeClientIdentity(src: string) {
  try {
    const url = new URL(src);
    if (!/(^|\.)youtube(?:-nocookie)?\.com$/.test(url.hostname)) return src;

    if (typeof window === "undefined") return src;
    const origin = window.location.origin;
    if (!/^https?:\/\//.test(origin) || url.searchParams.has("origin")) return src;

    // Preview shells can suppress Referer headers. YouTube accepts the page
    // origin as the equivalent client identity required by error 153.
    url.searchParams.set("origin", origin);
    return url.toString();
  } catch {
    return src;
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
  const frameSrc = nativeVideo
    ? normalizedSrc
    : withYouTubeClientIdentity(normalizedSrc);
  const videoId = nativeVideo ? undefined : youtubeVideoId(normalizedSrc);
  const thumbnail = videoId && `/images/video-thumbnails/${videoId}.jpg`;
  const facade = Boolean(thumbnail && getImageVariants(thumbnail));
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
        {facade && videoId && thumbnail ? (
          <HeroVideoDialog
            title={title || details.title}
            thumbnailSrc={thumbnail}
            videoSrc={withYouTubeClientIdentity(
              `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`,
            )}
          />
        ) : nativeVideo ? (
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
            src={frameSrc}
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
