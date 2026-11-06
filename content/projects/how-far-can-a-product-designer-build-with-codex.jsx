import { AppDownloads, Gallery, MediaEmbed } from "@/components/content";
import { ContentLink } from "@/components/content/content-elements";

export const frontmatter = {"kind":"project","slug":"how-far-can-a-product-designer-build-with-codex","title":"Singapore Korean Church Shuttle Platform","description":"I built and shipped a rider-driver shuttle platform for a Korean church community in Singapore, using Codex not just for code generation but to move from problem framing to API contracts, native apps, driver-side arrival signals, store releases, and launch storytelling.","date":"2026-06-08","lang":"en","listed":true,"hero":"/images/projects/2026-rider-driver-codex/05-rider-driver-story-hero-v3.webp","legacyPaths":["/project/how-far-can-a-product-designer-build-with-codex.html","/project/how-far-can-a-product-designer-build-with-codex/"],"subtitle":"SIDE PROJECT (2026)","team":"Joo Hyung Park (Jude), with Codex as development partner","role":"Product Designer, Solo Product Builder","galleryImages":["/images/projects/2026-rider-driver-codex/05-rider-driver-story-hero-v3.webp"],"sourceFile":"_projects/2026-06-08-how-far-can-a-product-designer-build-with-codex.md","headings":[{"depth":2,"text":"Context: A Small Shuttle, A Real Product Problem","id":"context-a-small-shuttle-a-real-product-problem"},{"depth":2,"text":"Build 1: Start With A Small Web MVP","id":"build-1-start-with-a-small-web-mvp"},{"depth":3,"text":"Small Web MVP","id":"small-web-mvp"},{"depth":3,"text":"Plan Mode","id":"plan-mode"},{"depth":3,"text":"Swagger As Blueprint","id":"swagger-as-blueprint"},{"depth":2,"text":"Feedback 1: The Flow Worked, The Channel Did Not","id":"feedback-1-the-flow-worked-the-channel-did-not"},{"depth":2,"text":"Build 2: Translate The Rider Experience To Native","id":"build-2-translate-the-rider-experience-to-native"},{"depth":3,"text":"Real Device Validation","id":"real-device-validation"},{"depth":2,"text":"Feedback 2: The Rider App Could Not Create Every Signal","id":"feedback-2-the-rider-app-could-not-create-every-signal"},{"depth":2,"text":"Build 3: Make The Shuttle The Source Of Truth","id":"build-3-make-the-shuttle-the-source-of-truth"},{"depth":2,"text":"Work Mode: Keeping The Build Loop Alive From A Hospital Room","id":"work-mode-keeping-the-build-loop-alive-from-a-hospital-room"},{"depth":2,"text":"Builder Takeaway: Owning More Of The SDLC","id":"builder-takeaway-owning-more-of-the-sdlc"},{"depth":2,"text":"Reflection: What Stayed With Me","id":"reflection-what-stayed-with-me"},{"depth":2,"text":"References","id":"references"}]};

export default function HowFarCanAProductDesignerBuildWithCodexContent() {
  return <>
      <p>
        {"I wanted this project to answer a practical question: "}
        <strong>when AI makes implementation more reachable, what should a product designer be responsible for next?</strong>
      </p>
      {"\n"}
      <p>
        {"For me, the answer was not simply \"write more code.\" It was to own more of the path between a real problem, a system model, a working product, and a launch story. With "}
        <strong>Codex as my development partner</strong>
        , I built and shipped a rider-driver shuttle platform for a Korean church community in Singapore.
      </p>
      {"\n"}
      <p>The useful part of the story is how a small service kept forcing product decisions: which channel riders would actually use, which signals operators could trust, where a web MVP stopped being enough, and why a Driver app became necessary when rider check-ins could not represent every shuttle arrival.</p>
      {"\n"}
      <p>
        {"I have spent much of my career designing "}
        <strong>developer experience</strong>
        {" products. My users were often engineers, platform teams, ML practitioners, or people building tools for other technical teams. So code was never far away from my design work. I was not a full-time engineer, but I naturally wrote small prototypes, read APIs, touched front-end code, and learned what changes when a screen becomes a "}
        <strong>working product</strong>
        .
      </p>
      {"\n"}
      <p>
        {"That background made this project feel less like a jump into engineering and more like a chance to turn years of designing for builders into building practice. I had already been using tools like "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Cursor</span>
            </span>
          </code>
        </span>
        {" and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Claude Code</span>
            </span>
          </code>
        </span>
        {" actively in my own work, and Codex first entered my workflow as another capable coding agent."}
      </p>
      {"\n"}
      <p>
        {"Then the project kept pulling me further. What began as a small web service became a test of something more personal: "}
        <strong>how much of the SDLC could I own myself, beyond the design phase?</strong>
        {" Could I shape a real problem, connect the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>server</span>
            </span>
          </code>
        </span>
        {" and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>database</span>
            </span>
          </code>
        </span>
        {", move from "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>web</span>
            </span>
          </code>
        </span>
        {" to "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>iOS</span>
            </span>
          </code>
        </span>
        {" and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Android</span>
            </span>
          </code>
        </span>
        , debug real devices, prepare store releases, and tell the launch story at the end?
      </p>
      {"\n"}
      <h2 id="context-a-small-shuttle-a-real-product-problem">Context: A Small Shuttle, A Real Product Problem</h2>
      {"\n"}
      <p>NaSum Church, also known as Korean Presbyterian Church in Singapore, is a Korean-speaking church community in Singapore. My family often used the free weekend shuttle service the church provides.</p>
      {"\n"}
      <p>At first, it was simply something I was grateful for. Singapore is not a cheap city to move around in, so a free shuttle on a weekend morning felt generous and practical. But the more I used it, the more clearly I saw the small uncertainties around it.</p>
      {"\n"}
      <p>
        {"Riders had to check "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>PDFs</span>
            </span>
          </code>
        </span>
        {", map links, and KakaoTalk messages to understand where to wait and whether the shuttle had already passed. If someone in the group chat posted, "}
        <strong>"the bus just passed this stop,"</strong>
        {" everyone benefited. If nobody posted, people waited with uncertainty."}
      </p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2026-rider-driver-codex/08-pre-product-shuttle-context.png",
      "width": 2183,
      "height": 1500,
      "alt": "Singapore Korean Church Shuttle Platform — Before the product, route details and arrival signals were scattered across manual documents, map links, and KakaoTalk updates. 1"
    }]} columns={1} caption={<>Before the product, route details and arrival signals were scattered across manual documents, map links, and KakaoTalk updates.</>} fullWidth={true} />
      {"\n"}
      <p>
        {"That was where the project started. "}
        <strong>Not from a grand product idea</strong>
        , but from a useful service that still depended too much on scattered manual updates.
      </p>
      {"\n"}
      <p>
        {"The first thing I wanted to reduce was "}
        <strong>uncertainty</strong>
        .
      </p>
      {"\n"}
      <p>For riders, the uncertainty was simple:</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>Where should I wait?</li>
        {"\n"}
        <li>Which route should I take?</li>
        {"\n"}
        <li>Has the shuttle already passed?</li>
        {"\n"}
        <li>Did anyone else board from this stop?</li>
        {"\n"}
      </ul>
      {"\n"}
      <p>For operators, the uncertainty was different:</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>Which stops are actually being used?</li>
        {"\n"}
        <li>How many people boarded?</li>
        {"\n"}
        <li>Where is demand increasing or disappearing?</li>
        {"\n"}
        <li>How much coordination still depends on chat?</li>
        {"\n"}
      </ul>
      {"\n"}
      <p>
        {"The product I decided to build was a small operating service where riders and operators could look at the "}
        <strong>same signals</strong>
        {". Riders could check routes and stops, board with "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>QR check-in</span>
            </span>
          </code>
        </span>
        , and receive updates. Operators could manage routes, stops, boarding records, and notifications in one place.
      </p>
      {"\n"}
      <p>
        {"The goal was "}
        <del>to make the shuttle feel more high-tech</del>
        {" "}
        <strong>to make a generous, volunteer-driven service easier to use and easier to operate</strong>
        .
      </p>
      {"\n"}
      <p>For me, the shuttle also became the right kind of side project: small enough to build alone, but real enough to be honest. It had actual users, operational constraints, cost limits, platform decisions, and enough complexity to test whether I could move beyond design handoff and act more like a product builder.</p>
      {"\n"}
      <h2 id="build-1-start-with-a-small-web-mvp">Build 1: Start With A Small Web MVP</h2>
      {"\n"}
      <h3 id="small-web-mvp">Small Web MVP</h3>
      {"\n"}
      <p>At the beginning, I was not trying to build a full native app suite.</p>
      {"\n"}
      <p>
        {"I wanted to make a "}
        <strong>small web MVP</strong>
        {" first: something narrow enough to build quickly, but real enough to test whether route lookup, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>QR check-in</span>
            </span>
          </code>
        </span>
        , admin updates, and notifications could work as one service flow.
      </p>
      {"\n"}
      <h3 id="plan-mode">Plan Mode</h3>
      {"\n"}
      <p>I also did not begin by asking Codex to "build the whole thing."</p>
      {"\n"}
      <p>
        {"The first discipline was to "}
        <strong>make the work small enough to verify</strong>
        . Before implementation, I used Codex to shape the plan: who the service was for, which flows mattered in the first version, which parts were intentionally out of scope, what data needed to exist, and what signal would prove that each step worked.
      </p>
      {"\n"}
      <p>That planning mattered more than any single prompt. I wanted each task to have a clear input, output, and check:</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>Define the smallest useful flow.</li>
        {"\n"}
        <li>
          {"Turn that flow into an "}
          <span data-rehype-pretty-code-figure="">
            <code data-language="plaintext" data-theme="github-dark-default">
              <span data-line="">
                <span>API contract</span>
              </span>
            </code>
          </span>
          .
        </li>
        {"\n"}
        <li>Build one route or screen at a time.</li>
        {"\n"}
        <li>Run it locally.</li>
        {"\n"}
        <li>Check the screen, console, and network request.</li>
        {"\n"}
        <li>Reduce any failure into the next small task.</li>
        {"\n"}
      </ul>
      {"\n"}
      <p>
        {"The fastest way to run the first small SDLC cycle was to start on the web. I used "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Next.js</span>
            </span>
          </code>
        </span>
        {" for the web and API routes, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Neon Postgres</span>
            </span>
          </code>
        </span>
        {" for the database, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Prisma</span>
            </span>
          </code>
        </span>
        {" for the data layer, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Vercel</span>
            </span>
          </code>
        </span>
        {" for deployment, and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>LINE LIFF</span>
            </span>
          </code>
        </span>
        {" as the first entry point."}
      </p>
      {"\n"}
      <p>
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>LINE</span>
            </span>
          </code>
        </span>
        {" was not the obvious long-term choice for this user group. In Singapore, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>WhatsApp</span>
            </span>
          </code>
        </span>
        {" is more common. Among Korean users, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>KakaoTalk</span>
            </span>
          </code>
        </span>
        {" is much more familiar. But for the first version, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>LINE LIFF</span>
            </span>
          </code>
        </span>
        {" gave me a practical way to connect login, user context, web entry, QR check-in, links, and messaging without asking people to install a full app on day one."}
      </p>
      {"\n"}
      <p>
        {"That mattered because this was not a commercial project with a large operating budget. I wanted the service to stay "}
        <strong>almost free to run</strong>
        {". "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>LINE Messaging API</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Vercel</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Neon</span>
            </span>
          </code>
        </span>
        , and the rest of the early stack let me validate the idea without turning a church shuttle into a cost problem.
      </p>
      {"\n"}
      <p>
        {"The first working loop was intentionally small. Riders could see routes and stops. "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>QR check-in</span>
            </span>
          </code>
        </span>
        {" created a boarding record. Operators could manage the basic shuttle data. Notifications could connect the flow."}
      </p>
      {"\n"}
      <p>
        {"I treated each feature less like a big milestone and more like a "}
        <strong>closed verification loop</strong>
        . A route lookup was not done when the UI existed; it was done when the route data came from the API, appeared correctly on the screen, and failed in an understandable way. QR check-in was not done when the scanner opened; it was done when the boarding record reached the database and the result screen had the right context.
      </p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2026-rider-driver-codex/01-liff-rider-flow.webp",
      "width": 1400,
      "height": 746,
      "alt": "Singapore Korean Church Shuttle Platform — The first web MVP kept the Rider flow intentionally small: route lookup, stop detail, QR check-in, and basic operational updates. 1"
    }]} columns={1} caption={<>The first web MVP kept the Rider flow intentionally small: route lookup, stop detail, QR check-in, and basic operational updates.</>} fullWidth={true} />
      {"\n"}
      <h3 id="swagger-as-blueprint">Swagger As Blueprint</h3>
      {"\n"}
      <p>
        {"The important artifact at this stage was not just the UI. It was the "}
        <strong>API contract</strong>
        .
      </p>
      {"\n"}
      <p>
        {"Once "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>routes</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>stops</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>users</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>check-ins</span>
            </span>
          </code>
        </span>
        {", and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>notifications</span>
            </span>
          </code>
        </span>
        {" were expressed as API behavior, the product became easier to move across surfaces. The web app was no longer only an early interface. It became a "}
        <strong>working blueprint</strong>
        .
      </p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2026-rider-driver-codex/02-swagger-api-contract.png",
      "width": 700,
      "height": 394,
      "alt": "Singapore Korean Church Shuttle Platform — Swagger became the shared contract for routes, stops, users, check-ins, notifications, and the clients that would later consume them. 1"
    }]} columns={1} caption={<>Swagger became the shared contract for routes, stops, users, check-ins, notifications, and the clients that would later consume them.</>} fullWidth={true} />
      {"\n"}
      <p>
        {"This is where Codex started to feel especially useful. I was not asking it to invent a product from a blank page. I could give it a plan, ask it to break down a small task, implement one route, connect one screen, run one check, and then move to the next piece. The work became less like "}
        <strong>one giant prompt</strong>
        {" and more like a "}
        <strong>steady product-building rhythm</strong>
        .
      </p>
      {"\n"}
      <strong>Ask for a small step. Run it. Inspect the signal. Reduce the failure. Ask again.</strong>
      {"\n"}
      <p>That rhythm was slower than a fantasy version of AI coding, but it was much more reliable.</p>
      {"\n"}
      <h2 id="feedback-1-the-flow-worked-the-channel-did-not">Feedback 1: The Flow Worked, The Channel Did Not</h2>
      {"\n"}
      <p>
        {"The web version did what I needed it to do. It proved that the "}
        <strong>product flow made sense</strong>
        .
      </p>
      {"\n"}
      <p>
        {"It also gave me something more useful than a static spec. The web app carried the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>information architecture</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>API behavior</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>state transitions</span>
            </span>
          </code>
        </span>
        {", and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>edge cases</span>
            </span>
          </code>
        </span>
        {". It became the first working version of the product system, "}
        <strong>not just a clickable idea</strong>
        .
      </p>
      {"\n"}
      <p>But it also surfaced the problem I had expected.</p>
      {"\n"}
      <p>When I showed it to people, the service felt useful, but the channel questions came up quickly: "Is there a KakaoTalk version?" "Can this work through WhatsApp?" "Is there just an app I can open?" A service trapped inside one messenger was not the most natural form.</p>
      {"\n"}
      <p>
        {"The first delivery had validated the product flow, but it also confirmed the next problem: "}
        <strong>access and platform fit</strong>
        .
      </p>
      {"\n"}
      <h2 id="build-2-translate-the-rider-experience-to-native">Build 2: Translate The Rider Experience To Native</h2>
      {"\n"}
      <p>
        {"So I moved the Rider experience into native "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>iOS</span>
            </span>
          </code>
        </span>
        {" and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Android</span>
            </span>
          </code>
        </span>
        {" apps."}
      </p>
      {"\n"}
      <p>
        {"This was not just a cosmetic upgrade. The web MVP had already proved the core flow: login, route lookup, stop detail, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>QR check-in</span>
            </span>
          </code>
        </span>
        , admin updates, API responses, and basic error handling. That made it a practical blueprint for the apps, but not something I wanted to copy screen by screen.
      </p>
      {"\n"}
      <p>
        {"This also mattered to me as a designer. I had wanted to test new native design languages more seriously, but it is hard to find a real playground for them. Apple's "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Liquid Glass</span>
            </span>
          </code>
        </span>
        {" direction and Android's "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Material 3 Expressive</span>
            </span>
          </code>
        </span>
        {" are easy to admire in demos; they are much harder to understand inside an actual product flow with maps, permissions, motion, errors, and repeat use."}
      </p>
      {"\n"}
      <p>
        {"The real work was "}
        <strong>platform translation</strong>
        . I wanted those design languages to become product language, not decoration. So the question became: how should the same shuttle model behave if it truly belonged on each platform?
      </p>
      {"\n"}
      <p>
        {"So I went back to "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Plan Mode</span>
            </span>
          </code>
        </span>
        {" before building each client. I asked Codex to help break down platform decisions: when to request push permission, how deep links should recover from failure, how route and stop information should sit on top of the map, and which native components should carry lists, cards, bottom sheets, toasts, and empty states."}
      </p>
      {"\n"}
      <p>
        {"For "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>iOS</span>
            </span>
          </code>
        </span>
        {", I used "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>SwiftUI</span>
            </span>
          </code>
        </span>
        {", the "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Google Maps SDK</span>
            </span>
          </code>
        </span>
        , push notifications, and deep links. The experience leaned into a map-first structure, with floating sheets and glass-like surfaces layered over the route context so riders could move between route browsing, stop detail, and check-in without leaving the map.
      </p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2026-rider-driver-codex/03-ios-rider-app.png",
      "width": 700,
      "height": 495,
      "alt": "Singapore Korean Church Shuttle Platform — The iOS Rider app translated the validated web flow into SwiftUI, Google Maps SDK, push, deep links, and Liquid Glass-inspired native screens. 1"
    }]} columns={1} caption={<>The iOS Rider app translated the validated web flow into SwiftUI, Google Maps SDK, push, deep links, and Liquid Glass-inspired native screens.</>} fullWidth={true} />
      {"\n"}
      <p>
        {"For "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Android</span>
            </span>
          </code>
        </span>
        {", I used "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Kotlin</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Jetpack Compose</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Material 3 Expressive</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Google Maps Compose</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Firebase</span>
            </span>
          </code>
        </span>
        {", and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>FCM</span>
            </span>
          </code>
        </span>
        . The Android version kept the same functional model, but reorganized it around Android patterns: top app bars, search, bottom navigation, Compose surfaces, and a small test of Material's more expressive motion and interactions.
      </p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2026-rider-driver-codex/04-android-rider-app.png",
      "width": 700,
      "height": 483,
      "alt": "Singapore Korean Church Shuttle Platform — The Android Rider app kept the same product flow while rebuilding it with Jetpack Compose, Material 3 Expressive, Google Maps Compose, Firebase, and FCM. 1"
    }]} columns={1} caption={<>The Android Rider app kept the same product flow while rebuilding it with Jetpack Compose, Material 3 Expressive, Google Maps Compose, Firebase, and FCM.</>} fullWidth={true} />
      {"\n"}
      <h3 id="real-device-validation">Real Device Validation</h3>
      {"\n"}
      <p>
        {"This step taught me something I now trust more deeply: "}
        <strong>a working web product can be more useful than a static spec when building with Codex</strong>
        .
      </p>
      {"\n"}
      <p>
        {"When I moved into "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>iOS</span>
            </span>
          </code>
        </span>
        {" and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Android</span>
            </span>
          </code>
        </span>
        {", I was not asking Codex to guess what the product should be. I was asking it to "}
        <strong>translate a system that already worked</strong>
        .
      </p>
      {"\n"}
      <p>That changed the quality of the collaboration.</p>
      {"\n"}
      <p>The Rider apps also made the product easier to show and test. The service no longer felt like a web flow hidden inside a messenger. It felt like something riders could install, open, and return to when they needed shuttle information.</p>
      {"\n"}
      <MediaEmbed src={"https://www.youtube.com/embed/mBSo7rGlFjo"} title={"A quick look at the Rider and Driver app experience I built for the shuttle platform."} caption={<>A quick look at the Rider and Driver app experience I built for the shuttle platform.</>} fullWidth={true} />
      {"\n"}
      <p>That was exactly why the next gap became easier to see.</p>
      {"\n"}
      <h2 id="feedback-2-the-rider-app-could-not-create-every-signal">Feedback 2: The Rider App Could Not Create Every Signal</h2>
      {"\n"}
      <p>
        {"Once route lookup and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>QR check-in</span>
            </span>
          </code>
        </span>
        {" worked as an app experience, I started looking at check-in data not only as a boarding record but also as a possible "}
        <strong>arrival signal</strong>
        . If someone scanned a QR code at a stop, the shuttle must have reached that stop. In theory, that event could help other riders understand where the bus was.
      </p>
      {"\n"}
      <p>The idea was reasonable, but it was still too dependent on riders creating the event.</p>
      {"\n"}
      <p>A church member who had helped with shuttle operations for a long time pointed out the missing case.</p>
      {"\n"}
      <p>
        {"On some weekends, especially during holidays or school breaks, ridership changes a lot. Some stops may have no riders at all. "}
        <strong>A stop with no rider creates no QR check-in. No QR check-in means no event.</strong>
        {" And if the system receives no event, the Rider app cannot confidently say whether the shuttle passed that stop."}
      </p>
      {"\n"}
      <p>
        {"That was the moment the "}
        <strong>product model changed</strong>
        .
      </p>
      {"\n"}
      <p>
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>QR check-in</span>
            </span>
          </code>
        </span>
        {" was useful as a "}
        <strong>boarding signal</strong>
        {". It was not enough as an "}
        <strong>arrival signal</strong>
        .
      </p>
      {"\n"}
      <p>
        {"So the question shifted from "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>How do we make riders check in?</span>
            </span>
          </code>
        </span>
        {" to "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>How does the shuttle itself become the trusted signal source?</span>
            </span>
          </code>
        </span>
      </p>
      {"\n"}
      <h2 id="build-3-make-the-shuttle-the-source-of-truth">Build 3: Make The Shuttle The Source Of Truth</h2>
      {"\n"}
      <p>
        {"The answer was a separate "}
        <strong>Driver app</strong>
        . I did not want Rider apps to carry unnecessary background location responsibility, and I did not want the operation to depend on riders creating every event. The shuttle itself needed to publish the signal.
      </p>
      {"\n"}
      <p>
        {"That changed the product from a Rider app into a "}
        <strong>Rider-Driver platform</strong>
        {". The "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Driver app</span>
            </span>
          </code>
        </span>
        {" sends location and route status. The "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>server</span>
            </span>
          </code>
        </span>
        {" updates the active run. The "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Rider app</span>
            </span>
          </code>
        </span>
        {" reflects that movement through maps, stop status, and notifications. "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>QR check-in</span>
            </span>
          </code>
        </span>
        {" still records actual boarding, but it no longer has to pretend to be the only source of truth."}
      </p>
      {"\n"}
      <p>On the surface, this sounds like moving a bus marker on a map. In reality, it meant designing one connected platform experience across the Driver app, server, and Rider app. Location upload, route state, stop progression, Rider map updates, and notification timing all had to agree.</p>
      {"\n"}
      <h2 id="work-mode-keeping-the-build-loop-alive-from-a-hospital-room">Work Mode: Keeping The Build Loop Alive From A Hospital Room</h2>
      {"\n"}
      <p>That would have been a complicated enough iteration from my usual desk. But this was also the moment when life made the work stranger.</p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2026-rider-driver-codex/21-codex-mobile-remote-setup-composite.png",
      "width": 2454,
      "height": 2556,
      "alt": "Singapore Korean Church Shuttle Platform — From Korea, I used Codex mobile to control the project running on my Mac mini in Singapore and continue the Driver app work inside the real repository. 1"
    }]} columns={1} caption={<>From Korea, I used Codex mobile to control the project running on my Mac mini in Singapore and continue the Driver app work inside the real repository.</>} fullWidth={true} />
      {"\n"}
      <p>
        {"I was in Korea, spending long hours in a hospital room while helping care for my father. My development environment was still on a "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>Mac mini</span>
            </span>
          </code>
        </span>
        {" in Singapore, about 4,700 km away. Normally, I would keep the Rider app, Driver app, server logs, simulators, and browser windows open side by side. In the hospital room, I mostly had my phone."}
      </p>
      {"\n"}
      <p>The situation was not planned as a mobile coding experiment. The problem simply arrived at an inconvenient time, and the product did not feel like it should wait.</p>
      {"\n"}
      <p>
        {"So "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>ChatGPT mobile</span>
            </span>
          </code>
        </span>
        {" became my control room. The phone was not the development machine. Codex worked in the remote Mac mini environment, inside the actual repository. I reviewed progress from my phone, spoke tasks into the mobile app, checked summaries and screenshots, and kept the product loop moving from the hospital room."}
      </p>
      {"\n"}
      <MediaEmbed src={"https://www.youtube.com/embed/tk9qrk5G4RQ"} title={"OpenAI's Codex mobile preview gives context for the mobile workflow I used during this phase."} caption={<>OpenAI's Codex mobile preview gives context for the mobile workflow I used during this phase.</>} fullWidth={true} />
      {"\n"}
      <p>
        {"What surprised me was that "}
        <strong>typing code was not the hard part</strong>
        . I barely needed to type. I could speak the task, and Codex could turn that spoken intent into a task list, file reads, code changes, logs, and verification steps because it already had the repository context. It felt less like explaining an idea to a stranger and more like handing work to a teammate who was already looking at the same repo.
      </p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2026-rider-driver-codex/22-voice-driven-codex-workflow-composite.png",
      "width": 3729,
      "height": 2556,
      "alt": "Singapore Korean Church Shuttle Platform — Voice input worked because Codex already had repository context: a spoken task could become a thread, a work plan, and concrete code changes. 1"
    }]} columns={1} caption={<>Voice input worked because Codex already had repository context: a spoken task could become a thread, a work plan, and concrete code changes.</>} fullWidth={true} />
      {"\n"}
      <p>
        {"The harder part was the "}
        <strong>feedback loop</strong>
        .
      </p>
      {"\n"}
      <p>On desktop, I can build, inspect, compare, and respond quickly. On mobile, I could not comfortably keep multiple apps, simulator windows, logs, and screenshots in front of me. That forced the workflow to change. I had to ask Codex not only to implement, but also to read logs, summarize what failed, propose the next smallest fix, and verify the result before moving forward.</p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2026-rider-driver-codex/23-driver-test-loop-composite.png",
      "width": 2454,
      "height": 2556,
      "alt": "Singapore Korean Church Shuttle Platform — The mobile workflow worked when each task had visible success criteria, a summarized failure, and a clear next smallest fix. 1"
    }]} columns={1} caption={<>The mobile workflow worked when each task had visible success criteria, a summarized failure, and a clear next smallest fix.</>} fullWidth={true} />
      {"\n"}
      <p>This is where the Driver app and the mobile workflow started shaping each other.</p>
      {"\n"}
      <p>
        {"The verification problem became a product problem. I could not wait for a real shuttle ride every time I needed to test the flow, so the Driver app needed a "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>test-drive mode</span>
            </span>
          </code>
        </span>
        . Codex first suggested this as a way to repeatedly simulate a run, and the idea quickly became essential. The first version was unstable, but that instability was useful: it showed exactly where the location upload, Rider map reflection, and stop status logic needed to improve.
      </p>
      {"\n"}
      <MediaEmbed src={"https://www.youtube.com/embed/62qP1I400eM"} title={"An early Driver app test run showed how simulated movement could help verify background location, server sync, and Rider map updates."} caption={<>An early Driver app test run showed how simulated movement could help verify background location, server sync, and Rider map updates.</>} fullWidth={true} />
      {"\n"}
      <MediaEmbed src={"https://www.youtube.com/embed/T9Ubj9hZ1_M"} title={"The final Driver app flow made arrival tracking a dedicated driver-side responsibility instead of depending on rider check-ins."} caption={<>The final Driver app flow made arrival tracking a dedicated driver-side responsibility instead of depending on rider check-ins.</>} fullWidth={true} />
      {"\n"}
      <p>
        {"This is the part of the project I am most proud of. Not because the UI became more polished, but because "}
        <strong>the product became more honest</strong>
        . I found a structural gap and changed the architecture around it.
      </p>
      {"\n"}
      <p>
        {"The lesson was not "}
        <del>"now I can code from a phone."</del>
      </p>
      {"\n"}
      <p>
        {"It was that "}
        <strong>a product builder can keep momentum in imperfect conditions</strong>
        {" if the work is broken down clearly enough and the validation loop is visible enough. Codex mobile did not replace the desk; it helped me keep the product loop alive when I could not sit at one."}
      </p>
      {"\n"}
      <h2 id="builder-takeaway-owning-more-of-the-sdlc">Builder Takeaway: Owning More Of The SDLC</h2>
      {"\n"}
      <p>This project was never about asking AI to build an app for me.</p>
      {"\n"}
      <p>
        {"Codex helped across almost every stage: "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>planning</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>API contracts</span>
            </span>
          </code>
        </span>
        , server routes, client implementation, debugging, logs, platform work, and release preparation.
      </p>
      {"\n"}
      <p>
        {"But the "}
        <strong>product judgment stayed with me</strong>
        .
      </p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2026-rider-driver-codex/16-driver-app-final.jpeg",
      "width": 700,
      "height": 394,
      "alt": "Singapore Korean Church Shuttle Platform — The screen got smaller, but the workflow did not: Driver app work, validation, and launch preparation continued through a mobile-controlled Codex loop. 1"
    }]} columns={1} caption={<>The screen got smaller, but the workflow did not: Driver app work, validation, and launch preparation continued through a mobile-controlled Codex loop.</>} fullWidth={true} />
      {"\n"}
      <p>I still had to decide what problem mattered, what could wait, which platform choice was practical, whether the current hypothesis was wrong, and what signal would prove the next step. Codex made the scope reachable, but it did not remove the need to think like a product builder.</p>
      {"\n"}
      <p>
        {"That was the difference between using Codex for code generation and using it to "}
        <strong>own more of the SDLC while keeping product judgment in my hands</strong>
        .
      </p>
      {"\n"}
      <p>
        {"The most useful habit was turning vague failure into a "}
        <strong>smaller sentence</strong>
        {". Not "}
        <del>"the app is broken,"</del>
        {" but "}
        <strong>"the QR scanner opens but the check-in result screen does not receive the route ID."</strong>
        {" Once the failure became small enough, Codex became much more effective."}
      </p>
      {"\n"}
      <p>
        {"By the end, the project had grown into a real "}
        <strong>multi-surface system</strong>
        {": "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>server</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>database</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>web/admin</span>
            </span>
          </code>
        </span>
        {", native Rider apps, native Driver apps, "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>maps</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>QR check-in</span>
            </span>
          </code>
        </span>
        , location updates, notifications, analytics, crash reporting, store preparation, and a promotional video.
      </p>
      {"\n"}
      <AppDownloads apps={[{
      id: "nasum-rider",
      imageTheme: "dark",
      images: [{
        src: "/images/projects/2026-rider-driver-codex/app-store/rider-1.jpg",
        alt: "NaSum rider app — App Store home screen"
      }, {
        src: "/images/projects/2026-rider-driver-codex/app-store/rider-2.jpg",
        alt: "NaSum rider app — App Store route screen"
      }],
      title: "Rider app",
      appName: "NaSum Shuttle Check-In",
      description: "Look up routes, check in with QR, and get stop updates.",
      urls: ["https://apps.apple.com/sg/app/nasum-shuttle-check-in/id6765994152", "https://play.google.com/store/apps/details?id=sg.nasumchurch.shuttle"]
    }, {
      id: "nasum-driver",
      imageTheme: "light",
      images: [{
        src: "/images/projects/2026-rider-driver-codex/app-store/driver-1.jpg",
        alt: "NaSum driver app — App Store home screen"
      }, {
        src: "/images/projects/2026-rider-driver-codex/app-store/driver-2.jpg",
        alt: "NaSum driver app — App Store route screen"
      }],
      title: "Driver app",
      appName: "NaSum Shuttle Driver",
      description: "Manage shuttle operations as an authorized driver or operator.",
      urls: ["https://apps.apple.com/sg/app/nasum-shuttle-driver/id6773782572", "https://play.google.com/store/apps/details?id=sg.nasumchurch.shuttle.driver&pli=1"]
    }]} />
      {"\n"}
      <p>That is the part I want this project to show: I can design the experience, understand the system underneath it, and keep moving until the product is real enough to test, ship, and explain.</p>
      {"\n"}
      <h2 id="reflection-what-stayed-with-me">Reflection: What Stayed With Me</h2>
      {"\n"}
      <p>
        {"This project changed my sense of what a "}
        <strong>product designer can practice</strong>
        .
      </p>
      {"\n"}
      <p>
        {"I still do not think every designer needs to become a traditional full-stack engineer. That is not the point. The point is that AI makes it more realistic for a technically curious designer to "}
        <strong>own more of the SDLC without pretending to be a full-time engineer</strong>
        : from problem framing to system modeling, implementation, release, and launch storytelling.
      </p>
      {"\n"}
      <p>
        {"But owning more of the SDLC requires "}
        <strong>more than prompting</strong>
        .
      </p>
      {"\n"}
      <p>
        {"It requires knowing how a product problem becomes a "}
        <strong>system model</strong>
        {". It requires understanding "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>API contracts</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>data flows</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>platform constraints</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>real-device behavior</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>store requirements</span>
            </span>
          </code>
        </span>
        {", "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>analytics signals</span>
            </span>
          </code>
        </span>
        {", and "}
        <span data-rehype-pretty-code-figure="">
          <code data-language="plaintext" data-theme="github-dark-default">
            <span data-line="">
              <span>crash logs</span>
            </span>
          </code>
        </span>
        {" well enough to ask better questions."}
      </p>
      {"\n"}
      <p>
        {"Most of all, it requires "}
        <strong>product judgment</strong>
        .
      </p>
      {"\n"}
      <p>Codex expanded my reach, but it did not decide what mattered. It did not tell me that a messenger-based web app was useful for validation but not enough for long-term access. It did not feel the missing event at empty stops until the real operation revealed it. It did not care whether the launch story was understandable to riders.</p>
      {"\n"}
      <p>
        {"Those were "}
        <strong>product decisions</strong>
        .
      </p>
      {"\n"}
      <p>
        {"What Codex changed was the "}
        <strong>distance between deciding and trying</strong>
        . That distance used to feel long enough that many ideas stopped at a screen, a prototype, or a handoff. In this project, it became short enough for me to keep moving: from a weekend shuttle problem, to a web flow, to native Rider apps, to a Driver app, to store preparation, to a promotional video.
      </p>
      {"\n"}
      <p>This was a side project, but it felt like a shift in how I want to build.</p>
      {"\n"}
      <p>Not just designing the ideal flow. Not just handing off screens. Not just asking AI to generate code.</p>
      {"\n"}
      <strong>Finding a real problem, making the first useful version, seeing where the model breaks, and moving quickly enough to make the product truer.</strong>
      {"\n"}
      <p>
        {"That is how far I wanted to see if I could go with Codex. "}
        <strong>Now I know I can go further than I expected.</strong>
      </p>
      {"\n"}
      <h2 id="references">References</h2>
      {"\n"}
      <ul>
        {"\n"}
        <li>
          {"NaSum Church: "}
          <ContentLink href="http://www.nasumchurch.sg">Korean Presbyterian Church in Singapore</ContentLink>
        </li>
        {"\n"}
        <li>
          {"Original Korean post: "}
          <ContentLink href="https://dusskapark.medium.com/%ED%94%84%EB%A1%9C%EB%8D%95%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B4%EB%84%88%EB%8A%94-codex%EB%A1%9C-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C-d725a9be4d3e">Product designer with Codex</ContentLink>
        </li>
        {"\n"}
        <li>
          {"Original Korean post: "}
          <ContentLink href="https://dusskapark.medium.com/codex-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%9E%85%EC%BD%94%EB%94%A9%EB%A7%8C%EC%9C%BC%EB%A1%9C-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C-e6a068bb4218">Mobile voice coding with Codex</ContentLink>
        </li>
        {"\n"}
        <li>
          {"Planning sample: "}
          <ContentLink href="https://gist.github.com/dusskapark/c56f110aa513bf0ade4bc326d5228c10">Gist</ContentLink>
        </li>
        {"\n"}
      </ul>
    </>;
}
