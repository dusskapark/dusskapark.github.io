import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { DiaTextReveal } from "@/components/magicui/dia-text-reveal";
import { Highlighter } from "@/components/magicui/highlighter";
import { getContentPathForLanguage } from "@/lib/content";
import { useSitePreferences } from "@/lib/site-preferences";
import { withYouTubeClientIdentity } from "@/components/content/media-embed";
import { ConfidentialMedia } from "./confidential-media";
import koreanStory, { englishStory } from "virtual:home-narrative";
import "./narrative-home.css";

type SceneFrame = {
  src: string;
  alt: string;
  altEn?: string;
};

type Scene = {
  eyebrow: string;
  title: string;
  description: string;
  descriptionEn: string;
  titleEn?: string;
  href?: string;
  video?: string;
  videoEn?: string;
  videoStart?: number;
  clip?: { src: string; poster: string; aspect: string };
  external?: boolean;
  article?: { ko: string; en: string };
  frames?: SceneFrame[];
  confidential?: boolean;
  company?: "grab";
  hero?: { src: string; alt: string; altEn?: string };
};

const builderDayArticles = {
  ko: "https://www.linkedin.com/pulse/codex-remote%EB%A1%9C-%ED%9C%B4%EB%8C%80%ED%8F%B0%EC%97%90%EC%84%9C-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%95%B1%EC%9D%84-%EC%B6%9C%EC%8B%9C%ED%95%9C-%EB%B0%A9%EB%B2%95-seowoo-han-7dfxc/",
  en: "https://www.linkedin.com/pulse/shipping-mobile-app-from-phone-codex-remote-seowoo-han-kd9rc/",
};

const scenes: Record<string, Scene> = {
  intro: { eyebrow: "DESIGNING FOR BUILDERS", title: "Make the complex useful.", description: "개발자의 일에서 시작해, 더 나은 도구와 제품을 만듭니다.", descriptionEn: "Better tools and products start with understanding how developers work.", href: "/projects" },
  tstore: {
    eyebrow: "CAREER · 2012", title: "T store Developer Center",
    description: "개발자가 콘텐츠를 등록하고 판매하는 곳에서 시작한 개발자 경험.", descriptionEn: "Developer experience began with helping developers list and sell content.",
    href: "/project/tstore",
    frames: [
      { src: "/images/projects/2013-tstore/devCenter2013-007.png", alt: "T store Developer Center interface and product illustration" },
      { src: "/images/projects/2013-tstore/devCenter2013-008.png", alt: "Another view of the T store Developer Center interface" },
      { src: "/images/projects/2013-tstore/devCenter2013-004.png", alt: "Layout concepts for the main page and subpages" },
    ],
  },
  onestore: {
    eyebrow: "CAREER · 2015", title: "ONE store",
    description: "여러 앱 마켓의 개발자 데이터와 정책을 통합한 개발자센터.", descriptionEn: "A developer center that brought app-store data and policies together.",
    href: "/project/onestore",
    frames: [
      { src: "/images/projects/2015-onestore/preview-002.webp", alt: "ONE store mobile storefront concept" },
      { src: "/images/projects/2015-onestore/2015-onestore-007.png", alt: "ONE store apps surfaced in NAVER search results" },
      { src: "/images/projects/2015-onestore/preview-005.webp", alt: "ONE store mobile app details concept" },
    ],
  },
  gdc: {
    eyebrow: "CAREER · LINE", title: "LINE Game Developer Center",
    description: "게임 개발자의 가이드부터 빌드 제출과 검수까지.", descriptionEn: "From developer guides to game build submissions and reviews.",
    href: "/project/gdc", video: "CP8hyeFnomg",
  },
  lookbook: {
    eyebrow: "CAREER · LINE", title: "LOOKBOOK",
    description: "LINE 게임 운영 도구를 위한 공통 컴포넌트와 사용 규칙.", descriptionEn: "Shared components and usage rules for LINE game operations tools.",
    href: "/project/lookbook",
    clip: {
      src: "/images/projects/2019-lookbook/preview-material-theming.mp4",
      poster: "/images/projects/2019-lookbook/lookbook2019-003.png",
      aspect: "1280 / 714",
    },
  },
  ldsg: {
    eyebrow: "CAREER · LINE", title: "LINE Design System Global",
    description: "공통 컴포넌트와 문서를 통해 글로벌 팀의 디자인 생산성을 높이는 일.", descriptionEn: "Helping teams across regions design and build with shared components and documentation.",
    href: "/project/ldsg", video: "L-LcSkyBsAA",
  },
  naver: {
    eyebrow: "CAREER · NAVER", title: "NAVER NOW & TV",
    description: "콘텐츠 크리에이터와 운영자를 위한 도구와 경험.", descriptionEn: "Tools and experiences for content creators and operations teams.",
    href: "/project/naver-now",
    confidential: true,
    hero: { src: "/images/projects/2022-naver-now/Portfolio.008.png", alt: "NAVER NOW 프로젝트 대표 이미지", altEn: "NAVER NOW project cover image" },
  },
  grabConsole: {
    eyebrow: "CAREER · GRAB", title: "Grab Console", confidential: true, company: "grab",
    description: "60개가 넘는 내부 플랫폼을 연결한 통합 개발자 경험.",
    descriptionEn: "A unified developer experience connecting more than 60 internal platforms.",
  },
  grabData: {
    eyebrow: "CAREER · GRAB", title: "내부 데이터 플랫폼", titleEn: "Internal Data Platform", confidential: true, company: "grab",
    description: "노트북과 파이프라인을 잇는 AI 에이전트 기반 데이터 작업 환경.",
    descriptionEn: "An AI-agentic data workspace spanning notebooks and pipelines.",
  },
  figmaml: {
    eyebrow: "EXPERIMENT · 2021", title: "Figma ML",
    description: "머신러닝과 컴퓨터 비전으로 디자인 시스템의 오류를 발견하는 실험.", descriptionEn: "An experiment in finding design system inconsistencies with machine learning and computer vision.",
    href: "/project/tensorflow-js",
    clip: {
      src: "/images/projects/2021-made-with-tfjs/preview-figma-ml-demo.mp4",
      poster: "/images/projects/2021-made-with-tfjs/file-cover.png",
      aspect: "720 / 406",
    },
  },
  google: { eyebrow: "TALK · GOOGLE", title: "TensorFlow Show & Tell", description: "Figma ML의 실험과 구현을 소개한 Google 발표.", descriptionEn: "A Google talk on the Figma ML experiment and its implementation.", video: "blL0EQ6wNH8", href: "/project/tensorflow-js" },
  config: { eyebrow: "TALK · FIGMA", title: "Config 2022", description: "디자인 시스템과 머신러닝을 다룬 Figma Config 발표.", descriptionEn: "A Figma Config talk about design systems and machine learning.", video: "ckN1QIpjkAk", href: "/project/tensorflow-js" },
  autoname: {
    eyebrow: "EXPERIMENT · 2023", title: "Figma Autoname",
    description: "AI를 활용해 디자인 작업과 개발자 가이드의 생산성을 높이는 도구.", descriptionEn: "AI tools that support design work and developer documentation.",
    href: "/project/figma-autoname",
    video: "x2Hn0qNXakA",
  },
  infcon: { eyebrow: "TALK · INFCON 2024", title: "Klever / Self Explorer", description: "AI 기반 사용성 테스트 실험을 소개한 인프콘 공동 발표.", descriptionEn: "A joint INFCON talk about experiments in AI usability testing.", video: "JVfpIy5LhJ8", href: "/project/klever" },
  talk: {
    eyebrow: "OPEN SOURCE · 2025", title: "TalkToFigma",
    description: "Figma 자동화에 기여하고, 동료들과 더 쉽게 시작할 수 있는 Desktop 앱을 만들었습니다.", descriptionEn: "I contributed to Figma automation and built a desktop app with colleagues to make it easier to get started.",
    href: "/project/talk-to-figma-mcp", video: "DInyZLnEgmA",
  },
  mcp: {
    eyebrow: "OPEN SOURCE · 2026", title: "MCP Magic",
    description: "Friends of Figma Seoul 팀과 함께 발전시킨 디자인 자동화 도구.", descriptionEn: "A design automation tool built with the Friends of Figma Seoul team.",
    href: "/blog/mcp-magic-retrospective",
    frames: [
      { src: "/images/projects/2026-mcp-magic-retrospective/mcp-magic-desktop.png", alt: "MCP Magic desktop app" },
      { src: "/images/projects/2026-mcp-magic-retrospective/mcp-magic-key-metrics-social.png", alt: "MCP Magic usage and tool call metrics" },
      { src: "/images/projects/2026-mcp-magic-retrospective/mcp-magic-calls-by-purpose-social.png", alt: "MCP Magic tool calls by design purpose" },
    ],
  },
  shuttle: {
    eyebrow: "INDEPENDENT PRODUCT · 2026", title: "나섬 셔틀 플랫폼", titleEn: "NaSum Shuttle Platform",
    description: "승객과 운전자의 앱부터 API와 서버까지 직접 만든 서비스.", descriptionEn: "A service I built across the passenger and driver apps, API, and server.",
    href: "/project/how-far-can-a-product-designer-build-with-codex", video: "mBSo7rGlFjo",
  },
  builderDay: {
    eyebrow: "AWARD · 2026",
    title: "OpenAI Build Week Seoul",
    description: "나섬 셔틀 플랫폼으로 1등을 차지했습니다.",
    descriptionEn: "The NaSum Shuttle Platform took first place.",
    href: "/project/how-far-can-a-product-designer-build-with-codex",
    article: builderDayArticles,
    frames: [{
      src: "/images/projects/2026-rider-driver-codex/24_openai_builder_day_2026.jpeg",
      alt: "OpenAI Build Week Seoul 행사 화면에 박주형과 1등 발표 슬라이드가 나란히 보입니다.",
      altEn: "The OpenAI Build Week Seoul screen shows Joo Hyung Park alongside the first-place announcement.",
    }],
  },
  community: { eyebrow: "COMMUNITY · 2022—2026", title: "Friends of Figma Seoul", description: "함께 배우고 실험하는 커뮤니티. 21개 행사, 1,775건의 등록과 904건의 체크인.*", descriptionEn: "A community that learns and experiments together. 21 events, 1,775 registrations, and 904 check-ins.*", href: "https://friends.figma.com/seoul/", external: true,
    frames: [
      { src: "/images/projects/friends-of-figma-seoul/joo-speaking.webp", alt: "Friends of Figma Seoul 행사에서 발표하는 박주형", altEn: "Joo Hyung Park speaking at a Friends of Figma Seoul event" },
      { src: "/images/projects/friends-of-figma-seoul/chapter-group.webp", alt: "Friends of Figma Seoul 팻말을 든 참가자들", altEn: "Attendees holding a Friends of Figma Seoul sign" },
      { src: "/images/projects/friends-of-figma-seoul/ai-usability-talk.webp", alt: "AI와 오픈소스를 활용한 사용성 테스트 발표", altEn: "Talk on usability testing with AI and open source" },
      { src: "/images/projects/friends-of-figma-seoul/ai-meetup-audience.webp", alt: "AI 디자인 교육 밋업의 발표와 참가자", altEn: "Presentation and attendees at the AI design education meetup" },
      { src: "/images/projects/friends-of-figma-seoul/ai-meetup-materials.webp", alt: "AI 디자인 교육 밋업 인쇄물", altEn: "Printed materials at the AI design education meetup" },
    ],
  },
  fofTalk: {
    eyebrow: "TALK · FRIENDS OF FIGMA", title: "Friends of Figma World Tour #12 Strategy",
    titleEn: "Friends of Figma World Tour #12 Strategy",
    description: "누구나 코드로 제품을 만드는 시대, 캔버스는 무엇을 위해 존재할까? 가장 최근에 발표한 영상입니다.",
    descriptionEn: "In an era when anyone can build products with code, what is the canvas for? My most recent talk.",
    href: "https://youtu.be/rCyZVwUJDOc?t=1840", external: true,
    video: "rCyZVwUJDOc", videoStart: 1840,
  },
  automationWorkshop: {
    eyebrow: "COMMUNITY WORKSHOP · 2025",
    title: "MCP 디자인 자동화 워크숍",
    titleEn: "MCP Design Automation Workshop",
    description: "참가자를 직접 모집하고 사내와 Friends of Figma Seoul에서 각각 진행한 디자인 자동화 실습입니다. 영상은 커뮤니티 워크숍 소개입니다.",
    descriptionEn: "I recruited participants and led hands-on design automation sessions at work and with Friends of Figma Seoul. The video introduces the community workshop.",
    href: "https://friends.figma.com/events/details/figma-seoul-presents-jageob-siganeul-dancughaejuneun-mcp-dijain-otomeisyeon-weokeusyob-1/",
    external: true,
    video: "hTBqVoSE0D4",
    videoEn: "smE8OMN1Qjs",
  },
};

// Shuffle the motion order per page load, then deal it across the image reels.
const motionOrder = Math.random() < 0.5 ? ["orbit", "photo"] : ["photo", "orbit"];
const imageMotions = new Map(
  Object.values(scenes)
    .filter((scene) => scene.frames && scene.frames.length > 1)
    .map((scene, index) => [scene, motionOrder[index % motionOrder.length]]),
);

// Two columns only when the story column and the stage both have room.
const DESKTOP_QUERY = "(min-width: 1280px)";

const routeScenes: Record<string, string> = {
  "/project/tstore": "tstore", "/project/onestore": "onestore", "/project/gdc": "gdc",
  "/project/lookbook": "lookbook", "/project/ldsg": "ldsg", "/project/naver-now": "naver",
  "/project/tensorflow-js": "figmaml", "/project/figma-autoname": "autoname", "/project/klever": "infcon",
  "/project/talk-to-figma-mcp": "talk", "/blog/mcp-magic-retrospective": "mcp",
  "/project/how-far-can-a-product-designer-build-with-codex": "shuttle",
};

const videoScenes: Record<string, string> = {
  blL0EQ6wNH8: "google",
  ckN1QIpjkAk: "config",
  JVfpIy5LhJ8: "infcon",
  hTBqVoSE0D4: "automationWorkshop",
  rCyZVwUJDOc: "fofTalk",
  smE8OMN1Qjs: "automationWorkshop",
};

function sceneForUrl(href: string): string | undefined {
  if (href === builderDayArticles.ko || href === builderDayArticles.en) return "builderDay";
  if (href === "confidential:grab-console") return "grabConsole";
  if (href === "confidential:grab-data") return "grabData";
  const url = new URL(href);
  if (url.hostname === "api.metadata.co.kr") return routeScenes[url.pathname];
  if (url.hostname === "youtu.be") return videoScenes[url.pathname.split("/")[1]];
  if (url.hostname === "youtube.com" || url.hostname.endsWith(".youtube.com")) {
    return videoScenes[url.searchParams.get("v") ?? ""];
  }
  if (url.hostname === "friends.figma.com") return "community";
}

type Block = { type: "title" | "section" | "paragraph"; text: string };
function parseStory(story: string): Block[] {
  return story.trim().split(/\n\s*\n/).map((part) => {
    const text = part.trim();
    if (text.startsWith("#### ")) return { type: "section", text: text.slice(5) };
    if (text.startsWith("### ")) return { type: "title", text: text.slice(4) };
    return { type: "paragraph", text: text.replace(/\n/g, " ") };
  });
}
const stories = { ko: parseStory(koreanStory), en: parseStory(englishStory) };

const terminalStories = [
  { command: "career", lines: [
    ["2012", "T store · Developer Center"],
    ["2015", "ONE store · Developer Platform"],
    ["2019", "LINE · Design System Global"],
    ["2023 →", "Grab · Developer Experience"],
  ] },
  { command: "projects", lines: [
    ["2021", "Figma ML · Design system QA"],
    ["2024", "Klever · AI usability testing"],
    ["2025", "TalkToFigma · Open-source contribution"],
    ["2026", "나섬 셔틀 · End-to-end product"],
  ] },
  { command: "community", lines: [
    ["2022 →", "Friends of Figma Seoul · Co-organizer"],
    ["21", "Events through October 2026"],
    ["1,775", "Registrations · Event totals"],
    ["904", "Check-ins · Event totals"],
  ] },
  { command: "focus", lines: [
    ["01", "Developer platforms & tools"],
    ["02", "Design systems & productivity"],
    ["03", "AI experiments & open source"],
    ["04", "Building products end to end"],
  ] },
] as const;

// Pick once per page load, avoiding the previous story in the same tab.
function chooseTerminalStory() {
  try {
    const key = "jude-terminal-story";
    const previous = Number(sessionStorage.getItem(key));
    const hasPrevious = sessionStorage.getItem(key) !== null && Number.isInteger(previous) && previous >= 0 && previous < terminalStories.length;
    let index = Math.floor(Math.random() * (terminalStories.length - (hasPrevious ? 1 : 0)));
    if (hasPrevious && index >= previous) index++;
    sessionStorage.setItem(key, String(index));
    return terminalStories[index];
  } catch {
    return terminalStories[Math.floor(Math.random() * terminalStories.length)];
  }
}
const terminalStory = chooseTerminalStory();

function IntroTerminal({ reducedMotion }: { reducedMotion: boolean }) {
  const { language } = useSitePreferences();
  const identity = language === "ko" ? "박주형, 프로덕트 디자이너이자 빌더." : "Joo Hyung Park, product designer and builder.";
  const description = `Jude CLI. ${identity} ${terminalStory.command}: ${terminalStory.lines.map(([label, text]) => `${label} ${text}`).join(", ")}.`;
  const staticRows = <>
    <div className="jude-command">&gt; jude whoami</div>
    <div className="jude-identity"><span>✓ Joo Hyung Park <span>· Product Designer &amp; Builder</span></span></div>
    <div className="jude-command jude-next-command">&gt; jude {terminalStory.command}</div>
    {terminalStory.lines.map(([label, text]) => <div className="jude-output" key={label}><span><span className="jude-output-label">{label}</span> <span>{text}</span></span></div>)}
    <div className="jude-finish">✓ Building for the people who build.</div>
  </>;
  return (
    <div className="jude-terminal-shell" role="img" aria-label={description}>
      <div aria-hidden="true" className="jude-terminal-visual">
        {!reducedMotion && <Terminal className="jude-terminal jude-terminal-sizer" sequence={false}>{staticRows}</Terminal>}
        {reducedMotion ? <Terminal className="jude-terminal" sequence={false}>{staticRows}</Terminal> : (
          <Terminal className="jude-terminal">
            <TypingAnimation className="jude-command" duration={38}>{"> jude whoami"}</TypingAnimation>
            <AnimatedSpan className="jude-identity"><span>✓ Joo Hyung Park <span>· Product Designer &amp; Builder</span></span></AnimatedSpan>
            <TypingAnimation className="jude-command jude-next-command" duration={38}>{`> jude ${terminalStory.command}`}</TypingAnimation>
            {terminalStory.lines.map(([label, text]) => <AnimatedSpan className="jude-output" key={label}><span><span className="jude-output-label">{label}</span> <span>{text}</span></span></AnimatedSpan>)}
            <AnimatedSpan className="jude-finish">✓ Building for the people who build.</AnimatedSpan>
          </Terminal>
        )}
      </div>
    </div>
  );
}

function SceneImages({ scene, frames, reducedMotion }: {
  scene: Scene;
  frames: SceneFrame[];
  reducedMotion: boolean;
}) {
  const { language } = useSitePreferences();
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const gallery = frames.length > 1;

  useEffect(() => {
    const root = rootRef.current;
    if (!gallery || !root || reducedMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.intersectionRatio >= 0.25);
    }, { threshold: 0.25 });
    observer.observe(root);
    return () => observer.disconnect();
  }, [gallery, reducedMotion]);

  useEffect(() => {
    if (!gallery || !visible || reducedMotion) return;
    let step = 0;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      step++;
      setIndex(step % frames.length);
      if (step === frames.length) window.clearInterval(timer);
    }, 3800 / frames.length);
    return () => window.clearInterval(timer);
  }, [frames.length, gallery, reducedMotion, visible]);

  const activeIndex = reducedMotion ? 0 : index;

  return (
    <div
      ref={rootRef}
      className={`narrative-image-stage${gallery ? " narrative-image-gallery" : ""}`}
      data-motion={imageMotions.get(scene)}
      role={gallery ? "group" : undefined}
      aria-label={gallery ? language === "ko" ? `${scene.title} 이미지` : `${scene.titleEn ?? scene.title} images` : undefined}
    >
      <div className="narrative-image-track">
        {frames.map((frame, frameIndex) => {
          const offset = (frameIndex - activeIndex + frames.length) % frames.length;
          const position = offset === 0
            ? "front"
            : offset === 1 && (frames.length > 2 || activeIndex === 0)
              ? "next"
              : offset === frames.length - 1 ? "previous" : "queued";
          return (
            <div
              className="narrative-image-frame"
              data-position={position}
              aria-hidden={offset !== 0}
              key={frame.src}
            >
              <img src={frame.src} alt={language === "en" ? frame.altEn ?? frame.alt : frame.alt} decoding="async" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SceneCard({ sceneKey, reducedMotion }: { sceneKey: string; reducedMotion: boolean }) {
  const { language } = useSitePreferences();
  const mediaRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), { rootMargin: "200px" });
    observer.observe(media);
    return () => observer.disconnect();
  }, [sceneKey]);
  const korean = language === "ko";
  const scene = scenes[sceneKey];
  const title = korean ? scene.title : scene.titleEn ?? scene.title;
  const video = korean ? scene.video : scene.videoEn ?? scene.video;
  const externalLabel = sceneKey === "automationWorkshop"
    ? (korean ? "행사 보기" : "View the event")
    : sceneKey === "fofTalk" ? (korean ? "YouTube에서 보기" : "Watch on YouTube")
    : (korean ? "커뮤니티 보기" : "Visit the community");
  const mediaType = scene.confidential ? "confidential" : sceneKey === "intro" ? "terminal"
    : sceneKey === "builderDay" ? "award"
    : video || scene.clip ? "video" : "images";
  return (
    <div className="narrative-scene" key={sceneKey}>
      <div ref={mediaRef} className={`narrative-media narrative-media-${mediaType}`} style={scene.clip ? { aspectRatio: scene.clip.aspect } : undefined}>
        {scene.confidential ? <ConfidentialMedia language={language} company={scene.company} reducedMotion={reducedMotion} active={nearViewport} hero={scene.hero && { src: scene.hero.src, alt: korean ? scene.hero.alt : scene.hero.altEn ?? scene.hero.alt }} /> : sceneKey === "intro" ? <IntroTerminal reducedMotion={reducedMotion} /> : video ? (
          nearViewport && <iframe title={korean ? `${title} 영상` : `${title} video`} src={withYouTubeClientIdentity(`https://www.youtube.com/embed/${video}?${reducedMotion ? "" : "autoplay=1&mute=1&"}playsinline=1&rel=0${scene.videoStart ? `&start=${scene.videoStart}` : ""}`)} referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        ) : scene.clip ? (
          nearViewport && <video
            key={String(reducedMotion)}
            src={scene.clip.src}
            poster={scene.clip.poster}
            aria-label={korean ? `${title} 데모` : `${title} demo`}
            autoPlay={!reducedMotion}
            muted
            playsInline
            loop
            controls
            preload="metadata"
          />
        ) : scene.frames ? (
          <SceneImages scene={scene} frames={scene.frames} reducedMotion={reducedMotion} />
        ) : null}
      </div>
      <div className="narrative-scene-info">
        <div>
          <p className="narrative-eyebrow">{scene.eyebrow}</p>
          <h2>{title}</h2>
          <p className="narrative-scene-description">{korean ? scene.description : scene.descriptionEn}</p>
          {sceneKey === "community" && <p className="narrative-scene-note">{korean ? "* 2026년 10월까지의 행사별 합계이며, 중복 없는 참여자 수가 아닙니다." : "* Totals across events through October 2026. The same person may be counted more than once."}</p>}
        </div>
        <div className="narrative-scene-links">
          {scene.article ? (
            <a href={scene.article[language]} hrefLang={language} target="_blank" rel="noreferrer">
              {korean ? "LinkedIn에서 제작기 읽기" : "Read the build story on LinkedIn"} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : scene.external ? (
            <a href={scene.href} target="_blank" rel="noreferrer">
              {externalLabel} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : scene.href ? (
            <Link to={getContentPathForLanguage(scene.href, language)}>
              {scene.confidential ? (korean ? "공개된 사례 보기" : "View the public case study") : sceneKey === "intro" ? (korean ? "프로젝트 전체 보기" : "View all projects") : (korean ? "자세히 보기" : "Read more")} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ) : <span className="narrative-confidential-note">{korean ? "비공개 프로젝트" : "Confidential project"}</span>}
        </div>
      </div>
    </div>
  );
}

export function NarrativeHome() {
  const { language, theme } = useSitePreferences();
  const korean = language === "ko";
  const blocks = stories[language];
  const articleRef = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [activeScene, setActiveScene] = useState("intro");
  const [activeTrigger, setActiveTrigger] = useState<string | null>(null);
  // Key messages whose text reveal has finished; their highlight is drawn only then.
  const [doneKeys, setDoneKeys] = useState<ReadonlySet<string>>(() => new Set());
  const [mobileScenes, setMobileScenes] = useState<Record<string, { trigger: string; scene: string }>>({});
  const lastMobileTrigger = useRef<string | null>(null);

  useEffect(() => {
    lastMobileTrigger.current = null;
    setMobileScenes({});
  }, [language]);

  useEffect(() => { lastMobileTrigger.current = null; }, [desktop]);

  useEffect(() => {
    const size = window.matchMedia(DESKTOP_QUERY);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSize = () => setDesktop(size.matches);
    const updateMotion = () => setReducedMotion(motion.matches);
    size.addEventListener("change", updateSize);
    motion.addEventListener("change", updateMotion);
    return () => { size.removeEventListener("change", updateSize); motion.removeEventListener("change", updateMotion); };
  }, []);

  useEffect(() => {
    let frame = 0;
    let disposed = false;
    const update = () => {
      frame = 0;
      const article = articleRef.current;
      if (!article) return;
      const threshold = window.innerHeight * 0.58;
      if (!reducedMotion) {
        const changes: Array<() => void> = [];
        article.querySelectorAll<HTMLElement>(".narrative-paragraph").forEach((paragraph) => {
          // Inline project cards can be taller than their paragraph; only the
          // text itself should determine the reading boundary.
          const text = paragraph.querySelector<HTMLElement>(":scope > p");
          if (!text) return;
          const rect = text.getBoundingClientRect();
          const state = rect.bottom < threshold ? "read" : rect.top > threshold ? "unread" : "reading";
          if (paragraph.dataset.readState !== state) changes.push(() => { paragraph.dataset.readState = state; });
          if (state !== "reading") return;
          paragraph.querySelectorAll<HTMLElement>(".narrative-word").forEach((word) => {
            const wordRect = word.getBoundingClientRect();
            const horizontalPosition = Math.max(0, (wordRect.left - rect.left) / Math.max(rect.width, 1));
            const progress = Math.max(0, Math.min(1, ((threshold - wordRect.top) / Math.max(wordRect.height, 1)) * 1.65 - horizontalPosition * 0.65));
            changes.push(() => {
              word.style.setProperty("--read", `${Math.round(progress * 100)}%`);
              word.style.setProperty("--reveal-opacity", String(progress));
            });
          });
        });
        changes.forEach((change) => change());
        const finished = new Set<string>();
        article.querySelectorAll<HTMLElement>("[data-key-id]").forEach((phrase) => {
          const state = phrase.closest<HTMLElement>(".narrative-paragraph")?.dataset.readState;
          const words = phrase.querySelectorAll<HTMLElement>(".narrative-word");
          const last = words[words.length - 1];
          const revealed = state === "read" || (state === "reading" && last && Number(last.style.getPropertyValue("--reveal-opacity")) >= 0.999);
          if (revealed && phrase.dataset.keyId) finished.add(phrase.dataset.keyId);
        });
        setDoneKeys((previous) => previous.size === finished.size && [...finished].every((id) => previous.has(id)) ? previous : finished);
        article.dataset.readingReveal = "active";
      } else {
        delete article.dataset.readingReveal;
      }
      if (!desktop) {
        let candidate: HTMLElement | null = null;
        article.querySelectorAll<HTMLElement>(".narrative-trigger[data-scene][data-trigger]").forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom >= 0) candidate = element;
        });
        const element = candidate as HTMLElement | null;
        const trigger = element?.dataset.trigger;
        const scene = element?.dataset.scene;
        setActiveTrigger(trigger ?? null);
        if (trigger && scene && trigger !== lastMobileTrigger.current) {
          lastMobileTrigger.current = trigger;
          if (!scenes[scene].article) {
            const block = trigger.split("-link-")[0];
            setMobileScenes((previous) => ({ ...previous, [block]: { trigger, scene } }));
          }
        }
        return;
      }
      let scene = "intro";
      let trigger: string | null = null;
      article.querySelectorAll<HTMLElement>("[data-scene]").forEach((element) => {
        if (element.getBoundingClientRect().top <= threshold) {
          scene = element.dataset.scene || scene;
          trigger = element.dataset.trigger || null;
        }
      });
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && focused.matches(".narrative-trigger[data-scene][data-trigger]") && article.contains(focused)) {
        const rect = focused.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          scene = focused.dataset.scene || scene;
          trigger = focused.dataset.trigger || null;
        }
      }
      setActiveScene(scene);
      setActiveTrigger(trigger);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    if (articleRef.current) observer?.observe(articleRef.current);
    document.fonts?.ready.then(() => { if (!disposed) schedule(); });
    return () => {
      disposed = true;
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      if (articleRef.current) delete articleRef.current.dataset.readingReveal;
    };
  }, [desktop, reducedMotion, language]);

  // **key message** marks the sentences a skimming reader should catch.
  function renderText(text: string, prefix: string): ReactNode[] {
    return text.split(/(\*\*[^*]+\*\*)/).flatMap<ReactNode>((part, index) => part.startsWith("**")
      ? [<span key={`${prefix}-k${index}`} data-key-id={`${prefix}-k${index}`}><Highlighter action="underline" color={theme === "dark" ? "#e3c94e" : "#c9a227"} strokeWidth={2} iterations={1} padding={2} animationDuration={500} active={reducedMotion || doneKeys.has(`${prefix}-k${index}`)}>{renderWords(part.slice(2, -2), `${prefix}-k${index}`)}</Highlighter></span>]
      : renderWords(part, `${prefix}-t${index}`));
  }

  function renderWords(text: string, prefix: string): ReactNode[] {
    return text.split(/(\s+)/).map((piece, index) => !piece || /\s+/.test(piece) ? piece : <span className="narrative-word" key={`${prefix}-w${index}`}><span className="narrative-word-muted" aria-hidden="true">{piece}</span><span className="narrative-word-reveal">{piece}</span></span>);
  }

  function renderParagraph(text: string, blockIndex: number) {
    const parts: ReactNode[] = [];
    const links = /\[([^\]]+)\]\(([^)]+)\)/g;
    let last = 0;
    let linkIndex = 0;
    let match: RegExpExecArray | null;
    const mobileScene = mobileScenes[String(blockIndex)];
    let articleScene: string | undefined;
    while ((match = links.exec(text))) {
      parts.push(...renderText(text.slice(last, match.index), `${blockIndex}-${last}`));
      const key = `${blockIndex}-link-${linkIndex++}`;
      const scene = sceneForUrl(match[2]);
      if (scene && scenes[scene].article) {
        articleScene = scene;
        parts.push(
          <a
            key={key}
            className={`narrative-trigger ${activeTrigger === key ? "is-active" : ""}`}
            href={match[2]}
            hrefLang={language}
            target="_blank"
            rel="noreferrer"
            data-scene={scene}
            data-trigger={key}
            onFocus={() => {
              if (desktop) {
                setActiveScene(scene);
                setActiveTrigger(key);
              }
            }}
          >
            <DiaTextReveal text={match[1]} active={activeTrigger === key} reducedMotion={reducedMotion} />
          </a>,
        );
      } else if (scene) {
        const selected = activeTrigger === key;
        const common = {
          className: `narrative-trigger ${scenes[scene].confidential ? "narrative-trigger-confidential" : ""} ${selected ? "is-active" : ""}`,
          "data-scene": scene,
          "data-trigger": key,
          "aria-label": scenes[scene].confidential ? `${match[1]} — ${korean ? "비공개 프로젝트" : "confidential project"}` : undefined,
          onFocus: () => { if (desktop) { setActiveScene(scene); setActiveTrigger(key); } },
        };
        const label = <><DiaTextReveal text={match[1]} active={selected} reducedMotion={reducedMotion} />{scenes[scene].confidential && <LockKeyhole className="narrative-trigger-lock" size={13} aria-hidden="true" />}</>;
        if (scenes[scene].confidential && !scenes[scene].href) {
          parts.push(<button key={key} type="button" {...common} onClick={() => {
            setActiveTrigger(key);
            if (desktop) setActiveScene(scene);
            else {
              lastMobileTrigger.current = key;
              setMobileScenes((previous) => ({ ...previous, [String(blockIndex)]: { trigger: key, scene } }));
              requestAnimationFrame(() => document.getElementById(`scene-${blockIndex}`)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" }));
            }
          }}>{label}</button>);
        } else {
          const url = new URL(match[2]);
          const internal = url.hostname === "api.metadata.co.kr";
          const href = internal ? getContentPathForLanguage(`${url.pathname}${url.search}${url.hash}`, language) : match[2];
          parts.push(internal
            ? <Link key={key} to={href} {...common}>{label}</Link>
            : <a key={key} href={href} target="_blank" rel="noreferrer" {...common}>{label}</a>);
        }
      } else {
        parts.push(<a key={key} href={match[2]}>{match[1]}</a>);
      }
      last = links.lastIndex;
    }
    parts.push(...renderText(text.slice(last), `${blockIndex}-${last}`));
    const resetScene = korean
      ? text.startsWith("2023년에는 싱가포르 Grab") || text.startsWith("본업에서는 개발자가 더 잘")
      : text.startsWith("In 2023, I joined Grab") || text.startsWith("I design environments that help developers");
    return (
      <div className="narrative-paragraph" data-scene={resetScene ? "intro" : undefined} key={blockIndex}>
        <p>{parts}</p>
        {!desktop && mobileScene && (
          <div className="narrative-inline-scene" id={`scene-${blockIndex}`}><SceneCard sceneKey={mobileScene.scene} reducedMotion={reducedMotion} /></div>
        )}
        {!desktop && articleScene && (
          <div className="narrative-inline-scene"><SceneCard sceneKey={articleScene} reducedMotion={reducedMotion} /></div>
        )}
      </div>
    );
  }

  return (
    <main className="narrative-home" id="main">
      <div className="narrative-layout">
        <article className="narrative-story" ref={articleRef} lang={language} id="about">
          {!desktop && (
            <div className="narrative-mobile-intro">
              <div className="narrative-media narrative-media-terminal"><IntroTerminal reducedMotion={reducedMotion} /></div>
            </div>
          )}
          <div className="narrative-intro-label"><span>JOO HYUNG PARK</span><span>PRODUCT DESIGNER & BUILDER</span></div>
          {blocks.map((block, index) => block.type === "title" ? <h1 key={index}>{block.text}</h1> : block.type === "section" ? <h2 className="narrative-section-title" key={index}><span>0{blocks.filter((item, i) => i <= index && item.type === "section").length}</span>{block.text}</h2> : renderParagraph(block.text, index))}
          <p className="narrative-footnote">{korean ? "* 커뮤니티 수치는 2026년 10월까지의 행사별 합계입니다." : "* Community figures are totals across events through October 2026."}</p>
        </article>
        {desktop && <aside className="narrative-stage" aria-label={korean ? "프로젝트 미리보기" : "Project preview"}><div className="narrative-stage-inner"><SceneCard sceneKey={activeScene} reducedMotion={reducedMotion} /></div></aside>}
      </div>
      <section className="narrative-contact" id="contact">
        <p>{korean ? "채용 문의" : "HIRING INQUIRIES"}</p>
        <h2>
          {korean ? "채용에 관심이 있으시면" : "Interested in hiring me?"}
          <br />
          {korean ? "이메일로 연락해 주세요." : "Send me an email."}
        </h2>
        <a href="mailto:dusskapark@gmail.com">
          {korean ? "이메일 보내기" : "Send me an email"} <ArrowRight size={20} aria-hidden="true" />
        </a>
        <div>
          <Link to="/projects">{korean ? "모든 프로젝트 보기" : "View all projects"} <ArrowUpRight size={16} /></Link>
          <Link to="/blog">{korean ? "글과 기록 보기" : "Read my writing"} <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
