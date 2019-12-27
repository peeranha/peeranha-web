import { fromJS } from 'immutable';

import homepageReducer from '../reducer';

import { sendMessage, sendMessageSuccess, sendMessageErr } from '../actions';

describe('homepageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(homepageReducer(state, {})).toEqual(state);
  });

  it('sendMessage', () => {
    const obj = state.set('sendMessageLoading', true);
    expect(homepageReducer(state, sendMessage())).toEqual(obj);
  });

  it('sendMessageSuccess', () => {
    const obj = state.set('sendMessageLoading', false);
    expect(homepageReducer(state, sendMessageSuccess())).toEqual(obj);
  });

  it('sendMessageErr', () => {
    const sendMessageError = 'sendMessageError';
    const obj = state
      .set('sendMessageLoading', false)
      .set('sendMessageError', sendMessageError);
    expect(homepageReducer(state, sendMessageErr(sendMessageError))).toEqual(
      obj,
    );
  });
});
