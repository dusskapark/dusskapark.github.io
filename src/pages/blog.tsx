import { ArrowUpRight } from "lucide-react";
import { PageTransition } from "@/components/site";
import { usePageMeta } from "@/lib/use-page-meta";
import { useSitePreferences } from "@/lib/site-preferences";
import { posts, profile } from "virtual:medium-writing";

export default function BlogPage() {
  const { language } = useSitePreferences();
  const korean = language === "ko";
  const description = korean
    ? "디자인, 코드, AI를 오가며 제품을 만들면서 배운 것들을 기록합니다."
    : "Reflections and practical lessons from working at the intersection of design, code, and AI.";
  const dateFormat = new Intl.DateTimeFormat(language, {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  });
  usePageMeta(korean ? "글" : "Writing", description);
  return (
    <PageTransition>
      <main id="main" className="page-shell">
        <header className="page-heading">
          <p className="section-kicker">{korean ? "글" : "Writing"}</p>
          <h1>
            {korean ? "배우고 만들고," : "Learn. Build."}
            <br />
            {korean ? "기록합니다." : "Write it down."}
          </h1>
          <p>{description}</p>
          <a className="text-link" href={profile}>
            {korean ? "Medium에서 모든 글 보기" : "View all writing on Medium"} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </header>
        <div className="post-list">
          {posts.map((post) => (
            <article className="post-card reveal-content" key={post.href}>
              <a href={post.href}>
                <div className="post-card-meta">
                  <time dateTime={post.publishedAt}>{dateFormat.format(new Date(post.publishedAt))}</time>
                  <span>Medium</span>
                </div>
                <div className="post-card-copy">
                  <h2 lang={post.language}>{post.title}</h2>
                </div>
                <span className="post-card-arrow"><ArrowUpRight size={26} aria-hidden="true" /></span>
              </a>
            </article>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
