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
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
  registered: false,
});

function signUpReducer(state = initialState, action) {
  const { type, error } = action;

  switch (type) {
    case FETCH_REGISTER_ACC:
      return state.set('loading', true);
    case REGISTER_ACC_SUCCESS:
      return state.set('loading', false).set('registered', true);
    case REGISTER_ACC_ERROR:
      return state.set('error', error).set('loading', false);
    case SET_REDUCER_DEFAULT:
      return initialState;
    default:
      return state;
  }
}

export default signUpReducer;
