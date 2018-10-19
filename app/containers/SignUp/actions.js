/*
 *
 * SignUp actions
 *
 */

import {
  FETCH_REGISTER_ACC,
  REGISTER_ACC_SUCCESS,
  REGISTER_ACC_ERROR,
  SET_REDUCER_DEFAULT,
} from './constants';

/*
 *
 * register actions
 *
 */

export function fetchRegisterAcc(obj) {
  return {
    type: FETCH_REGISTER_ACC,
    obj,
  };
}

export function registerAccSuccess() {
  return {
    type: REGISTER_ACC_SUCCESS,
  };
}

export function registerAccError(error) {
  return {
    type: REGISTER_ACC_ERROR,
    error,
  };
}

export function setReducerDefault() {
  return {
    type: SET_REDUCER_DEFAULT,
  };
}
