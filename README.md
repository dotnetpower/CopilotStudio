# CopilotStudio
코파일럿 스튜디오에 대한 전반적인 설명

## 준비

https://copilotstudio.microsoft.com 




## SharePoint 에 등록된 문서를 Copilot 에서 검색 하기 위한 절차

1. Copilot Studio 에 접속 하여 `만들기` 를 통해 `신규 Copilot` 선택
![](images/2024-06-26-17-48-48.png)

2. 이름을 지정하고 `만들기` 버튼 클릭
![](images/2024-06-26-17-52-17.png)
- 언어 설정을 한국어로 설정하는 경우 `클래식`모드로 동작하므로 생성형 AI 의 응답방식은 사용자가 `토픽`에 입력한 예시문을 바탕으로 `토픽`과 `작업`을 선택.
- 영어로 설정하면 생성형 AI 의 `생성형(프리뷰)`기능이 활성화 되고 `토픽`과 `작업`에 대해 요약(Description) 을 LLM 이 판단하여 선택하는 차이가 있음.

3. 예제 파일인 [풍력발전_오해와_진실.pdf](files/풍력발전_오해와_진실.pdf) 문서 내용중 
첫 페이지의 `풍력발전의 역사`에 대해 문서를 업로드 하기전 상태에서 코파일럿에게 질문

    **질문: 풍력발전기로 한 해 동안 몇 가구에 전기를 공급할 수 있어?**

    - 참조 자료를 비활성화 한 상태에서는 다음처럼 답변을 하지 못함.
    ![](images/2024-06-26-18-04-31.png)
    ![](images/2024-06-26-18-16-51.png)

    - 참조 자료를 활성화 하여 공개된 지식을 참조 하면 다음과 같이 공개된 내용에 대해 답변
    ![](images/2024-06-26-18-16-12.png)

4. SharePoint 사이트에 문서 등록 또는 등록된 문서가 있는 사이트 URL 복사
    ![](images/2024-06-26-18-20-02.png)
    테스트용 url 에서는 https://...도메인/sites/CopilotDocSharing/Shared Documents 가 사용됨.
    ![](images/2024-06-26-18-22-25.png)

5. Copilot Studio 에서 `참조 자료 추가`
    ![](images/2024-06-26-18-24-20.png)

    SharePoint 및 OneDrive 선택
    ![](images/2024-06-26-18-25-10.png)

    이전에 복사해둔 SharePoint URL 붙여넣기
    ![](images/2024-06-26-18-27-42.png)

6. Copilot 설정에서 `인증` 변경
    ![](images/2024-06-26-18-29-47.png)

    ![](images/2024-06-26-18-30-04.png)

    로그인한 사용자에 대해서만 문서 검색이 허용되어야 하므로 `수동으로 인증` 과 `사용자가 로그인해야 함` 을 체크
    **앱등록 화면에서 `리디렉션 URL` 이 사용되므로 복사 클릭**
    ![](images/2024-06-26-18-32-36.png)

7. [Entra 관리센터](https://entra.microsoft.com) 에서 `애플리케이션-앱 등록` 화면에서 생성한 Copilot 선택
    ![](images/2024-06-26-18-36-56.png)

    1. `인증` 선택하고 `플랫폼 추가-웹` 선택
    ![](images/2024-06-26-18-57-38.png)

    복사 해둔 리디렉션 URL 붙여넣고, 권한 부여에 `액세스 토큰`, `ID 토큰` 체크 후 `구성` 클릭
    ![](images/2024-06-26-18-58-53.png)
    

    2. `API 사용 권한` 에서 Microsoft Graph 에 대한 권한 추가
    ![](images/2024-06-26-18-38-12.png)

    `위임된 권한` 선택
    ![](images/2024-06-26-18-39-33.png)

    `OpenID` 권한 중, openid, profile 선택
    ![](images/2024-06-26-18-40-09.png)

    이 상태에서 `권한 선택`에 `files`로 검색하여 `Files.Read.All` 선택
    ![](images/2024-06-26-18-41-13.png)

    `sites`로 검색하여 `Sites.Read.All` 선택 후 `권한 추가` 버튼 클릭
    ![](images/2024-06-26-18-42-07.png)

    `xxx에 대한 관리자 동의 사용` 클릭
    ![](images/2024-06-26-18-43-04.png)

    **권한 설정 완료된 상태**
    ![alt text](images/image.png)

    3. `API 표시` 메뉴에서 `범위 추가` 클릭 후 `저장 후 계속` 클릭

    ![](images/2024-06-26-18-45-25.png)
    ![](images/2024-06-26-18-46-05.png)

    범위 이름 및 필수 항목을 적절히 등록 후 `범위 추가` 클릭, `관리자 및 사용자` 가 동의 되어야 함

    ![](images/2024-06-26-18-47-24.png)

    4. 인증서 및 암호 설정
    `인증서 및 암호-클라이언트 비밀-새 클라이언트 암호` 선택 후 임의 이름 `secret` 또는 `key` 등을 입력 후 `추가`

    ![](images/2024-06-26-18-50-37.png)

    **주의: 키는 생성할때만 보여지므로 값을 복사해 두어야 함**

    ![](images/2024-06-26-18-52-09.png)

    본 키는 Copilot Studio 인증에서 `클라이언트 암호`가 됨.

    클라이언트 ID 는 `개요`에서 `애플리케이션(클라이언트ID)` 를 사용하므로

    ![](images/2024-06-26-18-53-56.png)

    5. Copilot Studio 로 돌아와서 클라이언트 ID, 클라이언트 암호 입력 후 저장

    ![](images/2024-06-26-19-01-35.png)

    범위에 Files.Read.All Sites.Read.All 추가 후 저장 및 닫기

    ![](images/2024-06-26-19-02-29.png)

8. 테스트를 위해 Copilot 테스트에서 새로고침을 하면 로그인 요청

![](images/2024-06-26-19-03-40.png)

9. 로그인 버튼을 클릭하여 로그인 하면 유효성 검사 코드 복사 후 채팅창에 입력

![](images/2024-06-26-19-04-10.png)

10. 로그인 된 상태이므로 Welcome 메시지 노출됨.

![](images/2024-06-26-19-05-00.png)

11. `풍력발전기로 한 해 동안 몇 가구에 전기를 공급할 수 있어?` 질문을 통해 문서에서 검색된 결과가 노출됨을 확인

![](images/2024-06-26-19-05-55.png)

12. `게시`를 통해 코파일럿 공유


## SharePoint 목록을 조회하기 위한 절차(Power Automate)

1. 목록이 검색을 위해서 Power Automate 로 호출을 하기위해 다음과 같이 `자산관리` 목록에 데이터가 있다고 가정하고

    ![](images/2024-07-02-19-31-11.png)

2. 토픽추가에서 트리거 구문을 지정(생성형 AI 인 경우 능동형으로 작성)

    ![](images/2024-07-02-19-32-29.png)

3. 작업호출-흐름만들기 선택

    ![](images/2024-07-02-19-33-06.png)

4. Power Automate 화면의 Copilot 프롬프트에 다음과 같이 입력하여 SharePoint 목록 조회하는 단계를 추가

    ![](images/2024-07-02-19-37-28.png)
    ```
    get items from https://mngenvmcap132261.sharepoint.com/sites/TargetDLSite/Lists/List/AllItems.aspx
    ```

5. Sharepoint 목록 확인 - 목록 이름으로 List Name 업데이트 및 Top count 지정

    ![](images/2024-07-02-19-48-07.png)
    

6. 변수를 초기화

    ![](images/2024-07-02-19-41-14.png)

7. Apply to Each 추가 후 Append to string variable 에 Model 설정

    ![](images/2024-07-02-19-44-52.png)

8. 응답을 위한 출력변수 지정

    ![](images/2024-07-02-19-46-57.png)

9. Publish 후 Test 및 `Respond to Copilot` 을 클릭하여 테스트 결과 확인

    ![](images/2024-07-02-19-49-54.png)

10. Copilot Studio 에서 잠시 기다린 후 작업호출을 클릭하면 추가된 Flow 보이므로 클릭하여 추가

    ![](images/2024-07-02-19-51-04.png)

11. 마지막 단계에서 `메시지 보내기` 선택하여 변수를 다음처럼 설정

    ![](images/2024-07-02-19-52-21.png)

12. 다음처럼 연결 설정이 필요한 경우 연결을 클릭 하여 연결관리에서 연결해 주면 됨. 

    ![](images/2024-07-02-19-53-14.png)
    ![](images/2024-07-02-19-55-20.png)
    