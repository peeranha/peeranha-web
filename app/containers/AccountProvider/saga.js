import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';
import { getBalance } from 'utils/walletManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { FOLLOW_HANDLER_SUCCESS } from 'containers/FollowCommunityButton/constants';
import { SHOW_SCATTER_SIGNUP_FORM_SUCCESS } from 'containers/SignUp/constants';
import { ASK_QUESTION_SUCCESS } from 'containers/AskQuestion/constants';
import { CREATE_COMMUNITY_SUCCESS } from 'containers/CreateCommunity/constants';
import { SUGGEST_TAG_SUCCESS } from 'containers/CreateTag/constants';
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

import {
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_SCATTER_SUCCESS,
  FINISH_REGISTRATION_SUCCESS,
} from 'containers/Login/constants';

import { getCurrentAccountSuccess, getCurrentAccountError } from './actions';

import { GET_CURRENT_ACCOUNT } from './constants';
import { makeSelectProfileInfo } from './selectors';

/* eslint func-names: 0 */
export function* getCurrentAccountWorker() {
  try {
    const eosService = yield select(selectEos);
    const prevProfileInfo = yield select(makeSelectProfileInfo());

    if (!eosService || !eosService.initialized)
      throw new Error('EOS is not initialized.');

    let profileInfo;
    let balance;

    const selectedScatterAccount = yield call(() =>
      eosService.getSelectedAccount(),
    );

    yield all([
      (function*() {
        profileInfo = yield call(() =>
          getProfileInfo(selectedScatterAccount, eosService),
        );
      })(),
      (function*() {
        balance = yield call(() =>
          getBalance(eosService, selectedScatterAccount),
        );
      })(),
    ]);

    yield put(
      getUserProfileSuccess({
        ...profileInfo,
        profile: prevProfileInfo && prevProfileInfo.profile,
      }),
    );

    yield put(getCurrentAccountSuccess(selectedScatterAccount, balance));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(
    [
      GET_CURRENT_ACCOUNT,
      FOLLOW_HANDLER_SUCCESS,
      LOGIN_WITH_EMAIL_SUCCESS,
      LOGIN_WITH_SCATTER_SUCCESS,
      FINISH_REGISTRATION_SUCCESS,
      SHOW_SCATTER_SIGNUP_FORM_SUCCESS,
      ASK_QUESTION_SUCCESS,
      CREATE_COMMUNITY_SUCCESS,
      SUGGEST_TAG_SUCCESS,
      EDIT_ANSWER_SUCCESS,
      EDIT_QUESTION_SUCCESS,
      FOLLOW_HANDLER_SUCCESS,
      FINISH_REGISTRATION_SUCCESS,
      SEND_TOKENS_SUCCESS,
      UPVOTE_COMM_SUCCESS,
      DOWNVOTE_COMM_SUCCESS,
      UPVOTE_TAGS_SUCCESS,
      DOWNVOTE_TAGS_SUCCESS,
      PICKUP_REWARD_SUCCESS,
    ],
    getCurrentAccountWorker,
  );
}
