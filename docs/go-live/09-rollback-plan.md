# 9. 롤백 계획

> **Go-Live 고려 사항** > 롤백 계획

## 📋 목차

- [9.1 롤백 시나리오](#91-롤백-시나리오)
- [9.2 롤백 절차](#92-롤백-절차)

---

## 9.1 롤백 시나리오

### 롤백 결정 기준

**자동 롤백 트리거:**
```
심각도 Critical:
- 시스템 가용성 < 95% (10분 지속)
- 오류율 > 10% (5분 지속)
- 인증 시스템 완전 실패
- 데이터 손실 발생

→ 즉시 롤백 실행
```

**수동 롤백 검토:**
```
심각도 High:
- P95 응답 시간 > 15초 (15분 지속)
- 오류율 > 5% (15분 지속)
- 주요 기능 작동 불가

→ 30분 이내 결정
```

### 롤백 종류

**1. 긴급 롤백**
- 상황: 시스템 전체 다운
- 실행 시간: < 15분
- 승인: 온콜 엔지니어

**2. 단계적 롤백**
- 상황: 특정 기능 오류
- 실행 시간: < 1시간
- 승인: IT 매니저

**3. 데이터 복구**
- 상황: 데이터 손상
- 실행 시간: < 4시간
- 승인: IT 디렉터

---

## 9.2 롤백 절차

### 사전 준비

**버전 관리:**
```powershell
# Copilot 구성 백업
Export-CopilotConfiguration `
  -CopilotId "copilot-prod" `
  -OutputPath "./backups/backup-$timestamp.zip"

# 버전 태그
git tag -a "v1.2.0-prod" -m "Production deployment"
```

### 롤백 실행

**Step-by-Step:**

1. **서비스 중단** (2분)
   ```powershell
   Set-CopilotMaintenanceMode -Enabled $true
   ```

2. **백업 확인** (3분)
   ```powershell
   Test-BackupIntegrity -Version "v1.1.0"
   ```

3. **롤백 실행** (5분)
   ```powershell
   .\rollback.ps1 -BackupVersion "v1.1.0" -Emergency
   ```

4. **검증** (3분)
   ```powershell
   python smoke_test.py
   ```

5. **서비스 재개** (2분)
   ```powershell
   Set-CopilotMaintenanceMode -Enabled $false
   ```

### 사후 조치

- 모니터링 강화 (30분)
- 사용자 공지
- 인시던트 보고서 작성
- Post-Mortem 회의

---

## 네비게이션

| [← 이전: 배포 전 체크리스트](08-deployment-checklist.md) | [📚 목차로](../go-live-considerations.md) | [다음: 문서화 →](10-documentation.md) |
|---|---|---|
