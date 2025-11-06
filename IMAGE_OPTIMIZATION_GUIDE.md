# 이미지 최적화 가이드

## 현재 상태
- **2024-klever**: 58MB (큰 GIF 포함: 5.8MB)
- **2025-talk-to-figma-mcp**: 19MB (cartoon 이미지들: 3-4MB씩)

## 이미 적용된 최적화
✅ **Lazy Loading** - gallery와 quote 컴포넌트에 `loading="lazy"` 속성 추가
- 스크롤하기 전까지 이미지를 로드하지 않아 초기 로딩 속도 개선

## 추가 최적화 방법

### 방법 1: 자동 스크립트 사용 (추천)

1. **필수 도구 설치**
```bash
brew install imagemagick gifsicle
```

2. **최적화 실행**
```bash
# talk-to-figma-mcp 프로젝트 최적화
./optimize_images.sh images/projects/2025-talk-to-figma-mcp

# klever 프로젝트 최적화
./optimize_images.sh images/projects/2024-klever
```

3. **결과**
- PNG: 약 60-70% 압축 (품질 유지)
- JPG: 약 50-60% 압축
- GIF: gifsicle로 최적화
- 자동으로 백업 폴더 생성

### 방법 2: 온라인 도구 (코드 없이)

#### 큰 이미지 우선 최적화
다음 파일들을 우선 압축하세요:

**2025-talk-to-figma-mcp:**
- `cartoon1.png` (2.9MB) → 목표: ~500KB
- `cartoon2.png` (3.2MB) → 목표: ~500KB
- `cartoon3.png` (3.8MB) → 목표: ~500KB
- `cartoon4.png` (3.4MB) → 목표: ~500KB

**2024-klever:**
- `5_demo_vid_1.gif` (5.8MB) → 목표: ~1-2MB
- `6_infcon_2.png` (2.4MB) → 목표: ~400KB
- `6_infcon_3.png` (2.4MB) → 목표: ~400KB
- `6_infcon_1.png` (1.4MB) → 목표: ~300KB

#### 추천 온라인 도구
1. **TinyPNG** (https://tinypng.com)
   - PNG/JPG 압축
   - 무료: 최대 20개 파일, 각 5MB까지
   - 품질 손실 거의 없음

2. **Squoosh** (https://squoosh.app)
   - Google 제공
   - WebP 변환 가능
   - 실시간 압축 결과 비교

3. **ezgif** (https://ezgif.com/optimize)
   - GIF 전용 최적화
   - 프레임 간격, 색상 수 조절 가능

### 방법 3: WebP 변환 (최고 압축률)

WebP 포맷은 PNG/JPG보다 30-80% 작습니다.

```bash
# WebP 변환 스크립트
for file in images/projects/2025-talk-to-figma-mcp/*.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

**주의:** WebP 사용 시 HTML에서 `<picture>` 태그로 폴백 필요:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="Fallback">
</picture>
```

### 방법 4: GitHub Pages 빌드 최적화

GitHub Actions에서 자동으로 이미지 최적화하도록 설정할 수 있습니다.

`.github/workflows/optimize-images.yml` 참조 (별도 생성 필요)

## 최적화 우선순위

1. **긴급 (즉시)**: cartoon 이미지 4개 (13.3MB → 목표 2MB)
2. **높음**: klever GIF + infcon 이미지 (11.6MB → 목표 2.5MB)
3. **중간**: 나머지 500KB 이상 이미지들
4. **선택**: 전체 이미지에 WebP 적용

## 예상 효과

| 프로젝트 | 현재 | 최적화 후 | 감소율 |
|---------|------|-----------|--------|
| talk-to-figma-mcp | 19MB | ~4-5MB | 75% |
| klever | 58MB | ~15-20MB | 65% |
| **전체** | **77MB** | **~20-25MB** | **70%** |

## 체크리스트

- [x] Lazy loading 적용 (gallery, quote 컴포넌트)
- [ ] ImageMagick 설치
- [ ] cartoon 이미지 4개 최적화
- [ ] klever GIF 최적화
- [ ] infcon 이미지 3개 최적화
- [ ] 나머지 이미지 일괄 최적화
- [ ] (선택) WebP 변환
- [ ] (선택) Jekyll 플러그인 추가

## 추가 팁

- **GitHub Pages**: 빌드된 사이트는 자동으로 gzip 압축됩니다
- **캐싱**: 브라우저가 이미지를 캐시하므로 재방문 시 빠릅니다
- **CDN**: GitHub Pages는 CDN을 사용하므로 별도 설정 불필요
- **정기 점검**: 새 프로젝트 추가 시 이미지 크기 확인