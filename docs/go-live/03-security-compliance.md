# 3. 보안 및 규정 준수

> **Go-Live 고려 사항** > 보안 및 규정 준수

---

## 📋 목차

- [개요](#개요)
- [3.1 데이터 보안](#31-데이터-보안)
- [3.2 컴플라이언스](#32-컴플라이언스)
- [다음 단계](#다음-단계)

---

## 개요

보안 및 규정 준수는 프로덕션 환경에서 운영하기 위한 필수 요구사항입니다. 데이터 보호, 인증, 그리고 법적 요구사항을 충족해야 합니다.

---

## 3.1 데이터 보안

### 인증/권한

적절한 사용자 인증 및 권한 관리를 구현합니다.

**인증 방식 선택:**

**1. Microsoft Entra ID (Azure AD)**
```
설정 → 보안 → 인증
- 인증 유형: Microsoft Entra ID
- 사용자 로그인 필요: 예
- 토큰 유효 기간: 60분
```

**2. OAuth 2.0**
```
필수 구성:
- Client ID: [애플리케이션 ID]
- Client Secret: [보안 암호]
- Scope: openid, profile, Files.Read.All, Sites.Read.All
- Redirect URI: https://token.botframework.com/.auth/web/redirect
```

**3. 역할 기반 접근 제어 (RBAC)**
```yaml
# 토픽 내 권한 체크
- kind: ConditionGroup
  condition: System.User.Role = "Manager"
  actions:
    - # 관리자만 접근 가능한 기능

- kind: ConditionGroup  
  condition: System.User.Role = "Employee"
  actions:
    - # 일반 직원 기능
```

### 데이터 암호화

민감한 데이터의 전송 및 저장 시 암호화를 보장합니다.

**전송 중 암호화:**
- TLS 1.2 이상 사용
- HTTPS 프로토콜 강제
- API 호출 시 SSL 인증서 검증

**저장 시 암호화:**
```
Power Platform 환경:
- Customer-managed keys (CMK) 활성화
- Azure Key Vault 통합
- 데이터베이스 암호화 (TDE) 활성화
```

**민감 데이터 처리:**
```yaml
# 민감 정보 마스킹 예시
- kind: SetVariable
  variable: Topic.maskedSSN
  value: |
    = Replace(
        Topic.ssn, 
        Mid(Topic.ssn, 4, 6), 
        "***-**-"
      )

# 로깅에서 제외
additionalInstructions: |
  절대 다음 정보를 로그에 남기지 마시오:
  - 주민등록번호
  - 비밀번호
  - 신용카드 번호
  - 계좌번호
```

### 개인정보 보호

GDPR, CCPA 등 관련 규정을 준수합니다.

**GDPR 준수 체크리스트:**

- [ ] **동의 관리**
  ```
  첫 대화 시 동의 획득:
  "개인정보 수집 및 이용에 동의하십니까?
  [자세히 보기] [동의] [거부]"
  ```

- [ ] **데이터 최소화**
  ```
  필요한 최소한의 정보만 수집:
  - 필수: 사용자 ID, 대화 내용
  - 선택: 이메일 (알림 목적)
  - 수집 안함: 불필요한 개인 정보
  ```

- [ ] **열람 권리**
  ```
  사용자가 자신의 데이터 조회 가능:
  "내 대화 기록 보기" 기능 제공
  ```

- [ ] **삭제 권리 (Right to be Forgotten)**
  ```
  Power Platform Admin Center:
  - 사용자 데이터 내보내기
  - 사용자 데이터 삭제
  - 삭제 요청 후 30일 내 처리
  ```

- [ ] **데이터 이동권**
  ```
  표준 형식으로 데이터 제공:
  - JSON, CSV 형식 지원
  - API를 통한 데이터 export
  ```

**개인정보 보관 정책:**

| 데이터 유형 | 보관 기간 | 삭제 방법 |
|------------|-----------|----------|
| 대화 로그 | 90일 | 자동 삭제 |
| 사용자 정보 | 계정 유지 기간 | 계정 삭제 시 |
| 분석 데이터 | 익명화 후 2년 | 자동 삭제 |
| 감사 로그 | 7년 (법적 요구) | 수동 삭제 |

---

## 3.2 컴플라이언스

### 감사 로그

모든 상호작용에 대한 감사 추적을 가능하게 합니다.

**로깅 전략:**

**1. Application Insights 연동**
```
Copilot Studio → 설정 → 고급 → Application Insights
연결 문자열: [Azure Application Insights 연결 문자열]
```

**2. 로그 항목**
```
필수 로그 정보:
- 타임스탬프
- 사용자 ID (익명화 옵션)
- 세션 ID
- 질문/응답 내용
- 토픽/액션 경로
- 응답 시간
- 오류 발생 여부
- IP 주소 (선택적)
```

**3. 감사 로그 조회 쿼리**
```kql
// 특정 사용자의 모든 대화 기록
customEvents
| where customDimensions["userId"] == "user@company.com"
| where timestamp > ago(30d)
| project 
    timestamp,
    sessionId = customDimensions["sessionId"],
    message = customDimensions["message"],
    topic = customDimensions["topicName"]
| order by timestamp desc

// 실패한 인증 시도
customEvents
| where name == "AuthenticationFailed"
| summarize FailedAttempts = count() by 
    UserId = tostring(customDimensions["userId"]),
    bin(timestamp, 1h)
| where FailedAttempts > 5
```

### 데이터 보존

법적 요구사항에 따른 데이터 보존 정책을 수립합니다.

**보존 정책 매트릭스:**

| 데이터 유형 | 보존 기간 | 법적 근거 | 보관 위치 |
|------------|-----------|-----------|----------|
| 대화 내용 | 90일 | 내부 정책 | Application Insights |
| 감사 로그 | 7년 | 금융감독 규정 | Azure Storage (Archive) |
| 인증 로그 | 1년 | 정보보호법 | Log Analytics |
| 오류 로그 | 180일 | 운영 필요 | Application Insights |
| 성능 메트릭 | 2년 | 내부 정책 | Azure Monitor |
| 사용자 피드백 | 3년 | 품질 관리 | Dataverse |

**자동 보존 정책 구성:**
```powershell
# Azure CLI를 통한 보존 정책 설정
az monitor log-analytics workspace table update \
  --resource-group "rg-copilot" \
  --workspace-name "law-copilot" \
  --name "customEvents" \
  --retention-time 90
```

### 접근 제어

역할 기반 접근 제어(RBAC)를 구현합니다.

**역할 정의:**

| 역할 | 권한 |
|------|------|
| **Copilot 관리자** | 에이전트 설정 변경, 토픽 관리, 게시, 사용자 관리 |
| **Copilot 편집자** | 토픽 수정, 테스트 환경 접근, 분석 읽기 |
| **Copilot 분석가** | 분석 대시보드 읽기, 대화 기록 조회, 리포트 생성 |
| **Copilot 사용자** | 에이전트와 대화, 자신의 대화 기록 조회 |

**RBAC 구현:**
```powershell
# Power Platform 환경 역할 할당
Add-PowerAppsAccount

# 관리자 역할 부여
Set-AdminPowerAppRoleAssignment \
  -EnvironmentName "env-prod" \
  -PrincipalType "User" \
  -PrincipalObjectId "user@company.com" \
  -RoleName "Environment Admin"
```

**접근 로그 모니터링:**
```kql
// 비정상적인 접근 패턴 탐지
AuditLogs
| where ActivityDisplayName contains "modified" 
    or ActivityDisplayName contains "deleted"
| where TargetResources contains "Copilot"
| extend Actor = tostring(InitiatedBy.user.userPrincipalName)
| summarize 
    ModificationCount = count(),
    Actions = make_set(ActivityDisplayName)
    by Actor, bin(TimeGenerated, 1h)
| where ModificationCount > 10  // 1시간에 10회 이상 수정
```

---

## 다음 단계

보안 및 컴플라이언스 요구사항을 충족했다면, 성능 및 확장성 계획을 수립하세요:

➡️ **다음**: [성능 및 확장성](04-performance-scalability.md) - 성능 최적화 및 용량 계획

---

## 네비게이션

| [← 이전: 품질 관리](02-quality-management.md) | [📚 목차로](../go-live-considerations.md) | [다음: 성능 및 확장성 →](04-performance-scalability.md) |
|---|---|---|

---

**문서 정보**
- **버전**: 1.0.0
- **최종 업데이트**: 2024-11-27
- **다음 검토**: 2025-02-27
