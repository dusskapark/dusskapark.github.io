import { PostCard, PageTransition } from "@/components/site";
import { getAllContent } from "@/lib/content";
import { usePageMeta } from "@/lib/use-page-meta";

export default function BlogPage() {
  usePageMeta(
    "Writing",
    "Notes on design, AI, and building products by Joo Hyung Park.",
  );
  return (
    <PageTransition>
      <main id="main" className="page-shell">
        <header className="page-heading">
          <p className="section-kicker">Writing</p>
          <h1>
            Learn. Build.
            <br />
            Write it down.
          </h1>
          <p>
            Reflections and practical lessons from working at the intersection
            of design, code, and AI.
          </p>
        </header>
        <div className="post-list">
          {getAllContent("post").map((entry) => (
            <PostCard key={entry.slug} entry={entry} headingLevel={2} />
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
