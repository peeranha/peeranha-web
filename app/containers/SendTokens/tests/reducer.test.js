import { fromJS } from 'immutable';
import sendTokensReducer from '../reducer';

import {
  sendTokens,
  sendTokensSuccess,
  sendTokensErr,
  showSendTokensModal,
  hideSendTokensModal,
} from '../actions';

describe('sendTokensReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(sendTokensReducer(state, {})).toEqual(state);
  });

  it('showSendTokensModal', () => {
    const obj = state.set('showModal', true);
    expect(sendTokensReducer(state, showSendTokensModal())).toEqual(obj);
  });

  it('hideSendTokensModal', () => {
    const obj = state.set('showModal', false);
    expect(sendTokensReducer(state, hideSendTokensModal())).toEqual(obj);
  });

  it('sendTokens', () => {
    const args = [fromJS({}), () => null, { reset: jest.fn() }];
    const obj = state.set('sendTokensProcessing', true);

    expect(sendTokensReducer(state, sendTokens(...args))).toEqual(obj);
  });

  it('sendTokensSuccess', () => {
    const obj = state.set('sendTokensProcessing', false);
    expect(sendTokensReducer(state, sendTokensSuccess())).toEqual(obj);
  });

  it('sendTokensErr', () => {
    const sendTokensError = 'sendTokensError';
    const obj = state
      .set('sendTokensProcessing', false)
      .set('sendTokensError', sendTokensError);

    expect(sendTokensReducer(state, sendTokensErr(sendTokensError))).toEqual(
      obj,
    );
  });
});
