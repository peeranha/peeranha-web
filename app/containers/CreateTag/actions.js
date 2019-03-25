/*
 *
 * CreateTag actions
 *
 */

import {
  SUGGEST_TAG,
  SUGGEST_TAG_SUCCESS,
  SUGGEST_TAG_ERROR,
} from './constants';

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
