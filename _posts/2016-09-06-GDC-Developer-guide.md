---
layout: gdc_post
title: "GDC 사용자 가이드"
permalink: /:categories/:title.html
categories: gdc
tag: [gdc, developer, devcenter, test]
---

# Role 정의

| Role Type | Description | Note |
| ----------- | ---------------------- | ------------- |
| PL | Business PL | 사업팀 담당자 |
| PM | Technical PM | 개발팀 담당자 |
| QA | Game QA | QA 담당자 |
| Developer | Game Company Developer | 게임스튜디오 개발 담당자 |
| Game Planer | Game Company Planer | 게임스튜디오 기획 담당자 |


# Menu 구성 설명

| Menu | Description |
| -------------- | ---------------------------------------- |
| Dashboard | LINE 내부 담당자에게만 노출되는 메뉴로 GDC 에서 진행되고 있는 각 프로젝트별/특정 기능(Ticket/Support)별 진행현황 및 주요 통계를 확인할 수 있는 메뉴입니다. 해당 메뉴를 통해 LINE 게임의 전체 진행상황을 파악하고 내 프로젝트의 진행 현황을 다른 프로젝트와 비교해 볼 수 있습니다. |
| App Management | LINE 게임 론칭 및 운영을 진행하면서 개발사와 LINE 담당자가 각 프로젝트별 진행 현황 확인, 각종 기능 설정, 문의사항 등록, 필요 정보를 공유하는 공간입니다. GDC 에서 대부분의 업무 진행은 App Management 의 개별 App 내에서 이루어지게 됩니다. |
| Documents | 개발사가 LINE 게임 론칭 시 적용해야 하는 SDK와 각종 LINE 게임 가이드 및 정책을 다운로드 받을 수 있는 메뉴입니다. 현재는 Zip 파일 형태로 제공되고 있으나 추후 웹에서 확인할 수 있도록 개선될 예정입니다. |
| FAQ | GDC 를 사용하면서 개발사가 자주 문의하는 질문을 카테고리별로 모아둔 메뉴입니다. |
| My Ticket | 나에게 할당된 티켓의 수를 확인하고 할당 순서와 프로젝트 App 별로 Ticket Task 를 볼 수 있습니다. |
| Support | 내 App 에 최근 등록된 Support 의 숫자를 확인하고 등록 순서와 프로젝트 App 별로 Support 제목을 볼 수 있습니다. |
| My Profile | GDC 에 로그인 되어 있는 계정 정보와 GDC Role 을 확인할 수 있으며, 프로필을 수정할 수 있는 링크를 제공합니다. GDC 로그아웃 버튼 역시 해당 영역에서 수행할 수 있습니다. |


# 개발사 User Assign

> - 개발사 User 등록 권한은 동일 개발사 User 또는 사내(LINE) User 가 가능.
- GDC 시스템 계정과 LINE 계정은 별도 계정이며 LINE 연동을 하려면 mid 등록이 필요.
- User Status: Add a New User->Inviting->Assigned
- 개발사 User 등록 프로세스:
- 개발사 User 등록 & Assign(필수) [User 등록(필수) ->Email 발송(자동)->User 비밀번호 설정(필수)->login->mid 등록(선택)]


## Step1 개발사 User 등록
- App Management>App info>Assign Member 메뉴에서 등록할 User 의 정보를 입력하고 ADD NEW USER 버튼 클릭.
- User 정보 입력후 해당 User Email 로 비밀번호 설정 link 가 포함된 메일이 발송되며 메일의 link 를 클릭하여 비밀번호 설정 및 로그인 가능.
- DELETE 버튼을 클릭하여 초대중인 User 또는 기존 Assign 된 User 삭제 가능.
- comment : LINE Channel 로그인 필요시로그인후 Edit Profile 페이지에서 본인 LINE 계정으로 mid 등록 필요.

 개발사 사내 이메일이 존재하는 경우 사내 이메일로 등록 필요.
 개발사 정보 입력시 개발사 사내 이메일 있음을 선택하였다면 개발사 User 등록시 Email 도메인 정확여부 체크.
 GDC 시스템에 등록된 User 인 경우 이미 등록된 정보가 노출되며 ADD NEW USER 버튼 클릭시 해당 APP 에 Assign.

![](/assets/images/gdc-developer-guide-001.png)


# Ticket Owner 설정 (선택)

> - Ticket Owner 설정은 각 게임별로 Role 별 Ticket 담당자를 정하여, 해당 게임에서 해당 Role 에게 할당되는 모든 Ticket 은 모든 해당 담당자에서 Assign되며 메세지 알람도 해당 담당자에게 발송.
- Ticket Owner 설정을 하지 않은 경우 Ticket 은 해당 Role의 모든 담당자에게 할당.
- Ticket Owner 는 수시로 변경 가능.

## Step1 Ticket Owner 설정
- App Management > Setting > Ticket Owner 메뉴에서 각 Role 별 Ticket Owner 담당자 선정후 Save 버튼 클릭.

 Ticket Owner 는 설정후 수시로 변경 가능.

![](/assets/images/gdc-developer-guide-002.png)


# Sandbox환경 IP등록 (필수)

> - Sandbox IP 등록은 LINE Game 에서 개발사에 제공하는 Sandbox 환경을 이용 가능하기 위해 개발사 서버 IP 를 Sandbox 존의 Whitelist 에 등록하기 위함.
- 등록된 IP 의 유효기간은 등록일부터 90 일까지 계속하여 사용하기 원한다면 해당 페이지에서 연장 가능.
- 해당 페이지에 등록된 IP는 LDC의 Whitelist에도 자동으로 등록.

## Step1 Sandbox IP 등록
- App Management>App info>Sandbox Setup>IP Address Registration 메뉴에서 개발사 IP 입력후 하단의 ADD 버튼 클릭.
- comment :LINE Game Sandbox 환경 이용할 경우 **필수** 입력.

 등록된 IP 유효기간은 등록일로 부터 90 일까지이며 필요시 Extension 버튼을 클릭하여 연장 가능.
 등록 필요가 없는 서버 IP 는 오른쪽의 삭제 아이콘을 클릭하여 삭제 가능.

![](/assets/images/gdc-developer-guide-003.png)

# 환경 조사서 작성

## Step1 환경 조사서 작성
- App Management>App info>Preliminary Research 메뉴에서 필요 정보 등록.
- 상단의 Server,Client,Database Type 별로 정보 입력이 필요하며, 각 항목의 옆에 있는 ADD 버튼을 클릭하여 정보 입력후 하단의 SUBMIT 버튼을 클릭하면 정보 저장.
- comment :Publishing 게임인 경우 **필수** 입력 .

 Component 단위별 또는 Client 의 PTDB 프로젝트 생성은 GDC 시스템에서 배치 작업으로 진행되며, PTDB 시스템에 해당 프로젝트가 등록되지 않은 경우 GDC 시스템 담당자에게 확인 요청 필요.

![](/assets/images/gdc-developer-guide-004.png)


# BTS 계정 등록

> BTS 계정 등록은 LINE Game 프로젝트 전용 BTS(BTS-ex)시스템에 개발사 계정을 등록하고 해당 프로젝트의 BTS 접근 권한 자동 부여 가능.
BTS 계정과 GDC 시스템의 계정은 별도의 계정이며 GDC 시스템 User 가 아니여도 타인이 대신 BTS 계정 신청 가능.
 개발사는 BTS 시스템에 접근하려면 개발사 IP 를 BTS 시스템의 Whitelist 에 등록이 필요하며 Whitelist 등록도 해당 페이지에서 진행.IP 는 개발사 IP 대역으로 입력 필요하고 IP Whitelist 유효기간은 등록일로 부터 90 일까지이며 연장 필요시 해당 페이지에서 진행 가능.
>> BTS 계정 등록 프로세스 : [BTS 계정 신청->비밀번호 설정 Email 발송(자동)->비밀번호 설정->로그인]

## Step1 BTS 계정 등록
- App Management>App info>BTS Account>Manage Account 메뉴에서 하단의 ADD 버튼 클릭, 등록할 User 정보 입력후 Submit 버튼 클릭.
- comment :개발사 User 계정만 등록 필요 .

 등록후 해당 Email 로 비밀번호 설정 URL 이 발송되며 해당 URL 을 클릭하여 비밀번호 설정후 로그인 가능.
 각 BTS ID 오른쪽에 있는 Reset Password 링크를 클릭하여 비밀번호 설정이 가능하며 계정 삭제 필요시 Withdraw 링크 클릭하면 삭제 가능.

![](/assets/images/gdc-developer-guide-005.png)

## Step2 Whitelist IP 등록
- App Management>App info>BTS Account>Manage IP White List 메뉴에서 하단에 있는 ADD 버튼 클릭하고 등록할 IP 입력후 Submit 버튼 클릭.
- comment :개발사 IP 대역으로 subnet mask 형식으로 등록 필요.

 각 IP 의 오른쪽에 있는 Delete 링크를 클릭하여 불필요한 IP 삭제 가능.

![](/assets/images/gdc-developer-guide-006.png)


# Sandbox Ranking 팩터 등록

> Sandbox Ranking 팩터 등록 기능은 개발사를 위해 Sandbox 환경에서 Ranking 팩터를 설정할수 있는 환경을 제공하여 설정에 따라 게임 Ranking 이 제대로 반영되는지 여부 확인 가능. Publishing 게임에만 제공 되는 기능.

## Step1 Sandbox Ranking 팩터 등록
- App Management>App info>Sandbox Setup 메뉴에서 각 항목을 설정하고 하단의 ADD 버튼을 클릭하여 저장.

![](/assets/images/gdc-developer-guide-007.png)

# Submit Build

> - Submit Build 는 개발사에게 게임 빌드 파일을 업로드 하는 환경을 제공하고 게임 서비스 버전별 빌드 파일 관리 가능.
- Publishing 게임에서는 Staging 환경과 Real 환경의 빌드 파일 업로드 가능,
- semi-publishing/Channeling 게임에서는 Real 환경의 빌드 파일 업로드만 가능.
- Launching 단계에서 업로드 가능한 빌드 타입은 QA 용 빌드,Contents 용 빌드,과금테스트용 Payment 빌드,Server Check 빌드로 구분.Sustaining 단계에서는 QA 용 빌드만 업로드 가능.
- 각 타입별 빌드 Status :
>
|Build Type |Role |Status|
|QA |All | Before Review->In Review->QA Pass->Final Check->Released|
|Contents |PL/Developer| Not Registered-> Registered |
|Payment |PM/Developer|Not Registered-> Registered |
|Server Check |PM/Developer |Not Registered-> Registered |

>> Sustaining 단계에서 입력되는 Service Version 은 QA 리소스 관리 시스템과 연동하는 키값이므로 정확한 입력 필요.
>
* Submit Build 프로세스:
 * Staging Build 등록(Publishing 게임 필수)
 * Staging Build Review 신청(Publishing 게임 필수)
 * Staging Build Review(Publishing 게임 필수)
 * Release Build 요청(Publishing 게임 필수)
 * Release Build 등록(필수)
 * Release Build Review 신청(필수)
 * Release Build Review(필수)
 * Release Build(필수)
 * Service Version 등록(Sustaining 단계 필수)

## Stpe1 Staging Build 등록 (Developer)
- App Management>Submit Builds 메뉴에서 업로드할 빌드 Type 을 확인하고 오른쪽의 Go 버튼 클릭.
- Version 입력 및 UPLOAD 버튼을 클릭하여 파일 업로드후 하단의 SUBMIT 버튼 클릭.

![](/assets/images/gdc-developer-guide-008.png)

## Step2 Staging Build Review 요청( Developer )
- 파일 업로드후 하단에 있는 Request Review 버튼을 클릭하여 Review 요청.

![](/assets/images/gdc-developer-guide-009.png)

## Step3 Review Staging Build (PM)
- 업로드된 파일에 대해 Review 진행후 결과 반영, 오른쪽 선택항목에서 Pass/Reject Status 값을 선택하여 Status 변경.

![](/assets/images/gdc-developer-guide-010.png)

## Step4 Release Build 요청 (PM)
- 업로드된 파일의 Review 결과가 전부 Pass 인경우 하단의 Release Build 버튼을 클릭하여 Release Build 요청.

![](/assets/images/gdc-developer-guide-011.png)


## Step5 Release Build 등록 (Developer)
- Release 파일 업로드 페이지에서 Upload File 링크 클릭.
- 노출되는 페이지에서 Release Build 파일 업로드후 하단의 SUBMIT 버튼 클릭.

![](/assets/images/gdc-developer-guide-012.png)


## Step6 Release Build Review 요청 (Developer)
- Release Build 업로드후 하단의 Request Final Check 버튼을 클릭하여 Release Build 에 대해 Review 요청.

![](/assets/images/gdc-developer-guide-013.png)


## Step7 Release Build Check (PM)
- Client 빌드 파일의 오른쪽에 있는 Client Check 버튼을 클릭하여 빌드에 대해 Check 진행.

![](/assets/images/gdc-developer-guide-014.png)


- Client 빌드 Check 결과를 확인하고 하단에 있는 Check OK 또는 Check NG 버튼을 클릭하여 Client 빌드 결과 반영.
 - Client Build Check 결과는 PM 이 수동으로 선택,자동체크 결과에 NG 인 항목이 있어도 결과를 Check OK 로 설정 가능.

![](/assets/images/gdc-developer-guide-015.png)


- 오른쪽 선택항목에서 Pass/Reject 값을 선택하여 Status 변경.
 - Client Build Check 결과를 NG 로 설정하였을 경우 해당 Client Build 는 자동으로 Reject 처리.

 ![](/assets/images/gdc-developer-guide-016.png)


## Step8 Release Build (PM)
- Release Client Build 리뷰 결과가 전체 Pass 인 경우 하단의 Release Build 버튼 클릭.

![](/assets/images/gdc-developer-guide-017.png)


- Release 후 Staging Zone 과 Release Zone 의 Status 는 각각 QA Pass/Released 로 되며 ,우측 상단의 All History 링크를 클릭하여 전체 진행

History 확인 가능.
![](/assets/images/gdc-developer-guide-018.png)


## Step9 Service Version 추가
- App Management>Submit Builds 우측에 있는 Add Service Version 버튼을 클릭하여 service version 을 추가하는 페이지로 이동.
 - Service Version 추가는 PL 만 가능하며,Sustaining 단계로 진입후 Ticket 발행은 Service Version 단위로 발급되며 ,해당 Service Version 은 QARS 시스템과 연동하는 키값으로 GDC Main 페이지에서 QARS 데이터 연동시 사용.

![](/assets/images/gdc-developer-guide-019.png)

- Service version 추가후 하단의 Submit 버튼 클릭.
 - GDC 시스템에서 Ticket 자동 발행은 Type 이 Update 인 경우만 진행.
 - Service Version 추가후 나머지 부분은 Launching 단계 빌드 등록과 동일한 Process 로 진행.

![](/assets/images/gdc-developer-guide-020.png)
