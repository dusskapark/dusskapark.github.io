import { AppDownloads, ButtonLink, Gallery, LinkPreview, MediaEmbed, QuoteCard, Timeline, TimelineItem } from "@/components/content";
import { ContentImage, ContentLink } from "@/components/content/content-elements";

export const frontmatter = {"kind":"project","slug":"klever","title":"Klever — A Community-Driven AI Usability Testing Figma Plugin","description":"Klever showcases my journey from concept to creation, developing an AI-powered Figma plugin for usability testing. Community engagement was pivotal in its evolution, with its potential recognized by corporate entities 🎉","date":"2024-06-01","lang":"en","listed":true,"hero":"/images/projects/2024-klever/hero.png","legacyPaths":["/project/klever.html","/project/klever/"],"subtitle":"Figma + AI project (2024)","team":"JooHyung(Lead), DongYeon Lee (Product Designer)","role":"Product Lead","galleryImages":["/images/projects/2024-klever/hero.png"],"sourceFile":"_projects/2024-06-01-klever.md","headings":[{"depth":2,"text":"Introducing Klever","id":"introducing-klever"},{"depth":2,"text":"💡 The Ideation Journey","id":"-the-ideation-journey"},{"depth":3,"text":"Can AI Enhance Design?","id":"can-ai-enhance-design"},{"depth":3,"text":"Meeting AppAgent and the Eureka Moment","id":"meeting-appagent-and-the-eureka-moment"},{"depth":3,"text":"Designer Interviews","id":"designer-interviews"},{"depth":3,"text":"Instant Usability Testing","id":"instant-usability-testing"},{"depth":2,"text":"🛠️ The Development Journey","id":"️-the-development-journey"},{"depth":3,"text":"How AppAgent Works?","id":"how-appagent-works"},{"depth":3,"text":"Generating UI Screenshots & Annotations","id":"generating-ui-screenshots--annotations"},{"depth":3,"text":"Implementing AI Actions in Figma","id":"implementing-ai-actions-in-figma"},{"depth":3,"text":"🎉  Prototyped: AppAgent's Integration with Figma","id":"prototyped-appagents-integration-with-figma"},{"depth":3,"text":"From experiment to product, Klever was born","id":"from-experiment-to-product-klever-was-born"},{"depth":2,"text":"🧠 Interesting Use Cases","id":"-interesting-use-cases"},{"depth":3,"text":"Discovering Hidden Interactions","id":"discovering-hidden-interactions"},{"depth":3,"text":"Identifying UI Element Ambiguity","id":"identifying-ui-element-ambiguity"},{"depth":3,"text":"Predicting Hidden Features","id":"predicting-hidden-features"},{"depth":2,"text":"📈 Impact","id":"-impact"},{"depth":2,"text":"🌱 Growing with Community","id":"-growing-with-community"},{"depth":3,"text":"Meetups: Friends of Figma Seoul & Educators event","id":"meetups-friends-of-figma-seoul--educators-event"},{"depth":3,"text":"Conference: InfCon 2024 Presentation","id":"conference-infcon-2024-presentation"},{"depth":3,"text":"From Side Project to Corporate Innovation","id":"from-side-project-to-corporate-innovation"},{"depth":3,"text":"Challenges & Community Growth","id":"challenges--community-growth"},{"depth":2,"text":"Lessons learned","id":"lessons-learned"}]};

export default function KleverContent() {
  return <>
      <h2 id="introducing-klever">Introducing Klever</h2>
      {"\n"}
      <p>Klever is a Figma plugin that leverages AppAgent's cutting-edge AI technology to provide designers with a seamless and intuitive usability testing experience. With Klever, designers can instantly gain valuable insights and enhance their design process—all within the familiar environment of Figma. Below is a summary of the core features and benefits of Klever.</p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2024-klever/BentoGrid.png",
      "width": 1884,
      "height": 1400,
      "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — Summary of Klever plugin features 1"
    }]} columns={1} caption={<>Summary of Klever plugin features</>} fullWidth={true} />
      {"\n"}
      <p>This project was born out of a desire to address the evolving challenges faced by designers in an AI-driven world. In the following sections, we'll explore the inspiration behind Klever, the journey of its development, and the impactful results it has achieved. Join us as we delve into the story of how Klever came to be and the innovative solutions it offers.</p>
      {"\n"}
      <h2 id="-the-ideation-journey">💡 The Ideation Journey</h2>
      {"\n"}
      <p>
        {"The Mirror of Your Mind (명심보감/明心寶鑑) is a book that encapsulates the wisdom of Eastern philosophy. It teaches that to live a truly human life, one must broaden their learning, maintain a sincere purpose, never lose curiosity, keep questioning, and solve problems step by step. These teachings resonate deeply with us, product designers, living in the 21st-century digital and AI age. After all, it’s crucial to maintain a positive mindset even in "}
        <strong>moments of change</strong>
        .
      </p>
      {"\n"}
      <QuoteCard image={"/images/projects/2024-klever/6_logo_1_2.png"} imageWidth={1792} imageHeight={1024} text={<>
          {"It’s another morning, and as sunlight spills through my window, I fire up my laptop. Slack is buzzing with AI news. Curiosity piqued, I click on a few. Watching these AI design tool demos, a chill runs down my spine — they’re doing what I do. It makes me wonder — "}
          <br />
          <br />
          <mark className="content-highlight content-highlight-lg">“Is AI really going to replace us designers?”</mark>
          {" "}
          <br />
          <br />
          I’m not entirely sure, but all I know is
          <strong>I want to keep doing my best, today and tomorrow.</strong>
        </>} backgroundColor={"#FDF0E0"} fontColor={"#555"} fullWidth={true} />
      {"\n"}
      <br />
      {"\n"}
      <br />
      {"\n"}
      <p>
        {"In a cozy nook of a Starbucks in western Singapore, two Grab designers, "}
        <ContentLink href="https://www.linkedin.com/in/dy-lee/">DY LEE</ContentLink>
        {" and "}
        <ContentLink href="https://www.linkedin.com/in/dusskapark/">Jude Park</ContentLink>
        , kicked off what was just a humble AI side project. It wasn’t about achieving something monumental; it was about confronting the genuine anxieties of diving into AI, maintaining a hopeful perspective, and exploring new avenues for growth in an AI-driven landscape.
      </p>
      {"\n"}
      <Timeline align={"left"}>
        <TimelineItem date={"Jan 2024: The Question"}>
          <h3 id="can-ai-enhance-design">Can AI Enhance Design?</h3>
          <p>As we move through 2024, AI is everywhere, and it’s changing how we work in design. Every day, new AI tools and models are emerging, transforming the way we approach our work. We initially thought AI would take over the boring tasks, freeing us to focus on creativity. However, AI is now involved in everything from generating creative content to designing user interfaces, reshaping our processes obviously.</p>
          <p>In light of these changes, we found ourselves asking:</p>
          <QuoteCard image={"/images/projects/2024-klever/6_design_process_4.png"} imageWidth={1125} imageHeight={614} text={<>
              <mark className="content-highlight content-highlight-lg">How can we embrace the power of AI in our design process?</mark>
              {" "}
              <br />
              <br />
              Beyond just automating tasks, what role can AI play in supporting us as designer assistants?
            </>} backgroundColor={"#000"} fontColor={"#fff"} fullWidth={false} />
          <br />
          <br />
          <p>We didn't find the perfect answer right away, but our exploration led us to a crucial realization: being a product designer is about more than just creating visual designs. It's about identifying challenges, devising solutions, and deeply understanding user needs and behaviors.</p>
          <p>Instead of letting AI dictate our design decisions, we began to explore how we could harness its power to strengthen our insights and gain a deeper understanding of user behavior. This shift in perspective opened up new possibilities, leading us to discover Tencent's research on AppAgent - a finding that felt perfectly timed for our needs.</p>
        </TimelineItem>
        <TimelineItem date={"Feb 2024: The Discovery"}>
          <h3 id="meeting-appagent-and-the-eureka-moment">Meeting AppAgent and the Eureka Moment</h3>
          <LinkPreview url="https://appagent-official.github.io/" />
          <p>Tencent’s research team introduced AppAgent, a multi-modal agent capable of interacting with apps naturally. Using LLM and Android Studio, AppAgent demonstrates how AI can explore apps and use gestures like a human.</p>
          <p>As designers, we found ourselves captivated by AppAgent’s remarkable ability to simulate user behavior. It was as if we were watching real users interact with an app, tapping and swiping their way through the interface. This AI-driven mimicry of human interaction not only sparked our curiosity but also opened our minds to new creative possibilities.</p>
          <QuoteCard image={"https://appagent-official.github.io/static/teaser.png"} text={<>
              {"This led us to ponder an exciting question:\n"}
              <br />
              <br />
              <mark className="content-highlight content-highlight-lg">What new horizons could we explore by integrating AppAgent with our Figma designs?</mark>
            </>} backgroundColor={"#FFF"} fontColor={"#555"} fullWidth={false} />
          <br />
          <br />
          <p>The idea of leveraging AI-generated user flows and behaviors in our UX research was compelling. It promised a more efficient way to address user challenges and conduct iterative testing, allowing us to refine our designs with greater precision.</p>
          <p>To bring this vision to life, we knew we needed insights from our peers. We reached out to fellow designers, eager to gather their perspectives and explore how AppAgent could revolutionize our design process.</p>
        </TimelineItem>
        <TimelineItem date={"Feb 2024: The Validation"}>
          <h3 id="designer-interviews">Designer Interviews</h3>
          <p>{"We wanted to understand how AI & AppAgent could naturally fit into our design process, so we spoke with 10 designers across 7 teams over two weeks. Our goal was to uncover the challenges they face and see where AppAgent might offer solutions."}</p>
          <p>
            <ContentImage src="/images/projects/2024-klever/6_design_process_5.png" alt="Our interview journey: we spoke with 10 designers across 7 teams over two weeks" />
          </p>
          <p>From these interviews, we uncovered three key insights:</p>
          <div className="content-research-insights">
            <div className="content-research-insight">
              <span aria-hidden="true">⏳</span>
              <div>
                <h4>Research is Time-Consuming</h4>
                <p>User research often requires significant time and resources.</p>
              </div>
            </div>
            <div className="content-research-insight">
              <span aria-hidden="true">🤷‍♂️</span>
              <div>
                <h4>Lack of Alternatives</h4>
                <p>Designers struggle to find varied and effective alternatives when testing new concepts.</p>
              </div>
            </div>
            <div className="content-research-insight">
              <span aria-hidden="true">🚀</span>
              <div>
                <h4>Potential for Instant Testing</h4>
                <p>AppAgent could greatly improve the speed and quality of usability testing.</p>
              </div>
            </div>
          </div>
          <p>AI is not a magic wand that solves every problem. The key is understanding how AI can add real value to the design process. Through conversations with designers, we discovered the potential for AppAgent to positively transform the way we design.</p>
        </TimelineItem>
        <TimelineItem date={"Mar 2024: The Vision"}>
          <h3 id="instant-usability-testing">Instant Usability Testing</h3>
          <p>
            {"We decided to set out to create a seamless connection between design and testing with AppAgent. Typically, testing designs requires organizing user sessions and justifying the time and resources involved. Convincing engineers to test different versions can also be a hurdle. However, what designers really want to know is — "}
            <strong>“Is this design delivering a great user experience?”</strong>
          </p>
          <p>By integrating AppAgent with Figma’s prototype screens, we envisioned a tool that could answer those kinds of questions more easily.</p>
          <QuoteCard image={"/images/projects/2024-klever/6_design_process_6.png"} imageWidth={1920} imageHeight={1080} text={<>
              How might we let AI act as real users to help designers get insights without recruiting and interviewing?
              <br />
              <br />
              What if AI could behave like a persona, exploring designs just as a human would?
              <br />
              <br />
              <mark className="content-highlight content-highlight-lg">AI instant usability testing</mark>
              , that's our answer.
            </>} backgroundColor={"#000"} fontColor={"#fff"} fullWidth={false} />
          <br />
          <p>This isn’t just about passing or failing a QA test. It’s about using AI to mimic real user interactions, allowing it to navigate through designs and suggest optimal paths with minimal clicks, or to point out areas that need refinement. AppAgent performs heuristic evaluations on prototypes, delivering clear and actionable insights without requiring lengthy business justifications.</p>
          <p>Our task now is to bring this concept to life.</p>
        </TimelineItem>
      </Timeline>
      {"\n"}
      <h2 id="️-the-development-journey">🛠️ The Development Journey</h2>
      {"\n"}
      <p>Integrating AppAgent with Figma's prototype feature presented several significant technical hurdles. As this started as a small side project by designers, expanding from an Android app to Figma required us to overcome multiple complex challenges.</p>
      {"\n"}
      <Timeline align={"right"}>
        <TimelineItem date={"Mar 2024: Understanding"}>
          <h3 id="how-appagent-works">How AppAgent Works?</h3>
          <p>Our initial challenge was to grasp the fundamental workings of AppAgent. The original AppAgent operates in a cycle of Observation, Thought, and Action, iterating multiple times.</p>
          <Gallery images={[{
          "src": "/images/projects/2024-klever/5_demo_vid_0.png",
          "width": 1970,
          "height": 681,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — The original AppAgent operates: Observation → Thought → Action 1"
        }]} columns={1} caption={<>The original AppAgent operates: Observation → Thought → Action</>} fullWidth={false} />
          <p>AppAgent provides a screenshot with UI annotations and a task to the GPT-4-vision model, which observes, thinks, and suggests the next action. This process repeats, simulating user interaction.</p>
          <p>To adapt this for Figma prototypes, we faced two critical challenges:</p>
          <ul>
            {"\n"}
            <li>
              {"\n"}
              <strong>Creating screenshot images and annotations for UI elements in Figma prototypes</strong>
              {"\n"}
            </li>
            {"\n"}
            <li>
              {"\n"}
              <strong>Implementing the AI model's suggested actions within Figma prototypes</strong>
              {"\n"}
            </li>
            {"\n"}
          </ul>
          <p>Understanding these core operations was essential to integrating AppAgent with Figma, setting the stage for our development journey.</p>
        </TimelineItem>
        <TimelineItem date={"Mar 2024: Experimenting #1"}>
          <h3 id="generating-ui-screenshots--annotations">{"Generating UI Screenshots & Annotations"}</h3>
          <p>Creating screenshot images and annotations in Figma prototypes wasn't too difficult. We used Figma's REST API to fetch node data from Figma design, convert it to images, and generate screenshot images and annotations.</p>
          <Gallery images={[{
          "src": "/images/projects/2024-klever/5_demo_case%20study_1_0.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — A sample screenshot vs A screenshot with UI object annotations 1"
        }]} columns={1} caption={<>A sample screenshot vs A screenshot with UI object annotations</>} fullWidth={false} />
          <p>
            {"However, implementing the resulting actions in Figma prototypes proved challenging. This was because Figma prototypes render their designs on "}
            <span data-rehype-pretty-code-figure="">
              <code data-language="plaintext" data-theme="github-dark-default">
                <span data-line="">
                  <span>{"<Canvas>"}</span>
                </span>
              </code>
            </span>
            {" like PNG images, making it difficult to recognize and interact with just UI components."}
          </p>
        </TimelineItem>
        <TimelineItem date={"Mar 2024: Experimenting #2"}>
          <h3 id="implementing-ai-actions-in-figma">Implementing AI Actions in Figma</h3>
          <p>
            {"The solution was "}
            <ContentLink href="https://www.selenium.dev/">Selenium</ContentLink>
            {". As a tool for controlling web browsers and interacting with web page UI elements, we created a "}
            <span data-rehype-pretty-code-figure="">
              <code data-language="plaintext" data-theme="github-dark-default">
                <span data-line="">
                  <span>SeleniumController</span>
                </span>
              </code>
            </span>
            {" to control Figma prototypes at the web browser level."}
          </p>
          <figure data-rehype-pretty-code-figure="">
            <pre tabIndex="0" data-language="python" data-theme="github-dark-default">
              <code data-language="python" data-theme="github-dark-default" style={{
              display: "grid"
            }}>
                <span data-line="">
                  <span style={{
                  color: "#8B949E"
                }}># AppAgent/scripts/figma_controller.py</span>
                </span>
                {"\n"}
                <span data-line="">{" "}</span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#FF7B72"
                }}>class</span>
                  <span style={{
                  color: "#FFA657"
                }}>{" SeleniumController"}</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>:</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#FF7B72"
                }}>{"   def"}</span>
                  <span style={{
                  color: "#79C0FF"
                }}>{" __init__"}</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>(self, url, password):</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#79C0FF"
                }}>{"       self"}</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{".url "}</span>
                  <span style={{
                  color: "#FF7B72"
                }}>=</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{" url"}</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#79C0FF"
                }}>{"       self"}</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{".password "}</span>
                  <span style={{
                  color: "#FF7B72"
                }}>=</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{" password"}</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#79C0FF"
                }}>{"       self"}</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{".driver "}</span>
                  <span style={{
                  color: "#FF7B72"
                }}>=</span>
                  <span style={{
                  color: "#79C0FF"
                }}>{" None"}</span>
                </span>
                {"\n"}
                <span data-line="">{" "}</span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#FF7B72"
                }}>{"   def"}</span>
                  <span style={{
                  color: "#D2A8FF"
                }}>{" execute_selenium"}</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>(self):</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#E6EDF3"
                }}>{"       options "}</span>
                  <span style={{
                  color: "#FF7B72"
                }}>=</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{" Options()"}</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#E6EDF3"
                }}>{"       options.add_argument("}</span>
                  <span style={{
                  color: "#A5D6FF"
                }}>"user-data-dir=./User_Data"</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>)</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#E6EDF3"
                }}>{"       options.add_argument("}</span>
                  <span style={{
                  color: "#A5D6FF"
                }}>"disable-blink-features=AutomationControlled"</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>)</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#E6EDF3"
                }}>{"       options.add_argument("}</span>
                  <span style={{
                  color: "#A5D6FF"
                }}>"--start-maximized"</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>)</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#E6EDF3"
                }}>{"       options.add_experimental_option("}</span>
                  <span style={{
                  color: "#A5D6FF"
                }}>"detach"</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{", "}</span>
                  <span style={{
                  color: "#79C0FF"
                }}>True</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>)</span>
                </span>
                {"\n"}
                <span data-line="">{" "}</span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#E6EDF3"
                }}>{"       service "}</span>
                  <span style={{
                  color: "#FF7B72"
                }}>=</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{" Service(ChromeDriverManager().install())"}</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#79C0FF"
                }}>{"       self"}</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{".driver "}</span>
                  <span style={{
                  color: "#FF7B72"
                }}>=</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{" webdriver.Chrome("}</span>
                  <span style={{
                  color: "#FFA657"
                }}>service</span>
                  <span style={{
                  color: "#FF7B72"
                }}>=</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>{"service, "}</span>
                  <span style={{
                  color: "#FFA657"
                }}>options</span>
                  <span style={{
                  color: "#FF7B72"
                }}>=</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>options)</span>
                </span>
                {"\n"}
                <span data-line="">{" "}</span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#79C0FF"
                }}>{"       self"}</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>.driver.get(</span>
                  <span style={{
                  color: "#79C0FF"
                }}>self</span>
                  <span style={{
                  color: "#E6EDF3"
                }}>.url)</span>
                </span>
                {"\n"}
                <span data-line="">
                  <span style={{
                  color: "#8B949E"
                }}>{"       # ..."}</span>
                </span>
              </code>
            </pre>
          </figure>
          <p>By structuring the SeleniumController similarly to the AndroidController, we enabled control over Figma prototypes. We integrated this with the existing logic to run it as a new option, distinct from the Android-based approach.</p>
        </TimelineItem>
        <TimelineItem date={"Mar 2024: Working Demo"}>
          <span id="prototyped-appagents-integration-with-figma" />
          <h3 id="--prototyped-appagents-integration-with-figma">🎉  Prototyped: AppAgent's Integration with Figma</h3>
          <p>After several trials and errors, we successfully developed a new option where AppAgent controls Figma prototypes, recognizes UI elements, and interacts with them, as demonstrated in the YouTube video below.</p>
          <br />
          <br />
          <MediaEmbed src={"https://www.youtube.com/embed/1HuCiL9el3I?si=JX9BM_xb_wfAkYUq"} title={"Klever — A Community-Driven AI Usability Testing Figma Plugin — video 1"} aspectRatio={"560 / 315"} />
        </TimelineItem>
        <TimelineItem date={"Jun 2024: Evolving"}>
          <h3 id="from-experiment-to-product-klever-was-born">
            {"From experiment to product, "}
            <mark className="content-highlight">Klever</mark>
            {" was born"}
          </h3>
          <p>
            {"As we shared our prototype with the design community, we received enthusiastic responses about its potential. However, we also discovered a significant challenge: "}
            <strong>the Python development environment was a major barrier</strong>
            {" for many designers who wanted to try it out."}
          </p>
          <p>
            {"This feedback led us to make a "}
            <strong>BOLD</strong>
            {" decision. We decided to develop a Figma plugin version, transforming our experimental implementation of Tencent's paper into a more accessible product for all product designers."}
          </p>
          <p>This evolution needed a new identity, and that's how 'Klever' was born.</p>
          <QuoteCard image={"/images/projects/2024-klever/6_logo_1_5.png"} imageWidth={1086} imageHeight={512} text={<>
              {"Klever is a "}
              <mark className="content-highlight content-highlight-lg">Figma plugin</mark>
              {" that harnesses the power of AppAgent's AI technology while offering a seamless, designer-friendly experience. "}
              <br />
              <br />
              It empowers designers to conduct instant usability testing and gain valuable insights, all within Figma!
            </>} backgroundColor={"#000"} fontColor={"#fff"} fullWidth={false} />
          <hr />
          <p>In developing the Klever plugin, we faced many technical challenges. The biggest challenge was how to implement AppAgent's core functionality in the limited environment of a Figma plugin. Some notable challenges include:</p>
          <ul>
            {"\n"}
            <li>
              {"\n"}
              <strong>Transition to TypeScript</strong>
              {"\n"}
            </li>
            {"\n"}
            <li>
              {"\n"}
              <strong>Development of the UIs</strong>
              {"\n"}
            </li>
            {"\n"}
            <li>
              {"\n"}
              <strong>Utilizing Figma Plugin API</strong>
              {"\n"}
            </li>
            {"\n"}
          </ul>
          <p>It wasn't easy for us, designers, to code it to overcome these challenges as well, but we developed the Klever plugin while tackling these difficulties with Copilot. And through this, we made it possible to use AppAgent's core functionality in Figma plugins as well.</p>
          <div style={{
          "textAlign": "center",
          "marginTop": "20px"
        }}>
            <a href="https://www.figma.com/community/plugin/1383457529531594701/klever-instant-usability-testing" target="_blank" style={{
            "display": "inline-flex",
            "maxWidth": "500px",
            "maxHeight": "50px",
            "alignItems": "center",
            "padding": "10px 20px",
            "backgroundColor": "#333333",
            "color": "white",
            "textDecoration": "none",
            "borderRadius": "5px",
            "fontWeight": "bold"
          }} rel="noopener noreferrer">
              <ContentImage src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma Plugin Logo" height="24" style={{
              "maxHeight": "24px",
              "maxWidth": "24px",
              "marginRight": "10px"
            }} />
              <p>View 'Klever'</p>
            </a>
          </div>
          <MediaEmbed src={"https://www.youtube.com/embed/pZSXt8Cc4Ak?si=Pyc6zeVGFWv2Gvne"} title={"Klever — A Community-Driven AI Usability Testing Figma Plugin — video 2"} aspectRatio={"560 / 315"} />
        </TimelineItem>
      </Timeline>
      {"\n"}
      <h2 id="-interesting-use-cases">🧠 Interesting Use Cases</h2>
      {"\n"}
      <p>As we applied AppAgent for Figma to several prototypes, we discovered some truly fascinating cases. These cases demonstrated that AppAgent could evolve beyond a simple lab model to become a design productivity tool capable of predicting actual user behavior and identifying potential design issues.</p>
      {"\n"}
      <Timeline align={"left"}>
        <TimelineItem date={"Use Case #1"}>
          <h3 id="discovering-hidden-interactions">Discovering Hidden Interactions</h3>
          <Gallery images={[{
          "src": "/images/projects/2024-klever/5_demo_case%20study_1_1.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — AI Agent found a prototype noodle that the designer missed. 1"
        }, {
          "src": "/images/projects/2024-klever/5_demo_case%20study_1_2.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — AI Agent found a prototype noodle that the designer missed. 2"
        }]} columns={2} caption={<>AI Agent found a prototype noodle that the designer missed.</>} fullWidth={false} />
          <p>In a travel app prototype, we asked the AI agent to check promotions and find the cheapest hotel in Bali. Contrary to our expectations, the AI agent tried to expand the article by clicking the center instead of pressing the ‘Read more’ button or the search button. This is a familiar UI pattern used in many apps, but it was mistakenly not connected in this prototype. The AI agent captured this important interaction that the designer had missed.</p>
        </TimelineItem>
        <TimelineItem date={"Use Case #2"}>
          <h3 id="identifying-ui-element-ambiguity">Identifying UI Element Ambiguity</h3>
          <Gallery images={[{
          "src": "/images/projects/2024-klever/5_demo_case%20study_2_1.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — AI Agent discovered the confusing visual design of the UI components. 1"
        }, {
          "src": "/images/projects/2024-klever/5_demo_case%20study_2_2.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — AI Agent discovered the confusing visual design of the UI components. 2"
        }]} columns={2} caption={<>AI Agent discovered the confusing visual design of the UI components.</>} fullWidth={false} />
          <p>On the hotel details screen of the same prototype, we instructed the AI agent to find more information. We expected the AI to expand the article for ‘Read more’, but it repeatedly clicked the ‘Detail’ tab instead. This shows that the AI agent, like a person, confused tabs and buttons due to their similar visual designs. It highlights how the AI agent can spot visual design details that the designer might have overlooked.</p>
        </TimelineItem>
        <TimelineItem date={"Use Case #3"}>
          <h3 id="predicting-hidden-features">Predicting Hidden Features</h3>
          <p>AI Agent predicted the next UI and performed the action.</p>
          <Gallery images={[{
          "src": "/images/projects/2024-klever/5_demo_case%20study_3_1.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — AI Agent predicted the next UI and performed the action. 1"
        }, {
          "src": "/images/projects/2024-klever/5_demo_case%20study_3_2.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — AI Agent predicted the next UI and performed the action. 2"
        }]} columns={2} caption={<>AI Agent predicted the next UI and performed the action.</>} fullWidth={false} />
          <p>In a task to change the number of guests to 10, the AI agent clicked the ‘2 guests’ area instead of pressing the ‘+’ button. Despite being given only a single screen, the AI predicted that clicking this area would reveal additional options. This shows that the AI can understand and predict common UI patterns, not just process the given information.</p>
        </TimelineItem>
      </Timeline>
      {"\n"}
      <p>These cases demonstrate that this AI-based usability testing agent can think and act like a real user, not just follow programmed rules. It provides insights that are as valuable as those from actual users. These moments were the most thrilling and fascinating for us as creators.</p>
      {"\n"}
      <h2 id="-impact">📈 Impact</h2>
      {"\n"}
      <p>Despite being a paid plugin (due to API costs), Klever has achieved large numbers in the Figma Community beyond our expectations, demonstrating strong demand for AI-powered usability testing tools:</p>
      {"\n"}
      <QuoteCard image={"/images/projects/2024-klever/hero2.png"} imageWidth={1251} imageHeight={778} text={<>
          {"It still keeps growing every week! "}
          <br />
          <br />
          {"👀 "}
          <mark className="content-highlight content-highlight-lg">2,093</mark>
          {" Views"}
          <br />
          {"\n👥 "}
          <mark className="content-highlight content-highlight-lg">1,076</mark>
          {" Users"}
          <br />
          {"\n🔖 "}
          <mark className="content-highlight content-highlight-lg">248</mark>
          {" Saves"}
        </>} backgroundColor={"#000"} fontColor={"#fff"} fullWidth={false} />
      {"\n"}
      <br />
      {"\n"}
      <br />
      {"\n"}
      <p>
        {"These numbers significantly exceed our expectations for a "}
        <strong>paid</strong>
        {" plugin, validating our vision of making AI usability testing more accessible to designers. The growing user base and engagement metrics demonstrate that there's a real need in the design community for tools that can streamline the usability testing process while leveraging AI capabilities."}
      </p>
      {"\n"}
      <h2 id="-growing-with-community">🌱 Growing with Community</h2>
      {"\n"}
      <p>The successfully developed Klever opened up numerous opportunities to share our journey with the broader design community. We actively shared our project's journey and findings, believing that open collaboration leads to better solutions. From local meetups to major Tech conferences, each sharing session not only helped us gather valuable feedback but also inspired others to explore the possibilities of AI in design. This open approach led to various adaptations of our project, including an internal version at Grab. Here's our community engagement timeline:</p>
      {"\n"}
      <Timeline align={"left"}>
        <TimelineItem date={"Jun 2024: Community Contributions #1"}>
          <h3 id="meetups-friends-of-figma-seoul--educators-event">{"Meetups: Friends of Figma Seoul & Educators event"}</h3>
          <p>
            {"At the "}
            <ContentLink href="https://friends.figma.com/events/details/figma-seoul-presents-product-design-education-in-ai-era-figma-meetup-in-korea/cohost-education">{"Friends of Figma Seoul & Educators event"}</ContentLink>
            , we presented our session "Experimenting with user test automation with AI and Open Source". The event, initially planned for 40 attendees, received an overwhelming 400+ registrations, highlighting the design community's intense interest in AI. During our presentation, the audience's enthusiastic response and spontaneous applause were truly encouraging, motivating us to develop this project further into a Figma plugin.
          </p>
          <MediaEmbed src={"https://www.youtube.com/embed/jZgybbhoeaQ?si=iETxISV7RwDMgCDP"} title={"Klever — A Community-Driven AI Usability Testing Figma Plugin — video 3"} aspectRatio={"560 / 315"} />
          <p>Want to learn more about our journey with AI and design? Check out the full session:</p>
          <ButtonLink href="https://inf.run/H7rkU" variant="outline">Watch Full Session on Inflearn</ButtonLink>
        </TimelineItem>
        <TimelineItem date={"Jul 2024: Internal Adoption"}>
          <h3 id="from-side-project-to-corporate-innovation">From Side Project to Corporate Innovation</h3>
          <p>Encouraged by the community's response, we took on our biggest challenge yet: convincing Grab's design leadership to adopt our experimental project. From Tech Day presentations to leadership meetings, we delivered more than 6 different presentations and demos. By August, we had participated in over 20 stakeholder meetings, each one bringing us closer to our goal. After months of persistence and countless iterations, our dedication paid off.</p>
          <p>
            <ContentImage src="/images/projects/2024-klever/5_demo_vid_1.gif" alt="Klever Internal Demo" />
          </p>
          <p>This evolution from a side project to a corporate-backed initiative validates our vision of AI-powered usability testing and provides a platform for more ambitious experiments:</p>
          <ul>
            {"\n"}
            <li>Access to enterprise-level AI capabilities</li>
            {"\n"}
            <li>Ability to collect and analyze usage data at scale</li>
            {"\n"}
            <li>Opportunities to test with a larger designer base</li>
            {"\n"}
          </ul>
          <p>While this corporate adoption was a significant milestone, we soon faced another challenge that would push us to think even bigger.</p>
        </TimelineItem>
        <TimelineItem date={"Aug 2024: Community Contributions #2"}>
          <h3 id="conference-infcon-2024-presentation">Conference: InfCon 2024 Presentation</h3>
          <p>
            {"Shortly after releasing the Figma plugin, an unexpected opportunity came our way. "}
            <ContentLink href="https://www.linkedin.com/in/jihere1001/">Kim Ji-hong</ContentLink>
            {" from "}
            <ContentLink href="https://medium.com/u/d906e16642cf">Design Spectrum</ContentLink>
            {" and "}
            <ContentLink href="https://www.linkedin.com/in/yeoneui-hong/">Hong Yeon-ui</ContentLink>
            {" from "}
            <ContentLink href="https://medium.com/u/785769823235">Inflearn</ContentLink>
            {", who had been following our project with interest, invited us to speak at "}
            <ContentLink href="https://www.inflearn.com/conf/infcon-2024/">InfCon 2024</ContentLink>
            .
          </p>
          <MediaEmbed src={"https://www.youtube.com/embed/JVfpIy5LhJ8?si=KpLw_WP7LKsMrLwL"} title={"Klever — A Community-Driven AI Usability Testing Figma Plugin — video 4"} aspectRatio={"560 / 315"} />
          <br />
          <br />
          <p>Most importantly, we extend our heartfelt thanks to the Korean designers who showed interest in our project and asked endless questions late into Friday evening. The support and energy we received from InfCon 2024 were truly uplifting.</p>
          <Gallery images={[{
          "src": "/images/projects/2024-klever/6_infcon_1.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — InfCon24 recap: We never imagined the room would be packed for our 5 PM session on a Friday… Thank you so much folks! 1"
        }, {
          "src": "/images/projects/2024-klever/6_infcon_2.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — InfCon24 recap: We never imagined the room would be packed for our 5 PM session on a Friday… Thank you so much folks! 2"
        }, {
          "src": "/images/projects/2024-klever/6_infcon_3.png",
          "width": 1920,
          "height": 1080,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — InfCon24 recap: We never imagined the room would be packed for our 5 PM session on a Friday… Thank you so much folks! 3"
        }]} columns={3} caption={<>
              {"InfCon24 recap: We never imagined the room would be packed for our 5 PM session on a Friday… "}
              <br />
              Thank you so much folks!
            </>} fullWidth={false} />
        </TimelineItem>
        <TimelineItem date={"Sep 2024: Open source contributions"}>
          <h3 id="challenges--community-growth">{"Challenges & Community Growth"}</h3>
          <p>As our project grew, we encountered a significant technical hurdle. The Klever plugin was limited to performing usability tests on only one screen, as Figma's API constraints made it impossible to replace Selenium for controlling prototype flows.</p>
          <Gallery images={[{
          "src": "/images/projects/2024-klever/figma_config_1.jpeg",
          "width": 4284,
          "height": 5712,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — My efforts to overcome Figma API limitations: From meeting with Figma AI team to discussing with Dylan Field, Figma CEO 1"
        }, {
          "src": "/images/projects/2024-klever/figma_config_2.jpeg",
          "width": 3024,
          "height": 4032,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — My efforts to overcome Figma API limitations: From meeting with Figma AI team to discussing with Dylan Field, Figma CEO 2"
        }, {
          "src": "/images/projects/2024-klever/figma_config_3.jpeg",
          "width": 3024,
          "height": 4032,
          "alt": "Klever — A Community-Driven AI Usability Testing Figma Plugin — My efforts to overcome Figma API limitations: From meeting with Figma AI team to discussing with Dylan Field, Figma CEO 3"
        }]} columns={3} caption={<>
              {"My efforts to overcome Figma API limitations: "}
              <br />
              From meeting with Figma AI team to discussing with Dylan Field, Figma CEO
            </>} fullWidth={false} />
          <p>We went to great lengths to address these API limitations, even meeting with Figma's AI team and eventually discussing our needs with Dylan Field, Figma's CEO. Despite these high-level conversations and our persistent requests for new APIs, the technical constraints remained.</p>
          <p>Rather than letting this limitation stop us, we saw an opportunity to expand our impact. We decided to open-source our project, believing that by sharing our challenges openly, we could not only find potential solutions but also inspire others to build upon our work. This decision to embrace open collaboration has already led to unexpected innovations and improvements.</p>
          <LinkPreview url="https://github.com/FigmaAI/klever" />
          <LinkPreview url="https://appagent-official.github.io/" />
          <p>The community's response has been incredibly encouraging. Developers and designers from various backgrounds have started experimenting with our codebase, proposing creative solutions to overcome the current limitations. One particularly promising approach involves integrating the Figma plugin with a Python Flask server:</p>
          <p className="content-media-unavailable">
            {"The prototype animation is no longer available at its original location. "}
            <a href="https://github.com/FigmaAI/AppAgent">View the source repository</a>
            .
          </p>
        </TimelineItem>
      </Timeline>
      {"\n"}
      <AppDownloads apps={[{
      id: "klever-desktop",
      title: "Download Klever Desktop App",
      appName: "Klever Instance UT",
      description: "Run AI-powered usability tests on macOS and Windows.",
      imageTheme: "light",
      imageLayout: "landscape",
      images: [{
        src: "/images/projects/2024-klever/app-store/desktop.jpg",
        alt: "Klever Desktop — App Store promotional screenshot"
      }],
      urls: ["https://apps.apple.com/us/app/klever-instance-ut/id6754501208", "xp8brb9spkfrsw"]
    }]} />
      {"\n"}
      <h2 id="lessons-learned">Lessons learned</h2>
      {"\n"}
      <p>This project started as a small side project for designers to learn AI while having fun. There were many challenges in the experimental process, but we received interest and encouragement from various designers and communities and motivated by all of that, we persistently repeated our experiments and eventually achieved the result of making it into a product.</p>
      {"\n"}
      <p>In the era of AI, new AI tools are pouring out every day. Some may feel pressured to learn new things, Or some may feel a vague fear that AI will replace our design jobs. But what this project has taught us is that AI is fascinating and fun. If we learn while playing and work while learning, just like children playing with interesting toys, and improve the small inconveniences in our product design ecosystem with AI, AI will no longer be a difficult or scary entity.</p>
      {"\n"}
      <p>We hope that these fun experiences we felt are well conveyed to all of you reading this article. So, enjoy a fun design experience with AI! 🤗</p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2024-klever/6_logo_1_4.png" alt="Testing UI usability with AI in just seconds." />
      </p>
    </>;
}
