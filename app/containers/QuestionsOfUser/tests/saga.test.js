/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  getQuestionsPostedByUser,
  getQuestionById,
} from 'utils/questionsManagement';

import defaultSaga, { getQuestionsWorker } from '../saga';

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
  getQuestionsPostedByUser: jest.fn(),
  getQuestionById: jest.fn(),
}));

describe('getQuestionsWorker', () => {
  const ethereumService = {};
  const limit = 10;
  const questionsFromStore = [{ id: 1 }];
  const freshQuestions = [{ id: 1, answers: [{ id: 1, user: 'user' }] }];
  const idOfQuestions = [{ question_id: 1 }];

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

  it('step, ethereumService', () => {
    select.mockImplementation(() => ethereumService);
    const step = generator.next(limit);
    expect(step.value).toEqual(ethereumService);
  });

  it('getQuestionsPostedByUser', () => {
    generator.next(ethereumService);
    expect(getQuestionsPostedByUser).toHaveBeenCalledWith(
      ethereumService,
      userId,
      offset,
      limit,
    );
  });

  it('getQuestionById', () => {
    generator.next(idOfQuestions);
    expect(getQuestionById).toHaveBeenCalledWith(
      ethereumService,
      idOfQuestions[0].question_id,
      userId,
    );
  });

  it('get user profiles', () => {
    generator.next(freshQuestions);
  });

  it('getQuestionsSuccess', () => {
    const step = generator.next();
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
