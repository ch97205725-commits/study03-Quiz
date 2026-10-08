// 문항 데이터만 담는다. 형식은 PRD 3.3절.
// answer 는 choices 안 정답의 인덱스(0~3).
const QUESTIONS = [
  // ── 한국사 ─────────────────────────────────────────
  {
    id: "kh-01",
    category: "한국사",
    question: "한글(훈민정음)을 만든 조선의 왕은?",
    choices: ["세종", "태종", "세조", "성종"],
    answer: 0,
    explanation: "세종(재위 1419~1450)은 한국어를 적는 표음 문자 한글을 만든 왕으로 가장 잘 알려져 있다.",
    source: { name: "Britannica - Sejong", url: "https://www.britannica.com/print/article/533032" }
  },
  {
    id: "kh-02",
    category: "한국사",
    question: "918년에 고려를 세운 인물은?",
    choices: ["궁예", "왕건", "견훤", "이성계"],
    answer: 1,
    explanation: "왕건(태조)은 918년 궁예의 후고구려를 무너뜨리고 나라 이름을 고려로 바꾸어 고려를 세웠다.",
    source: { name: "Britannica - Wang Kon", url: "https://www.britannica.com/biography/Wang-Kon" }
  },
  {
    id: "kh-03",
    category: "한국사",
    question: "삼국 가운데 668년에 한반도를 통일한 나라는?",
    choices: ["고구려", "백제", "신라", "가야"],
    answer: 2,
    explanation: "신라는 668년 한반도를 통일해 통일 신라(668~935)를 열었다.",
    source: { name: "Britannica - Silla", url: "https://www.britannica.com/place/Silla" }
  },
  {
    id: "kh-04",
    category: "한국사",
    question: "1392년에 조선을 건국하고 첫 번째 왕이 된 인물은?",
    choices: ["왕건", "이방원", "정몽주", "이성계"],
    answer: 3,
    explanation: "조선(1392~1910)은 이성계가 세웠고, 수도를 한양(지금의 서울)에 두었다.",
    source: { name: "Britannica - Joseon dynasty", url: "https://www.britannica.com/topic/Joseon-dynasty" }
  },
  {
    id: "kh-05",
    category: "한국사",
    question: "1590년대 임진왜란 때 수군을 이끌고 일본의 침략을 물리친 조선의 장군은?",
    choices: ["이순신", "강감찬", "을지문덕", "계백"],
    answer: 0,
    explanation: "이순신은 해전 승리로 1590년대 일본의 침략을 막아 낸 조선의 수군 장군이자 국민 영웅이다.",
    source: { name: "Britannica - Yi Sun-shin", url: "https://www.britannica.com/biography/Yi-Sun-shin" }
  },
  {
    id: "kh-06",
    category: "한국사",
    question: "일제 강점기에 서울에서 시작되어 전국으로 퍼진 3·1 운동이 일어난 해는?",
    choices: ["1910년", "1919년", "1926년", "1945년"],
    answer: 1,
    explanation: "3·1 운동은 1919년 3월 1일 서울에서 시작되어 전국으로 퍼진 독립 만세 시위다.",
    source: { name: "Britannica - March First Movement", url: "https://www.britannica.com/print/article/364173" }
  },
  {
    id: "kh-07",
    category: "한국사",
    question: "북한의 남침으로 6·25 전쟁이 시작된 해는?",
    choices: ["1945년", "1948년", "1950년", "1953년"],
    answer: 2,
    explanation: "6·25 전쟁은 1950년 6월 북한이 남한을 침공하면서 국제전으로 커졌다(1950~1953).",
    source: { name: "Britannica - Korean War", url: "https://www.britannica.com/event/Korean-War" }
  },
  {
    id: "kh-08",
    category: "한국사",
    question: "팔만대장경(고려대장경) 목판을 보관하는 장경판전이 있는 절은?",
    choices: ["불국사", "통도사", "송광사", "해인사"],
    answer: 3,
    explanation: "가야산 해인사의 장경판전은 1237~1248년에 새긴 8만여 장의 대장경 목판을 보관하려고 지었다.",
    source: { name: "UNESCO 세계유산 - Haeinsa Temple Janggyeong Panjeon", url: "https://whc.unesco.org/en/list/737" }
  },
  {
    id: "kh-09",
    category: "한국사",
    question: "아버지의 무덤을 수원으로 옮기고 그 둘레에 수원 화성을 쌓은 조선의 왕은?",
    choices: ["정조", "영조", "숙종", "순조"],
    answer: 0,
    explanation: "정조는 18세기 말 아버지의 무덤을 수원으로 옮기고 그 둘레에 화성을 쌓았다.",
    source: { name: "UNESCO 세계유산 - Hwaseong Fortress", url: "https://whc.unesco.org/en/list/817" }
  },
  {
    id: "kh-10",
    category: "한국사",
    question: "조선 역대 왕과 왕비의 신주를 모신 유교 사당은?",
    choices: ["경복궁", "종묘", "창덕궁", "덕수궁"],
    answer: 1,
    explanation: "종묘는 조선 왕과 왕비의 신주를 모신 사당으로, 지금도 제례 의식이 이어진다.",
    source: { name: "UNESCO 세계유산 - Jongmyo Shrine", url: "https://whc.unesco.org/en/list/738" }
  },

  // ── 세계지리 ───────────────────────────────────────
  {
    id: "wg-01",
    category: "세계지리",
    question: "면적 기준으로 세계에서 가장 큰 나라는? (2024년 기준)",
    choices: ["캐나다", "중국", "러시아", "미국"],
    answer: 2,
    explanation: "러시아는 압도적으로 큰 나라로, 두 번째로 큰 캐나다의 거의 두 배 면적이다.",
    source: { name: "Britannica - Russia", url: "https://www.britannica.com/place/Russia" }
  },
  {
    id: "wg-02",
    category: "세계지리",
    question: "오스트레일리아(호주)의 수도는?",
    choices: ["시드니", "멜버른", "퍼스", "캔버라"],
    answer: 3,
    explanation: "캔버라는 오스트레일리아 연방의 수도로, 오스트레일리아 수도 특별 지역(ACT)에 있다.",
    source: { name: "Britannica - Canberra", url: "https://www.britannica.com/place/Canberra" }
  },
  {
    id: "wg-03",
    category: "세계지리",
    question: "해발고도 기준으로 세계에서 가장 높은 산은? (2024년 기준)",
    choices: ["에베레스트산", "K2", "칸첸중가", "마칼루"],
    answer: 0,
    explanation: "에베레스트산은 높이 8,849m로 세계에서 가장 높은 산이며, 네팔과 중국 국경에 있다.",
    source: { name: "Britannica - Mount Everest", url: "https://www.britannica.com/place/Mount-Everest" }
  },
  {
    id: "wg-04",
    category: "세계지리",
    question: "캐나다의 수도는?",
    choices: ["토론토", "오타와", "밴쿠버", "몬트리올"],
    answer: 1,
    explanation: "오타와는 캐나다의 수도로, 빅토리아 여왕이 수도로 정했다.",
    source: { name: "Britannica - Ottawa", url: "https://www.britannica.com/place/Ottawa" }
  },
  {
    id: "wg-05",
    category: "세계지리",
    question: "면적 기준으로 세계에서 가장 큰 대양은? (2024년 기준)",
    choices: ["대서양", "인도양", "태평양", "북극해"],
    answer: 2,
    explanation: "태평양은 3대 대양 가운데 단연 가장 크며, 지구 표면의 약 3분의 1을 차지한다.",
    source: { name: "Britannica - Pacific Ocean", url: "https://www.britannica.com/place/Pacific-Ocean" }
  },
  {
    id: "wg-06",
    category: "세계지리",
    question: "지중해로 흘러드는 나일강의 하구 삼각주가 있는 나라는?",
    choices: ["수단", "에티오피아", "우간다", "이집트"],
    answer: 3,
    explanation: "나일강은 북쪽으로 흘러 이집트 카이로 북쪽에서 삼각주를 이루고 지중해로 들어간다.",
    source: { name: "Britannica - Nile River", url: "https://www.britannica.com/place/Nile-River" }
  },
  {
    id: "wg-07",
    category: "세계지리",
    question: "브라질 전역에서 쓰이는 주된 언어는?",
    choices: ["포르투갈어", "스페인어", "영어", "프랑스어"],
    answer: 0,
    explanation: "브라질은 전국에서 포르투갈어를 쓰며, 아마존 오지의 일부 원주민 공동체는 원주민 언어도 쓴다.",
    source: { name: "Britannica - Brazil", url: "https://www.britannica.com/place/Brazil" }
  },
  {
    id: "wg-08",
    category: "세계지리",
    question: "러시아 중서부를 남북으로 가로지르며 유럽과 아시아의 전통적 경계를 이루는 산맥은?",
    choices: ["알프스산맥", "우랄산맥", "피레네산맥", "애팔래치아산맥"],
    answer: 1,
    explanation: "우랄산맥은 러시아 중서부에 있으며 유럽과 아시아를 나누는 전통적 경계의 대부분을 이룬다.",
    source: { name: "Britannica - Ural Mountains", url: "https://www.britannica.com/place/Ural-Mountains" }
  },
  {
    id: "wg-09",
    category: "세계지리",
    question: "대륙을 제외하고, 면적 기준으로 세계에서 가장 큰 섬은? (2024년 기준)",
    choices: ["뉴기니섬", "보르네오섬", "그린란드", "마다가스카르섬"],
    answer: 2,
    explanation: "그린란드는 북대서양에 있는 세계에서 가장 큰 섬이다.",
    source: { name: "Britannica - Greenland", url: "https://www.britannica.com/place/Greenland" }
  },
  {
    id: "wg-10",
    category: "세계지리",
    question: "튀르키예(터키)의 수도는?",
    choices: ["이스탄불", "이즈미르", "안탈리아", "앙카라"],
    answer: 3,
    explanation: "앙카라는 튀르키예의 수도다. 가장 큰 도시인 이스탄불은 수도가 아니다.",
    source: { name: "Britannica - Ankara", url: "https://www.britannica.com/place/Ankara" }
  },

  // ── 과학 ───────────────────────────────────────────
  {
    id: "sc-01",
    category: "과학",
    question: "태양계 행성 8개 가운데 태양과의 평균 거리 기준으로 태양에 가장 가까운 행성은? (2024년 기준)",
    choices: ["수성", "금성", "지구", "화성"],
    answer: 0,
    explanation: "수성은 태양에 가장 가까운 행성이자 태양계에서 가장 작은 행성이다.",
    source: { name: "NASA Science - Mercury", url: "https://science.nasa.gov/mercury/" }
  },
  {
    id: "sc-02",
    category: "과학",
    question: "태양계 행성 8개 가운데 질량 기준으로 가장 큰 행성은? (2024년 기준)",
    choices: ["토성", "목성", "천왕성", "해왕성"],
    answer: 1,
    explanation: "목성은 태양계에서 가장 큰 행성으로, 질량이 나머지 행성을 모두 합한 것의 두 배가 넘는다.",
    source: { name: "NASA Science - Jupiter", url: "https://science.nasa.gov/jupiter/" }
  },
  {
    id: "sc-03",
    category: "과학",
    question: "물(H₂O)을 이루는 두 원소는?",
    choices: ["수소와 질소", "탄소와 산소", "수소와 산소", "산소와 질소"],
    answer: 2,
    explanation: "물은 수소와 산소 두 원소로 이루어진 화합물이다.",
    source: { name: "Britannica - Water", url: "https://www.britannica.com/science/water" }
  },
  {
    id: "sc-04",
    category: "과학",
    question: "원소 기호가 Fe인 원소는?",
    choices: ["불소", "금", "납", "철"],
    answer: 3,
    explanation: "Fe는 철(라틴어 ferrum)의 원소 기호로, 철은 주기율표 8족 금속이다.",
    source: { name: "Britannica - Iron", url: "https://www.britannica.com/science/iron-chemical-element" }
  },
  {
    id: "sc-05",
    category: "과학",
    question: "광합성에서 식물이 물과 함께 재료로 쓰는 기체는?",
    choices: ["이산화탄소", "산소", "질소", "수소"],
    answer: 0,
    explanation: "광합성은 빛에너지로 물과 이산화탄소를 산소와 유기 화합물로 바꾸는 과정이다.",
    source: { name: "Britannica - Photosynthesis", url: "https://www.britannica.com/science/photosynthesis" }
  },
  {
    id: "sc-06",
    category: "과학",
    question: "척추동물의 적혈구 안에서 조직으로 산소를 운반하는 철 함유 단백질은?",
    choices: ["인슐린", "헤모글로빈", "케라틴", "콜라겐"],
    answer: 1,
    explanation: "헤모글로빈은 적혈구 안에 있는 철 함유 단백질로, 산소를 조직으로 나른다.",
    source: { name: "Britannica - Hemoglobin", url: "https://www.britannica.com/science/hemoglobin" }
  },
  {
    id: "sc-07",
    category: "과학",
    question: "진공에서 빛의 속력에 가장 가까운 값은?",
    choices: ["초속 약 340m", "초속 약 3만 km", "초속 약 30만 km", "초속 약 300만 km"],
    answer: 2,
    explanation: "진공에서 빛의 속력은 정확히 초속 299,792,458m(약 30만 km)로 정의되어 있다.",
    source: { name: "Britannica - Speed of light", url: "https://www.britannica.com/science/speed-of-light" }
  },
  {
    id: "sc-08",
    category: "과학",
    question: "1905년에 특수 상대성 이론을 발표한 과학자는?",
    choices: ["아이작 뉴턴", "닐스 보어", "갈릴레오 갈릴레이", "알베르트 아인슈타인"],
    answer: 3,
    explanation: "아인슈타인은 1905년 '기적의 해'에 특수 상대성 이론 논문을 발표했다.",
    source: { name: "Britannica - Albert Einstein", url: "https://www.britannica.com/biography/Albert-Einstein" }
  },
  {
    id: "sc-09",
    category: "과학",
    question: "항생 물질 페니실린을 발견한 스코틀랜드의 세균학자는?",
    choices: ["알렉산더 플레밍", "루이 파스퇴르", "로베르트 코흐", "에드워드 제너"],
    answer: 0,
    explanation: "알렉산더 플레밍은 페니실린 발견으로 가장 잘 알려진 스코틀랜드의 세균학자다.",
    source: { name: "Britannica - Alexander Fleming", url: "https://www.britannica.com/biography/Alexander-Fleming" }
  },
  {
    id: "sc-10",
    category: "과학",
    question: "지표 근처 지구 대기에서 부피 기준으로 가장 많은 기체는? (2024년 기준)",
    choices: ["산소", "질소", "아르곤", "이산화탄소"],
    answer: 1,
    explanation: "지표 근처 지구 대기는 질소 78%, 산소 21%, 아르곤 등 기타 기체 1%로 이루어져 있다.",
    source: { name: "NASA Science - Facts About Earth", url: "https://science.nasa.gov/earth/facts/" }
  },

  // ── 예술과 문화 ────────────────────────────────────
  {
    id: "ac-01",
    category: "예술과 문화",
    question: "루브르 박물관에 있는 그림 「모나리자」를 그린 화가는?",
    choices: ["미켈란젤로", "라파엘로", "레오나르도 다빈치", "산드로 보티첼리"],
    answer: 2,
    explanation: "「모나리자」는 레오나르도 다빈치가 1503~1519년에 그린 유화로, 파리 루브르 박물관에 있다.",
    source: { name: "Britannica - Mona Lisa", url: "https://www.britannica.com/topic/Mona-Lisa-painting" }
  },
  {
    id: "ac-02",
    category: "예술과 문화",
    question: "「별이 빛나는 밤」(1889)과 「해바라기」(1888)를 그린 화가는?",
    choices: ["클로드 모네", "폴 세잔", "에두아르 마네", "빈센트 반 고흐"],
    answer: 3,
    explanation: "「해바라기」(1888)와 「별이 빛나는 밤」(1889)은 모두 빈센트 반 고흐의 유화다.",
    source: { name: "Britannica - Vincent van Gogh", url: "https://www.britannica.com/biography/Vincent-van-Gogh" }
  },
  {
    id: "ac-03",
    category: "예술과 문화",
    question: "교향곡에 성악(합창)을 결합한 「교향곡 제9번」을 작곡한 사람은?",
    choices: ["루트비히 판 베토벤", "볼프강 아마데우스 모차르트", "요제프 하이든", "요한 제바스티안 바흐"],
    answer: 0,
    explanation: "베토벤은 「교향곡 제9번」에서 실러의 시를 노래하는 성악과 기악을 새롭게 결합했다.",
    source: { name: "Britannica - Ludwig van Beethoven", url: "https://www.britannica.com/biography/Ludwig-van-Beethoven" }
  },
  {
    id: "ac-04",
    category: "예술과 문화",
    question: "희곡 「로미오와 줄리엣」을 쓴 작가는?",
    choices: ["크리스토퍼 말로", "윌리엄 셰익스피어", "몰리에르", "괴테"],
    answer: 1,
    explanation: "「로미오와 줄리엣」은 윌리엄 셰익스피어가 1594~1596년 무렵 쓴 희곡이다.",
    source: { name: "Britannica - Romeo and Juliet", url: "https://www.britannica.com/topic/Romeo-and-Juliet" }
  },
  {
    id: "ac-05",
    category: "예술과 문화",
    question: "조르주 브라크와 함께 입체주의(큐비즘)를 창시한 화가는?",
    choices: ["클로드 모네", "살바도르 달리", "파블로 피카소", "앙리 마티스"],
    answer: 2,
    explanation: "파블로 피카소는 조르주 브라크와 함께 입체주의를 창시한 20세기 대표 화가다.",
    source: { name: "Britannica - Pablo Picasso", url: "https://www.britannica.com/biography/Pablo-Picasso" }
  },
  {
    id: "ac-06",
    category: "예술과 문화",
    question: "소리꾼 한 명이 고수의 북 장단에 맞춰 노래와 말로 긴 이야기를 펼치는 한국 전통 음악은?",
    choices: ["아리랑", "종묘제례악", "강강술래", "판소리"],
    answer: 3,
    explanation: "판소리는 소리꾼과 북을 치는 고수가 함께 공연하는 한국의 음악적 이야기 장르다.",
    source: { name: "UNESCO 무형유산 - Pansori epic chant", url: "https://ich.unesco.org/en/RL/pansori-epic-chant-00070" }
  },
  {
    id: "ac-07",
    category: "예술과 문화",
    question: "바티칸 시스티나 성당의 천장 프레스코화를 그린 예술가는?",
    choices: ["미켈란젤로", "라파엘로", "레오나르도 다빈치", "산드로 보티첼리"],
    answer: 0,
    explanation: "미켈란젤로는 「피에타」, 「다비드」와 함께 시스티나 성당 천장 프레스코화를 남겼다.",
    source: { name: "Britannica - Michelangelo", url: "https://www.britannica.com/biography/Michelangelo" }
  },
  {
    id: "ac-08",
    category: "예술과 문화",
    question: "소설 「돈키호테」(1605, 1615)를 쓴 스페인 작가는?",
    choices: ["로페 데 베가", "미겔 데 세르반테스", "페데리코 가르시아 로르카", "가브리엘 가르시아 마르케스"],
    answer: 1,
    explanation: "미겔 데 세르반테스는 「돈키호테」(1605, 1615)를 쓴 스페인 문학의 대표 작가다.",
    source: { name: "Britannica - Miguel de Cervantes", url: "https://www.britannica.com/biography/Miguel-de-Cervantes" }
  },
  {
    id: "ac-09",
    category: "예술과 문화",
    question: "바이올린 협주곡 모음 「사계」를 작곡한 이탈리아 작곡가는?",
    choices: ["요한 제바스티안 바흐", "게오르크 프리드리히 헨델", "안토니오 비발디", "프레데리크 쇼팽"],
    answer: 2,
    explanation: "「사계」는 안토니오 비발디의 바이올린 협주곡 연작(작품 8)에 속한 네 곡이다.",
    source: { name: "Britannica - Antonio Vivaldi", url: "https://www.britannica.com/biography/Antonio-Vivaldi" }
  },
  {
    id: "ac-10",
    category: "예술과 문화",
    question: "오페라 「마술피리」를 작곡한 사람은?",
    choices: ["주세페 베르디", "자코모 푸치니", "리하르트 바그너", "볼프강 아마데우스 모차르트"],
    answer: 3,
    explanation: "「마술피리」는 볼프강 아마데우스 모차르트가 작곡한 오페라다.",
    source: { name: "Britannica - The Magic Flute", url: "https://www.britannica.com/topic/The-Magic-Flute" }
  }
];
