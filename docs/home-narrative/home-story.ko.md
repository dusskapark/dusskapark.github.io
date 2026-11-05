# 홈 소개 글과 장면 매핑 v0.5

작성: 2026-10-28. 매핑 갱신: 2026-10-29. 사용자가 직접 업데이트한 원고의 문장은 유지하고, 새로 언급된 프로젝트와 장면 연결을 반영한 검토용 문서다.

## 1. 글의 구성과 활동 구분

먼저 회사에서 어떤 일을 맡았고 책임의 범위가 어떻게 넓어졌는지 설명한다. 본업의 이야기는 Grab에서의 현재 역할까지 이어진다. 그다음 개인 프로젝트와 오픈소스 활동에서 무엇을 탐구하고 직접 만들어 왔는지 별도로 설명한다. 각 흐름 안에서 과거부터 최신 순서를 유지한다. 커뮤니티 리더십은 별도의 짧은 부분으로 둔다.

| 구분 | 이 흐름이 설명할 내용 | 선정한 사례와 순서 |
| --- | --- | --- |
| 본업의 커리어 | 회사에서 맡은 역할, 책임과 업무 범위의 발전. 개발자뿐 아니라 콘텐츠 창작자의 경험을 설계한 시기도 포함 | T store 개발자센터·ONE store 통합, LINE 게임 개발자 플랫폼, LDSG(LOOKBOOK 포함), NAVER NOW·TV 통합, 2023년부터 Grab Tech Infra 개발자 경험 |
| 개인 프로젝트와 오픈소스 | 컴퓨터 비전·AI를 실무 생산성에 적용해 온 탐구와 제품 제작의 확장 | Figma ML, Figma Autoname과 Klever, Grab이 공개한 TalkToFigma 기여 및 Desktop·MCP Magic 공동 제품화, 독립 서비스 나섬 셔틀 |
| 커뮤니티 리더십 | 다른 사람이 배우고 실험할 기회를 만든 활동 | 글·발표·오픈소스 공유, Friends of Figma Seoul 공동 운영과 프로그램 기획 |

Figma ML의 발표와 나섬 셔틀의 개발·배포를 회사에서 맡은 업무의 성과로 서술하지 않는다. TalkToFigma는 Grab에서 공개한 오픈소스라는 출처를 명시하고, 원본 도구 기여·Desktop 공동 제작·후속 공동 프로젝트의 결과를 구분한다. 이 활동을 모두 개인 소유의 프로젝트나 Grab의 정규 담당 업무로 단정하지 않는다.

LOOKBOOK은 LDSG와 같은 장에서 경력의 확장을 설명하는 배경으로 사용한다. 두 프로젝트를 하나의 제품이나 단순한 이름 변경으로 표현하지 않는다. T store는 커리어의 출발점으로 짧게 소개하고, ONE store에서 책임이 본격화된 전환에 무게를 둔다.

작업 기준은 [리뉴얼 결정 문서](redesign-brief.ko.md), 자기소개의 배경은 [이전 발표 자료 검토](intro-source-notes.ko.md), 인터랙션의 근거는 [레퍼런스 분석](reference-analysis.ko.md)에 있다.

## 2. 커버레터 초안

### 개발자 경험을 설계하고, 제품으로 만듭니다

저는 Grab에서 개발자 경험을 설계하는 프로덕트 디자이너 박주형입니다. 커리어 내내 개발자가 제품을 만들고 운영하는 환경을 다뤄 왔습니다. 업무에서 쌓은 경험을 바탕으로 직접 필요한 도구를 만들고, 새로운 기술을 실험하는 일도 함께해 왔습니다.

#### 개발자 경험을 만들어 온 커리어

2012년 [T store 개발자센터](https://api.metadata.co.kr/project/tstore)에서 개발자의 콘텐츠 등록·판매 절차를 다루며 일을 시작했습니다. 이후 참여한 [ONE store 통합 프로젝트](https://api.metadata.co.kr/project/onestore)에서는 여러 SKT, NAVER 등 여러 국내 Android 앱 마켓의 개발자 데이터를 통합하고, 달라지는 운영 정책을 협의하며 개발자에게 안내하는 일을 맡으며, 개발자 경험을 설계하는 커리어를 본격적으로 시작했습니다.

LINE에서는 [게임 개발자 플랫폼](https://api.metadata.co.kr/project/gdc)을 담당했습니다. SDK와 가이드를 찾고, 게임 빌드를 제출해 검수받는 개발자의 작업 과정을 설계했습니다. 여러 문서와 도구를 오가며 진행하던 일을 플랫폼 안에서 수행하고, 자신의 작업이 어느 단계에 있는지 확인할 수 있도록 기능과 안내를 정리했습니다.

개발·운영 도구를 계속 만들면서 비슷한 기능을 매번 새로 설계하고 구현하는 문제도 보였습니다. [LOOKBOOK](https://api.metadata.co.kr/project/lookbook)에서 공통 컴포넌트와 사용 규칙을 만들기 시작했고, 2019년에는 디자인 시스템 팀에 합류해서 [LINE Design System Global](https://api.metadata.co.kr/project/ldsg)을 담당하며 디자인 생산성 향상까지 시야를 넓혔습니다. 여러 지역의 디자이너와 엔지니어가 사용할 컴포넌트의 동작을 명세하고, 구현 방식을 논의하며 사용 문서를 배포하는 협업을 이끌었습니다. 개별 개발 도구에서 글로벌 디자인 시스템과 조직의 생산성을 다루는 일로 업무의 범위가 커졌습니다.

코로나19 시기에는 네이버로 이동해서 [NAVER NOW와 NAVER TV](https://api.metadata.co.kr/project/naver-now)의 통합 프로젝트에 참여했으며, 콘텐츠 크리에이터의 경험을 통합하는 제품을 설계하고 성공적으로 배포를 이끌었습니다.

2023년에는 싱가포르 Grab에 개발자 경험을 책임지는 회사의 첫 프로덕트 디자이너로 합류했습니다. 지금도 Grab의 Tech Infra 조직에서 개발자 경험을 맡아, 개발자가 사용하는 제품을 설계하고 직접 만드는 프로덕트 빌더로 일하고 있습니다.

#### 개인 프로젝트와 오픈소스

본업에서 마주친 문제는 개인적인 탐구의 출발점이 되기도 했습니다. 디자인 시스템의 규칙을 제대로 쓰고 있는지 사람이 일일이 확인하는 부담을 머신러닝과 컴퓨터 비젼으로 다뤄본 것이, 2021년에 시작한 개인 프로젝트 [Figma ML](https://api.metadata.co.kr/project/tensorflow-js)입니다. UI 요소를 인식하는 모델을 학습시키고, 디자인 시스템의 오류를 검사하는 도구를 Figma와 Zeplin에서 사용할 수 있도록 만들었습니다.

이 작업을 DEVIEW 2021에서 소개한 데 이어, [Google TensorFlow Show & Tell](https://www.youtube.com/watch?v=blL0EQ6wNH8)과 [Figma Config 2022](https://www.youtube.com/watch?v=ckN1QIpjkAk)에서도 발표했습니다. 실제로 겪은 관리 문제를 풀기 위해 시작한 실험을 글로벌 개발자·디자이너에게 소개할 수 있었습니다. 학습 데이터를 준비하고 모델을 제품에 적용하는 경험까지 쌓으며, 생산성 문제를 다룰 수 있는 방법도 넓어졌습니다.

이후에도 컴퓨터 비전 (CV)와 컴퓨터 유즈 에이전트(CUA) 와 같은 기술들에 계속해서 관심을 가지고 보고 있으며 2023년에는 [Figma Autoname](https://api.metadata.co.kr/project/figma-autoname), 2024년에는 [Klever (Self Explorer)](https://api.metadata.co.kr/project/klever)와 같이 AI/ML을 이용해서 사용자의 디자인 및 제품 개발 생산성을 향상시키는 다양한 응용 제품들을 꾸준히 만들며 실험해보고 있습니다.

Klever에서 진행한 AI 기반 사용성 테스트 실험은 이동연님과 함께 인프런이 주최한 [인프콘 2024](https://www.youtube.com/watch?v=JVfpIy5LhJ8)에서도 발표했습니다.

AI가 본격적으로 제품 생산성에 영향을 주기 시작한 다음부터는 오픈소스로 도구를 직접 만들고 개선하는 일을 더 적극적으로 이어갔습니다. 2025년에는 Grab이 오픈소스로 공개한 [TalkToFigma](https://api.metadata.co.kr/project/talk-to-figma-mcp)에 핵심 자동화 기능을 기여했습니다.

워크숍에서 설치와 설정 단계에 막히는 사용자를 보며 동료들과 [TalkToFigma Desktop](https://api.metadata.co.kr/project/talk-to-figma-mcp)을 만들었고, 실행과 설정, 연결 상태를 한곳에서 다룰 수 있게 했습니다. 사용자가 자동화 기능을 실제로 써볼 수 있도록 준비 과정을 제품으로 만든 작업입니다. 이 데스크톱 앱 오픈소스를 바탕으로 Friends of Figma Seoul 팀에서 제품으로 발전시킨 [MCP Magic](https://api.metadata.co.kr/blog/mcp-magic-retrospective)에는 2026년 6월까지 57만여 건의 MCP 도구 호출을 기록하는 의미있는 성과를 얻었습니다.

2026년에는 AI 코딩 도구들을 활용한 새로운 워크플로우를 통해서 iOS, Android 등 여러 플랫폼에 커뮤니티를 위한 앱들을 만들어서 출시했습니다. 그중 [나섬 셔틀 플랫폼](https://api.metadata.co.kr/project/how-far-can-a-product-designer-build-with-codex)에서는 Codex와 함께 서비스 구조와 API를 설계하고, 승객과 운전자를 위한 iOS·Android 앱과 서버를 직접 만들었습니다. 이 프로젝트로 [OpenAI Builder Day Seoul에서 1등](https://www.linkedin.com/pulse/codex-remote%EB%A1%9C-%ED%9C%B4%EB%8C%80%ED%8F%B0%EC%97%90%EC%84%9C-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%95%B1%EC%9D%84-%EC%B6%9C%EC%8B%9C%ED%95%9C-%EB%B0%A9%EB%B2%95-seowoo-han-7dfxc/)을 차지했습니다.

#### 커뮤니티 리더십

배우고 만든 경험은 글과 발표, 오픈소스로 공유해 왔습니다. 2020년 무렵부터 운영진으로 활동하고 있는 [Friends of Figma Seoul](https://friends.figma.com/seoul/)에서는 2026년 10월까지 온라인·오프라인·하이브리드 행사 21회가 열렸습니다. 행사별 대시보드에는 총 1,775건의 등록과 904건의 체크인이 기록돼 있습니다.

동료 리더들과 함께 밋업과 실습 워크숍을 기획하며, AI 사용성 테스트와 MCP 디자인 자동화 같은 주제를 실제 사례로 나눕니다. 다른 디자이너도 자신의 작업에서 새로운 도구를 직접 써볼 수 있도록 돕는 일입니다.

본업에서는 개발자가 더 잘 만들 수 있는 환경을 설계하고, 개인 프로젝트와 오픈소스에서는 직접 제품을 만들며 설계의 범위를 넓혀 왔습니다. 개발자 경험이라는 전문성을 바탕으로, 제품의 개발과 운영까지 책임지는 프로덕트 빌더로 일하고 있습니다.

## 3. 글을 읽으며 탐색할 대표 장면

본문의 링크는 검토 단계에서 현재 공개된 기존 프로젝트·글 상세 페이지로 직접 이동한다. 아래의 상세 경로는 이후 홈에서 사용할 내부 라우트다. 이후 홈에서는 해당 문구가 오른쪽 장면을 선택하고, 장면의 상세 보기 링크가 해당 프로젝트 페이지로 이동한다. 본업·개인 및 오픈소스·커뮤니티의 흐름을 구분하면서도 하나의 읽기 경험으로 이어간다.

| ID | 활동 구분 | 시기 | 본문 표식 | 장면이 보여줄 내용 | 오른쪽 자료와 상세 진입 |
| --- | --- | --- | --- | --- | --- |
| H00 | 소개 | 현재 | 첫 문단 | 개발자 경험 디자이너의 현재 정체성과 직접 만드는 활동 | 기본 키 비주얼. 소재 미정 |
| C01 | 본업 | 2012년 경력 시작 / 2015년 통합 프로젝트 | T store 개발자센터·ONE store 통합 프로젝트 | 개발자센터에서 출발해 책임 범위가 데이터·운영 정책으로 넓어짐 | 통합 개발자센터와 T store 화면. `/project/onestore`, 보조 `/project/tstore` |
| C02 | 본업 | LINE / 사례 기록 2017 | 게임 개발자 플랫폼 | 게임 개발자의 가이드·빌드 제출·검수 작업 | GDC 화면. `/project/gdc` |
| C03 | 본업 | 2019–2020 | LOOKBOOK·LINE Design System Global | LOOKBOOK을 거쳐 디자인 시스템 팀과 글로벌 생산성으로 확장 | 두 표식은 같은 디자인 시스템 장에 속한다. 컴포넌트·명세·사용 문서. `/project/ldsg`, 보조 `/project/lookbook` |
| C03N | 본업 | NAVER / 사례 기록 2022 | NAVER NOW와 NAVER TV | 개발자 도구에서 콘텐츠 크리에이터와 운영자의 경험으로 시야가 확장된 시기 | `/images/projects/2022-naver-now/Portfolio.008.png`, `/project/naver-now`. 아래 공개·범위 메모 참조 |
| C04 | 본업 | 2023년 Grab 합류 / 현재 | Grab의 개발자 경험 | Tech Infra 조직에서 첫 개발자 경험 프로덕트 디자이너로 합류해 현재까지 담당하는 역할 | 구체적인 대표 업무·판단·성과 자료를 사용자 설명 후 선정 |
| E01 | 개인 프로젝트 | 2021–2022 | Figma ML | 머신러닝을 적용한 도구와 DEVIEW·TensorFlow·Config 발표 성과 | UI 인식·검사 데모와 발표 기록. `/project/tensorflow-js` |
| E01G | 발표 | Figma ML / Google | Google TensorFlow Show & Tell | Figma ML 실험과 구현을 소개한 Google 발표 | [발표 영상](https://www.youtube.com/watch?v=blL0EQ6wNH8). 이 표식을 선택하면 오른쪽에 해당 YouTube 영상 표시 |
| E01F | 발표 | Figma ML / Figma Config 2022 | Figma Config 2022 | 디자인 시스템과 TensorFlow를 활용한 도구를 소개한 Config 발표 | [발표 영상](https://www.youtube.com/watch?v=ckN1QIpjkAk). 이 표식을 선택하면 오른쪽에 해당 YouTube 영상 표시 |
| E01A | 개인·오픈소스 | 2023 | Figma Autoname | 컴퓨터 비전 모델을 디자인 시스템에 맞게 활용하고 Dev Mode에서 개발자 가이드를 제공 | `/images/projects/2023-figma-autoname/markdown004.gif`, `/project/figma-autoname` |
| E01B | 개인·공동 프로젝트 / 발표 | 2024 | Klever (Self Explorer)·인프콘 2024 | AI가 Figma 프로토타입을 탐색해 사용성 문제를 찾는 실험과 공동 발표 | 두 표식 모두 [인프콘 발표 영상](https://www.youtube.com/watch?v=JVfpIy5LhJ8)을 오른쪽에 표시. 프로젝트 상세는 `/project/klever` |
| E02 | 회사에서 공개한 오픈소스에 대한 기여·공동 제품화 | 2025 / 후속 기록 2026.06까지 | TalkToFigma·MCP Magic | 원본 기여, Desktop 제작, 후속 프로젝트의 실제 사용 | 자동화·설정·연결 데모와 사용 기록. `/project/talk-to-figma-mcp`, 보조 `/blog/mcp-magic-retrospective` |
| E03 | 독립 서비스 | 2026 | 나섬 셔틀 플랫폼 | 문제 정의부터 서버·API·앱·배포와 운영 피드백까지 책임지는 빌딩 | 승객·Driver 앱과 배포 근거. `/project/how-far-can-a-product-designer-build-with-codex` |
| L01 | 커뮤니티 | 2020–2026.10.29 기록 기준 | Friends of Figma Seoul | 커뮤니티의 완료 행사 21회, 행사별 등록 합계 1,775건과 체크인 합계 904건. 동료 리더들과 프로그램을 공동 기획 | 공식 커뮤니티 소개, 밋업·MCP 실습 자료와 기록 기준이 명시된 수치. [집계 근거](leadership-evidence.ko.md) |
| H99 | 마무리 | 현재 | 마지막 문단 | 본업의 전문성과 개인·오픈소스에서 넓혀 온 제작 역량 | 기본 키 비주얼로 복귀, 기존 연락 수단 |

### 발표 영상 연결

| 본문에서 선택할 표식 | 오른쪽에 표시할 영상 | YouTube 플레이어 주소 | 프로젝트 상세 |
| --- | --- | --- | --- |
| Google TensorFlow Show & Tell | [Google 발표](https://www.youtube.com/watch?v=blL0EQ6wNH8) | `https://www.youtube.com/embed/blL0EQ6wNH8` | `/project/tensorflow-js` |
| Figma Config 2022 | [Figma Config 발표](https://www.youtube.com/watch?v=ckN1QIpjkAk) | `https://www.youtube.com/embed/ckN1QIpjkAk` | `/project/tensorflow-js` |
| Klever (Self Explorer) 또는 인프콘 2024 | [인프콘 발표](https://www.youtube.com/watch?v=JVfpIy5LhJ8) | `https://www.youtube.com/embed/JVfpIy5LhJ8` | `/project/klever` |

표식을 선택하면 해당 영상을 오른쪽 미디어 영역에 표시하고, 프로젝트 상세와 YouTube 원본은 별도 링크로 제공한다. 모바일에서는 선택한 문단 아래에 영상을 표시한다. 이는 다음 구현을 위한 연결 명세이며, 실제 홈의 스크롤 트리거와 플레이어는 아직 구현되지 않았다.

**원고에서 읽히는 의도:** 본업의 커리어에서는 개발자 경험을 담당한 출발점, 디자인 시스템과 콘텐츠 창작자 경험으로 넓어진 범위, Grab에서 계속해 온 전문성을 보여준다. 별도의 탐구에서는 Figma ML의 머신러닝 실험이 Autoname·Klever 등 생산성 도구로 이어지고, TalkToFigma의 오픈소스 기여와 나섬 셔틀의 엔드투엔드 빌딩으로 확장되는 관심을 보여준다. 커뮤니티는 그 경험을 다른 사람과 나누는 리더십이다. 이는 작성된 원고를 바탕으로 한 편집 해석이며, 추가로 강조할 판단은 사용자와 계속 다듬는다.

각 흐름의 시기는 사용자 원고와 사례 기록을 따른다. Grab 합류 시기는 사용자가 원고에 적은 2023년을 사용한다. 다른 흐름으로 넘어갈 때 시작 연도가 되돌아오는 것은 소제목과 활동 구분으로 안내한다.

## 4. 근거와 편집 판단

| 내용 | 근거 | 활동과 성과의 구분 |
| --- | --- | --- |
| 본업의 순서와 현재 Grab 역할 | 사용자 업데이트 원고, [과거 자기소개 검토](intro-source-notes.ko.md) | 2023년 Grab 합류, 첫 개발자 경험 프로덕트 디자이너, Tech Infra 소속은 사용자 원고에 근거. 대표 업무별 지표와 상세 자료는 아직 정하지 않음 |
| ONE store의 책임 확장 | 사용자 답변, [ONE store](../../content/projects/onestore.mdx), [T store](../../content/projects/tstore.mdx) | 회사 프로젝트. 데이터 통합·정책 협의·개발자 안내를 본인 업무로 기술하고, 전체 통합의 단독 총괄이나 플랫폼 전체 성장 수치를 개인 성과로 쓰지 않음 |
| 게임 개발자 경험 | [GDC](../../content/projects/gdc.mdx) | 회사 프로젝트의 가이드·빌드 제출·검수 설계 |
| LOOKBOOK·LDSG | 사용자 답변, [LOOKBOOK](../../content/projects/lookbook.mdx), [LDSG](../../content/projects/ldsg.mdx) | 회사 프로젝트를 한 장에서 다룸. 개별 도구에서 글로벌 디자인 시스템으로 역할이 확장된 경력 |
| NAVER NOW·TV | 사용자 업데이트 원고, [NAVER NOW 사례](../../content/projects/naver-now.mdx) | 기존 상세는 통합 프로젝트 전체가 아니라 그 안의 콘텐츠 추천·운영 도구 사례다. `listed: false`라 프로젝트 목록에 나타나지 않지만 직접 주소와 sitemap에 있는 기존 공개 경로다. 연결하더라도 목록 설정을 변경하지 않는다. |
| Figma ML | 사용자 선정, [TensorFlow.js 사례](../../content/projects/tensorflow-js.mdx) | 개인 실험과 오픈소스 공개. 기존 상세의 Google Show & Tell·Figma Config 발표 URL을 각각 별도 영상 표식에 사용한다. 당시 회사의 공식 프로젝트 실적으로 취급하지 않음 |
| Figma Autoname·Klever | 사용자 업데이트 원고, [Figma Autoname](../../content/projects/figma-autoname.mdx), [Klever](../../content/projects/klever.mdx) | 사용자가 직접 추가한 두 사례를 각각 해당 상세에 연결한다. Self Explorer는 Klever와 같은 프로젝트의 다른 이름이다. 기존 Klever 상세의 인프콘 2024 YouTube 영상과 [인프런 공식 발표 목록](https://www.inflearn.com/course/%EC%9D%B8%ED%94%84%EC%BD%982024-%EB%8B%A4%EC%8B%9C%EB%B3%B4%EA%B8%B0?cid=334645)에서 박주형·이동연의 공동 발표를 확인했다. |
| TalkToFigma·Desktop | 사용자 설명, [TalkToFigma](../../content/projects/talk-to-figma-mcp.mdx) | Grab이 공개한 원본 오픈소스에 대한 기여와 동료들과의 Desktop 제작. 전부 개인 소유이거나 전부 정규 담당 업무라고 단정하지 않음 |
| MCP Magic 사용 기록 | [공개 회고](../../content/posts/mcp-magic-retrospective.mdx) | 후속 공동 프로젝트의 570,373건 도구 호출. GA4 요청 범위 2025.07.01–2026.06.30, 유효 기록은 2025.08부터. 개인 실적·Grab 내부 사용량으로 표현하지 않음 |
| 나섬 셔틀 | [셔틀 사례](../../content/projects/how-far-can-a-product-designer-build-with-codex.mdx), [1등 발표 사진](../../images/projects/2026-rider-driver-codex/24_openai_builder_day_2026.jpeg) | 셔틀 표식은 앱 시연을 열고, 수상 표식은 현재 언어의 LinkedIn 제작기로 이동한다. 수상 문구를 읽는 위치에는 1등 발표 사진을 표시한다. 제작 과정은 [한국어 LinkedIn 글](https://www.linkedin.com/pulse/codex-remote%EB%A1%9C-%ED%9C%B4%EB%8C%80%ED%8F%B0%EC%97%90%EC%84%9C-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%95%B1%EC%9D%84-%EC%B6%9C%EC%8B%9C%ED%95%9C-%EB%B0%A9%EB%B2%95-seowoo-han-7dfxc/)과 [영어 LinkedIn 글](https://www.linkedin.com/pulse/shipping-mobile-app-from-phone-codex-remote-seowoo-han-kd9rc/)로 안내한다. |
| 커뮤니티 리더십 | [리더십 근거](leadership-evidence.ko.md) | 공동 프로그램 기획·교육 활동으로 기술. 회사에서의 인사 관리 책임과 구분 |

## 5. 남은 내용

사용자가 업데이트한 원고의 NAVER NOW·TV, Figma Autoname, Klever를 각각 기존 상세에 연결했다. Form Helper 등 언급하지 않은 프로젝트는 추가하지 않고, LIFF도 독립적인 대표 장면으로 만들지 않았다. 원고의 문장 내용과 기존 상세 문서·목록 설정은 수정하지 않았다.

Grab에서 담당한 대표 업무 한 가지의 문제·본인의 판단·결과가 추가되면 C04와 해당 문단을 구체화한다. TalkToFigma의 오픈소스 기여는 이 내용의 대체 근거로 사용하지 않는다.

프로젝트 및 커뮤니티 리더십의 구체적인 행동, 최종 게시 언어와 문장 길이, 키 비주얼은 다음 편집에서 다룬다. 이번 작업은 문서와 장면 매핑이며 사이트 구현은 시작하지 않았다.
