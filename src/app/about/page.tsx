import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  AboutSection,
  ContactSection,
  PageTransition,
} from "@/components/site";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { Particles } from "@/components/ui/particles";
import { getGithubProfile } from "@/lib/github";
import { pageMetadata } from "@/lib/metadata";
import { site, social } from "@/lib/site";

export const metadata = pageMetadata("About", site.description, "/about");

const facts = [
  { label: "Now", value: "Product designer at Grab" },
  { label: "Based in", value: "Singapore" },
  { label: "Community", value: "Lead, Friends of Figma Seoul" },
  { label: "Building since", value: "2012" },
];

const focus = [
  {
    title: "AI / ML products",
    body: "Designing AI-powered workflows and tools — from Figma automation to Model Context Protocol experiences.",
  },
  {
    title: "Developer experience",
    body: "Making complex platforms approachable, so builders can move from idea to shipped product faster.",
  },
  {
    title: "Design systems",
    body: "Turning scattered patterns into coherent, reusable systems that scale across teams.",
  },
  {
    title: "Tech infrastructure",
    body: "Bringing product thinking and usability to the internal tools and systems most people never see.",
  },
];

export default async function AboutPage() {
  const github = await getGithubProfile();

  return (
    <PageTransition>
      <main id="main">
        <header className="page-shell page-heading about-hero">
          <Particles
            className="about-hero-particles"
            quantity={60}
            ease={70}
            size={0.6}
            staticity={40}
            color="#656f45"
            refresh
          />
          <div className="about-hero-inner">
            <div className="about-hero-copy">
              <p className="section-kicker">About</p>
              <h1>
                A designer.
                <br />A{" "}
                <LineShadowText shadowColor="var(--ring)">
                  builder
                </LineShadowText>
                .
                <br />
                Always curious.
              </h1>
            </div>
            <div className="about-hero-portrait">
              <Image
                src="/images/profile.png"
                alt="JooHyung Park"
                fill
                sizes="(max-width: 767px) 72vw, 360px"
                priority
              />
            </div>
          </div>
        </header>
        <AboutSection full showPortrait={false} />

        <section
          className="page-shell about-facts"
          aria-labelledby="about-facts-heading"
        >
          <p className="section-kicker" id="about-facts-heading">
            At a glance
          </p>
          <dl className="about-facts-grid">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="page-shell about-focus"
          aria-labelledby="about-focus-heading"
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">What I work on</p>
              <h2 id="about-focus-heading">Focus areas</h2>
            </div>
          </div>
          <ul className="about-focus-grid">
            {focus.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="page-shell about-elsewhere"
          aria-labelledby="about-elsewhere-heading"
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">Elsewhere</p>
              <h2 id="about-elsewhere-heading">Find me online</h2>
            </div>
          </div>
          <div className="about-links-grid">
            <a
              className="about-link-card"
              href={github?.url ?? social.github}
              target="_blank"
              rel="noreferrer"
            >
              <span className="about-link-card-top">
                <span className="about-link-card-name">GitHub</span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </span>
              <span className="about-link-card-detail">
                {github
                  ? `${github.repos} public repositories · building in the open since ${github.since}`
                  : "Open-source Figma & AI tooling, building in the open since 2013"}
              </span>
              <span className="about-link-card-handle">@dusskapark</span>
            </a>
            <a
              className="about-link-card"
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span className="about-link-card-top">
                <span className="about-link-card-name">LinkedIn</span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </span>
              <span className="about-link-card-detail">
                The full career story — roles, teams, and the products along the
                way.
              </span>
              <span className="about-link-card-handle">in/dusskapark</span>
            </a>
          </div>
        </section>

        <ContactSection />
      </main>
    </PageTransition>
  );
}
