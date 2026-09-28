import { PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentImage } from "./content-image";

export type StoreBadgesProps = {
  urls: string[];
  appName?: string;
  title?: string;
  description?: string;
  fullWidth?: boolean;
};

export function StoreBadges({
  urls,
  appName,
  title,
  description,
  fullWidth = false,
}: StoreBadgesProps) {
  return (
    <div className={cn("content-stores", fullWidth && "content-wide")}>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      <div className="content-store-links">
        {urls.map((url) => {
          if (url.includes("apps.apple.com"))
            return (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Download on the App Store${appName ? `: ${appName}` : ""}`}
                className="content-store-badge"
              >
                <ContentImage
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </a>
            );
          if (url.includes("play.google.com"))
            return (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Get it on Google Play${appName ? `: ${appName}` : ""}`}
                className="content-store-badge content-store-google"
              >
                <ContentImage
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  width={646}
                  height={250}
                />
              </a>
            );
          const href =
            /^https?:\/\//.test(url) || url.startsWith("ms-windows-store:")
              ? url
              : `https://apps.microsoft.com/detail/${encodeURIComponent(url)}`;
          return (
            <a
              key={url}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="content-store-microsoft"
              title={appName}
            >
              <PanelsTopLeft size={28} aria-hidden="true" />
              <span>
                <small>Get it from</small> <strong>Microsoft Store</strong>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
