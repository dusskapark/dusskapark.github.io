import { ArrowUpRight, PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ContentImage } from "./content-image";
import { useId } from "react";

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
      <StoreLinks urls={urls} appName={appName} />
    </div>
  );
}

type Store = "apple" | "google" | "microsoft" | "other";

/** Classifies a store link by hostname; bare IDs are Microsoft Store products. */
export function resolveStoreLink(url: string): { store: Store; href: string } {
  if (url.startsWith("ms-windows-store:")) return { store: "microsoft", href: url };
  if (/^[A-Za-z0-9]{12,14}$/.test(url))
    return {
      store: "microsoft",
      href: `https://apps.microsoft.com/detail/${encodeURIComponent(url)}`,
    };
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "apps.apple.com" || host === "itunes.apple.com")
      return { store: "apple", href: url };
    if (host === "play.google.com") return { store: "google", href: url };
    if (host === "apps.microsoft.com" || host === "microsoft.com")
      return { store: "microsoft", href: url };
    return { store: "other", href: url };
  } catch {
    return { store: "other", href: url };
  }
}

const NEW_TAB = " (opens in a new tab)";

/** Store links can be shared by standalone badges and download cards. */
export function StoreLinks({
  urls,
  appName,
}: Pick<StoreBadgesProps, "urls" | "appName">) {
  const suffix = appName ? `: ${appName}` : "";
  return (
    <ul className="content-store-links">
      {urls.map((url) => {
        const { store, href } = resolveStoreLink(url);
        const link = { href, target: "_blank", rel: "noreferrer" } as const;
        let badge;
        if (store === "apple")
          badge = (
            <a {...link} aria-label={`Download on the App Store${suffix}${NEW_TAB}`} className="content-store-badge">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt=""
                width={120}
                height={40}
                loading="lazy"
              />
            </a>
          );
        else if (store === "google")
          badge = (
            <a {...link} aria-label={`Get it on Google Play${suffix}${NEW_TAB}`} className="content-store-badge content-store-google">
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt=""
                width={646}
                height={250}
                loading="lazy"
              />
            </a>
          );
        else if (store === "microsoft")
          badge = (
            <a {...link} aria-label={`Get it from Microsoft Store${suffix}${NEW_TAB}`} className="content-store-badge content-store-microsoft">
              <PanelsTopLeft size={20} aria-hidden="true" />
              <span aria-hidden="true">
                <small>Get it from</small> <strong>Microsoft Store</strong>
              </span>
            </a>
          );
        else {
          let host = url;
          try {
            host = new URL(url).hostname.replace(/^www\./, "");
          } catch {
            // Keep the authored value as the visible label.
          }
          badge = (
            <a {...link} className="content-store-badge content-store-microsoft">
              <ArrowUpRight size={20} aria-hidden="true" />
              <span>
                <small>Get the app</small> <strong>{host}</strong>
                <span className="content-sr-only">{NEW_TAB}</span>
              </span>
            </a>
          );
        }
        return <li key={url}>{badge}</li>;
      })}
    </ul>
  );
}

export type AppDownload = {
  id: string;
  title: string;
  appName: string;
  description: string;
  urls: string[];
  images: { src: string; alt: string }[];
  imageTheme?: "dark" | "light";
  imageLayout?: "portrait" | "landscape";
};

export function AppDownloads({ apps }: { apps: AppDownload[] }) {
  return (
    <div className={cn("content-app-downloads", apps.length === 1 && "content-app-downloads-single")}>
      {apps.map((app) => (
        <AppDownloadCard key={app.id} app={app} />
      ))}
    </div>
  );
}

function AppDownloadCard({ app }: { app: AppDownload }) {
  const titleId = useId();
  return (
        <Card className="content-download-card" role="article" aria-labelledby={titleId}>
          <div className={cn("content-download-media", app.imageTheme === "light" && "content-download-media-light", app.imageLayout === "landscape" && "content-download-media-landscape")}>
            {app.images.map((image) => (
              <ContentImage key={image.src} src={image.src} alt={image.alt} sizes="(max-width: 768px) 100vw, 480px" />
            ))}
          </div>
          <CardHeader>
            <CardTitle><h3 id={titleId}>{app.title}</h3></CardTitle>
            <CardDescription className="content-download-app-name">{app.appName}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="content-download-description">{app.description}</p>
          </CardContent>
          <CardFooter>
            <StoreLinks urls={app.urls} appName={app.appName} />
          </CardFooter>
        </Card>
  );
}
