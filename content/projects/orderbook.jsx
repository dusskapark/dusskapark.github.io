import { ButtonLink, Gallery } from "@/components/content";
import { ContentImage, ContentLink } from "@/components/content/content-elements";

export const frontmatter = {"kind":"project","slug":"orderbook","title":"Food ordering app","description":"Orderbook(모두의 주문) is a service that customers order directly from the table with a mobile QR code.","date":"2018-12-01","lang":"en","listed":true,"hero":"/images/projects/2018-orderbook/logostory2018-002.png","legacyPaths":["/project/orderbook.html","/project/orderbook/"],"subtitle":"SIDE PROJECT (2018)","team":"David (Lead), Kevin, Maxx, Sungvin, JooHyung (me)","role":"Product Designer and React Engineer","accentColor":"#4C60E6","galleryImages":["/images/projects/2018-orderbook/logostory2018-001.png"],"sourceFile":"_projects/2018-12-01-orderbook.md","headings":[{"depth":3,"text":"Brainstorm","id":"brainstorm"},{"depth":3,"text":"Ideate & Sketch","id":"ideate--sketch"},{"depth":3,"text":"Design & Prototype","id":"design--prototype"},{"depth":3,"text":"Web app implementation","id":"web-app-implementation"}]};

export default function OrderbookContent() {
  return <>
      <p>Have you ever been annoyed or tired of having to wait in a long line when ordering food at a restaurant? Orderbook(모두의 주문) is a service that customers order directly from the table with a mobile QR code.</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>
          {"Live at: "}
          <ContentLink href="https://orderbook.logostory.io/#/?shopId=2">https://orderbook.logostory.io/#/</ContentLink>
        </li>
        {"\n"}
        <li>
          {"Github: "}
          <ContentLink href="https://github.com/logostory">https://github.com/logostory</ContentLink>
        </li>
        {"\n"}
      </ul>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2018-orderbook/logostory2018-001.png" alt="Food ordering app" />
      </p>
      {"\n"}
      <hr />
      {"\n"}
      <p>
        <ContentImage src="/images/projects/Portfolio/Portfolio.003.png" alt="Design process flow in six stages: brainstorming and definition, ideation and sketching, design and prototyping, user testing, implementation, and iteration" />
      </p>
      {"\n"}
      <p>As my first side project at LOGO Cording club, we decided to design a service that applies to us. Right after the meeting, we could not decide what food should we order for the team lunch and tired of waiting in a long line. Let's build a food ordering service that makes it easy for anyone to find a menu, choose food, and order directly. Main contributed in UI design and React component development. I also participated in ideation, wireframing, and flow chart.</p>
      {"\n"}
      <h3 id="brainstorm">Brainstorm</h3>
      {"\n"}
      <p>At the start of the project, we surveyed similar apps and created a logo design that would be responsible for the consab and brand identity of the logostory app.</p>
      {"\n"}
      <h4 id="research">Research</h4>
      {"\n"}
      <p>
        {"First, we installed 7 food delivery services such as Yelp to understand each screen and function, and figured out how the functions we were going to create were developed in the real world. (Thanks "}
        <ContentLink href="https://www.facebook.com/profile.php?id=100001894389207">Rachel</ContentLink>
        )
      </p>
      {"\n"}
      <ButtonLink href="https://drive.google.com/open?id=1CDudLoe4XduV3w6YqFFZDdFro8UYA877">View the research and identity documents</ButtonLink>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2018-orderbook/benchmarking0.png",
      "width": 2067,
      "height": 1299,
      "alt": "Food ordering app — Research (1 of 4)"
    }, {
      "src": "/images/projects/2018-orderbook/benchmarking3.png",
      "width": 1390,
      "height": 874,
      "alt": "Food ordering app — Research (2 of 4)"
    }, {
      "src": "/images/projects/2018-orderbook/benchmarking4.png",
      "width": 1388,
      "height": 876,
      "alt": "Food ordering app — Research (3 of 4)"
    }, {
      "src": "/images/projects/2018-orderbook/benchmarking7.png",
      "width": 1390,
      "height": 874,
      "alt": "Food ordering app — Research (4 of 4)"
    }]} columns={2} fullWidth={true} />
      {"\n"}
      <h4 id="design-identity">Design Identity</h4>
      {"\n"}
      <p>
        {"Next, "}
        <ContentLink href="https://www.facebook.com/youngkwang.cho.90">Glory</ContentLink>
        , a designer, creates a logo with the image of ‘building up’ the goal we are pursuing. Next, we prepared the actual design by creating a Material Theme based on this consap.
      </p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2018-orderbook/logo1-1.png",
      "width": 2384,
      "height": 1344,
      "alt": "Food ordering app — Design Identity (1 of 4)"
    }, {
      "src": "/images/projects/2018-orderbook/logo1-2.png",
      "width": 1970,
      "height": 1110,
      "alt": "Food ordering app — Design Identity (2 of 4)"
    }, {
      "src": "/images/projects/2018-orderbook/logo1-3.png",
      "width": 1970,
      "height": 1108,
      "alt": "Food ordering app — Design Identity (3 of 4)"
    }, {
      "src": "/images/projects/2018-orderbook/logo1-5.png",
      "width": 1970,
      "height": 1108,
      "alt": "Food ordering app — Design Identity (4 of 4)"
    }]} columns={2} fullWidth={true} />
      {"\n"}
      <h3 id="ideate--sketch">{"Ideate & Sketch"}</h3>
      {"\n"}
      <h4 id="paper-prototype-usability-test">Paper prototype usability test</h4>
      {"\n"}
      <p>We iterated our wireframe design by conducting informal usability testing with the low-fidelity prototype. Our participants provided feedbacks on error-prevention methods, accessibility, and discoverability of the UI.</p>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2018-orderbook/logostory2018-007.png",
      "width": 1143,
      "height": 572,
      "alt": "Food ordering app — Paper prototype usability test (1 of 2)"
    }, {
      "src": "/images/projects/2018-orderbook/logostory2018-008.png",
      "width": 7362,
      "height": 4345,
      "alt": "Food ordering app — Paper prototype usability test (2 of 2)"
    }]} columns={2} fullWidth={true} />
      {"\n"}
      <h4 id="initial-ui-design--wireframe">{"Initial UI design & wireframe"}</h4>
      {"\n"}
      <p>
        {"As I was designing the UI wireframe and components, I realized that the most important function of this app lies on the user flow from camera to checkout. Using "}
        <ContentLink href="https://marvelapp.com/prototype/feib724/screen/50898994?">Marvel</ContentLink>
        , I tested out different scenarios and finally came up with some solutions. With some external and internal critique, we settled on a QR code based interaction.
      </p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2018-orderbook/logostory2018-001.png" alt="Food ordering app — Initial UI design & wireframe" />
      </p>
      {"\n"}
      <h3 id="design--prototype">{"Design & Prototype"}</h3>
      {"\n"}
      <h4 id="sketch">Sketch</h4>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2018-orderbook/logostory2018-004.png" alt="Food ordering app — Sketch" />
      </p>
      {"\n"}
      <h4 id="zeplin">Zeplin</h4>
      {"\n"}
      <ButtonLink href="http://zpl.io/aBqe1dO">View the design specs on Zeplin</ButtonLink>
      {"\n"}
      <Gallery images={[{
      "src": "/images/projects/2018-orderbook/zeplin-2.png",
      "width": 779,
      "height": 475,
      "alt": "Food ordering app — Zeplin (1 of 3)"
    }, {
      "src": "/images/projects/2018-orderbook/zeplin-3.png",
      "width": 780,
      "height": 473,
      "alt": "Food ordering app — Zeplin (2 of 3)"
    }, {
      "src": "/images/projects/2018-orderbook/zeplin-1.png",
      "width": 781,
      "height": 475,
      "alt": "Food ordering app — Zeplin (3 of 3)"
    }]} columns={1} fullWidth={true} />
      {"\n"}
      <h3 id="web-app-implementation">Web app implementation</h3>
      {"\n"}
      <p>My teammate lead the implementation in React.js and I helped with React such as QR Code creation rule, component styling based on Material-UI, Redux (shopping cart), and Swagger integration with the backend team.</p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2018-orderbook/logostory2018-006.png" alt="Food ordering app — Web app implementation" />
      </p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2018-orderbook/swagger.png" alt="Food ordering app — Web app implementation" />
      </p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2018-orderbook/develop-env.png" alt="Food ordering app — Web app implementation" />
      </p>
    </>;
}
