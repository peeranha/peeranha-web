import { fromJS } from 'immutable';

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  SHOW_CHANGE_PASSWORD_MODAL,
  HIDE_CHANGE_PASSWORD_MODAL,
  CHANGE_PASSWORD_FORM,
} from './constants';

export const initialState = fromJS({
  content: null,
  showModal: false,
  changePasswordProcessing: false,
  changePasswordError: null,
  email: null,
  verificationCode: null,
});

function changePasswordByPreviousReducer(state = initialState, action) {
  const { type, changePasswordError } = action;

  switch (type) {
    case SHOW_CHANGE_PASSWORD_MODAL:
      return state.set('showModal', true).set('content', CHANGE_PASSWORD_FORM);
    case HIDE_CHANGE_PASSWORD_MODAL:
      return state
        .set('showModal', false)
        .set('content', initialState.get('content'));
    case CHANGE_PASSWORD:
      return state.set('changePasswordProcessing', true);
    case CHANGE_PASSWORD_SUCCESS:
      return state
        .set('changePasswordProcessing', false)
        .set('content', initialState.get('content'))
        .set('showModal', initialState.get('showModal'));
    case CHANGE_PASSWORD_ERROR:
      return state
        .set('changePasswordProcessing', false)
        .set('changePasswordError', changePasswordError);

    default:
      return state;
  }
}

export default changePasswordByPreviousReducer;
