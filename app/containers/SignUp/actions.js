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
  IS_USER_IN_SYSTEM,
  IS_USER_IN_SYSTEM_SUCCESS,
  IS_USER_IN_SYSTEM_ERROR,
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
  console.log(error.message);
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

/*
 *
 * getUserInfo actions
 *
 */

export function isUserInSystem(user) {
  return {
    type: IS_USER_IN_SYSTEM,
    user,
  };
}

export function isUserInSystemSuccess(userIsInSystem) {
  return {
    type: IS_USER_IN_SYSTEM_SUCCESS,
    userIsInSystem,
  };
}

export function isUserInSystemError(userInSystemActionError) {
  return {
    type: IS_USER_IN_SYSTEM_ERROR,
    userInSystemActionError: userInSystemActionError.message,
  };
}
