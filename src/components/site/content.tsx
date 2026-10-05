import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import type { ContentEntry } from "@/lib/content";
import { social } from "@/lib/site";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { FocusBeams } from "@/components/site/focus-beams";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-eyebrow">
        <span className="tiny-asterisk" aria-hidden="true">
          ✳
        </span>{" "}
        Hey, I’m Joo.
      </div>
      <h1 id="hero-title" className="hero-title">
        <span>A product</span>
        <span className="hero-title-second">
          <span className="hero-portrait">
            <Image
              src="/images/profile.png"
              alt=""
              fill
              sizes="(max-width: 700px) 105px, 180px"
              preload
            />
          </span>
          <LineShadowText shadowColor="var(--ring)">builder</LineShadowText>
          <span className="hero-period">.</span>
        </span>
      </h1>
      <div className="hero-bottom">
        <p>
          Designing AI/ML, developer experience,
          <br className="desktop-break" /> and tech infrastructure products
          since 2012.
        </p>
        <a href="#projects-heading" className="hero-work-link">
          Explore my work
          <span className="round-button">
            <ArrowDown size={20} aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="page-shell about-bento"
      aria-labelledby="about-heading"
    >
      <div className="section-heading">
        <div>
          <p className="section-kicker">A little about me</p>
          <h2 id="about-heading">
            Complex systems.
            <br />
            <span className="muted-heading">Usable tools.</span>
          </h2>
        </div>
        <p>
          A snapshot of who I am, what I work on, and where to find me — the
          short version.
        </p>
      </div>

      <BentoGrid>
        <BentoCard className="bento-intro">
          <p className="bento-eyebrow">Hey, I’m Joo 👋</p>
          <p className="bento-lead">
            I turn complex systems into usable tools — design systems, internal
            platforms, and AI-powered workflows.
          </p>
          <p className="bento-sub">
            I also lead Friends of Figma Seoul, exploring the edge between
            design, code, and AI.
          </p>
          <Link className="pill-link pill-link-dark" href="/#contact">
            Get in touch
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </BentoCard>

        <BentoCard className="bento-focus">
          <p className="bento-label">What I work on</p>
          <FocusBeams />
        </BentoCard>

        <div className="bento-card bento-portrait">
          <Image
            src="/images/profile.png"
            alt="JooHyung Park"
            fill
            sizes="(max-width: 767px) 90vw, 25vw"
            className="bento-portrait-image"
          />
          <span className="bento-portrait-caption">JooHyung Park</span>
        </div>

        <BentoCard className="bento-stat">
          <p className="bento-label">Now</p>
          <p className="bento-stat-value">Product designer at Grab</p>
          <p className="bento-stat-sub">Based in Singapore</p>
        </BentoCard>

        <BentoCard className="bento-stat">
          <p className="bento-label">Building since</p>
          <p className="bento-stat-value">2012</p>
          <p className="bento-stat-sub">Leading Friends of Figma Seoul</p>
        </BentoCard>

        <div className="bento-card bento-links">
          <a
            className="bento-links-row"
            href={social.github}
            target="_blank"
            rel="noreferrer"
          >
            <span className="bento-links-name">GitHub</span>
            <span className="bento-links-handle">@dusskapark</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            className="bento-links-row"
            href={social.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <span className="bento-links-name">LinkedIn</span>
            <span className="bento-links-handle">in/dusskapark</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </BentoGrid>
    </section>
  );
}

export function ProjectCard({
  entry,
  headingLevel = 3,
  decorative = false,
}: {
  entry: ContentEntry;
  headingLevel?: 2 | 3;
  /** A marquee clone: hidden from assistive tech, out of the tab order, and
   * without the shared-element morph (that belongs to the one real card). */
  decorative?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const thumbnail = entry.hero ? (
    <Image
      src={entry.hero}
      alt=""
      fill
      sizes="(max-width: 767px) 90vw, (max-width: 1199px) 45vw, 40vw"
      className="project-thumbnail"
    />
  ) : null;
  return (
    <article
      className="project-card reveal-content"
      lang={entry.lang}
      aria-hidden={decorative || undefined}
    >
      <Link
        href={`/project/${entry.slug}`}
        className="project-card-link"
        transitionTypes={["nav-forward"]}
        tabIndex={decorative ? -1 : undefined}
      >
        <div className="project-card-image">
          {thumbnail ? (
            decorative ? (
              thumbnail
            ) : (
              <ViewTransition
                name={`media-${entry.kind}-${entry.slug}`}
                share="morph"
                default="none"
              >
                {thumbnail}
              </ViewTransition>
            )
          ) : (
            <span className="project-card-placeholder" aria-hidden="true">
              {entry.title}
            </span>
          )}
          <span className="project-card-arrow">
            <ArrowUpRight size={25} aria-hidden="true" />
          </span>
        </div>
        <div className="project-card-meta">
          <span>{entry.subtitle || "Selected project"}</span>
          <time dateTime={entry.date}>{entry.date.slice(0, 4)}</time>
        </div>
        <Heading>{entry.title}</Heading>
        <p>{entry.description}</p>
      </Link>
    </article>
  );
}

export function ProjectsMarquee({ entries }: { entries: ContentEntry[] }) {
  const mid = Math.ceil(entries.length / 2);
  const rows = [entries.slice(0, mid), entries.slice(mid)];
  return (
    <div className="projects-marquee">
      {rows.map((row, index) => (
        <Marquee
          key={index}
          className="projects-marquee-row"
          pauseOnHover
          reverse={index === 1}
          repeat={3}
        >
          {row.map((entry) => (
            <ProjectCard key={entry.slug} entry={entry} />
          ))}
        </Marquee>
      ))}
    </div>
  );
}

export function PostCard({
  entry,
  headingLevel = 3,
}: {
  entry: ContentEntry;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const date = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(entry.date));
  return (
    <article className="post-card reveal-content" lang={entry.lang}>
      <Link href={`/blog/${entry.slug}`} transitionTypes={["nav-forward"]}>
        <div className="post-card-meta">
          <time dateTime={entry.date}>{date}</time>
          <span>{entry.lang === "ko" ? "한국어" : "English"}</span>
        </div>
        <div className="post-card-copy">
          <Heading>{entry.title}</Heading>
          <p>{entry.description}</p>
        </div>
        <span className="post-card-arrow">
          <ArrowUpRight size={26} aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-intro">
        <p className="section-kicker">Get in touch</p>
        <p>
          I’d love to learn about your team
          <br />
          and see how I can help.
        </p>
      </div>
      <h2 id="contact-heading">
        Let’s build
        <br />
        <span>something useful.</span>
      </h2>
      <a className="contact-email" href="mailto:dusskapark@gmail.com">
        <span>dusskapark@gmail.com</span>
        <MoveUpRight aria-hidden="true" />
      </a>
      <div className="social-links contact-socials">
        <a
          href="https://github.com/dusskapark"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/dusskapark/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="footer-top">
        <Link href="/" className="site-wordmark" aria-label="Joo — home">
          joo.
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Writing</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <a className="footer-back-top" href="#top">
          Back to top
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-display" aria-hidden="true">
        Portfolio.
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} JooHyung Park</p>
        <p>Design &amp; code, with curiosity.</p>
      </div>
    </footer>
  );
}
