# CopilotStudio
코파일럿 스튜디오에 대한 전반적인 설명

## 준비

https://copilotstudio.microsoft.com 

## 참고

[Copilot Studio의 새로운 기능](https://learn.microsoft.com/ko-kr/microsoft-copilot-studio/whats-new)

[Copilot Studio 릴리즈 플래너](https://releaseplans.microsoft.com/en-US/?app=Microsoft+Copilot+Studio): 기능 릴리즈 플래너

[Open AI Tokenizer](https://platform.openai.com/tokenizer): 토큰 수 계산

## 예제 목록
| 제목 | 내용 |
| --- | --- |
| [SharePoint 에 등록된 문서를 Copilot 에서 검색](#sharepoint-에-등록된-문서를-copilot-에서-검색-하기-위한-절차) | 참조자료에 SharePoint 의 문서를 추가하고 `앱 등록`에서 접근 권한 구성 예제 |
| [SharePoint 목록 조회](#sharepoint-목록을-조회하기-위한-절차power-automate) | SharePoint 목록은 Copilot Studio 기본 동작에 따라 조회가 되지 않으므로 PowerAutomate Cloud Flow 를 이용하여 목록 조회 예제 |
| [SharePoint 목록 조회(Dataverse Table)](#sharepoint-목록을-조회하기-위한-절차dataverse-table) | SharePoint 목록을 Dataverse Table 로 변환하여 `선택한 환경에서 행 나열` 커넥터를 이용해 조회 화는 예제 |
| [Azure AI Search를 이용한 벡터검색](#Azure-AI-Search) | Azure 스토리지 계정에 업로드한 문서 파일을 Vector 검색이 가능하도록 구성하는 방법 | 

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


## SharePoint 목록을 조회하기 위한 절차(Dataverse Table)

1. [Power Apps](https://make.powerapps.com) 의 `테이블-SharePoint 목록으로 만들기` 선택
    ![](images/2024-07-04-09-51-28.png)

2. 목록을 선택하고 `다음`

    ![](images/2024-07-04-09-52-02.png)

3. 테이블의 이름을 확인한 후 `만들기` 선택

    ![](images/2024-07-04-09-53-11.png)

4. 만들어진 테이블의 열(Column) 을 확인 하기 위해 `스키마-열` 선택하여 확인

    ![](images/2024-07-04-09-55-05.png)

    ![](images/2024-07-04-09-55-52.png)

5. Copilot Studio 에서 `참조자료` 추가

    ![](images/2024-07-04-09-56-48.png)

6. 생성된 테이블 선택

    ![](images/2024-07-04-09-57-36.png)

    ![](images/2024-07-04-09-57-51.png)

7. (옵션)동의어 추가로 인식 향상 가능하지만 지금 단계에서는 생략

    ![](images/2024-07-04-09-58-39.png)

8. 추가된 테이블 `작업현황`에 대해 조회를 하기위해 토픽 생성 후 테스트 목적이므로 트리거 문구를 `작업현황` 추가

    ![](images/2024-07-04-10-00-07.png)

9. `작업호출`을 선택하고 `dataverse` 키워드로 검색 후 `선택한 환경에서 행 나열` 선택

    ![](images/2024-07-04-10-02-01.png)

10. 입력값에 환경 선택, 테이블 선택

    ![](images/2024-07-04-10-03-53.png)

11. 4단계에서 확인한 열 이름을 고급 입력의 `Select Columns` 에 작성

    ![](images/2024-07-04-10-05-38.png)

12. 출력에 변수를 설정

    ![](images/2024-07-04-10-07-08.png)

13. 노드추가 `메시지 보내기` 선택하고 `PowerFx 식 삽입`을 클릭하여

    ![](images/2024-07-04-10-09-36.png)

14. 다음처럼 `Concat(Topic.model, cradb_title & ", ")` 입력 후 토픽 저장
    ![](images/2024-07-04-10-13-11.png)

15. 테스트 시 연결이 필요한 경우 연결

    ![](images/2024-07-04-10-14-27.png)

16. 연결 이후 다시 테스트 시 다음과 같이 Work Item 의 이름이 나열됨.

    ![](images/2024-07-04-10-15-36.png)
    

## Azure AI Search
Azure AI Search 와 Storage Account를 사용한 벡터 검색 방법

![](images/2024-12-13-09-40-21.png)
출처: [Azure AI Search의 벡터](https://learn.microsoft.com/ko-kr/azure/search/vector-search-overview)

### 벡터 검색을 위해 필요한 사항
- Azure OpenAI
- 임베딩 모델: [text-embedding-ada-002](https://learn.microsoft.com/ko-kr/azure/ai-services/openai/concepts/models?tabs=python-secure%2Cglobal-standard%2Cstandard-chat-completions#embeddings)
- Azure AI Search
- Azure Blob Storage

1. [Azure 에 리소스그룹 생성](https://techcommunity.microsoft.com/blog/startupsatmicrosoftblog/step-by-step-guide-creating-an-azure-resource-group-on-azure-portal/3792368)
   
    ![](images/2024-12-13-09-47-42.png)

2. Azure OpenAI 리소스를 리소스 그룹내에 생성
   
   ![](images/2024-12-13-09-56-34.png)

   - 모델 배포를 위해서 OpenAI 리소스 `개요` 화면에서 `Explorer AI Foundry portal` 버튼을 클릭하여 이동
   - AI Foundry 사이트에서 `Deployments` 메뉴로 이동하고 `Deploy model` 을 선택하여 `text-embedding-ada-002` 모델 선택
   ![](images/2024-12-13-14-17-57.png)


3. Storage Account 생성

   ![](images/2024-12-13-09-55-55.png)

4. Azure AI Search 생성
    구독당 하나의 Free 리소스 생성 가능

   ![](images/2024-12-13-10-00-21.png)

5. 리소스 그룹에서 생성된 리소스 목록이 다음처럼 보여지면 준비가 된 상태

    ![](images/2024-12-13-14-03-29.png)

6. 생성된 `저장소 계정`에서 `files`라는 컨테이너 생성후 예제파일([풍력발전_오해와_진실.pdf](files/풍력발전_오해와_진실.pdf))
    - 좋은 검색을 위해서 절적한 [청크](https://learn.microsoft.com/ko-kr/azure/search/vector-search-how-to-chunk-documents)가 필요
    - 예제파일은 pdf 뿐만 아니라 docx, pptx 등 가능

    ![](images/2024-12-13-14-05-25.png)

7. AI Search 에서 벡터 데이터 추가

   ![](images/2024-12-13-14-11-43.png)
    - data connection 은 Azure Blob Storage 이고 storage account 를 3단계에서 생성한 이름으로 다음 그림과 같이 설정
    ![](images/2024-12-13-14-13-07.png)
    - 임베딩 모델을 선택 (보이지 않으면 2단계에서 모델 배포 필요)
    ![](images/2024-12-13-15-34-46.png)
    - `Vectorize and enrich your images` 단계는 필요시 설정
    - Review 단계 예시
    ![](images/2024-12-13-15-36-18.png)
    - 완료 후 벡터 검색 테스트 검색어 `소음`
    ![](images/2024-12-13-15-37-27.png)

8. Copilot Studio 에서 테스트를 위한 에이전트 생성

    ![](images/2024-12-13-15-39-25.png)
    - 생성형 오케스트레이션 활성화를 위해 `설정` 에서 `생성형 AI` 에서 Generative(preview) 로 변경
    ![](images/2024-12-13-15-43-30.png)

9. `참조 자료` 메뉴에서 참조자료 추가 `고급` 선택하여 Azure AI Search 선택
    
    ![](images/2024-12-13-15-40-24.png)
    ![](images/2024-12-13-15-41-25.png)

10. 이후 토픽을 추가하여 질문을 하면 다음과 같이 벡터 검색을 통해 응답 (검색이 안되는 경우 7단계부터 재 시도 필요)

    ![](images/2024-12-16-17-03-08.png)

    - 참고 `풍력발전` 토픽의 yaml 코드
        ```yaml
        kind: AdaptiveDialog
        modelDescription: 풍력발전의 역사, 소음, 필요 부지에 대한 답
        beginDialog:
        kind: OnRecognizedIntent
        id: main
        intent: {}
        actions:
            - kind: SearchAndSummarizeContent
            id: Cypahn
            userInput: =System.Activity.Text
            additionalInstructions: |-
                너는 풍력발전에 대한 질문에 답을 할수 있다.
                
                \# 제약사항
                답변은 반드시 한국어로만 해야한다.
            fileSearchDataSource:
                searchFilesMode:
                kind: DoNotSearchFiles

            knowledgeSources:
                kind: SearchSpecificKnowledgeSources
                knowledgeSources:
                - cr687_agentVectorSearchDemo.knowledge.agentvectorsearchdemoAzureAI_rY18gjJhBPlmdzJ8z08vA        
        ```