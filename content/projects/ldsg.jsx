import { Gallery, MediaEmbed } from "@/components/content";
import { ContentImage, ContentLink } from "@/components/content/content-elements";

export const frontmatter = {"kind":"project","slug":"ldsg","title":"LINE Design System Global","description":"LINE Design System Global project started to make everyone’s life easier. It gives designers the elements and guidance they need to work within an approved structure. It helps developers work with predictable, consistent components. And it helps businesses maintain or design products, faster — all with consistent user experiences.","date":"2020-11-30","lang":"en","listed":true,"hero":"/images/projects/2020-ldsg/mt-09AF1C98-4F0A-496C-857F-B244256366C5-19587.png","legacyPaths":["/project/ldsg.html","/project/ldsg/"],"subtitle":"Design system (2020)","team":"Jeaho(PM), Jay, JooHyung, Mammademin, JongHee, Dane, Alan, Uemura","role":"Product Designer","accentColor":"#4C60E6","galleryImages":["/images/projects/2020-ldsg/mt-09AF1C98-4F0A-496C-857F-B244256366C5-19587.png"],"sourceFile":"_projects/2020-11-30-ldsg.md","headings":[{"depth":2,"text":"Background","id":"background"},{"depth":2,"text":"Concept building","id":"concept-building"},{"depth":2,"text":"Work Processes","id":"work-processes"},{"depth":3,"text":"Overview","id":"overview"},{"depth":3,"text":"Design","id":"design"},{"depth":3,"text":"Documents","id":"documents"},{"depth":3,"text":"Development","id":"development"}]};

export default function LdsgContent() {
  return <>
      <h2 id="background">Background</h2>
      {"\n"}
      <p>
        {"There are more than 200 Family Services in LINE, and they have their own UX/UI orientation. So there were lots of wasting of time, energy and cost due to repeated Planning / Designing / Developing work to make a similar styled components. The LINE Design System Global('LDSG') started from the question of "}
        <strong>'Is there any way to share and recycle the components in a global scale?'</strong>
        .
      </p>
      {"\n"}
      <p>
        {"Early 2020, I joined the project as an anchor who orchestrates the team to achieve design or technical performance. (hmm.. "}
        <em>
          <ContentLink href="https://youtu.be/_VM7LOjjntA">Xavi Hernandez</ContentLink>
          ?
        </em>
        )
      </p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2020-ldsg/background001.png" alt="background001" />
      </p>
      {"\n"}
      <h2 id="concept-building">Concept building</h2>
      {"\n"}
      <p>Although LINE has maintained an industry leading Design System (as known as 'LDS' or 'LDSM') and LDS has evolved a great deal since its launch years ago, it was clear that LDS's goals were not around providing a scalable and customizable way but concentrating the incorperated mobile messenger first.</p>
      {"\n"}
      <p>{"So, Dane (Sr. UX designer) suggested and led the investigating & analyzing the needs of our target users, Family services first. And we tried to set goals & concepts to fit for this LDSG project together after those research."}</p>
      {"\n"}
      <blockquote>
        {"\n"}
        <p>What is the role of Family Services?</p>
        {"\n"}
        <p>{"What's the initial goal of the design system\nfor Family Services?"}</p>
        {"\n"}
      </blockquote>
      {"\n"}
      <p>Each of our Family Services provides unique value and benefits to our users and also plays a role in the platform and synergy with other services. Therefore it is important to understand the holistic role of Family Services as a collection of services and part of the entire LINE platform.</p>
      {"\n"}
      <p>So we researched lots of Family services and defined the outline of the role of Family Services below:</p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2020-ldsg/principle002.png" alt="principle002" />
      </p>
      {"\n"}
      <p>Based on the researches, we dicided to spin off LDSG from LDS and set its initial goals around giving designers the elements and guidance they need to work within a more flexible structure and helping developers still work with predictable, consistent components. Consequently, LDSG aim to help businesses maintain or design products, faster — all with consistent user experiences in a global scale.</p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2020-ldsg/process03.png" alt="process03" />
      </p>
      {"\n"}
      <h2 id="work-processes">Work Processes</h2>
      {"\n"}
      <h3 id="overview">Overview</h3>
      {"\n"}
      <p>Next, we defined a workflow for creating a design system based on a great collaboration system with multiple designers at the cross location. In particular, I took the lead in cross functional work, such as creating PRD documents based on UI symbols and communicating with FE engineers.</p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2020-ldsg/process01.png" alt="process01" />
      </p>
      {"\n"}
      <h3 id="design">Design</h3>
      {"\n"}
      <p>Emin and Jonghee led design phase and made 3 libraries: icon, foundation, and components. those libraries collects the smallest units of design elements to which minimal design rules have been applied to consistently maintain the design style of the LINE family service.</p>
      {"\n"}
      <MediaEmbed src={"https://www.youtube.com/embed/L-LcSkyBsAA"} title={"LINE Design System Global — video"} fullWidth={false} />
      {"\n"}
      <h3 id="documents">Documents</h3>
      {"\n"}
      <p>
        {"In the documentation phase, I took the leading role as a product manager.\nI first discussed with the development team what technology stack to implement the design system. Together, we referenced numerous examples of design systems, and finally decided to use Web Components technology by referring to "}
        <ContentLink href="https://www.youtube.com/watch?v=YBwgkr_Sbx0">the case examples from Salesforce and Google</ContentLink>
        {" (Because their problem-solving approach was most similar to ours.)"}
      </p>
      {"\n"}
      <p>Next, I worked closely with designers and focused on creating PRDs to convert the UI symbols created in the design process above into web components. Since I worked with talented designers, I thought that the most important thing that I should do in this phase was not to be obsessed with visuals, but to delve into the functional specs. So, I tried to focus on clearly explaining the functional specifications to the engineers and... successfully did it. My documents brought me very rewarding feedback from my peer review :)</p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2020-ldsg/docs01.png",
      "width": 1224,
      "height": 1584,
      "alt": "LINE Design System Global — Documents (1 of 3)"
    }, {
      "src": "/images/projects/2020-ldsg/docs02.png",
      "width": 1224,
      "height": 1584,
      "alt": "LINE Design System Global — Documents (2 of 3)"
    }, {
      "src": "/images/projects/2020-ldsg/docs03.png",
      "width": 1224,
      "height": 1584,
      "alt": "LINE Design System Global — Documents (3 of 3)"
    }]} columns={3} fullWidth={false} />
      {"\n"}
      <p>Moreover, I was also responsible for leading communication with the technical writing team and UX designers, writing and translating component usage guides and distributing them periodically to our design system website.</p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2020-ldsg/docs04.png",
      "width": 3360,
      "height": 2100,
      "alt": "LINE Design System Global — Documents (1 of 4)"
    }, {
      "src": "/images/projects/2020-ldsg/docs05.png",
      "width": 3360,
      "height": 2100,
      "alt": "LINE Design System Global — Documents (2 of 4)"
    }, {
      "src": "/images/projects/2020-ldsg/docs06.png",
      "width": 3360,
      "height": 2100,
      "alt": "LINE Design System Global — Documents (3 of 4)"
    }, {
      "src": "/images/projects/2020-ldsg/docs07.png",
      "width": 3360,
      "height": 2100,
      "alt": "LINE Design System Global — Documents (4 of 4)"
    }]} columns={2} fullWidth={false} />
      {"\n"}
      <h3 id="development">Development</h3>
      {"\n"}
      <p>Our SW engineers, Alan and Uemura-san, worked very hard and made the state-of-the-art web components. For me, I enjoyed communicating with them and participating in review and QA.</p>
      {"\n"}
      <p>In addition, this project got the attention of technology leadership and were featured as one of the major Frontend projects at the company's annual developer conference 'LINE Dev day 2020'.</p>
      {"\n"}
      <MediaEmbed src={"https://www.youtube.com/embed/Wn-FqywrsqQ"} title={"LINE Design System Global — video"} fullWidth={false} />
    </>;
}
