import { ProjectCard, PageTransition } from "@/components/site";
import { getAllContent } from "@/lib/content";
import { usePageMeta } from "@/lib/use-page-meta";

export default function ProjectsPage() {
  usePageMeta(
    "Projects",
    "Selected work in AI, design systems, developer experience, and product building.",
  );
  const projects = getAllContent("project");
  return (
    <PageTransition>
      <main id="main" className="page-shell">
        <header className="page-heading">
          <p className="section-kicker">
            2013 — 2026 · {projects.length} projects
          </p>
          <h1>
            Made to make
            <br />a difference.
          </h1>
          <p>
            From complex systems to tools people can use. A collection of
            product, design, and engineering work.
          </p>
        </header>
        <div className="project-grid">
          {projects.map((entry) => (
            <ProjectCard key={entry.slug} entry={entry} headingLevel={2} />
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
