/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import { postQuestion } from 'utils/questionsManagement';

import defaultSaga, { askQuestionWorker } from '../saga';
import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  postQuestion: jest.fn().mockImplementation(data => data),
}));

describe('askQuestionWorker', () => {
  const props = {
    obj: {
      user: 'user1',
      questionData: {},
    },
  };
  const generator = askQuestionWorker(props);

  it('step1, eosService', () => {
    select.mockImplementation(() => props);
    const step1 = generator.next();
    expect(step1.value).toEqual(props);
  });

  it('step2, postQuestion', () => {
    postQuestion.mockImplementation(data => data);

    expect(postQuestion).toHaveBeenCalledTimes(0);
    generator.next();
    expect(postQuestion).toHaveBeenCalledTimes(1);
  });

  it('step3, askQuestionSuccess', () => {
    const step3 = generator.next();
    expect(step3.value.type).toBe(ASK_QUESTION_SUCCESS);
  });

  it('error handling', () => {
    const err = new Error('some error');
    const putDescriptor = generator.throw(err);
    expect(putDescriptor.value.type).toBe(ASK_QUESTION_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('ASK_QUESTION', () => {
    const step = generator.next();
    expect(step.value).toBe(ASK_QUESTION);
  });
});
