---
title: "TalkToFigma MCP:<br>AI 디자인 생산성 혁신의 선구자"
subtitle: "Figma + AI project (2025)"
date: 2025-07-14 00:00:00
description: "CTTF 프로젝트에 적극적으로 기여하며 핵심 자동화 기능을 개발하여 2번째 코드 기여자가 되었습니다. 이후 조직 및 커뮤니티 전파 과정에서 비-엔지니어 사용자의 설치/재사용 문제를 발견하고, 이를 해결하기 위해 Kotlin Compose 데스크톱 앱을 개발함으로써 프로젝트의 대중화를 이끌었습니다."
featured_image: "2025-talk-to-figma-mcp/hero.png"
gallery_images: "2025-talk-to-figma-mcp/hero.png"
team: JooHyung (Lead Contributor & Desktop Solution Lead), Sonny Lazuardi (Original Creator), Jin, Yiseo (Desktop App Co-Developers)
role: Solution Lead, Contributor (2nd Coder)
visible: false
---

## Introducing TalkToFigma MCP

Sonny Lazuardi가 시작한 `cursor-talk-to-figma-mcp` 프로젝트는 Cursor Agentic AI가 Figma와 직접 대화하며 디자인을 자동화하는 혁신적인 '바이브 디자인' 도구입니다.

저는 **5.5k+ Stars 프로젝트의 2nd Major Contributor**로서 디자이너들이 Figma에서 겪는 반복적인 작업들—더미 데이터 입력, 주석 변환, 인스턴스 오버라이드 전파, DevMode 통합—을 AI가 자연어 명령만으로 처리할 수 있게 하는 **디자인 자동화 핵심 기능들을 직접 개발**했습니다. 이러한 기능들은 기존에 여러 플러그인(Google Sheet, Eightshapes Specs, Instance Util 등)으로 해결하던 작업을 하나의 통합된 AI 자동화 시스템으로 대체합니다.

<br>
<div style="text-align: center; margin-top: 20px;">
  <a href="https://github.com/grab/cursor-talk-to-figma-mcp" target="_blank" style="display: inline-flex; align-items: center; padding: 10px 20px; background-color: #333333; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" height="24" style="max-height: 24px; margin-right: 10px;">
    View cursor-talk-to-figma-mcp
  </a>
</div>
<br>

## The Spark & action

이 프로젝트는 Grab의 Lead UX Engineer인 Sonny Lazuardi가 디자이너들이 Figma에서 겪는 끝없는 반복적인 작업(텍스트 업데이트, 레이어 정리 등)을 자동화하고자 시작한 `cursor-talk-to-figma-mcp`에 대한 강한 영감으로 시작되었습니다.

원본 프로젝트는 바이브 디자인을 위한 도구로 시작했으나, 저는 이 도구가 단순한 보조 도구를 넘어 **디자인 자동화 및 생산성 향상**을 위한 핵심 플랫폼이 될 잠재력을 확신했습니다. 

저의 접근은 단순했습니다. **"Vibe 디자인? AI 프롬프팅? 뭘 만들어야 힙한가?"** 같은 건 신경 안 쓰고, 그냥 제가 매일 쓰는 Figma 플러그인들을 하나씩 MCP 툴로 만들기 시작했습니다. 이 작은 취미가 신세계를 열어줄 줄은 몰랐습니다.

저는 즉시 코드 컨트리뷰션을 시작했고, 일상 업무용 플러그인들을 MCP 툴로 옮기는 과정에서 각 기능이 Cursor AI와 만나면서 완전히 다른 차원으로 진화하는 것을 경험했습니다.

### 내가 개발한 핵심 MCP 자동화 기능들

| 기능 | 참고한 플러그인 | MCP Magic | 
|------|----------------|-------------------------------------|
| **Smart Data Population** | Google Sheets Sync | "이 카드에 @Web 한국 레스토랑 5개 데이터를 넣어줘"라고 말하면, AI가 실제 데이터를 검색해서 가져와서 각 카드의 텍스트, 가격까지 자동으로 채워줌. 스크린샷이나 JSON 데이터도 가능! | 
| **Legacy Annotation Converter** | Eightshapes Specs | "어노테이션을 업그레이드 해줘"라고 말하면, AI가 수백 개의 어노테이션을 분석하고 위치, 내용 등을 이해해서 엔지니어에게 핸드오버하는 수준의 고품질 주석으로 업그레이드 | 
| **Instance Override Propagation** | Instance Util | "선택한 노드의 모든 빈 슬롯을 소스 인스턴스의 것으로 채워줘"라고 말하면, AI가 컴포넌트 구조를 이해하고 인스턴스를 일괄 오버라이드 적용. |
| **DevMode Integration** |  | "이 화면의 접근성 문제를 찾아서 주석으로 달아줘"라고 말하면, AI가 DevMode 데이터(색상, 타이포, 간격)를 읽고 다각도 UX 분석을 수행한 뒤 개선 제안을 Figma 주석으로 자동 생성. |

**핵심 차이점**: 기존 플러그인들은 정해진 워크플로우만 자동화했지만, MCP는 AI가 컨텍스트를 이해하고 자연어 명령에 따라 **유연하게 작동**합니다. 마치 옆에 디자이너 동료가 있는 것처럼 대화하며 복잡한 작업을 즉시 처리할 수 있습니다.

> *다양한 기여 활동*

{::options parse_block_html="false" /}
{% capture embed_codes %}
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">✨ Remember Google Sheets sync? Now imagine that with <a href="https://twitter.com/cursor_ai?ref_src=twsrc%5Etfw">@cursor_ai</a> ! Added smart data population to <a href="https://twitter.com/sonnylazuardi?ref_src=twsrc%5Etfw">@sonnylazuardi</a>&#39;s Talk-to-Figma MCP. This is just the beginning of how AI transforms design workflows 🪄 <a href="https://t.co/490fdRWYyt">https://t.co/490fdRWYyt</a> <a href="https://twitter.com/figma?ref_src=twsrc%5Etfw">@figma</a> <a href="https://twitter.com/hashtag/figmaMCP?src=hash&amp;ref_src=twsrc%5Etfw">#figmaMCP</a> <a href="https://twitter.com/adispezio?ref_src=twsrc%5Etfw">@adispezio</a> <a href="https://twitter.com/zoink?ref_src=twsrc%5Etfw">@zoink</a></p>&mdash; Jude_Park (@dusskapark) <a href="https://twitter.com/dusskapark/status/1907306574810693691?ref_src=twsrc%5Etfw">April 2, 2025</a></blockquote>
|||
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">1/5 &quot;Vibe design&quot;? &quot;Vibe coding&quot;? What about &quot;vibe instance swap&quot;? 🙄 THREAD: 3 productivity hacks using <a href="https://twitter.com/figma?ref_src=twsrc%5Etfw">@figma</a> MCP that will save you HOURS every week ⚡️ Starting with &#39;Instance swap+overrides&#39;: <a href="https://t.co/Lrshzs6k0d">pic.twitter.com/Lrshzs6k0d</a></p>&mdash; Jude_Park (@dusskapark) <a href="https://twitter.com/dusskapark/status/1912179210892059099?ref_src=twsrc%5Etfw">April 15, 2025</a></blockquote>
|||
<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/figma?ref_src=twsrc%5Etfw">@figma</a> &#39;s native annotations are amazing, but what about all those legacy markers you&#39;ve created?<br><br>With <a href="https://twitter.com/cursor_ai?ref_src=twsrc%5Etfw">@cursor_ai</a> and <a href="https://twitter.com/sonnylazuardi?ref_src=twsrc%5Etfw">@sonnylazuardi</a> &#39;s Figma MCP, converting them is just one conversation away! Tell the AI to follow the strategy, and watch the magic happen ✨<a href="https://twitter.com/zoink?ref_src=twsrc%5Etfw">@zoink</a> <a href="https://twitter.com/adispezio?ref_src=twsrc%5Etfw">@adispezio</a> <a href="https://t.co/iOHjQdZhWe">https://t.co/iOHjQdZhWe</a> <a href="https://t.co/swPlYDdXV0">pic.twitter.com/swPlYDdXV0</a></p>&mdash; Jude_Park (@dusskapark) <a href="https://twitter.com/dusskapark/status/1908940072067731503?ref_src=twsrc%5Etfw">April 6, 2025</a></blockquote>
|||
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Figma MCP Magic(5) is here!<br>In this clip, I combine DevMode MCP with Talk to Figma to get instant, multi-angle UX feedback—automatically annotated right inside Figma.<br>Super fast. Super smart.<br>Watch the magic 🪄<br>👉 <a href="https://t.co/1mIj917LiV">https://t.co/1mIj917LiV</a><a href="https://twitter.com/hashtag/Figma?src=hash&amp;ref_src=twsrc%5Etfw">#Figma</a> <a href="https://twitter.com/zoink?ref_src=twsrc%5Etfw">@zoink</a> <a href="https://twitter.com/sonnylazuardi?ref_src=twsrc%5Etfw">@sonnylazuardi</a></p>&mdash; Jude_Park (@dusskapark) <a href="https://twitter.com/dusskapark/status/1937215717868495178?ref_src=twsrc%5Etfw">June 23, 2025</a></blockquote>
{% endcapture %}
{% include social-posts-carousel.html embed_html=embed_codes title="My Contribution Journey" %}
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{::options parse_block_html="true" /}

이러한 핵심 기능 개발로 [Sonny Lazuardi](https://github.com/sonnylazuardi)의 프로젝트의 **[2nd Major Contributor (Top 2%)](https://github.com/dusskapark)**가 되었으며, **5.5k+ GitHub Stars** 프로젝트의 성장과 확산을 직접 이끌었습니다.

---

## Advocacy & Validation

개발에만 머무르지 않고, 이 혁신적인 도구의 가치를 전파하는 **Advocate 역할을 직접 수행**했습니다. 프로젝트의 잠재력을 최대한 많은 디자이너들이 체험할 수 있도록 워크숍과 웨비나를 기획하고 실행했습니다. 이 과정에서 디자이너들의 열광적인 지지와 함께, 혁신의 확산을 가로막는 근본적인 장애물을 발견했습니다.

### 빛: 폭발적인 관심과 열광적인 반응

**내부 조직 전파:**

회사 내부 채널을 통해 MCP를 활용한 생산성 증대 방법들을 적극적으로 공유했습니다. 동료 디자이너인 Lucy와 함께 **디자인 All-hands 미팅**에서 MCP 활용법을 발표했으며, 이후 다양한 디자인 조직에서 **6번 이상의 워크숍**을 주최했습니다. 

{::options parse_block_html="false" /}
{% include post-components/gallery.html
	columns = 2
	full_width = true
	images = "../images/projects/2025-talk-to-figma-mcp/2.png,../images/projects/2025-talk-to-figma-mcp/1.png"
  caption = "Design All-hands Meeting & Workshop, and feedback from designers"
%}
{::options parse_block_html="true" /}

**커뮤니티 전파:**

{::options parse_block_html="false" /}
<iframe width="560" height="315" src="https://www.youtube.com/embed/smE8OMN1Qjs?si=HKSD5jmDiA8NEIPW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
{::options parse_block_html="true" /}

---
동시에 Friends of Figma Seoul 운영진으로서 웨비나 **"작업 시간을 단축해주는 MCP 디자인 오토메이션 워크숍"**을 기획했습니다. 코드/개발이라는 다소 어려운 주제임에도 불구하고, **80명의 신청 인원이 단 몇 시간 만에 모두 소진**될 정도로 엄청난 관심을 받았고, 워크숍 이후 설문에서도 매우 긍정적인 피드백을 받았습니다. 

디자이너들이 쉽게 공감하고 MCP 툴의 마법에 빠져들 수 있도록, 다양한 프롬프트와 실제 사용 사례들을 묶어 [Figma 플레이그라운드 파일](https://www.figma.com/community/file/1513760524697897204/design-automation-with-figma-mcp)로 제작했습니다. 그리고 AI를 활용해 재미있는 카툰을 만들어 복잡한 기술적 개념을 친근하고 직관적으로 전달했습니다.

{::options parse_block_html="false" /}
{% include post-components/gallery.html
	columns = 2
	full_width = true
	images = "../images/projects/2025-talk-to-figma-mcp/cartoon1.png,../images/projects/2025-talk-to-figma-mcp/cartoon2.png,../images/projects/2025-talk-to-figma-mcp/cartoon3.png,../images/projects/2025-talk-to-figma-mcp/cartoon4.png"
  caption = "AI-generated cartoons to help designers understand MCP's magic"
%}
{::options parse_block_html="true" /}



### 그림자: **"좋아 보이는데... 너무 어려워요."**

그러나 워크숍 이후 사용자 follow-up 과정에서 충격적인 현실을 마주했습니다. 열광적인 반응의 이면에는, 내부와 외부 모두에서 공통적으로 나타나는 피드백이 있었습니다: 
실제 데이터는 더 냉혹한 진실을 말해주었습니다. 내부 워크숍과 FoF 웨비나를 통해 총 130명 이상의 디자이너들에게 CTTF를 소개했습니다. 그러나 실제 사용자 지표에는 큰 영향을 주지 못했습니다.
80명이 단 몇 시간 만에 신청을 완료하고 열광했던 웨비나 이후에도, CTTF의 GA4 트래킹 데이터에는 큰 변화가 없었습니다. **관심은 폭발적이었지만, 실제 사용으로 이어지지 않았습니다.**

- 내부 워크숍 **50명** → 실제 Cursor 활성 사용자 지표에 **영향 없음**
- FoF 웨비나 **80명** → GA4 데이터 분석 결과 일상적 사용자 **10% 미만**

이 **문제의 원인**은 이 자바스크립트 기반의 CTTF MCP 툴이 비-엔지니어들에게 진입장벽이 높다는 것이었습니다. 쉽게 설치할 수 있는 플러그인 형태의 툴이 아니었기 때문에, 설치 또는 재실행 과정에서 막혀서 진행이 안 되는 반복적인 문제들이 발생했습니다. 예를 들어:

| 문제 | 설명 |
| --- | --- |
| 설치 단계의 장벽 | `homebrew` 설치, `node js` 환경구성, `bun.sh` 설치, 터미널 명령어 실행 등 비-엔지니어에게는 너무 높은 기술적 장벽 |
| 재사용 단계의 장벽 | 설치에 성공하더라도 다음 사용 시, 같은 프로젝트 폴더를 다시 찾지 못하거나, `bun socket` 명령어를 사용하는 방법을 잘 기억하지 못함 |
| 그외 운영 장벽 | 그외에도 보안 관련 이슈나 각 개인의 환경 설정 문제가 발생 시, 1:1 트러블슈팅 없이는 독립적 사용이 불가능한 경우가 많음 |

{::options parse_block_html="false" /}
{% include post-components/gallery.html
	columns = 1
	full_width = false
	images = "../images/projects/2025-talk-to-figma-mcp/Therapy Sess.png"
  caption = "설치 단계의 트러블슈팅 과정을 보여주는 예시"
%}
{::options parse_block_html="true" /}

**개인 문제가 아닌, 커뮤니티 전체의 페인 포인트:**

이는 비단 우리 조직만의 문제가 아니었습니다. Figma 커뮤니티로 눈을 돌려도 이런 비슷한 문제들은 쉽게 찾을 수 있었습니다. 
유명 Figma 인플루언서인 [Yiseo](https://www.youtube.com/@figma_tutor) 와 같은 사람들이 디자이너들에게 Cursor 와 MCP를 설정하는 방법을 설명하는 유튜브 클립은 지금도 쉽게 찾을 수 있습니다. 심지어 사용자들의 요청에 따라 [롱폼의 튜토리얼](https://www.youtube.com/watch?v=WN07X82hh-o&t=207s)을 다시 제작하는 경우가 쉽게 찾을 수 있었습니다. 

결국 이 발견은 저에게 명확한 과제를 제시했습니다: 

> **혁신적인 기술이 실제 사용자에게 닿지 못한다면 무슨 의미가 있을까?** 

저는 이 문제를 정면으로 해결하기로 결심했습니다.

---

## Solution & Execution

### 시도1: AI로 쉽게 해결되잖을까?

![DRAGME.md](../images/projects/2025-talk-to-figma-mcp/InstallWithCursor.png)

90% 이탈률이라는 충격적인 데이터 앞에서, 많은 사람들은 "사용자 교육을 강화하자", "더 자세한 문서를 만들자"고 제안했습니다. 저는 먼저 그 방향으로 시도했습니다. 

사용자가 파일을 Cursor에 드래그하면 AI가 알아서 CTTF 환경을 설치 및 구성해주는 [`DRAGME.md`](https://youtu.be/C0OVOXe-9ek)를 직접 개발했습니다. 설치 성공률은 실제로 개선되었습니다. 하지만 **근본적인 문제는 해결되지 않았습니다.** 

설치 단계의 장벽, 재사용 단계의 장벽, 운영 장벽... 앞서 발견했던 문제들은 여전히 존재했고, 같은 사용자 질문들이 계속 반복되었습니다. AI가 아무리 잘 도와줘도, 사용자가 **통제할 수 없는 환경**(터미널, homebrew, 환경 변수)에 의존하는 한 디자이너들의 **심리적 불안감**은 해소되지 않았습니다. 그래서 깨달았습니다.

수백 명의 디자이너들이 보여준 열광적인 관심은 진짜였습니다. 문제는 그들이 아니었습니다. **도구 자체가 비-엔지니어를 위한 것이 아니었습니다.** Cursor는 태생이 IDE, 즉 엔지니어를 위한 도구였기 때문입니다.

> **진정한 해결책은 사용자를 교육하거나 과정을 자동화하는 것이 아니라, 아예 그 과정이 필요 없게 만드는 것이었습니다.**

질문은 명확해졌습니다: **"어떻게 하면 디자이너들이 IDE를 거의 건드리지 않고도 CTTF의 강력한 기능을 활용할 수 있을까?"**

답은 하나였습니다. **원클릭으로 설치하고, 모든 것이 앱 내부에서 관리되고, 사용자가 시스템 레벨을 전혀 신경 쓰지 않아도 되는 독립적인 데스크톱 앱**을 만드는 것입니다.

### 시도2: 데스크톱 앱을 만들어주면 되잖을까?

생각만 하고 있을 수는 없었습니다. 주말에 집에 있는 기존 다른 앱에서 사용하던 코드를 참고하여 데스크톱 앱 프로토타입을 만들었습니다.

![prototype](../images/projects/2025-talk-to-figma-mcp/prototype.png)

원클릭 실행, 시스템 트레이 상주, 자동 서버 관리—디자이너들이 겪었던 모든 문제를 해결하는 간단한 앱이었습니다. 작동하는 증거를 들고 내부 UX 엔지니어들과 가볍게 대화를 해봤습니다. 
하지만 회사에서는 바로 진행하지 못했습니다. 아이디어는 좋았지만, 회사에서 주력하고 있는 방향과 맞지 않았고 무엇보다 투입할 수 있는 인력이 없었습니다. 이해할 수 있는 결정이었지만, 여러 생각을 해보게됐습니다.

### 시도3: 직접 개발하며 끝까지 사용자 문제 해결하기

제 결론은 두눈으로 확인한 명백한 사용자 문제가 있는데, 단순하게 포기하기에는 너무 이르다고 생각했습니다. 그래서 주말에 개인 시간에라도 직접 개발하며 끝까지 사용자 문제를 해결하기로 결정했습니다. 이는 도전이기도 했습니다. 이전에 Klever에서 경험이 있었지만, 여전히 Kotlin Compose Desktop은 상대적으로 새로운 기술이고, 레퍼런스도 적었습니다. 하지만 **문제 해결과 학습을 동시에 달성**할 수 있는 기회라고 생각했습니다. 

네트워크를 통해 커리어 브레이크 중이던 친구 엔지니어 [Jin](https://www.linkedin.com/in/jinyoung-jang-a3a827b5/)에게 프로토타입을 보여주며 협업을 제안했고, 그녀도 이 문제의 가치와 해결 방향에 공감했습니다. 우리는 매주 주말 교회에서 코딩 세션을 진행하며 함께 프로젝트를 발전시켰습니다.

제가 만든 초기 백본을 기반으로, Jin이 프로젝트를 완전히 새로운 수준으로 끌어올렸습니다. Kotlin Compose Multiplatform을 활용한 크로스 플랫폼 지원, Material Design 기반의 세련된 UI, 안정적인 서버 관리까지 모든 것을 갖춘 데스크톱 앱을 몇번의 스터디 만에 만들 수 있었고, 우리는 함께 [TalkToFigma Desktop](https://github.com/FigmaAI/TalkToFigmaDesktop) 라는 이름으로 이 프로젝트를 공개했습니다.

{::options parse_block_html="false" /}
<iframe width="560" height="315" src="https://www.youtube.com/embed/DInyZLnEgmA?si=Ls2VFJxgwzmbzMeZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
{::options parse_block_html="true" /}


### 핵심 기능: 설치와 사용의 장벽을 허물기

TalkToFigma Desktop은 기존의 복잡한 CLI 기반 방식을 완전히 재구성했습니다.

| 기능 | 구현 내용 | 해결한 Section 2의 문제 |
|------|----------|------------|
| **원클릭 설치** | 실행 파일 (.dmg, .exe) 다운로드 | 설치 단계의 장벽 제거 |
| **단순한 MCP 설치 및 실행** | 복사 붙여넣기로 MCP를 지원하는 에이전트 어디서나 Cursor, Gemini CLI 등 MCP를 설치하고 단독 실행| 운영 장벽 제거 |
| **시스템 트레이 UI** | 원클릭으로 백그라운드에서 서버 실행 및 중지 | 재사용 단계의 장벽 제거 |
| **튜토리얼 제공** | 디자이너들이 쉽게 사용할 수 있도록 튜토리얼 제공 | 사용자 교육 단계의 장벽 제거 |

### 사용자 테스트: 실제 디자이너들과 함께

초기 베타 버전을 테스트플라이트에 등록하여 20명의 디자이너에게 배포했습니다. 이번에는 달랐습니다. 

이전의 워크숍들과 달리, 별도의 설명이나 1:1 지원 없이 단순히 앱 다운로드 링크만 전달했습니다. "설치하고 써보세요"라고만 말했습니다. 예상치 못한 문제들(보안 경고, 포트 충돌 등)이 나왔지만, 이번에는 간단한 튜토리얼 만으로도 설치 단계의 오류없이 바로 Cursor 열고 MCP 설치 후 바로 사용할 수 있었습니다. 몇가지 안정성 패치를 실행하면서, 조금 더 지켜보자고 결과는 더 명확했습니다.

| 지표 | 결과 | 비고 |
|------|----------|----------|
| 설치 성공률 | **100%** ||
| 평균 설치 시간 | **30분 이상 → 2분 이내** | 93% 단축 |
| 재실행 성공률 | **10% 이하 → 85% 이상** | 8.5배 개선 |
| 1주일 retention | **10% → 65% 이상** | 6.5배 개선 |
| 세션당 이벤트 수 | **10 → 41 이상** | 4.1배 증가 |


특히 의미 있었던 것은 **세션당 이벤트 수의 증가**였습니다. 이는 단순한 튜토리얼 따라하기가 아니라, 디자이너들이 실제 프로젝트에서 CTTF를 활용하고 있다는 증거였습니다.

> "와, 이제 진짜 쓸 수 있네요. 그냥 앱 켜고 Cursor 열면 끝이잖아요!" 
> 
> "드디어 다른 디자이너들한테 추천할 수 있겠어요. 전에는 제가 도와줘야 해서 못 했는데..."

---

## Conclusion: Impact, Growth & Learnings

머릿속 아이디어를 프로토타입으로 구현하고, 교회에서의 코딩 세션을 통해 완성도를 높여, 실제 사용자 데이터로 가치를 증명했습니다. **5.5k+ Stars 프로젝트의 2nd Major Contributor**로서 핵심 기능을 개발했고, 데스크톱 앱으로 **사용성을 4.1배 개선**하는 임팩트를 만들어냈습니다.

이러한 성과는 더 큰 기회로 이어졌습니다. Sonny의 원본 프로젝트가 Grab의 오픈소스 이니셔티브의 일부로 [공식 Grab 저장소로 이동](https://www.grab.com/sg/inside-grab/stories/a-grab-engineer-built-this-design-tool-for-his-team-now-were-improving-it-for-everyone/)했고, 제가 개발한 데스크톱 앱 역시 Grab과의 협업 기회를 얻었습니다.

두 프로젝트 모두 MIT 라이선스 오픈소스로 유지되면서도 Grab의 공식 지원을 받게 되었습니다. 저는 **2nd Major Contributor**로서 두 프로젝트의 지속적인 성장과 혁신을 주도하며, 더 많은 디자이너들이 AI 기반 디자인 자동화의 혜택을 누릴 수 있도록 기여하고 있습니다.

### 이 여정에서 배운 것

이 프로젝트를 통해 저는 단순히 코드를 기여하는 것을 넘어, **문제를 발견하고, 적극적으로 솔루션을 만들어내는 리더십**의 중요성을 깊이 깨달았습니다.

**사용자 중심 사고의 힘:**

워크숍에서 열광하던 80명의 디자이너들이 실제로는 10%도 사용하지 않았다는 데이터는 충격적이었지만, 동시에 가장 중요한 인사이트를 주었습니다. 기술의 혁신성보다 **사용자가 실제로 사용할 수 있는가**가 훨씬 중요하다는 것을 배웠습니다.

**실행력의 가치:**

회사에서 거절당한 아이디어를 포기하지 않고 주말에 직접 만들어 증명했습니다. 때로는 설득보다 **작동하는 프로토타입 하나가 더 강력한 논증**이 됩니다.

**커뮤니티의 힘:**

Jin, Lucy, Sonny, 그리고 수많은 테스터와 워크숍 참여자들과의 협업을 통해 프로젝트를 성장시켰습니다. **진정한 혁신은 협업에서 나옵니다.**

---

**저는 앞으로도 디자인과 엔지니어링의 경계를 넘나들며, 실제 사용자에게 가치를 전달하는 혁신을 만들어갈 것입니다.**

> "사용자 문제가 명확하다면, 증명하는 가장 빠른 방법은 직접 만들어서 보여주는 것입니다."

---

## References & Links

{::options parse_block_html="false" /}
<div class="github-card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Icon">
    <div class="content">
        <p>cursor-talk-to-figma-mcp: 여러 플러그인을 하나의 AI 시스템으로</p>
        <a href="https://github.com/grab/cursor-talk-to-figma-mcp">github.com/grab/cursor-talk-to-figma-mcp</a>
    </div>
</div>

<div class="github-card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Icon">
    <div class="content">
        <p>TalkToFigma Desktop: 모든 디자이너가 쉽게 사용할 수 있는 데스크톱 앱</p>
        <a href="https://github.com/FigmaAI/TalkToFigmaDesktop">github.com/FigmaAI/TalkToFigmaDesktop</a>
    </div>
</div>

<div class="figma-card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma Icon">
    <div class="content">
        <p>Workshop Playground (EN): Design Automation with Figma MCP</p>
        <a href="https://www.figma.com/community/file/1513760524697897204">figma.com/community/file/1513760524697897204</a>
    </div>
</div>

<div class="figma-card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma Icon">
    <div class="content">
        <p>Workshop Materials (KR): MCP 디자인 오토메이션 워크숍 자료</p>
        <a href="https://www.figma.com/community/file/1513759391089024242">figma.com/community/file/1513759391089024242</a>
    </div>
</div>
{::options parse_block_html="true" /}

