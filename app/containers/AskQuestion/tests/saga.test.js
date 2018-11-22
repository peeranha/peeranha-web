/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';
import { postQuestion } from 'utils/questionsManagement';
import { getProfileInfo } from 'utils/profileManagement';

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
}));

jest.mock('utils/profileManagement', () => ({
  getProfileInfo: jest.fn(),
}));

describe('postQuestionWorker', () => {
  const props = {
    user: 'user1',
    questionData: {},
    postButtonId: 'postButtonId',
    translations: {},
  };

  const generator = postQuestionWorker(props);

  const profileInfo = {};
  const eos = {
    getSelectedAccount: jest.fn().mockImplementation(() => props.user),
  };

  it('step1-1, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step1-2, profileInfo', () => {
    getProfileInfo.mockImplementation(() => profileInfo);
    const step = generator.next(eos);
    expect(step.value).toEqual(profileInfo);
  });

  it('step1-3, validation', () => {
    generator.next(profileInfo);
    expect(postQuestionValidator).toHaveBeenCalledWith(
      profileInfo,
      props.postButtonId,
      props.translations,
    );
  });

  it('step2, postQuestion', () => {
    postQuestion.mockImplementation(() => true);

    expect(postQuestion).toHaveBeenCalledTimes(0);
    generator.next(true);
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
