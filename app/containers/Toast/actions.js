/*
 *
 * Toast actions
 *
 */

import { ADD_TOAST, REMOVE_TOAST } from './constants';

/* eslint no-param-reassign: "error" */
export function addToast(addedToast) {
  return {
    type: ADD_TOAST,
    addedToast,
  };
}

export function removeToast(toastKey) {
  return {
    type: REMOVE_TOAST,
    toastKey,
  };
}
