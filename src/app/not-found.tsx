import Link from "next/link";
export default function NotFound() {
  return (
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
        <Link className="text-link" href="/">
          Back home ↗
        </Link>
      </header>
    </main>
  );
}
