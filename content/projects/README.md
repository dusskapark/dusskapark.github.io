# MDX 프로젝트 콘텐츠 가이드

이 디렉토리는 프로젝트 상세 페이지의 MDX 콘텐츠를 저장합니다.

## MDX란?

MDX는 Markdown 문서 안에서 React 컴포넌트를 사용할 수 있게 해주는 형식입니다.

## 사용 방법

### 1. MDX 파일 생성

`content/projects/{slug}.mdx` 형식으로 파일을 생성합니다.

```mdx
---
title: "프로젝트 제목"
subtitle: "프로젝트 부제목 (2024)"
date: "2024-01-01"
description: "프로젝트 설명"
featured_image: "/images/projects/featured.png"
team: "팀원 정보"
role: "나의 역할"
---

## 섹션 제목

일반 마크다운 텍스트를 작성합니다.

<Gallery
  columns={2}
  images={[
    "/images/project1.png",
    "/images/project2.png"
  ]}
  caption="이미지 설명"
/>
```

### 2. 사용 가능한 컴포넌트

#### Gallery

이미지 갤러리를 표시합니다.

```mdx
<Gallery
  columns={2}              // 1-4, 기본값: 2
  fullWidth={true}         // 전체 너비 사용 여부, 기본값: false
  images="/path/image.png" // 단일 이미지 또는 배열
  caption="이미지 설명"     // 선택사항
/>

// 여러 이미지
<Gallery
  columns={3}
  images={[
    "/images/1.png",
    "/images/2.png",
    "/images/3.png"
  ]}
  caption="3개 이미지 그리드"
/>
```

#### Quote

인용구 또는 하이라이트 섹션을 표시합니다.

```mdx
<Quote
  fullWidth={false}              // 전체 너비 사용 여부
  backgroundColor="#FDF0E0"      // 배경색 (선택사항)
  fontColor="#555"               // 글자색 (선택사항)
  images="/images/quote.png"     // 이미지 (선택사항)
  text="인용 텍스트<br/>HTML 태그 사용 가능"
  caption="출처 정보"             // 선택사항
/>
```

#### Video

YouTube 또는 다른 비디오를 삽입합니다.

```mdx
<Video
  url="https://www.youtube.com/embed/VIDEO_ID"
  fullWidth={false}
  caption="비디오 설명"
/>
```

## Jekyll에서 MDX로 변환

### 이전 (Jekyll/Liquid)

```liquid
{% include post-components/gallery.html
   columns = 2
   images = "img1.png, img2.png"
   caption="Gallery"
%}
```

### 이후 (MDX)

```mdx
<Gallery
  columns={2}
  images={["img1.png", "img2.png"]}
  caption="Gallery"
/>
```

## 주요 차이점

1. **문법**: `{% include %}` → `<Component />`
2. **속성**: `attribute = value` → `attribute={value}`
3. **배열**: `"a, b, c"` → `{["a", "b", "c"]}`
4. **불린**: `true` → `{true}`
5. **숫자**: `2` → `{2}`

## 기본 마크다운 스타일링

모든 기본 마크다운 요소는 자동으로 스타일이 적용됩니다:

- 제목 (h1-h6)
- 단락 (p)
- 리스트 (ul, ol)
- 인용구 (blockquote)
- 코드 (code, pre)
- 링크 (a)

## 예시

전체 예시는 `content/projects/klever.mdx`를 참고하세요.
