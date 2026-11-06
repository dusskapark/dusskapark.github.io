import { ContentImage } from "@/components/content/content-elements";

export const frontmatter = {"kind":"project","slug":"tstore","title":"T store Developer Center 3.0","description":"T store Developer Center는 App, VOD, E-book등 다양한 콘텐츠를 T store Mall에서 자유롭게 등록 및 판매할 수 있도록 거래를 중계하는 플랫폼이다. 상품을 판매하기 위해 필수적인 Developer Center는 2010년 2.0 고도화가 진행된 이후 별도의 개선작업을 진행하지 못하였다. 우리는 빠르게 변화하는 시장 환경을 분석하여, 현재 개발자센터의 문제점을 파악하고, 해결하기 위해 ”T store Develop Center 3.0” 프로젝트를 수행하였다.","date":"2013-10-01","lang":"ko","listed":true,"hero":"/images/projects/2013-tstore/img_developer_012.png","legacyPaths":["/project/tstore.html","/project/tstore/"],"subtitle":"DEV TOOL (2013)","team":"진헌규 (Lead), 이정재, 박주형(Me), 이일환, 선영지, 이광표, 김지혜, 안송이, 최윤미, 윤혜진, 김태숙, 강송희","role":"Assistant Product Designer","accentColor":"#4C60E6","galleryImages":["/images/projects/2013-tstore/img_developer_012.png"],"sourceFile":"_projects/2013-10-01-tstore.md","headings":[{"depth":3,"text":"Overview","id":"overview"},{"depth":3,"text":"Analysis & Ideation","id":"analysis--ideation"},{"depth":4,"text":"Analysis","id":"analysis"},{"depth":4,"text":"Ideation","id":"ideation"},{"depth":3,"text":"Concept & Rules","id":"concept--rules"},{"depth":3,"text":"Output","id":"output"}]};

export default function TstoreContent() {
  return <>
      <p>
        <ContentImage src="/images/projects/2013-tstore/img_developer_02.png" alt="T store Developer Center 3.0" />
      </p>
      {"\n"}
      <h3 id="overview">Overview</h3>
      {"\n"}
      <p>T store Developer Center는 App, VOD, E-book등 다양한 콘텐츠를 T store Mall에서 자유롭게 등록 및 판매할 수 있도록 거래를 중계하는 플랫폼이다.</p>
      {"\n"}
      <p>상품을 판매하기 위해 필수적인 Developer Center는 2010년 2.0 고도화가 진행된 이후 별도의 개선작업을 진행하지 못하였다.Rightbrain에서는 빠르게 변화하는 시장 환경을 분석하여, 현재 개발자센터의 문제점을 파악하고, 해결하기 위해 ”T store Develop Center 3.0” 프로젝트를 수행하였다.</p>
      {"\n"}
      <ContentImage src="/images/projects/2013-tstore/img_developer_03.png" alt="img_developer_03" style={{
      "zoom": "50%"
    }} />
      {"\n"}
      <h3 id="analysis--ideation">{"Analysis & Ideation"}</h3>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2013-tstore/img_developer_05.png" alt="T store Developer Center 3.0 — Analysis & Ideation" />
      </p>
      {"\n"}
      <h4 id="analysis">Analysis</h4>
      {"\n"}
      <h5 id="복잡함-메뉴-구조와-비슷한-성격의-메뉴-존재">복잡함 메뉴 구조와 비슷한 성격의 메뉴 존재</h5>
      {"\n"}
      <p>다운로드, 연동규격, 기술지원등 공통된 성격을 가진 메뉴가 각기 분리되어 제공되기에 메뉴에 대한 접근성 및 사용성이 떨어짐. 이 외 현 개발자PoC 메뉴들은 개발자Cycle을 고려치 않은 나머지, 접근성과 사용성이 떨어진 메뉴 구조를 제공하고 있음.</p>
      {"\n"}
      <h5 id="사용이-어려운-기능에-대한-개선-필요">사용이 어려운 기능에 대한 개선 필요</h5>
      {"\n"}
      <p>상품 등록 시 프로비저닝 정보 및 대상 단말 설정 시 Process가 복잡하며, 사용이 어려움.</p>
      {"\n"}
      <h5 id="좁은-정보-영역에-대한-불편함">좁은 정보 영역에 대한 불편함</h5>
      {"\n"}
      <p>정산 내역 제공 시 수치로만 제공되기에, 판매에 대한 변화량을 파악하기 어려우며, 수치를 제공하는 현재 화면 역시 개발자가 보기 어려우며, 복잡함.</p>
      {"\n"}
      <h5 id="현재는-t-store-국내를-기준으로만-화면-설계-및-구조가-설계되어-있음">현재는 T store 국내를 기준으로만 화면 설계 및 구조가 설계되어 있음</h5>
      {"\n"}
      <hr />
      {"\n"}
      <h4 id="ideation">Ideation</h4>
      {"\n"}
      <h5 id="uigui">UI/GUI</h5>
      {"\n"}
      <ul>
        {"\n"}
        <li>IA에 대한 재정리 및 메뉴의 통폐합</li>
        {"\n"}
        <li>기능에 대한 Process 재정의 및 이에 따른 Work-Flow 재정립</li>
        {"\n"}
        <li>주요 서비스인 상품 등록 및 관리를 쉽게 할 수 있는 UI 제공</li>
        {"\n"}
        <li>In-App 및 쿠폰 등 마케팅 메뉴들과도 쉽게 연계할 수 있도록 특화된 메뉴로 제공</li>
        {"\n"}
      </ul>
      {"\n"}
      <h5 id="design">Design</h5>
      {"\n"}
      <ul>
        {"\n"}
        <li>확장성을 고려한 레이아웃 제공</li>
        {"\n"}
        <li>Global Market으로 확장성을 고려한 화면 및 구조 설계 진행</li>
        {"\n"}
        <li>수치 데이터등에 대해선 그래프등을 활용하여 쉽게 인지할 수 있도록 개선</li>
        {"\n"}
      </ul>
      {"\n"}
      <h3 id="concept--rules">{"Concept & Rules"}</h3>
      {"\n"}
      <h4 id="uigui-1">{"UI&GUI"}</h4>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2013-tstore/devCenter2013-004.png" alt="T store Developer Center 3.0 — UI&amp;GUI" />
      </p>
      {"\n"}
      <p>기존 2.0의 문제점이었던 복잡함과 답답함을 해결하기 위해 Panel Type의 Grid 구조로 Content를 구성하였으며, 사용자 해상도에 반응하는 확장성을 고려한 레이아웃을 제공하였다.</p>
      {"\n"}
      <h4 id="icon">Icon</h4>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2013-tstore/devCenter2013-005.png" alt="T store Developer Center 3.0 — Icon" />
      </p>
      {"\n"}
      <p>개발자센터에서 제공하는 메뉴와 기능들에 대해 쉽고 빠르게 접근할 수 있으며 사용할 수 있도록 시각화한 Icon으로 제공하였으며, Icon은 일관성 있으며, 시각적 산만함을 최소화할 수 있도록 제작하였다.</p>
      {"\n"}
      <h4 id="color">Color</h4>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2013-tstore/devCenter2013-006.png" alt="T store Developer Center 3.0 — Color" />
      </p>
      {"\n"}
      <p>T store와의 이질감이 들지 않도록 주요 Key Color에 대해선 일관성 있게 사용하였으며, Global 진출 시 해외 개발자들 에게도 쉽게 다가가기 위해 부드럽고, 따뜻한 Color를 사용하였다.</p>
      {"\n"}
      <h3 id="output">Output</h3>
      {"\n"}
      <p>
        <ContentImage src="/images/projects/2013-tstore/img_developer_07.png" alt="T store Developer Center 3.0 — Output" />
      </p>
    </>;
}
