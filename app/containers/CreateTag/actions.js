/*
 *
 * CreateTag actions
 *
 */

import {
  REDIRECT_TO_CREATE_TAG,
  SUGGEST_TAG,
  SUGGEST_TAG_SUCCESS,
  SUGGEST_TAG_ERROR,
  GET_FORM,
  GET_FORM_PROCESSING,
  GET_FORM_SUCCESS,
  GET_FORM_ERROR,
} from './constants';

export function redirectToCreateTag(ev) {
  return {
    type: REDIRECT_TO_CREATE_TAG,
    buttonId: ev.currentTarget.id,
    communityId: ev.currentTarget.dataset.communityid,
  };
}

export function suggestTag(tag, reset) {
  return {
    type: SUGGEST_TAG,
    tag,
    reset,
  };
}

export function suggestTagSuccess() {
  return {
    type: SUGGEST_TAG_SUCCESS,
  };
}

export function suggestTagErr(suggestTagError) {
  return {
    type: SUGGEST_TAG_ERROR,
    suggestTagError,
  };
}

export function getForm() {
  return {
    type: GET_FORM,
  };
}

export function getFormProcessing() {
  return {
    type: GET_FORM_PROCESSING,
  };
}

export function getFormSuccess(isFormAvailable) {
  return {
    type: GET_FORM_SUCCESS,
    isFormAvailable,
  };
}

export function getFormError(getFormError) {
  return {
    type: GET_FORM_ERROR,
    getFormError,
  };
}
