/*
 *
 * SignUp actions
 *
 */

import {
  FETCH_REGISTR_ACC,
  REGISTR_ACC_SUCCESS,
  REGISTR_ACC_ERROR,
  SET_REDUCER_DEFAULT,
} from './constants';

export function fetchRegistrAcc(obj) {
  return {
    type: FETCH_REGISTR_ACC,
    obj,
  };
}

export function registrAccSuccess() {
  return {
    type: REGISTR_ACC_SUCCESS,
  };
}

export function registrAccError(error) {
  return {
    type: REGISTR_ACC_ERROR,
    error,
  };
}

export function setReducerDefault() {
  return {
    type: SET_REDUCER_DEFAULT,
  };
}
