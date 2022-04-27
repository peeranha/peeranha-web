import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import { getProfileInfo } from 'utils/profileManagement';
import { emptyProfile, isUserExists, updateAcc } from 'utils/accountManagement';
import {
  convertPeerValueToNumberValue,
  getBalance,
} from 'utils/walletManagement';
import {
  isSingleCommunityWebsite,
  setSingleCommunityDetails,
} from 'utils/communityManagement';

import commonMessages from 'common-messages';

import { selectEos } from 'containers/EosioProvider/selectors';

import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { addToast } from 'containers/Toast/actions';

import { redirectToAskQuestionPageWorker } from 'containers/AskQuestion/saga';
import { redirectToCreateCommunityWorker } from 'containers/CreateCommunity/saga';
import { redirectToCreateTagWorker } from 'containers/CreateTag/saga';
import { redirectToEditQuestionPageWorker } from 'containers/EditQuestion/saga';
import { redirectToEditAnswerPageWorker } from 'containers/EditAnswer/saga';
import { redirectToEditProfilePageWorker } from 'containers/EditProfilePage/saga';

import {
  ALL_PROPERTY_COMMUNITY_SCOPE,
  ALL_PROPERTY_COMMUNITY_TABLE,
  INVITED_USERS_SCOPE,
  INVITED_USERS_TABLE,
  MODERATOR_KEY,
  REWARD_REFER,
} from 'utils/constants';
import { SHOW_WALLET_SIGNUP_FORM_SUCCESS } from 'containers/SignUp/constants';
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
import { SEND_TIPS_SUCCESS } from 'containers/SendTips/constants';
import { PICKUP_REWARD_SUCCESS } from 'containers/Wallet/constants';
import {
  DOWNVOTE_SUCCESS as DOWNVOTE_COMM_SUCCESS,
  UPVOTE_SUCCESS as UPVOTE_COMM_SUCCESS,
} from 'containers/VoteForNewCommunityButton/constants';
import {
  DOWNVOTE_SUCCESS as DOWNVOTE_TAGS_SUCCESS,
  UPVOTE_SUCCESS as UPVOTE_TAGS_SUCCESS,
} from 'containers/VoteForNewTagButton/constants';
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
import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  NO_REFERRAL_INVITER,
  REFERRAL_REWARD_RATING,
  REFERRAL_REWARD_RECEIVED,
  REFERRAL_REWARD_SENT,
} from './constants';

import {
  addLoginData,
  getCurrentAccountError,
  getCurrentAccountProcessing,
  getCurrentAccountSuccess,
  updateAccErr,
  updateAccSuccess,
} from './actions';
import { makeSelectProfileInfo } from './selectors';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { translationMessages } from '../../i18n';
import { selectEthereum } from '../EthereumProvider/selectors';
import { hasGlobalModeratorRole } from '../../utils/properties';

const single = isSingleCommunityWebsite();

/* eslint func-names: 0, consistent-return: 0 */
export const getCurrentAccountWorker = function*(initAccount) {
  try {
    yield put(getCurrentAccountProcessing());

    const ethereumService = yield select(selectEthereum);

    if (ethereumService.withMetaMask)
      yield put(addLoginData({ loginWithMetaMask: true }));

    // const globalBoostStat = yield call(getGlobalBoostStatistics, eosService);

    let account = yield typeof initAccount === 'string'
      ? initAccount
      : call(ethereumService.getSelectedAccount);

    if (!account) {
      const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);
      if (autoLoginData) {
        account = autoLoginData.ethereumUserAddress;
      }
    } else if (account.email) {
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

    const [profileInfo, balance] = yield all([
      call(getProfileInfo, account, ethereumService, true, true),
      call(getBalance, ethereumService, account),
    ]);

    // const stakedInCurrentPeriod = 0;
    // const stakedInNextPeriod = 0;
    // const boost = {};

    if (profileInfo) {
      //   // update user achievements
      //   yield call(updateUserAchievementsWorker, profileInfo.user);
      //
      yield call(getNotificationsInfoWorker, profileInfo.user);
      //  yield call(getWeekStatWorker);
      //
      //   // Update info for question depending on user
      //   const viewQuestion = yield select(selectQuestionData());
      //   if (
      //     window.location.pathname.includes(routes.questionView(viewQuestion?.id))
      //   ) {
      //     const updatedQuestion = yield call(getQuestionData, {
      //       questionId: viewQuestion.id,
      //       user: profileInfo.user,
      //       promote: viewQuestion.promote || null,
      //     });
      //
      //     yield put(getQuestionDataSuccess(updatedQuestion));
      //   }
      //
      //   profileInfo.balance = balance;
      //
      //   if (prevProfileInfo) {
      //     profileInfo.profile = prevProfileInfo.profile;
      //   }
      //
      //   // update user available balance
      //   const weekStat = yield call(getWeekStat, eosService, profileInfo);
      //   const userBoostStat = yield call(
      //     getUserBoostStatistics,
      //     eosService,
      //     profileInfo.user,
      //   );
      //
      //   const boostWeeks = yield call(
      //     getBoostWeeks,
      //     weekStat,
      //     globalBoostStat,
      //     userBoostStat,
      //   );
      //   const { currentWeek, nextWeek } = boostWeeks;
      //   const { userStake, maxStake } = currentWeek;
      //
      //   stakedInCurrentPeriod = currentWeek.userStake;
      //   stakedInNextPeriod = nextWeek.userStake;
      //
      //   boost = yield call(getPredictedBoost, userStake, maxStake);
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
    yield put(getCurrentAccountSuccess(account, balance));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
};

export function* isAvailableAction(isValid, data = {}) {
  const { skipPermissions } = data;
  const profileInfo = yield select(makeSelectProfileInfo());
  if (hasGlobalModeratorRole(profileInfo.permissions)) {
    return true;
  }

  if (!skipPermissions) {
    if (profileInfo.integer_properties?.find(x => x.key === MODERATOR_KEY)) {
      return true;
    }
  }

  yield call(isValid);
}

export const getReferralInfo = async (user, ethereum) => {
  const info = await eosService.getTableRow(
    INVITED_USERS_TABLE,
    INVITED_USERS_SCOPE,
    user,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );
  return info;
};

function* updateRefer(user, ethereum) {
  const receivedCookieName = `${REFERRAL_REWARD_RECEIVED}_${user}`;
  const noInviterCookieName = `${NO_REFERRAL_INVITER}_${user}`;

  if (getCookie(receivedCookieName) || getCookie(noInviterCookieName)) {
    return;
  }

  const info = yield call(getReferralInfo, user, ethereum);

  if (info) {
    const reward = +convertPeerValueToNumberValue(info.common_reward);
    if (reward) {
      const locale = yield select(makeSelectLocale());
      setCookie({
        name: receivedCookieName,
        value: true,
        options: {
          allowSubdomains: true,
          neverExpires: true,
          defaultPath: true,
        },
      });
      yield put(
        addToast({
          type: 'success',
          text: translationMessages[locale][commonMessages.receivedReward.id],
        }),
      );
    }
  } else {
    setCookie({
      name: noInviterCookieName,
      value: true,
      options: {
        allowSubdomains: true,
        neverExpires: true,
        defaultPath: true,
      },
    });
  }
}

const rewardRefer = async (user, eosService) => {
  try {
    await eosService.sendTransaction(
      user,
      REWARD_REFER,
      {
        invited_user: user,
      },
      process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
      null,
    );
  } catch (err) {
    return err;
  }
};

export function* updateAccWorker({ ethereum }) {
  try {
    const account = yield call(ethereum.getSelectedAccount);
    let profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      yield take(GET_CURRENT_ACCOUNT_SUCCESS);
      profileInfo = yield select(makeSelectProfileInfo());
    }

    if (profileInfo) {
      const { user, pay_out_rating } = profileInfo;

      // yield call(updateRefer, user, ethereum);

      if (account) {
        const sentCookieName = `${REFERRAL_REWARD_SENT}_${user}`;
        const noInviterCookieName = `${NO_REFERRAL_INVITER}_${user}`;
        const receivedCookieName = `${REFERRAL_REWARD_RECEIVED}_${user}`;
        if (
          pay_out_rating > REFERRAL_REWARD_RATING &&
          !getCookie(sentCookieName) &&
          !getCookie(noInviterCookieName) &&
          !getCookie(receivedCookieName)
        ) {
          // const err = yield call(rewardRefer, user, ethereum);
          //
          // if (err instanceof Error) {
          //   yield put(rewardReferErr(err));
          // } else {
          setCookie({
            name: sentCookieName,
            value: true,
            options: {
              allowSubdomains: true,
              neverExpires: true,
              defaultPath: true,
            },
          });
          // }
        }

        yield call(updateAcc, profileInfo, ethereum);
        yield call(getCurrentAccountWorker);
        yield put(updateAccSuccess());
      }
    }
  } catch (err) {
    yield put(updateAccErr(err));
  }
}

export function* getCommunityPropertyWorker(profile) {
  try {
    const profileInfo = profile || (yield select(makeSelectProfileInfo()));
    const eosService = yield select(selectEos);

    if (single) {
      yield call(setSingleCommunityDetails, eosService);
    }

    const info = yield call(
      eosService.getTableRow,
      ALL_PROPERTY_COMMUNITY_TABLE,
      ALL_PROPERTY_COMMUNITY_SCOPE,
      profileInfo.user,
    );

    yield put(
      getUserProfileSuccess({
        ...profile,
        permissions: info?.properties ?? [],
      }),
    );
    // eslint-disable-next-line no-empty
  } catch (e) {}
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
      SHOW_WALLET_SIGNUP_FORM_SUCCESS,
      ASK_QUESTION_SUCCESS,
      POST_ANSWER_SUCCESS,
      CREATE_COMMUNITY_SUCCESS,
      SUGGEST_TAG_SUCCESS,
      EDIT_ANSWER_SUCCESS,
      EDIT_QUESTION_SUCCESS,
      SEND_TOKENS_SUCCESS,
      SEND_TIPS_SUCCESS,
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
