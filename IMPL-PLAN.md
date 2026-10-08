# 4지선다 상식 퀴즈 웹 앱 구현 계획서 (IMPL-PLAN)

> **에이전트 작업자용:** 실행 방식은 **Native**(사용자 결정) — superpowers:executing-plans로 이 세션에서 직접 태스크 단위로 실행한다. 단계는 체크박스(`- [ ]`)로 추적한다.
> **시작 대기:** 첫 커밋과 앱 구현은 사용자가 "시작"이라고 말할 때까지 하지 않는다.
> **단계마다 멈춤:** 각 단계(1·2·3단계)의 마지막 태스크가 끝나면 **구현을 멈추고** 사용자에게 "브라우저 확인 항목"을 확인해 달라고 요청한다. 사용자가 명시적으로 "다음 단계 진행"이라고 답하기 전에는 다음 단계를 시작하지 않는다.

**목표:** 서버 없이 `index.html`을 열면 동작하는 4지선다 상식 퀴즈(4개 카테고리 × 10문항)를 연습 → 스피드·힌트·다시 풀기 → 순위표 순서로 3단계에 걸쳐 만든다.

**구조:** 한 페이지 안의 `<section>` 네 개(3단계에서 다섯 개)를 숨기고 보이며 화면을 바꾼다. 전역 상태 객체 `state` 하나와, 순수 함수(섞기·채점·점검)와 화면 함수(render*)를 `script.js` 안에서 함수 단위로 나눈다. 문항 데이터는 `questions.js`의 전역 상수 `QUESTIONS`.

**기술:** HTML, CSS, 바닐라 JavaScript(ES2015+). 빌드 도구·외부 라이브러리·ES 모듈 없음.

**스펙:** [PRD.md](PRD.md) — 실행자는 이 계획서와 PRD를 함께 읽는다.

## 전역 제약

- 앱 파일은 정확히 4개: `index.html`, `style.css`, `script.js`, `questions.js`. 다른 앱 파일을 만들지 않는다.
- **테스트 파일이나 `tests/` 폴더를 만들지 않는다.** 검증은 (1) 사용자가 브라우저에서 직접 확인, (2) 브라우저 콘솔에서 `script.js` 안의 함수를 호출하는 방식으로만 한다.
- `index.html`은 `<script src="questions.js">`를 먼저, `<script src="script.js">`를 나중에 일반 태그로 불러온다. `import`/`export`, `type="module"` 금지.
- `file://`로 직접 열어도, GitHub Pages에서 열어도 똑같이 동작해야 한다(`fetch` 사용 금지).
- 시작 화면 맨 위 표시 문구(정확히): `학번 2601990 이름 최현지`
- 화면 문구(정확히): `순위표에 기록되지 않음`, `정답!`, `오답`, `시간 초과`, `문항 데이터를 불러오지 못함`, 점수 형식 `8.5 / 10점`, 다시 풀기 결과 형식 `n문항 중 m개 맞힘`, 버튼 `[다음]`, `[결과 보기]`, `[처음으로]`, `[틀린 문제 다시 풀기]`, `[힌트]`, `[뒤로]` (대괄호는 버튼 표시용이며 실제 라벨에는 넣지 않는다).
- 카테고리(정확히): `한국사`, `세계지리`, `과학`, `예술과 문화` / id 접두사 `kh`, `wg`, `sc`, `ac`
- 색: 정답 보기 초록, 고른 오답 빨강. 모바일 폭(360px)에서도 가로 스크롤 없이 보인다.
- 섞기는 Fisher–Yates. 보기를 섞을 때 정답은 **보기 내용**으로 따라간다.
- 문항·해설 텍스트는 `textContent`로 넣는다(`innerHTML`에 데이터 문자열을 넣지 않는다).
- 출처 링크는 `target="_blank" rel="noopener"`.
- **커밋 규칙: 점검 명령 통과 후 태스크별로 커밋한다.** 태스크의 "점검" 단계에 적힌 점검 명령(브라우저 콘솔에서 실행하는 확인 코드와 확인 항목)이 모두 기대값대로 통과해야 그 태스크의 "커밋" 단계로 간다. 점검이 실패하면 고친 뒤 다시 실행하고, 통과하기 전에는 커밋하지 않는다.
  - 커밋 작성자: 이 폴더에만(`git config --local`) 사용자의 GitHub 사용자 이름과 GitHub noreply 이메일로 설정한다.
  - 한 커밋에는 그 태스크에서 바뀐 파일만 `git add <파일>`로 넣는다(`git add .`/`-A` 금지).
  - 메시지 형식: `<종류>(<태스크 번호>): <요약>` — 예: `feat(1-2): 섞기·채점·문항 점검 함수 추가`. 종류는 `feat`, `fix`, `docs`, `style`.
  - 메시지 끝에 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` 줄을 붙인다.
  - 첫 커밋(시작 시): `docs(0): PRD와 구현 계획서 추가` — `PRD.md`, `IMPL-PLAN.md`만.
  - 단계 끝 사용자 확인에서 고칠 점이 나오면 `fix(<단계>-확인): …`로 따로 커밋한다.
- `git push`, GitHub 저장소 생성, Pages 배포는 외부 게시이므로 사용자가 따로 요청할 때만 한다.

## 리뷰 중점 (테스트로 잘 안 잡히지만 사용자를 괴롭힐 가능성이 큰 것)

1. **답을 고른 직후 연속 클릭·더블클릭** → 한 문항이 두 번 채점되면 안 된다. (태스크 1-3 `handleAnswer`의 `state.answered` 가드, 확인 항목 1-B-6)
2. **스피드 모드에서 0초가 되는 순간 보기 클릭** → 시간 초과와 클릭 중 먼저 온 것 하나만 채점된다. (태스크 2-2, 확인 항목 2-B-4)
3. **문제 도중 [처음으로]로 나가기** → 타이머가 계속 돌거나, 시작 화면에서 갑자기 "시간 초과"가 처리되면 안 된다. 그래서 문제 화면에도 [처음으로] 버튼을 둔다. (태스크 1-3 버튼, 태스크 2-2 `showScreen`에서 `stopTimer()`, 확인 항목 2-B-5)
4. **섞은 뒤 정답 위치** → 문항·보기 순서를 섞고 다시 풀기에서 또 섞어도 정답 표시가 정확해야 한다. (태스크 1-2 `prepareQuestion`, 콘솔 확인 1-C-2)
5. **`QUESTIONS` 누락·로딩 실패**(`questions.js` 파일명 오타, 문법 오류) → 앱이 하얀 화면이 되지 않고 "문항 데이터를 불러오지 못함" + 카테고리 버튼 비활성화. (태스크 1-3 `init`, 확인 항목 1-B-9)

---

## 파일 구조와 책임

| 파일 | 책임 | 처음 만드는 단계 |
|---|---|---|
| `index.html` | 학번·이름 표시줄, 화면 `<section>`들(`#screen-start`, `#screen-mode`, `#screen-quiz`, `#screen-result`, 3단계 `#screen-leaderboard`), 스크립트 태그 | 1단계 |
| `style.css` | 레이아웃, 보기 버튼 상태(`.correct` 초록 / `.wrong` 빨강 / `.removed` 숨김), 타이머 강조(`.urgent`), 모바일 대응 | 1단계 |
| `questions.js` | `const QUESTIONS = [...]` 40문항만 | 1단계 |
| `script.js` | 상태, 순수 함수, 화면 함수, 이벤트 연결, `validateQuestions` | 1단계 |

### `script.js` 공용 인터페이스 (모든 단계가 이 이름을 그대로 쓴다)

```js
// 상태 (1단계에서 정의, 2·3단계에서 필드 추가)
const state = {
  category: null,      // "한국사" 등
  mode: "practice",    // "practice" | "speed" | "hint"
  questions: [],       // PreparedQuestion[] (이번 판, 섞인 상태)
  index: 0,            // 현재 문항 번호(0~)
  score: 0,            // 이번 판 점수 (0.5 단위)
  answered: false,     // 현재 문항 채점 완료 여부 (중복 입력 방지)
  results: [],         // { id, question, correct, points }[]
  isRetry: false,      // 2단계: 다시 풀기 판인지
  firstScore: null,    // 2단계: 처음 10문항 점수(다시 풀기 중에도 보존)
  usedHint: false,     // 2단계
  timeLeft: 15,        // 2단계
  timerId: null,       // 2단계
};

// PreparedQuestion = { id, category, question, choices: string[4], answerIndex: number,
//                      explanation, source: { name, url } }
```

---

# 1단계: 연습 모드와 점수

**만들 것:** 4개 파일 전체 골격, 40문항, 시작 화면(학번·이름, 제목, 카테고리 4개, 연습 모드 안내), 문제 화면, 결과 화면, 연습 모드 채점, 문항 데이터 점검 함수.
**만들지 않을 것:** 모드 선택 화면, 스피드·힌트, 틀린 문제 다시 풀기, localStorage.

### 태스크 1-1: 문항 데이터 40개 (`questions.js`)

**Files:** Create: `questions.js`

**Interfaces:**
- Produces: 전역 `QUESTIONS` — PRD 3.3 형식의 객체 40개 (`id`, `category`, `question`, `choices[4]`, `answer` 0~3, `explanation`, `source: {name, url}`).

- [ ] **Step 1:** 카테고리별 10문항씩 작성한다. id는 `kh-01`~`kh-10`, `wg-01`~`wg-10`, `sc-01`~`sc-10`, `ac-01`~`ac-10`.
- [ ] **Step 2:** 문항마다 출처를 **실제로 열어서** 정답을 확인하고 `source.name`, `source.url`에 그 페이지를 적는다(우리역사넷, 한국민족문화대백과사전, 브리태니커, NASA, 기관 공식 사이트 등). 열어 보지 못한 출처는 쓰지 않고 문항을 바꾼다.
- [ ] **Step 3:** PRD 7장 규칙 점검: 정답이 하나뿐인지, "가장 ~한" 표현에 기준과 시점(예: "면적 기준", "2024년 기준")이 문제 문장에 있는지. 해설은 한 줄.
- [ ] **Step 4:** 정답 위치가 한쪽에 몰리지 않게 `answer` 값을 0~3에 고르게 둔다(섞기와 별개로 데이터 자체의 편향 방지).
- [ ] **Step 5 (점검):** 40문항 각각 Step 2·3 규칙을 다시 훑어보고, 임시 HTML 없이 확인할 방법이 없으므로 **기계 점검은 태스크 1-2의 `validateQuestions()`로 한다.** 커밋은 1-2 점검 통과 직후에 한다.
- [ ] **Step 6 (커밋):** 1-2의 콘솔 확인 1-C-1이 `{ ok: true, errors: [] }`이면 `git add questions.js` → `feat(1-1): 4개 카테고리 40문항 추가`. (1-2 커밋보다 먼저)

### 태스크 1-2: 순수 함수와 데이터 점검 (`script.js` 앞부분)

**Files:** Create: `script.js`

**Interfaces:**
- Consumes: `QUESTIONS`
- Produces:
  - `shuffle(array) -> array` — Fisher–Yates, **원본을 바꾸지 않고** 새 배열 반환
  - `prepareQuestion(q) -> PreparedQuestion` — 보기를 섞고, 정답 보기 **문자열**을 찾아 `answerIndex`를 다시 계산
  - `getQuestionsByCategory(category) -> Question[]`
  - `scoreFor(mode, isCorrect, usedHint) -> number` — 틀림 0, 힌트 모드 + 힌트 사용 + 맞힘 0.5, 나머지 맞힘 1
  - `formatScore(score) -> string` — `formatScore(8.5) === "8.5 / 10점"`, `formatScore(10) === "10 / 10점"`
  - `validateQuestions(questions = QUESTIONS) -> { ok: boolean, errors: string[] }` — 오류마다 `console.warn`, 끝에 요약 `console.log`

- [ ] **Step 1:** 위 6개 함수를 구현한다. `validateQuestions`는 PRD 8.7의 다섯 조건(카테고리별 10개, 보기 4개·중복 없음, `answer` 0~3, `id` 중복 없음, 해설·출처 이름·URL 비어 있지 않음)을 각각 검사하고, 오류 문자열에 문항 `id`를 넣는다.
- [ ] **Step 2 (점검):** `index.html`이 아직 없으므로, 두 스크립트만 불러오는 최소 `index.html`(1-3 Step 1의 골격)을 먼저 만들어 브라우저로 열고 아래 "콘솔 확인 1-C"를 실행해 모두 기대값이 나오는지 본다. 이 골격 `index.html`은 1-3에서 완성하므로 이 태스크에서는 커밋하지 않는다.
- [ ] **Step 3 (커밋):** 태스크 1-1 커밋 후 `git add script.js` → `feat(1-2): 섞기·채점·문항 점검 함수 추가`.

### 태스크 1-3: 화면과 연습 모드 흐름 (`index.html`, `style.css`, `script.js`)

**Files:** Create: `index.html`, `style.css` / Modify: `script.js`

**Interfaces:**
- Consumes: 태스크 1-2의 함수 전부
- Produces:
  - `showScreen(name)` — `name`: `"start" | "quiz" | "result"` (2단계에 `"mode"`, 3단계에 `"leaderboard"` 추가). 해당 `<section>`만 보이게 한다.
  - `startGame(category, mode, sourceQuestions)` — `state` 초기화, `sourceQuestions`를 섞고 `prepareQuestion` 적용, 문제 화면 표시
  - `renderQuestion()` — 위쪽 정보(카테고리, 모드 이름, `3/10` 진행도, 현재 점수), 문제, 보기 4개
  - `handleAnswer(choiceIndex)` — `choiceIndex`는 0~3, 2단계 시간 초과는 `-1`. 첫 줄에서 `if (state.answered) return;`
  - `nextQuestion()`, `renderResult()`, `init()`
  - DOM id: `#student-bar`, `#data-error`, `#category-buttons`, `#quiz-meta`, `#quiz-question`, `#choices`, `#feedback`, `#explanation`, `#source-link`, `#next-btn`, `#quiz-home-btn`, `#result-score`, `#result-summary`, `#result-notice`, `#result-home-btn`

- [ ] **Step 1:** `index.html` — 맨 위 `<div id="student-bar">학번 2601990 이름 최현지</div>`, 제목, 시작·문제·결과 섹션, 스크립트 순서(`questions.js` → `script.js`), `<meta name="viewport">`.
- [ ] **Step 2:** 시작 화면 — 카테고리 버튼 4개, 안내 문구 "카테고리를 고르면 바로 연습 모드가 시작됩니다. 연습 모드는 순위표에 기록되지 않음".
- [ ] **Step 3:** `handleAnswer` — 순서대로: `state.answered = true` → 모든 보기 `disabled` → 정답 `.correct`, 고른 오답 `.wrong` → "정답!"/"오답" → 해설과 출처 링크 → `scoreFor`로 점수 더하고 `results`에 기록 → 마지막 문항이면 버튼 라벨 "결과 보기", 아니면 "다음".
- [ ] **Step 4:** 결과 화면 — `formatScore(state.score)`, 문항별 ○/× 요약(문제 문장 + 맞힘/틀림), "순위표에 기록되지 않음", [처음으로].
- [ ] **Step 5:** 문제 화면에도 [처음으로] 버튼(`#quiz-home-btn`)을 둔다.
- [ ] **Step 6:** `init()` — `typeof QUESTIONS === "undefined"` 또는 빈 배열이면 `#data-error`에 "문항 데이터를 불러오지 못함" 표시 + 카테고리 버튼 `disabled`. 정상이면 `validateQuestions()`를 호출(경고는 콘솔에만). 1단계에서 카테고리 클릭은 `startGame(category, "practice", getQuestionsByCategory(category))`.
- [ ] **Step 7:** `style.css` — `.correct`(초록), `.wrong`(빨강), 보기 버튼 세로 배치, 최대 폭 640px 가운데 정렬, 360px 폭에서 가로 스크롤 없음.
- [ ] **Step 8 (점검):** 아래 1단계 확인 항목 A·B·C를 직접 돌려 본다(1-B-9는 파일명을 바꿨다가 반드시 원래대로 되돌린 뒤 `git diff`로 되돌려졌는지 확인).
- [ ] **Step 9 (커밋):** `git add index.html style.css script.js` → `feat(1-3): 시작·문제·결과 화면과 연습 모드 흐름`. 그 뒤 멈춘다.

## 1단계 완료 기준

- 파일 4개만으로 `index.html`을 더블클릭(`file://`)해서 4개 카테고리 모두 10문항을 끝까지 풀 수 있다.
- 콘솔 오류 0개, `validateQuestions().ok === true`.
- 아래 브라우저 확인 항목 A·B·C 전부 통과.

## 1단계 브라우저 확인 항목 (사용자가 직접)

**A. 환경·제출 조건**
- [ ] 1-A-1. 폴더에서 `index.html`을 더블클릭해 열면 화면이 나온다(주소창이 `file://`로 시작).
- [ ] 1-A-2. 시작 화면 **맨 위**에 "학번 2601990 이름 최현지"가 보인다.
- [ ] 1-A-3. F12 → Console 탭에 빨간 오류가 없다.
- [ ] 1-A-4. 시작 화면에 "순위표에 기록되지 않음" 안내가 보인다.

**B. 연습 모드 플레이**
- [ ] 1-B-1. 카테고리 4개 각각 눌러 보면 바로 문제가 시작되고, 위쪽에 카테고리·"연습"·`1/10`·현재 점수가 보인다.
- [ ] 1-B-2. 답을 고르면 곧바로 "정답!"/"오답", 정답 보기 초록, 고른 오답 빨강, 한 줄 해설, 출처 이름이 보인다.
- [ ] 1-B-3. 출처 링크를 누르면 **새 탭**에서 열린다.
- [ ] 1-B-4. 1~9번 문항은 [다음], 10번 문항은 [결과 보기]가 나온다.
- [ ] 1-B-5. 결과 화면에 "x / 10점", 문항별 맞힘/틀림 요약, "순위표에 기록되지 않음", [처음으로]가 보인다.
- [ ] 1-B-6. 답을 고른 뒤 다른 보기나 같은 보기를 빠르게 여러 번 눌러도 점수가 1점 넘게 오르지 않는다.
- [ ] 1-B-7. 모두 맞히면 `10 / 10점`, 모두 틀리면 `0 / 10점`이 나온다(정답은 해설로 확인하며 두 판 진행).
- [ ] 1-B-8. 같은 카테고리를 두 번 시작하면 문항 순서와 보기 순서가 달라진다.
- [ ] 1-B-9. (오류 처리) `index.html`의 `questions.js` 스크립트 줄 파일명을 잠시 `questionsX.js`로 바꿔 열면 "문항 데이터를 불러오지 못함"이 보이고 카테고리 버튼이 눌리지 않는다. 확인 후 원래대로 되돌린다.
- [ ] 1-B-10. 브라우저 폭을 휴대폰 크기로 줄여도(F12 → 기기 툴바) 가로 스크롤 없이 보인다.

**C. 콘솔 확인 (F12 → Console에 붙여 넣기)**
- [ ] 1-C-1. `validateQuestions()` → `{ ok: true, errors: [] }`
- [ ] 1-C-2. `(() => { const q = QUESTIONS[0]; for (let i = 0; i < 200; i++) { const p = prepareQuestion(q); if (p.choices[p.answerIndex] !== q.choices[q.answer]) return false; } return true; })()` → `true`
- [ ] 1-C-3. `[scoreFor("practice", true, false), scoreFor("practice", false, false), formatScore(8.5)]` → `[1, 0, "8.5 / 10점"]`
- [ ] 1-C-4. `(() => { const a = [1,2,3,4,5]; shuffle(a); return a.join(); })()` → `"1,2,3,4,5"` (원본 불변)

**D. 문항 검토 (사용자)**
- [ ] 1-D-1. 40문항의 출처 링크를 열어 정답이 하나뿐인지, 최상급 표현에 기준·시점이 있는지 확인한다. 고칠 문항은 id로 알려 준다.

> ⏸ **1단계 종료 — 여기서 멈춘다.** 사용자가 위 항목을 확인하고 "2단계 진행"이라고 답할 때까지 2단계를 시작하지 않는다.

---

# 2단계: 스피드 모드, 힌트 모드, 모드 선택 화면, 틀린 문제 다시 풀기

**만들 것:** 모드 선택 화면, 스피드 모드 타이머, 힌트 모드, 결과 화면의 [틀린 문제 다시 풀기].
**흐름 변경:** 카테고리 클릭 → 모드 선택 화면 → 문제. 시작 화면 안내 문구는 "카테고리를 고르면 바로 연습 모드…"에서 일반 안내 + "연습 모드는 순위표에 기록되지 않음"으로 바꾼다.

### 태스크 2-1: 모드 선택 화면

**Files:** Modify: `index.html`, `style.css`, `script.js`

**Interfaces:**
- Consumes: `showScreen`, `startGame`
- Produces: `#screen-mode` 섹션, `showScreen("mode")`, 모드 이름 표시 함수 `modeLabel(mode) -> "연습" | "스피드" | "힌트"`

- [ ] **Step 1:** 카드 3개와 한 줄 설명 — 연습: "시간 제한·힌트 없이 풀기 · 순위표에 기록되지 않음" / 스피드: "문항마다 15초" / 힌트: "문항마다 힌트 1번, 힌트 쓰고 맞히면 0.5점".
- [ ] **Step 2:** 카테고리 클릭 시 `state.category` 저장 후 `showScreen("mode")`, 카드 클릭 시 `startGame(state.category, mode, getQuestionsByCategory(state.category))`, [뒤로]는 `showScreen("start")`.
- [ ] **Step 3 (점검):** 확인 항목 2-A-1~2-A-3, 연습 카드로 한 판 끝까지(1-B-2~1-B-5) 통과, 콘솔 오류 없음.
- [ ] **Step 4 (커밋):** `git add index.html style.css script.js` → `feat(2-1): 모드 선택 화면 추가`.

### 태스크 2-2: 스피드 모드 타이머

**Files:** Modify: `index.html`, `style.css`, `script.js`

**Interfaces:**
- Produces: `startTimer()`, `stopTimer()`, `#timer` 요소, `.urgent` 클래스
- 변경: `showScreen(name)`이 **맨 처음에 항상 `stopTimer()`를 호출**한다. `handleAnswer`도 가드 직후 `stopTimer()`를 호출한다.

- [ ] **Step 1:** `startTimer()` — `stopTimer()` 먼저 호출 → `state.timeLeft = 15` → 1초마다 감소·표시, `timeLeft <= 5`면 `#timer`에 `.urgent` → 0이 되면 `handleAnswer(-1)`.
- [ ] **Step 2:** `handleAnswer(-1)` 처리 — 피드백 "시간 초과", 0점, 정답 보기 초록 표시, 해설 표시. 고른 오답 빨강은 없음.
- [ ] **Step 3:** `renderQuestion()`에서 `state.mode === "speed"`일 때만 `#timer`를 보이고 `startTimer()`. [다음]이 `renderQuestion()`을 부르므로 다음 문항은 15초부터.
- [ ] **Step 4 (점검):** 확인 항목 2-B-1~2-B-5 통과, 연습 모드에서 타이머가 보이지 않음, 콘솔 오류 없음.
- [ ] **Step 5 (커밋):** `git add index.html style.css script.js` → `feat(2-2): 스피드 모드 15초 타이머`.

### 태스크 2-3: 힌트 모드

**Files:** Modify: `index.html`, `style.css`, `script.js`

**Interfaces:**
- Produces: `pickHintRemovals(answerIndex) -> number[]` (정답이 아닌 인덱스 중 무작위 2개), `useHint()`, `#hint-btn`, `.removed` 클래스

- [ ] **Step 1:** `useHint()` — `state.answered || state.usedHint`면 return → `state.usedHint = true` → 고른 두 보기에 `.removed`(화면에서 사라짐, `display:none`) → `#hint-btn` 비활성화.
- [ ] **Step 2:** `renderQuestion()`이 문항마다 `state.usedHint = false`, 힌트 모드일 때만 `#hint-btn` 표시·활성화. `handleAnswer`는 `scoreFor(state.mode, isCorrect, state.usedHint)`를 쓰고 `#hint-btn`을 비활성화.
- [ ] **Step 3 (점검):** 확인 항목 2-C-1~2-C-4, 콘솔 확인 2-E-2·2-E-3 통과, 연습·스피드 모드에서 [힌트]가 보이지 않음.
- [ ] **Step 4 (커밋):** `git add index.html style.css script.js` → `feat(2-3): 힌트 모드(오답 2개 제거, 0.5점)`.

### 태스크 2-4: 틀린 문제 다시 풀기 (연습 모드만)

**Files:** Modify: `index.html`, `script.js`

**Interfaces:**
- Produces: `startRetry()`, `#retry-btn`
- 변경: `startGame(category, mode, sourceQuestions, isRetry = false)` — `isRetry`가 false면 끝난 뒤 `state.firstScore = state.score`. `renderResult()`가 `state.isRetry`에 따라 두 형식을 표시.

- [ ] **Step 1:** `startRetry()` — 직전 판 `state.results`에서 `correct === false`인 id를 모아 원본 `QUESTIONS`에서 찾고 `startGame(state.category, "practice", wrongQuestions, true)`. 문항 순서·보기 순서 모두 다시 섞인다(`startGame`이 섞으므로).
- [ ] **Step 2:** 다시 풀기 판에서는 위쪽 진행도가 `1/n`이 되고, [결과 보기]는 n번째 문항에서 나온다.
- [ ] **Step 3:** 다시 풀기 결과 화면 — `"n문항 중 m개 맞힘"`, 처음 점수 `formatScore(state.firstScore)`를 "처음 점수"로 함께 표시, "순위표에 기록되지 않음".
- [ ] **Step 4:** `#retry-btn`은 `state.mode === "practice"`이고 이번 판에 틀린 문항이 1개 이상일 때만 보인다(스피드·힌트 결과에서는 숨김).
- [ ] **Step 5 (점검):** 확인 항목 2-D-1~2-D-5 통과, 콘솔 오류 없음.
- [ ] **Step 6 (커밋):** `git add index.html script.js` → `feat(2-4): 연습 모드 틀린 문제 다시 풀기`.

### 태스크 2-5: 마무리 점검

- [ ] **Step 1 (점검):** 아래 2단계 확인 항목 전체와 회귀 항목 2-E를 직접 돌려 보고, 1단계 항목 중 흐름이 바뀐 항목(1-B-1은 이제 모드 선택 화면을 거침)을 다시 확인한다. 시작 화면 안내 문구가 2단계용으로 바뀌었는지 본다.
- [ ] **Step 2 (커밋):** 이 점검에서 고친 것이 있을 때만 `fix(2-5): …`로 커밋한다. 고친 것이 없으면 커밋하지 않는다. 그 뒤 멈춘다.

## 2단계 완료 기준

- 시작 → 카테고리 → 모드 선택 → 문제 → 결과 흐름이 세 모드 모두 동작한다.
- 점수가 PRD 5.1 점수표와 정확히 일치한다.
- 콘솔 오류 0개. 1단계 확인 항목도 계속 통과(회귀 없음).

## 2단계 브라우저 확인 항목 (사용자가 직접)

**A. 모드 선택 화면**
- [ ] 2-A-1. 카테고리를 누르면 모드 카드 3개(연습·스피드·힌트)와 각 한 줄 설명이 보인다.
- [ ] 2-A-2. 연습 카드에 "순위표에 기록되지 않음"이 보인다.
- [ ] 2-A-3. [뒤로]를 누르면 시작 화면으로 돌아간다.

**B. 스피드 모드**
- [ ] 2-B-1. 남은 시간이 15부터 1초씩 줄고, 5초 이하에서 색이나 굵기가 바뀐다.
- [ ] 2-B-2. 15초 동안 아무것도 안 누르면 "시간 초과", 정답 보기 초록, 해설이 나오고 점수가 오르지 않는다.
- [ ] 2-B-3. 해설이 나와 있는 동안 남은 시간 숫자가 멈춰 있다. [다음]을 누르면 15부터 다시 센다.
- [ ] 2-B-4. 1초가 남았을 때 보기를 누르고 기다려도 "시간 초과"가 추가로 뜨지 않는다(한 번만 채점).
- [ ] 2-B-5. 문제 도중 [처음으로]를 누르고 20초 이상 기다린 뒤 다시 게임을 시작해도 이상한 "시간 초과"나 시간 겹침이 없다.

**C. 힌트 모드**
- [ ] 2-C-1. [힌트]를 누르면 보기 2개가 화면에서 사라지고 2개만 남으며, 남은 둘 중 하나가 정답이다.
- [ ] 2-C-2. 힌트를 쓴 뒤 [힌트] 버튼이 비활성화되고, 답을 고른 뒤에도 비활성화된다.
- [ ] 2-C-3. 힌트 쓰고 맞힘 → 점수 +0.5, 힌트 안 쓰고 맞힘 → +1, 틀림 → +0. 결과가 예: `8.5 / 10점` 형식으로 나온다.
- [ ] 2-C-4. 다음 문항으로 넘어가면 [힌트]가 다시 활성화되고 보기 4개가 모두 보인다.

**D. 틀린 문제 다시 풀기**
- [ ] 2-D-1. 연습 모드에서 일부러 3문제를 틀리면 결과 화면에 [틀린 문제 다시 풀기]가 보인다.
- [ ] 2-D-2. 누르면 그 3문제만 `1/3`부터 나오고, 순서·보기 순서가 처음과 다르다(몇 번 시도해 확인).
- [ ] 2-D-3. 다시 풀기 결과가 "3문항 중 m개 맞힘"으로 나오고, 처음 점수는 그대로 보이며, "순위표에 기록되지 않음"이 보인다.
- [ ] 2-D-4. 또 틀린 문제가 있으면 버튼이 다시 나오고, 모두 맞히면 버튼이 사라진다.
- [ ] 2-D-5. 연습 모드에서 10개 모두 맞히면 버튼이 없다. 스피드·힌트 결과 화면에는 틀려도 버튼이 없다.

**E. 회귀**
- [ ] 2-E-1. 1단계 항목 1-A-1~1-A-3, 1-B-2~1-B-8, 1-C-1~1-C-4가 그대로 통과한다.
- [ ] 2-E-2. 콘솔: `[scoreFor("hint", true, true), scoreFor("hint", true, false), scoreFor("hint", false, true), scoreFor("speed", true, false)]` → `[0.5, 1, 0, 1]`
- [ ] 2-E-3. 콘솔: `(() => { for (let i = 0; i < 100; i++) { const r = pickHintRemovals(2); if (r.length !== 2 || r.includes(2) || r[0] === r[1]) return false; } return true; })()` → `true`

> ⏸ **2단계 종료 — 여기서 멈춘다.** PRD 2장 기준 이번 과제 구현 범위는 여기까지다. 사용자가 확인 후 GitHub 업로드·Pages 배포를 원하면 그때 따로 진행하고(외부 게시이므로 사용자 요청 필요), **3단계는 사용자가 "3단계 진행"이라고 명시할 때만** 시작한다.

---

# 3단계: 점수 저장과 순위표

> PRD 2.1·9장은 3단계를 "계획만"으로 두고 순위표 화면·닉네임 입력 화면을 이번 과제에서 만들지 않는다고 적었다. 아래는 그 계획이며, 사용자가 3단계 진행을 결정하면 PRD 9장의 결정을 그대로 따른다. PRD에 없는 세부(★ 표시)는 3단계 시작 전에 사용자에게 확인받는다.

**만들 것:** localStorage 저장·읽기, 스피드·힌트 결과 화면의 닉네임 입력과 저장, 순위표 화면, 저장 불가 환경 안내.

### 태스크 3-1: 순위표 데이터 함수 (`script.js`)

**Interfaces:**
- Produces:
  - 상수 `LEADERBOARD_KEY = "quiz.leaderboard.v1"`
  - `leaderboardKey(mode, category) -> string` — 예: `"speed|한국사"`
  - `isStorageAvailable() -> boolean` — `try`로 테스트 키 쓰기·지우기
  - `loadLeaderboard() -> object` — 없거나 JSON 파싱 실패면 `{}`
  - `insertRecord(list, record) -> Record[]` — 점수 내림차순, 동점이면 `date`가 이른 기록이 위, 상위 5개만. 새 배열 반환.
  - `saveRecord(mode, category, nickname, score) -> boolean` — `mode`가 `"practice"`면 저장하지 않고 `false`. `date`는 `new Date().toISOString()`. 실패 시 `false`.
  - Record = `{ nickname, score, date }`

- [ ] **Step 1:** 위 함수를 구현한다. 모든 `localStorage` 접근은 `try/catch`.
- [ ] **Step 2 (점검):** 콘솔 확인 3-C-1~3-C-4가 모두 기대값.
- [ ] **Step 3 (커밋):** `git add script.js` → `feat(3-1): localStorage 순위표 데이터 함수`.

### 태스크 3-2: 결과 화면 닉네임 저장

**Interfaces:**
- Produces: `#save-form`, `#nickname-input`, `#save-btn`, `#save-message`

- [ ] **Step 1:** 스피드·힌트 모드 결과 화면에만 닉네임 입력 + [저장]을 표시(연습·다시 풀기 결과에는 없음).
- [ ] **Step 2:** ★ 닉네임 규칙: 앞뒤 공백 제거 후 1~10자. 비어 있으면 저장하지 않고 "닉네임을 입력하세요".
- [ ] **Step 3:** 저장 성공 시 "저장했습니다" + [저장] 비활성화(한 판에 한 번만 저장). `isStorageAvailable()`이 false면 입력칸 대신 "기록을 저장할 수 없음"만 표시.
- [ ] **Step 4 (점검):** 확인 항목 3-A-1~3-A-3, 3-D-1 통과, 콘솔 오류 없음.
- [ ] **Step 5 (커밋):** `git add index.html style.css script.js` → `feat(3-2): 결과 화면 닉네임 저장`.

### 태스크 3-3: 순위표 화면

**Interfaces:**
- Produces: `#screen-leaderboard`, `showScreen("leaderboard")`, `renderLeaderboard(mode, category)`

- [ ] **Step 1:** ★ 시작 화면에 [순위표] 버튼, 순위표 화면에서 모드(스피드·힌트) 2개 × 카테고리 4개 탭으로 표 하나씩 표시(총 8개). 열: 순위, 닉네임, 점수(`formatScore`), 날짜·시각(로컬 시간 `YYYY-MM-DD HH:mm`).
- [ ] **Step 2:** 기록이 없으면 "아직 기록이 없습니다". [처음으로]로 돌아간다. 닉네임은 `textContent`로 넣는다.
- [ ] **Step 3 (점검):** 확인 항목 3-B-1~3-B-6 통과, 1·2단계 회귀 항목(2-E) 통과, 콘솔 오류 없음.
- [ ] **Step 4 (커밋):** `git add index.html style.css script.js` → `feat(3-3): 모드×카테고리 순위표 화면`. 그 뒤 멈춘다.

## 3단계 완료 기준

- 스피드·힌트 기록만 모드 × 카테고리 8개 순위표에 저장되고, 새로고침·브라우저 재시작 뒤에도 남는다.
- 순위표마다 상위 5개, 동점은 먼저 세운 기록이 위.
- 저장 불가 환경에서도 앱이 멈추지 않는다. 1·2단계 확인 항목 회귀 없음.

## 3단계 브라우저 확인 항목 (사용자가 직접)

**A. 저장**
- [ ] 3-A-1. 스피드 모드 결과에서 닉네임을 넣고 [저장] → "저장했습니다", [저장]이 다시 눌리지 않는다.
- [ ] 3-A-2. 연습 모드 결과와 다시 풀기 결과에는 닉네임 입력칸이 없다.
- [ ] 3-A-3. 닉네임을 비우거나 공백만 넣으면 저장되지 않는다.

**B. 순위표**
- [ ] 3-B-1. 시작 화면 [순위표] → 스피드·한국사 표에 방금 기록이 닉네임·점수·날짜와 함께 보인다.
- [ ] 3-B-2. 힌트·한국사 표에는 그 기록이 없다(모드·카테고리별 분리).
- [ ] 3-B-3. 같은 표에 6번 저장하면 5개만 남고 가장 낮은 점수가 빠진다.
- [ ] 3-B-4. 같은 점수로 두 번 저장하면 먼저 저장한 기록이 위에 있다.
- [ ] 3-B-5. 새로고침(F5) 후에도 기록이 남아 있다.
- [ ] 3-B-6. 닉네임에 `<b>안녕</b>`을 넣고 저장하면 굵게가 아니라 글자 그대로 보인다.

**C. 콘솔 확인**
- [ ] 3-C-1. `insertRecord([{nickname:"a",score:9,date:"2026-10-08T01:00:00Z"}], {nickname:"b",score:9,date:"2026-10-08T02:00:00Z"}).map(r => r.nickname).join()` → `"a,b"`
- [ ] 3-C-2. `saveRecord("practice", "한국사", "x", 10)` → `false`, 그리고 `Object.keys(loadLeaderboard()).some(k => k.startsWith("practice"))` → `false`
- [ ] 3-C-3. `localStorage.setItem("quiz.leaderboard.v1", "깨진값"); loadLeaderboard()` → `{}` (확인 후 `localStorage.removeItem("quiz.leaderboard.v1")`)
- [ ] 3-C-4. F12 → Application → Local Storage에 키가 `quiz.leaderboard.v1` 하나뿐이다.

**D. 저장 불가 환경**
- [ ] 3-D-1. 브라우저 설정에서 사이트 데이터(쿠키) 저장을 차단하고 열면 결과 화면에 "기록을 저장할 수 없음"이 보이고, 퀴즈는 정상 진행된다. 확인 후 설정을 되돌린다.

> ⏸ **3단계 종료 — 여기서 멈추고** 사용자 확인을 기다린다.
