import { LockKeyhole } from "lucide-react";
import { useRef } from "react";
import type { Language } from "@/lib/site-preferences";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import "./confidential-media.css";

type ConfidentialMediaProps = {
  language: Language;
  company?: "grab";
  hero?: { src: string; alt: string };
  reducedMotion: boolean;
  active: boolean;
};

/** A reusable visual for work whose underlying project materials are confidential. */
export function ConfidentialMedia({ language, company, hero, reducedMotion, active }: ConfidentialMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const grabRef = useRef<HTMLSpanElement>(null);
  const figmaRef = useRef<HTMLSpanElement>(null);
  const reactRef = useRef<HTMLSpanElement>(null);
  const claudeRef = useRef<HTMLSpanElement>(null);
  const codexRef = useRef<HTMLSpanElement>(null);
  const label = language === "ko" ? "비공개 프로젝트" : "Confidential project";
  return (
    <div className={`confidential-media${hero ? " confidential-media-hero" : ""}`} data-confidential-media>
      {hero ? <img className="confidential-media-image" src={hero.src} alt={hero.alt} /> : (
        <div ref={containerRef} className="confidential-media-brands" role="group" aria-label={language === "ko" ? "프로젝트와 도구" : "Project and tools"}>
          {company === "grab" && <span ref={grabRef} className="confidential-brand confidential-brand-grab"><img src="/images/brands/grab.svg" alt="Grab" /></span>}
          <span ref={figmaRef} className="confidential-brand confidential-brand-figma"><img src="/images/brands/figma.svg" alt="Figma" /></span>
          <span ref={reactRef} className="confidential-brand confidential-brand-react"><img src="/images/brands/react.svg" alt="React" /></span>
          <span ref={claudeRef} className="confidential-brand confidential-brand-claude"><img src="/images/brands/claude-code.svg" alt="Claude Code" /></span>
          <span ref={codexRef} className="confidential-brand confidential-brand-codex"><img src="/images/brands/codex.svg" alt="Codex" /></span>
          {company === "grab" && <>
            <AnimatedBeam containerRef={containerRef} fromRef={figmaRef} toRef={grabRef} curvature={12} delay={0} reducedMotion={reducedMotion} active={active} />
            <AnimatedBeam containerRef={containerRef} fromRef={reactRef} toRef={grabRef} curvature={-12} delay={0.6} reducedMotion={reducedMotion} active={active} />
            <AnimatedBeam containerRef={containerRef} fromRef={grabRef} toRef={claudeRef} curvature={12} delay={1.2} reducedMotion={reducedMotion} active={active} />
            <AnimatedBeam containerRef={containerRef} fromRef={grabRef} toRef={codexRef} curvature={-12} delay={1.8} reducedMotion={reducedMotion} active={active} />
          </>}
        </div>
      )}
      <div className="confidential-media-badge"><LockKeyhole size={15} aria-hidden="true" /><span>{label}</span></div>
    </div>
  );
}
