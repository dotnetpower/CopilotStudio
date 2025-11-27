# Go-Live 고려 사항

Copilot Studio 에이전트를 프로덕션 환경에 배포하기 전에 고려해야 할 평가 항목 작성 가이드 및 Best Practices를 안내합니다.

---

## 📑 목차

### 📋 계획 단계
1. [**목표 정의 및 범위 설정**](go-live/01-goal-definition.md)
   - 비즈니스 목표 설정
   - 성공 지표 (KPI) 정의
   - 범위 및 제약사항 명확화

2. [**품질 관리**](go-live/02-quality-management.md)
   - 응답 품질 테스트
   - 사용자 경험 설계 (CUX)
   - 오류 처리 및 에스컬레이션

3. [**보안 및 규정 준수**](go-live/03-security-compliance.md)
   - 데이터 보안 및 인증
   - 개인정보 보호 (GDPR, CCPA)
   - 감사 로그 및 컴플라이언스

### ⚙️ 기술 준비
4. [**성능 및 확장성**](go-live/04-performance-scalability.md)
   - 성능 최적화 전략
   - 부하 테스트
   - 용량 계획 및 비용 최적화

5. [**모니터링 및 유지보수**](go-live/05-monitoring-maintenance.md)
   - 실시간 모니터링 설정
   - 알림 및 대시보드 구성
   - 지속적인 개선 프로세스

6. [**지식 관리**](go-live/06-knowledge-management.md)
   - 지식베이스 품질 관리
   - 문서 구조화 및 검색 최적화
   - 학습 및 성능 튜닝

### 🧪 테스트 및 검증
7. [**테스트 계획**](go-live/07-testing-plan.md)
   - 기능/통합/부하/보안 테스트
   - 테스트 시나리오 및 케이스
   - 사용자 시나리오 기반 테스트

### 🚀 배포 준비
8. [**배포 전 체크리스트**](go-live/08-deployment-checklist.md)
   - 기술적 준비사항
   - 비즈니스 준비사항
   - 운영 준비사항

9. [**롤백 계획**](go-live/09-rollback-plan.md)
   - 롤백 시나리오 정의
   - 롤백 절차 및 스크립트
   - 사후 검증

10. [**문서화**](go-live/10-documentation.md)
    - 필수 문서 목록
    - 문서 관리 정책
    - 버전 관리 및 업데이트

---

## 🚀 빠른 시작

프로덕션 배포를 준비 중이라면 다음 순서로 진행하세요:

### 1️⃣ 계획 단계 (1-3주)
- [목표 정의](go-live/01-goal-definition.md)부터 시작
- [보안 및 규정 준수](go-live/03-security-compliance.md) 요구사항 파악
- [품질 관리](go-live/02-quality-management.md) 기준 설정

### 2️⃣ 기술 준비 (2-4주)
- [성능 및 확장성](go-live/04-performance-scalability.md) 계획 수립
- [모니터링](go-live/05-monitoring-maintenance.md) 인프라 구축
- [지식 관리](go-live/06-knowledge-management.md) 시스템 구성

### 3️⃣ 테스트 (1-2주)
- [테스트 계획](go-live/07-testing-plan.md) 실행
- 품질 관리 기준 충족 확인
- 사용자 시나리오 기반 검증

### 4️⃣ 배포 (1주)
- [배포 전 체크리스트](go-live/08-deployment-checklist.md) 검증
- [롤백 계획](go-live/09-rollback-plan.md) 준비 완료
- [문서화](go-live/10-documentation.md) 최종 점검

---

## 📚 참고 자료

- [Copilot Studio Best Practices](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/guidance/best-practices)
- [Azure Well-Architected Framework](https://learn.microsoft.com/ko-kr/azure/well-architected/)
- [Power Platform Admin Center](https://admin.powerplatform.microsoft.com/)

---

**문서 정보**
- **버전**: 2.0.0
- **최종 업데이트**: 2024-11-27
- **다음 검토**: 2025-02-27

---

[← 메인으로 돌아가기](../README.md)

#### 1.1 비즈니스 목표
에이전트가 해결해야 할 구체적인 비즈니스 문제를 명확히 정의합니다.

**구체적 예시:**
- 고객 문의 응답 시간을 50% 단축
- IT 헬프데스크 티켓 30% 감소
- 신입 사원 온보딩 프로세스 자동화
- 내부 문서 검색 시간 70% 절감

**목표 정의 템플릿:**
```
문제: [현재 해결해야 할 문제]
목표: [달성하고자 하는 결과]
대상: [서비스 대상 사용자]
기대효과: [예상되는 비즈니스 임팩트]
```

#### 1.2 성공 지표 (KPI)
측정 가능한 지표를 설정하고 정기적으로 추적합니다.

**정량적 지표:**
- **응답 정확도**: 올바른 답변 비율 (목표: 90% 이상)
- **응답 시간**: 평균 응답 시간 (목표: 3초 이내)
- **완결률**: 에이전트가 해결한 대화 비율 (목표: 80% 이상)
- **사용자 만족도**: 별점 또는 피드백 점수 (목표: 4.5/5 이상)
- **일일 활성 사용자**: DAU 추적
- **세션당 대화 수**: 사용자 참여도 측정

**정성적 지표:**
- 사용자 피드백 분석
- 에스컬레이션된 케이스의 유형 및 빈도
- 에이전트 개선 제안 사항

**측정 방법:**
```kql
// Application Insights 쿼리 예시 - 평균 응답 시간
customEvents
| where name == "ConversationEnd"
| extend Duration = todouble(customDimensions["duration"])
| summarize AvgDuration = avg(Duration), P95Duration = percentile(Duration, 95)
```

#### 1.3 범위 설정
에이전트가 담당할 업무 범위와 제한 사항을 명확히 구분합니다.

**범위 내 (In-Scope):**
- 자주 묻는 질문 (FAQ) 응답
- 문서 검색 및 정보 제공
- 간단한 데이터 조회 및 확인
- 프로세스 안내 및 가이드 제공

**범위 외 (Out-of-Scope):**
- 복잡한 의사결정이 필요한 경우
- 민감한 개인정보 처리
- 승인이 필요한 업무
- 법적 자문 또는 전문가 판단이 필요한 경우

**명확한 한계 설정:**
```yaml
# 토픽에서 범위 외 처리 예시
additionalInstructions: |
  너는 다음 범위 내에서만 답변할 수 있다:
  - HR 정책 및 복리후생 안내
  - 휴가 신청 절차 안내
  
  다음 질문은 답변하지 않고 HR 담당자에게 연결한다:
  - 급여 관련 문의
  - 개인 민감 정보 변경
  - 징계 또는 법적 문제
```

### 2. 품질 관리

#### 2.1 응답 품질

**정확성 테스트**

다양한 시나리오에서 응답의 정확성을 체계적으로 검증합니다.

**테스트 케이스 작성:**
```
카테고리: 문서 검색
질문: "2024년 연차 휴가 규정이 어떻게 되나요?"
기대 답변: SharePoint의 HR 정책 문서에서 정확한 연차 규정 인용
검증 항목:
  ✓ 올바른 문서 참조
  ✓ 최신 정보 제공 (2024년)
  ✓ 명확하고 이해하기 쉬운 설명
```

**테스트 매트릭스:**
| 시나리오 유형 | 테스트 케이스 수 | 통과 기준 |
|---|---|---|
| 기본 FAQ | 50+ | 95% 정확도 |
| 문서 검색 | 30+ | 90% 정확도 |
| 데이터 조회 | 20+ | 100% 정확도 |
| 복합 질문 | 15+ | 85% 정확도 |

**일관성 확인**

동일하거나 유사한 질문에 대해 일관된 답변을 제공하는지 확인합니다.

**검증 방법:**
1. 동일 질문을 여러 번 반복하여 응답 비교
2. 표현만 다른 유사 질문으로 테스트
3. 다른 시간대/세션에서 동일 질문 테스트

**예시:**
```
질문 1: "휴가 신청은 어떻게 하나요?"
질문 2: "연차를 쓰려면 어떤 절차를 거쳐야 하나요?"
질문 3: "휴가 내는 방법 알려주세요"

→ 세 질문 모두 동일한 절차 안내를 제공해야 함
```

**오류 처리**

예상치 못한 입력이나 오류 상황에 대한 적절한 처리 방안을 마련합니다.

**일반적인 오류 시나리오:**

1. **모호한 질문**
   ```
   사용자: "그거 어떻게 하는 거야?"
   에이전트: "무엇에 대해 도움이 필요하신가요? 좀 더 구체적으로 말씀해 주시면 
             정확한 안내를 드릴 수 있습니다.
             예: 휴가 신청, 비용 처리, 문서 검색 등"
   ```

2. **범위 외 질문**
   ```
   사용자: "이번 달 급여가 왜 적게 나왔어요?"
   에이전트: "급여 관련 문의는 HR 담당자가 직접 확인이 필요합니다.
             HR팀 (내선: 1234, hr@company.com)으로 문의해 주세요.
             빠른 처리를 위해 급여명세서를 준비해 주시면 좋습니다."
   ```

3. **정보 없음**
   ```
   사용자: "2026년 정책은?"
   에이전트: "죄송합니다. 현재 2026년 정책은 아직 확정되지 않았습니다.
             최신 정보는 2025년 정책입니다. 확인하시겠습니까?"
   ```

4. **시스템 오류**
   ```
   에이전트: "일시적인 오류가 발생했습니다.
             잠시 후 다시 시도해 주시거나,
             긴급한 경우 헬프데스크 (1234)로 연락 주세요."
   ```

#### 2.2 사용자 경험

**자연스러운 대화**

대화 흐름이 자연스럽고 이해하기 쉬운지 평가합니다.

**대화 설계 원칙:**

1. **명확하고 간결한 표현**
   - ❌ 나쁜 예: "귀하께서 요청하신 사항과 관련하여 당사의 규정집 3.2조 항목을 참조하시면..."
   - ✅ 좋은 예: "휴가 신청은 3단계로 진행됩니다. 먼저 시스템에 로그인해 주세요."

2. **단계별 안내**
   ```
   1단계: 인사포털(portal.company.com)에 접속
   2단계: '휴가 신청' 메뉴 선택
   3단계: 날짜와 사유 입력 후 제출
   
   각 단계에서 도움이 필요하시면 말씀해 주세요.
   ```

3. **확인 및 피드백**
   ```
   에이전트: "휴가 신청 방법을 안내해 드렸습니다. 도움이 되셨나요?"
   [도움됨] [추가 질문] [담당자 연결]
   ```

4. **맥락 유지**
   ```
   사용자: "휴가 신청하려고"
   에이전트: "네, 휴가 신청을 도와드리겠습니다. 어떤 종류의 휴가인가요?"
   사용자: "연차요"
   에이전트: "연차 휴가 신청이시군요. (이전 맥락 유지) ..."
   ```

**응답 시간**

사용자가 수용 가능한 응답 시간 내 답변을 제공합니다.

**응답 시간 목표:**
- **즉시 응답**: < 2초 (간단한 FAQ)
- **일반 응답**: < 5초 (문서 검색)
- **복잡한 쿼리**: < 10초 (데이터 조회)
- **타임아웃**: 15초 (이상 시 오류 처리)

**성능 최적화 전략:**

1. **캐싱 활용**
   - 자주 조회되는 데이터는 캐싱 처리
   - FAQ는 미리 준비된 답변 사용

2. **청크 크기 조정**
   ```
   참조 자료 설정:
   - Chunk size: 1000 tokens
   - Overlap: 100 tokens
   - Max chunks retrieved: 5
   ```

3. **프로그레스 표시**
   ```
   "문서를 검색하고 있습니다..." (즉시 표시)
   "관련 정보를 찾았습니다. 답변을 준비 중입니다..." (5초 후)
   [최종 답변] (8초 후)
   ```

**응답 시간 모니터링:**
```kql
customEvents
| where name == "MessageReceived"
| extend ResponseTime = todouble(customDimensions["responseTime"])
| summarize 
    AvgTime = avg(ResponseTime),
    P50 = percentile(ResponseTime, 50),
    P95 = percentile(ResponseTime, 95),
    P99 = percentile(ResponseTime, 99)
| where P95 > 5000  // 5초 이상 경고
```

**에스컬레이션**

해결 불가능한 문제에 대한 명확한 에스컬레이션 경로를 제공합니다.

**에스컬레이션 트리거:**
- 3회 이상 의도 파악 실패
- 사용자가 명시적으로 담당자 요청
- 범위 외 질문 또는 복잡한 문제
- 민감한 정보 처리 필요
- 불만족 피드백 수신

**에스컬레이션 옵션:**

1. **담당자 연결**
   ```
   "전문 상담원과 연결해 드리겠습니다.
   현재 대기 인원: 2명 (예상 대기 시간: 3분)
   
   [상담원 연결] [콜백 예약] [이메일 문의]
   ```

2. **티켓 생성**
   ```
   "해당 문의는 전문가 검토가 필요합니다.
   티켓을 생성하여 담당팀에 전달하겠습니다.
   
   티켓 번호: #2024-11-001
   담당팀: IT 헬프데스크
   예상 처리 시간: 24시간 이내
   
   진행 상황은 이메일로 알려드립니다."
   ```

3. **자기주도 해결**
   ```
   "다음 리소스가 도움이 될 수 있습니다:
   
   📄 상세 가이드 문서
   🎥 튜토리얼 비디오
   💬 커뮤니티 포럼
   
   또는 담당자 연결을 원하시나요?"
   ```

**에스컬레이션 플로우 예시:**
```yaml
actions:
  - kind: Question
    id: confirmEscalation
    interactionType: Choice
    prompt: "담당자 연결을 원하시나요?"
    choices:
      - "네, 연결해 주세요"
      - "티켓 생성"
      - "나중에 연락 받기"
  
  - kind: Branch
    condition: Topic.confirmEscalation = "네, 연결해 주세요"
    actions:
      - kind: TransferToAgent
        context: "사용자 문의 요약 전달"
```

### 3. 보안 및 규정 준수

#### 3.1 데이터 보안

**인증/권한**

적절한 사용자 인증 및 권한 관리를 구현합니다.

**인증 방식 선택:**

1. **Microsoft Entra ID (Azure AD)**
   ```
   설정 → 보안 → 인증
   - 인증 유형: Microsoft Entra ID
   - 사용자 로그인 필요: 예
   - 토큰 유효 기간: 60분
   ```

2. **OAuth 2.0**
   ```
   필수 구성:
   - Client ID: [애플리케이션 ID]
   - Client Secret: [보안 암호]
   - Scope: openid, profile, Files.Read.All, Sites.Read.All
   - Redirect URI: https://token.botframework.com/.auth/web/redirect
   ```

3. **역할 기반 접근 제어 (RBAC)**
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

**데이터 암호화**

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

**개인정보 보호**

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
```
데이터 유형 | 보관 기간 | 삭제 방법
------------|-----------|----------
대화 로그   | 90일      | 자동 삭제
사용자 정보 | 계정 유지 기간 | 계정 삭제 시
분석 데이터 | 익명화 후 2년 | 자동 삭제
감사 로그   | 7년 (법적 요구) | 수동 삭제
```

**데이터 처리 계약 (DPA):**
```
Microsoft와의 DPA 확인:
- Power Platform Trust Center
- Microsoft Privacy Statement
- Data Processing Agreement
- Subprocessor List
```

#### 3.2 컴플라이언스

**감사 로그**

모든 상호작용에 대한 감사 추적을 가능하게 합니다.

**로깅 전략:**

1. **Application Insights 연동**
   ```
   Copilot Studio → 설정 → 고급 → Application Insights
   연결 문자열: [Azure Application Insights 연결 문자열]
   ```

2. **로그 항목**
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

3. **감사 로그 조회 쿼리**
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

4. **로그 보안**
   ```
   - 로그 접근 권한: IT 보안팀, 감사팀만
   - 로그 암호화: 저장 및 전송 시
   - 로그 무결성: 변조 방지 메커니즘
   - 로그 백업: 정기적 백업 및 아카이빙
   ```

**데이터 보존**

법적 요구사항에 따른 데이터 보존 정책을 수립합니다.

**보존 정책 매트릭스:**

| 데이터 유형 | 보존 기간 | 법적 근거 | 보관 위치 | 삭제 방법 |
|------------|-----------|-----------|-----------|----------|
| 대화 내용 | 90일 | 내부 정책 | Application Insights | 자동 삭제 |
| 감사 로그 | 7년 | 금융감독 규정 | Azure Storage (Archive) | 수동 삭제 |
| 인증 로그 | 1년 | 정보보호법 | Log Analytics | 자동 삭제 |
| 오류 로그 | 180일 | 운영 필요 | Application Insights | 자동 삭제 |
| 성능 메트릭 | 2년 | 내부 정책 | Azure Monitor | 자동 삭제 |
| 사용자 피드백 | 3년 | 품질 관리 | Dataverse | 수동 삭제 |

**자동 보존 정책 구성:**
```powershell
# Azure CLI를 통한 보존 정책 설정
az monitor log-analytics workspace table update \
  --resource-group "rg-copilot" \
  --workspace-name "law-copilot" \
  --name "customEvents" \
  --retention-time 90

# Application Insights 데이터 샘플링
az monitor app-insights component update \
  --app "ai-copilot" \
  --resource-group "rg-copilot" \
  --sampling-percentage 50
```

**장기 보관 전략:**
```
1. Hot Tier (0-30일)
   - 즉시 액세스 가능
   - Application Insights
   - 비용: 높음

2. Cool Tier (31-365일)
   - 1시간 내 액세스
   - Azure Blob Storage
   - 비용: 중간

3. Archive Tier (1년 이상)
   - 최대 15시간 액세스
   - Azure Archive Storage
   - 비용: 낮음
```

**접근 제어**

역할 기반 접근 제어(RBAC)를 구현합니다.

**역할 정의:**

1. **Copilot 관리자**
   ```
   권한:
   - 에이전트 설정 변경
   - 토픽 생성/수정/삭제
   - 게시 및 배포
   - 분석 대시보드 전체 접근
   - 사용자 관리
   ```

2. **Copilot 편집자**
   ```
   권한:
   - 토픽 수정
   - 테스트 환경 접근
   - 분석 대시보드 읽기
   - 게시 권한 없음
   ```

3. **Copilot 분석가**
   ```
   권한:
   - 분석 대시보드 읽기
   - 대화 기록 조회
   - 리포트 생성
   - 편집 권한 없음
   ```

4. **Copilot 사용자**
   ```
   권한:
   - 에이전트와 대화
   - 자신의 대화 기록 조회
   - 관리 기능 없음
   ```

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

# 편집자 역할 부여  
Set-AdminPowerAppRoleAssignment \
  -EnvironmentName "env-prod" \
  -PrincipalType "User" \
  -PrincipalObjectId "editor@company.com" \
  -RoleName "Environment Maker"
```

**Azure 리소스 접근 제어:**
```json
{
  "properties": {
    "roleName": "Copilot Analytics Reader",
    "description": "Can read Application Insights data",
    "assignableScopes": [
      "/subscriptions/{subscription-id}/resourceGroups/rg-copilot"
    ],
    "permissions": [
      {
        "actions": [
          "Microsoft.Insights/components/query/read",
          "Microsoft.Insights/components/analytics/read"
        ],
        "notActions": [],
        "dataActions": [],
        "notDataActions": []
      }
    ]
  }
}
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

### 4. 성능 및 확장성

#### 4.1 성능 최적화

**동시 사용자**

예상 동시 사용자 수에 대한 부하 테스트를 수행합니다.

**부하 테스트 시나리오:**
```
시나리오 1: 정상 부하
- 동시 사용자: 100명
- 평균 세션 시간: 5분
- 메시지/세션: 10개
- 목표 응답 시간: < 3초

시나리오 2: 피크 부하
- 동시 사용자: 500명
- 평균 세션 시간: 3분
- 메시지/세션: 5개
- 목표 응답 시간: < 5초

시나리오 3: 스트레스 테스트
- 동시 사용자: 1000명
- 시스템 한계점 파악
- 장애 조치 메커니즘 테스트
```

**부하 테스트 도구:**
```python
# Azure Load Testing 또는 JMeter 사용 예시
import asyncio
import aiohttp

async def simulate_conversation(session, user_id):
    messages = [
        "안녕하세요",
        "휴가 신청 방법을 알려주세요",
        "감사합니다"
    ]
    
    for msg in messages:
        async with session.post(
            "https://your-bot-endpoint.com/api/messages",
            json={"text": msg, "userId": user_id}
        ) as resp:
            await resp.json()
            await asyncio.sleep(2)  # 사용자 입력 간격

async def load_test(num_users=100):
    async with aiohttp.ClientSession() as session:
        tasks = [
            simulate_conversation(session, f"user_{i}")
            for i in range(num_users)
        ]
        await asyncio.gather(*tasks)

# 실행
asyncio.run(load_test(100))
```

**응답 시간**

평균 및 최대 응답 시간을 측정하고 최적화합니다.

**성능 목표:**
```
메트릭          | 목표    | 경고 임계값 | 위험 임계값
----------------|---------|------------|------------
P50 응답 시간   | < 2초   | 3초        | 5초
P95 응답 시간   | < 5초   | 7초        | 10초
P99 응답 시간   | < 8초   | 12초       | 15초
시간 초과율     | < 0.1%  | 0.5%       | 1%
오류율          | < 0.5%  | 1%         | 2%
```

**응답 시간 최적화 전략:**

1. **쿼리 최적화**
   ```yaml
   # Dataverse 쿼리 최적화
   - kind: CallAction
     action: ListRows
     inputs:
       table: "Tasks"
       selectColumns: "title,status,priority"  # 필요한 컬럼만
       filter: "status eq 'Active'"            # 필터링
       orderBy: "createdOn desc"
       top: 10                                  # 결과 제한
   ```

2. **캐싱 구현**
   ```yaml
   # 자주 조회되는 데이터 캐싱
   - kind: SetVariable
     variable: Topic.cachedFAQ
     value: |
       = If(
           IsBlank(Global.FAQCache) Or 
           DateDiff(Global.FAQCacheTime, Now(), Minutes) > 60,
           // 캐시 갱신
           LookUp(FAQTable, Category = "Common"),
           // 캐시 사용
           Global.FAQCache
         )
   ```

3. **비동기 처리**
   ```
   긴 작업의 경우:
   1. 즉시 확인 메시지 반환
   2. 백그라운드에서 처리
   3. 완료 시 알림 또는 이메일 전송
   
   예: "요청하신 리포트를 생성 중입니다. 
        완료되면 이메일로 알려드리겠습니다."
   ```

**리소스 사용**

CPU, 메모리, API 호출 등 리소스 사용량을 모니터링합니다.

**모니터링 대시보드:**
```kql
// CPU 및 메모리 사용률
performanceCounters
| where name == "% Processor Time" or name == "Available Bytes"
| summarize 
    AvgCPU = avg(iif(name == "% Processor Time", value, 0)),
    AvgMemory = avg(iif(name == "Available Bytes", value, 0))
    by bin(timestamp, 5m)

// API 호출 패턴
dependencies
| where type == "HTTP"
| summarize 
    CallCount = count(),
    AvgDuration = avg(duration),
    FailureRate = countif(success == false) * 100.0 / count()
    by name, bin(timestamp, 1h)
| order by CallCount desc
```

**API 사용량 제한:**
```
Power Platform 제한:
- API 요청: 10,000/일 (기본 라이선스)
- 동시 요청: 100개
- Flow 실행: 500/일

최적화:
- 배치 처리로 API 호출 감소
- 캐싱으로 중복 호출 방지
- 비동기 처리로 동시성 관리
```

#### 4.2 확장성 계획

**용량 계획**

향후 사용자 증가에 대비한 확장 계획을 수립합니다.

**성장 예측:**
```
현재 상태 (Month 0):
- 사용자 수: 500명
- 일일 대화: 1,000건
- 피크 시간 동시 접속: 50명

6개월 후 (Month 6):
- 사용자 수: 1,500명 (3배 증가)
- 일일 대화: 3,000건
- 피크 시간 동시 접속: 150명

12개월 후 (Month 12):
- 사용자 수: 3,000명 (6배 증가)
- 일일 대화: 6,000건
- 피크 시간 동시 접속: 300명
```

**확장 전략:**

1. **수직 확장 (Scale Up)**
   ```
   더 높은 SKU로 업그레이드:
   - Power Platform: Premium Capacity
   - Azure OpenAI: Provisioned Throughput
   - Application Insights: Enterprise tier
   ```

2. **수평 확장 (Scale Out)**
   ```
   여러 인스턴스 배포:
   - 지역별 Copilot 인스턴스
   - 부서별 전용 환경
   - Load Balancer 구성
   ```

**비용 최적화**

API 호출, 스토리지 등 비용 효율적인 설계를 합니다.

**비용 구조 분석:**
```
월간 비용 추정:

Power Platform:
- Copilot Studio 라이선스: $200/월
- Power Automate Premium: $15/user/월
- Dataverse 스토리지: $40/GB/월

Azure:
- OpenAI API: $0.002/1K tokens
  * 평균 1,000 대화/일 * 30일 = 30,000 대화
  * 대화당 평균 500 tokens = 15M tokens
  * 비용: $30/월

- Application Insights: $2.30/GB
  * 일일 로그: 100MB
  * 월간: 3GB
  * 비용: $7/월

- Storage Account: $0.02/GB
  * 문서 저장: 50GB
  * 비용: $1/월

총 예상 비용: $278/월 (사용자 1명 기준)
```

**비용 절감 전략:**

1. **토큰 사용 최적화**
   ```yaml
   # 프롬프트 최적화
   additionalInstructions: |
     간결하게 답변하시오. 불필요한 설명은 생략.
     
   # 컨텍스트 제한
   knowledgeSources:
     maxChunks: 3  # 검색 결과 제한
     chunkSize: 500  # 청크 크기 조정
   ```

2. **데이터 보존 기간 조정**
   ```
   - 상세 로그: 30일 (90일 → 30일)
   - 집계 데이터: 1년
   - 감사 로그: 법적 요구사항만 (7년)
   ```

3. **리소스 자동 스케일링**
   ```powershell
   # Azure 자동 크기 조정
   az monitor autoscale create \
     --resource-group rg-copilot \
     --resource app-copilot \
     --min-count 1 \
     --max-count 3 \
     --count 1
   ```

**다국어 지원**

필요 시 다국어 확장 가능성을 고려합니다.

**다국어 구현 전략:**

1. **언어별 Copilot 생성**
   ```
   한국어: copilot-kr
   영어: copilot-en
   일본어: copilot-jp
   
   사용자 언어 설정에 따라 자동 라우팅
   ```

2. **단일 Copilot, 다국어 지원**
   ```yaml
   # 사용자 언어 감지
   - kind: SetVariable
     variable: Topic.userLanguage
     value: = System.User.Language
   
   # 언어별 응답
   - kind: SendMessage
     message: |
       = Switch(
           Topic.userLanguage,
           "ko", "안녕하세요",
           "en", "Hello",
           "ja", "こんにちは",
           "Hello"  // 기본값
         )
   ```

3. **번역 서비스 통합**
   ```yaml
   # Azure Translator 사용
   - kind: CallAction
     action: TranslateText
     inputs:
       text: System.Activity.Text
       targetLanguage: "en"
     outputs:
       translatedText: Topic.englishQuery
   ```

### 5. 모니터링 및 유지보수

#### 5.1 모니터링

**실시간 모니터링**

Application Insights 등을 통한 실시간 모니터링 체계를 구축합니다.

**핵심 모니터링 지표:**

1. **가용성 모니터링**
   ```kql
   // Uptime 계산
   requests
   | where timestamp > ago(24h)
   | summarize 
       TotalRequests = count(),
       FailedRequests = countif(success == false),
       Uptime = (count() - countif(success == false)) * 100.0 / count()
   | project Uptime, TotalRequests, FailedRequests
   ```

2. **사용자 경험 모니터링**
   ```kql
   // 사용자 만족도 추적
   customEvents
   | where name == "UserFeedback"
   | extend Rating = toint(customDimensions["rating"])
   | summarize 
       AvgRating = avg(Rating),
       TotalFeedback = count(),
       PositiveRate = countif(Rating >= 4) * 100.0 / count()
       by bin(timestamp, 1d)
   ```

3. **대화 완결률**
   ```kql
   // 에스컬레이션 없이 완료된 대화 비율
   customEvents
   | where name == "ConversationEnd"
   | extend 
       Resolved = tobool(customDimensions["resolved"]),
       Escalated = tobool(customDimensions["escalated"])
   | summarize 
       Total = count(),
       ResolvedCount = countif(Resolved),
       EscalatedCount = countif(Escalated),
       CompletionRate = countif(Resolved and not(Escalated)) * 100.0 / count()
   ```

4. **토픽 사용 분석**
   ```kql
   // 가장 많이 사용되는 토픽
   customEvents
   | where name == "TopicTriggered"
   | extend TopicName = tostring(customDimensions["topicName"])
   | summarize 
       TriggerCount = count(),
       AvgDuration = avg(todouble(customDimensions["duration"]))
       by TopicName
   | order by TriggerCount desc
   | take 10
   ```

**알림 설정**

장애 또는 성능 저하 시 즉각적인 알림을 설정합니다.

**알림 규칙 예시:**

```json
{
  "name": "High Error Rate Alert",
  "description": "Triggers when error rate exceeds 5%",
  "severity": 2,
  "condition": {
    "allOf": [
      {
        "metricName": "requests/failed",
        "operator": "GreaterThan",
        "threshold": 5,
        "timeAggregation": "Average",
        "windowSize": "PT5M"
      }
    ]
  },
  "actions": [
    {
      "actionGroupId": "/subscriptions/.../actionGroups/ops-team",
      "emailSubject": "[CRITICAL] Copilot Error Rate Alert"
    }
  ]
}
```

**알림 시나리오:**

1. **가용성 알림**
   ```
   조건: Uptime < 99.5% (5분 평균)
   심각도: Critical
   수신자: DevOps팀, IT관리자
   액션: 즉시 조사 및 복구
   ```

2. **성능 저하 알림**
   ```
   조건: P95 응답 시간 > 10초 (15분 평균)
   심각도: Warning
   수신자: 개발팀
   액션: 성능 분석 및 최적화
   ```

3. **사용량 임계값 알림**
   ```
   조건: API 호출 > 8,000/일 (일일 한도의 80%)
   심각도: Info
   수신자: 운영팀
   액션: 용량 계획 검토
   ```

4. **보안 이벤트 알림**
   ```
   조건: 인증 실패 > 10회/시간 (동일 사용자)
   심각도: High
   수신자: 보안팀
   액션: 계정 조사 및 잠금
   ```

**대시보드**

주요 지표를 한눈에 볼 수 있는 대시보드를 구성합니다.

**대시보드 구성 요소:**

1. **개요 대시보드**
   ```
   - 총 대화 수 (일/주/월)
   - 활성 사용자 수 (DAU/WAU/MAU)
   - 평균 응답 시간
   - 시스템 가용성
   - 사용자 만족도
   ```

2. **성능 대시보드**
   ```
   - 응답 시간 추이 (P50, P95, P99)
   - API 호출 패턴
   - 오류율 추이
   - 리소스 사용률
   ```

3. **비즈니스 대시보드**
   ```
   - 토픽별 사용 통계
   - 해결률 추이
   - 에스컬레이션 이유 분석
   - ROI 메트릭
   ```

**Power BI 대시보드 예시:**
```dax
// 일일 활성 사용자 측정
DAU = 
CALCULATE(
    DISTINCTCOUNT(ConversationLog[UserId]),
    ConversationLog[Date] = TODAY()
)

// 평균 해결 시간
AvgResolutionTime = 
AVERAGE(ConversationLog[Duration])

// 만족도 점수
CSAT = 
DIVIDE(
    COUNTROWS(FILTER(Feedback, Feedback[Rating] >= 4)),
    COUNTROWS(Feedback)
) * 100
```

#### 5.2 지속적인 개선

**사용자 피드백**

정기적인 사용자 피드백을 수집하고 분석합니다.

**피드백 수집 방법:**

1. **대화 후 설문**
   ```yaml
   # 대화 종료 시 피드백 요청
   - kind: Question
     id: satisfaction
     interactionType: Choice
     prompt: "오늘 대화가 도움이 되셨나요?"
     choices:
       - "매우 도움됨 (5)"
       - "도움됨 (4)"
       - "보통 (3)"
       - "별로 (2)"
       - "전혀 아님 (1)"
   
   - kind: Question
     id: feedback
     condition: Topic.satisfaction <= 3
     prompt: "개선이 필요한 부분을 알려주세요"
     interactionType: TextInput
   ```

2. **주기적 설문조사**
   ```
   월간 설문 (샘플링):
   - NPS (Net Promoter Score)
   - 기능 요청 사항
   - 불편 사항
   - 개선 제안
   ```

3. **포커스 그룹**
   ```
   분기별 사용자 그룹 인터뷰:
   - 파워 유저 5-10명
   - 심층 사용성 테스트
   - 신기능 피드백
   ```

**피드백 분석:**
```kql
// 부정 피드백 패턴 분석
customEvents
| where name == "UserFeedback"
| extend Rating = toint(customDimensions["rating"])
| where Rating <= 2
| extend Topic = tostring(customDimensions["topicName"])
| summarize 
    NegativeCount = count(),
    CommonIssues = make_set(customDimensions["comment"])
    by Topic
| order by NegativeCount desc
```

**A/B 테스트**

새로운 기능이나 변경사항에 대한 A/B 테스트를 수행합니다.

**A/B 테스트 시나리오:**

1. **응답 스타일 테스트**
   ```yaml
   # 사용자를 두 그룹으로 분할
   - kind: SetVariable
     variable: Topic.variant
     value: = If(Mod(Value(System.User.Id), 2) = 0, "A", "B")
   
   # 버전 A: 간결한 응답
   - kind: SendMessage
     condition: Topic.variant = "A"
     message: "휴가 신청은 인사포털에서 가능합니다."
   
   # 버전 B: 상세한 응답  
   - kind: SendMessage
     condition: Topic.variant = "B"
     message: |
       휴가 신청 방법을 안내해 드립니다:
       1. 인사포털 접속
       2. 휴가 신청 메뉴 선택
       3. 날짜와 사유 입력
       더 자세한 내용이 필요하신가요?
   ```

2. **성능 측정**
   ```kql
   // 버전별 성능 비교
   customEvents
   | where name == "MessageSent"
   | extend Variant = tostring(customDimensions["variant"])
   | summarize 
       AvgDuration = avg(todouble(customDimensions["duration"])),
       AvgSatisfaction = avg(todouble(customDimensions["satisfaction"])),
       Count = count()
       by Variant
   ```

3. **의사결정**
   ```
   통계적 유의성 확인:
   - 최소 샘플 크기: 각 100건
   - 신뢰 수준: 95%
   - 개선율: > 10%
   
   → 승자 결정 후 전체 배포
   ```

**버전 관리**

변경사항에 대한 체계적인 버전 관리 및 롤백 계획을 수립합니다.

**버전 관리 전략:**

1. **환경 분리**
   ```
   개발 환경 (Dev):
   - 새 기능 개발 및 테스트
   - 개발자만 접근
   
   테스트 환경 (QA):
   - 통합 테스트
   - 파일럿 사용자 테스트
   
   스테이징 환경 (Staging):
   - 프로덕션과 동일한 구성
   - 최종 검증
   
   프로덕션 환경 (Prod):
   - 실제 사용자 대상
   - 변경 통제 프로세스
   ```

2. **배포 전략**
   ```
   블루-그린 배포:
   1. 새 버전을 Green 환경에 배포
   2. 스모크 테스트 수행
   3. 트래픽 점진적 전환 (10% → 50% → 100%)
   4. 문제 발생 시 즉시 Blue로 롤백
   ```

3. **변경 로그**
   ```markdown
   # v1.2.0 (2024-11-27)
   
   ## 새 기능
   - Azure AI Search 통합
   - 다국어 지원 (영어, 일본어)
   
   ## 개선
   - 응답 시간 30% 향상
   - FAQ 정확도 개선
   
   ## 버그 수정
   - 인증 토큰 만료 문제 해결
   - SharePoint 연결 오류 수정
   
   ## 알려진 이슈
   - 특정 브라우저에서 파일 업로드 제한
   ```

### 6. 지식 관리

#### 6.1 지식베이스 품질

**정보 정확성**

참조 자료의 정확성과 최신성을 유지합니다.

**문서 품질 기준:**

1. **정확성 검증**
   ```
   문서 검토 프로세스:
   - 작성자: 초안 작성
   - 검토자: 기술적 정확성 확인
   - 승인자: 최종 승인
   - 주기적 갱신: 분기별 검토
   ```

2. **메타데이터 관리**
   ```
   필수 메타데이터:
   - 제목 (명확하고 설명적)
   - 작성일 / 최종 수정일
   - 작성자 / 담당자
   - 버전
   - 태그 / 카테고리
   - 검토 예정일
   ```

3. **품질 체크리스트**
   ```markdown
   - [ ] 제목이 내용을 정확히 반영하는가?
   - [ ] 오타나 문법 오류가 없는가?
   - [ ] 최신 정보를 반영하고 있는가?
   - [ ] 관련 문서와 링크가 연결되어 있는가?
   - [ ] 예시와 스크린샷이 최신인가?
   - [ ] 용어가 일관되게 사용되었는가?
   ```

**구조화**

효과적인 검색을 위한 문서 구조화 방법을 적용합니다.

**문서 구조 모범 사례:**

1. **계층적 구조**
   ```
   HR/
   ├── 휴가/
   │   ├── 연차_신청_방법.md
   │   ├── 병가_규정.md
   │   └── 경조사휴가_안내.md
   ├── 급여/
   │   ├── 급여명세서_조회.md
   │   └── 연말정산_가이드.md
   └── 복리후생/
       ├── 건강검진_안내.md
       └── 사내_복지_제도.md
   ```

2. **표준 템플릿**
   ```markdown
   # [제목]
   
   ## 개요
   이 문서에서 다루는 내용을 간략히 설명합니다.
   
   ## 대상
   이 문서가 누구를 위한 것인지 명시합니다.
   
   ## 절차
   ### 1. [첫 번째 단계]
   상세 설명 및 예시
   
   ### 2. [두 번째 단계]
   상세 설명 및 예시
   
   ## FAQ
   자주 묻는 질문과 답변
   
   ## 문의
   추가 문의처 정보
   
   ---
   최종 업데이트: 2024-11-27
   담당자: HR팀 (hr@company.com)
   ```

3. **검색 최적화**
   ```markdown
   # 휴가 신청 방법
   
   **키워드**: 연차, 휴가, 신청, 승인, 인사포털
   **관련 문서**: 병가 규정, 휴가 잔여일수 조회
   
   ## 요약
   직원들이 인사포털을 통해 휴가를 신청하는 방법을 안내합니다.
   일반적으로 3-5일 전에 신청하면 됩니다.
   
   [상세 내용...]
   ```

**정기 업데이트**

지식베이스의 정기적인 검토 및 업데이트 프로세스를 수립합니다.

**업데이트 주기:**
```
분류          | 검토 주기 | 담당자
--------------|----------|--------
정책 문서     | 분기별   | HR팀
기술 가이드   | 월간     | IT팀
FAQ          | 격주     | CS팀
공지사항     | 실시간    | 각 부서
제품 매뉴얼   | 제품 업데이트 시 | 제품팀
```

**만료 문서 관리:**
```yaml
# Power Automate로 만료 문서 알림
trigger:
  - type: Recurrence
    frequency: Daily

actions:
  - type: GetFiles
    filter: "Modified < @{subtractFromTime(utcNow(), 90, 'Day')}"
  
  - type: SendEmail
    to: "document-owners@company.com"
    subject: "문서 검토 필요"
    body: |
      다음 문서들이 90일 이상 업데이트되지 않았습니다:
      @{body('GetFiles')}
```

#### 6.2 학습 및 개선

**패턴 분석**

자주 묻는 질문 및 오류 패턴을 분석합니다.

**질문 패턴 분석:**
```kql
// 가장 많이 묻는 질문
customEvents
| where name == "MessageReceived"
| extend Query = tostring(customDimensions["userMessage"])
| summarize Count = count() by Query
| order by Count desc
| take 50

// 답변 못한 질문
customEvents
| where name == "UnknownIntent"
| extend Query = tostring(customDimensions["userMessage"])
| summarize Count = count() by Query
| order by Count desc
```

**오류 패턴 분석:**
```kql
// 반복되는 오류
exceptions
| extend ErrorType = tostring(customDimensions["errorType"])
| summarize 
    ErrorCount = count(),
    LastOccurrence = max(timestamp),
    AffectedUsers = dcount(user_Id)
    by ErrorType
| order by ErrorCount desc
```

**지식 갭 식별**

답변 불가능한 질문들을 수집하여 지식베이스를 보완합니다.

**지식 갭 대응 프로세스:**

1. **미해결 질문 수집**
   ```kql
   // 에스컬레이션된 대화 분석
   customEvents
   | where name == "Escalated"
   | extend 
       Query = tostring(customDimensions["userQuery"]),
       Reason = tostring(customDimensions["escalationReason"])
   | summarize 
       Count = count(),
       Examples = make_list(Query, 5)
       by Reason
   ```

2. **우선순위 결정**
   ```
   우선순위 = (빈도 × 3) + (비즈니스 영향도 × 2) + 긴급도
   
   예시:
   - 급여 관련 질문: 빈도(10) × 3 + 영향도(5) × 2 + 긴급도(4) = 44
   - 일반 FAQ: 빈도(5) × 3 + 영향도(2) × 2 + 긴급도(1) = 20
   ```

3. **지식 추가 계획**
   ```markdown
   # 지식 갭 해결 계획
   
   ## Q4 2024
   - [우선순위 1] 급여 관련 FAQ 30건 추가
   - [우선순위 2] 신규 정책 문서 업데이트
   
   ## Q1 2025  
   - [우선순위 3] 기술 지원 가이드 확장
   - [우선순위 4] 제품 매뉴얼 상세화
   ```

**성능 튜닝**

검색 정확도 향상을 위한 지속적인 튜닝을 수행합니다.

**튜닝 영역:**

1. **검색 파라미터 최적화**
   ```yaml
   knowledgeSource:
     type: AzureAISearch
     config:
       semanticConfiguration: "default"
       queryType: "semantic"  # 또는 "simple", "full"
       searchMode: "all"      # 또는 "any"
       top: 5                 # 검색 결과 수
       minimumRelevanceScore: 0.7  # 최소 관련성 점수
   ```

2. **동의어 관리**
   ```json
   {
     "synonyms": [
       "휴가, 연차, 휴일, 쉬는날",
       "급여, 월급, 임금, 보수",
       "신청, 요청, 등록",
       "취소, 철회, 삭제"
     ]
   }
   ```

3. **부스팅 설정**
   ```json
   {
     "scoringProfiles": [
       {
         "name": "recent-docs-boost",
         "functions": [
           {
             "type": "freshness",
             "fieldName": "lastModified",
             "boost": 2.0,
             "interpolation": "linear",
             "freshness": {
               "boostingDuration": "P90D"
             }
           }
         ]
       }
     ]
   }
   ```

4. **성능 측정**
   ```kql
   // 검색 정확도 측정
   customEvents
   | where name == "SearchPerformed"
   | extend 
       RelevanceScore = todouble(customDimensions["relevanceScore"]),
       UserSatisfied = tobool(customDimensions["userSatisfied"])
   | summarize 
       AvgRelevance = avg(RelevanceScore),
       SatisfactionRate = countif(UserSatisfied) * 100.0 / count()
   | project AvgRelevance, SatisfactionRate
   ```

### 7. 테스트 계획

#### 7.1 테스트 유형

**기능 테스트**

모든 토픽 및 작업의 정상 동작을 확인합니다.

**테스트 케이스 예시:**

```markdown
## TC-001: 휴가 신청 안내

**전제 조건**
- 사용자가 로그인된 상태
- SharePoint 연결이 활성화됨

**테스트 단계**
1. "휴가 신청 방법을 알려주세요" 입력
2. 에이전트 응답 확인
3. 추가 질문 "연차는 언제까지 신청하나요?" 입력
4. 응답 확인

**기대 결과**
- 휴가 신청 3단계 안내 표시
- 관련 문서 링크 제공
- 연차 신청 기한 정보 제공

**실제 결과**
[테스트 시 기록]

**상태**: [Pass/Fail]
```

**토픽별 테스트 매트릭스:**
```
토픽 이름    | 테스트 케이스 수 | 통과 | 실패 | 통과율
-------------|------------------|------|------|-------
FAQ          | 25               | 24   | 1    | 96%
문서 검색    | 15               | 14   | 1    | 93%
데이터 조회  | 10               | 10   | 0    | 100%
에스컬레이션 | 8                | 7    | 1    | 87%
```

**통합 테스트**

외부 시스템(SharePoint, Dataverse 등)과의 통합을 테스트합니다.

**통합 포인트 테스트:**

1. **SharePoint 통합**
   ```markdown
   ## IT-001: SharePoint 문서 검색
   
   **테스트 시나리오**
   - SharePoint에 테스트 문서 업로드
   - Copilot에서 문서 내용 질의
   - 검색 결과 정확성 확인
   
   **검증 항목**
   - [ ] 인증 정상 작동
   - [ ] 문서 인덱싱 완료
   - [ ] 검색 결과 정확도 > 90%
   - [ ] 응답 시간 < 5초
   ```

2. **Dataverse 통합**
   ```markdown
   ## IT-002: Dataverse 데이터 조회
   
   **테스트 시나리오**
   - Dataverse에 테스트 데이터 생성
   - Copilot을 통해 데이터 조회
   - 결과 검증
   
   **검증 항목**
   - [ ] 연결 설정 정상
   - [ ] 권한 설정 올바름
   - [ ] 데이터 정확성 100%
   - [ ] 필터링 정상 작동
   ```

3. **Power Automate Flow**
   ```markdown
   ## IT-003: Flow 실행 및 결과 반환
   
   **테스트 시나리오**
   - Flow 트리거
   - 입력 파라미터 전달
   - 출력 결과 수신
   
   **검증 항목**
   - [ ] Flow 정상 실행
   - [ ] 파라미터 전달 정확
   - [ ] 응답 포맷 올바름
   - [ ] 오류 처리 정상
   ```

**부하 테스트**

예상 사용자 부하에 대한 성능 테스트를 수행합니다.

**부하 테스트 계획:**

```python
# Azure Load Testing 스크립트 예시
import asyncio
import time
from datetime import datetime

class LoadTest:
    def __init__(self, num_users, duration_minutes):
        self.num_users = num_users
        self.duration = duration_minutes * 60
        self.results = []
    
    async def user_session(self, user_id):
        start_time = time.time()
        conversation_count = 0
        
        while time.time() - start_time < self.duration:
            # 대화 시뮬레이션
            response_time = await self.send_message(
                user_id, 
                "휴가 신청 방법"
            )
            
            self.results.append({
                'user_id': user_id,
                'timestamp': datetime.now(),
                'response_time': response_time,
                'success': response_time < 5.0
            })
            
            conversation_count += 1
            await asyncio.sleep(30)  # 30초 간격
    
    async def run(self):
        tasks = [
            self.user_session(f"user_{i}")
            for i in range(self.num_users)
        ]
        await asyncio.gather(*tasks)
        
        # 결과 분석
        self.analyze_results()
    
    def analyze_results(self):
        response_times = [r['response_time'] for r in self.results]
        success_rate = sum(r['success'] for r in self.results) / len(self.results)
        
        print(f"총 요청: {len(self.results)}")
        print(f"평균 응답 시간: {sum(response_times)/len(response_times):.2f}초")
        print(f"성공률: {success_rate*100:.1f}%")
        print(f"P95: {sorted(response_times)[int(len(response_times)*0.95)]:.2f}초")

# 실행
test = LoadTest(num_users=100, duration_minutes=15)
asyncio.run(test.run())
```

**부하 테스트 시나리오:**
```
시나리오 1: 정상 부하 (Baseline)
- 동시 사용자: 100
- 지속 시간: 30분
- 목표: 성공률 99%, P95 < 5초

시나리오 2: 피크 부하
- 동시 사용자: 500
- 지속 시간: 15분
- 목표: 성공률 95%, P95 < 10초

시나리오 3: 스트레스 테스트
- 동시 사용자: 점진적 증가 (100 → 1000)
- 목표: 시스템 한계점 파악, 우아한 성능 저하
```

**보안 테스트**

취약점 및 보안 이슈를 점검합니다.

**보안 테스트 체크리스트:**

```markdown
## 인증 및 권한

- [ ] **인증 우회 테스트**
  - 토큰 없이 API 호출 시도
  - 만료된 토큰 사용 시도
  - 타인의 토큰 사용 시도

- [ ] **권한 상승 테스트**
  - 일반 사용자가 관리자 기능 접근 시도
  - 다른 사용자 데이터 조회 시도

## 데이터 보안

- [ ] **SQL Injection 테스트**
  - 특수 문자 입력 테스트
  - SQL 쿼리 삽입 시도

- [ ] **XSS (Cross-Site Scripting)**
  - 스크립트 태그 입력
  - HTML 인젝션 시도

- [ ] **민감 정보 노출**
  - 로그에 비밀번호/토큰 노출 확인
  - 오류 메시지의 상세 정보 점검

## API 보안

- [ ] **Rate Limiting**
  - 과도한 요청 전송
  - DoS 공격 시뮬레이션

- [ ] **API 키 보안**
  - 하드코딩된 키 점검
  - 환경 변수 사용 확인

## 네트워크 보안

- [ ] **HTTPS 강제**
  - HTTP 요청 차단 확인
  - TLS 버전 점검 (1.2 이상)

- [ ] **CORS 설정**
  - 허용된 도메인 확인
  - 와일드카드 사용 점검
```

#### 7.2 테스트 시나리오

**Positive Cases**

정상적인 사용 시나리오를 테스트합니다.

```markdown
## PC-001: 일반적인 FAQ 질문

**사용자 입력**: "연차 휴가는 언제까지 사용해야 하나요?"

**기대 동작**:
1. 토픽 "휴가 안내" 트리거
2. FAQ 문서에서 정보 검색
3. 명확한 답변 제공
4. 관련 링크 제공

**성공 기준**: 3초 이내 정확한 답변 제공

---

## PC-002: 다단계 대화

**사용자 입력**: 
1. "휴가 신청하고 싶어요"
2. "연차요"
3. "다음 주 금요일이요"

**기대 동작**:
1. 휴가 유형 확인 질문
2. 날짜 확인 질문
3. 신청 절차 안내
4. 맥락 유지 확인

**성공 기준**: 각 단계 정상 진행, 맥락 유지
```

**Negative Cases**

오류 및 예외 상황 처리를 테스트합니다.

```markdown
## NC-001: 범위 외 질문

**사용자 입력**: "주식 투자 조언을 해주세요"

**기대 동작**:
1. 범위 외 질문 인식
2. 정중한 거절 메시지
3. 에이전트가 도울 수 있는 영역 안내

**성공 기준**: 부적절한 답변 제공하지 않음

---

## NC-002: 인증 실패

**시나리오**: 로그인하지 않은 상태에서 개인 정보 요청

**기대 동작**:
1. 인증 필요 메시지
2. 로그인 링크 제공
3. 데이터 노출 없음

**성공 기준**: 보안 정책 준수

---

## NC-003: 시스템 오류

**시나리오**: SharePoint 서비스 다운 상태

**기대 동작**:
1. 오류 감지
2. 사용자 친화적 오류 메시지
3. 대안 제시 (티켓 생성 등)

**성공 기준**: 우아한 오류 처리, 상세 기술 오류 노출 안 함
```

**Edge Cases**

경계값 및 특수한 경우를 테스트합니다.

```markdown
## EC-001: 매우 긴 입력

**사용자 입력**: 1000자 이상의 텍스트

**기대 동작**:
1. 입력 제한 처리
2. 사용자에게 간결한 입력 요청
3. 시스템 안정성 유지

**성공 기준**: 크래시 없이 적절히 처리

---

## EC-002: 특수 문자

**사용자 입력**: "<script>alert('test')</script>"

**기대 동작**:
1. 특수 문자 이스케이핑
2. XSS 공격 차단
3. 안전한 텍스트로 처리

**성공 기준**: 보안 위협 차단

---

## EC-003: 동시 다중 세션

**시나리오**: 동일 사용자가 여러 탭에서 동시 사용

**기대 동작**:
1. 각 세션 독립적 관리
2. 상태 충돌 없음
3. 정상적인 응답

**성공 기준**: 세션 격리, 정상 작동
```

**사용자 시나리오**

실제 사용자 여정(User Journey) 기반 테스트를 수행합니다.

```markdown
## US-001: 신규 입사자 온보딩

**페르소나**: 김신입, 입사 1주차

**시나리오**:
1. "사내 메일은 어떻게 설정하나요?"
   → IT 가이드 제공
2. "급여일은 언제인가요?"
   → HR 정책 안내
3. "회의실 예약은 어떻게 하나요?"
   → 예약 시스템 안내

**성공 기준**: 
- 각 질문에 정확한 답변
- 연관 정보 제공
- 신규 직원 친화적 언어 사용

---

## US-002: 긴급 IT 지원

**페르소나**: 이매니저, 중요 프레젠테이션 1시간 전

**시나리오**:
1. "노트북이 인터넷에 연결이 안 돼요!"
   → 빠른 트러블슈팅 제공
2. "그래도 안 되는데요"
   → IT 헬프데스크 즉시 연결
3. 티켓 생성 및 진행 상황 추적

**성공 기준**:
- 신속한 초기 대응 (< 30초)
- 빠른 에스컬레이션 (< 2분)
- 진행 상황 투명성

---

## US-003: 복합 인사 업무

**페르소나**: 박직원, 출산 휴가 및 육아 휴직 계획

**시나리오**:
1. "출산 휴가는 어떻게 신청하나요?"
2. "육아 휴직도 연속으로 쓸 수 있나요?"
3. "휴직 중 4대 보험은 어떻게 되나요?"
4. "복직할 때 필요한 서류는 뭐가 있나요?"

**성공 기준**:
- 맥락을 유지한 연속 대화
- 관련 정책 종합 안내
- 필요 시 HR 담당자 연결
```

### 8. 배포 전 체크리스트

#### 8.1 기술적 준비

**시스템 구성 확인**

- [ ] **모든 토픽 및 작업 테스트 완료**
  ```
  확인 사항:
  - 모든 토픽이 예상대로 트리거되는지 확인
  - 각 작업(Action)이 정상 실행되는지 확인
  - 대화 흐름이 자연스러운지 검증
  - 오류 처리가 적절한지 테스트
  
  테스트 커버리지: 최소 80% 이상
  ```

- [ ] **인증 및 권한 설정 검증**
  ```
  체크 포인트:
  - Microsoft Entra ID / OAuth 설정 완료
  - 리디렉션 URL 정확히 설정
  - API 권한 승인 완료
  - 테스트 사용자로 로그인 테스트
  - 권한 레벨별 접근 제어 확인
  ```

- [ ] **외부 시스템 연동 테스트 완료**
  ```
  연동 포인트:
  - SharePoint 문서 검색 정상 작동
  - Dataverse 데이터 조회 정상
  - Power Automate Flow 실행 정상
  - Azure AI Search 연결 확인
  - API 엔드포인트 모두 응답
  
  각 통합에 대해 성공/실패 시나리오 테스트
  ```

- [ ] **성능 테스트 통과**
  ```
  성능 기준:
  - P95 응답 시간 < 5초
  - 동시 사용자 100명 처리 가능
  - 오류율 < 1%
  - API 호출 제한 내 운영
  
  부하 테스트 보고서 작성 완료
  ```

- [ ] **보안 취약점 점검 완료**
  ```
  보안 체크리스트:
  - 인증 우회 불가능 확인
  - SQL Injection 방어 확인
  - XSS 공격 차단 확인
  - 민감 데이터 암호화 확인
  - HTTPS만 사용
  - 보안 감사 로그 활성화
  
  보안 테스트 보고서 승인
  ```

- [ ] **백업 및 복구 계획 수립**
  ```
  백업 전략:
  - Copilot 구성 export (JSON)
  - 지식베이스 백업
  - 환경 설정 문서화
  - 복구 절차 문서화
  - 복구 테스트 1회 이상 수행
  
  RPO (Recovery Point Objective): 24시간
  RTO (Recovery Time Objective): 4시간
  ```

- [ ] **모니터링 및 알림 설정 완료**
  ```
  모니터링 구성:
  - Application Insights 연결
  - 알림 규칙 설정
  - 대시보드 구성
  - 로그 보존 정책 설정
  - 온콜 담당자 지정
  
  테스트 알림 전송 확인
  ```

#### 8.2 비즈니스 준비

**운영 프로세스 수립**

- [ ] **사용자 교육 자료 준비**
  ```
  교육 자료:
  - 사용자 가이드 (PDF, 5-10페이지)
  - 빠른 시작 가이드 (1페이지)
  - 비디오 튜토리얼 (3-5분)
  - FAQ 문서
  - 실습 환경 제공
  
  대상별 자료:
  - 일반 사용자용
  - 관리자용
  - IT 지원팀용
  ```

- [ ] **헬프데스크 지원 프로세스 수립**
  ```
  지원 프로세스:
  1. 1차 지원: Copilot FAQ
  2. 2차 지원: 헬프데스크 티켓
  3. 3차 지원: 전문가 에스컬레이션
  
  준비 사항:
  - 지원 티켓 시스템 준비
  - 헬프데스크 교육 완료
  - 트러블슈팅 가이드 작성
  - 일반적인 문제 해결 스크립트
  ```

- [ ] **에스컬레이션 프로세스 정의**
  ```
  에스컬레이션 경로:
  
  Level 1: Copilot 자동 응답
  - 자동 해결 가능한 문제
  
  Level 2: 일반 지원팀
  - 일반적인 문의 및 간단한 문제
  - 응답 시간: 4시간 이내
  
  Level 3: 전문가 팀
  - 복잡하거나 전문적인 문제
  - 응답 시간: 24시간 이내
  
  Level 4: 개발팀
  - 시스템 오류 또는 버그
  - 응답 시간: 즉시
  ```

- [ ] **비상 연락망 구성**
  ```
  연락망:
  
  [Tier 1 - 24/7]
  - 온콜 엔지니어: +82-10-XXXX-XXXX
  - 백업: +82-10-YYYY-YYYY
  
  [Tier 2 - 업무시간]
  - IT 매니저: manager@company.com
  - HR 리드: hr-lead@company.com
  
  [Tier 3 - 경영진]
  - CIO: cio@company.com
  - IT 디렉터: it-director@company.com
  
  커뮤니케이션 채널:
  - Teams: #copilot-support
  - 이메일: copilot-support@company.com
  - 전화: 내선 9999
  ```

- [ ] **서비스 수준 협약(SLA) 정의**
  ```
  SLA 항목:
  
  가용성:
  - 목표: 99.5% uptime
  - 계획된 유지보수: 월 1회, 2시간
  - 측정: 월간 평균
  
  응답 시간:
  - P50: < 3초
  - P95: < 5초
  - P99: < 8초
  
  문제 해결 시간:
  - Critical: 1시간 이내 대응
  - High: 4시간 이내 대응
  - Medium: 1일 이내 대응
  - Low: 3일 이내 대응
  
  지원 시간:
  - 기본 지원: 평일 09:00-18:00
  - 긴급 지원: 24/7 (Critical 이슈)
  ```

- [ ] **변경 관리 프로세스 수립**
  ```
  변경 관리 절차:
  
  1. 변경 요청 (Change Request)
     - 템플릿 사용
     - 비즈니스 정당성 포함
     - 영향도 평가
  
  2. 승인 프로세스
     - Minor: IT 매니저 승인
     - Major: CAB (Change Advisory Board) 승인
  
  3. 테스트
     - Dev 환경 테스트
     - QA 환경 검증
     - 파일럿 그룹 테스트
  
  4. 배포
     - 배포 시간: 업무시간 외
     - 롤백 준비 필수
     - 모니터링 강화
  
  5. 사후 검토
     - 배포 후 24시간 모니터링
     - 문제 발생 시 보고
     - 교훈 문서화
  ```

#### 8.3 운영 준비

**문서 및 프로세스 완비**

- [ ] **운영 매뉴얼 작성**
  ```
  포함 내용:
  - 시스템 아키텍처 다이어그램
  - 일상 운영 절차
  - 모니터링 체크리스트
  - 일반적인 문제 해결 가이드
  - 연락처 및 에스컬레이션 경로
  - 변경 관리 프로세스
  
  업데이트 주기: 분기별
  ```

- [ ] **장애 대응 절차 수립**
  ```
  인시던트 대응 프로세스:
  
  1. 감지 (Detection)
     - 자동 알림
     - 사용자 신고
     - 모니터링 발견
  
  2. 분류 (Triage)
     - 심각도 결정
     - 담당자 할당
     - 초기 조사
  
  3. 조사 (Investigation)
     - 로그 분석
     - 근본 원인 파악
     - 영향 범위 확인
  
  4. 해결 (Resolution)
     - 임시 조치
     - 영구 수정
     - 테스트 및 검증
  
  5. 복구 (Recovery)
     - 서비스 복원
     - 사용자 공지
     - 모니터링 강화
  
  6. 사후 검토 (Post-Mortem)
     - 타임라인 작성
     - 근본 원인 분석
     - 재발 방지 대책
  ```

- [ ] **정기 점검 일정 수립**
  ```
  점검 스케줄:
  
  일일:
  - 시스템 가용성 확인
  - 주요 메트릭 리뷰
  - 오류 로그 검토
  
  주간:
  - 성능 추이 분석
  - 사용자 피드백 검토
  - 백업 상태 확인
  
  월간:
  - 용량 계획 리뷰
  - 보안 패치 적용
  - 지식베이스 업데이트
  - SLA 달성도 리포트
  
  분기:
  - 비즈니스 리뷰
  - 개선 계획 수립
  - 재해 복구 훈련
  ```

- [ ] **성능 최적화 계획 수립**
  ```
  최적화 영역:
  
  1. 응답 시간 개선
     - 캐싱 전략
     - 쿼리 최적화
     - 인덱스 튜닝
  
  2. 비용 최적화
     - API 호출 감소
     - 스토리지 정리
     - 리소스 적정 크기 조정
  
  3. 사용자 경험 향상
     - 프롬프트 개선
     - 응답 품질 향상
     - 에러 메시지 개선
  
  검토 주기: 월간
  ```

- [ ] **용량 증설 기준 정의**
  ```
  증설 트리거:
  
  사용자 수:
  - 현재 대비 50% 증가 시
  - 예상 증가 3개월 전 계획
  
  성능:
  - P95 응답 시간 > 7초 지속
  - CPU 사용률 > 80% 지속
  - API 호출 한도의 90% 도달
  
  증설 절차:
  1. 용량 요구사항 분석
  2. 예산 승인
  3. 리소스 프로비저닝
  4. 테스트 및 검증
  5. 단계적 적용
  ```

### 9. 롤백 계획

#### 9.1 롤백 시나리오

**언제 롤백을 수행하는가?**

롤백 결정 기준을 명확히 정의합니다.

**자동 롤백 트리거:**
```
심각도 Critical:
- 시스템 가용성 < 95% (10분 지속)
- 오류율 > 10% (5분 지속)
- 인증 시스템 완전 실패
- 데이터 손실 발생

즉시 롤백 실행
```

**수동 롤백 검토 트리거:**
```
심각도 High:
- P95 응답 시간 > 15초 (15분 지속)
- 오류율 > 5% (15분 지속)
- 주요 기능 작동 불가
- 보안 취약점 발견

담당자 판단 후 롤백 여부 결정 (30분 이내)
```

**롤백 종류:**

1. **긴급 롤백 (Emergency Rollback)**
   
   치명적인 오류 발생 시 즉시 이전 버전으로 복구합니다.
   
   ```
   상황:
   - 시스템 전체 다운
   - 대규모 데이터 손실
   - 심각한 보안 breach
   
   실행 시간: < 15분
   승인: 온콜 엔지니어 단독 결정
   
   절차:
   1. 인시던트 선언
   2. 즉시 롤백 실행
   3. 서비스 복원 확인
   4. 경영진 보고
   5. 근본 원인 분석
   ```

2. **단계적 롤백 (Gradual Rollback)**
   
   부분적인 문제 발생 시 특정 기능만 롤백합니다.
   
   ```
   상황:
   - 특정 토픽 오류
   - 특정 통합 실패
   - 성능 저하 (Critical 미만)
   
   실행 시간: < 1시간
   승인: IT 매니저
   
   절차:
   1. 문제 토픽/기능 비활성화
   2. 해당 부분만 이전 버전으로 복구
   3. 나머지 기능 정상 작동 확인
   4. 사용자 공지
   5. 문제 조사 및 수정
   ```

3. **데이터 복구 (Data Recovery)**
   
   데이터 손상 시 백업으로부터 복구합니다.
   
   ```
   상황:
   - 데이터 손상 또는 삭제
   - 잘못된 대량 업데이트
   - 데이터베이스 corruption
   
   실행 시간: < 4시간 (RPO 기준)
   승인: IT 디렉터
   
   절차:
   1. 손상 범위 파악
   2. 최신 백업 확인
   3. 테스트 환경에서 복구 시뮬레이션
   4. 프로덕션 복구 실행
   5. 데이터 무결성 검증
   6. 서비스 재개
   ```

#### 9.2 롤백 절차

**사전 준비사항**

롤백을 원활하게 수행하기 위한 사전 준비사항입니다.

**1. 버전 관리**
```powershell
# Copilot 구성 백업
# 배포 전 자동 실행

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = "./backups/copilot-backup-$timestamp.zip"

# Copilot Studio 구성 export
Export-CopilotConfiguration `
  -CopilotId "copilot-prod" `
  -OutputPath $backupPath

# 버전 태그
git tag -a "v1.2.0-prod" -m "Production deployment"
git push origin v1.2.0-prod
```

**2. 롤백 스크립트 준비**
```powershell
# rollback.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$BackupVersion,
    
    [Parameter(Mandatory=$false)]
    [switch]$Emergency = $false
)

function Rollback-Copilot {
    Write-Host "Starting rollback to version: $BackupVersion"
    
    # 1. 현재 구성 백업 (롤백 실패 시 복구용)
    $currentBackup = Backup-CurrentConfiguration
    
    try {
        # 2. 이전 버전 복원
        Restore-CopilotConfiguration -Version $BackupVersion
        
        # 3. 연결 테스트
        Test-CopilotConnections
        
        # 4. 스모크 테스트
        if (-not $Emergency) {
            Run-SmokeTests
        }
        
        # 5. 성공 확인
        Write-Host "Rollback completed successfully"
        Send-Notification -Type "Success" -Message "Rollback to $BackupVersion completed"
        
    } catch {
        Write-Error "Rollback failed: $_"
        
        # 롤백 실패 시 현재 버전으로 복구
        Restore-CopilotConfiguration -Backup $currentBackup
        
        Send-Notification -Type "Error" -Message "Rollback failed, restored to current version"
        throw
    }
}

# 실행
Rollback-Copilot -BackupVersion $BackupVersion -Emergency:$Emergency
```

**3. 검증 스크립트**
```python
# smoke_test.py
import requests
import json

class SmokeTest:
    def __init__(self, endpoint):
        self.endpoint = endpoint
        self.results = []
    
    def test_authentication(self):
        """인증 테스트"""
        response = requests.get(f"{self.endpoint}/api/health/auth")
        assert response.status_code == 200
        self.results.append(("Authentication", "PASS"))
    
    def test_basic_conversation(self):
        """기본 대화 테스트"""
        payload = {
            "text": "안녕하세요",
            "userId": "smoketest@company.com"
        }
        response = requests.post(
            f"{self.endpoint}/api/messages",
            json=payload
        )
        assert response.status_code == 200
        assert len(response.json()["text"]) > 0
        self.results.append(("Basic Conversation", "PASS"))
    
    def test_knowledge_search(self):
        """지식 검색 테스트"""
        payload = {
            "text": "휴가 신청 방법",
            "userId": "smoketest@company.com"
        }
        response = requests.post(
            f"{self.endpoint}/api/messages",
            json=payload
        )
        assert response.status_code == 200
        assert "휴가" in response.json()["text"]
        self.results.append(("Knowledge Search", "PASS"))
    
    def run_all_tests(self):
        """모든 테스트 실행"""
        tests = [
            self.test_authentication,
            self.test_basic_conversation,
            self.test_knowledge_search
        ]
        
        for test in tests:
            try:
                test()
            except Exception as e:
                self.results.append((test.__name__, f"FAIL: {str(e)}"))
        
        return all(result[1] == "PASS" for result in self.results)

# 실행
if __name__ == "__main__":
    tester = SmokeTest("https://copilot-prod.company.com")
    success = tester.run_all_tests()
    
    print("Smoke Test Results:")
    for test_name, result in tester.results:
        print(f"  {test_name}: {result}")
    
    exit(0 if success else 1)
```

**롤백 실행 절차**

**Step-by-Step 가이드:**

```markdown
## 롤백 실행 체크리스트

### 준비 (5분)

- [ ] **롤백 결정 확인**
  - 롤백 사유 문서화
  - 승인자 확인
  - 영향 범위 파악

- [ ] **팀 소집**
  - 온콜 엔지니어
  - IT 매니저
  - 커뮤니케이션 담당자

- [ ] **사용자 공지 준비**
  ```
  제목: [긴급] 시스템 임시 중단 안내
  
  안녕하세요,
  
  시스템 안정화를 위해 긴급 점검을 진행합니다.
  
  - 점검 시작: [시작 시간]
  - 예상 소요: 15-30분
  - 영향 범위: Copilot 서비스 일시 중단
  
  불편을 드려 죄송합니다.
  ```

### 실행 (10-15분)

- [ ] **1단계: 서비스 중단**
  ```powershell
  # 트래픽 차단 (선택적)
  Disable-CopilotEndpoint -Name "copilot-prod"
  
  # 유지보수 모드 활성화
  Set-CopilotMaintenanceMode -Enabled $true -Message "긴급 점검 중입니다"
  ```

- [ ] **2단계: 백업 확인**
  ```powershell
  # 롤백할 버전 확인
  Get-CopilotBackups | Where-Object { $_.Version -eq "v1.1.0" }
  
  # 백업 무결성 검증
  Test-BackupIntegrity -Version "v1.1.0"
  ```

- [ ] **3단계: 롤백 실행**
  ```powershell
  # 롤백 스크립트 실행
  .\rollback.ps1 -BackupVersion "v1.1.0" -Emergency
  
  # 진행 상황 모니터링
  ```

- [ ] **4단계: 검증**
  ```powershell
  # 스모크 테스트
  python smoke_test.py
  
  # 연결 테스트
  Test-CopilotConnections
  
  # 로그 확인
  Get-CopilotLogs -Last 10
  ```

- [ ] **5단계: 서비스 재개**
  ```powershell
  # 유지보수 모드 해제
  Set-CopilotMaintenanceMode -Enabled $false
  
  # 트래픽 활성화
  Enable-CopilotEndpoint -Name "copilot-prod"
  ```

### 사후 조치 (30분)

- [ ] **모니터링 강화**
  ```
  - 응답 시간 실시간 추적 (30분)
  - 오류율 모니터링
  - 사용자 피드백 수집
  - 알림 임계값 일시적 강화
  ```

- [ ] **사용자 공지**
  ```
  제목: 시스템 정상화 완료
  
  긴급 점검이 완료되었습니다.
  
  - 완료 시각: [완료 시간]
  - 현재 상태: 정상
  
  이용에 불편을 드려 죄송합니다.
  감사합니다.
  ```

- [ ] **인시던트 보고서 작성**
  ```markdown
  # 인시던트 보고서
  
  ## 요약
  - 발생 시각: 2024-11-27 14:30
  - 해결 시각: 2024-11-27 14:52
  - 다운타임: 22분
  - 영향 범위: 전체 사용자
  
  ## 타임라인
  - 14:30 - 배포 완료
  - 14:35 - 오류율 급증 감지
  - 14:37 - 롤백 결정
  - 14:40 - 롤백 시작
  - 14:50 - 서비스 복원
  - 14:52 - 정상화 확인
  
  ## 근본 원인
  [분석 내용]
  
  ## 재발 방지 대책
  1. [대책 1]
  2. [대책 2]
  
  ## 교훈
  [학습한 내용]
  ```

- [ ] **Post-Mortem 회의 일정 수립**
  ```
  참석자:
  - 개발팀 리드
  - IT 매니저
  - 운영팀
  
  안건:
  - 인시던트 리뷰
  - 근본 원인 분석
  - 개선 계획 수립
  ```
```

**롤백 후 검증**

서비스 복원 후 정상 작동을 확인합니다.

```kql
// 롤백 후 모니터링 쿼리

// 1. 오류율 확인
requests
| where timestamp > ago(30m)
| summarize 
    Total = count(),
    Failed = countif(success == false),
    ErrorRate = countif(success == false) * 100.0 / count()
    by bin(timestamp, 1m)
| render timechart

// 2. 응답 시간 확인  
requests
| where timestamp > ago(30m)
| summarize 
    P50 = percentile(duration, 50),
    P95 = percentile(duration, 95),
    P99 = percentile(duration, 99)
    by bin(timestamp, 1m)
| render timechart

// 3. 사용자 영향 확인
customEvents
| where timestamp > ago(30m)
| where name == "ConversationStart"
| summarize UserCount = dcount(user_Id) by bin(timestamp, 5m)
| render timechart

// 4. 주요 기능 테스트
dependencies
| where timestamp > ago(30m)
| summarize 
    CallCount = count(),
    SuccessRate = countif(success) * 100.0 / count()
    by target
| order by CallCount desc
```

### 10. 문서화

#### 10.1 필수 문서

**기술 문서**

시스템의 기술적 세부사항을 문서화합니다.

**1. 시스템 아키텍처 문서**
```markdown
# Copilot Studio 시스템 아키텍처

## 개요
전체 시스템 구성도 및 컴포넌트 설명

## 구성 요소

### Frontend
- Copilot Studio Web Interface
- 임베디드 Copilot (Teams, Web)

### Backend Services
- Power Platform 환경
- Azure OpenAI Service
- Application Insights

### 데이터 저장소
- Dataverse
- SharePoint Online
- Azure Blob Storage
- Azure AI Search

### 통합
- Microsoft Entra ID (인증)
- Power Automate (워크플로우)
- Microsoft Graph API

## 데이터 플로우
[다이어그램 포함]

1. 사용자 입력 → Copilot Studio
2. 인증 확인 → Entra ID
3. 의도 파악 → Azure OpenAI
4. 지식 검색 → Azure AI Search / SharePoint
5. 액션 실행 → Power Automate / Dataverse
6. 응답 생성 → Azure OpenAI
7. 사용자에게 반환
8. 로깅 → Application Insights

## 네트워크 아키텍처
- VNet 구성
- 방화벽 규칙
- Private Endpoints

## 보안 아키텍처
- 인증/권한 흐름
- 데이터 암호화
- 네트워크 보안

## 재해 복구
- RTO: 4시간
- RPO: 24시간
- 백업 전략
```

**2. API 연동 문서**
```markdown
# API 통합 가이드

## Azure OpenAI API

### 엔드포인트
```
https://your-openai.openai.azure.com/
```

### 인증
- API Key 기반
- Key Vault에서 관리

### 사용 패턴
```python
import openai

openai.api_type = "azure"
openai.api_key = get_secret("openai-api-key")
openai.api_base = "https://your-openai.openai.azure.com/"
openai.api_version = "2024-02-15-preview"

response = openai.ChatCompletion.create(
    engine="gpt-4",
    messages=[{"role": "user", "content": "안녕하세요"}],
    temperature=0.7,
    max_tokens=800
)
```

### 제한사항
- Rate Limit: 10,000 requests/min
- Token Limit: 1M tokens/month
- Max Tokens per Request: 4096

## Microsoft Graph API

### 엔드포인트
```
https://graph.microsoft.com/v1.0
```

### 인증
- OAuth 2.0
- Application Permissions

### SharePoint 파일 검색
```http
GET /sites/{site-id}/drive/root/search(q='{query}')
Authorization: Bearer {token}
```

### 응답 예시
```json
{
  "value": [
    {
      "id": "01BYE5RZ...",
      "name": "HR정책.pdf",
      "webUrl": "https://...",
      "@microsoft.graph.downloadUrl": "https://..."
    }
  ]
}
```

## Dataverse Web API

### 엔드포인트
```
https://org.crm.dynamics.com/api/data/v9.2/
```

### 인증
- Service Principal
- Connection Reference

### 데이터 조회
```http
GET /accounts?$select=name,accountnumber&$filter=revenue gt 100000
Authorization: Bearer {token}
Prefer: odata.maxpagesize=50
```
```

**3. 배포 가이드**
```markdown
# 프로덕션 배포 가이드

## 사전 준비

### 1. 환경 구성
- Power Platform 환경 준비
- Azure 리소스 프로비저닝
- 네트워크 설정

### 2. 솔루션 패키징
```powershell
# 솔루션 export
Export-Solution `
  -SolutionName "CopilotStudio" `
  -OutputPath "./deployment/solution.zip" `
  -Managed $true
```

### 3. 환경 변수 설정
```json
{
  "OpenAI": {
    "Endpoint": "https://your-openai.openai.azure.com/",
    "ApiKey": "@Microsoft.KeyVault(SecretUri=...)",
    "DeploymentName": "gpt-4"
  },
  "ApplicationInsights": {
    "ConnectionString": "..."
  },
  "SharePoint": {
    "SiteUrl": "https://company.sharepoint.com/sites/docs"
  }
}
```

## 배포 단계

### 1. 솔루션 Import
```powershell
Import-Solution `
  -SolutionPath "./deployment/solution.zip" `
  -EnvironmentUrl "https://org.crm.dynamics.com"
```

### 2. 연결 구성
- SharePoint 연결
- Azure OpenAI 연결
- Dataverse 연결

### 3. 권한 설정
- 앱 등록 구성
- API 권한 부여
- 사용자 역할 할당

### 4. 테스트
- 스모크 테스트
- 통합 테스트
- UAT

### 5. Go-Live
- 점진적 트래픽 전환
- 모니터링
- 사용자 공지
```

**사용자 가이드**

최종 사용자를 위한 사용 설명서를 작성합니다.

**1. 빠른 시작 가이드** (1페이지)
```markdown
# Copilot 빠른 시작 가이드

## 시작하기

### 1. 접속 방법
- **Teams**: 왼쪽 메뉴에서 "HR Copilot" 클릭
- **웹**: https://copilot.company.com 접속
- **모바일**: Teams 앱에서 동일

### 2. 첫 대화
```
안녕하세요!
무엇을 도와드릴까요?
```

**질문 예시**:
- "휴가 신청은 어떻게 하나요?"
- "급여 명세서는 어디서 보나요?"
- "회의실 예약 방법 알려주세요"

### 3. 유용한 팁
✅ 구체적으로 질문하세요
✅ 한 번에 한 가지씩 물어보세요
✅ "도움말"을 입력하면 가능한 질문을 볼 수 있어요

### 4. 도움이 필요하면
- 챗봇 내 "상담원 연결" 버튼
- 헬프데스크: 내선 1234
- 이메일: support@company.com
```

**2. 상세 사용자 매뉴얼** (10-20페이지)
```markdown
# Copilot 사용자 매뉴얼

## 목차
1. 소개
2. 시작하기
3. 주요 기능
4. 문제 해결
5. FAQ

## 1. 소개

### Copilot이란?
업무에 필요한 정보를 빠르게 찾고, 
절차를 안내받을 수 있는 AI 비서입니다.

### 무엇을 할 수 있나요?
- 📚 문서 및 정책 검색
- 📝 절차 안내
- 📊 데이터 조회
- 🎫 티켓 생성

## 2. 시작하기

### 첫 로그인
[스크린샷 포함]

1. Teams 또는 웹 브라우저로 접속
2. 회사 계정으로 로그인
3. 권한 승인 (처음 한 번만)

### 대화 시작
[스크린샷 포함]

"안녕하세요" 또는 질문을 바로 입력하세요.

## 3. 주요 기능

### 문서 검색
**질문**: "재택근무 정책을 알려주세요"
**응답**: [예시 포함]

### 절차 안내
**질문**: "출장 신청 방법"
**응답**: [스텝별 안내]

### 데이터 조회
**질문**: "내 연차 잔여일수"
**응답**: [개인화된 정보]

## 4. 문제 해결

### 로그인이 안 돼요
- 브라우저 쿠키 삭제
- 시크릿 모드로 시도
- IT 헬프데스크 문의

### 답변이 정확하지 않아요
- "피드백" 버튼으로 의견 보내기
- 구체적으로 다시 질문
- 상담원 연결 요청

## 5. FAQ

Q: 개인정보는 안전한가요?
A: 모든 대화는 암호화되어 저장되며...

Q: 24시간 사용 가능한가요?
A: 네, 언제든지 사용 가능합니다...
```

**관리자 가이드**

시스템 관리 및 유지보수를 위한 가이드입니다.

```markdown
# Copilot 관리자 가이드

## 1. 일상 관리

### 대시보드 모니터링
- 매일 오전 확인
- 주요 메트릭 리뷰
- 이상 징후 점검

### 사용자 관리
```powershell
# 사용자 추가
Add-CopilotUser -Email "user@company.com" -Role "User"

# 역할 변경
Set-CopilotUserRole -Email "admin@company.com" -Role "Admin"

# 사용자 제거
Remove-CopilotUser -Email "user@company.com"
```

### 토픽 관리
- 토픽 성능 분석
- 부진한 토픽 개선
- 새 토픽 추가

## 2. 지식베이스 관리

### 문서 업데이트
```markdown
월간 체크리스트:
- [ ] 만료된 문서 확인
- [ ] 정책 변경 사항 반영
- [ ] 링크 유효성 검사
- [ ] 검색 최적화
```

### 인덱스 재구축
```powershell
# Azure AI Search 인덱스 재구축
Rebuild-SearchIndex -IndexName "copilot-knowledge"
```

## 3. 성능 튜닝

### 응답 시간 개선
- 슬로우 쿼리 분석
- 캐싱 전략 적용
- API 호출 최적화

### 비용 최적화
- 사용량 리포트 리뷰
- 불필요한 리소스 정리
- 적정 크기 조정

## 4. 보안 관리

### 접근 로그 모니터링
```kql
// 비정상 접근 패턴
AuditLogs
| where TimeGenerated > ago(24h)
| where ResultDescription contains "Failed"
| summarize Count = count() by UserPrincipalName
| where Count > 10
```

### 권한 검토
- 분기별 권한 리뷰
- 불필요한 권한 제거
- 최소 권한 원칙 적용

## 5. 트러블슈팅

### 일반적인 문제

**문제**: 응답이 느림
**진단**:
```kql
requests
| where duration > 10000
| project timestamp, name, duration
```
**해결**: [단계별 가이드]

**문제**: 인증 실패
**진단**: Entra ID 로그 확인
**해결**: [단계별 가이드]
```

#### 10.2 문서 관리

**버전 관리**

모든 문서의 버전 및 변경 이력을 관리합니다.

```markdown
# 문서 버전 관리 정책

## 버전 번호 체계
MAJOR.MINOR.PATCH

- MAJOR: 큰 변경 (구조 변경, 기능 추가/제거)
- MINOR: 작은 변경 (내용 업데이트, 섹션 추가)
- PATCH: 수정 (오타, 링크 수정)

## 변경 이력
각 문서 하단에 변경 이력 포함:

---
**버전**: 1.2.0
**최종 업데이트**: 2024-11-27
**작성자**: IT팀
**검토자**: CTO
**다음 검토 예정**: 2025-02-27

**변경 이력**:
- 1.2.0 (2024-11-27): Azure AI Search 섹션 추가
- 1.1.0 (2024-10-15): 보안 가이드라인 업데이트
- 1.0.0 (2024-09-01): 초기 버전
```

**접근성**

필요한 사람이 쉽게 접근 가능한 위치에 문서를 보관합니다.

```markdown
# 문서 저장소 구조

## SharePoint 사이트
https://company.sharepoint.com/sites/Copilot-Docs

```
📁 Copilot Documentation
├── 📁 User Guides
│   ├── Quick Start Guide.pdf
│   ├── User Manual.pdf
│   └── Video Tutorials/
├── 📁 Admin Guides
│   ├── Admin Manual.pdf
│   ├── Troubleshooting Guide.pdf
│   └── Runbooks/
├── 📁 Technical Docs
│   ├── Architecture.md
│   ├── API Integration.md
│   ├── Deployment Guide.md
│   └── Security Guide.md
├── 📁 Processes
│   ├── Change Management.md
│   ├── Incident Response.md
│   └── Rollback Procedures.md
└── 📁 Templates
    ├── Incident Report Template.docx
    ├── Change Request Template.docx
    └── Post-Mortem Template.md
```

## 접근 권한
- 사용자 가이드: 전체 직원
- 관리자 가이드: IT팀, 관리자
- 기술 문서: IT팀, 개발자
- 프로세스 문서: 관련 팀원
```

**정기 업데이트**

시스템 변경사항 반영을 위한 정기 업데이트를 수행합니다.

```markdown
# 문서 업데이트 스케줄

## 리뷰 주기

| 문서 유형 | 리뷰 주기 | 담당자 | 승인자 |
|-----------|----------|--------|--------|
| 사용자 가이드 | 분기 | CS팀 | IT 매니저 |
| 관리자 가이드 | 월간 | IT팀 | IT 디렉터 |
| 기술 문서 | 릴리스마다 | 개발팀 | 아키텍트 |
| 프로세스 문서 | 반기 | 운영팀 | CIO |
| FAQ | 격주 | CS팀 | CS 리드 |

## 업데이트 프로세스

1. **리뷰 예정 알림**
   - 리뷰 2주 전 담당자에게 알림
   
2. **내용 검토**
   - 최신 정보 반영
   - 링크 유효성 확인
   - 스크린샷 업데이트
   
3. **검토 및 승인**
   - 동료 리뷰
   - 승인자 검토
   
4. **게시**
   - 버전 업데이트
   - SharePoint에 게시
   - 변경 사항 공지
   
5. **다음 리뷰 일정 설정**
```

---

[← 메인으로 돌아가기](../README.md)
