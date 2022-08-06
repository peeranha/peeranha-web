import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';
import { emptyProfile, isUserExists, updateAcc } from 'utils/accountManagement';
import {
  getAvailableBalance,
  getBalance,
  getUserBoost,
} from 'utils/walletManagement';

import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

import { redirectToAskQuestionPageWorker } from 'containers/AskQuestion/saga';
import { redirectToCreateCommunityWorker } from 'containers/CreateCommunity/saga';
import { redirectToCreateTagWorker } from 'containers/CreateTag/saga';
import { redirectToEditQuestionPageWorker } from 'containers/EditQuestion/saga';
import { redirectToEditAnswerPageWorker } from 'containers/EditAnswer/saga';
import { redirectToEditProfilePageWorker } from 'containers/EditProfilePage/saga';

import { MODERATOR_KEY } from 'utils/constants';
import {
  ASK_QUESTION_SUCCESS,
  REDIRECT_TO_ASK_QUESTION_PAGE,
} from 'containers/AskQuestion/constants';
import {
  CREATE_COMMUNITY_SUCCESS,
  REDIRECT_TO_CREATE_COMMUNITY,
} from 'containers/CreateCommunity/constants';
import {
  REDIRECT_TO_CREATE_TAG,
  SUGGEST_TAG_SUCCESS,
} from 'containers/CreateTag/constants';
import {
  EDIT_ANSWER_SUCCESS,
  REDIRECT_TO_EDIT_ANSWER_PAGE,
} from 'containers/EditAnswer/constants';
import {
  EDIT_QUESTION_SUCCESS,
  REDIRECT_TO_EDIT_QUESTION_PAGE,
} from 'containers/EditQuestion/constants';
import { SEND_TOKENS_SUCCESS } from 'containers/SendTokens/constants';
import { PICKUP_REWARD_SUCCESS } from 'containers/Wallet/constants';
import { AUTOLOGIN_DATA, PROFILE_INFO_LS } from 'containers/Login/constants';
import { REDIRECT_TO_EDIT_PROFILE_PAGE } from 'containers/EditProfilePage/constants';
import {
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  POST_ANSWER_SUCCESS,
  SAVE_COMMENT_SUCCESS,
} from 'containers/ViewQuestion/constants';
import { getCookie, setCookie } from 'utils/cookie';
import { GET_CURRENT_ACCOUNT, GET_CURRENT_ACCOUNT_SUCCESS } from './constants';

import {
  addLoginData,
  getCurrentAccountError,
  getCurrentAccountSuccess,
  updateAccErr,
  updateAccSuccess,
} from './actions';
import { makeSelectProfileInfo } from './selectors';
import { selectEthereum } from '../EthereumProvider/selectors';
import { hasGlobalModeratorRole } from '../../utils/properties';
import { getNotificationsInfoWorker } from '../../components/Notifications/saga';
import { getCurrentPeriod } from '../../utils/theGraph';

/* eslint func-names: 0, consistent-return: 0 */
export const getCurrentAccountWorker = function*(initAccount) {
  try {
    const ethereumService = yield select(selectEthereum);

    if (ethereumService.withMetaMask)
      yield put(addLoginData({ loginWithMetaMask: true }));

    let account = yield typeof initAccount === 'string'
      ? initAccount
      : call(ethereumService.getSelectedAccount);

    const previouslyConnectedWallet = getCookie('connectedWallet');

    if (!window.localStorage.getItem('onboard.js:agreement')) {
      window.localStorage.setItem(
        'onboard.js:agreement',
        getCookie('agreement'),
      );
    }

    if (!account && previouslyConnectedWallet) {
      yield call(ethereumService.walletLogIn, previouslyConnectedWallet);
      account = ethereumService.getSelectedAccount();
    } else if (account?.email) {
      account = account.account;
      ethereumService.setSelectedAccount(account);
    }

    if (account && typeof account === 'object') {
      account = account.ethereumUserAddress;
    }

    const isUserRegistered = yield call(isUserExists, account, ethereumService);

    if (isUserRegistered === false) {
      yield put(getUserProfileSuccess(emptyProfile(account)));
      yield put(getCurrentAccountSuccess(account, 0));
      return;
    }

    const currentPeriod = yield call(getCurrentPeriod);

    const [
      profileInfo,
      balance,
      availableBalance,
      userCurrentBoost,
    ] = yield all([
      call(getProfileInfo, account, ethereumService, true, true),
      call(getBalance, ethereumService, account),
      call(getAvailableBalance, ethereumService, account),
      call(getUserBoost, ethereumService, account, currentPeriod.id),
    ]);

    if (profileInfo) {
      yield call(getNotificationsInfoWorker, profileInfo.user);
    }

    setCookie({
      name: PROFILE_INFO_LS,
      value: JSON.stringify(profileInfo),
      options: {
        defaultPath: true,
        allowSubdomains: true,
      },
    });

    yield put(
      addLoginData(JSON.parse(getCookie(AUTOLOGIN_DATA) || null) || {}),
    );
    yield put(getUserProfileSuccess(profileInfo));
    yield put(
      getCurrentAccountSuccess(
        account,
        balance,
        availableBalance,
        userCurrentBoost,
      ),
    );
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
};

export function* isAvailableAction(isValid, data = {}) {
  const { skipPermissions } = data;
  const profileInfo = yield select(makeSelectProfileInfo());

  yield call(isValid);

  if (hasGlobalModeratorRole(profileInfo.permissions)) {
    return true;
  }

  if (!skipPermissions) {
    if (profileInfo.integer_properties?.find(x => x.key === MODERATOR_KEY)) {
      return true;
    }
  }
}

export function* updateAccWorker({ ethereum }) {
  try {
    const account = yield call(ethereum.getSelectedAccount);
    let profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      yield take(GET_CURRENT_ACCOUNT_SUCCESS);
      profileInfo = yield select(makeSelectProfileInfo());
    }

    if (profileInfo && account) {
      yield call(updateAcc, profileInfo, ethereum);
      yield call(getCurrentAccountWorker);
      yield put(updateAccSuccess());
    }
  } catch (err) {
    yield put(updateAccErr(err));
  }
}
export default function* defaultSaga() {
  yield takeLatest(
    REDIRECT_TO_EDIT_ANSWER_PAGE,
    redirectToEditAnswerPageWorker,
  );
  yield takeLatest(
    REDIRECT_TO_EDIT_QUESTION_PAGE,
    redirectToEditQuestionPageWorker,
  );
  yield takeLatest(
    REDIRECT_TO_EDIT_PROFILE_PAGE,
    redirectToEditProfilePageWorker,
  );
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
      ASK_QUESTION_SUCCESS,
      POST_ANSWER_SUCCESS,
      CREATE_COMMUNITY_SUCCESS,
      SUGGEST_TAG_SUCCESS,
      EDIT_ANSWER_SUCCESS,
      EDIT_QUESTION_SUCCESS,
      SEND_TOKENS_SUCCESS,
      PICKUP_REWARD_SUCCESS,
      DELETE_QUESTION_SUCCESS,
      DELETE_ANSWER_SUCCESS,
      DELETE_COMMENT_SUCCESS,
      SAVE_COMMENT_SUCCESS,
    ],
    getCurrentAccountWorker,
  );
}
