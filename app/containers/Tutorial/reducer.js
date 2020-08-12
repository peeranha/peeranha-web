/*
 *
 * Tutorial reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GET_TUTORIAL,
  GET_TUTORIAL_SUCCESS,
  GET_TUTORIAL_ERROR,
} from './constants';

export const initialState = fromJS({
  tutorial: null,
  getTutorialProcessing: false,
  getTutorialError: null,
});

function tutorialReducer(state = initialState, action) {
  const { type, tutorial, getTutorialError } = action;

  switch (type) {
    case GET_TUTORIAL:
      return state.set('getTutorialProcessing', true);
    case GET_TUTORIAL_SUCCESS:
      return state
        .set('getTutorialProcessing', false)
        .set('tutorial', tutorial);
    case GET_TUTORIAL_ERROR:
      return state
        .set('getTutorialProcessing', false)
        .set('getTutorialError', getTutorialError);

    default:
      return state;
  }
}

export default tutorialReducer;
