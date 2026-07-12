# TalkToFigma Desktop MCP Tool 상세 분석

작성일: 2026-07-01
소스: GA4 `Figma MCP Agent` / `properties/499789310`
분석 기간: 2025-07-01 ~ 2026-06-30
필터: `eventName = mcp_tool_call`

원본 데이터:

- `data/ga4/talk-to-figma-desktop-ga4-mcp-tools-raw.md`
- `data/ga4/talk-to-figma-desktop-ga4-mcp-tools-raw.csv`
- `data/ga4/talk-to-figma-desktop-ga4-mcp-tools-raw.json`

## 한 줄 결론

사람들이 가장 많이 반복해서 쓴 MCP 도구는 “Figma를 읽는 도구”가 아니라 “Figma 안에 화면을 만들고 다듬는 도구”였다. 특히 텍스트 생성, 색상 적용, 프레임 생성, 라운드 처리, 텍스트 수정, 사각형 생성이 압도적으로 많았다.

## 가장 흥미로운 포인트

사용자 수 기준으로는 `get_document_info`, `get_selection`, `get_node_info`, `get_active_channels` 같은 읽기/상태 확인 도구가 넓게 퍼져 있다. 하지만 이벤트 수 기준으로 보면 이야기가 달라진다. 반복 호출이 큰 쪽은 `create_text`, `set_fill_color`, `create_frame`, `set_text_content`처럼 실제 디자인을 만드는 도구다.

즉 사용자는 먼저 문서와 선택 상태를 읽고, 그 다음 실제 생성/편집 작업을 대량으로 반복했다. 발표에서는 이 차이를 꼭 보여주는 것이 좋다.

## 상위 반복 사용 툴

| tool | 성공 이벤트 | 활성 사용자 | 사용자당 성공 이벤트 | 해석 |
|---|---:|---:|---:|---|
| create_text | 105,643 | 613 | 172.34 | 텍스트 레이어 생성이 가장 반복적으로 쓰였다 |
| set_fill_color | 92,561 | 604 | 153.25 | 생성된 요소의 색상/시각 스타일 적용 |
| create_frame | 52,509 | 613 | 85.66 | 화면/컴포넌트의 구조를 만드는 작업 |
| set_text_content | 37,845 | 455 | 83.18 | 생성 후 카피를 채우거나 교체하는 작업 |
| set_corner_radius | 38,053 | 504 | 75.50 | UI 카드/버튼/박스의 마감 처리 |
| create_rectangle | 34,779 | 473 | 73.53 | 기본 블록, 배경, 카드, 버튼 재료 생성 |
| set_layout_sizing | 9,018 | 167 | 54.00 | Auto Layout 크기 조정 |
| move_node | 13,859 | 324 | 42.77 | 위치 조정 |

이 표에서 중요한 것은 `eventCount`가 높으면서도 `activeUsers`가 수백 명 단위라는 점이다. 아주 소수의 사용자가 만든 이상치라기보다는, 실제로 넓은 사용자가 반복한 작업이라고 볼 수 있다.

## 목적별 묶음

GA4에는 목적 카테고리가 직접 기록되어 있지 않으므로, 아래는 tool name 기반의 분석자 분류다.

| 목적 | 성공 이벤트 | 성공 MCP 호출 내 비중 | 의미 |
|---|---:|---:|---|
| 생성/복제 | 204,042 | 38.05% | 텍스트, 프레임, 사각형, 컴포넌트 인스턴스, 노드 복제 |
| 스타일/콘텐츠 편집 | 186,600 | 34.80% | 색상, 라운드, 텍스트 내용, 선 색상, 다중 텍스트 수정 |
| 디자인 맥락 읽기 | 60,467 | 11.28% | 노드, 문서, 선택 상태, 텍스트 노드, 스타일 읽기 |
| 레이아웃/위치 조정 | 53,044 | 9.89% | 이동, 리사이즈, 레이아웃 크기, 간격, 정렬 |
| Export/리뷰 | 13,536 | 2.52% | 노드를 이미지로 내보내기 |
| 삭제/선택 관리 | 7,766 | 1.45% | 삭제, 다중 삭제, focus, selection |
| 연결/진단 | 3,817 | 0.71% | connection diagnostics, channel join, config |

이 묶음은 회고에서 꽤 강하게 쓸 수 있다. 성공 MCP 호출의 약 72.85%가 “생성/복제”와 “스타일/콘텐츠 편집”에 몰려 있다. 즉 사용자 관심은 “Figma 정보를 보는 것”보다 “Figma에 결과물을 만드는 것”에 더 가까웠다.

## 넓게 쓰인 기반 툴

반대로 활성 사용자 기준 상위는 다르다.

| tool | 전체 이벤트 | 활성 사용자 | 해석 |
|---|---:|---:|---|
| get_document_info | 7,825 | 1,177 | 가장 많은 사용자가 문서 상태를 확인 |
| get_selection | 6,541 | 930 | 선택한 노드를 읽는 기본 동작 |
| get_node_info | 35,808 | 905 | 실제 작업 전후의 노드 정보 확인 |
| get_active_channels | 5,653 | 865 | 연결 상태/채널 확인 |
| connection_diagnostics | 4,438 | 670 | 연결 문제가 제품 경험의 일부였음 |
| read_my_design | 2,590 | 648 | 현재 디자인을 읽는 상위 레벨 액션 |

이들은 반복 사용량 자체는 상대적으로 작지만, 많은 사용자에게 넓게 퍼져 있다. 따라서 “기반 행동”으로 보는 것이 맞다. MCP 워크플로우는 곧바로 생성으로 가지 않고, 먼저 문서/선택/연결/노드 정보를 확인하는 단계를 거쳤다.

## 실패가 많은 툴이 말해주는 것

실패 이벤트를 사용자 수 기준으로 보면, 실패도 대부분 “작업 실행”보다 “맥락 읽기와 연결 확인”에 몰려 있다.

| tool | 실패 이벤트 | 활성 사용자 | 해석 |
|---|---:|---:|---|
| get_document_info | 2,241 | 683 | 문서 접근/상태 확인이 자주 막힘 |
| get_active_channels | 2,403 | 626 | 채널/연결 상태 확인 실패 |
| get_selection | 1,946 | 574 | 선택 상태가 없거나 읽기 실패 |
| connection_diagnostics | 1,905 | 515 | 진단 자체가 자주 필요했음 |
| get_node_info | 3,072 | 463 | 노드 접근/식별 실패 |
| create_frame | 2,207 | 312 | 실제 생성 작업에서도 일정한 실패 발생 |
| read_my_design | 611 | 306 | 디자인 읽기 단계의 마찰 |

이건 아주 중요한 Learning이다. 사용자가 불안을 느끼는 지점은 “AI가 디자인을 잘 만드나?” 이전에 “지금 Figma에 제대로 붙어 있나?”, “선택된 노드를 읽을 수 있나?”, “문서 상태를 알고 있나?”였다.

## OS와 국가별 힌트

OS 기준으로는 MacOS가 대부분의 고반복 MCP 이벤트를 더 많이 만들었다. 예를 들어 `set_fill_color`는 MacOS 68,248건, Windows 27,877건이고, `create_text`는 MacOS 61,420건, Windows 46,687건이다. 다만 Windows도 `create_text`, `create_frame`, `create_rectangle`에서 큰 사용량을 만들었기 때문에 Mac 전용 현상으로 보기는 어렵다.

국가별로는 South Korea가 MCP 이벤트 볼륨을 강하게 이끌었다. `create_text` 78,677건, `set_fill_color` 62,890건, `create_frame` 41,017건이 South Korea에서 나왔다. 하지만 Russia, United States, India, Brazil, Vietnam 등에서도 같은 패턴이 반복된다. 지역이 달라도 “생성 → 스타일 → 레이아웃”이라는 사용 목적은 크게 다르지 않았다.

## 시간 흐름

초기에는 `get_selection`, `join_channel`, `read_my_design`, `get_active_channels`, `connection_diagnostics` 같은 연결/맥락 확인 계열이 먼저 보인다. 2026-02부터 `set_fill_color`, `create_text`, `set_text_content`, `create_rectangle` 같은 생성/편집 계열이 크게 나타나고, 2026-04에는 `create_text` 35,140건, `set_fill_color` 27,972건, `create_frame` 18,889건으로 본격적인 제작 사용량이 커진다.

이 흐름은 좋은 회고 문장으로 바꿀 수 있다. 처음에는 연결과 맥락 읽기가 중요했고, 사용이 깊어지자 실제 화면 생성과 스타일링 호출이 폭발했다.

## 회고에 쓸 문장 후보

- 사람들이 가장 많이 반복해서 쓴 MCP 도구는 조회 도구가 아니라 제작 도구였다.
- `create_text`와 `set_fill_color`만 합쳐도 성공 호출이 198,204건이었다. 사용자는 Figma를 읽기만 한 것이 아니라, 실제 화면을 만들고 스타일을 입혔다.
- 성공 MCP 호출의 약 72.85%는 생성/복제와 스타일/콘텐츠 편집에 몰려 있었다.
- 반대로 활성 사용자 기준으로 넓게 퍼진 도구는 `get_document_info`, `get_selection`, `get_node_info`였다. AI가 무언가를 만들기 전에 먼저 Figma의 현재 상태를 이해해야 했기 때문이다.
- 실패가 많은 도구도 문서/선택/연결 확인 계열에 몰려 있었다. 이 앱의 진짜 문제는 기능 개수가 아니라 첫 연결과 현재 상태에 대한 불안을 줄이는 것이었다.

## 주의점

- purpose group은 GA4 원본 차원이 아니라 tool name을 기반으로 한 분석자 분류다.
- `events_per_active_user`가 지나치게 큰데 active user가 1~5명인 도구는 이상치일 가능성이 높으므로 발표 핵심 지표로 쓰지 않는다.
- `eventCount`는 반복 호출 수이지, 고유 작업 수나 완성된 디자인 수가 아니다.
- 국가별 MCP 사용은 South Korea에 크게 치우쳐 있으므로 글로벌 패턴을 말할 때는 “같은 패턴이 다른 국가에서도 관찰된다” 정도로 조심스럽게 표현한다.
