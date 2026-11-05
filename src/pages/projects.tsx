import { ProjectCard, PageTransition } from "@/components/site";
import { getLocalizedContentList } from "@/lib/content";
import { usePageMeta } from "@/lib/use-page-meta";
import { useSitePreferences } from "@/lib/site-preferences";

export default function ProjectsPage() {
  const { language } = useSitePreferences();
  const korean = language === "ko";
  const description = korean
    ? "복잡한 시스템을 사람들이 사용할 수 있는 도구로. 제품, 디자인, 개발 작업을 모았습니다."
    : "From complex systems to tools people can use. A collection of product, design, and engineering work.";
  usePageMeta(korean ? "프로젝트" : "Projects", description);
  const projects = getLocalizedContentList("project", language);
  return (
    <PageTransition>
      <main id="main" className="page-shell">
        <header className="page-heading">
          <p className="section-kicker">
            2013 — 2026 · {korean ? `프로젝트 ${projects.length}개` : `${projects.length} projects`}
          </p>
          <h1>
            {korean ? "일하는 방식을" : "Made to make"}
            <br />{korean ? "바꾸는 도구들." : "a difference."}
          </h1>
          <p>{description}</p>
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
