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
