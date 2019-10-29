/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select, call } from 'redux-saga/effects';

import { getAnswer, editAnswer } from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { isValid } from 'containers/EosioProvider/saga';
import { getQuestionData } from 'containers/ViewQuestion/saga';

import defaultSaga, { getAnswerWorker, editAnswerWorker } from '../saga';

import {
  GET_ANSWER,
  GET_ANSWER_SUCCESS,
  GET_ANSWER_ERROR,
  EDIT_ANSWER,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_ERROR,
  EDIT_ANSWER_BUTTON,
  MIN_RATING_TO_EDIT_ANSWER,
  MIN_ENERGY_TO_EDIT_ANSWER,
} from '../constants';

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('containers/ViewQuestion/saga', () => ({
  getQuestionData: jest.fn(),
}));

jest.mock('containers/EosioProvider/saga', () => ({
  isValid: jest.fn(),
  isAuthorized: jest.fn(),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation((x, args) => x(args)),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getAnswer: jest.fn(),
  editAnswer: jest.fn(),
}));

describe('getAnswerWorker', () => {
  const answer = 'answer';
  const user = 'user1';
  const questionId = 'questionId';
  const answerId = 1;
  const questionData = {
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
    answerId,
  };

  const eos = {
    getSelectedAccount: jest.fn(),
  };

  eos.getSelectedAccount.mockImplementation(() => user);
  getQuestionData.mockImplementation(() => questionData);
  getAnswer.mockImplementation(() => answer);

  describe('answer`s author is current user', () => {
    const generator = getAnswerWorker(props);

    it('step, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('getSelectedAccount', () => {
      generator.next(eos);
      expect(call).toHaveBeenCalledWith(eos.getSelectedAccount);
    });

    it('step, getQuestionData', () => {
      const step = generator.next(user);
      expect(step.value).toEqual(questionData);
    });

    it('step, answer filtering', () => {
      const step = generator.next(questionData);
      expect(step.value).toEqual(questionData.answers[0]);
    });

    it('step, getAnswer', () => {
      const step = generator.next(questionData.answers[0]);
      expect(step.value).toBe(answer);
    });

    it('step, getAnswerSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(GET_ANSWER_SUCCESS);
    });
  });

  describe('answer`s author is NOT current user', () => {
    const generator = getAnswerWorker(props);
    const questionDataUpd = {
      answers: [
        {
          id: 1,
          ipfs_link: 'ipfs_link',
          user: 'user102021',
        },
      ],
    };

    generator.next();
    generator.next(eos);
    generator.next(user);
    generator.next(questionDataUpd);

    it('GET_ANSWER_ERROR', () => {
      const step = generator.next(questionDataUpd.answers[0]);
      expect(step.value.type).toBe(GET_ANSWER_ERROR);
    });

    it('createdHistory.push', () => {
      generator.next();
      expect(createdHistory.push).toHaveBeenCalledWith(routes.noAccess());
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

  const eos = {
    getSelectedAccount: jest.fn(),
  };

  const generator = editAnswerWorker(props);

  it('step, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('getSelectedAccount', () => {
    generator.next(eos);
    expect(call).toHaveBeenCalledWith(eos.getSelectedAccount);
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
      eos,
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
