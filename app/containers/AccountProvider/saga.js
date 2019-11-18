import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';
import { getBalance } from 'utils/walletManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import {
  getUserProfileSuccess,
  getUserProfile,
} from 'containers/DataCacheProvider/actions';

import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { SHOW_SCATTER_SIGNUP_FORM_SUCCESS } from 'containers/SignUp/constants';

import { redirectToAskQuestionPageWorker } from 'containers/AskQuestion/saga';
import { redirectToCreateCommunityWorker } from 'containers/CreateCommunity/saga';
import { redirectToCreateTagWorker } from 'containers/CreateTag/saga';

import {
  ASK_QUESTION_SUCCESS,
  REDIRECT_TO_ASK_QUESTION_PAGE,
} from 'containers/AskQuestion/constants';

import {
  CREATE_COMMUNITY_SUCCESS,
  REDIRECT_TO_CREATE_COMMUNITY,
} from 'containers/CreateCommunity/constants';

import {
  SUGGEST_TAG_SUCCESS,
  REDIRECT_TO_CREATE_TAG,
} from 'containers/CreateTag/constants';

import { EDIT_ANSWER_SUCCESS } from 'containers/EditAnswer/constants';
import { EDIT_QUESTION_SUCCESS } from 'containers/EditQuestion/constants';
import { SEND_TOKENS_SUCCESS } from 'containers/SendTokens/constants';
import { PICKUP_REWARD_SUCCESS } from 'containers/Wallet/constants';

import {
  UPVOTE_SUCCESS as UPVOTE_COMM_SUCCESS,
  DOWNVOTE_SUCCESS as DOWNVOTE_COMM_SUCCESS,
} from 'containers/VoteForNewCommunityButton/constants';

import {
  UPVOTE_SUCCESS as UPVOTE_TAGS_SUCCESS,
  DOWNVOTE_SUCCESS as DOWNVOTE_TAGS_SUCCESS,
} from 'containers/VoteForNewTagButton/constants';

import { PROFILE_INFO_LS, AUTOLOGIN_DATA } from 'containers/Login/constants';

import {
  DELETE_QUESTION_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  SAVE_COMMENT_SUCCESS,
} from 'containers/ViewQuestion/constants';

import { getCurrentAccountSuccess, getCurrentAccountError } from './actions';

import { GET_CURRENT_ACCOUNT } from './constants';
import { makeSelectProfileInfo } from './selectors';

/* eslint func-names: 0, consistent-return: 0 */
export function* getCurrentAccountWorker(initAccount) {
  try {
    yield put(getUserProfile());

    const eosService = yield select(selectEos);
    const prevProfileInfo = yield select(makeSelectProfileInfo());

    let account = yield call(eosService.getSelectedAccount);

    if (!account && typeof initAccount === 'string') {
      account = initAccount;
    } else if (!account) {
      const autoLoginData = JSON.parse(
        localStorage.getItem(AUTOLOGIN_DATA) ||
          sessionStorage.getItem(AUTOLOGIN_DATA),
      );

      account = autoLoginData.eosAccountName;
    }

    if (!prevProfileInfo) {
      const profileLS = JSON.parse(localStorage.getItem(PROFILE_INFO_LS));

      if (profileLS && account === profileLS.user) {
        yield put(getUserProfileSuccess(profileLS));
        yield put(getCurrentAccountSuccess(profileLS.user, profileLS.balance));

        return null;
      }
    }

    const [profileInfo, balance] = yield all([
      call(getProfileInfo, account, eosService, !prevProfileInfo),
      call(getBalance, eosService, account),
    ]);

    profileInfo.balance = balance;

    if (prevProfileInfo) {
      profileInfo.profile = prevProfileInfo.profile;
    }

    localStorage.setItem(PROFILE_INFO_LS, JSON.stringify(profileInfo));

    yield put(getUserProfileSuccess(profileInfo));
    yield put(getCurrentAccountSuccess(account, balance));
  } catch ({ message }) {
    yield put(getCurrentAccountError(message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(
    REDIRECT_TO_ASK_QUESTION_PAGE,
    redirectToAskQuestionPageWorker,
  );
  yield takeLatest(
    REDIRECT_TO_CREATE_COMMUNITY,
    redirectToCreateCommunityWorker,
  );
  yield takeLatest(REDIRECT_TO_CREATE_TAG, redirectToCreateTagWorker);
  yield takeLatest(
    [
      GET_CURRENT_ACCOUNT,
      FOLLOW_HANDLER_SUCCESS,
      SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
      ASK_QUESTION_SUCCESS,
      CREATE_COMMUNITY_SUCCESS,
      SUGGEST_TAG_SUCCESS,
      EDIT_ANSWER_SUCCESS,
      EDIT_QUESTION_SUCCESS,
      SEND_TOKENS_SUCCESS,
      UPVOTE_COMM_SUCCESS,
      DOWNVOTE_COMM_SUCCESS,
      UPVOTE_TAGS_SUCCESS,
      DOWNVOTE_TAGS_SUCCESS,
      PICKUP_REWARD_SUCCESS,
      DELETE_QUESTION_SUCCESS,
      DELETE_ANSWER_SUCCESS,
      DELETE_COMMENT_SUCCESS,
      SAVE_COMMENT_SUCCESS,
    ],
    getCurrentAccountWorker,
  );
}
