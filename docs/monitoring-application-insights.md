---
sidebar_position: 4
title: Application Insights 모니터링 설정
description: Application Insights를 활용하여 Copilot Studio의 대화 이력을 추적하고 모니터링하는 방법을 안내합니다.
---

# 모니터링을 위한 APM 설정 방법 (Application Insights)

Application Insights를 활용하여 Copilot Studio의 대화 이력을 추적하고 모니터링하는 방법을 안내합니다.

## 1. Application Insights 리소스 생성

![Application Insights 생성](../images/2024-12-16-17-41-46.png)

- workspace 는 Log Analytics workspace 로써, 공용으로 사용해도 되며 생성된 리소스가 존재하지 않는 경우 새롭게 생성됩니다.

## 2. Connection String 복사

생성된 Application Insights 리소스의 `개요` 화면의 우측에 Connection String을 복사합니다.

![Connection String 복사](../images/2024-12-16-17-45-24.png)

## 3. Copilot Studio 연결 설정

복사해둔 Connection String을 Copilot Studio의 [설정]-[고급] 화면에서 Application Insights를 선택하고 `연결 문자열`에 붙여넣습니다. 연결까지 약 5분 소요됩니다.

![Copilot Studio 연결](../images/2024-12-16-17-46-54.png)

## 4. 테스트

연결한 Copilot Studio에서 질문을 하여 테스트를 진행합니다. (약 5분 뒤에 로그가 Application Insights로 저장됩니다)

## 5. 로그 조회

Azure Application Insights의 [Monitoring]-[Log]에서 `customEvents` 테이블을 더블클릭하면 쿼리 편집기에 추가되며 `Run` 버튼을 클릭하여 실행합니다.

![로그 조회](../images/2024-12-16-17-51-53.png)

## 6. 로그 확인

다음과 같이 로그를 확인할 수 있습니다.

![로그 확인](../images/2024-12-16-17-53-42.png)

## 7. Kusto 쿼리를 통한 데이터 조회

다음과 같이 Kusto 쿼리를 통해서 필요한 데이터를 조회할 수 있습니다.

```kql
customEvents 
| extend Message = iif(customDimensions["Message"] <> "", customDimensions["Message"], customDimensions["text"])
| order by timestamp asc     
```

![Kusto 쿼리 결과](../images/2024-12-16-18-02-57.png)
