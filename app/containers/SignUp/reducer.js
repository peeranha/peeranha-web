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
  IS_USER_IN_SYSTEM_SUCCESS,
  IS_USER_IN_SYSTEM_ERROR,
  SELECT_POPUP_ACCOUNT_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
  registered: false,
  userIsInSystem: null,
  userInSystemActionError: null,
  selectAccountError: null,
});

function signUpReducer(state = initialState, action) {
  const {
    type,
    error,
    userIsInSystem,
    userInSystemActionError,
    selectAccountError,
  } = action;

  switch (type) {
    case FETCH_REGISTER_ACC:
      return state.set('loading', true);
    case REGISTER_ACC_SUCCESS:
      return state.set('loading', false).set('registered', true);
    case REGISTER_ACC_ERROR:
      return state.set('error', error).set('loading', false);
    case IS_USER_IN_SYSTEM_SUCCESS:
      return state.set('userIsInSystem', userIsInSystem);
    case IS_USER_IN_SYSTEM_ERROR:
      return state.set('userInSystemActionError', userInSystemActionError);
    case SELECT_POPUP_ACCOUNT_ERROR:
      return state.set('selectAccountError', selectAccountError);
    case SET_REDUCER_DEFAULT:
      return initialState;
    default:
      return state;
  }
}

export default signUpReducer;
