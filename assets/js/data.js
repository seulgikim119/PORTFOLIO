/* =======================================================
   DATA + DEFAULTS
   ======================================================= */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cloverMode": "photo",
  "accentColor": "#6FB860",
  "showGrain": true
} /*EDITMODE-END*/;

/* =======================================================
   DATA
   ======================================================= */
const LEAVES = [
  {
    key: "hope",
    label: "Hope",
    ko: "자기소개",
    sub: "문제를 다르게 바라보는 디자이너",
    angle: -45, // top-left
    hue: "#7EC36E"
  },
  {
    key: "trust",
    label: "Trust",
    ko: "프로젝트",
    sub: "실제 문제 해결 이력",
    angle: 45, // top-right
    hue: "#6FB860"
  },
  {
    key: "happiness",
    label: "Happiness",
    ko: "취향·개인",
    sub: "관찰력과 감성의 시선",
    angle: 135, // bottom-right
    hue: "#5CA84E"
  },
  {
    key: "luck",
    label: "Luck",
    ko: "Contact",
    sub: "연결 그리고 작업 제안",
    angle: -135, // bottom-left
    hue: "#8ECB7F"
  }
];

const PROJECTS = [
  {
    title: "FNC 엔터테인먼트 웹사이트 리뉴얼",
    tag: "개인 프로젝트, Web, #UI/UX",
    siteUrl: "https://seulgikim119.github.io/fncent//",
    problem: "첫 화면에서 브랜드 핵심과 주요 콘텐츠가 빠르게 전달되지 않아 탐색 동선이 길어지는 문제가 있었습니다.",
    hypothesis: "첫 화면에서 브랜드 경험과 핵심 콘텐츠를 동시에 노출하면 사용자의 탐색 피로를 줄이고 체류 및 전환을 높일 수 있다고 판단했습니다.",
    solution: "브랜드 메시지와 콘텐츠 발견 흐름을 통합한 정보구조로 재설계했습니다.",
    work: "기여도 100%"
  },
  {
    title: "MMCA 글로벌 웹사이트 리뉴얼",
    tag: "팀 프로젝트, Web, 반응형, #UI/UX",
    siteUrl: "https://angbaebultti.github.io/mmca/",
    problem: "전시 콘텐츠의 관심이 실제 방문 행동으로 이어지지 않는 단절이 있었습니다.",
    hypothesis: "전시 정보와 방문/예약 흐름을 자연스럽게 연결하면 탐색이 쉬워지고 방문 전환율이 개선될 것으로 보았습니다.",
    solution: "전시 중심 정보구조와 방문 유도 CTA를 결합해 탐색 흐름을 단순화했습니다.",
    work: "PM, 기획, 주요 페이지 설계 및 반응형 구현"
  },
  {
    title: "여행 동행 앱 기획 및 디자인",
    tag: "App, 개인 프로젝트, #UI/UX",
    siteUrl: "#",
    problem: "여행 일정 탐색과 동행 매칭 과정이 분절되어 사용자가 피로를 느끼는 문제가 있었습니다.",
    hypothesis: "일정 추천과 매칭 과정을 하나의 흐름으로 통합하면 탐색 부담을 줄일 수 있다고 보았습니다.",
    solution: "핵심 액션 중심 IA와 리뷰/요약 모듈로 의사결정 시간을 단축했습니다.",
    work: "기여도 100%"
  },
  {
    title: "준비 중인 프로젝트",
    tag: "App",
    siteUrl: "#",
    problem: "",
    hypothesis: "",
    solution: "",
    work: ""
  }
];

const HOBBIES = [
  {
    title: "Escape Room Lover",
    note: "문제를 단계적으로 풀어나가며 함께 탈출함으로써 성취감을 느낍니다",
    imageUrl: "",
    imageAlt: "Escape Room Lover",
    location: "Seoul, KR",
    tone: "light"
  },
  {
    title: "Traveler",
    note: "새로운 곳으로 떠나 새로운 경험을하며 식견을 넓혀나갑니다.",
    imageUrl: "",
    imageAlt: "Travel Observer",
    location: "Seoul, KR",
    tone: "lime"
  },
  {
    title: "Take a photo",
    note: "찰나의 기록",
    imageUrl: "",
    imageAlt: "Street Photographer",
    location: "Gachang, KR",
    tone: "light"
  }
];
