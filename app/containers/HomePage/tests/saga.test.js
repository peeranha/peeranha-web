/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
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
  CLOSE_HEADER_POPUP,
} from '../constants';

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

  const formData = 'formData';
  const reset = jest.fn();
  const pageInfo = 'pageInfo';
  const obj = { formData, reset, pageInfo };

  describe('success', () => {
    const generator = sendEmailWorker(obj);

    it('step, locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('step, sendEmail calling', () => {
      const response = 'response';

      sendEmail.mockImplementation(() => response);
      const step = generator.next(locale);
      expect(step.value).toBe(response);
    });

    it('step, reset calling', () => {
      const response = 'resp';

      reset.mockImplementation(() => response);
      const step = generator.next();
      expect(step.value).toBe(response);
    });

    it('step, closeHeaderPopup', () => {
      const step = generator.next();
      expect(step.value.type).toBe(CLOSE_HEADER_POPUP);
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

  const formData = 'formData';
  const reset = jest.fn();
  const pageInfo = 'pageInfo';
  const obj = { formData, reset, pageInfo };

  describe('success', () => {
    const generator = sendMessageWorker(obj);

    it('step, locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('step, sendMessage calling', () => {
      const response = 'response';

      sendMessage.mockImplementation(() => response);
      const step = generator.next(locale);
      expect(step.value).toBe(response);
    });

    it('step, reset calling', () => {
      const response = 'resp';

      reset.mockImplementation(() => response);
      const step = generator.next();
      expect(step.value).toBe(response);
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
