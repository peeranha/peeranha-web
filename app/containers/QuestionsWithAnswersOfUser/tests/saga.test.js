/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { getAnswersPostedByUser } from 'utils/questionsManagement';

import defaultSaga, { getQuestionsWithAnswersWorker } from '../saga';

import { GET_QUESTIONS, GET_QUESTIONS_ERROR } from '../constants';
import { getQuestionsSuccess } from '../actions';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
  all: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getAnswersPostedByUser: jest.fn(),
  getQuestionById: jest.fn(),
}));

describe('getQuestionsWorker', () => {
  const eosService = {};
  const limit = 10;
  const questionsFromStore = [{ id: 1 }];
  const freshQuestions = [
    { id: 1, answers: [{ id: 1, user: 'user', rating: 10 }] },
  ];
  const answersId = [{ answer_id: 1 }, { answer_id: 2 }];

  const offset =
    (questionsFromStore[questionsFromStore.length - 1] &&
      +questionsFromStore[questionsFromStore.length - 1].id + 1) ||
    0;

  const userId = 'userId';

  const generator = getQuestionsWithAnswersWorker({ userId });

  it('step, questionsFromStore', () => {
    select.mockImplementation(() => questionsFromStore);
    const step = generator.next();
    expect(step.value).toEqual(questionsFromStore);
  });

  it('step, selectNumber', () => {
    select.mockImplementation(() => limit);
    const step = generator.next(questionsFromStore);
    expect(step.value).toEqual(limit);
  });

  it('step, eosService', () => {
    select.mockImplementation(() => eosService);
    const step = generator.next(limit);
    expect(step.value).toEqual(eosService);
  });

  it('getAnswersPostedByUser', () => {
    generator.next(eosService);
    expect(getAnswersPostedByUser).toHaveBeenCalledWith(
      eosService,
      userId,
      offset,
      limit,
    );
  });

  it('getQuestionById', () => {
    generator.next(answersId);
  });

  it('getQuestionsSuccess', () => {
    const step = generator.next(freshQuestions);
    expect(step.value).toEqual(getQuestionsSuccess(freshQuestions));
  });

  it('error handling', () => {
    const err = new Error('some err');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(GET_QUESTIONS_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_QUESTIONS', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_QUESTIONS);
  });
});
