/* eslint redux-saga/yield-effects: 0, no-underscore-dangle: 0 */
import { select, call } from 'redux-saga/effects';

import {
  postQuestion,
  getQuestionsPostedByUser,
} from 'utils/questionsManagement';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
} from 'components/QuestionForm/constants';

import defaultSaga, {
  postQuestionWorker,
  checkReadinessWorker,
  redirectToAskQuestionPageWorker,
} from '../saga';

import {
  ASK_QUESTION,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_ERROR,
  MIN_RATING_TO_POST_QUESTION,
  MIN_ENERGY_TO_POST_QUESTION,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('containers/EosioProvider/saga', () => ({
  isAuthorized: jest.fn(),
  isValid: jest.fn(),
}));

jest.mock('utils/questionsManagement', () => ({
  postQuestion: jest.fn().mockImplementation(() => true),
  getQuestionsPostedByUser: jest.fn().mockImplementation(() => true),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

describe('postQuestionWorker', () => {
  const selectedAccount = 'selectedAccount';
  const eos = {};

  const val = {
    [FORM_TITLE]: 'title',
    [FORM_CONTENT]: 'content',
    [FORM_COMMUNITY]: 'community',
    [FORM_TAGS]: 'tags',
  };

  const generator = postQuestionWorker({ val });

  it('step, eosService', () => {
    select.mockImplementation(() => eos);
    const step = generator.next();
    expect(step.value).toEqual(eos);
  });

  it('step, selectedAccount', () => {
    select.mockImplementation(() => selectedAccount);
    const step = generator.next(eos);
    expect(step.value).toEqual(selectedAccount);
  });

  it('step, checkReadinessWorker', () => {
    call.mockImplementationOnce((x, args) => x(args));

    const step = generator.next(selectedAccount);
    expect(typeof step.value._invoke).toBe('function');
  });

  it('step, postQuestion', () => {
    postQuestion.mockImplementation(() => true);

    generator.next();
    expect(postQuestion).toHaveBeenCalledWith(
      selectedAccount,
      {
        title: val[FORM_TITLE],
        content: val[FORM_CONTENT],
        community: val[FORM_COMMUNITY],
        chosenTags: val[FORM_TAGS],
      },
      eos,
    );
  });

  it('step, askQuestionSuccess', () => {
    const step = generator.next();
    expect(step.value.type).toBe(ASK_QUESTION_SUCCESS);
  });

  it('step, getQuestionsPostedByUser', () => {
    generator.next();
    expect(getQuestionsPostedByUser).toHaveBeenCalledWith(eos, selectedAccount);
  });

  it('step, push to question page', () => {
    const questionId = '102003';
    const questionsPostedByUser = [{ question_id: questionId }];

    generator.next(questionsPostedByUser);
    expect(createdHistory.push).toHaveBeenCalledWith(questionId);
  });

  it('handling error', () => {
    const err = new Error('Some error');
    const putDescriptor = generator.throw(err).value;
    expect(putDescriptor.type).toEqual(ASK_QUESTION_ERROR);
  });
});

describe('checkReadinessWorker', () => {
  const buttonId = 'buttonId';

  const generator = checkReadinessWorker({ buttonId });

  it('isAuthorized', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(isAuthorized);
  });

  it('isValid', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(isValid, {
      buttonId,
      minRating: MIN_RATING_TO_POST_QUESTION,
      minEnergy: MIN_ENERGY_TO_POST_QUESTION,
    });
  });
});

describe('redirectToAskQuestionPageWorker', () => {
  const buttonId = 'buttonId';

  const generator = redirectToAskQuestionPageWorker({ buttonId });

  call.mockImplementationOnce((x, args) => x(args));

  it('step, checkReadinessWorker', () => {
    call.mockImplementationOnce((x, args) => x(args));

    const step = generator.next();
    expect(typeof step.value._invoke).toBe('function');
  });

  it('redirect', () => {
    generator.next();
    expect(call).toHaveBeenCalledWith(
      createdHistory.push,
      routes.questionAsk(),
    );
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('ASK_QUESTION', () => {
    const step = generator.next();
    expect(step.value).toBe(ASK_QUESTION);
  });

  it('ASK_QUESTION_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toBe(ASK_QUESTION_SUCCESS);
  });

  it('ASK_QUESTION_ERROR', () => {
    const step = generator.next();
    expect(step.value).toBe(ASK_QUESTION_ERROR);
  });
});
