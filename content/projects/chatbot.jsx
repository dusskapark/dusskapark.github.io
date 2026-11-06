import { MediaEmbed } from "@/components/content";
import { ContentImage, ContentLink } from "@/components/content/content-elements";

export const frontmatter = {"kind":"project","slug":"chatbot","title":"Chatbot Project","description":"An intelligence chat-bot powered by Google analytics, Dialogflow and LINE API.","date":"2016-12-01","lang":"en","listed":true,"hero":"/images/projects/2016-chatbot/placeit01-2546.jpg","legacyPaths":["/project/chatbot.html","/project/chatbot/"],"subtitle":"SIDE PROJECT (2016)","team":"Heonkyu Jin (Lead), JooHyung Park (me), JinSeung Lee, and Dukmin Jung","role":"Project Lead","accentColor":"#4C60E6","galleryImages":["/images/projects/2016-chatbot/placeit01-2546.jpg"],"sourceFile":"_projects/2016-12-01-chatbot.md","headings":[{"depth":3,"text":"Project background","id":"project-background"},{"depth":3,"text":"Key features","id":"key-features"},{"depth":3,"text":"Skills","id":"skills"},{"depth":3,"text":"Concept video","id":"concept-video"}]};

export default function ChatbotContent() {
  return <>
      <p>Rookie-san is an intelligent chatbot that automatically creates charts by extracting necessary data from Google Analytics according to the context of the chat.</p>
      {"\n"}
      <ul>
        {"\n"}
        <li>
          {"Github: "}
          <ContentLink href="https://github.com/rookie-san/rookie-san">https://github.com/rookie-san/rookie-san</ContentLink>
        </li>
        {"\n"}
      </ul>
      {"\n"}
      <MediaEmbed src={"https://www.slideshare.net/slideshow/embed_code/key/yh1FVzr7d0j3D6"} title={"Chatbot Project — video 2"} aspectRatio={"595 / 485"} />
      {"\n"}
      <div style={{
      "marginBottom": "5px"
    }}>
        {" "}
        <strong>
          {" "}
          <a href="https://www.slideshare.net/dusskapark/google-analytics-chatbot-rookiesan" title="Google Analytics Chatbot - Rookiesan" target="_blank" rel="noopener noreferrer">Google Analytics Chatbot - Rookiesan</a>
          {" "}
        </strong>
        {" from "}
        <strong>
          <a href="https://www.slideshare.net/dusskapark" target="_blank" rel="noopener noreferrer">JooHyung Park</a>
        </strong>
        {" "}
      </div>
      {"\n"}
      <hr />
      {"\n"}
      <p>​</p>
      {"\n"}
      <h3 id="project-background">Project background</h3>
      {"\n"}
      <p>Most people working in the Internet service industry have the same habit of checking statistics on a daily basis through tools like Google Analytics. And I thought this pattern was inconvenient. I believed that if we could connect the Google Analytics API with messengers like Kakaotalk or LINE, which Koreans and Koreans use every day, we would be able to free people from this annoying routine and started the project with the node js study team.</p>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2016-chatbot/image-20200831005107814.png" alt="Chatbot Project — Project background" />
      </p>
      {"\n"}
      <h3 id="key-features">Key features</h3>
      {"\n"}
      <ul>
        {"\n"}
        <li>Google Analytics integration with chatroom</li>
        {"\n"}
        <li>Natural language processing by using Dialogflow</li>
        {"\n"}
        <li>Draw a chart and callback it to chatroom</li>
        {"\n"}
      </ul>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2016-chatbot/image-20200831005014833.png" alt="Chatbot Project — Key features" />
      </p>
      {"\n"}
      <h3 id="skills">Skills</h3>
      {"\n"}
      <ul>
        {"\n"}
        <li>Node js, R server, Dialogflow</li>
        {"\n"}
        <li>LINE messaging API, Google Analytics API, Google oAuth,</li>
        {"\n"}
        <li>Amazon C9, Heroku, Github</li>
        {"\n"}
      </ul>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2016-chatbot/image-20200831012016128.png" alt="Chatbot Project — Skills" />
      </p>
      {"\n"}
      <h3 id="concept-video">Concept video</h3>
      {"\n"}
      <p>This video is edited with real screen capture of working chatbot application.</p>
      {"\n"}
      <MediaEmbed src={"/images/projects/2016-chatbot/normal-4819.mp4"} title={"Chatbot Project — video"} fullWidth={false} />
    </>;
}
