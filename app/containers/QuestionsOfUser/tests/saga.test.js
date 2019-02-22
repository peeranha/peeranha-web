/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  getQuestionsPostedByUser,
  getQuestionData,
} from 'utils/questionsManagement';

import defaultSaga, { getQuestionsWorker } from '../saga';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
  all: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getQuestionsPostedByUser: jest.fn(),
  getQuestionData: jest.fn(),
}));

describe('getQuestionsWorker', () => {
  const eosService = {};
  const limit = 10;
  const questionsFromStore = [];
  const idOfQuestions = [{ question_id: 1 }];
  const questions = [
    {
      post_time: Date.now(),
      correct_answer_id: 1,
      rating: 100,
    },
  ];

  const offset =
    (questionsFromStore[questionsFromStore.length - 1] &&
      +questionsFromStore[questionsFromStore.length - 1].id + 1) ||
    0;

  const userId = 'userId';

  const generator = getQuestionsWorker({ userId });

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

  it('getQuestionsPostedByUser', () => {
    generator.next(eosService);
    expect(getQuestionsPostedByUser).toHaveBeenCalledWith(
      eosService,
      userId,
      offset,
      limit,
    );
  });

  it('getQuestionData', () => {
    generator.next(idOfQuestions);
    expect(getQuestionData).toHaveBeenCalledWith(
      eosService,
      idOfQuestions[0].question_id,
      userId,
    );
  });

  it('getQuestionData', () => {
    generator.next(questions);
    const step = generator.next(questions);
    expect(step.value.type).toBe(GET_QUESTIONS_SUCCESS);
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
