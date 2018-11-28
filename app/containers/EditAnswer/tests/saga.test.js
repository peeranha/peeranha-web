/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  getQuestionData,
  getAnswer,
  editAnswer,
} from 'utils/questionsManagement';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import defaultSaga, { getAnswerWorker, editAnswerWorker } from '../saga';

import {
  GET_ANSWER,
  GET_ANSWER_SUCCESS,
  GET_ANSWER_ERROR,
  EDIT_ANSWER,
  EDIT_ANSWER_SUCCESS,
  EDIT_ANSWER_ERROR,
} from '../constants';

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  getQuestionData: jest.fn(),
  getAnswer: jest.fn(),
  editAnswer: jest.fn(),
}));

describe('getAnswerWorker', () => {
  const answer = 'answer';
  const user = 'user1';
  const questionid = 'questionid';
  const answerid = 1;
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
    questionid,
    answerid,
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

    it('step, getSelectedUser', () => {
      const step = generator.next(eos);
      expect(step.value).toBe(user);
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
      expect(createdHistory.push).toHaveBeenCalledWith(routes.no_access());
    });
  });
});

describe('editAnswerWorker', () => {
  const user = 'user1';
  const answer = 'answer';
  const questionid = 'questionid';
  const answerid = 1;

  const props = {
    answer,
    questionid,
    answerid,
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

  it('step, getSelectedAccount', () => {
    eos.getSelectedAccount.mockImplementation(() => user);
    const step = generator.next(eos);
    expect(step.value).toBe(user);
  });

  it('step, editAnswer', () => {
    generator.next(user);
    expect(editAnswer).toHaveBeenCalledWith(
      user,
      questionid,
      answerid,
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
      routes.question_view(questionid),
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
});
