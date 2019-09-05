/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { getPrivacyPolicy } from 'utils/privacyPolicyManagement';

import defaultSaga, { getPrivacyPolicyWorker } from '../saga';

import {
  GET_PRIVACY_POLICY,
  GET_PRIVACY_POLICY_SUCCESS,
  GET_PRIVACY_POLICY_ERROR,
} from '../constants';

jest.mock('utils/privacyPolicyManagement', () => ({
  getPrivacyPolicy: jest.fn(),
}));

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

describe('getPrivacyPolicyWorker', () => {
  const locale = 'en';
  const privacyPolicy = {};

  const generator = getPrivacyPolicyWorker();

  it('select @locale', () => {
    select.mockImplementation(() => locale);
    const step = generator.next();
    expect(step.value).toEqual(locale);
  });

  it('call @getPrivacyPolicy', () => {
    generator.next(locale);
    expect(getPrivacyPolicy).toHaveBeenCalledWith(locale);
  });

  it('put @privacyPolicy', () => {
    const step = generator.next(privacyPolicy);
    expect(step.value.privacyPolicy).toEqual(privacyPolicy);
    expect(step.value.type).toBe(GET_PRIVACY_POLICY_SUCCESS);
  });

  it('error handling', () => {
    const err = 'error';
    const step = generator.throw(err);
    expect(step.value.type).toBe(GET_PRIVACY_POLICY_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_PRIVACY_POLICY', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_PRIVACY_POLICY);
  });
});
