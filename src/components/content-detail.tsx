import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/site";
import type { ContentEntry, ContentHeading } from "@/lib/content";
import { getContentUrl, getLocalizedContentList, getTranslations } from "@/lib/content";
import { mdxComponents } from "@/lib/mdx";
import { usePageMeta } from "@/lib/use-page-meta";
import { site } from "@/lib/site";
import { ContentImage } from "@/components/content/content-image";
import { useSitePreferences } from "@/lib/site-preferences";

export function ContentDetail({ entry }: { entry: ContentEntry }) {
  const { language, setLanguage } = useSitePreferences();
  const korean = language === "ko";
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

  const entries = getLocalizedContentList(entry.kind, language);
  const position = entries.findIndex((item) =>
    entry.translationKey ? item.translationKey === entry.translationKey : item.slug === entry.slug,
  );
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
              lang={language}
            >
              ← {entry.kind === "project" ? (korean ? "프로젝트 전체 보기" : "All projects") : (korean ? "글 전체 보기" : "All writing")}
            </Link>
            <p className="section-kicker">
              <time lang={language} dateTime={entry.date}>
                {new Date(entry.date).toLocaleDateString(language, {
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
                lang={translated.lang}
                onClick={(event) => {
                  if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                    setLanguage(translated.lang);
                  }
                }}
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
                    <dt lang={language}>{korean ? "팀" : "Team"}</dt>
                    <dd>{entry.team}</dd>
                  </div>
                )}
                {entry.role && (
                  <div>
                    <dt lang={language}>{korean ? "역할" : "Role"}</dt>
                    <dd>{entry.role}</dd>
                  </div>
                )}
              </dl>
            )}
          </header>
          {entry.hero && (
            <div className="page-shell detail-hero">
              <ContentImage
                src={entry.hero}
                alt={entry.title}
                className="detail-featured-image"
                loading="eager"
                sizes="(max-width: 768px) 100vw, 1280px"
              />
            </div>
          )}
          <div className="detail-body">
            {toc.length > 1 && (
              <nav
                className="toc"
                aria-label={korean ? "목차" : "On this page"}
              >
                <details>
                  <summary lang={language}>
                    {korean ? "목차" : "On this page"}
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
            aria-label={korean ? "이어 읽기" : "Continue reading"}
          >
            {neighbors.map((item) => (
              <Link className="text-link" to={getContentUrl(item)} key={item.slug} lang={item.lang}>
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
