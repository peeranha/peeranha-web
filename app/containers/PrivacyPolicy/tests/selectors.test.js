import { fromJS } from 'immutable';

import {
  selectPrivacyPolicyDomain,
  selectPrivacyPolicy,
  selectPrivacyPolicyProcessing,
  selectPrivacyPolicyError,
} from '../selectors';

describe('selectLoginDomain', () => {
  const privacyPolicy = null;
  const getPrivacyPolicyProcessing = false;
  const getPrivacyPolicyError = null;

  const globalState = fromJS({
    privacyPolicy,
    getPrivacyPolicyProcessing,
    getPrivacyPolicyError,
  });

  const mockedState = fromJS({
    privacyPolicy: globalState,
  });

  it('should select the global state', () => {
    expect(selectPrivacyPolicyDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectPrivacyPolicy', () => {
    const isSelectPrivacyPolicy = selectPrivacyPolicy();
    expect(isSelectPrivacyPolicy(mockedState)).toEqual(privacyPolicy);
  });

  it('selectPrivacyPolicyProcessing', () => {
    const isSelectPrivacyPolicyProcessing = selectPrivacyPolicyProcessing();
    expect(isSelectPrivacyPolicyProcessing(mockedState)).toEqual(
      getPrivacyPolicyProcessing,
    );
  });

  it('selectPrivacyPolicyError', () => {
    const isSelectPrivacyPolicyError = selectPrivacyPolicyError();
    expect(isSelectPrivacyPolicyError(mockedState)).toEqual(
      getPrivacyPolicyError,
    );
  });
});
