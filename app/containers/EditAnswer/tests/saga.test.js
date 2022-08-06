/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, call } from 'redux-saga/effects';

import {
  getAnswer,
  editAnswer,
  getQuestionById,
} from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { isValid } from 'containers/EthereumProvider/saga';

import defaultSaga, { getAnswerWorker, editAnswerWorker } from '../saga';

import {
  GET_ANSWER,
  GET_ANSWER_ERROR,
  EDIT_ANSWER,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_ERROR,
  EDIT_ANSWER_BUTTON,
  MIN_RATING_TO_EDIT_ANSWER,
  MIN_ENERGY_TO_EDIT_ANSWER,
} from '../constants';

import { getAnswerSuccess } from '../actions';

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('containers/EthereumProvider/saga', () => ({
  isValid: jest.fn(),
  isAuthorized: jest.fn(),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, ...args) => x(...args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getAnswer: jest.fn(),
  editAnswer: jest.fn(),
  getQuestionById: jest.fn(),
}));

describe('getAnswerWorker', () => {
  const questionId = 'questionId';
  const answerId = 'answerId';

  const ethereum = {};

  describe('there is cached answer', () => {
    const generator = getAnswerWorker({ questionId, answerId });
    const cachedAnswer = { content: {} };

    it('step, ethereumService', () => {
      select.mockImplementation(() => ethereum);
      const step = generator.next();
      expect(step.value).toEqual(ethereum);
    });

    it('step, cachedAnswer', () => {
      select.mockImplementation(() => cachedAnswer);
      const step = generator.next(ethereum);
      expect(step.value).toEqual(cachedAnswer);
    });

    it('put to store', () => {
      const step = generator.next(cachedAnswer);
      expect(step.value).toEqual(getAnswerSuccess(cachedAnswer.content));
    });

    it('error handling', () => {
      const err = 'some err';
      const step = generator.throw(err);
      expect(step.value.type).toBe(GET_ANSWER_ERROR);
    });
  });

  describe('there is NO cached answer', () => {
    const generator = getAnswerWorker({ questionId, answerId });
    const cachedAnswer = null;
    const question = {
      ipfs_link: 'qwertyu1234',
      answers: [{ id: answerId, ipfs_link: 'sdsdsd' }],
    };
    const freshAnswer = {};

    const answer = question.answers.filter(x => x.id === answerId)[0];

    generator.next();
    generator.next(ethereum);

    it('call @getQuestionById', () => {
      generator.next(cachedAnswer);
      expect(getQuestionById).toHaveBeenCalledWith(ethereum, questionId);
    });

    it('call @getAnswer', () => {
      generator.next(question);
      expect(getAnswer).toHaveBeenCalledWith(answer.ipfs_link);
    });

    it('put to store', () => {
      const step = generator.next(freshAnswer);
      expect(step.value).toEqual(getAnswerSuccess(freshAnswer));
    });
  });
});

describe('editAnswerWorker', () => {
  const user = 'user1';
  const answer = 'answer';
  const questionId = 'questionId';
  const answerId = 1;

  const props = {
    answer,
    questionId,
    answerId,
  };

  const ethereum = {
    getSelectedAccount: jest.fn(),
  };

  const generator = editAnswerWorker(props);

  it('step, ethereumService', () => {
    select.mockImplementation(() => ethereum);
    const step = generator.next();
    expect(step.value).toEqual(ethereum);
  });

  it('getSelectedAccount', () => {
    generator.next(ethereum);
    expect(call).toHaveBeenCalledWith(ethereum.getSelectedAccount);
  });

  it('isValid', () => {
    generator.next(user);
    expect(call).toHaveBeenCalledWith(isValid, {
      buttonId: EDIT_ANSWER_BUTTON,
      minRating: MIN_RATING_TO_EDIT_ANSWER,
      minEnergy: MIN_ENERGY_TO_EDIT_ANSWER,
    });
  });

  it('step, editAnswer', () => {
    generator.next();
    expect(editAnswer).toHaveBeenCalledWith(
      user,
      questionId,
      answerId,
      answer,
      ethereum,
    );
  });

  it('editAnswerSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(EDIT_ANSWER_SUCCESS);
  });

  it('createdHistory.push', () => {
    generator.next();
    expect(createdHistory.push).toHaveBeenCalledWith(
      routes.questionView(questionId, answerId),
    );
  });

  it('GET_ANSWER_ERROR', () => {
    const err = 'error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(EDIT_ANSWER_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_ANSWER', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_ANSWER);
  });

  it('EDIT_ANSWER', () => {
    const step = generator.next();
    expect(step.value).toBe(EDIT_ANSWER);
  });

  it('EDIT_ANSWER_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toBe(EDIT_ANSWER_SUCCESS);
  });

  it('EDIT_ANSWER_ERROR', () => {
    const step = generator.next();
    expect(step.value).toBe(EDIT_ANSWER_ERROR);
  });
});
