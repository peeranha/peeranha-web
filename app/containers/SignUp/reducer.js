/*
 *
 * SignUp reducer
 *
 */

import {
  FETCH_REGISTR_ACC,
  REGISTR_ACC_SUCCESS,
  REGISTR_ACC_ERROR,
  SET_REDUCER_DEFAULT,
} from './constants';

export const initialState = {
  loading: false,
  error: null,
  registred: false,
};

function signUpReducer(state = initialState, action) {
  const { type, error } = action;
  switch (type) {
    case FETCH_REGISTR_ACC:
      return {
        ...state,
        loading: true,
      };
    case REGISTR_ACC_SUCCESS:
      return {
        ...state,
        loading: false,
        registred: true,
      };
    case REGISTR_ACC_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case SET_REDUCER_DEFAULT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

export default signUpReducer;
