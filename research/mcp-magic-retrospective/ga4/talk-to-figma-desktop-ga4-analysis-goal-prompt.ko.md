# TalkToFigma Desktop GA4 반복 분석 목표 프롬프트

상태: 목표 프롬프트
대상 프로퍼티: Figma MCP Agent / `properties/499789310`
분석 기간: 2025-07-01 ~ 2026-06-30
산출물 위치: `docs/analytics/ga4/`

## 작성 원칙

- 사용자와의 대화는 한국어로 한다.
- 분석 산출물은 `docs/analytics/ga4/`에 별도 Markdown 파일로 작성한다.
- 한국어와 영어 산출물은 각각 따로 유지한다.
- 기존 회고 개요 파일은 직접 덮어쓰지 않는다.
- 기존 회고에 반영할 만한 내용은 분석 문서 안에 후보로 따로 정리한다.

## 최종 목표 프롬프트

GA4 Analytics MCP를 사용해 `Figma MCP Agent` 프로퍼티(`properties/499789310`)의 최근 1년 데이터를 반복 분석한다.

분석 기간은 `2025-07-01`부터 `2026-06-30`까지로 잡되, 실제 데이터가 없는 구간은 제외하고 유효 시작일을 명시한다. 분석 결과는 TalkToFigma Desktop 회고용 근거로 사용한다. 이 프로젝트는 종료가 아니라 큰 업데이트 우선순위가 낮아진 상황이며, 핵심 가치는 기능 추가보다 첫 실행과 첫 연결까지의 불안을 줄인 것이었다는 프레이밍을 유지한다.

분석 결과는 `docs/analytics/ga4/`의 다음 두 파일에 누적한다.

- `talk-to-figma-desktop-ga4-analysis.ko.md`
- `talk-to-figma-desktop-ga4-analysis.en.md`

기존 회고 개요 파일은 직접 수정하지 않는다. 다만 검증된 핵심 인사이트는 분석 문서 안에 `기존 회고에 반영할 후보` / `Candidates for retrospective outline` 섹션으로 따로 정리한다.

## 반복 분석 카테고리

각 반복에서는 아래 카테고리 중 아직 충분히 보지 않은 축을 우선 분석한다.

1. 전체 규모: `activeUsers`, `totalUsers`, `sessions`, `eventCount`, `screenPageViews`, `app_start`, `user_action`, `server_action`, `mcp_tool_call`.
2. 지역 확산: `country`, `region`, `city`, `language` 기준 사용자 수와 이벤트 수. 발표용으로 흥미로운 국가 수, 상위 국가, 의외의 지역 분포를 찾는다.
3. 플랫폼/환경: `deviceCategory`, `operatingSystem`, `browser`, `customEvent:platform`, `customEvent:os_info`, `customEvent:app_version` 기준 사용량과 차이를 본다.
4. MCP 사용 깊이: `eventName=mcp_tool_call`을 기준으로 `customEvent:tool_name`, `customEvent:success`, `customEvent:result_type`, `activeUsers`, `eventCount`를 분석한다.
5. 대표 MCP 액션: `create_text`, `set_fill_color`, `create_frame`, `set_text_content`, `get_node_info`처럼 실제 작업 수행을 보여주는 도구 호출을 찾는다.
6. 온보딩/첫 성공: `tutorial_shown`, `tutorial_completed`, `tutorial_skipped`, `app_start`, successful `mcp_tool_call`을 이용해 첫 실행과 첫 연결 불안 완화 프레이밍을 뒷받침한다.
7. 운영 부담: `app_exception`, `customEvent:exception_type`, `customEvent:exception_message`, `customEvent:fatal`, `app_version`별 오류량을 분석하되, 성공 지표를 깎아내리지 않고 "다음 단계는 운영/진단/안정성"이라는 근거로 해석한다.
8. 시간 흐름: 월별/주별 추이를 보고 출시 이후 성장, 피크, 감소, 안정화, 특정 이벤트 급증을 찾는다.
9. 세그먼트 비교: 국가별, OS별, app version별, 성공/실패별로 차이가 큰 패턴을 찾아 발표용 후보 인사이트로 정리한다.
10. 반박 가능성 점검: 이벤트 중복, `app_exception` 과대계상, GA4 desktop 맥락의 한계를 caveat로 분리한다.

## 각 반복의 작업 방식

각 반복 사이클은 다음 순서로 진행한다.

1. 이전 분석 문서에서 이미 확인한 항목과 아직 부족한 항목을 확인한다.
2. GA4 Analytics MCP로 새 쿼리를 실행한다.
3. 이전 Markdown에 없는 새 인사이트 후보를 찾는다.
4. 숫자는 원본 값, 반올림 값, 계산식, 해석을 함께 기록한다.
5. 발표/회고에 쓸 수 있는 문장 후보를 한국어와 영어로 각각 작성한다.
6. 근거가 약하거나 해석이 위험한 항목은 `보류/주의`와 `Caveats`로 분리한다.
7. 새 인사이트가 있었는지 여부를 반복 로그에 기록한다.

사용 가능한 GA4 커스텀 dimension은 다음을 우선 사용한다.

- `customEvent:action`
- `customEvent:app_version`
- `customEvent:category`
- `customEvent:duration_ms`
- `customEvent:error_message`
- `customEvent:exception_message`
- `customEvent:exception_type`
- `customEvent:fatal`
- `customEvent:label`
- `customEvent:os_info`
- `customEvent:platform`
- `customEvent:result_type`
- `customEvent:success`
- `customEvent:tool_name`
- `customEvent:value`

## 균형형 종료 조건

반복 분석은 너무 빨리 끝내지 않되, 숫자만 더 쌓는 상태가 되면 종료한다.

종료 조건은 다음을 모두 만족할 때다.

- 10개 반복 분석 카테고리를 모두 최소 1회 이상 확인했다.
- 주요 축인 `country`, `operatingSystem`, `app_version`, `eventName`, `customEvent:tool_name`, `customEvent:success`, `customEvent:exception_type`, 월별/주별 날짜 축을 모두 확인했다.
- 마지막 2회 반복에서 새 발표용 인사이트가 나오지 않았다.
- 남은 항목이 기존 주장을 강화하지 않는 단순 숫자 나열이거나, 이미 발견한 인사이트의 중복이다.
- 더 깊게 파면 좋을 질문이 있더라도, 회고/발표의 핵심 주장에 실질적으로 기여하지 않으면 `추가 분석 보류`로 남기고 종료한다.

종료 시에는 최종 요약을 남긴다.

- 발표에 바로 쓸 Top Metrics
- 회고 본문에 넣을 문장
- 주의해서 써야 할 데이터
- 기존 회고에 반영할 후보
- 추가 분석이 필요하지만 현재는 보류할 질문

## 해석 기준

분석의 목표는 단순히 큰 숫자를 자랑하는 것이 아니다.

찾아야 하는 것은 다음과 같다.

- TalkToFigma Desktop이 실제 사용자에게 도달했다는 증거
- 설치와 연결의 마찰을 줄이는 문제가 실제였다는 증거
- 앱을 열기만 한 것이 아니라 MCP 작업을 실제로 실행했다는 증거
- 글로벌하게 퍼졌다는 증거
- 다음 단계가 기능 추가보다 운영, 진단, 배포, 안정성이었음을 보여주는 증거
- Figma 공식 MCP나 Canvas용 Agent에 핵심 기능이 이미 반영된 상황에서, 큰 업데이트 우선순위가 낮아진 이유를 설명할 수 있는 근거

성공 지표와 운영 부담 지표를 섞지 않는다.
예를 들어 `eventCount` 전체를 성공으로만 말하지 않고, `app_exception`과 실제 사용 이벤트를 분리해서 해석한다.
