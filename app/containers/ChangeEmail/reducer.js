/*
 *
 * ChangeEmail reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_ERROR,
  SHOW_CHANGE_EMAIL_MODAL,
  HIDE_CHANGE_EMAIL_MODAL,
} from './constants';

export const initialState = fromJS({
  showModal: false,
  changeEmailProcessing: false,
  changeEmailError: null,
});

function changeEmailReducer(state = initialState, action) {
  const { type, changeEmailError } = action;

  switch (type) {
    case SHOW_CHANGE_EMAIL_MODAL:
      return state.set('showModal', true);
    case HIDE_CHANGE_EMAIL_MODAL:
      return state.set('showModal', false);

    case CHANGE_EMAIL:
      return state.set('changeEmailProcessing', true);
    case CHANGE_EMAIL_SUCCESS:
      return state
        .set('changeEmailProcessing', false)
        .set('showModal', initialState.get('showModal'));
    case CHANGE_EMAIL_ERROR:
      return state
        .set('changeEmailProcessing', false)
        .set('changeEmailError', changeEmailError);

    default:
      return state;
  }
}

export default changeEmailReducer;
