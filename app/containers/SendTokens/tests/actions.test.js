import { fromJS } from 'immutable';

import {
  showSendTokensModal,
  hideSendTokensModal,
  sendTokens,
  sendTokensSuccess,
  sendTokensErr,
} from '../actions';

import {
  SHOW_SEND_TOKENS_MODAL,
  HIDE_SEND_TOKENS_MODAL,
  SEND_TOKENS,
  SEND_TOKENS_SUCCESS,
  SEND_TOKENS_ERROR,
} from '../constants';

describe('SendTokens actions', () => {
  it('showSendTokensModal', () => {
    const expected = {
      type: SHOW_SEND_TOKENS_MODAL,
    };

    expect(showSendTokensModal()).toEqual(expected);
  });

  it('hideSendTokensModal', () => {
    const expected = {
      type: HIDE_SEND_TOKENS_MODAL,
    };

    expect(hideSendTokensModal()).toEqual(expected);
  });

  it('sendTokens', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];

    const expected = {
      type: SEND_TOKENS,
      val: args[0].toJS(),
      resetForm: args[2].reset,
    };

    expect(sendTokens(...args)).toEqual(expected);
  });

  it('sendTokensSuccess', () => {
    const expected = {
      type: SEND_TOKENS_SUCCESS,
    };

    expect(sendTokensSuccess()).toEqual(expected);
  });

  it('sendTokensErr', () => {
    const sendTokensError = 'sendTokensError';
    const expected = {
      type: SEND_TOKENS_ERROR,
      sendTokensError,
    };

    expect(sendTokensErr(sendTokensError)).toEqual(expected);
  });
});
