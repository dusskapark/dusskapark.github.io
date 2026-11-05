import { Link, Navigate, useLocation } from "react-router-dom";
import { PageTransition } from "@/components/site";
import { usePageMeta } from "@/lib/use-page-meta";
import { useSitePreferences } from "@/lib/site-preferences";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  const { language } = useSitePreferences();
  const korean = language === "ko";
  const title = korean ? "페이지를 찾을 수 없습니다" : "Not found";
  const description = korean ? "프로젝트를 둘러보거나 홈으로 돌아갈 수 있습니다." : "This page doesn’t exist. You can explore the projects or head back home.";
  usePageMeta(title, description);

  // Preserve historical Jekyll/Next links that ended in .html.
  if (pathname.endsWith(".html")) {
    return <Navigate to={pathname.replace(/\.html$/, "")} replace />;
  }

  return (
    <PageTransition>
      <main id="main" className="page-shell">
        <header className="page-heading">
          <p className="section-kicker">404 · {title}</p>
          <h1>{korean ? title : <>A little<br />off the path.</>}</h1>
          <p>{description}</p>
          <Link className="text-link" to="/">
            {korean ? "홈으로 ↗" : "Back home ↗"}
          </Link>
        </header>
      </main>
    </PageTransition>
  );
}
