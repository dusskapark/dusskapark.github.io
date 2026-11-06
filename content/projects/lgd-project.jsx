import { ButtonLink, Gallery, MediaEmbed } from "@/components/content";
import { ContentImage } from "@/components/content/content-elements";

export const frontmatter = {"kind":"project","slug":"lgd-project","title":"LINE GAME Developers","description":"LINE GAME Developers is a ‘Firebase-like’ web application that provides LINE’s APIs and documents for game developers to enrich games with LINE messager. As a Product designer, modernized user experiences of LINE GAME Developers by defining a UI framework that is effortless, refined, and beautiful for all screen sizes","date":"2019-07-24","lang":"en","listed":true,"hero":"/images/projects/2019-lgd/lgd2019-001.jpg","legacyPaths":["/project/lgd-project.html","/project/lgd-project/"],"subtitle":"DEV TOOLS (2019)","team":"JooHyung, Jinwoo, SeungHyeon, Li Huishu","role":"Project Lead / Product Designer","accentColor":"#4C60E6","galleryImages":["/images/projects/2019-lgd/lgd2019-001.jpg","/images/projects/2019-lgd/lgd2019-002.jpg","/images/projects/2019-lgd/lgd2019-003.jpg","/images/projects/2019-lgd/lgd2019-004.jpg"],"sourceFile":"_projects/2019-07-24-lgd-project.md","headings":[{"depth":4,"text":"Concept Background","id":"concept-background"},{"depth":4,"text":"Research","id":"research"},{"depth":4,"text":"Insights","id":"insights"},{"depth":4,"text":"Ideation and Sketch","id":"ideation-and-sketch"},{"depth":4,"text":"Design and Prototype","id":"design-and-prototype"},{"depth":4,"text":"Build","id":"build"}]};

export default function LgdProjectContent() {
  return <>
      <p>LINE GAME Developers is a ‘Firebase-like’ web application that provides LINE’s APIs and documents for game developers to enrich games with LINE messager. As a Product designer, modernized user experiences of LINE GAME Developers by defining a UI framework that is effortless, refined, and beautiful for all screen sizes.</p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/Portfolio/Portfolio.002.png" alt="LINE GAME Developers" />
      </p>
      {"\n"}
      <h4 id="concept-background">Concept Background</h4>
      {"\n"}
      <blockquote>
        {"\n"}
        <p>What makes a gaming moment socially special?</p>
        {"\n"}
      </blockquote>
      {"\n"}
      <p>This project began from my passion with game and my passive observations on gamer's behaviors on mobile environment. People play games for various reasons, and their gaming experiences with social network are often unique, whether it is playing with new friends, joining clans, having a co-mission, achivements, or visiting a new place. After gathering members JinWoo (Tech PM), Moon (UX designer), and Li Huishu(Lead engineer), we planned to explore a fun way for game developers to use LINE to create more diverse social experiences.</p>
      {"\n"}
      <p>Through this project, my team sought to explore how we can help developers capture and share their user’s memorable moments more effectively through LINE. Specifically focusing on improving developer experiences which contains a lot of potential ingredients of a unique/memorable moment of their gamers, we executed human-centered design process throughout the 10-week period to create new developer tools that can enhance game developer’s everyday experiences.</p>
      {"\n"}
      <hr />
      {"\n"}
      <h4 id="research">Research</h4>
      {"\n"}
      <p>{"We conducted a multi-methodology research effort to better understand how our partners and developers define their impression of LINE plarform, their SDK integrating experience & current use of technology, and how our competitors have sought to explore these questions in their relative fields of study."}</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>Contextual Inquiry / Observation</li>
        {"\n"}
        <li>Literature Review</li>
        {"\n"}
        <li>User Interview</li>
        {"\n"}
        <li>Google analytics data of existing tools</li>
        {"\n"}
      </ul>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2019-lgd/lgd2019-901.png",
      "width": 1920,
      "height": 1072,
      "alt": "LINE GAME Developers — Research (1 of 4)"
    }, {
      "src": "/images/projects/2019-lgd/lgd2019-902.png",
      "width": 2000,
      "height": 1125,
      "alt": "LINE GAME Developers — Research (2 of 4)"
    }, {
      "src": "/images/projects/2019-lgd/lgd2019-903.png",
      "width": 2598,
      "height": 1290,
      "alt": "LINE GAME Developers — Research (3 of 4)"
    }, {
      "src": "/images/projects/2019-lgd/lgd2019-904.png",
      "width": 2458,
      "height": 1298,
      "alt": "LINE GAME Developers — Research (4 of 4)"
    }]} columns={2} fullWidth={true} />
      {"\n"}
      <h4 id="insights">Insights</h4>
      {"\n"}
      <ul>
        {"\n"}
        <li>Developers recognize the SDK integration guide as one of the most important features, but their satisfaction is low</li>
        {"\n"}
        <li>{"Also, the usability satisfaction level for the issue Q&A function is relatively low."}</li>
        {"\n"}
        <li>There is a difference in perception between developers and internal solution engineers on usability satisfaction.</li>
        {"\n"}
      </ul>
      {"\n"}
      <p>In conclusion, as complaints about the inconvenience of the SDK are delivered through the developer site, it appears that the developers are talking about the inconvenience of the website together.</p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2019-lgd/lgd2019-905.png",
      "width": 1467,
      "height": 616,
      "alt": "LINE GAME Developers — Insights (1 of 2)"
    }, {
      "src": "/images/projects/2019-lgd/lgd2019-906.png",
      "width": 640,
      "height": 279,
      "alt": "LINE GAME Developers — Insights (2 of 2)"
    }]} columns={1} fullWidth={true} />
      {"\n"}
      <h4 id="ideation-and-sketch">Ideation and Sketch</h4>
      {"\n"}
      <h5 id="concept-refinement">Concept Refinement</h5>
      {"\n"}
      <p>{"Using those insights, we conducted a series of sketching sessions to brainstorm and come up with possible features and methods that could potentially improve the current ways of developer-site experience in the context of SDK-integrating. The ideas spun around at different stages within LINE GAME platform features we already have. While some focused on providing easy-to-use ways of SDK-integrating, some ideas revolved around setting a necessary moment such as reading guide docs and Q&A."}</p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2019-lgd/lgd2019-907.png" alt="LINE GAME Developers — Ideation and Sketch" />
      </p>
      {"\n"}
      <h5 id="initial-wireframe-and-flow">Initial wireframe and flow</h5>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2019-lgd/lgd2019-908.png" alt="LINE GAME Developers — Ideation and Sketch" />
      </p>
      {"\n"}
      <h4 id="design-and-prototype">Design and Prototype</h4>
      {"\n"}
      <h5 id="api-and-swagger">API and swagger</h5>
      {"\n"}
      <p>Based on policies and wireframe designs above, we selected and used the APIs we needed from the existing LINE GAME Platform's orchestration API list, and repeated tasks such as creating new essential APIs or replacing them with other APIs that were not present.</p>
      {"\n"}
      <h5 id="ui-design-via-material-design--lookbook">UI design via Material design + LOOKBOOK</h5>
      {"\n"}
      <p>Here at LINE, we're using Material design for many of our projects. It already includes a lot of components, but sometimes you need a more complex composed component (e.g. a chip input or a time picker) or something very basic (e.g. dots for pagination).</p>
      {"\n"}
      <p>So we made LOOKBOOK as a ccollection of our customized components and used it with Material theming.</p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2019-lgd/lgd2019-911.png",
      "width": 3762,
      "height": 2352,
      "alt": "LINE GAME Developers — UI design via Material design + LOOKBOOK (1 of 3)"
    }, {
      "src": "/images/projects/2019-lgd/lgd2019-909.png",
      "width": 1909,
      "height": 1077,
      "alt": "LINE GAME Developers — UI design via Material design + LOOKBOOK (2 of 3)"
    }, {
      "src": "/images/projects/2019-lgd/lgd2019-910.gif",
      "width": 2080,
      "height": 1160,
      "alt": "LINE GAME Developers — UI design via Material design + LOOKBOOK (3 of 3)"
    }]} columns={1} fullWidth={true} />
      {"\n"}
      <h5 id="ui-prototyping">UI Prototyping</h5>
      {"\n"}
      <p>We used Docz for interactive preview of UI components ans pages</p>
      {"\n"}
      <MediaEmbed src={"https://www.youtube.com/embed/TTq8qN52S7w"} title={"LINE GAME Developers — video 1"} aspectRatio={"560 / 315"} />
      {"\n"}
      <h4 id="build">Build</h4>
      {"\n"}
      <h5 id="result">Result</h5>
      {"\n"}
      <MediaEmbed src={"https://www.youtube.com/embed/videoseries?list=PLLQlZaiiGlHP3ffGmyB8RzT48A2zQjSK9"} title={"LINE GAME Developers — video 2"} aspectRatio={"560 / 315"} />
      {"\n"}
      <hr />
      {"\n"}
      <h5 id="concept-images">Concept images</h5>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2019-lgd/lgd2019-001.jpg",
      "width": 1920,
      "height": 1281,
      "alt": "LINE GAME Developers — Concept images (1 of 4)"
    }, {
      "src": "/images/projects/2019-lgd/lgd2019-002.jpg",
      "width": 1920,
      "height": 1275,
      "alt": "LINE GAME Developers — Concept images (2 of 4)"
    }, {
      "src": "/images/projects/2019-lgd/lgd2019-003.jpg",
      "width": 1920,
      "height": 1280,
      "alt": "LINE GAME Developers — Concept images (3 of 4)"
    }, {
      "src": "/images/projects/2019-lgd/lgd2019-004.jpg",
      "width": 1920,
      "height": 1280,
      "alt": "LINE GAME Developers — Concept images (4 of 4)"
    }]} columns={2} fullWidth={false} />
      {"\n"}
      <hr />
      {"\n"}
      <blockquote>
        {"\n"}
        <p>Pretty cool, huh?</p>
        {"\n"}
      </blockquote>
      {"\n"}
      <p>We've deployed LINE GAME Developers website with powerful features to show off your work. Why not take a look and use on your mobile games?</p>
      {"\n"}
      <ButtonLink href="https://developers.game.line.me">Visit LINE GAME Developers</ButtonLink>
    </>;
}
