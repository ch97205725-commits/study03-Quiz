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
