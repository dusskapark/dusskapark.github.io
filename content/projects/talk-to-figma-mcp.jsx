import { LinkPreview, LinkPreviewGrid, MediaEmbed } from "@/components/content";

export const frontmatter = {"kind":"project","slug":"talk-to-figma-mcp","title":"TalkToFigma MCP & Desktop: Pioneer of AI-Powered Design Productivity","description":"I saw the potential of the CTTF open-source MCP and contributed core automation tools. After observing major installation friction during workshops, I started building TalkToFigma Desktop to make MCP truly usable for non-engineer designers.","date":"2025-07-14","lang":"en","listed":true,"hero":"/images/projects/2025-talk-to-figma-mcp/hero.png","legacyPaths":["/project/talk-to-figma-mcp.html","/project/talk-to-figma-mcp/"],"subtitle":"Figma + AI project (2025)","team":"JooHyung (Lead Contributor & Desktop Solution Lead), Sonny Lazuardi (Original Creator), Jin, Yiseo (Desktop App Co-Developers)","role":"Solution Lead, Contributor (2nd Coder)","galleryImages":["/images/projects/2025-talk-to-figma-mcp/hero.png"],"sourceFile":"_projects/2025-07-14-talk-to-figma-mcp.md","headings":[{"depth":2,"text":"One-line Summary","id":"one-line-summary"},{"depth":2,"text":"1) Start: I Saw the Open-Source MCP Potential","id":"1-start-i-saw-the-open-source-mcp-potential"},{"depth":3,"text":"Core Areas I Contributed","id":"core-areas-i-contributed"},{"depth":2,"text":"2) Turning Point: The Bottleneck Was Installation, Not Interest","id":"2-turning-point-the-bottleneck-was-installation-not-interest"},{"depth":2,"text":"3) Solution: I Started Building TalkToFigma Desktop","id":"3-solution-i-started-building-talktofigma-desktop"},{"depth":3,"text":"What We Prioritized in Desktop","id":"what-we-prioritized-in-desktop"},{"depth":2,"text":"4) Outcome: Faster and Wider Adoption Than Expected","id":"4-outcome-faster-and-wider-adoption-than-expected"},{"depth":2,"text":"5) Current Conclusion","id":"5-current-conclusion"},{"depth":2,"text":"References & Links","id":"references--links"}]};

export default function TalkToFigmaMcpContent() {
  return <>
      <h2 id="one-line-summary">One-line Summary</h2>
      {"\n"}
      <p>
        {"I saw real potential in "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>cursor-talk-to-figma-mcp</span>
            </span>
          </code>
        </span>
        {", contributed several core automation tools, and then built "}
        <strong>TalkToFigma Desktop</strong>
        {" after workshops made one thing clear: most designers were blocked not by value, but by installation complexity."}
      </p>
      {"\n"}
      <h2 id="1-start-i-saw-the-open-source-mcp-potential">1) Start: I Saw the Open-Source MCP Potential</h2>
      {"\n"}
      <p>
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>cursor-talk-to-figma-mcp</span>
            </span>
          </code>
        </span>
        , started by Sonny Lazuardi, connected Cursor Agentic AI with Figma to automate repetitive design work.
      </p>
      {"\n"}
      <p>I believed this was more than a trend demo. It could become a practical productivity layer for real design teams. So I started contributing by converting workflows I already used in production into MCP tools.</p>
      {"\n"}
      <h3 id="core-areas-i-contributed">Core Areas I Contributed</h3>
      {"\n"}
      <ul>
        {"\n"}
        <li>
          <strong>Smart Data Population</strong>
          : Fill Figma cards/text with context-aware real data.
        </li>
        {"\n"}
        <li>
          <strong>Legacy Annotation Converter</strong>
          : Upgrade existing annotations into cleaner handoff-ready output.
        </li>
        {"\n"}
        <li>
          <strong>Instance Override Propagation</strong>
          : Apply repetitive instance override changes in bulk.
        </li>
        {"\n"}
        <li>
          <strong>DevMode Integration</strong>
          : Generate actionable review comments from design/accessibility context.
        </li>
        {"\n"}
      </ul>
      {"\n"}
      <p>
        {"The key was not button-based automation—it was "}
        <strong>natural-language, context-aware design automation</strong>
        .
      </p>
      {"\n"}
      <h2 id="2-turning-point-the-bottleneck-was-installation-not-interest">2) Turning Point: The Bottleneck Was Installation, Not Interest</h2>
      {"\n"}
      <p>Workshops made the core problem obvious:</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>Designers strongly understood and wanted the value.</li>
        {"\n"}
        <li>But many dropped off at install, setup, and re-run stages.</li>
        {"\n"}
      </ul>
      {"\n"}
      <p>So this was not a motivation problem. It was an onboarding problem. Without solving that, feature contributions alone would not scale real adoption.</p>
      {"\n"}
      <h2 id="3-solution-i-started-building-talktofigma-desktop">3) Solution: I Started Building TalkToFigma Desktop</h2>
      {"\n"}
      <p>
        {"I focused on removing that barrier and started building "}
        <strong>TalkToFigma Desktop</strong>
        . Later, I collaborated with Jin to improve quality and release it publicly.
      </p>
      {"\n"}
      <MediaEmbed src={"https://www.youtube.com/embed/DInyZLnEgmA?si=Ls2VFJxgwzmbzMeZ"} title={"TalkToFigma MCP & Desktop: Pioneer of AI-Powered Design Productivity — video 1"} aspectRatio={"560 / 315"} />
      {"\n"}
      <h3 id="what-we-prioritized-in-desktop">What We Prioritized in Desktop</h3>
      {"\n"}
      <ul>
        {"\n"}
        <li>
          <strong>One-click installation</strong>
          {" (executable-first experience)"}
        </li>
        {"\n"}
        <li>
          <strong>Simplified MCP setup/execution</strong>
          {" (minimal CLI burden)"}
        </li>
        {"\n"}
        <li>
          <strong>System tray operations</strong>
          {" (easy run/stop for daily usage)"}
        </li>
        {"\n"}
        <li>
          <strong>Tutorial-based onboarding</strong>
          {" (usable by non-engineers)"}
        </li>
        {"\n"}
      </ul>
      {"\n"}
      <h2 id="4-outcome-faster-and-wider-adoption-than-expected">4) Outcome: Faster and Wider Adoption Than Expected</h2>
      {"\n"}
      <p>The app performed beyond what I and my friends expected.</p>
      {"\n"}
      <p>Detailed numeric metrics (installation success, retention, events/session, etc.) will be shared in a future update. Even so, early usage signals were already meaningful:</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>User activity observed across multiple countries, including Russia, India, and Singapore.</li>
        {"\n"}
        <li>Global usage reached the thousands through the desktop app pathway.</li>
        {"\n"}
        <li>The experience shifted from “too hard to install” to “download and use right away.”</li>
        {"\n"}
      </ul>
      {"\n"}
      <h2 id="5-current-conclusion">5) Current Conclusion</h2>
      {"\n"}
      <p>My biggest takeaway is simple:</p>
      {"\n"}
      <blockquote>
        {"\n"}
        <p>
          Great features alone do not spread.
          <br />
          {"\n"}
          Adoption starts when users can actually begin with confidence.
        </p>
        {"\n"}
      </blockquote>
      {"\n"}
      <p>I’ll continue building at the intersection of design and engineering—focused on tools that are not only powerful, but truly usable.</p>
      {"\n"}
      <hr />
      {"\n"}
      <h2 id="references--links">{"References & Links"}</h2>
      {"\n"}
      <LinkPreviewGrid>
        <LinkPreview url="https://github.com/grab/cursor-talk-to-figma-mcp" />
        <LinkPreview url="https://github.com/FigmaAI/TalkToFigmaDesktop" />
        <LinkPreview url="https://www.figma.com/community/file/1513760524697897204" />
        <LinkPreview url="https://www.figma.com/community/file/1513759391089024242" />
      </LinkPreviewGrid>
    </>;
}
