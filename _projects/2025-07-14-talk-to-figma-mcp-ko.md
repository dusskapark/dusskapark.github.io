---
title: "TalkToFigma MCP:<br>AI 디자인 생산성 혁신의 선구자"
subtitle: "Figma + AI project (2025)"
date: 2025-07-14 00:00:00
description: "CTTF 오픈소스의 가능성을 보고 핵심 자동화 기능을 기여했습니다. 이후 워크숍에서 디자이너들이 설치 장벽에 막히는 문제를 확인하고, 이를 해결하기 위해 TalkToFigma Desktop을 만들어 실제 사용 확산을 이끌었습니다."
featured_image: "2025-talk-to-figma-mcp/hero.png"
gallery_images: "2025-talk-to-figma-mcp/hero.png"
team: JooHyung (Lead Contributor & Desktop Solution Lead), Sonny Lazuardi (Original Creator), Jin, Yiseo (Desktop App Co-Developers)
role: Solution Lead, Contributor (2nd Coder)
visible: false
---

<!--
IMAGE INSERT PLAN (KO)
1) Summary 아래: 최신 Desktop 메인 화면 1장 (히어로)
2) Core Contribution 아래: 기능 데모 2~4장 (Before/After 권장)
3) Turning Point 아래: 워크숍 반응 + 설치 장벽 증거 2~3장
4) Solution(영상) 아래: 초기 vs 최신 앱 비교 2장
5) Desktop Priorities 아래: 실제 사용 플로우 3~4장
6) Outcome 아래: GA 국가분포 + DB 지표 + 초기/최근 비교 그래프
7) Conclusion 근처: 사용자 코멘트 카드 2~3장
-->

## 한 줄 요약

저는 `cursor-talk-to-figma-mcp` 오픈소스의 가능성을 보고 핵심 자동화 도구들을 기여했고, 워크숍에서 확인한 설치 장벽 문제를 해결하기 위해 **TalkToFigma Desktop**을 만들었습니다. 결과적으로 MCP는 일부 엔지니어의 실험이 아니라, 더 많은 디자이너가 실제로 쓰는 도구가 되기 시작했습니다.

<!-- IMG_SLOT_1: 최신 Desktop 메인 화면 (히어로) -->

<br>
<div style="text-align: center; margin-top: 20px;">
  <a href="https://github.com/grab/cursor-talk-to-figma-mcp" target="_blank" style="display: inline-flex; align-items: center; padding: 10px 20px; background-color: #333333; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" height="24" style="max-height: 24px; margin-right: 10px;">
    View cursor-talk-to-figma-mcp
  </a>
</div>
<br>

## 1) 시작: 오픈소스 MCP의 가능성을 봤다

Sonny Lazuardi가 시작한 `cursor-talk-to-figma-mcp`는 Cursor Agentic AI와 Figma를 연결해 반복 디자인 작업을 자동화하는 프로젝트였습니다.

저는 이 프로젝트가 단순한 트렌드성 데모가 아니라, 디자이너의 실제 생산성을 바꿀 수 있는 기반이라고 판단했습니다. 그래서 제가 실무에서 쓰던 플러그인 워크플로우를 MCP 도구로 옮기며 기여를 시작했습니다.

### 내가 기여한 핵심 자동화 영역

- **Smart Data Population**: 실데이터를 문맥에 맞게 Figma 카드/텍스트에 채우는 자동화.
- **Legacy Annotation Converter**: 기존 주석 체계를 더 읽기 쉬운 핸드오버 형태로 변환.
- **Instance Override Propagation**: 반복적인 인스턴스 오버라이드 작업 일괄 처리.
- **DevMode Integration**: 디자인/접근성 점검에 필요한 정보를 기반으로 개선 코멘트 생성.

핵심은 “정해진 버튼 클릭 자동화”가 아니라, **자연어 기반으로 맥락을 이해해 유연하게 동작하는 디자인 자동화**였습니다.

<!-- IMG_SLOT_2: 기능별 데모 2~4장 (Before/After) -->

## 2) 전환점: 문제는 기능이 아니라 설치였다

워크숍을 진행하며 확실히 확인한 사실이 있었습니다.

- 디자이너들은 MCP 자체의 가치에는 강하게 공감한다.
- 하지만 설치/재실행/환경설정 단계에서 반복적으로 이탈한다.

즉, 문제는 "사람들이 관심이 없어서"가 아니라 **디자이너 친화적인 온보딩 경로가 없어서**였습니다. 이 문제를 깨지 않으면 아무리 좋은 기능을 추가해도 실제 확산은 제한적일 수밖에 없다고 봤습니다.

<!-- IMG_SLOT_3: 워크숍 반응 + 설치 장벽 증거 2~3장 -->

## 3) 해결: TalkToFigma Desktop을 만들었다

그래서 저는 설치 장벽을 없애는 데 집중해 **TalkToFigma Desktop** 개발을 시작했습니다. 이후 Jin과 협업하며 앱 완성도를 높였고, 프로젝트를 공개했습니다.

{::options parse_block_html="false" /}
<iframe width="560" height="315" src="https://www.youtube.com/embed/DInyZLnEgmA?si=Ls2VFJxgwzmbzMeZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
{::options parse_block_html="true" /}

<!-- IMG_SLOT_4: 초기(v0) vs 최신(Production) 앱 비교 2장 -->

### Desktop 앱에서 집중한 것

- **원클릭 설치 경험**(실행 파일 중심)
- **MCP 설치/실행 단순화**(복잡한 CLI 절차 최소화)
- **시스템 트레이 기반 운영**(켜고 끄기 쉬운 사용성)
- **튜토리얼 중심 온보딩**(비-엔지니어도 따라올 수 있는 흐름)

<!-- IMG_SLOT_5: 실제 사용 플로우 3~4단계 스크린샷 -->

## 4) 성과: 예상보다 빠르게, 더 넓게 확산됐다

이 앱은 저와 친구들의 예상을 뛰어넘는 의미 있는 성공을 만들었습니다.

정량 지표(설치율, 리텐션, 세션 이벤트 등)는 추후 업데이트할 예정이지만, 이미 다음과 같은 신호를 확인했습니다.

- 러시아, 인도, 싱가포르를 포함한 여러 국가에서 사용자 유입이 관찰됨.
- 전 세계적으로 수천 명 규모 사용자가 Desktop 앱을 통해 MCP를 실제 사용 중.
- "설치가 어려워서 못 쓴다"는 장벽이 "다운로드 후 바로 사용" 경험으로 전환됨.

<!-- IMG_SLOT_6: GA 국가 분포 + DB 지표 + 초기/최근 비교 그래프 -->

## 5) 지금의 결론

제가 이 여정에서 얻은 가장 큰 학습은 명확합니다.

> 좋은 기능만으로는 확산되지 않는다.  
> **사용자가 시작할 수 있는 경험**을 만들 때 비로소 기술이 살아난다.

저는 앞으로도 디자인과 엔지니어링의 경계를 연결해, 실제 사용으로 이어지는 AI 도구를 계속 만들 계획입니다.

<!-- IMG_SLOT_7: 사용자 코멘트 카드 2~3장 -->

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
