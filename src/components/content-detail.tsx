import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/site";
import type { ContentEntry } from "@/lib/content";
import { getAllContent, getContentUrl, getTranslations } from "@/lib/content";
import { ContentBody, getTableOfContents } from "@/lib/mdx";
import { site } from "@/lib/site";
import { getMediaDimensions } from "@/lib/media";

export async function ContentDetail({ entry }: { entry: ContentEntry }) {
  const toc = getTableOfContents(entry);
  const heroSize = getMediaDimensions(entry.hero);
  const entries = getAllContent(entry.kind);
  const position = entries.findIndex((item) => item.slug === entry.slug);
  const neighbors =
    position < 0
      ? []
      : [entries[position - 1], entries[position + 1]].filter(Boolean);
  const translated = getTranslations(entry).find(
    (item) => item.lang !== entry.lang,
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": entry.kind === "post" ? "BlogPosting" : "Article",
    headline: entry.title,
    description: entry.description,
    datePublished: entry.date,
    inLanguage: entry.lang,
    image: new URL(entry.hero || "/images/social.jpeg", site.url).href,
    author: (entry.authors?.length ? entry.authors : [site.author]).map(
      (name) => ({ "@type": "Person", name }),
    ),
    mainEntityOfPage: `${site.url}${getContentUrl(entry)}`,
  };
  return (
    <PageTransition>
      <main id="main" className="content-page">
        <article lang={entry.lang}>
          <header className="page-shell detail-header">
            <Link
              className="text-link"
              href={entry.kind === "project" ? "/projects" : "/blog"}
              transitionTypes={["nav-back"]}
            >
              ← {entry.kind === "project" ? "All projects" : "All writing"}
            </Link>
            <p className="section-kicker">
              <time dateTime={entry.date}>
                {new Date(entry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </time>{" "}
              · {entry.lang === "ko" ? "한국어" : "English"}
            </p>
            <h1>
              {entry.titleLines?.length
                ? entry.titleLines.map((line, index) => (
                    <span key={index}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))
                : entry.title}
            </h1>
            {entry.subtitle && (
              <p className="detail-subtitle">{entry.subtitle}</p>
            )}
            {entry.description && (
              <p className="detail-description">{entry.description}</p>
            )}
            {translated && (
              <Link
                className="text-link"
                href={getContentUrl(translated)}
                hrefLang={translated.lang}
              >
                {translated.lang === "en"
                  ? "Read in English ↗"
                  : "한국어로 읽기 ↗"}
              </Link>
            )}
            {(entry.team || entry.role) && (
              <dl className="detail-meta">
                {entry.team && (
                  <div>
                    <dt>Team</dt>
                    <dd>{entry.team}</dd>
                  </div>
                )}
                {entry.role && (
                  <div>
                    <dt>Role</dt>
                    <dd>{entry.role}</dd>
                  </div>
                )}
              </dl>
            )}
          </header>
          {entry.hero && (
            <div className="page-shell detail-hero">
              <ViewTransition
                name={`media-${entry.kind}-${entry.slug}`}
                share="morph"
                default="none"
              >
                <Image
                  src={entry.hero}
                  width={heroSize?.width || 1600}
                  height={heroSize?.height || 1000}
                  alt={entry.title}
                  sizes="(max-width: 768px) calc(100vw - 48px), 90vw"
                  className="detail-featured-image"
                  loading="eager"
                  fetchPriority="high"
                  unoptimized={
                    /^https?:/.test(entry.hero) || /\.gif$/i.test(entry.hero)
                  }
                />
              </ViewTransition>
            </div>
          )}
          <div className="detail-body">
            {toc.length > 1 && (
              <nav
                className="toc"
                aria-label={entry.lang === "ko" ? "목차" : "On this page"}
              >
                <details>
                  <summary>
                    {entry.lang === "ko" ? "목차" : "On this page"}
                  </summary>
                  <ol>
                    {toc.map((item) => (
                      <li key={item.id} data-depth={item.depth}>
                        <a href={`#${item.id}`}>{item.text}</a>
                      </li>
                    ))}
                  </ol>
                </details>
              </nav>
            )}
            <div className="prose content-prose">
              <ContentBody entry={entry} />
            </div>
          </div>
        </article>
        {neighbors.length > 0 && (
          <nav
            className="page-shell related-posts"
            aria-label="Continue reading"
          >
            {neighbors.map((item) => (
              <Link
                className="text-link"
                href={getContentUrl(item)}
                key={item.slug}
                transitionTypes={["nav-forward"]}
              >
                {item.title} <span aria-hidden>↗</span>
              </Link>
            ))}
          </nav>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </main>
    </PageTransition>
  );
}
