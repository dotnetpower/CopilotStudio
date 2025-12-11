---
sidebar_position: 6
title: Application Insights 쿼리 가이드
description: Copilot Studio의 대화 로그 및 성능 데이터를 Application Insights에서 조회하는 KQL(Kusto Query Language) 쿼리 예시 모음입니다.
---

# Application Insights 쿼리 가이드

Copilot Studio의 대화 로그 및 성능 데이터를 Application Insights에서 조회하는 KQL(Kusto Query Language) 쿼리 예시 모음입니다.

## 📋 목차

- [1. 대화 조회](#1-대화-조회)
- [2. 성능 분석](#2-성능-분석)
- [3. 사용자 분석](#3-사용자-분석)
- [4. 오류 분석](#4-오류-분석)
- [5. 토픽 분석](#5-토픽-분석)
- [6. 고급 분석](#6-고급-분석)

---

## 1. 대화 조회

### 1.1 전체 대화 목록

```kql
// 최근 24시간 동안의 모든 대화
customEvents
| where timestamp > ago(24h)
| where name == "ConversationStart" or name == "ConversationEnd"
| extend 
    SessionId = tostring(customDimensions["sessionId"]),
    UserId = tostring(customDimensions["userId"]),
    ConversationType = name
| project timestamp, SessionId, UserId, ConversationType
| order by timestamp desc
```

### 1.2 특정 사용자의 대화 기록

```kql
// 특정 사용자의 최근 30일 대화 기록
let targetUser = "user@company.com";
customEvents
| where timestamp > ago(30d)
| where tostring(customDimensions["userId"]) == targetUser
| extend 
    SessionId = tostring(customDimensions["sessionId"]),
    Message = tostring(customDimensions["message"]),
    Topic = tostring(customDimensions["topicName"]),
    Intent = tostring(customDimensions["intent"])
| project timestamp, SessionId, Message, Topic, Intent
| order by timestamp desc
```

### 1.3 대화 상세 내용 조회

```kql
// 특정 세션의 전체 대화 내용 (타임라인)
let targetSession = "session_12345";
customEvents
| where tostring(customDimensions["sessionId"]) == targetSession
| extend 
    MessageType = case(
        name == "MessageReceived", "사용자",
        name == "MessageSent", "봇",
        name
    ),
    Content = tostring(customDimensions["message"]),
    Topic = tostring(customDimensions["topicName"])
| project 
    시간 = format_datetime(timestamp, 'yyyy-MM-dd HH:mm:ss'),
    발신자 = MessageType,
    메시지 = Content,
    토픽 = Topic
| order by 시간 asc
```

### 1.4 최근 대화 요약

```kql
// 최근 100개 대화 요약 (시작/종료 시간, 메시지 수)
customEvents
| where timestamp > ago(7d)
| where name in ("MessageReceived", "MessageSent", "ConversationEnd")
| extend SessionId = tostring(customDimensions["sessionId"])
| summarize 
    시작시간 = min(timestamp),
    종료시간 = max(timestamp),
    메시지수 = count(),
    해결여부 = any(tostring(customDimensions["resolved"])),
    사용자 = any(tostring(customDimensions["userId"]))
    by SessionId
| extend 대화시간 = datetime_diff('minute', 종료시간, 시작시간)
| project 시작시간, 종료시간, 대화시간, 메시지수, 사용자, 해결여부
| order by 시작시간 desc
| take 100
```

---

## 2. 성능 분석

### 2.1 응답 시간 분석

```kql
// 응답 시간 통계 (P50, P95, P99)
customEvents
| where timestamp > ago(24h)
| where name == "MessageSent"
| extend ResponseTime = todouble(customDimensions["responseTime"])
| summarize 
    평균 = avg(ResponseTime),
    P50 = percentile(ResponseTime, 50),
    P95 = percentile(ResponseTime, 95),
    P99 = percentile(ResponseTime, 99),
    최소 = min(ResponseTime),
    최대 = max(ResponseTime),
    총요청수 = count()
| extend 
    평균_초 = round(평균/1000, 2),
    P50_초 = round(P50/1000, 2),
    P95_초 = round(P95/1000, 2),
    P99_초 = round(P99/1000, 2)
| project 총요청수, 평균_초, P50_초, P95_초, P99_초
```

### 2.2 시간대별 응답 시간 추이

```kql
// 시간대별 평균 응답 시간 (1시간 단위)
customEvents
| where timestamp > ago(7d)
| where name == "MessageSent"
| extend ResponseTime = todouble(customDimensions["responseTime"])
| summarize 
    평균응답시간_ms = avg(ResponseTime),
    P95_ms = percentile(ResponseTime, 95),
    요청수 = count()
    by bin(timestamp, 1h)
| extend 
    평균_초 = round(평균응답시간_ms/1000, 2),
    P95_초 = round(P95_ms/1000, 2)
| project timestamp, 평균_초, P95_초, 요청수
| render timechart
```

### 2.3 느린 응답 조회

```kql
// 응답 시간이 10초 이상인 요청 조회
customEvents
| where timestamp > ago(24h)
| where name == "MessageSent"
| extend 
    ResponseTime = todouble(customDimensions["responseTime"]),
    Message = tostring(customDimensions["message"]),
    Topic = tostring(customDimensions["topicName"]),
    UserId = tostring(customDimensions["userId"])
| where ResponseTime > 10000  // 10초
| extend ResponseTime_초 = round(ResponseTime/1000, 2)
| project timestamp, ResponseTime_초, Topic, Message, UserId
| order by ResponseTime_초 desc
```

### 2.4 토픽별 평균 응답 시간

```kql
// 토픽별 성능 비교
customEvents
| where timestamp > ago(7d)
| where name == "TopicTriggered"
| extend 
    TopicName = tostring(customDimensions["topicName"]),
    Duration = todouble(customDimensions["duration"])
| summarize 
    실행횟수 = count(),
    평균시간_ms = avg(Duration),
    P95_ms = percentile(Duration, 95)
    by TopicName
| extend 
    평균_초 = round(평균시간_ms/1000, 2),
    P95_초 = round(P95_ms/1000, 2)
| order by 실행횟수 desc
```

---

## 3. 사용자 분석

### 3.1 일일 활성 사용자 (DAU)

```kql
// 일별 활성 사용자 수
customEvents
| where timestamp > ago(30d)
| where name == "ConversationStart"
| extend UserId = tostring(customDimensions["userId"])
| summarize DAU = dcount(UserId) by bin(timestamp, 1d)
| render timechart
```

### 3.2 사용자별 대화 빈도

```kql
// 최근 30일간 사용자별 대화 횟수 (Top 20)
customEvents
| where timestamp > ago(30d)
| where name == "ConversationStart"
| extend UserId = tostring(customDimensions["userId"])
| summarize 
    대화횟수 = count(),
    마지막대화 = max(timestamp)
    by UserId
| order by 대화횟수 desc
| take 20
```

### 3.3 신규 vs 재방문 사용자

```kql
// 일별 신규/재방문 사용자 분석
let period = 30d;
let currentPeriod = ago(period);
customEvents
| where timestamp > currentPeriod
| where name == "ConversationStart"
| extend UserId = tostring(customDimensions["userId"])
| summarize 
    첫대화 = min(timestamp),
    대화수 = count()
    by UserId
| extend 사용자유형 = iff(대화수 == 1, "신규", "재방문")
| summarize count() by 사용자유형
```

### 3.4 사용자 행동 패턴 (시간대별)

```kql
// 시간대별 사용자 활동 패턴
customEvents
| where timestamp > ago(30d)
| where name == "ConversationStart"
| extend 시간대 = datetime_part("hour", timestamp)
| summarize 대화수 = count() by 시간대
| order by 시간대 asc
| render columnchart
```

---

## 4. 오류 분석

### 4.1 전체 오류 현황

```kql
// 최근 24시간 오류 통계
exceptions
| where timestamp > ago(24h)
| summarize 
    오류수 = count(),
    영향받은사용자 = dcount(user_Id),
    최근발생 = max(timestamp)
    by 
    오류유형 = type,
    오류메시지 = outerMessage
| order by 오류수 desc
```

### 4.2 오류 추이 분석

```kql
// 시간별 오류 발생 추이
exceptions
| where timestamp > ago(7d)
| summarize 오류수 = count() by bin(timestamp, 1h), type
| render timechart
```

### 4.3 특정 오류 상세 조회

```kql
// 특정 오류의 상세 정보 및 스택 트레이스
exceptions
| where timestamp > ago(24h)
| where type == "System.TimeoutException"  // 원하는 오류 타입
| extend 
    SessionId = tostring(customDimensions["sessionId"]),
    UserId = tostring(customDimensions["userId"])
| project 
    timestamp,
    오류메시지 = outerMessage,
    스택트레이스 = details,
    SessionId,
    UserId
| order by timestamp desc
```

### 4.4 실패한 API 호출

```kql
// 실패한 외부 API 호출 분석
dependencies
| where timestamp > ago(24h)
| where success == false
| extend 
    API이름 = name,
    대상 = target,
    응답코드 = resultCode
| summarize 
    실패횟수 = count(),
    마지막실패 = max(timestamp)
    by API이름, 대상, 응답코드
| order by 실패횟수 desc
```

---

## 5. 토픽 분석

### 5.1 가장 많이 사용되는 토픽

```kql
// 토픽 사용 빈도 Top 20
customEvents
| where timestamp > ago(30d)
| where name == "TopicTriggered"
| extend TopicName = tostring(customDimensions["topicName"])
| summarize 
    트리거횟수 = count(),
    고유사용자 = dcount(tostring(customDimensions["userId"]))
    by TopicName
| order by 트리거횟수 desc
| take 20
```

### 5.2 토픽 완료율

```kql
// 토픽별 성공/실패율
customEvents
| where timestamp > ago(7d)
| where name in ("TopicTriggered", "TopicCompleted", "TopicFailed")
| extend 
    TopicName = tostring(customDimensions["topicName"]),
    EventType = name
| summarize 
    시작 = countif(EventType == "TopicTriggered"),
    완료 = countif(EventType == "TopicCompleted"),
    실패 = countif(EventType == "TopicFailed")
    by TopicName
| extend 
    완료율 = round(완료 * 100.0 / 시작, 2),
    실패율 = round(실패 * 100.0 / 시작, 2)
| order by 시작 desc
```

### 5.3 토픽 전환 흐름

```kql
// 토픽 간 전환 패턴 분석
customEvents
| where timestamp > ago(7d)
| where name == "TopicTriggered"
| extend 
    SessionId = tostring(customDimensions["sessionId"]),
    TopicName = tostring(customDimensions["topicName"])
| order by SessionId, timestamp asc
| serialize
| extend NextTopic = next(TopicName, 1)
| where SessionId == next(SessionId, 1)  // 동일 세션 내에서만
| summarize 전환횟수 = count() by TopicName, NextTopic
| where 전환횟수 > 5  // 5회 이상 발생한 패턴만
| order by 전환횟수 desc
```

### 5.4 미해결 토픽 (Unknown Intent)

```kql
// 봇이 이해하지 못한 질문 분석
customEvents
| where timestamp > ago(7d)
| where name == "UnknownIntent"
| extend 
    UserMessage = tostring(customDimensions["userMessage"]),
    UserId = tostring(customDimensions["userId"])
| summarize 
    발생횟수 = count(),
    예시 = take_any(UserMessage)
    by 질문 = UserMessage
| order by 발생횟수 desc
| take 50
```

---

## 6. 고급 분석

### 6.1 사용자 만족도 분석

```kql
// 일별 사용자 만족도 추이
customEvents
| where timestamp > ago(30d)
| where name == "UserFeedback"
| extend 
    Rating = toint(customDimensions["rating"]),
    Comment = tostring(customDimensions["comment"])
| summarize 
    평균평점 = avg(Rating),
    총피드백수 = count(),
    긍정비율 = countif(Rating >= 4) * 100.0 / count(),
    부정비율 = countif(Rating <= 2) * 100.0 / count()
    by bin(timestamp, 1d)
| project 
    날짜 = timestamp,
    평균평점 = round(평균평점, 2),
    긍정비율 = round(긍정비율, 1),
    부정비율 = round(부정비율, 1),
    총피드백수
| render timechart
```

### 6.2 부정 피드백 상세 분석

```kql
// 낮은 평점과 함께 남긴 코멘트 분석
customEvents
| where timestamp > ago(30d)
| where name == "UserFeedback"
| extend 
    Rating = toint(customDimensions["rating"]),
    Comment = tostring(customDimensions["comment"]),
    UserId = tostring(customDimensions["userId"]),
    Topic = tostring(customDimensions["topicName"])
| where Rating <= 2
| where isnotempty(Comment)
| project timestamp, Rating, Comment, Topic, UserId
| order by timestamp desc
```

### 6.3 대화 완료율 (Containment Rate)

```kql
// 에이전트 해결 vs 에스컬레이션 비율
customEvents
| where timestamp > ago(30d)
| where name == "ConversationEnd"
| extend 
    Resolved = tobool(customDimensions["resolved"]),
    Escalated = tobool(customDimensions["escalated"])
| summarize 
    전체대화 = count(),
    봇해결 = countif(Resolved and not(Escalated)),
    상담원연결 = countif(Escalated),
    미해결 = countif(not(Resolved) and not(Escalated))
| extend 
    완료율 = round(봇해결 * 100.0 / 전체대화, 2),
    에스컬레이션율 = round(상담원연결 * 100.0 / 전체대화, 2)
```

### 6.4 에스컬레이션 사유 분석

```kql
// 상담원 연결 사유별 통계
customEvents
| where timestamp > ago(30d)
| where name == "Escalated"
| extend 
    Reason = tostring(customDimensions["escalationReason"]),
    Topic = tostring(customDimensions["topicName"]),
    UserQuery = tostring(customDimensions["userQuery"])
| summarize 
    건수 = count(),
    예시질문 = take_any(UserQuery),
    관련토픽 = make_set(Topic, 5)
    by Reason
| order by 건수 desc
```

### 6.5 피크 시간대 용량 분석

```kql
// 동시 세션 수 추이 (5분 단위)
customEvents
| where timestamp > ago(24h)
| where name in ("ConversationStart", "ConversationEnd")
| extend 
    SessionId = tostring(customDimensions["sessionId"]),
    EventType = name
| summarize 
    시작 = countif(EventType == "ConversationStart"),
    종료 = countif(EventType == "ConversationEnd")
    by bin(timestamp, 5m)
| extend 누적세션 = row_cumsum(시작 - 종료)
| project timestamp, 동시세션수 = 누적세션, 신규세션 = 시작
| render timechart
```

### 6.6 코호트 분석 (사용자 리텐션)

```kql
// 주별 사용자 리텐션 분석
let cohortStart = startofweek(ago(12w));
let cohortEnd = now();
customEvents
| where timestamp between (cohortStart .. cohortEnd)
| where name == "ConversationStart"
| extend 
    UserId = tostring(customDimensions["userId"]),
    Week = startofweek(timestamp)
| summarize 첫방문주 = min(Week) by UserId
| join kind=inner (
    customEvents
    | where timestamp between (cohortStart .. cohortEnd)
    | where name == "ConversationStart"
    | extend 
        UserId = tostring(customDimensions["userId"]),
        Week = startofweek(timestamp)
    | distinct UserId, Week
) on UserId
| extend 경과주차 = datetime_diff('week', Week, 첫방문주)
| summarize 활성사용자 = dcount(UserId) by 첫방문주, 경과주차
| order by 첫방문주, 경과주차
```

### 6.7 A/B 테스트 결과 분석

```kql
// A/B 테스트 그룹별 성능 비교
customEvents
| where timestamp > ago(7d)
| where name == "MessageSent"
| extend 
    Variant = tostring(customDimensions["abTestVariant"]),  // "A" or "B"
    ResponseTime = todouble(customDimensions["responseTime"]),
    Satisfaction = toint(customDimensions["satisfaction"])
| where isnotempty(Variant)
| summarize 
    샘플수 = count(),
    평균응답시간_ms = avg(ResponseTime),
    평균만족도 = avg(Satisfaction),
    P95응답시간_ms = percentile(ResponseTime, 95)
    by Variant
| extend 
    평균응답시간_초 = round(평균응답시간_ms/1000, 2),
    P95_초 = round(P95응답시간_ms/1000, 2),
    평균만족도 = round(평균만족도, 2)
| project Variant, 샘플수, 평균응답시간_초, P95_초, 평균만족도
```

### 6.8 API 사용량 모니터링

```kql
// 외부 API 호출 통계
dependencies
| where timestamp > ago(24h)
| where type == "HTTP"
| extend API = strcat(target, " - ", name)
| summarize 
    총호출수 = count(),
    성공 = countif(success == true),
    실패 = countif(success == false),
    평균응답시간_ms = avg(duration),
    P95_ms = percentile(duration, 95)
    by API
| extend 
    성공률 = round(성공 * 100.0 / 총호출수, 2),
    평균_초 = round(평균응답시간_ms/1000, 2),
    P95_초 = round(P95_ms/1000, 2)
| order by 총호출수 desc
```

---

## 💡 팁 및 Best Practices

### 효율적인 쿼리 작성

1. **시간 범위 제한**
   ```kql
   // 항상 시간 범위를 먼저 필터링
   | where timestamp > ago(24h)
   ```

2. **인덱스 활용**
   ```kql
   // customDimensions 접근 시 명시적 타입 변환
   | extend UserId = tostring(customDimensions["userId"])
   ```

3. **집계 최적화**
   ```kql
   // summarize는 가능한 한 늦게 사용
   | where [필터 조건들]
   | extend [변환들]
   | summarize [집계]
   ```

### 성능 최적화

- 큰 데이터셋은 `take` 또는 `top`으로 제한
- 불필요한 컬럼은 `project`로 제외
- `join` 대신 `lookup` 사용 고려
- 복잡한 쿼리는 `let` 문으로 분할

### 알림 설정

위의 쿼리들을 Azure Monitor 알림 규칙으로 활용할 수 있습니다:

```kql
// 오류율 5% 초과 시 알림
customEvents
| where timestamp > ago(5m)
| where name == "MessageSent"
| summarize 
    Total = count(),
    Errors = countif(tostring(customDimensions["error"]) != "")
| extend ErrorRate = (Errors * 100.0) / Total
| where ErrorRate > 5
```

---

## 📚 참고 자료

- [KQL 공식 문서](https://learn.microsoft.com/ko-kr/azure/data-explorer/kusto/query/)
- [Application Insights 쿼리 예제](https://learn.microsoft.com/ko-kr/azure/azure-monitor/logs/examples)
- [Copilot Studio 텔레메트리](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/analytics-telemetry)

---

**문서 정보**
- **버전**: 1.0.0
- **최종 업데이트**: 2024-11-27
- **다음 검토**: 2025-02-27

[← 메인으로 돌아가기](/)
