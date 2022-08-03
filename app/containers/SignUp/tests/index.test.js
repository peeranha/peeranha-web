import { fromJS } from 'immutable';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { generateKeys } from 'utils/web_integration/src/util/eos-keygen';
import { generateMasterKey } from 'utils/web_integration/src/util/masterKeygen';

import { SignUp } from '../index';
import { EMAIL_FIELD } from '../constants';

jest.mock('utils/web_integration/src/util/eos-keygen', () => ({
  generateKeys: jest.fn(),
}));

jest.mock('utils/web_integration/src/util/masterKeygen', () => ({
  generateMasterKey: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

window.URL = {
  createObjectURL: jest.fn(),
};

const cmp = new SignUp();

beforeEach(() => {
  createdHistory.push.mockClear();
  generateKeys.mockClear();
  generateMasterKey.mockClear();
  window.URL.createObjectURL.mockClear();

  cmp.props = {
    locale: 'en',
    children: jest.fn(),
    showLoginModalDispatch: jest.fn(),
    checkEmailDispatch: jest.fn(),
    verifyEmailDispatch: jest.fn(),
    iHaveEosAccountDispatch: jest.fn(),
    idontHaveEosAccountDispatch: jest.fn(),
    signUpWithScatterDispatch: jest.fn(),
    emailChecking: false,
    emailVerificationProcessing: false,
    iHaveEosAccountProcessing: false,
    idontHaveEosAccountProcessing: false,
    signUpWithScatterProcessing: false,
    showScatterSignUpProcessing: false,
    showScatterSignUpFormDispatch: jest.fn(),
    account: 'account',
    email: 'email',
    withScatter: false,
    keys: {},
    putKeysToStateDispatch: jest.fn(),
  };
});

describe('SignUp', () => {
  it('getLinkToDownloadKeys', () => {
    const keys = { key1: 'key1', key2: 'key2' };

    const text = JSON.stringify({ keys });
    const data = new Blob([text], { type: 'text/plain' });

    cmp.getLinkToDownloadKeys();

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(data);
  });

  it('getAllKeys', async () => {
    const linkToDownloadAllKeys = 'getAllKeys';
    const keys = { activeKey: 1, ownerKey: 2 };

    generateKeys.mockImplementation(() => keys);
    window.URL.createObjectURL.mockImplementationOnce(
      () => linkToDownloadAllKeys,
    );

    await cmp.getAllKeys();

    expect(cmp.props.putKeysToStateDispatch).toHaveBeenCalledWith({
      activeKey: keys.activeKey,
      ownerKey: keys.ownerKey,
      linkToDownloadAllKeys,
    });
  });

  it('getMasterKey', () => {
    const masterKey = 'masterKey';
    const linkToDownloadMasterKey = 'getMasterKey';

    generateMasterKey.mockImplementation(() => masterKey);
    window.URL.createObjectURL.mockImplementationOnce(
      () => linkToDownloadMasterKey,
    );

    cmp.getMasterKey();

    expect(cmp.props.putKeysToStateDispatch).toHaveBeenCalledWith({
      masterKey,
      linkToDownloadMasterKey,
    });
  });

  describe('checkEmail', () => {
    it('with values', () => {
      const values = fromJS({
        [EMAIL_FIELD]: EMAIL_FIELD,
      });

      expect(cmp.props.checkEmailDispatch).toHaveBeenCalledTimes(0);
      cmp.checkEmail(values);

      expect(cmp.props.checkEmailDispatch).toHaveBeenCalledTimes(1);
      expect(cmp.props.checkEmailDispatch).toHaveBeenCalledWith(
        values.get(EMAIL_FIELD),
      );
    });

    it('without values', () => {
      const event = {};

      expect(cmp.props.checkEmailDispatch).toHaveBeenCalledTimes(0);
      cmp.checkEmail(event);

      expect(cmp.props.checkEmailDispatch).toHaveBeenCalledTimes(1);
      expect(cmp.props.checkEmailDispatch).toHaveBeenCalledWith(
        cmp.props.email,
      );
    });
  });

  describe('componentWillMount', () => {
    it('without @email in store', () => {
      cmp.props.email = null;
      cmp.props.withScatter = false;

      expect(createdHistory.push).toHaveBeenCalledTimes(0);
      cmp.componentWillMount();

      expect(createdHistory.push).toHaveBeenCalledTimes(1);
      expect(createdHistory.push).toHaveBeenCalledWith(
        routes.signup.email.name,
      );
    });

    it('with @email in store', () => {
      cmp.props.email = 'email';
      cmp.props.withScatter = true;

      expect(createdHistory.push).toHaveBeenCalledTimes(0);
      cmp.componentWillMount();
      expect(createdHistory.push).toHaveBeenCalledTimes(0);
    });

    it('without @keys in store', () => {
      cmp.props.keys = null;

      expect(cmp.props.putKeysToStateDispatch).toHaveBeenCalledTimes(0);
      cmp.componentWillMount();
      expect(cmp.props.putKeysToStateDispatch).toHaveBeenCalled();
    });

    it('with @keys in store', () => {
      cmp.props.keys = {};

      expect(cmp.props.putKeysToStateDispatch).toHaveBeenCalledTimes(0);
      cmp.componentWillMount();
      expect(cmp.props.putKeysToStateDispatch).toHaveBeenCalledTimes(0);
    });
  });
});
