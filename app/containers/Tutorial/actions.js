/*
 *
 * Tutorial actions
 *
 */

import {
  GET_TUTORIAL,
  GET_TUTORIAL_SUCCESS,
  GET_TUTORIAL_ERROR,
} from './constants';

export function getTutorial() {
  return {
    type: GET_TUTORIAL,
  };
}

export function getTutorialSuccess(tutorial) {
  return {
    type: GET_TUTORIAL_SUCCESS,
    tutorial,
  };
}

export function getTutorialErr(getTutorialError) {
  return {
    type: GET_TUTORIAL_ERROR,
    getTutorialError,
  };
}
