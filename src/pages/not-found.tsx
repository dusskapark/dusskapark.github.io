import { Link, Navigate, useLocation } from "react-router-dom";
import { PageTransition } from "@/components/site";
import { usePageMeta } from "@/lib/use-page-meta";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  usePageMeta("Not found", "This page could not be found.");

  // Preserve historical Jekyll/Next links that ended in .html.
  if (pathname.endsWith(".html")) {
    return <Navigate to={pathname.replace(/\.html$/, "")} replace />;
  }

  return (
    <PageTransition>
      <main id="main" className="page-shell">
        <header className="page-heading">
          <p className="section-kicker">404 · Not found</p>
          <h1>
            A little
            <br />
            off the path.
          </h1>
          <p>
            This page doesn’t exist. You can explore the projects or head back
            home.
          </p>
          <Link className="text-link" to="/">
            Back home ↗
          </Link>
        </header>
      </main>
    </PageTransition>
  );
}
