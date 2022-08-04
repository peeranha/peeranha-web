import {
  ASK_QUESTION_ERROR,
  ASK_QUESTION_SUCCESS,
} from 'containers/AskQuestion/constants';

import {
  CHANGE_EMAIL_ERROR,
  SEND_OLD_EMAIL_ERROR,
  CONFIRM_OLD_EMAIL_ERROR,
  CHANGE_EMAIL_SUCCESS,
} from 'containers/ChangeEmail/constants';

import {
  CHANGE_PASSWORD_ERROR,
  SUBMIT_EMAIL_ERROR,
  SEND_EMAIL_ERROR,
  CHANGE_PASSWORD_SUCCESS,
} from 'containers/ChangePasswordByPrevious/constants';

import {
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
} from 'containers/CreateCommunity/constants';

import {
  SUGGEST_TAG_ERROR,
  SUGGEST_TAG_SUCCESS,
} from 'containers/CreateTag/constants';

import { EDIT_TAG_SUCCESS, EDIT_TAG_ERROR } from 'containers/EditTag/constants';

import {
  DELETE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_SUCCESS,
  SEND_EMAIL_ERROR as DELETE_ACCOUNT_SEND_EMAIL_ERROR,
} from 'containers/DeleteAccount/constants';

import {
  EDIT_ANSWER_ERROR,
  EDIT_ANSWER_SUCCESS,
} from 'containers/EditAnswer/constants';

import {
  EDIT_COMMUNITY_ERROR,
  EDIT_COMMUNITY_SUCCESS,
  GET_COMMUNITY_ERROR,
} from 'containers/EditCommunity/constants';

import {
  SAVE_PROFILE_ERROR,
  SAVE_PROFILE_SUCCESS,
} from 'containers/EditProfilePage/constants';

import {
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  GET_ASKED_QUESTION_ERROR,
} from 'containers/EditQuestion/constants';

import {
  GET_VERIFICATION_CODE_ERROR,
  VERIFY_EMAIL_ERROR,
  CHANGE_PASSWORD_ERROR as FORGOT_PASSWORD_CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS as FORGOT_PASSWORD_CHANGE_PASSWORD_SUCCESS,
} from 'containers/ForgotPassword/constants';

import {
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from 'containers/HomePage/constants';

import {
  EMAIL_CHECKING_ERROR,
  EMAIL_VERIFICATION_ERROR,
  I_HAVE_EOS_ACCOUNT_ERROR,
  SIGN_UP_VIA_EMAIL_ERROR,
  SHOW_WALLET_SIGNUP_FORM_ERROR,
  SIGNUP_WITH_WALLET_ERROR,
  SIGNUP_WITH_WALLET_REFERRAL_ERROR,
} from 'containers/SignUp/constants';

import {
  LOGIN_WITH_WALLET_ERROR,
  LOGIN_WITH_EMAIL_ERROR,
  FINISH_REGISTRATION_ERROR,
  FINISH_REGISTRATION_REFERRAL_ERROR,
  FB_LOGIN_ERROR,
} from 'containers/Login/constants';

import { LOGOUT_ERROR } from 'containers/Logout/constants';

import {
  SEND_TOKENS_ERROR,
  SEND_TOKENS_SUCCESS,
} from 'containers/SendTokens/constants';

import { SHOW_ACTIVE_KEY_ERROR } from 'containers/ShowActiveKey/constants';

import {
  SHOW_OWNER_KEY_ERROR,
  SEND_EMAIL_ERROR as SHOW_OWNER_KEY_SEND_EMAIL_ERROR,
} from 'containers/ShowOwnerKey/constants';

import { FOLLOW_HANDLER_ERROR } from 'containers/FollowCommunityButton/constants';
import {
  PICKUP_REWARD_ERROR,
  GET_WEEK_STAT_ERROR,
} from 'containers/Wallet/constants';

import {
  POST_COMMENT_ERROR,
  POST_ANSWER_ERROR,
  UP_VOTE_ERROR,
  DOWN_VOTE_ERROR,
  MARK_AS_ACCEPTED_ERROR,
  DELETE_QUESTION_ERROR,
  DELETE_ANSWER_ERROR,
  DELETE_COMMENT_ERROR,
  SAVE_COMMENT_ERROR,
  VOTE_TO_DELETE_ERROR,
  GET_QUESTION_DATA_ERROR,
  DELETE_QUESTION_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  CHANGE_QUESTION_TYPE_ERROR,
  CHANGE_QUESTION_TYPE_SUCCESS,
} from 'containers/ViewQuestion/constants';

import {
  GET_CURRENT_ACCOUNT_ERROR,
  REWARD_REFER_ERROR,
  UPDATE_ACC_ERROR,
} from 'containers/AccountProvider/constants';

import { GET_SUGGESTED_COMMUNITIES_ERROR } from 'containers/Communities/constants';

import {
  GET_COMMUNITIES_WITH_TAGS_ERROR,
  GET_USER_PROFILE_ERROR,
  GET_STAT_ERROR,
  GET_FAQ_ERROR,
} from 'containers/DataCacheProvider/constants';

import { GET_QUESTIONS_ERROR } from 'containers/Questions/constants';
import { GET_QUESTIONS_ERROR as GET_Q_USER_ERROR } from 'containers/QuestionsOfUser/constants';
import { GET_QUESTIONS_ERROR as GET_QA_USER_ERROR } from 'containers/QuestionsWithAnswersOfUser/constants';

import {
  GET_SUGGESTED_TAGS_ERROR,
  GET_EXISTING_TAGS_ERROR,
} from 'containers/Tags/constants';

import { GET_USERS_ERROR } from 'containers/Users/constants';
import { GET_RESULTS_ERROR } from 'containers/Search/constants';
import { GET_TERMS_ERROR } from 'containers/TermsOfService/constants';
import { INIT_EOSIO_ERROR } from 'containers/EosioProvider/constants';
import { GET_USER_ACHIEVEMENTS_ERROR } from 'containers/Achievements/constants';
import { CHANGE_STAKE_ERROR } from 'containers/Boost/constants';
import { DELETE_FB_DATA_ERROR } from 'containers/DeleteFacebookData/constants';

export const otherTypes = [
  GET_CURRENT_ACCOUNT_ERROR,
  GET_SUGGESTED_COMMUNITIES_ERROR,
  GET_COMMUNITIES_WITH_TAGS_ERROR,
  GET_USER_PROFILE_ERROR,
  GET_STAT_ERROR,
  GET_FAQ_ERROR,
  GET_QUESTIONS_ERROR,
  GET_Q_USER_ERROR,
  GET_QA_USER_ERROR,
  GET_SUGGESTED_TAGS_ERROR,
  GET_EXISTING_TAGS_ERROR,
  GET_USERS_ERROR,
  GET_QUESTION_DATA_ERROR,
  GET_WEEK_STAT_ERROR,
  UPDATE_ACC_ERROR,
  GET_TERMS_ERROR,
  REWARD_REFER_ERROR,
];

export const errHandlingTypes = [
  ASK_QUESTION_ERROR,
  CHANGE_EMAIL_ERROR,
  EDIT_COMMUNITY_ERROR,
  GET_COMMUNITY_ERROR,
  SEND_OLD_EMAIL_ERROR,
  CONFIRM_OLD_EMAIL_ERROR,
  SEND_EMAIL_ERROR,
  SUBMIT_EMAIL_ERROR,
  CHANGE_PASSWORD_ERROR,
  CREATE_COMMUNITY_ERROR,
  SUGGEST_TAG_ERROR,
  EDIT_TAG_ERROR,
  DELETE_ACCOUNT_SEND_EMAIL_ERROR,
  DELETE_ACCOUNT_ERROR,
  EDIT_ANSWER_ERROR,
  SAVE_PROFILE_ERROR,
  EDIT_QUESTION_ERROR,
  GET_VERIFICATION_CODE_ERROR,
  VERIFY_EMAIL_ERROR,
  FORGOT_PASSWORD_CHANGE_PASSWORD_ERROR,
  SEND_MESSAGE_ERROR,
  EMAIL_CHECKING_ERROR,
  LOGIN_WITH_WALLET_ERROR,
  LOGIN_WITH_EMAIL_ERROR,
  FINISH_REGISTRATION_ERROR,
  FINISH_REGISTRATION_REFERRAL_ERROR,
  SIGNUP_WITH_WALLET_REFERRAL_ERROR,
  LOGOUT_ERROR,
  SEND_TOKENS_ERROR,
  SHOW_ACTIVE_KEY_ERROR,
  SHOW_OWNER_KEY_ERROR,
  SHOW_OWNER_KEY_SEND_EMAIL_ERROR,
  EMAIL_VERIFICATION_ERROR,
  I_HAVE_EOS_ACCOUNT_ERROR,
  SIGN_UP_VIA_EMAIL_ERROR,
  SHOW_WALLET_SIGNUP_FORM_ERROR,
  SIGNUP_WITH_WALLET_ERROR,
  FOLLOW_HANDLER_ERROR,
  PICKUP_REWARD_ERROR,
  POST_COMMENT_ERROR,
  POST_ANSWER_ERROR,
  UP_VOTE_ERROR,
  DOWN_VOTE_ERROR,
  MARK_AS_ACCEPTED_ERROR,
  DELETE_QUESTION_ERROR,
  DELETE_ANSWER_ERROR,
  DELETE_COMMENT_ERROR,
  SAVE_COMMENT_ERROR,
  VOTE_TO_DELETE_ERROR,
  GET_RESULTS_ERROR,
  INIT_EOSIO_ERROR,
  CHANGE_QUESTION_TYPE_ERROR,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_ASKED_QUESTION_ERROR,
  CHANGE_STAKE_ERROR,
  FB_LOGIN_ERROR,
  DELETE_FB_DATA_ERROR,
];

export const successHandlingTypes = [
  ASK_QUESTION_SUCCESS,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CREATE_COMMUNITY_SUCCESS,
  EDIT_COMMUNITY_SUCCESS,
  SUGGEST_TAG_SUCCESS,
  EDIT_TAG_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  EDIT_ANSWER_SUCCESS,
  SAVE_PROFILE_SUCCESS,
  EDIT_QUESTION_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  SEND_TOKENS_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  CHANGE_QUESTION_TYPE_SUCCESS,
  FORGOT_PASSWORD_CHANGE_PASSWORD_SUCCESS,
];
