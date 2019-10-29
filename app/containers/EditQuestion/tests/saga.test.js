/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, call } from 'redux-saga/effects';

import { getAskedQuestion, editQuestion } from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { getQuestionData } from 'containers/ViewQuestion/saga';
import { isValid } from 'containers/EosioProvider/saga';

import defaultSaga, {
  getAskedQuestionWorker,
  editQuestionWorker,
} from '../saga';

import {
  GET_ASKED_QUESTION,
  GET_ASKED_QUESTION_SUCCESS,
  GET_ASKED_QUESTION_ERROR,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  EDIT_QUESTION_BUTTON,
  MIN_RATING_TO_EDIT_QUESTION,
  MIN_ENERGY_TO_EDIT_QUESTION,
} from '../constants';

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('containers/ViewQuestion/saga', () => ({
  getQuestionData: jest.fn(),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, args) => x(args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getAskedQuestion: jest.fn(),
  editQuestion: jest.fn(),
}));

jest.mock('containers/EosioProvider/saga', () => ({
  isValid: jest.fn(),
}));

describe('getAskedQuestionWorker', () => {
  const question = {};
  const user = 'user1';
  const questionId = 'questionId';
  const answerid = 1;
  const questionData = {
    user,
    ipfs_link: 'ipfs_link',
    answers: [
      {
        id: 1,
        ipfs_link: 'ipfs_link',
        user,
      },
    ],
  };

  const props = {
    user,
    questionId,
    answerid,
  };

  const eos = {
    getSelectedAccount: jest.fn(),
  };

  eos.getSelectedAccount.mockImplementation(() => user);
  getQuestionData.mockImplementation(() => questionData);
  getAskedQuestion.mockImplementation(() => question);

  describe('question`s author is current user', () => {
    const generator = getAskedQuestionWorker(props);

    it('step, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('step, getSelectedUser', () => {
      generator.next(eos);
      expect(call).toHaveBeenCalledWith(eos.getSelectedAccount);
    });

    it('step, getQuestionData', () => {
      const step = generator.next(user);
      expect(step.value).toEqual(questionData);
    });

    it('step, getAskedQuestion', () => {
      const step = generator.next(questionData);
      expect(step.value).toBe(question);
    });

    it('step, getAskedQuestionSuccess', () => {
      const step = generator.next(question);
      expect(step.value.type).toBe(GET_ASKED_QUESTION_SUCCESS);
    });

    it('error handling', () => {
      const err = 'some err';
      const step = generator.throw(err);
      expect(step.value.type).toBe(GET_ASKED_QUESTION_ERROR);
    });
  });

  describe('answer`s author is NOT current user', () => {
    const generator = getAskedQuestionWorker(props);
    const questionDataUpd = {
      user: 'user93939',
      ipfs_link: 'ipfs_link',
      answers: [
        {
          id: 1,
          ipfs_link: 'ipfs_link',
          user,
        },
      ],
    };

    generator.next();
    generator.next(eos);
    generator.next(user);

    it('getAskedQuestionErr', () => {
      const step = generator.next(questionDataUpd);
      expect(step.value.type).toBe(GET_ASKED_QUESTION_ERROR);
    });

    it('createdHistory.push', () => {
      generator.next();
      expect(createdHistory.push).toHaveBeenCalledWith(routes.noAccess());
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
