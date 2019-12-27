/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { fromJS } from 'immutable';
import { translationMessages } from 'i18n';
import { select } from 'redux-saga/effects';

import { sendMessage } from 'utils/homepageManagement';

import {
  EMAIL_CHECKING,
  EMAIL_CHECKING_ERROR,
} from 'containers/SignUp/constants';

import defaultSaga, { sendMessageWorker } from '../saga';

import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  EMAIL_FIELD,
  NAME_FIELD,
  MESSAGE_FIELD,
  SUBJECT_FIELD,
} from '../constants';

import messages from '../messages';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/homepageManagement', () => ({
  sendMessage: jest.fn(),
}));

describe('sendMessageWorker', () => {
  const locale = 'en';
  const email = 'email';
  const formName = 'formName';
  const message = 'message';
  const name = 'name';
  const subject = 'subject';

  const pageInfo = {
    url: window.location.href,
    name: `${translationMessages[locale][messages.title.id]}, ${formName}`,
  };

  const values = fromJS({
    [EMAIL_FIELD]: email,
    [NAME_FIELD]: name,
    [MESSAGE_FIELD]: message,
    [SUBJECT_FIELD]: subject,
  });

  describe('success', () => {
    const reset = jest.fn();
    const val = [values, jest.fn(), { form: formName, reset }];

    const generator = sendMessageWorker({ val });

    it('step, locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('step, sendMessage calling', () => {
      generator.next(locale);
      expect(sendMessage).toHaveBeenCalledWith(
        {
          email,
          firstname: name,
          subject,
          message,
        },
        pageInfo,
      );
    });

    it('step, reset calling', () => {
      expect(reset).toHaveBeenCalledTimes(0);
      generator.next();
      expect(reset).toHaveBeenCalledTimes(1);
    });

    it('step, SEND_MESSAGE_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(SEND_MESSAGE_SUCCESS);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('SEND_MESSAGE', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_MESSAGE);
  });

  it('EMAIL_CHECKING', () => {
    const step = generator.next();
    expect(step.value).toBe(EMAIL_CHECKING);
  });

  it('SEND_MESSAGE_SUCCESS', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_MESSAGE_SUCCESS);
  });

  it('SEND_MESSAGE_ERROR', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_MESSAGE_ERROR);
  });

  it('EMAIL_CHECKING_ERROR', () => {
    const step = generator.next();
    expect(step.value).toBe(EMAIL_CHECKING_ERROR);
  });
});
