import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/site";
import type { ContentEntry, ContentHeading } from "@/lib/content";
import { getAllContent, getContentUrl, getTranslations } from "@/lib/content";
import { mdxComponents } from "@/lib/mdx";
import { usePageMeta } from "@/lib/use-page-meta";
import { site } from "@/lib/site";
import { getMediaDimensions } from "@/lib/media";

export function ContentDetail({ entry }: { entry: ContentEntry }) {
  usePageMeta(entry.title, entry.description || entry.subtitle || entry.title);

  const proseRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<ContentHeading[]>([]);

  // Build the table of contents from the rendered body so anchors always match
  // the ids rehype-slug assigned to the headings.
  useEffect(() => {
    const root = proseRef.current;
    if (!root) return;
    const headings = Array.from(
      root.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
    ).map((node) => ({
      depth: node.tagName === "H2" ? 2 : 3,
      text: node.textContent || "",
      id: node.id,
    }));
    setToc(headings);
  }, [entry.slug]);

  const heroSize = getMediaDimensions(entry.hero);
  const entries = getAllContent(entry.kind);
  const position = entries.findIndex((item) => item.slug === entry.slug);
  const neighbors =
    position < 0
      ? []
      : [entries[position - 1], entries[position + 1]].filter(
          Boolean,
        ) as ContentEntry[];
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

  const Body = entry.Body;

  return (
    <PageTransition>
      <main id="main" className="content-page">
        <article lang={entry.lang}>
          <header className="page-shell detail-header">
            <Link
              className="text-link"
              to={entry.kind === "project" ? "/projects" : "/blog"}
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
                to={getContentUrl(translated)}
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
              <img
                src={entry.hero}
                width={heroSize?.width || 1600}
                height={heroSize?.height || 1000}
                alt={entry.title}
                className="detail-featured-image"
                loading="eager"
                fetchPriority="high"
              />
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
            <div className="prose content-prose content-body" ref={proseRef}>
              <Body components={mdxComponents} />
            </div>
          </div>
        </article>
        {neighbors.length > 0 && (
          <nav
            className="page-shell related-posts"
            aria-label="Continue reading"
          >
            {neighbors.map((item) => (
              <Link className="text-link" to={getContentUrl(item)} key={item.slug}>
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
