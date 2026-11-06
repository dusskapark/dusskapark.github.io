import type { ReactNode } from "react";
import { ArrowUpRight, Link2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import metadata from "../../../content/link-previews.json";

type PreviewMetadata = {
  title: string;
  description: string;
  image?: string;
  localImage?: string;
  imageAlt?: string;
  siteName: string;
};

/** Build-time metadata keeps static hosting and avoids browser CORS requests. */
export function LinkPreview({ url }: { url: string }) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (!["https:", "http:"].includes(parsed.protocol)) return null;
  const preview = (metadata as Record<string, PreviewMetadata>)[url];
  const title = preview?.title || parsed.hostname;
  return (
    <a className="content-link-preview" href={url} target="_blank" rel="noopener noreferrer">
      <Card className="content-link-preview-card">
        <div className="content-link-preview-image">
          <Link2 aria-hidden="true" size={32} />
          {preview?.image && (
            <img src={preview.localImage || preview.image} alt={preview.imageAlt || ""} loading="lazy" decoding="async"
              onError={(event) => { event.currentTarget.hidden = true; }} />
          )}
        </div>
        <CardContent>
          <div className="content-link-preview-site">
            <span>{preview?.siteName || parsed.hostname}</span>
            <ArrowUpRight aria-hidden="true" size={16} />
          </div>
          <h3>{title}</h3>
          {preview?.description && <p>{preview.description}</p>}
          <span className="content-link-preview-url">{parsed.hostname}{parsed.pathname.replace(/\/$/, "")}</span>
        </CardContent>
      </Card>
    </a>
  );
}

export function LinkPreviewGrid({ children }: { children: ReactNode }) {
  return <div className="content-link-preview-grid">{children}</div>;
}
