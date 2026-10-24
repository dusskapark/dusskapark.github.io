import { Link } from "react-router-dom";
import {
  Hero,
  AboutSection,
  ProjectsMarquee,
  PostCard,
  ContactSection,
  PageTransition,
} from "@/components/site";
import { getAllContent } from "@/lib/content";
import { usePageMeta } from "@/lib/use-page-meta";
import { site } from "@/lib/site";

export default function HomePage() {
  usePageMeta(undefined, site.description);
  const projects = getAllContent("project").slice(0, 6);
  const posts = getAllContent("post").slice(0, 3);
  return (
    <PageTransition>
      <main id="main">
        <Hero />
        <AboutSection />
        <section
          className="page-shell home-projects"
          aria-labelledby="projects-heading"
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2 id="projects-heading">
                Ideas into
                <br />
                real products.
              </h2>
            </div>
            <Link className="text-link" to="/projects">
              All projects <span aria-hidden>↗</span>
            </Link>
          </div>
          <ProjectsMarquee entries={projects} />
        </section>
        <section
          className="page-shell home-writing"
          aria-labelledby="writing-heading"
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">Writing</p>
              <h2 id="writing-heading">
                Notes from
                <br />
                the work.
              </h2>
            </div>
            <Link className="text-link" to="/blog">
              All writing <span aria-hidden>↗</span>
            </Link>
          </div>
          <div className="post-list">
            {posts.map((entry) => (
              <PostCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </section>
        <ContactSection />
      </main>
    </PageTransition>
  );
}
