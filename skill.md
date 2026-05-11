# skill.md

## 문서 운영 규칙
- 이 문서는 일회성 문서가 아니라 작업이 진행될수록 계속 누적되는 기록 문서로 관리한다.
- 매 작업마다 아래 6개 항목을 반드시 갱신한다.
  - 이번 작업 목표
  - 확정된 UX 정책
  - 화면 구조
  - 상태관리 항목
  - localStorage key 설계
  - 다음 작업
- 코드 수정 전에도, 분석/기획 단계 결과를 먼저 이 문서에 반영한다.
- 사용자가 수정 요청을 하면 실제 코드 작업 전에 `작업 계획`을 먼저 기록하고, 작업 완료 직후 `실제 작업 내용`을 반드시 기록한다.
- 계획만 기록하고 끝내지 않으며, 최종 반영 파일과 변경 요지를 작업 로그에 남긴다.

## 이번 작업 목표
- `assets/js/components.jsx`에 몰려 있던 컴포넌트를 섹션/공통/레이아웃 단위로 분리해 유지보수성을 높인다.
- 분리 과정에서 발생한 한글 깨짐과 JSX 오류를 원본 Git 텍스트 기준으로 복구한다.
- 별도 관리용으로 만든 `assets/js/README.md`는 유지하지 않고, 파일 구조와 작업 기록을 이 `skill.md`에 통합한다.
- 프로젝트 섹션 디자인 디벨롭 요청은 파일 구조 정리와 원본 복구를 우선 완료한 뒤 다음 작업으로 이어간다.

## 확정된 UX 정책
- 작업 기록은 `skill.md`에 단일화하고, 별도 README 문서로 중복 관리하지 않는다.
- 한글 깨짐 복구 시 임의 문구를 새로 작성하지 않고, Git 원본 또는 사용자가 제공한 원문을 기준으로 복원한다.
- 현재 프로젝트는 빌드 번들러 없이 `Portfolio.html`에서 Babel script를 순서대로 로드하는 구조를 유지한다.
- JSX 파일 분리는 `import/export` 모듈화가 아니라 전역 컴포넌트 로딩 순서 기반으로 관리한다.
- 01 · Hope 타이틀은 데스크톱 레이아웃에서 1줄 고정(`nowrap`)으로 표시한다.
- 카드 탐색 섹션에서는 페이지 스크롤보다 섹션 내부 카드 전환을 우선한다.
- 카드의 첫/마지막 경계에서만 다음/이전 섹션으로 스크롤 이동을 허용한다.
- 스크롤 이벤트는 콘텐츠 여백 포함 섹션 전체에서 일관되게 캡처되어야 한다.
- 트랙패드 관성(미세 역방향 델타)으로 카드가 되감기지 않도록 방향 전환 로직을 분리한다.
- 휠 전환 정책: 임계치 `28`, 잠금 시간 `380ms`를 기본값으로 사용한다.
- 섹션 고정 시작 정책: `#happiness` 섹션 `top <= window.innerHeight * 0.9` 시점부터 휠 이벤트를 섹션에서 우선 소비한다.
- 카드 진입 애니메이션은 fade-up 단일 계열만 사용하고, 회전/바운스/패럴랙스 추가는 금지한다.
- 순차 등장 순서: `media -> title -> description` 고정.
- hover 효과는 이미지 `scale(1.02 ~ 1.05)` 범위의 미세 확대만 허용한다.
- 섹션 진입 애니메이션은 1회 트리거 방식으로 재생하고, 반복 재생으로 인한 시각적 피로를 줄인다.
- 카드 등장 시작점은 섹션 하단 중앙(bottom-center)으로 고정하고 fan-out 형태로 전개한다.
- 03 섹션 메인 스테이지는 부모 컨테이너 가용 영역을 100% 기준으로 사용한다.

## 화면 구조
- App
  - `main.scroller`
    - `SnapSection#home`
    - `SnapSection#hope`
      - `#hope .section-shell > h2.serif` (CSS 오버라이드: `white-space: nowrap`, `max-width: none`)
    - `SnapSection#trust`
    - `SnapSection#happiness`
      - `SectionShell`
        - `section-shell-body` (wheel capture 영역)
          - `happiness-stage-wrap`
            - 배경 타이포/글로우
            - `happiness-card-layer` (카드 스택)
              - `happiness-card-media` (이미지)
              - `happiness-card-title` (타이틀)
              - `happiness-card-desc` (설명)
            - `happiness-stage-ui` (indicator/guide)
    - `SnapSection#luck`

## 파일 구조
- `assets/js/data.js`: 포트폴리오 데이터와 tweak 기본값
- `assets/js/common/base.jsx`: `Clover`, `LoopTicker` 등 공통 컴포넌트
- `assets/js/sections/hero.jsx`: 첫 화면 Hero
- `assets/js/sections/hope.jsx`: 01 · Hope 자기소개 섹션
- `assets/js/sections/projects.jsx`: 02 · Trust 프로젝트 섹션
- `assets/js/sections/happiness.jsx`: 03 · Happiness 취향/개인 섹션
- `assets/js/sections/luck.jsx`: 04 · Luck Contact 섹션
- `assets/js/layout/shell.jsx`: `SectionShell`, `SnapSection`, reveal hook, `MiniLeaf`
- `assets/js/layout/navigation.jsx`: `TopBar`, `SideNav`
- `assets/js/layout/tweak-panel.jsx`: edit-mode tweak panel
- `assets/js/components.jsx`: 분리 후 호환용 placeholder. 신규 컴포넌트 코드는 위 파일에 작성한다.
- `Portfolio.html`: Babel script 로딩 순서 관리. `data -> common -> sections -> layout -> app.jsx` 순서를 유지한다.

## 상태관리 항목
- 신규 상태 추가 없음 (이번 작업은 파일 구조 분리와 원본 텍스트 복구 중심)
- 전역(App)
  - `tweaks`
  - `tweakOpen`
  - `section`
  - `active`
- 03 · HAPPINESS 섹션
  - `activeCard`
  - `dragging`
  - `hasEntered`
  - `entryMotionActive`
  - `sectionEnterRef` (ref)
  - `pointerStartX` (ref)
  - `pointerDeltaX` (ref)
  - `wheelLockUntil` (ref)
  - `wheelDeltaY` (ref)
  - `lastWheelDirection` (ref)

## localStorage key 설계
- 변경 없음 (신규 key 추가 없음)
- `tweaks-np`
  - 용도: tweak 패널 설정값 저장
  - 저장 주체: `App` (`useEffect`)
  - 기본값 소스: `TWEAK_DEFAULTS`
- 카드 진입 애니메이션 상태는 세션 저장 없이 런타임 상태로만 관리(추가 localStorage key 없음).

## 다음 작업
1. 프로젝트 섹션 카드 회전 동작을 실제 브라우저에서 마우스휠/트랙패드로 수동 확인
2. 프로젝트 섹션 모바일 뷰에서 카드 높이와 텍스트 overflow 여부 확인
3. 반응형 뷰(특히 모바일)에서 Hope 타이틀 1줄 고정 시 overflow 여부 확인
4. 필요 시 모바일 구간만 `white-space: normal` 예외를 미디어쿼리로 분리
5. 수동 검증 (이전 작업)
   - 스크롤 진입 시 순차 등장 체감 확인
   - 초기 진입 시 bottom-center 회전 등장 자연스러운지 확인
   - `happiness-stage-wrap`가 세로 영역을 충분히 채우는지 확인
   - 카드 변경 시 애니메이션 톤 과하지 않은지 확인
   - 트랙패드/마우스휠 동시 확인
6. 필요 시 delay(120/240ms)와 hover scale(1.03) 미세 조정
7. 신규 추가 요소 검증
   - `PageLoader` 2.5초 타이밍이 너무 길거나 짧지 않은지 체감 확인
   - `AVAILABLE FOR WORK` 배지 문구·색상이 브랜드 톤과 맞는지 확인
   - 크레덴셜 스트립 툴 목록(`TOOLS` 상수, `components.jsx` 상단)을 실제 사용 툴 기준으로 업데이트
   - Hope 섹션 세로 높이가 크레덴셜 스트립 추가 후 넘치지 않는지 확인

---

## 작업 로그
### 2026-05-04 (8차) — 프로젝트 섹션 스크롤 락 미작동 원인 확인 및 보강
- 원인 확인: 기존 프로젝트 스크롤 락은 `SectionShell` 내부 `section_shell_body`의 React `onWheelCapture`에만 연결되어 있었다.
- 원인 확인: 휠 이벤트 타깃이 섹션 내부 요소가 아니거나, 브라우저 기본 페이지 스크롤이 먼저 진행되는 경우 프로젝트 섹션이 중앙에 있어도 락 로직이 안정적으로 실행되지 않을 수 있었다.
- 원인 확인: 기존 중앙 판정은 섹션 중심점 오차 기준이어서 실제 snap/관성 스크롤 중 락 진입 타이밍을 놓칠 수 있었다.
- 실제 작업 내용: 프로젝트 섹션에서 `window.addEventListener('wheel', ..., { passive: false, capture: true })`를 사용해 윈도우 캡처 단계에서 휠 이벤트를 먼저 확인하도록 변경했다.
- 실제 작업 내용: 락 판정을 `rect.top <= 25vh && rect.bottom >= 75vh` 기준으로 바꿔 프로젝트 섹션이 화면 중앙권에 들어온 동안 안정적으로 카드 전환 모드가 유지되도록 했다.
- 실제 작업 내용: 중간 카드에서는 `preventDefault`로 페이지 스크롤을 막고, 첫 카드 위 방향/마지막 카드 아래 방향에서는 기존처럼 스크롤 통과를 허용했다.
- 검증: 깨진 문자 패턴 검색 결과 없음.
- 검증: `npm run check` 통과.
- 반영 파일: `assets/js/sections/projects.jsx`, `skill.md`

### 2026-05-04 (7차) — 프로젝트 카드 스크롤 되감김 원인 확인 및 보정
- 원인 확인: 프로젝트 휠 로직이 `wheelDeltaY` 누적값의 부호만 보고 카드 이동 방향을 결정하고 있었다.
- 원인 확인: 트랙패드/마우스휠 관성에서 1번 카드에서 2번 카드로 이동한 직후 반대 방향의 미세 `deltaY` 이벤트가 들어오면 이를 의도적인 위 스크롤로 처리해 2번에서 1번으로 되감기는 문제가 발생할 수 있었다.
- 실제 작업 내용: `lastMoveDirection`, `directionGuardUntil` ref를 추가해 카드 전환 직후 일정 시간 동안 직전 이동 방향과 반대인 관성 이벤트를 무시하도록 보정했다.
- 실제 작업 내용: 기존 첫 카드/마지막 카드 경계에서 스크롤 락을 해제하는 정책은 유지했다.
- 검증: 깨진 문자 패턴 검색 결과 없음.
- 검증: `npm run check` 통과.
- 반영 파일: `assets/js/sections/projects.jsx`, `skill.md`

### 2026-05-04 (6차) — 프로젝트 타이틀 패널 활성 카드 연동 계획
- 작업 전 계획: 프로젝트 카드가 스크롤로 전환될 때 상단 `project_title_panel reveal in` 영역의 텍스트도 현재 활성 프로젝트 기준으로 함께 갱신되도록 보강한다.
- 작업 전 계획: 한글 원문은 수정하지 않고, 기존 `PROJECTS` 데이터의 `tag`, `title` 값을 그대로 사용한다.
- 작업 전 계획: `reveal in`은 섹션 진입용 1회 클래스이므로 제거하지 않고, 패널 내부 콘텐츠에 `key={active}`와 별도 애니메이션 클래스를 적용해 프로젝트 전환마다 텍스트 변경 체감이 나게 한다.
- 작업 전 계획: 수정 대상은 `assets/js/sections/projects.jsx`, `assets/styles.css`, 작업 기록용 `skill.md`로 제한한다.
- 실제 작업 내용: `project_title_panel` 내부에 `project_title_content` 래퍼를 추가하고 `key={active}`를 부여해 활성 프로젝트 변경 시 상단 텍스트 콘텐츠가 다시 렌더링되도록 했다.
- 실제 작업 내용: `project_title_content`에 `projectTitleSwap` 애니메이션을 적용해 카드 전환 시 상단 `tag`, `title` 변경이 시각적으로 드러나게 했다.
- 검증: 깨진 문자 패턴 검색 결과 없음.
- 검증: `npm run check` 통과.
- 반영 파일: `assets/js/sections/projects.jsx`, `assets/styles.css`, `skill.md`

### 2026-05-04 (5차) — 프로젝트 섹션 카드 회전 구조 작업 계획
- 작업 전 계획: 사용자가 제공한 `project.png`의 큰 틀을 기준으로 프로젝트 섹션을 상단 타이틀 패널, 중앙 대형 카드, 하단 클로버 비주얼 구조로 변경한다.
- 작업 전 계획: 한글 원문은 수정하지 않고, 기존 `PROJECTS` 데이터와 기존 버튼 문구를 그대로 사용한다. 기능과 구조, CSS 클래스와 레이아웃만 변경한다.
- 작업 전 계획: 기존 좌측 목록/우측 상세 방식(`trust_rail`, `trust_detail`)을 스크롤 기반 단일 카드 노출 방식으로 변경한다.
- 작업 전 계획: 프로젝트 섹션 중심이 화면 중앙에 오면 휠 이벤트를 섹션 내부에서 소비해 페이지 스크롤을 잠그고, 카드가 우측에서 중앙으로 들어온 뒤 좌측으로 빠지는 회전 전환을 구현한다.
- 작업 전 계획: 첫 카드에서 위로 스크롤하거나 마지막 카드에서 아래로 스크롤할 때는 스크롤 락을 해제해 이전/다음 섹션으로 이동할 수 있게 한다.
- 작업 전 계획: 수정 대상은 `assets/js/sections/projects.jsx`, `assets/styles.css`, 작업 기록용 `skill.md`로 제한한다.
- 실제 작업 내용: `TrustSection`을 기존 목록/상세 레이아웃에서 `project_stage`, `project_title_panel`, `project_card_viewport`, `project_rotate_card`, `project_clover_anchor` 구조로 변경했다.
- 실제 작업 내용: `active`, `stageRef`, `wheelLockUntil`, `wheelDeltaY`를 사용해 프로젝트 섹션 중심 진입 시 휠 스크롤을 카드 전환으로 소비하도록 구현했다.
- 실제 작업 내용: 첫 카드에서 위 방향, 마지막 카드에서 아래 방향 스크롤은 `preventDefault`하지 않아 이전/다음 섹션으로 이동 가능하게 했다.
- 실제 작업 내용: 카드 역할을 `active`, `prev`, `next`, `hidden`으로 나누고, CSS에서 `transform-origin: 50% 100%`로 하단 중심 기준 회전 이동을 적용했다.
- 실제 작업 내용: `project.png`의 큰 틀을 반영해 연한 그린 배경, 코랄 라인 타이틀 패널, 중앙 대형 카드, 하단 클로버 비주얼 스타일을 추가했다.
- 실제 작업 내용: 한글 깨짐 방지를 위해 새로 추가되는 고정 문구는 유니코드 이스케이프 방식으로 표기했고, 프로젝트별 한글 문구는 기존 `PROJECTS` 데이터를 그대로 참조했다.
- 검증: 깨진 문자 패턴 검색 결과 없음.
- 검증: `npm run check` 통과.
- 반영 파일: `assets/js/sections/projects.jsx`, `assets/styles.css`, `skill.md`

### 2026-05-04 (4차) — README 기록 통합 및 단일 문서화
- 작업 전 계획: `assets/js/README.md`에 적어둔 파일 구조 안내를 별도 파일로 관리하지 않고, 누적 작업 문서인 `skill.md`에 통합한다.
- 작업 전 계획: 오늘 진행한 파일 구조 분리, 한글 깨짐 복구, 검증 내용을 순서대로 작업 로그에 남긴다.
- 실제 작업 내용: `skill.md`의 이번 작업 목표, 확정된 UX 정책, 화면 구조, 파일 구조, 상태관리 항목, localStorage key 설계, 다음 작업을 최신 상태로 갱신했다.
- 실제 작업 내용: 별도 README의 파일 구조 설명을 `skill.md`의 `파일 구조` 항목으로 이동했다.
- 반영 파일: `skill.md`

### 2026-05-04 (3차) — 한글 깨짐 및 JSX 오류 원본 복구
- 작업 전 계획: 분리된 JSX 파일에서 깨진 한글과 문법 오류를 검색하고, 임의 문구 작성 없이 Git 원본 `assets/js/components.jsx` 텍스트를 기준으로 재분리한다.
- 실제 작업 내용: `git show HEAD:assets/js/components.jsx`로 정상 한글 원본을 확인했다.
- 실제 작업 내용: `common/base.jsx`, `sections/hope.jsx`, `sections/projects.jsx`, `sections/happiness.jsx`, `sections/luck.jsx`, `sections/hero.jsx`, `layout/shell.jsx`, `layout/tweak-panel.jsx`, `layout/navigation.jsx`를 원본 기준으로 다시 생성했다.
- 실제 작업 내용: 깨진 문자 패턴(`?쨌`, `?꾨`, `?섎`, `쨌`, `??` 등)을 검색해 더 이상 검출되지 않음을 확인했다.
- 실제 작업 내용: `npm run check`를 실행해 기본 npm 스크립트 동작을 확인했다.
- 반영 파일: `assets/js/common/base.jsx`, `assets/js/sections/hope.jsx`, `assets/js/sections/projects.jsx`, `assets/js/sections/happiness.jsx`, `assets/js/sections/luck.jsx`, `assets/js/sections/hero.jsx`, `assets/js/layout/shell.jsx`, `assets/js/layout/tweak-panel.jsx`, `assets/js/layout/navigation.jsx`

### 2026-05-04 (2차) — JS 컴포넌트 섹션별 파일 분리
- 작업 전 계획: 현재 프로젝트가 번들러 없이 `Portfolio.html`에서 Babel script를 직접 읽는 구조이므로 `import/export` 도입 없이 전역 컴포넌트 로딩 순서 기반으로 분리한다.
- 실제 작업 내용: 기존 `assets/js/components.jsx`의 내용을 역할별 파일로 분리했다.
- 실제 작업 내용: 공통 컴포넌트는 `assets/js/common/base.jsx`, 섹션 컴포넌트는 `assets/js/sections/*.jsx`, 레이아웃/내비 컴포넌트는 `assets/js/layout/*.jsx`로 이동했다.
- 실제 작업 내용: `Portfolio.html`에 새 JSX 파일들의 script 태그를 추가해 `data.js` 이후, `app.jsx` 이전에 순서대로 로드되도록 했다.
- 실제 작업 내용: 기존 `assets/js/components.jsx`는 분리 안내용 placeholder로 축소했다.
- 실제 작업 내용: 작업 중 임시로 `assets/js/README.md`를 추가했으나, 이후 사용자 요청에 따라 `skill.md`로 통합하고 삭제하기로 결정했다.
- 반영 파일: `Portfolio.html`, `assets/js/components.jsx`, `assets/js/common/base.jsx`, `assets/js/sections/hope.jsx`, `assets/js/sections/projects.jsx`, `assets/js/sections/happiness.jsx`, `assets/js/sections/luck.jsx`, `assets/js/sections/hero.jsx`, `assets/js/layout/shell.jsx`, `assets/js/layout/tweak-panel.jsx`, `assets/js/layout/navigation.jsx`

### 2026-05-04 (1차) — 프로젝트 섹션 디자인 요청 분석
- 요청: `image 19.png` 기반으로 project 섹션 구조를 잡고, `project.png` 기반으로 디자인을 디벨롭해 반영
- 작업 전 확인: 프로젝트 섹션은 기존 `TrustSection`으로 구현되어 있으며, 프로젝트 데이터는 `assets/js/data.js`의 `PROJECTS` 배열에서 관리됨을 확인했다.
- 작업 전 확인: 기존 프로젝트 섹션은 좌측 프로젝트 목록(`trust_rail`)과 우측 상세 카드(`trust_detail`) 구조로 구성되어 있었다.
- 실제 작업 내용: 상단 타이틀 박스, 큰 콘텐츠 카드, 하단 클로버 비주얼을 반영하는 방향으로 수정 계획을 잡았으나, 이후 사용자가 파일 정리를 우선 요청해 실제 디자인 변경은 진행하지 않았다.
- 다음 연결 작업: 파일 구조 정리와 한글 복구가 완료된 상태에서 `assets/js/sections/projects.jsx`와 `assets/styles.css`를 중심으로 프로젝트 섹션 디자인 디벨롭을 진행한다.

### 2026-04-23 (4차) — 전체 파일 코드 정리
- 작업 전 계획: 기능 동작과 사용자 문구는 유지하고, `app.jsx`, `assets/js/data.js`, `assets/js/components.jsx`를 중심으로 들여쓰기, 배열/객체 포맷, 중복/미사용 코드 같은 가독성 이슈를 정리한다.
- 작업 전 계획: 대규모 구조 변경이나 신규 기능 추가 없이, 현재 동작을 유지하는 범위에서 읽기 쉬운 형태로 코드 스타일을 맞춘다.
- 실제 작업 내용: `app.jsx`의 상태 초기화, `useEffect`, 해시 처리, 스크롤 이동 로직을 읽기 쉬운 블록 형태로 재정렬해 조건문과 반환 구조를 정리했다.
- 실제 작업 내용: `assets/js/data.js`의 `LEAVES`, `PROJECTS`, `HOBBIES` 배열과 객체 들여쓰기를 정리해 데이터 블록 가독성을 높였다.
- 실제 작업 내용: `assets/js/components.jsx`에서 미사용 `useMemo` import와 사용되지 않는 함수 인자/중간 변수를 제거해 경고 가능성과 잡음을 줄였다.
- 반영 파일: `app.jsx`, `assets/js/data.js`, `assets/js/components.jsx`

### 2026-04-23 (3차) — 클래스명 스네이크 표기법 통일
- 작업 전 계획: 사용자에게 보이는 문구와 데이터 텍스트는 유지하고, `assets/js/components.jsx`와 `assets/styles.css`에서 연결된 클래스명과 상태 클래스만 스네이크 표기법으로 일괄 정리한다.
- 작업 전 계획: JSX `className` 값, 동적 클래스 문자열, CSS 선택자를 동일 규칙으로 함께 수정해 스타일 매칭이 끊기지 않도록 맞춘다.
- 실제 작업 내용: `assets/js/components.jsx`의 `className` 값과 동적 상태 클래스에서 하이픈 표기를 언더스코어 표기로 변경했다. 예: `hero_wrap`, `trust_card`, `happiness_card`, `page_loader`.
- 실제 작업 내용: `assets/styles.css`의 대응 선택자도 동일 규칙으로 변경해 JSX와 CSS 매칭을 유지했다. 상태 클래스는 `is_entered`, `is_entry_motion`, `is_disabled`, `has_image`처럼 함께 정리했다.
- 실제 작업 내용: 사용자에게 보이는 본문 문구와 데이터 텍스트는 유지하고, 클래스 식별자에 해당하는 문자열만 수정했다.
- 반영 파일: `assets/js/components.jsx`, `assets/styles.css`

### 2026-04-23 (2차) — Hero 클로버 이미지 인터랙션 제거
- 작업 전 계획: 첫 번째 섹션 Hero의 클로버 이미지에 연결된 인터랙션 범위를 확인하고, 이미지 자체에 붙은 호버·클릭·틸트 반응만 제거한다.
- 작업 전 계획: 좌측 리프 버튼 기반 섹션 이동 구조는 유지하고, 클로버 렌더링 컴포넌트는 정적 표시 상태로 정리한다.
- 실제 작업 내용: `assets/js/components.jsx`의 `Hero`에서 `hero-clover-zone`의 `onMouseMove`, `onMouseLeave`와 `tilt` 상태를 제거해 마우스 추적 인터랙션을 없앴다.
- 실제 작업 내용: `Clover` 호출부에서 `onHover`, `onClick` 전달을 제거해 Hero 클로버 이미지가 직접 반응하지 않도록 정리했다.
- 실제 작업 내용: `CloverPhoto`의 leaf hotspot 버튼들을 삭제했고, `CloverSvg`/`CloverLine`의 hover·click 이벤트와 pointer cursor도 제거해 모든 클로버 모드를 정적 표시로 맞췄다.
- 반영 파일: `assets/js/components.jsx`

### 2026-04-23 (1차) — Hero 클로버 회전 제거
- 작업 전 계획: 첫 번째 섹션 Hero 클로버의 회전 적용 지점을 확인하고, 호버 상태는 유지한 채 회전만 제거한다.
- 실제 작업 내용: `assets/js/components.jsx`의 `Hero`에서 `rotRef`, `prevHoverRef`, `rotationTarget` 관련 회전 계산 로직을 제거했다.
- 실제 작업 내용: `Clover` 호출부의 `rotation` 값을 `0`으로 고정해 클로버가 더 이상 회전하지 않도록 수정했다.
- 반영 파일: `assets/js/components.jsx`

### 2026-04-21 (4차) — 01 · Hope 타이틀 1줄 고정
- 요청: `<SectionShell ... title="경험을 수집하고, 구조화하여, 의사결정으로 연결하는 디자이너">` 문구를 줄바꿈 없이 표시
- 반영: `assets/styles.css`에 `#hope .section-shell > h2.serif { white-space: nowrap; max-width: none !important; }` 추가
- 범위: CSS만 수정, 텍스트/컴포넌트 구조/상태 로직 미변경

### 2026-04-21 (1차)
- 요청: `skill.md`를 누적형 기록 문서로 운영하는 규칙 확정
- 반영: 문서 구조를 6개 고정 항목 중심으로 재편
- 반영: 03 섹션 스크롤 이슈 분석 결과와 수정 계획을 "다음 작업"에 등록
- 반영: 03 섹션 휠 캡처를 `section-shell-body`로 이동, `lastWheelDirection` 상태 머신 추가
- 반영: 경계 스크롤 통과 조건 유지 + 전환값 조정(임계치 `28`, 잠금 `380ms`)
- 반영: `#happiness` 섹션의 `top <= 90vh` 조건 게이트를 휠 핸들러에 추가
- 정리: 카드 섹션 디벨롭 기준(`fade-up/stagger/미세 hover/톤 유지`)을 구현 방향으로 문서화
- 반영: `hasEntered + IntersectionObserver`로 섹션 진입 1회 트리거 구현
- 반영: 카드 내부 순서를 `media -> title -> desc`로 구성하고 stagger fade-up 적용
- 반영: hover 시 이미지 `scale(1.03)` 미세 확대 적용
- 반영: 카드 기본 상태를 bottom-center 비노출로 두고, 회전 fan-out 등장 모션 추가
- 반영: `happiness-stage-wrap`와 래퍼에 `width/height: 100%` 적용, 카드 레이어도 `flex:1`로 확장

### 2026-04-21 (3차) — 카드 등장 트리거 스크롤 드리븐 방식으로 전환

**요청 내용**
- 섹션 wrap이 화면에 100% 등장한 뒤 멈춤 → 스크롤 시 하단 센터 기준 카드 등장

**상태 머신 변경**
- 기존: `hasEntered(bool)` + IntersectionObserver threshold 0.35 → 자동 등장
- 변경: `phase: 'idle' | 'entering' | 'active'` 3단계 상태 머신

| phase | 조건 | 동작 |
|---|---|---|
| `idle` | 섹션 진입 전·진입 직후 | 카드 화면 밖(하단) 대기, 가이드 텍스트 "스크롤하면 카드가 등장합니다" |
| `entering` | 첫 스크롤 다운 감지 | 카드 하단→센터 등장 애니메이션, 스크롤 블록 (820ms) |
| `active` | 애니메이션 완료 후 | 기존 카드 탐색 (휠/드래그) |

**섹션 100% 진입 감지 방법**
- `rect.top < 8px && rect.bottom >= innerHeight - 8px` (snap 완료 기준)
- IntersectionObserver 제거, 휠 핸들러 내에서 직접 계산

**CSS 변경**
- 카드 초기 위치: `top: 90%` → `top: 112%` (컨테이너 완전히 아래, overflow:hidden으로 클리핑)
- 초기 rotate: 각도 유지 → `0deg` (바텀 센터에서 수직 상승 강조)
- 초기 scale: `.82` → `.88`
- 전환 duration: `700ms` → `750ms`, `is-entry-motion` 시 `820ms`

**수정 파일**
- `assets/js/components.jsx`: `HappinessSection` 전체 재작성
- `assets/styles.css`: `.happiness-card` 초기 위치/scale, `.is-entry-motion` duration

### 2026-04-21 (2차) — ethicallifeworld.com 레퍼런스 반영
**참조 사이트 분석 요약**
- 사이트: https://ethicallifeworld.com/
- 주요 패턴: 필름스트립 로딩 시퀀스 / 긴급성 배너(FREE DELIVERY) / 신뢰 크레덴셜 블록(Pharmacist Formulated) / 인피니티 티커 / 회전 캐러셀

**반영 항목**

1. `PageLoader` 컴포넌트 신규 추가 (`components.jsx` 상단)
   - "SEULGI" 6글자가 한 글자씩 아래에서 위로 fade-in (85ms 간격 stagger)
   - 클로버 녹색(`--clover`) 진행 바 1.7초 fill 애니메이션
   - 1.9초 후 exit 클래스 적용 → 2.5초에 `onDone()` 호출, 메인 화면 등장
   - `app.jsx`: `loaded` state 추가, `!loaded && <PageLoader onDone=...>` 조건부 렌더

2. `hero-available` 배지 추가 (`components.jsx` → `Hero` 컴포넌트)
   - 위치: `hero-kicker` 바로 위
   - 초록 점(pulse 애니메이션) + "AVAILABLE FOR WORK" 모노 텍스트
   - 스타일: 반투명 녹색 pill, border `rgba(111,184,96,.38)`

3. 크레덴셜 스트립 추가 (`components.jsx` → `HopeSection` 컴포넌트)
   - `TOOLS` 상수: `['Figma','FigJam','Notion','Zeplin','Miro','Jira','Framer','HTML/CSS','After Effects']`
   - "VERIFIED SKILLS" 뱃지 + "TOOLS & METHODS" 라벨 헤더
   - pill hover: border-color → `--clover`, bg → `--sage`

**수정 파일 목록**
| 파일 | 변경 내용 |
|---|---|
| `assets/styles.css` | `.page-loader` / `.hero-available` / `.credential-strip` 스타일 블록 추가 |
| `assets/js/components.jsx` | `PageLoader` 컴포넌트 추가, `Hero`에 배지 삽입, `HopeSection`에 크레덴셜 스트립 삽입 |
| `app.jsx` | `loaded` state 추가, `PageLoader` 조건부 렌더 |

### 2026-05-11 — 프로젝트 이미지 크기 축소
- 요청: 프로젝트 카드 안의 이미지가 너무 커 보여 절반 크기로 줄이기.
- 작업 전 확인: 프로젝트 이미지는 `assets/js/sections/projects.jsx`에서 `project_card_media`로 렌더링되고, 실제 크기는 `assets/styles.css`의 `.project_card_media`가 제어함.
- 실제 작업 내용: `.project_card_media`의 폭을 `min(400px, 50%)`에서 `min(200px, 25%)`로 줄여 표시 크기를 절반 수준으로 조정했다.
- 실제 작업 내용: 이미지가 작아진 비율에 맞춰 상단 여백을 `clamp(20px, 3vh, 34px)`에서 `clamp(16px, 2vh, 24px)`로 줄였다.
- 반영 파일: `assets/styles.css`, `skill.md`

### 2026-05-11 — 프로젝트 이미지 크기 1.5배 확대
- 요청: 절반으로 줄인 프로젝트 이미지를 다시 1.5배 키우기.
- 실제 작업 내용: `.project_card_media`의 폭을 `min(200px, 25%)`에서 `min(300px, 37.5%)`로 변경했다.
- 반영 파일: `assets/styles.css`, `skill.md`

### 2026-05-11 — 프로젝트 섹션 스크롤 브레이크 안정화
- 요청: 프로젝트 섹션에서 스크롤 브레이크가 제대로 걸리지 않는 원인 확인 후 수정.
- 작업 전 확인: 기존 잠금 조건 `rect.top <= window.innerHeight * 0.2 && rect.bottom >= window.innerHeight * 0.9`는 100vh 섹션 기준으로 동작 구간이 좁아 빠른 휠 스크롤에서 통과될 수 있었다.
- 실제 작업 내용: 프로젝트 섹션 잠금 조건을 `rect.top <= window.innerHeight * 0.08 && rect.bottom >= window.innerHeight * 0.25`로 조정해 섹션 top이 화면 상단에 가까워졌을 때부터 더 안정적으로 wheel 이벤트를 잡도록 했다.
- 실제 작업 내용: `.scroller`의 `scroll-snap-type`을 `y proximity`에서 `y mandatory`로 변경해 섹션 도착 위치가 더 일관되게 맞춰지도록 했다.
- 반영 파일: `assets/js/sections/projects.jsx`, `assets/styles.css`, `skill.md`

### 2026-05-11 — 인트로 로딩 장면 삭제
- 요청: 사이트 진입 시 표시되는 인트로 장면 삭제.
- 작업 전 확인: 인트로는 `app.jsx`의 `loaded` 상태와 `<PageLoader />` 조건부 렌더링으로 표시되고, 컴포넌트는 `assets/js/common/base.jsx`, 스타일은 `assets/styles.css`의 `.page_loader` 계열 선택자에서 관리되고 있었다.
- 실제 작업 내용: `app.jsx`에서 `loaded` 상태와 `<PageLoader />` 렌더링을 제거해 첫 진입 시 바로 본문이 보이도록 했다.
- 실제 작업 내용: 사용하지 않는 `PageLoader` 컴포넌트와 `.page_loader` 관련 CSS, `loaderChIn`, `loaderFill` 키프레임을 삭제했다.
- 반영 파일: `app.jsx`, `assets/js/common/base.jsx`, `assets/styles.css`, `skill.md`

### 2026-05-11 — 프로젝트 wheel effect 의존성 경고 정리
- 요청: `assets/js/sections/projects.jsx` 67번째 줄의 빨간줄 원인 수정.
- 작업 전 확인: `useEffect` 내부에서 외부 함수 `onProjectWheel`을 참조하면서 dependency 배열에는 `active`만 들어 있어 React Hook 의존성 경고가 발생할 수 있었다.
- 실제 작업 내용: `onProjectWheel`과 잠금 판정 함수 `isProjectSectionLocked`를 `useEffect` 내부로 옮겨 effect 의존성을 `active`로 명확하게 정리했다.
- 실제 작업 내용: 기존 `clampProject` 헬퍼 사용을 effect 내부의 `Math.max/Math.min` 계산으로 대체해 외부 함수 의존성을 없앴다.
- 반영 파일: `assets/js/sections/projects.jsx`, `skill.md`
