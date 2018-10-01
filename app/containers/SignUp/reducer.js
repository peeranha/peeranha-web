/*
 *
 * SignUp reducer
 *
 */

import { fromJS } from 'immutable';

import {
  FETCH_REGISTR_ACC,
  REGISTR_ACC_SUCCESS,
  REGISTR_ACC_ERROR,
  SET_REDUCER_DEFAULT,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: {},
  registred: false,
});

function signUpReducer(state = initialState, action) {
  const { type, error } = action;
  switch (type) {
    case FETCH_REGISTR_ACC:
      return state.set('loading', true);
    case REGISTR_ACC_SUCCESS:
      return state.set('loading', false).set('registred', true);
    case REGISTR_ACC_ERROR:
      return state.set('error', error).set('loading', false);
    case SET_REDUCER_DEFAULT:
      return initialState;
    default:
      return state;
  }
}

export default signUpReducer;
