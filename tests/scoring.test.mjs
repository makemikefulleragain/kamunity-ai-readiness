import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, DIMENSIONS } from '../src/data/questions.js';
import { calculateDimensionScores, calculateOverallScore, getBand, shouldShowSensitiveWarning, getTopRecommendations } from '../src/utils/scoring.js';

const all = value => Object.fromEntries(QUESTIONS.map(q => [q.id, value]));
test('question identifiers are unique and every dimension has questions', () => {
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size, QUESTIONS.length);
  for (const key of Object.keys(DIMENSIONS)) assert.ok(QUESTIONS.some(q => q.dimension === key));
});
for (const [value, expected] of [[1,0],[2,33],[3,67],[4,100]]) {
  test(`uniform answer ${value} yields ${expected} percent`, () => {
    const scores = calculateDimensionScores(all(value));
    assert.ok(Object.values(scores).every(score => score === expected));
    assert.equal(calculateOverallScore(scores), expected);
  });
}
test('empty and partially answered dimensions remain predictable', () => {
  assert.ok(Object.values(calculateDimensionScores({})).every(v => v === 0));
  assert.equal(calculateOverallScore({}), 0);
  const first = QUESTIONS[0];
  assert.equal(calculateDimensionScores({[first.id]:4})[first.dimension], 100);
});
for (const [score, expected] of [[0,'low'],[25,'low'],[26,'medLow'],[50,'medLow'],[51,'medHigh'],[75,'medHigh'],[76,'high'],[100,'high']]) {
  test(`band boundary ${score} is ${expected}`, () => assert.equal(getBand(score), expected));
}
test('a lowest safety answer triggers the sensitive-data warning', () => {
  const safe = all(4);
  assert.equal(shouldShowSensitiveWarning(safe), false);
  safe[QUESTIONS.find(q => q.dimension === 'safetyEthics').id] = 1;
  assert.equal(shouldShowSensitiveWarning(safe), true);
});
test('a lowest answer outside safety does not trigger that warning', () => {
  const answers = all(4);
  answers[QUESTIONS.find(q => q.dimension !== 'safetyEthics').id] = 1;
  assert.equal(shouldShowSensitiveWarning(answers), false);
});
test('recommendations prioritise lowest dimensions and respect the limit', () => {
  const scores = {understanding:75,currentUse:10,safetyEthics:50,readinessToAct:25};
  const before = structuredClone(scores);
  assert.deepEqual(getTopRecommendations(scores,2), [{dimension:'currentUse',band:'low'},{dimension:'readinessToAct',band:'low'}]);
  assert.deepEqual(scores,before);
});
test('repeat scoring leaves the input untouched', () => {
  const answers = all(3), before = structuredClone(answers);
  assert.deepEqual(calculateDimensionScores(answers),calculateDimensionScores(answers));
  assert.deepEqual(answers,before);
});
