import { fromJS } from 'immutable';

import homepageReducer from '../reducer';

import {
  sendEmail,
  sendEmailSuccess,
  sendEmailErr,
  sendMessage,
  sendMessageSuccess,
  sendMessageErr,
  showHeaderPopup,
  closeHeaderPopup,
} from '../actions';

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

  it('sendEmail', () => {
    const obj = state.set('sendEmailLoading', true);
    expect(homepageReducer(state, sendEmail())).toEqual(obj);
  });

  it('sendEmailSuccess', () => {
    const obj = state.set('sendEmailLoading', false);
    expect(homepageReducer(state, sendEmailSuccess())).toEqual(obj);
  });

  it('sendEmailErr', () => {
    const sendEmailError = 'sendEmailError';
    const obj = state
      .set('sendEmailLoading', false)
      .set('sendEmailError', sendEmailError);
    expect(homepageReducer(state, sendEmailErr(sendEmailError))).toEqual(obj);
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

  it('showHeaderPopup', () => {
    const obj = state.set('showPopup', true);
    expect(homepageReducer(state, showHeaderPopup())).toEqual(obj);
  });

  it('closeHeaderPopup', () => {
    const obj = state.set('showPopup', false);
    expect(homepageReducer(state, closeHeaderPopup())).toEqual(obj);
  });
});
