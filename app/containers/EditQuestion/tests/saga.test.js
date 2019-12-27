/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, call } from 'redux-saga/effects';

import {
  getAskedQuestion,
  editQuestion,
  getQuestionById,
} from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { isValid } from 'containers/EosioProvider/saga';

import defaultSaga, {
  getAskedQuestionWorker,
  editQuestionWorker,
} from '../saga';

import {
  GET_ASKED_QUESTION,
  GET_ASKED_QUESTION_ERROR,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  EDIT_QUESTION_BUTTON,
  MIN_RATING_TO_EDIT_QUESTION,
  MIN_ENERGY_TO_EDIT_QUESTION,
} from '../constants';

import { getAskedQuestionSuccess } from '../actions';

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, ...args) => x(...args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getAskedQuestion: jest.fn(),
  editQuestion: jest.fn(),
  getQuestionById: jest.fn(),
}));

jest.mock('containers/EosioProvider/saga', () => ({
  isValid: jest.fn(),
}));

describe('getAskedQuestionWorker', () => {
  const questionId = 'questionId';

  const eos = {};

  describe('there is cached question', () => {
    const generator = getAskedQuestionWorker({ questionId });
    const cachedQuestion = { content: {} };

    it('step, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('step, cachedQuestion', () => {
      select.mockImplementation(() => cachedQuestion);
      const step = generator.next(eos);
      expect(step.value).toEqual(cachedQuestion);
    });

    it('put to store', () => {
      const step = generator.next(cachedQuestion);
      expect(step.value).toEqual(
        getAskedQuestionSuccess(cachedQuestion.content),
      );
    });

    it('error handling', () => {
      const err = 'some err';
      const step = generator.throw(err);
      expect(step.value.type).toBe(GET_ASKED_QUESTION_ERROR);
    });
  });

  describe('there is NO cached question', () => {
    const generator = getAskedQuestionWorker({ questionId });
    const cachedQuestion = null;
    const question = { ipfs_link: 'qwertyu1234' };
    const freshQuestion = {};

    generator.next();
    generator.next(eos);

    it('call @getQuestionById', () => {
      generator.next(cachedQuestion);
      expect(getQuestionById).toHaveBeenCalledWith(eos, questionId);
    });

    it('call @getAskedQuestion', () => {
      generator.next(question);
      expect(getAskedQuestion).toHaveBeenCalledWith(question.ipfs_link, eos);
    });

    it('put to store', () => {
      const step = generator.next(freshQuestion);
      expect(step.value).toEqual(getAskedQuestionSuccess(freshQuestion));
    });
  });
});

describe('editQuestionWorker', () => {
  const user = 'user1';
  const question = {};
  const questionId = 'questionId';

  const props = {
    question,
    questionId,
  };

  const eos = {
    getSelectedAccount: jest.fn(),
  };

  const generator = editQuestionWorker(props);

  it('step, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step, getSelectedUser', () => {
    generator.next(eos);
    expect(call).toHaveBeenCalledWith(eos.getSelectedAccount);
  });

  it('isValid', () => {
    generator.next(user);
    expect(call).toHaveBeenCalledWith(isValid, {
      buttonId: EDIT_QUESTION_BUTTON,
      minRating: MIN_RATING_TO_EDIT_QUESTION,
      minEnergy: MIN_ENERGY_TO_EDIT_QUESTION,
    });
  });

  it('step, editQuestion', () => {
    generator.next();
    expect(editQuestion).toHaveBeenCalledWith(user, questionId, question, eos);
  });

  it('editQuestionSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(EDIT_QUESTION_SUCCESS);
  });

  it('createdHistory.push', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(
      routes.questionView(questionId),
    );
  });

  it('EDIT_QUESTION_ERROR', () => {
    const err = 'error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(EDIT_QUESTION_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_ASKED_QUESTION', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_ASKED_QUESTION);
  });

  it('EDIT_QUESTION', () => {
    const step = generator.next();
    expect(step.value).toBe(EDIT_QUESTION);
  });
});
