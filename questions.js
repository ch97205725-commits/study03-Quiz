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
    explanation: "세종은 한국어를 적는 표음 문자인 훈민정음(한글)을 만들었다.",
    source: { name: "한국민족문화대백과사전 - 세종", url: "https://encykorea.aks.ac.kr/Article/E0029857" }
  },
  {
    id: "kh-02",
    category: "한국사",
    question: "918년에 고려를 세운 인물은?",
    choices: ["궁예", "왕건", "견훤", "이성계"],
    answer: 1,
    explanation: "왕건은 궁예의 신하였다가 918년 궁예를 몰아내고 나라 이름을 고려로 정했다.",
    source: { name: "한국민족문화대백과사전 - 태조(고려)", url: "https://encykorea.aks.ac.kr/Article/E0059032" }
  },
  {
    id: "kh-03",
    category: "한국사",
    question: "백제와 고구려를 멸망시키고 삼국을 통일한 나라는?",
    choices: ["가야", "발해", "신라", "고려"],
    answer: 2,
    explanation: "신라는 7세기 중엽 백제와 고구려를 멸망시키고 삼국을 통일했다.",
    source: { name: "한국민족문화대백과사전 - 삼국통일", url: "https://encykorea.aks.ac.kr/Article/E0026483" }
  },
  {
    id: "kh-04",
    category: "한국사",
    question: "1392년에 조선을 건국하고 첫 번째 왕이 된 인물은?",
    choices: ["왕건", "이방원", "정몽주", "이성계"],
    answer: 3,
    explanation: "이성계는 1392년 새 왕조의 첫 왕으로 즉위해 나라 이름을 조선으로 정했다.",
    source: { name: "한국민족문화대백과사전 - 태조(조선)", url: "https://encykorea.aks.ac.kr/Article/E0059033" }
  },
  {
    id: "kh-05",
    category: "한국사",
    question: "임진왜란 때 수군을 이끌고 해전에서 잇달아 승리한 조선의 장군은?",
    choices: ["이순신", "권율", "김시민", "곽재우"],
    answer: 0,
    explanation: "이순신은 임진왜란 때 해전에서 잇달아 승리해 일본의 침략을 막는 데 큰 역할을 했다.",
    source: { name: "한국민족문화대백과사전 - 이순신", url: "https://encykorea.aks.ac.kr/Article/E0044900" }
  },
  {
    id: "kh-06",
    category: "한국사",
    question: "일제 강점기에 일어난 3·1 운동의 연도는?",
    choices: ["1910년", "1919년", "1926년", "1945년"],
    answer: 1,
    explanation: "3·1 운동은 1919년 3월 1일 서울에서 시작되어 전국으로 퍼진 독립 만세 운동이다.",
    source: { name: "한국민족문화대백과사전 - 3·1운동", url: "https://encykorea.aks.ac.kr/Article/E0026772" }
  },
  {
    id: "kh-07",
    category: "한국사",
    question: "북한의 남침으로 6·25 전쟁이 시작된 해는?",
    choices: ["1945년", "1948년", "1950년", "1953년"],
    answer: 2,
    explanation: "6·25 전쟁은 1950년 6월 북한군의 남침으로 시작되었다.",
    source: { name: "한국민족문화대백과사전 - 한국전쟁", url: "https://encykorea.aks.ac.kr/Article/E0042143" }
  },
  {
    id: "kh-08",
    category: "한국사",
    question: "팔만대장경(고려대장경) 목판을 보관하는 장경판전이 있는 절은?",
    choices: ["불국사", "통도사", "송광사", "해인사"],
    answer: 3,
    explanation: "합천 해인사의 장경판전은 팔만대장경(고려대장경) 목판을 보관하는 건물이다.",
    source: { name: "한국민족문화대백과사전 - 합천 해인사 장경판전", url: "https://encykorea.aks.ac.kr/Article/E0062725" }
  },
  {
    id: "kh-09",
    category: "한국사",
    question: "아버지의 무덤을 수원 지역으로 옮기고 수원 화성을 쌓은 조선의 왕은?",
    choices: ["정조", "영조", "숙종", "순조"],
    answer: 0,
    explanation: "정조는 아버지 사도세자의 무덤을 수원 지역으로 옮기고 화성을 쌓았다.",
    source: { name: "한국민족문화대백과사전 - 수원 화성", url: "https://encykorea.aks.ac.kr/Article/E0064671" }
  },
  {
    id: "kh-10",
    category: "한국사",
    question: "조선 역대 왕과 왕비의 신주를 모신 유교 사당은?",
    choices: ["경복궁", "종묘", "창덕궁", "덕수궁"],
    answer: 1,
    explanation: "종묘는 조선의 역대 왕과 왕비의 신주를 모신 사당이다.",
    source: { name: "한국민족문화대백과사전 - 종묘", url: "https://encykorea.aks.ac.kr/Article/E0052928" }
  },

  // ── 세계지리 ───────────────────────────────────────
  {
    id: "wg-01",
    category: "세계지리",
    question: "유럽 동부와 아시아 북부에 걸쳐 있는 나라는?",
    choices: ["우크라이나", "몽골", "러시아", "폴란드"],
    answer: 2,
    explanation: "러시아는 유럽 동부에서 아시아 북부까지 걸쳐 있는 나라다.",
    source: { name: "Britannica - Russia", url: "https://www.britannica.com/place/Russia" }
  },
  {
    id: "wg-02",
    category: "세계지리",
    question: "오스트레일리아(호주)의 수도는?",
    choices: ["시드니", "멜버른", "퍼스", "캔버라"],
    answer: 3,
    explanation: "오스트레일리아의 수도는 캔버라다.",
    source: { name: "Britannica - Canberra", url: "https://www.britannica.com/place/Canberra" }
  },
  {
    id: "wg-03",
    category: "세계지리",
    question: "네팔에서 '사가르마타'라고 부르는 산은?",
    choices: ["에베레스트산", "K2", "칸첸중가", "안나푸르나"],
    answer: 0,
    explanation: "에베레스트산은 네팔과 중국의 국경에 있으며, 네팔에서는 사가르마타라고 부른다.",
    source: { name: "UNESCO 세계유산 - Sagarmatha National Park", url: "https://whc.unesco.org/en/list/120" }
  },
  {
    id: "wg-04",
    category: "세계지리",
    question: "캐나다의 수도는?",
    choices: ["토론토", "오타와", "밴쿠버", "몬트리올"],
    answer: 1,
    explanation: "캐나다의 수도는 오타와다.",
    source: { name: "Britannica - Ottawa", url: "https://www.britannica.com/place/Ottawa" }
  },
  {
    id: "wg-05",
    category: "세계지리",
    question: "마리아나 해구가 있는 대양은?",
    choices: ["대서양", "인도양", "태평양", "북극해"],
    answer: 2,
    explanation: "마리아나 해구는 태평양에 있다.",
    source: { name: "NOAA Ocean Exploration - How big is the Pacific Ocean?", url: "https://oceanexplorer.noaa.gov/ocean-fact/pacific-size/" }
  },
  {
    id: "wg-06",
    category: "세계지리",
    question: "나일강이 지중해로 흘러들며 삼각주를 이루는 나라는?",
    choices: ["수단", "에티오피아", "우간다", "이집트"],
    answer: 3,
    explanation: "나일강은 이집트 카이로 북쪽에서 삼각주를 이루고 지중해로 흘러든다.",
    source: { name: "Britannica - Nile River", url: "https://www.britannica.com/place/Nile-River" }
  },
  {
    id: "wg-07",
    category: "세계지리",
    question: "브라질 전역에서 쓰이는 주된 언어는?",
    choices: ["포르투갈어", "스페인어", "영어", "프랑스어"],
    answer: 0,
    explanation: "브라질에서는 나라 전역에서 포르투갈어를 쓴다.",
    source: { name: "Britannica - Brazil", url: "https://www.britannica.com/place/Brazil" }
  },
  {
    id: "wg-08",
    category: "세계지리",
    question: "러시아 서부를 가로지르며 유럽과 아시아의 경계를 이루는 산맥은?",
    choices: ["알프스산맥", "우랄산맥", "피레네산맥", "애팔래치아산맥"],
    answer: 1,
    explanation: "우랄산맥은 러시아 서부를 가로지르며 유럽과 아시아를 나눈다.",
    source: { name: "NASA Earth Observatory - The Ural Mountains", url: "https://science.nasa.gov/earth/earth-observatory/the-ural-mountains-87198/" }
  },
  {
    id: "wg-09",
    category: "세계지리",
    question: "덴마크 왕국에 속한 자치국으로, 북대서양에 있는 섬은?",
    choices: ["아이슬란드", "뉴기니섬", "그린란드", "마다가스카르섬"],
    answer: 2,
    explanation: "그린란드는 덴마크 왕국에 속한 자치국으로, 북대서양에 있다.",
    source: { name: "덴마크 외교부 - Greenland", url: "https://um.dk/rumaenien/en/about-denmark/facts-about-denmark/greenland/" }
  },
  {
    id: "wg-10",
    category: "세계지리",
    question: "튀르키예(터키)의 수도는?",
    choices: ["이스탄불", "이즈미르", "안탈리아", "앙카라"],
    answer: 3,
    explanation: "튀르키예의 수도는 앙카라다.",
    source: { name: "Britannica - Ankara", url: "https://www.britannica.com/place/Ankara" }
  },

  // ── 과학 ───────────────────────────────────────────
  {
    id: "sc-01",
    category: "과학",
    question: "태양계 행성을 태양에서 가까운 순서로 놓을 때 첫 번째 행성은?",
    choices: ["수성", "금성", "지구", "화성"],
    answer: 0,
    explanation: "수성은 태양계 행성 가운데 가장 안쪽 궤도를 돈다.",
    source: { name: "NASA Science - Mercury", url: "https://science.nasa.gov/mercury/" }
  },
  {
    id: "sc-02",
    category: "과학",
    question: "태양에서 다섯 번째에 있는 행성은?",
    choices: ["토성", "목성", "화성", "천왕성"],
    answer: 1,
    explanation: "목성은 태양에서 다섯 번째에 있는 행성이다.",
    source: { name: "NASA Science - Jupiter", url: "https://science.nasa.gov/jupiter/" }
  },
  {
    id: "sc-03",
    category: "과학",
    question: "물 분자를 이루는 두 원소는?",
    choices: ["수소와 질소", "탄소와 산소", "수소와 산소", "산소와 질소"],
    answer: 2,
    explanation: "물은 수소와 산소로 이루어진 화합물이다.",
    source: { name: "NIST Chemistry WebBook - Water", url: "https://webbook.nist.gov/cgi/cbook.cgi?ID=C7732185" }
  },
  {
    id: "sc-04",
    category: "과학",
    question: "원소 기호가 Fe인 원소는?",
    choices: ["불소", "금", "납", "철"],
    answer: 3,
    explanation: "Fe는 철의 원소 기호다.",
    source: { name: "Royal Society of Chemistry - Iron", url: "https://periodic-table.rsc.org/element/26/iron" }
  },
  {
    id: "sc-05",
    category: "과학",
    question: "광합성에서 식물이 물과 함께 재료로 쓰는 기체는?",
    choices: ["이산화탄소", "산소", "질소", "수소"],
    answer: 0,
    explanation: "광합성에서 식물은 빛에너지로 물과 이산화탄소를 이용해 산소와 당을 만든다.",
    source: { name: "National Geographic Education - Photosynthesis", url: "https://education.nationalgeographic.org/resource/photosynthesis/" }
  },
  {
    id: "sc-06",
    category: "과학",
    question: "적혈구 안에서 산소를 운반하는 철 함유 단백질은?",
    choices: ["인슐린", "헤모글로빈", "케라틴", "콜라겐"],
    answer: 1,
    explanation: "헤모글로빈은 적혈구 안의 철 함유 단백질로, 산소를 몸 곳곳으로 나른다.",
    source: { name: "MedlinePlus - Hemoglobin Test", url: "https://medlineplus.gov/lab-tests/hemoglobin-test/" }
  },
  {
    id: "sc-07",
    category: "과학",
    question: "진공에서 빛의 속력에 가장 가까운 값은?",
    choices: ["초속 약 340m", "초속 약 3만 km", "초속 약 30만 km", "초속 약 300만 km"],
    answer: 2,
    explanation: "진공에서 빛의 속력은 정확히 초속 299,792,458m로 정해져 있다.",
    source: { name: "NIST CODATA - speed of light in vacuum", url: "https://physics.nist.gov/cgi-bin/cuu/Value?c" }
  },
  {
    id: "sc-08",
    category: "과학",
    question: "특수 상대성 이론과 일반 상대성 이론을 내놓은 과학자는?",
    choices: ["아이작 뉴턴", "닐스 보어", "갈릴레오 갈릴레이", "알베르트 아인슈타인"],
    answer: 3,
    explanation: "아인슈타인은 특수 상대성 이론과 일반 상대성 이론을 내놓았다.",
    source: { name: "NobelPrize.org - Albert Einstein Biographical", url: "https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/" }
  },
  {
    id: "sc-09",
    category: "과학",
    question: "항생 물질 페니실린을 발견한 스코틀랜드의 세균학자는?",
    choices: ["알렉산더 플레밍", "루이 파스퇴르", "로베르트 코흐", "에드워드 제너"],
    answer: 0,
    explanation: "알렉산더 플레밍은 페니실린을 발견한 스코틀랜드의 세균학자다.",
    source: { name: "NobelPrize.org - The Nobel Prize in Physiology or Medicine 1945", url: "https://www.nobelprize.org/prizes/medicine/1945/summary/" }
  },
  {
    id: "sc-10",
    category: "과학",
    question: "지표 근처 지구 대기의 약 78%를 차지하는 기체는?",
    choices: ["산소", "질소", "아르곤", "이산화탄소"],
    answer: 1,
    explanation: "지표 근처 지구 대기는 약 78%가 질소다.",
    source: { name: "NOAA - The Atmosphere", url: "https://www.noaa.gov/jetstream/atmosphere" }
  },

  // ── 예술과 문화 ────────────────────────────────────
  {
    id: "ac-01",
    category: "예술과 문화",
    question: "루브르 박물관에 있는 그림 「모나리자」를 그린 화가는?",
    choices: ["미켈란젤로", "라파엘로", "레오나르도 다빈치", "산드로 보티첼리"],
    answer: 2,
    explanation: "「모나리자」는 레오나르도 다빈치의 그림으로, 파리 루브르 박물관에 있다.",
    source: { name: "Musée du Louvre - From the Mona Lisa to The Wedding Feast at Cana", url: "https://www.louvre.fr/en/explore/the-palace/from-the-mona-lisa-to-the-wedding-feast-at-cana" }
  },
  {
    id: "ac-02",
    category: "예술과 문화",
    question: "「별이 빛나는 밤」(1889)을 그린 화가는?",
    choices: ["클로드 모네", "폴 세잔", "에두아르 마네", "빈센트 반 고흐"],
    answer: 3,
    explanation: "「별이 빛나는 밤」은 빈센트 반 고흐가 1889년에 그린 유화다.",
    source: { name: "MoMA - The Starry Night", url: "https://www.moma.org/collection/works/79802" }
  },
  {
    id: "ac-03",
    category: "예술과 문화",
    question: "마지막 악장에서 실러의 시를 노래로 부르는 「교향곡 제9번」을 작곡한 사람은?",
    choices: ["루트비히 판 베토벤", "볼프강 아마데우스 모차르트", "요제프 하이든", "요한 제바스티안 바흐"],
    answer: 0,
    explanation: "베토벤의 「교향곡 제9번」은 마지막 악장에서 실러의 시를 노래로 부른다.",
    source: { name: "Beethoven-Haus Bonn - BTHVN2024", url: "https://www.beethoven.de/en/g/bthvn2024" }
  },
  {
    id: "ac-04",
    category: "예술과 문화",
    question: "희곡 「로미오와 줄리엣」을 쓴 작가는?",
    choices: ["크리스토퍼 말로", "윌리엄 셰익스피어", "몰리에르", "괴테"],
    answer: 1,
    explanation: "「로미오와 줄리엣」은 윌리엄 셰익스피어가 쓴 희곡이다.",
    source: { name: "Britannica - Romeo and Juliet", url: "https://www.britannica.com/topic/Romeo-and-Juliet" }
  },
  {
    id: "ac-05",
    category: "예술과 문화",
    question: "조르주 브라크와 함께 입체주의(큐비즘)를 창시한 화가는?",
    choices: ["클로드 모네", "살바도르 달리", "파블로 피카소", "앙리 마티스"],
    answer: 2,
    explanation: "피카소는 조르주 브라크와 함께 입체주의를 만들었다.",
    source: { name: "The Metropolitan Museum of Art - Cubism", url: "https://www.metmuseum.org/essays/cubism" }
  },
  {
    id: "ac-06",
    category: "예술과 문화",
    question: "소리꾼 한 명이 고수의 북 장단에 맞춰 노래와 말로 긴 이야기를 펼치는 한국 전통 음악은?",
    choices: ["아리랑", "종묘제례악", "강강술래", "판소리"],
    answer: 3,
    explanation: "판소리는 소리꾼 한 명이 고수의 북장단에 맞춰 이야기를 노래와 말로 엮어 내는 전통 공연 예술이다.",
    source: { name: "한국민족문화대백과사전 - 판소리", url: "https://encykorea.aks.ac.kr/Article/E0059663" }
  },
  {
    id: "ac-07",
    category: "예술과 문화",
    question: "바티칸 시스티나 성당의 천장 프레스코화를 그린 예술가는?",
    choices: ["미켈란젤로", "라파엘로", "레오나르도 다빈치", "산드로 보티첼리"],
    answer: 0,
    explanation: "시스티나 성당의 천장화는 교황의 의뢰를 받은 미켈란젤로가 그렸다.",
    source: { name: "Musei Vaticani - Sistine Chapel Ceiling", url: "https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/cappella-sistina/volta.html" }
  },
  {
    id: "ac-08",
    category: "예술과 문화",
    question: "소설 「돈키호테」를 쓴 스페인 작가는?",
    choices: ["로페 데 베가", "미겔 데 세르반테스", "페데리코 가르시아 로르카", "가브리엘 가르시아 마르케스"],
    answer: 1,
    explanation: "「돈키호테」는 스페인 작가 미겔 데 세르반테스의 소설이다.",
    source: { name: "Centro Virtual Cervantes - Don Quijote de la Mancha", url: "https://cvc.cervantes.es/literatura/clasicos/quijote/" }
  },
  {
    id: "ac-09",
    category: "예술과 문화",
    question: "바이올린 협주곡 「사계」를 작곡한 사람은?",
    choices: ["요한 제바스티안 바흐", "게오르크 프리드리히 헨델", "안토니오 비발디", "아르칸젤로 코렐리"],
    answer: 2,
    explanation: "「사계」는 안토니오 비발디의 바이올린 협주곡 작품 8에 들어 있는 네 곡이다.",
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
