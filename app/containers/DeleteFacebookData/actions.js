/*
 *
 * DeleteFacebookData actions
 *
 */

import {
  CHECK_FACEBOOK_ID,
  CONFIRM_DATA_DELETION,
  SET_STAGE,
  SET_USER_EMAIL,
  DELETE_FB_DATA_ERROR,
  SET_DEL_FB_DATA_PROCESSING,
  RESET_TO_INITIAL_STATE,
  SEND_ANOTHER_CODE,
} from './constants';

export const checkFacebookId = (val) => ({
  type: CHECK_FACEBOOK_ID,
  facebookUserId: val.toJS().facebookUserId,
});

export const confirmDataDeletion = (val) => ({
  type: CONFIRM_DATA_DELETION,
  verificationCode: val.toJS().fbDataDelVerifCode,
});

export const sendAnotherCode = () => ({
  type: SEND_ANOTHER_CODE,
});

export const setProcessing = (processing) => ({
  type: SET_DEL_FB_DATA_PROCESSING,
  processing,
});

export const setStage = (stage) => ({
  type: SET_STAGE,
  stage,
});

export const setUserEmail = (facebookUserEmail) => ({
  type: SET_USER_EMAIL,
  facebookUserEmail,
});

export const deleteFbDataError = (deleteFbDataErr) => ({
  type: DELETE_FB_DATA_ERROR,
  deleteFbDataErr,
});

export const resetStateToInitial = () => ({
  type: RESET_TO_INITIAL_STATE,
});
