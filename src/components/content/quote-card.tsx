import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ContentImage } from "./content-image";

export type QuoteCardProps = {
  image: string;
  text: ReactNode;
  caption?: ReactNode;
  backgroundColor?: string;
  fontColor?: string;
  fullWidth?: boolean;
  imageWidth?: number;
  imageHeight?: number;
};

export function QuoteCard({
  image,
  text,
  caption,
  backgroundColor,
  fontColor,
  fullWidth = false,
  imageWidth,
  imageHeight,
}: QuoteCardProps) {
  return (
    <figure className={cn("content-quote", fullWidth && "content-wide")}>
      <div
        className="content-quote-inner"
        style={{ backgroundColor, color: fontColor }}
      >
        {image && (
          <div className="content-quote-image">
            <ContentImage
              src={image}
              alt="Project illustration"
              width={imageWidth}
              height={imageHeight}
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
        )}
        <div className="content-quote-text">{text}</div>
      </div>
      {caption && (
        <figcaption className="content-caption">{caption}</figcaption>
      )}
    </figure>
  );
}
