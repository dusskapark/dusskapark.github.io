import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ContentImage } from "./content-image";

export type QuoteCardProps = {
  image: string;
  text: ReactNode;
  caption?: ReactNode;
  /** Describe the image when it adds information; leave empty if decorative. */
  imageAlt?: string;
  backgroundColor?: string;
  fontColor?: string;
  fullWidth?: boolean;
  imageWidth?: number;
  imageHeight?: number;
};

/** Picks near-black or white text for a hex background (WCAG relative luminance). */
function readableText(hex: string) {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value.replace(/./g, (c) => c + c)
      : value.slice(0, 6);
  if (!/^[0-9a-f]{6}$/i.test(full)) return undefined;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(full.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179 ? "#1a1a1a" : "#fff";
}

export function QuoteCard({
  image,
  text,
  caption,
  imageAlt = "",
  backgroundColor,
  fontColor,
  fullWidth = false,
  imageWidth,
  imageHeight,
}: QuoteCardProps) {
  // Authored brand colors become tokens; an unpaired background gets a
  // readable text color so it never inherits the dark theme's light text.
  const style = {
    "--quote-bg": backgroundColor,
    "--quote-fg":
      fontColor ?? (backgroundColor ? readableText(backgroundColor) : undefined),
  } as CSSProperties;

  return (
    <figure className={cn("content-quote", fullWidth && "content-wide")}>
      <div className="content-quote-inner" style={style}>
        {image && (
          <div className="content-quote-image">
            <ContentImage
              src={image}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
        )}
        <blockquote className="content-quote-text">{text}</blockquote>
      </div>
      {caption && (
        <figcaption className="content-caption">{caption}</figcaption>
      )}
    </figure>
  );
}
