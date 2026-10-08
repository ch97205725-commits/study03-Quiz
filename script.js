"use strict";

// ─────────────────────────────────────────────────────
// 상수
// ─────────────────────────────────────────────────────
const CATEGORIES = ["한국사", "세계지리", "과학", "예술과 문화"];
const QUESTIONS_PER_CATEGORY = 10;
const MAX_SCORE = 10;

// ─────────────────────────────────────────────────────
// 순수 함수: 섞기, 문항 준비, 채점, 점수 표시
// ─────────────────────────────────────────────────────

// Fisher–Yates. 원본을 바꾸지 않고 새 배열을 돌려준다.
function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 보기를 섞고, 정답은 인덱스가 아니라 보기 내용으로 따라가 answerIndex를 다시 계산한다.
function prepareQuestion(q) {
  const correctText = q.choices[q.answer];
  const choices = shuffle(q.choices);
  return {
    id: q.id,
    category: q.category,
    question: q.question,
    choices: choices,
    answerIndex: choices.indexOf(correctText),
    explanation: q.explanation,
    source: q.source
  };
}

function getQuestionsByCategory(category) {
  return QUESTIONS.filter((q) => q.category === category);
}

// 틀림 0점, 힌트 모드에서 힌트를 쓰고 맞힘 0.5점, 나머지 맞힘 1점.
function scoreFor(mode, isCorrect, usedHint) {
  if (!isCorrect) return 0;
  if (mode === "hint" && usedHint) return 0.5;
  return 1;
}

function formatScore(score) {
  return score + " / " + MAX_SCORE + "점";
}

// ─────────────────────────────────────────────────────
// 문항 데이터 점검 (PRD 8.7). 콘솔에서 validateQuestions() 로 실행한다.
// ─────────────────────────────────────────────────────
function validateQuestions(questions = QUESTIONS) {
  const errors = [];
  const isBlank = (value) => typeof value !== "string" || value.trim() === "";

  CATEGORIES.forEach((category) => {
    const count = questions.filter((q) => q.category === category).length;
    if (count !== QUESTIONS_PER_CATEGORY) {
      errors.push(category + ": 문항이 " + count + "개 (" + QUESTIONS_PER_CATEGORY + "개여야 함)");
    }
  });

  const seenIds = new Set();
  questions.forEach((q) => {
    const id = q.id || "(id 없음)";
    if (seenIds.has(q.id)) errors.push(id + ": id 중복");
    seenIds.add(q.id);

    if (!CATEGORIES.includes(q.category)) errors.push(id + ": 알 수 없는 카테고리 " + q.category);
    if (!Array.isArray(q.choices) || q.choices.length !== 4) {
      errors.push(id + ": 보기가 4개가 아님");
    } else if (new Set(q.choices).size !== 4) {
      errors.push(id + ": 보기 중복");
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errors.push(id + ": answer가 0~3이 아님");
    if (isBlank(q.question)) errors.push(id + ": 문제 문장이 비어 있음");
    if (isBlank(q.explanation)) errors.push(id + ": 해설이 비어 있음");
    if (!q.source || isBlank(q.source.name)) errors.push(id + ": 출처 이름이 비어 있음");
    if (!q.source || isBlank(q.source.url)) errors.push(id + ": 출처 URL이 비어 있음");
  });

  errors.forEach((message) => console.warn("[문항 점검] " + message));
  console.log("[문항 점검] " + questions.length + "문항, 오류 " + errors.length + "개");
  return { ok: errors.length === 0, errors: errors };
}

// ─────────────────────────────────────────────────────
// 상태
// ─────────────────────────────────────────────────────
const SPEED_SECONDS = 15;
const URGENT_SECONDS = 5;
const MODE_LABELS = { practice: "연습", speed: "스피드", hint: "힌트" };
const NOT_RECORDED_TEXT = "순위표에 기록되지 않음";

const state = {
  category: null,
  mode: "practice",
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  results: [],
  timeLeft: SPEED_SECONDS,
  timerId: null
};

// ─────────────────────────────────────────────────────
// 화면 전환과 렌더링
// ─────────────────────────────────────────────────────
const SCREENS = ["start", "mode", "quiz", "result"];

function $(id) {
  return document.getElementById(id);
}

function showScreen(name) {
  stopTimer();
  SCREENS.forEach((screen) => {
    $("screen-" + screen).hidden = screen !== name;
  });
  window.scrollTo(0, 0);
}

function modeLabel(mode) {
  return MODE_LABELS[mode];
}

function showModeSelect(category) {
  state.category = category;
  $("mode-category").textContent = category;
  showScreen("mode");
}

function startGame(category, mode, sourceQuestions) {
  state.category = category;
  state.mode = mode;
  state.questions = shuffle(sourceQuestions).map(prepareQuestion);
  state.index = 0;
  state.score = 0;
  state.answered = false;
  state.results = [];
  showScreen("quiz");
  renderQuestion();
}

// ─────────────────────────────────────────────────────
// 스피드 모드 타이머
// ─────────────────────────────────────────────────────
function stopTimer() {
  if (state.timerId !== null) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function renderTimer() {
  const timer = $("timer");
  timer.textContent = "남은 시간 " + state.timeLeft + "초";
  timer.classList.toggle("urgent", state.timeLeft <= URGENT_SECONDS);
}

function startTimer() {
  stopTimer();
  state.timeLeft = SPEED_SECONDS;
  renderTimer();
  state.timerId = setInterval(() => {
    if (state.answered) {
      stopTimer();
      return;
    }
    state.timeLeft -= 1;
    renderTimer();
    if (state.timeLeft <= 0) handleAnswer(-1);
  }, 1000);
}

function renderMeta() {
  $("meta-category").textContent = state.category;
  $("meta-mode").textContent = modeLabel(state.mode) + " 모드";
  $("meta-progress").textContent = (state.index + 1) + "/" + state.questions.length;
  $("meta-score").textContent = "점수 " + state.score;
}

function renderQuestion() {
  const q = state.questions[state.index];
  state.answered = false;

  renderMeta();
  $("quiz-question").textContent = q.question;

  const choicesEl = $("choices");
  choicesEl.replaceChildren();
  q.choices.forEach((choice, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = choice;
    button.addEventListener("click", () => handleAnswer(i));
    choicesEl.appendChild(button);
  });

  const feedback = $("feedback");
  feedback.textContent = "";
  feedback.className = "feedback";
  $("explanation").hidden = true;
  $("next-btn").hidden = true;

  $("timer").hidden = state.mode !== "speed";
  if (state.mode === "speed") {
    startTimer();
  } else {
    stopTimer();
  }
}

// choiceIndex: 고른 보기(0~3). -1은 고른 보기 없이 끝난 경우(2단계 시간 초과).
function handleAnswer(choiceIndex) {
  if (state.answered) return;
  state.answered = true;
  stopTimer();

  const q = state.questions[state.index];
  const isCorrect = choiceIndex === q.answerIndex;
  const points = scoreFor(state.mode, isCorrect, false);

  const buttons = $("choices").querySelectorAll(".choice-btn");
  buttons.forEach((button) => {
    button.disabled = true;
  });
  buttons[q.answerIndex].classList.add("correct");
  if (!isCorrect && choiceIndex >= 0) buttons[choiceIndex].classList.add("wrong");

  const feedback = $("feedback");
  const timedOut = choiceIndex === -1;
  feedback.textContent = isCorrect ? "정답!" : timedOut ? "시간 초과" : "오답";
  feedback.className = "feedback " + (isCorrect ? "is-correct" : "is-wrong");

  $("explanation-text").textContent = q.explanation;
  const link = $("source-link");
  link.textContent = q.source.name;
  link.href = q.source.url;
  $("explanation").hidden = false;

  state.score += points;
  state.results.push({ id: q.id, question: q.question, correct: isCorrect, points: points });
  renderMeta();

  const nextBtn = $("next-btn");
  nextBtn.textContent = state.index === state.questions.length - 1 ? "결과 보기" : "다음";
  nextBtn.hidden = false;
}

function nextQuestion() {
  if (!state.answered) return;
  if (state.index < state.questions.length - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    renderResult();
    showScreen("result");
  }
}

function renderResult() {
  $("result-score").textContent = formatScore(state.score);
  $("result-notice").textContent = state.mode === "practice" ? "연습 모드는 " + NOT_RECORDED_TEXT : "";
  $("result-notice").hidden = state.mode !== "practice";

  const summary = $("result-summary");
  summary.replaceChildren();
  state.results.forEach((result) => {
    const item = document.createElement("li");
    const mark = document.createElement("span");
    mark.className = result.correct ? "mark-correct" : "mark-wrong";
    mark.textContent = result.correct ? "○ 맞힘" : "× 틀림";
    item.append(mark, " " + result.question);
    summary.appendChild(item);
  });
}

// ─────────────────────────────────────────────────────
// 시작
// ─────────────────────────────────────────────────────
function hasQuestionData() {
  return typeof QUESTIONS !== "undefined" && Array.isArray(QUESTIONS) && QUESTIONS.length > 0;
}

function init() {
  const categoryButtons = $("category-buttons").querySelectorAll(".category-btn");

  if (!hasQuestionData()) {
    $("data-error").hidden = false;
    categoryButtons.forEach((button) => {
      button.disabled = true;
    });
    return;
  }

  validateQuestions();

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => showModeSelect(button.dataset.category));
  });
  $("screen-mode").querySelectorAll(".mode-card").forEach((card) => {
    card.addEventListener("click", () => {
      startGame(state.category, card.dataset.mode, getQuestionsByCategory(state.category));
    });
  });
  $("mode-back-btn").addEventListener("click", () => showScreen("start"));
  $("next-btn").addEventListener("click", nextQuestion);
  $("quiz-home-btn").addEventListener("click", () => showScreen("start"));
  $("result-home-btn").addEventListener("click", () => showScreen("start"));
}

init();
