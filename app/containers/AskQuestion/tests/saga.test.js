/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  postQuestion,
  getQuestionsPostedByUser,
} from 'utils/questionsManagement';

import createdHistory from 'createdHistory';

import { SHOW_LOGIN_MODAL } from 'containers/Login/constants';
import { ADD_TOAST } from 'containers/Toast/constants';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import defaultSaga, { postQuestionWorker } from '../saga';

import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
} from '../constants';

import { postQuestionValidator } from '../validate';

jest.mock('../validate', () => ({
  postQuestionValidator: jest.fn(),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/questionsManagement', () => ({
  postQuestion: jest.fn().mockImplementation(() => true),
  getQuestionsPostedByUser: jest.fn().mockImplementation(() => true),
}));

jest.mock('containers/DataCacheProvider/saga', () => ({
  getUserProfileWorker: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

describe('postQuestionWorker', () => {
  const props = {
    user: 'user1',
    questionData: {},
    postButtonId: 'postButtonId',
    translations: {},
  };

  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => props.user),
  };

  describe('profileInfo is true', () => {
    const generator = postQuestionWorker(props);
    const profileInfo = {};

    it('step, eosService', () => {
      select.mockImplementation(() => eos);
      const step = generator.next();
      expect(step.value).toEqual(eos);
    });

    it('step, profileInfo', () => {
      getUserProfileWorker.mockImplementation(() => profileInfo);
      const step = generator.next(eos);
      expect(step.value).toEqual(profileInfo);
    });

    it('step, validation', () => {
      generator.next(profileInfo);
      expect(postQuestionValidator).toHaveBeenCalledWith(
        profileInfo,
        props.postButtonId,
        props.translations,
      );
    });

    it('step, postQuestion', () => {
      postQuestion.mockImplementation(() => true);

      expect(postQuestion).toHaveBeenCalledTimes(0);
      generator.next(true);
      expect(postQuestion).toHaveBeenCalledTimes(1);
    });

    it('step, askQuestionSuccess', () => {
      const step = generator.next();
      expect(step.value.type).toBe(ASK_QUESTION_SUCCESS);
    });

    it('step, getQuestionsPostedByUser', () => {
      generator.next();
      expect(getQuestionsPostedByUser).toHaveBeenCalledWith(eos, props.user);
    });

    it('step, push to question page', () => {
      const questionId = '102003';
      const questionsPostedByUser = [{ question_id: questionId }];

      generator.next(questionsPostedByUser);
      expect(createdHistory.push).toHaveBeenCalledWith(questionId);
    });
  });

  describe('profileInfo false => showLoginModal', () => {
    const generator = postQuestionWorker(props);
    const profileInfo = null;

    getUserProfileWorker.mockImplementation(() => profileInfo);

    generator.next();
    generator.next();

    it('showLoginModal', () => {
      const showLoginModal = generator.next(profileInfo);
      expect(showLoginModal.value.type).toBe(SHOW_LOGIN_MODAL);
    });

    it('error handling', () => {
      const err = new Error('some error');
      const step = generator.throw(err);
      expect(step.value.type).toBe(ASK_QUESTION_ERROR);
    });
  });

  describe('validation is falsy', () => {
    const generator = postQuestionWorker(props);
    const profileInfo = {};
    const isValid = false;

    getUserProfileWorker.mockImplementation(() => profileInfo);
    postQuestionValidator.mockImplementation(() => isValid);

    generator.next();
    generator.next();
    generator.next(profileInfo);

    it('test', () => {
      const step = generator.next(isValid);
      expect(step.value.type).toBe(ASK_QUESTION_ERROR);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('ASK_QUESTION', () => {
    const step = generator.next();
    expect(step.value).toBe(ASK_QUESTION);
  });
});
