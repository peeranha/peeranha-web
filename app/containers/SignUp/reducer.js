/*
 *
 * SignUp reducer
 *
 */

import { fromJS } from 'immutable';

import {
  FETCH_REGISTER_ACC,
  REGISTER_ACC_SUCCESS,
  REGISTER_ACC_ERROR,
  SET_REDUCER_DEFAULT,
  SHOW_SIGN_UP_MODAL,
  HIDE_SIGN_UP_MODAL,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
  registered: false,
  content: null,
  showModal: false,
});

function signUpReducer(state = initialState, action) {
  const { type, error, content } = action;

  switch (type) {
    case FETCH_REGISTER_ACC:
      return state.set('loading', true);
    case REGISTER_ACC_SUCCESS:
      return state.set('loading', false).set('registered', true);
    case REGISTER_ACC_ERROR:
      return state.set('error', error).set('loading', false);
    case SHOW_SIGN_UP_MODAL:
      return state.set('content', content).set('showModal', true);
    case HIDE_SIGN_UP_MODAL:
      return state.set('showModal', false);
    case SET_REDUCER_DEFAULT:
      return initialState;
    default:
      return state;
  }
}

export default signUpReducer;
