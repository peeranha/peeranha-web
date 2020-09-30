/*
 *
 * ShowOwnerKey actions
 *
 */

import {
  CONFIRM_TELEGRAM_ACCOUNT,
  CONFIRM_TELEGRAM_ACCOUNT_SUCCESS,
  CONFIRM_TELEGRAM_ACCOUNT_ERROR,
  UNLINK_TELEGRAM_ACCOUNT,
  UNLINK_TELEGRAM_ACCOUNT_SUCCESS,
  UNLINK_TELEGRAM_ACCOUNT_ERROR,
  GET_USER_TG_DATA,
  GET_USER_TG_DATA_SUCCESS,
  GET_USER_TG_DATA_ERROR,
} from './constants';

export function confirmTelegramAccount() {
  return {
    type: CONFIRM_TELEGRAM_ACCOUNT,
  };
}

export function confirmTelegramAccountSuccess(data) {
  return {
    type: CONFIRM_TELEGRAM_ACCOUNT_SUCCESS,
    userTgData: data,
  };
}

export function confirmTelegramAccountErr(err) {
  return {
    type: CONFIRM_TELEGRAM_ACCOUNT_ERROR,
    confirmTelegramAccountErr: err,
  };
}

export function unlinkTelegramAccount() {
  return {
    type: UNLINK_TELEGRAM_ACCOUNT,
  };
}

export function unlinkTelegramAccountSuccess() {
  return {
    type: UNLINK_TELEGRAM_ACCOUNT_SUCCESS,
  };
}

export function unlinkTelegramAccountErr(err) {
  return {
    type: UNLINK_TELEGRAM_ACCOUNT_ERROR,
    unlinkTelegramAccountErr: err,
  };
}

// Get user telegram data
export function getUserTelegramData() {
  return {
    type: GET_USER_TG_DATA,
  };
}

export function getUserTelegramDataSuccess(data) {
  return {
    type: GET_USER_TG_DATA_SUCCESS,
    userTgData: data,
  };
}

export function getUserTelegramDataError(err) {
  return {
    type: GET_USER_TG_DATA_ERROR,
    err,
  };
}
