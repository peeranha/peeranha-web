/*
 *
 * DeleteFacebookData reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CHECK_FACEBOOK_ID,
  CONFIRM_DATA_DELETION,
  DELETE_FB_DATA_ERROR,
  ENTER_FACEBOOK_ID,
  RESET_TO_INITIAL_STATE,
  SEND_ANOTHER_CODE,
  SET_DEL_FB_DATA_PROCESSING,
  SET_STAGE,
  SET_USER_EMAIL,
} from './constants';

export const initialState = fromJS({
  facebookUserId: null,
  facebookUserEmail: null,
  stage: ENTER_FACEBOOK_ID,
  processing: false,
  deleteFbDataErr: null,
});

function deleteFbDataReducer(state = initialState, action) {
  const {
    type,
    facebookUserId,
    deleteFbDataErr,
    processing,
    stage,
    facebookUserEmail,
  } = action;

  switch (type) {
    case CHECK_FACEBOOK_ID:
      return state
        .set('facebookUserId', facebookUserId)
        .set('processing', true);

    case SEND_ANOTHER_CODE:
    case CONFIRM_DATA_DELETION:
      return state.set('processing', true);

    case SET_STAGE:
      return state.set('stage', stage);

    case SET_USER_EMAIL:
      return state.set('facebookUserEmail', facebookUserEmail);

    case SET_DEL_FB_DATA_PROCESSING:
      return state.set('processing', processing);

    case DELETE_FB_DATA_ERROR:
      return state
        .set('deleteFbDataErr', deleteFbDataErr)
        .set('processing', false);

    case RESET_TO_INITIAL_STATE:
      return initialState;

    default:
      return state;
  }
}

export default deleteFbDataReducer;
