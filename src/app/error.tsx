"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="page-shell">
      <header className="page-heading">
        <h1>Something went wrong.</h1>
        <p>Please try loading the page again.</p>
        <button className="text-link" onClick={reset}>
          Try again
        </button>
        <Link className="text-link" href="/">
          Back home
        </Link>
      </header>
    </main>
  );
}
