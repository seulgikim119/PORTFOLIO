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
    angle: -45, // 0deg / top
    hue: "#7EC36E"
  },
  {
    key: "trust",
    label: "Trust",
    ko: "프로젝트",
    sub: "실제 문제 해결 이력",
    angle: 45, // 90deg / right
    hue: "#6FB860"
  },
  {
    key: "happiness",
    label: "Happiness",
    ko: "취향·개인",
    sub: "",
    angle: 135, // 180deg / bottom
    hue: "#5CA84E"
  },
  {
    key: "luck",
    label: "Luck",
    ko: "Contact",
    sub: "연결 그리고 작업 제안",
    angle: -135, // 270deg / left
    hue: "#8ECB7F"
  }
];

const PROJECTS = [
  {
    title: "FNC 엔터테인먼트 웹사이트 리뉴얼",
    tag: "개인 프로젝트, Web, #UI/UX",
    siteUrl: "https://seulgikim119.github.io/fncent//",
    planUrl: "#",
    problem: "아티스트 정보 및 관련 정보들이 메인페이지에 드러나 펼쳐져 있어 누가 지금 핫한지 한눈에 안 들어고, CTA(특히 View Artist) 중심의 전환 흐름이 약하여 PR로 이어지지 않고 있어 .",
    hypothesis: "첫 화면에서 엔터테인먼트의 PR포인트와 핵심 콘텐츠를 동시에 노출하면 사용자의 탐색 피로를 줄이고 체류 및 전환을 높일 수 있을 것이라 생각하고 리뉴얼을 진행하게 되었습니다.",
    solution: "히어로를 ‘최신 활동’ 중심으로 설계하여 탐색의 흥미를 높히고, Media 섹션을 유튜브 영상으로 바로 이동 할 수 있어 클릭 몇 번안에 역량을 판단 할 수 있게 유도하였습니다. ",
    work: "기여도 100%",
    imageUrl: "",
    imageAlt: "FNC 엔터테인먼트 웹사이트 리뉴얼 이미지"
  },
  {
    title: "MMCA 글로벌 웹사이트 리뉴얼",
    tag: "팀 프로젝트, Web, 반응형, #UI/UX",
    siteUrl: "https://angbaebultti.github.io/mmca/",
    planUrl: "https://www.figma.com/deck/FVvLaHkuYTIkOaV17pe2VF/-%ED%8C%80%ED%94%8C1-3%EC%A1%B0--%EA%B2%B0%EA%B3%BC%EB%B3%B4%EA%B3%A0%EC%84%9C_MMCA--Izoa%EC%A1%B0---%EB%B3%B5%EC%82%AC---%EB%B3%B5%EC%82%AC-?node-id=12016-84&viewport=-236%2C-239%2C1.06&t=UdHnOugXlQbCuwJ8-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
    problem: "기존 사이트는 기관 중심 구조로 되어 있어 사용자가 현재 전시, 방문 정보, 예약 흐름을 한 번에 이해하기 어려웠으며 특히 해외 사용자의 경우 번역과 정보 구조 문제로 인해 전시를 발견하더라도 실제 방문까지 이어지지 않는 경우가 많다고 생각했습니다.",
    hypothesis: "사용자 유형을 빠르게 방문을 결정하는 사용자와 전시를 깊게 탐색하는 사용자로 나누어 분석하여 이를 바탕으로 전시 발견 → 전시 이해 → 방문 판단 → 예약흐름을 중심으로 UX를 재설계했습니다",
    solution: "전시 중심 정보구조와 방문 유도 CTA를 결합해 탐색 흐름을 단순화했습니다.",
    work: "PM, 기획, 인트로페이지 구현, 방문정보페이지 설계 및 반응형 구현",
    imageUrl: "assets/projects/mmca.png",
    imageAlt: "MMCA 글로벌 웹사이트 리뉴얼 이미지"
  },
  {
    title: "여행 계획 앱 잇담(It-Dam)기획 및 디자인",
    tag: "App, 개인 프로젝트, UI/UX, 여행계획",
    siteUrl: "https://itdam-travel.vercel.app/?_vercel_share=YgY6T1r5VTmf01yl3wEm2HrqY94BpTNU",
    planUrl: "#",
    problem: "여행 일정 탐색과 동행 매칭 과정이 분절되어 사용자가 피로를 느끼는 문제가 있었습니다.",
    hypothesis: "일정 추천과 매칭 과정을 하나의 흐름으로 통합하면 탐색 부담을 줄일 수 있다고 보았습니다.",
    solution: "핵심 액션 중심 IA와 리뷰/요약 모듈로 의사결정 시간을 단축했습니다.",
    work: "기여도 100%",
    imageUrl: "",
    imageAlt: "여행 동행 앱 기획 및 디자인 이미지"
  },
  {
    title: "주류 페어링 AI챗봇 주합(酒合) 기획",
    tag: "App, 팀프로젝트, 기획, 주류추천, 페어링" ,
    siteUrl: "#",
    planUrl: "#",
    problem: "주류 소비는 ‘많이 마시는 시장’에서 ‘잘 고르는 시장’으로 변화하고 있지만 사용자들은 여전히 자신의 취향과 상황에 맞는 주류를 고르기 어려워하는 문제점이 있다고 생각하였습니다.",
    hypothesis: "",
    solution: "",
    work: "",
    imageUrl: "",
    imageAlt: "주류 페어링 AI챗봇 기획 이미지"
  }
];

const HOBBIES = [
  {
    title: "Escape Room Lover",
    imageUrl: "assets/hobboes/escape-room-lover.jpg",
    imageAlt: "Escape Room Lover",
    location: "Seoul, KR",
    tone: "light"
  },
  {
    title: "Traveler",
    imageUrl: "",
    imageAlt: "Travel Observer",
    location: "Seoul, KR",
    tone: "lime"
  },
  {
    title: "Take a photo",
    imageUrl: "",
    imageAlt: "Street Photographer",
    location: "Gachang, KR",
    tone: "light"
  }
];
