import { ASK_QUESTION_ERROR, ASK_QUESTION_SUCCESS } from 'containers/AskQuestion/constants';

import {
  CHANGE_EMAIL_ERROR,
  SEND_OLD_EMAIL_ERROR,
  CONFIRM_OLD_EMAIL_ERROR,
  CHANGE_EMAIL_SUCCESS,
} from 'containers/ChangeEmail/constants';

import {
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
} from 'containers/CreateCommunity/constants';

import { SUGGEST_TAG_ERROR, SUGGEST_TAG_SUCCESS } from 'containers/CreateTag/constants';

import { EDIT_TAG_SUCCESS, EDIT_TAG_ERROR } from 'containers/EditTag/constants';

import { EDIT_ANSWER_ERROR, EDIT_ANSWER_SUCCESS } from 'containers/EditAnswer/constants';

import {
  EDIT_COMMUNITY_ERROR,
  EDIT_COMMUNITY_SUCCESS,
  GET_COMMUNITY_ERROR,
} from 'containers/EditCommunity/constants';

import { SAVE_PROFILE_ERROR, SAVE_PROFILE_SUCCESS } from 'containers/EditProfilePage/constants';

import {
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_ERROR,
  GET_ASKED_QUESTION_ERROR,
} from 'containers/EditQuestion/constants';

import { SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR } from 'pages/HomePage/constants';

import { LOGIN_WITH_WALLET_ERROR } from 'containers/Login/constants';

import { LOGOUT_ERROR } from 'containers/Logout/constants';

import { FOLLOW_HANDLER_ERROR } from 'containers/FollowCommunityButton/constants';
import { PICKUP_REWARD_ERROR, GET_WEEK_STAT_ERROR } from 'containers/Wallet/constants';

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

import {
  GET_COMMUNITIES_ERROR,
  GET_USER_PROFILE_ERROR,
  GET_STAT_ERROR,
  GET_FAQ_ERROR,
} from 'containers/DataCacheProvider/constants';

import { GET_QUESTIONS_ERROR } from 'containers/Questions/constants';
import { GET_QUESTIONS_ERROR as GET_Q_USER_ERROR } from 'containers/QuestionsOfUser/constants';
import { GET_QUESTIONS_ERROR as GET_QA_USER_ERROR } from 'containers/QuestionsWithAnswersOfUser/constants';

import { GET_EXISTING_TAGS_ERROR } from 'containers/Tags/constants';

import { GET_USERS_ERROR } from 'containers/Users/constants';
import { GET_RESULTS_ERROR } from 'containers/Search/constants';
import { GET_USER_ACHIEVEMENTS_ERROR } from 'containers/Achievements/constants';
import { CHANGE_STAKE_ERROR } from 'containers/Boost/constants';

export const otherTypes = [
  GET_CURRENT_ACCOUNT_ERROR,
  GET_COMMUNITIES_ERROR,
  GET_USER_PROFILE_ERROR,
  GET_STAT_ERROR,
  GET_FAQ_ERROR,
  GET_QUESTIONS_ERROR,
  GET_Q_USER_ERROR,
  GET_QA_USER_ERROR,
  GET_EXISTING_TAGS_ERROR,
  GET_USERS_ERROR,
  GET_QUESTION_DATA_ERROR,
  GET_WEEK_STAT_ERROR,
  UPDATE_ACC_ERROR,
  REWARD_REFER_ERROR,
];

export const errHandlingTypes = [
  ASK_QUESTION_ERROR,
  CHANGE_EMAIL_ERROR,
  EDIT_COMMUNITY_ERROR,
  GET_COMMUNITY_ERROR,
  SEND_OLD_EMAIL_ERROR,
  CONFIRM_OLD_EMAIL_ERROR,
  CREATE_COMMUNITY_ERROR,
  SUGGEST_TAG_ERROR,
  EDIT_TAG_ERROR,
  EDIT_ANSWER_ERROR,
  SAVE_PROFILE_ERROR,
  EDIT_QUESTION_ERROR,
  SEND_MESSAGE_ERROR,
  LOGIN_WITH_WALLET_ERROR,
  LOGOUT_ERROR,
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
  CHANGE_QUESTION_TYPE_ERROR,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_ASKED_QUESTION_ERROR,
  CHANGE_STAKE_ERROR,
];

export const successHandlingTypes = [
  ASK_QUESTION_SUCCESS,
  CHANGE_EMAIL_SUCCESS,
  CREATE_COMMUNITY_SUCCESS,
  EDIT_COMMUNITY_SUCCESS,
  SUGGEST_TAG_SUCCESS,
  EDIT_TAG_SUCCESS,
  EDIT_ANSWER_SUCCESS,
  SAVE_PROFILE_SUCCESS,
  EDIT_QUESTION_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  CHANGE_QUESTION_TYPE_SUCCESS,
];
