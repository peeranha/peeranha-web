/*
 *
 * DeleteFacebookData constants
 *
 */

// forms
export const ENTER_FB_USER_ID_FORM = 'enterFacebookId';
export const FACEBOOK_USER_ID_FIELD = 'facebookUserId';
export const CONFIRM_FB_DATA_DEL_FORM = 'confirmFbDataDeletion';
export const VERIFY_DEL_FB_DATA_FIELD = 'fbDataDelVerifCode';

// stages
export const ENTER_FACEBOOK_ID = 'ENTER_FACEBOOK_ID';
export const CONFIRM_DELETION = 'CONFIRM_FB_DATA_DELETION';
export const DELETION_COMPLETED = 'FB_DATA_DELETION_COMPLETED';

export const stagesOrder = [
  ENTER_FACEBOOK_ID,
  CONFIRM_DELETION,
  DELETION_COMPLETED,
];

// actions
export const CHECK_FACEBOOK_ID = 'app/DeleteFacebookData/CHECK_FACEBOOK_ID';
export const CONFIRM_DATA_DELETION =
  'app/DeleteFacebookData/CONFIRM_DATA_DELETION';
export const SEND_ANOTHER_CODE = 'app/DeleteFacebookData/SEND_ANOTHER_CODE';
export const SET_STAGE = 'app/DeleteFacebookData/SET_STAGE';
export const SET_USER_EMAIL = 'app/DeleteFacebookData/SET_USER_EMAIL';
export const RESET_TO_INITIAL_STATE =
  'app/DeleteFacebookData/RESET_TO_INITIAL_STATE';
export const SET_DEL_FB_DATA_PROCESSING =
  'app/DeleteFacebookData/SET_DEL_FB_DATA_PROCESSING';
export const DELETE_FB_DATA_ERROR =
  'app/DeleteFacebookData/DELETE_FB_DATA_ERROR';
