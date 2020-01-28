import { call, put, select, takeLatest, all, take } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';
import { updateAcc } from 'utils/accountManagement';
import { getBalance } from 'utils/walletManagement';
import {
  MODERATOR_KEY,
  INVITED_USERS_SCOPE,
  INVITED_USERS_TABLE,
  REWARD_REFER,
} from 'utils/constants';

import { selectEos } from 'containers/EosioProvider/selectors';

import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';

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

import { redirectToEditQuestionPageWorker } from 'containers/EditQuestion/saga';
import { redirectToEditAnswerPageWorker } from 'containers/EditAnswer/saga';

import {
  UPVOTE_SUCCESS as UPVOTE_COMM_SUCCESS,
  DOWNVOTE_SUCCESS as DOWNVOTE_COMM_SUCCESS,
} from 'containers/VoteForNewCommunityButton/constants';

import {
  UPVOTE_SUCCESS as UPVOTE_TAGS_SUCCESS,
  DOWNVOTE_SUCCESS as DOWNVOTE_TAGS_SUCCESS,
} from 'containers/VoteForNewTagButton/constants';

import { PROFILE_INFO_LS, AUTOLOGIN_DATA } from 'containers/Login/constants';

import { redirectToEditProfilePageWorker } from 'containers/EditProfilePage/saga';
import { REDIRECT_TO_EDIT_PROFILE_PAGE } from 'containers/EditProfilePage/constants';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';

import {
  DELETE_QUESTION_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  SAVE_COMMENT_SUCCESS,
} from 'containers/ViewQuestion/constants';

import { getFormattedNum4 } from 'utils/numbers';
import { getCookie, setCookie } from 'utils/cookie';
import { addToast } from 'containers/Toast/actions';

import {
  getCurrentAccountSuccess,
  getCurrentAccountError,
  getCurrentAccountProcessing,
  updateAccSuccess,
  updateAccErr,
} from './actions';

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  REFERRAL_REWARD_RATING,
  UPDATE_ACC_SUCCESS,
} from './constants';

import { makeSelectProfileInfo } from './selectors';

/* eslint func-names: 0, consistent-return: 0 */
export function* getCurrentAccountWorker(initAccount) {
  try {
    yield put(getCurrentAccountProcessing());

    const eosService = yield select(selectEos);
    const prevProfileInfo = yield select(makeSelectProfileInfo());

    let account = yield typeof initAccount === 'string'
      ? initAccount
      : call(eosService.getSelectedAccount);

    if (!account) {
      const autoLoginData = JSON.parse(
        sessionStorage.getItem(AUTOLOGIN_DATA) ||
          localStorage.getItem(AUTOLOGIN_DATA),
      );

      if (autoLoginData) {
        account = autoLoginData.eosAccountName;
      }
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

    if (profileInfo) {
      profileInfo.balance = balance;

      if (prevProfileInfo) {
        profileInfo.profile = prevProfileInfo.profile;
      }
    }

    localStorage.setItem(PROFILE_INFO_LS, JSON.stringify(profileInfo));

    if (
      profileInfo &&
      (process.env.NODE_ENV !== 'production' ||
        (process.env.NODE_ENV === 'production' && process.env.IS_TEST_ENV))
    ) {
      console.log(
        JSON.stringify({
          user: profileInfo.user,
          energy: profileInfo.energy,
          rating: profileInfo.rating,
        }),
      );
    }

    yield put(getUserProfileSuccess(profileInfo));
    yield put(getCurrentAccountSuccess(account, balance));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

export function* isAvailableAction(isValid) {
  const profileInfo = yield select(makeSelectProfileInfo());

  if (profileInfo.integer_properties.find(x => x.key === MODERATOR_KEY)) {
    return true;
  }

  yield call(isValid);
}

const getInvitedTable = async (user, eosService) => {
  const invitedUsers = await eosService.getTableRows(
    INVITED_USERS_TABLE,
    INVITED_USERS_SCOPE,
    user,
    undefined,
    undefined,
    undefined,
    undefined,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );
  return invitedUsers;
};

function* updateRefer(user, eosService) {
  const cookieName = `reward_${user}`;
  if (getCookie(cookieName)) {
    return;
  }
  const invitedUsersInfo = yield call(getInvitedTable, user, eosService);
  const info = invitedUsersInfo.find(({ inviter }) => inviter === user);

  if (info) {
    const reward = +getFormattedNum4(info.common_reward);
    if (reward) {
      setCookie({ name: cookieName, value: true });
      yield put(
        addToast({
          type: 'success',
          text: 'You received referral reward!',
        }),
      );
    }
  }
}

const rewardRefer = async (user, eosService) => {
  await eosService.sendTransaction(
    user,
    REWARD_REFER,
    {
      invited_user: user,
    },
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    null,
  );
};

export function* updateAccWorker({ eos }) {
  try {
    const account = yield call(eos.getSelectedAccount);
    let profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      yield take(GET_CURRENT_ACCOUNT_SUCCESS);
      profileInfo = yield select(makeSelectProfileInfo());
    }

    if (account) {
      if (profileInfo.pay_out_rating > REFERRAL_REWARD_RATING) {
        yield call(rewardRefer, profileInfo.user, eos);
      }
      yield call(updateRefer, profileInfo.user, eos);
      yield call(updateAcc, profileInfo, eos);
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
  yield takeLatest(UPDATE_ACC_SUCCESS, updateStoredQuestionsWorker);
  yield takeLatest(
    [
      GET_CURRENT_ACCOUNT,
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
