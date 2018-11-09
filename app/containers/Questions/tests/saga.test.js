/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import { getQuestions } from 'utils/questionsManagement';

import defaultSaga, { getQuestionsListWorker } from '../saga';
import {
  GET_QUESTIONS_LIST,
  GET_QUESTIONS_LIST_SUCCESS,
  GET_QUESTIONS_LIST_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getQuestions: jest.fn(),
}));

describe('getQuestionsListWorker', () => {
  const res = {
    limit: 10,
    offset: 10,
  };
  const eos = { id: 1 };
  const generator = getQuestionsListWorker(res);

  it('eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('getQuestions', () => {
    const questions = [];
    getQuestions.mockImplementation(() => questions);
    const step = generator.next(eos);

    expect(step.value).toEqual(questions);
  });

  it('GET_QUESTIONS_LIST_SUCCESS', () => {
    const step = generator.next();
    expect(step.value.type).toBe(GET_QUESTIONS_LIST_SUCCESS);
  });

  it('error handling', () => {
    const err = 'error';
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(GET_QUESTIONS_LIST_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_QUESTIONS_LIST', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_QUESTIONS_LIST);
  });
});
