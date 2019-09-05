/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { fromJS } from 'immutable';
import { translationMessages } from 'i18n';
import { select } from 'redux-saga/effects';

import { sendEmail, sendMessage } from 'utils/homepageManagement';

import { ADD_TOAST } from 'containers/Toast/constants';

import defaultSaga, { sendEmailWorker, sendMessageWorker } from '../saga';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  EMAIL_FIELD,
  REFCODE_FIELD,
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
  sendEmail: jest.fn(),
  sendMessage: jest.fn(),
}));

describe('sendEmailWorker', () => {
  const locale = 'en';
  const email = 'email';
  const refCode = 'refCode';
  const formName = 'formName';

  const pageInfo = {
    url: window.location.href,
    name: `${translationMessages[locale][messages.title.id]}, ${formName}`,
  };

  const values = fromJS({
    [EMAIL_FIELD]: email,
    [REFCODE_FIELD]: refCode,
  });

  describe('success', () => {
    const reset = jest.fn();
    const val = [values, jest.fn(), { form: formName, reset }];

    const generator = sendEmailWorker({ val });

    it('step, locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('step, sendEmail calling', () => {
      generator.next(locale);
      expect(sendEmail).toHaveBeenCalledWith(
        {
          email,
          refCode,
        },
        pageInfo,
      );
    });

    it('step, reset calling', () => {
      expect(reset).toHaveBeenCalledTimes(0);
      generator.next();
      expect(reset).toHaveBeenCalledTimes(1);
    });

    it('step, addToast', () => {
      const step = generator.next();
      expect(step.value.type).toBe(ADD_TOAST);
    });

    it('step, SEND_EMAIL_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(SEND_EMAIL_SUCCESS);
    });

    it('step, ERROR', () => {
      const err = 'some error';
      const step1 = generator.throw(err);
      expect(step1.value.type).toBe(ADD_TOAST);

      const step2 = generator.next();
      expect(step2.value.type).toBe(SEND_EMAIL_ERROR);
    });
  });
});

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

    it('step, addToast', () => {
      const step = generator.next();
      expect(step.value.type).toBe(ADD_TOAST);
    });

    it('step, SEND_MESSAGE_SUCCESS', () => {
      const step = generator.next();
      expect(step.value.type).toBe(SEND_MESSAGE_SUCCESS);
    });

    it('step, ERROR', () => {
      const err = 'some error';
      const step1 = generator.throw(err);
      expect(step1.value.type).toBe(ADD_TOAST);

      const step2 = generator.next();
      expect(step2.value.type).toBe(SEND_MESSAGE_ERROR);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('SEND_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_EMAIL);
  });

  it('SEND_MESSAGE', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_MESSAGE);
  });
});
