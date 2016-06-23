---
layout: post
title:  "API List"
categories: test2
---

#문서 개요
이 문서는 박주형와 라인 게임 플랫폼이 각각의 역량을 전송하고 수신받는 API연동 데이터를 정의합니다.

# 박주형 API
다음은 박주형 API에서 지원되는 기능입니다.

## 프로필
> HOST [https://api.fordism.net](https://kr.linkedin.com/in/dusskapark)

|URL|METHOD|기능|
|--|--|--|
|/user/me|GET|업무 히스토리 정보 조회|
|/user/version|GET|버전 정보|
|/user/upgrade|POST|업그레이드|



## 데이터 분석

> HOST [https://data.fordism.net](https://github.com/dusskapark/analytics101)

|URL|METHOD|기능|
|--|--|--|
|/v1/api/ga/stutus|GET|개별 데이터 확인/현황 조회 기능|
|/v1/api/ga/intelligence|GET|서비스에 문제되는 상황에 대한 intelligence 알림 |
|/v1/api/ga/library|GET|데이터 분석 리포트 및 기획문서 조회 기능|
|/v1/api/ga/create|POST|새 데이터분석 리포트 또는 measurement 규격 생성 기능|
|/v1/api/ga/update|POST|문서 업데이트|
|/v1/api/ga/code|POST|통계 수집 코드 생성/적용 기능 (js)|
|/v1/api/r/library|GET|R 데이터 분석 리포트 조회 기능|
|/v1/api/r/create|POST|새 R 데이터 분석 리포트 생성 기능|
|/v1/api/r/update|POST|문서 업데이트|


## 서비스 운영

> HOST [https://api.fordism.net](http://fordism.net)


|URL|METHOD|기능|
|--|--|--|
|/maint/dev_rel|GET|개발자 Relations 기능|
|/maint/comm/feedback_rt|POST|실시간 고객 1차 피드백 운영기능(sync)|
|/maint/comm/feedback|GET/POST|고객 피드백 운영기능(async)|
|/maint/comm/create|POST|고객/개발자 커뮤니케이션 기능|
|/maint/comm/cross_functions|POST|여러 부서에 공유 기능|
|/maint/policy/access_info|GET|정책 유효성 검사 및 검색기능(약관 등)|
|/maint/policy/create|POST|신규 플랫폼 운영정책 생성(약관 등)|


## 서비스 기획/프로토타이핑

> HOST [https://api.fordism.net](http://fordism.net)

|URL|METHOD|기능|
|--|--|--|
|/v1/api/research/import|POST|내외부 데이터, 고객 피드백 등을 import|
|/v1/api/research/intelligence|GET|데이터에 기반한 의사결정 기능|
|/v1/api/research/tech|GET|최신 기술 트랜드 조회 기능|
|/v1/api/doc/library|GET|기획서/정책서 확인 기능|
|/v1/api/doc/create|POST|신규 문서 생성 기능|
|/v1/api/doc/update|POST|문서 업데이트 기능|
|/v1/api/doc/commit|POST|이슈트래커 등으로 문서 배포 기능|
|/v2/api/proto/repo|GET|프로토타이핑 저장소|
|/v2/api/proto/create|POST|새 프로토타이핑 애셋 생성|
|/v2/api/proto/update|POST|프로토타이핑 코드 업데이트|
|/v2/api/proto/push|POST|`git push -m "퍼블리싱 배포"`|
|/v1/api/qa/feedback_rt|POST|실시간 QA 1차 피드백 운영기능(sync)|
|/v1/api/qa/feedback|POST|실시간 QA 피드백 운영기능(sync)|

## HTTP 상태 코드

|상태 코드|설명|비고|
|--|--|--|
|200|성공|Response Body의 경우 각 API별로 틀릴 수 있음|
|400|실패|일반적인 오류. 주로 API에 필요한 필수 파라미터와 관련|
|401|실패|인증 오류 (승인되지 않은 사용자)|
|500|실패|시스템 오류|
|503|실패|서비스 점검중(휴가중)|

> 호출 성공의 경우 각각의 API별 응답 바디(Response Body)의 형식이 다를 수 있으므로, 자세한 내용은 각 API별 상세 설명을 참고하세요.
