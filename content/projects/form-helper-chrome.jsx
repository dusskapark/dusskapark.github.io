import { MediaEmbed, QuoteCard, Timeline, TimelineItem } from "@/components/content";
import { ContentImage, ContentLink } from "@/components/content/content-elements";

export const frontmatter = {"kind":"project","slug":"form-helper-chrome","title":"FORM HELPER powered by Chrome's built-in AI","description":"form-helper-chrome transforms form error handling with Chrome’s Built-in AI, delivering instant, personalized solutions that enhance user experience and streamline data entry","date":"2024-11-05","lang":"en","listed":true,"hero":"/images/projects/2024-form-helper-chrome/hero.png","legacyPaths":["/project/form-helper-chrome.html","/project/form-helper-chrome/"],"titleLines":["FORM HELPER","powered by Chrome's built-in AI"],"subtitle":"Hackathon project (2024)","team":"JooHyung(Lead)","role":"Product Lead","galleryImages":["/images/projects/2024-form-helper-chrome/hero.png"],"sourceFile":"_projects/2024-11-05-form-helper-chrome.md","headings":[{"depth":2,"text":"Project Overview","id":"project-overview"},{"depth":2,"text":"Situation","id":"situation"},{"depth":2,"text":"Task","id":"task"},{"depth":2,"text":"Action","id":"action"},{"depth":3,"text":"Research on Personalized AI Feedback","id":"research-on-personalized-ai-feedback"},{"depth":4,"text":"Form Error Message Analysis","id":"form-error-message-analysis"},{"depth":4,"text":"AI as a Potential Solution","id":"ai-as-a-potential-solution"},{"depth":3,"text":"Building a Zero-Cost AI Solution","id":"building-a-zero-cost-ai-solution"},{"depth":4,"text":"Chrome's Built-in AI Discovery","id":"chromes-built-in-ai-discovery"},{"depth":4,"text":"Building with Chrome's Built-in AI","id":"building-with-chromes-built-in-ai"},{"depth":4,"text":"Streamlining Developer Experience","id":"streamlining-developer-experience"},{"depth":2,"text":"Result","id":"result"},{"depth":3,"text":"Published as Open Source","id":"published-as-open-source"},{"depth":3,"text":"Chrome Built-in AI Challenge","id":"chrome-built-in-ai-challenge"},{"depth":2,"text":"Conclusion","id":"conclusion"}]};

export default function FormHelperChromeContent() {
  return <>
      <h2 id="project-overview">Project Overview</h2>
      {"\n"}
      <p>
        {"Form Helper Chrome is an innovative project developed to enhance user experience in web form interactions. Created as part of the "}
        <ContentLink href="https://googlechromeai.devpost.com">Google Chrome Built-in AI Challenge</ContentLink>
        , this project aims to provide real-time, personalized solutions for form errors using Chrome's built-in AI capabilities. The core objective is to reduce user frustration and improve data entry efficiency by offering intuitive, contextual guidance.
      </p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2024-form-helper-chrome/demo.gif" alt="Form Helper demo: as a user fills in a web form, Chrome's built-in AI shows tailored guidance next to fields with errors" />
      </p>
      {"\n"}
      <h2 id="situation">Situation</h2>
      {"\n"}
      <p>Form errors have been a persistent challenge in web development for decades. Despite the availability of guidelines and frameworks like Google's Material Design and Ant Design, users continue to struggle with filling out forms correctly. This leads to increased frustration and support calls. As a product designer, I saw the need for a more intuitive solution that could provide real-time guidance, reducing errors and enhancing the overall user experience.</p>
      {"\n"}
      <QuoteCard image={"/images/projects/2024-form-helper-chrome/1-Reference-1.png"} imageWidth={568} imageHeight={368} text={<>
          <mark className="content-highlight content-highlight-lg">{"\"Why is it so hard to get users to fill things in right? Guides go unread, red errors get ignored, and support calls\ngo up. Do we need to hold their hand?\""}</mark>
          {" "}
          <br />
          <br />
          {" If you're a designer, you've probably thought this too, right? 😅"}
        </>} backgroundColor={"#E2E0F9"} fontColor={"#3d3d3d"} fullWidth={true} />
      {"\n"}
      <br />
      {"\n"}
      <br />
      {"\n"}
      <h2 id="task">Task</h2>
      {"\n"}
      <p>The primary task was to create a seamless user experience for form completion by leveraging AI technology. Key objectives included:</p>
      {"\n"}
      <QuoteCard image={"/images/projects/2024-form-helper-chrome/task1-1.png"} imageWidth={1024} imageHeight={1024} text={<>
          <mark className="content-highlight content-highlight-lg">Personalized AI Feedback</mark>
          <br />
          <br />
          {" Develop an AI assistant that accurately understands the user's "}
          <strong>current context and provides tailored guidance</strong>
          {" for their specific form-filling situation."}
        </>} backgroundColor={"#9ED5F2"} fontColor={"#555"} fullWidth={false} />
      {"\n"}
      <br />
      {"\n"}
      <QuoteCard image={"/images/projects/2024-form-helper-chrome/task2-2.png"} imageWidth={1024} imageHeight={1024} text={<>
          <mark className="content-highlight content-highlight-lg">Cost-Effective Solution</mark>
          <br />
          <br />
          {" Design a solution that eliminates both implementation costs (no server setup, easy integration) and operational costs (no API fees, minimal maintenance) while providing instant AI assistance."}
        </>} backgroundColor={"#78FCE6"} fontColor={"#555"} fullWidth={false} />
      {"\n"}
      <br />
      {"\n"}
      <p>With these objectives in mind, I aimed to create an intuitive, accessible solution that would transform frustrating form interactions into smooth experiences through AI-powered assistance. To achieve this, I began with thorough research and prototyping.</p>
      {"\n"}
      <h2 id="action">Action</h2>
      {"\n"}
      <h3 id="research-on-personalized-ai-feedback">Research on Personalized AI Feedback</h3>
      {"\n"}
      <p>I conducted research to understand how AI could provide more personalized and effective form guidance. This investigation focused on the potential of AI to transform static error messages into dynamic, context-aware assistance.</p>
      {"\n"}
      <Timeline align={"left"}>
        <TimelineItem date={"Step 1: Current State Analysis"}>
          <h4 id="form-error-message-analysis">Form Error Message Analysis</h4>
          <ul>
            {"\n"}
            <li>Extracted and analyzed error messages and helper texts from my product's forms</li>
            {"\n"}
            <li>Reviewed guide page access patterns through analytics data</li>
            {"\n"}
            <li>Tracked user interaction with help documentation</li>
            {"\n"}
          </ul>
          <p>
            <ContentImage src="/images/projects/2024-form-helper-chrome/1-error-message-limitations.png" alt="Current Error Message Analysis" />
          </p>
          <p>Key Finding: Due to limited error text length and format (text-only), users often face difficulties understanding the issues. While separate documentation is provided as a solution, data shows that users rarely rely on these lengthy guides.</p>
        </TimelineItem>
        <TimelineItem date={"Step 2: Solution Exploration"}>
          <h4 id="ai-as-a-potential-solution">AI as a Potential Solution</h4>
          <p>Based on the analysis, I identified that an AI-powered solution could address these limitations by:</p>
          <ul>
            {"\n"}
            <li>Summarizing relevant documentation based on the specific error context</li>
            {"\n"}
            <li>Providing clearer explanations in a more flexible format</li>
            {"\n"}
            <li>Delivering personalized guidance at the moment of error</li>
            {"\n"}
          </ul>
          <p>This exploration led to a clear hypothesis: Instead of static text messages, if we could present just the right information in a more comprehensive format using AI, we could better solve these form completion challenges.</p>
        </TimelineItem>
      </Timeline>
      {"\n"}
      <h3 id="building-a-zero-cost-ai-solution">Building a Zero-Cost AI Solution</h3>
      {"\n"}
      <Timeline align={"left"}>
        <TimelineItem date={"Step 1: Finding Inspiration"}>
          <h4 id="chromes-built-in-ai-discovery">Chrome's Built-in AI Discovery</h4>
          <p>While watching Google I/O, I was particularly intrigued by Chrome's announcement of built-in AI capabilities. The presentation showcased how Gemini Nano would be integrated directly into the browser, enabling AI features without external dependencies.</p>
          <MediaEmbed src={"https://www.youtube.com/embed/D7dA5KY5FEo?si=jNPCAH3xagijfo6f"} title={"FORM HELPER powered by Chrome's built-in AI — video 1"} aspectRatio={"560 / 315"} />
          <br />
          <br />
          <p>This revelation sparked my interest - it seemed to perfectly address the challenges I was facing with form assistance implementation.</p>
        </TimelineItem>
        <TimelineItem date={"Step 2: Technical Implementation"}>
          <h4 id="building-with-chromes-built-in-ai">Building with Chrome's Built-in AI</h4>
          <p>
            {"After joining the "}
            <ContentLink href="http://goo.gle/chrome-ai-dev-preview-join">Chrome AI early preview program</ContentLink>
            , I discovered the potential of the Prompt API. I designed a system that processes error messages, form data, and documentation to generate contextual assistance:
          </p>
          <p>
            <ContentImage src="/images/projects/2024-form-helper-chrome/2-Tech-1.gif" alt="Data Sources for AI Response" />
          </p>
          <p>The successful integration of these elements through the Prompt API proved that intelligent, context-aware form assistance was not just possible, but highly effective.</p>
        </TimelineItem>
        <TimelineItem date={"Step 3: Integration Design"}>
          <h4 id="streamlining-developer-experience">Streamlining Developer Experience</h4>
          <p>To make the solution easily adoptable, I focused on creating flexible integration options:</p>
          <ul>
            {"\n"}
            <li>Simple component-based implementation</li>
            {"\n"}
            <li>Customizable UI themes (dark/light modes)</li>
            {"\n"}
            <li>Configurable styling options</li>
            {"\n"}
            <li>Easy error state integration</li>
            {"\n"}
          </ul>
          <MediaEmbed src={"https://www.youtube.com/embed/MeugkhYE848?si=vqZbIWw6XA--RAjR"} title={"FORM HELPER powered by Chrome's built-in AI — video 2"} aspectRatio={"560 / 315"} />
          <br />
          <br />
          <p>The video above demonstrates how developers can quickly implement and customize the AI-powered form assistance while maintaining their application's design consistency, furthering our goal of a zero-cost solution.</p>
        </TimelineItem>
      </Timeline>
      {"\n"}
      <h2 id="result">Result</h2>
      {"\n"}
      <p>This project evolved from a concept into two significant achievements - a practical open-source solution and an entry in Google's prestigious AI challenge.</p>
      {"\n"}
      <h3 id="published-as-open-source">Published as Open Source</h3>
      {"\n"}
      <p>The project was successfully published as an npm package, making it easily accessible to developers worldwide. The package provides a simple yet powerful way to implement AI-powered form assistance:</p>
      {"\n"}
      <figure data-rehype-pretty-code-figure="">
        <pre tabIndex="0" data-language="bash" data-theme="github-dark-default">
          <code data-language="bash" data-theme="github-dark-default" style={{
          display: "grid"
        }}>
            <span data-line="">
              <span style={{
              color: "#FFA657"
            }}>npm</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" install"}</span>
              <span style={{
              color: "#A5D6FF"
            }}>{" form-helper-chrome"}</span>
            </span>
          </code>
        </pre>
      </figure>
      {"\n"}
      <h3 id="chrome-built-in-ai-challenge">Chrome Built-in AI Challenge</h3>
      {"\n"}
      <p>With confidence in the project's potential, I submitted it to the Chrome Built-in AI Challenge. Through this process, I collaborated with fellow developers who helped identify and fix several edge cases, making the solution more robust.</p>
      {"\n"}
      <QuoteCard image={"https://img.youtube.com/vi/6LOtqprIeGQ/0.jpg"} text={<>
          I submitted this project to the Google Chrome Built-in AI Challenge, a competition focused on creating innovative solutions with Chrome's AI capabilities.
          <br />
          <br />
          <ContentLink href="https://devpost.com/software/form-helper-chrome" style={{
        "display": "inline-flex",
        "alignItems": "center",
        "padding": "10px 20px",
        "backgroundColor": "#4285F4",
        "color": "white",
        "textDecoration": "none",
        "borderRadius": "5px",
        "fontWeight": "bold"
      }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
          "marginRight": "10px"
        }}>
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="white"></path>
            </svg>
            {"Learn More "}
          </ContentLink>
        </>} backgroundColor={"#000"} fontColor={"#fff"} fullWidth={true} />
      {"\n"}
      <br />
      {"\n"}
      <br />
      {"\n"}
      <p>Regardless of the hackathon results, these experiences and connections made the journey worthwhile and provided valuable insights for future AI-powered web development projects.</p>
      {"\n"}
      <h2 id="conclusion">Conclusion</h2>
      {"\n"}
      <p>As a product designer, leading this project from concept to completion has been an incredibly rewarding experience. I successfully transformed a common UX challenge into a practical solution, leveraging cutting-edge AI technology while maintaining a designer's perspective on usability and integration.</p>
      {"\n"}
      <p>The journey from identifying the problem to publishing an open-source solution and participating in Google's Chrome Built-in AI Challenge has validated my belief that designers can also be able to participate in technical innovation. This project demonstrates that with the right approach, we can create solutions that are both technically sophisticated and beautifully simple to use.</p>
      {"\n"}
      <p>Moving forward, I'm excited to continue exploring the intersection of AI and design, finding new ways to enhance user experiences while keeping implementation simple and accessible for developers.</p>
    </>;
}
