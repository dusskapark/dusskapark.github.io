# Microsoft Store installs

Microsoft Partner Center에서 내보낸 `Apps and Games Installs` 주간 데이터다.

## 파일

- `apps-and-games-installs-export-1.csv`: 첫 번째 원본 export
- `apps-and-games-installs-export-2.csv`: 두 번째 원본 export
- `microsoft-store-installs-weekly-combined.csv`: 두 원본을 날짜별로 나란히 놓고 합산한 파일
- `microsoft-store-installs-summary.json`: 기간, 합계, 최고 주간 값과 원본 checksum

## 검산 결과

| 구분 | 설치 수 |
| --- | ---: |
| Export 1 | 1,106 |
| Export 2 | 7,870 |
| 합계 | **8,976** |

- 데이터 범위: 2025-07-07 ~ 2026-07-06, 주간 53개 행
- 합산 최고 주: 2026-01-12, 701건
- 원본 CSV에는 앱 또는 세그먼트 식별자가 없다. 사용자가 두 파일을 Windows Store 집계의 두 부분이라고 확인한 것을 근거로 합산했으며, 원본은 구분해서 보존한다.
