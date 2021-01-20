import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';
import * as routes from 'routes-config';
import _get from 'lodash/get';

import { getProfileInfo, getUserTelegramData } from 'utils/profileManagement';
import { updateAcc } from 'utils/accountManagement';
import {
  convertPeerValueToNumberValue,
  getBalance,
  getWeekStat,
  getGlobalBoostStatistics,
  getUserBoostStatistics,
  getPredictedBoost,
  getBoostWeeks,
} from 'utils/walletManagement';

import commonMessages from 'common-messages';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { selectQuestionData } from '../ViewQuestion/selectors';
import { makeSelectProfileInfo } from './selectors';

import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { getUserTelegramDataSuccess } from 'containers/TelegramAccountAction/actions';
import { addToast } from 'containers/Toast/actions';
import {
  addLoginData,
  getCurrentAccountError,
  getCurrentAccountProcessing,
  getCurrentAccountSuccess,
  rewardReferErr,
  updateAccErr,
  updateAccSuccess,
} from './actions';
import { getQuestionDataSuccess } from '../ViewQuestion/actions';

import { redirectToAskQuestionPageWorker } from 'containers/AskQuestion/saga';
import { redirectToCreateCommunityWorker } from 'containers/CreateCommunity/saga';
import { redirectToCreateTagWorker } from 'containers/CreateTag/saga';
import { redirectToEditQuestionPageWorker } from 'containers/EditQuestion/saga';
import { redirectToEditAnswerPageWorker } from 'containers/EditAnswer/saga';
import { redirectToEditProfilePageWorker } from 'containers/EditProfilePage/saga';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';
import { getNotificationsInfoWorker } from 'components/Notifications/saga';
import { updateUserAchievementsWorker } from 'containers/Achievements/saga';
import { getWeekStatWorker } from 'containers/Wallet/saga';
import { getQuestionData } from '../ViewQuestion/saga';

import {
  ALL_PROPERTY_COMMUNITY_SCOPE,
  ALL_PROPERTY_COMMUNITY_TABLE,
  INVITED_USERS_SCOPE,
  INVITED_USERS_TABLE,
  MODERATOR_KEY,
  REWARD_REFER,
  COMMUNITY_ADMIN_VALUE,
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
import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  NO_REFERRAL_INVITER,
  REFERRAL_REWARD_RATING,
  REFERRAL_REWARD_RECEIVED,
  REFERRAL_REWARD_SENT,
  UPDATE_ACC_SUCCESS,
} from './constants';

import { getCookie, setCookie } from 'utils/cookie';
import { translationMessages } from '../../i18n';

/* eslint func-names: 0, consistent-return: 0 */
export const getCurrentAccountWorker = function*(initAccount) {
  try {
    yield put(getCurrentAccountProcessing());

    const eosService = yield select(selectEos);
    const prevProfileInfo = yield select(makeSelectProfileInfo());

    if (eosService.withScatter)
      yield put(addLoginData({ loginWithScatter: true }));

    if (eosService.withKeycat)
      yield put(addLoginData({ loginWithKeycat: true }));

    const globalBoostStat = yield call(getGlobalBoostStatistics, eosService);

    let account = yield typeof initAccount === 'string'
      ? initAccount
      : call(eosService.getSelectedAccount);

    if (!account) {
      const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

      if (autoLoginData) {
        account = autoLoginData.eosAccountName;
      }

      if (autoLoginData?.loginWithScatter) {
        put(
          yield put(
            addLoginData({ loginWithScatter: autoLoginData.loginWithScatter }),
          ),
        );
      }

      if (autoLoginData?.loginWithKeycat) {
        put(
          yield put(
            addLoginData({ loginWithKeycat: autoLoginData.loginWithKeycat }),
          ),
        );
      }
    }

    if (account && typeof account === 'object') {
      account = account.eosAccountName;
    }

    if (!prevProfileInfo) {
      const profileLS = JSON.parse(getCookie(PROFILE_INFO_LS) || null);
      if (
        profileLS &&
        (account === profileLS.user ||
          (account && account.eosAccountName === profileLS.user))
      ) {
        // user available balance
        const weekStat = yield call(getWeekStat, eosService, profileLS);
        const userBoostStat = yield call(
          getUserBoostStatistics,
          eosService,
          profileLS.user,
        );

        const boostWeeks = yield call(
          getBoostWeeks,
          weekStat,
          globalBoostStat,
          userBoostStat,
        );
        const { currentWeek, nextWeek } = boostWeeks;
        const { userStake, maxStake } = currentWeek;

        const boost = yield call(getPredictedBoost, userStake, maxStake);

        yield put(getUserProfileSuccess(profileLS));
        yield put(
          getCurrentAccountSuccess(
            profileLS.user,
            profileLS.balance,
            currentWeek.userStake,
            nextWeek.userStake,
            boost,
          ),
        );

        return null;
      }
    }

    const [profileInfo, balance] = yield all([
      call(
        getProfileInfo,
        _get(account, 'eosAccountName', account),
        eosService,
        !prevProfileInfo,
      ),
      call(getBalance, eosService, account),
    ]);

    let stakedInCurrentPeriod = 0;
    let stakedInNextPeriod = 0;
    let boost = {};

    if (profileInfo) {
      // update user achievements
      yield call(updateUserAchievementsWorker, profileInfo.user);

      yield call(getNotificationsInfoWorker, profileInfo.user);
      yield call(getWeekStatWorker);

      // Update info for question depending on user
      const viewQuestion = yield select(selectQuestionData());
      if (
        window.location.pathname.includes(routes.questionView(viewQuestion?.id))
      ) {
        const updatedQuestion = yield call(getQuestionData, {
          questionId: viewQuestion.id,
          user: profileInfo.user,
        });

        yield put(getQuestionDataSuccess(updatedQuestion));
      }

      profileInfo.balance = balance;

      if (prevProfileInfo) {
        profileInfo.profile = prevProfileInfo.profile;
      }

      // update user available balance
      const weekStat = yield call(getWeekStat, eosService, profileInfo);
      const userBoostStat = yield call(
        getUserBoostStatistics,
        eosService,
        profileInfo.user,
      );

      const boostWeeks = yield call(
        getBoostWeeks,
        weekStat,
        globalBoostStat,
        userBoostStat,
      );
      const { currentWeek, nextWeek } = boostWeeks;
      const { userStake, maxStake } = currentWeek;

      stakedInCurrentPeriod = currentWeek.userStake;
      stakedInNextPeriod = nextWeek.userStake;

      boost = yield call(getPredictedBoost, userStake, maxStake);
    }

    setCookie({
      name: PROFILE_INFO_LS,
      value: JSON.stringify(profileInfo),
      options: {
        defaultPath: true,
        allowSubdomains: true,
      },
    });

    const userTgInfo = yield call(getUserTelegramData, eosService, account);

    yield put(
      addLoginData(JSON.parse(getCookie(AUTOLOGIN_DATA) || null) || {}),
    );
    yield put(getUserProfileSuccess(profileInfo));
    yield call(getCommunityPropertyWorker, profileInfo);
    yield put(
      getCurrentAccountSuccess(
        account,
        balance,
        stakedInCurrentPeriod,
        stakedInNextPeriod,
        boost,
      ),
    );
    yield put(getUserTelegramDataSuccess(userTgInfo));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
};

export function* isAvailableAction(isValid, data = {}) {
  const { communityID, skipPermissions } = data;

  if (!skipPermissions) {
    const profileInfo = yield select(makeSelectProfileInfo());

    if (profileInfo.integer_properties.find(x => x.key === MODERATOR_KEY)) {
      return true;
    }

    if (
      profileInfo.permissions?.find(
        x => x.value == COMMUNITY_ADMIN_VALUE && x.community == communityID,
      )
    ) {
      return true;
    }
  }

  yield call(isValid);
}

export const getReferralInfo = async (user, eosService) => {
  const info = await eosService.getTableRow(
    INVITED_USERS_TABLE,
    INVITED_USERS_SCOPE,
    user,
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
  );
  return info;
};

function* updateRefer(user, eosService) {
  const receivedCookieName = `${REFERRAL_REWARD_RECEIVED}_${user}`;
  const noInviterCookieName = `${NO_REFERRAL_INVITER}_${user}`;

  if (getCookie(receivedCookieName) || getCookie(noInviterCookieName)) {
    return;
  }

  const info = yield call(getReferralInfo, user, eosService);

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

export function* updateAccWorker({ eos }) {
  try {
    const account = yield call(eos.getSelectedAccount);
    let profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      yield take(GET_CURRENT_ACCOUNT_SUCCESS);
      profileInfo = yield select(makeSelectProfileInfo());
    }

    if (profileInfo) {
      yield call(updateRefer, profileInfo.user, eos);
    }

    if (account) {
      const { user } = profileInfo;
      const sentCookieName = `${REFERRAL_REWARD_SENT}_${user}`;
      const noInviterCookieName = `${NO_REFERRAL_INVITER}_${user}`;
      const receivedCookieName = `${REFERRAL_REWARD_RECEIVED}_${user}`;
      if (
        profileInfo.pay_out_rating > REFERRAL_REWARD_RATING &&
        !getCookie(sentCookieName) &&
        !getCookie(noInviterCookieName) &&
        !getCookie(receivedCookieName)
      ) {
        const err = yield call(rewardRefer, user, eos);

        if (err instanceof Error) {
          yield put(rewardReferErr(err));
        } else {
          setCookie({
            name: sentCookieName,
            value: true,
            options: {
              allowSubdomains: true,
              neverExpires: true,
              defaultPath: true,
            },
          });
        }
      }

      yield call(updateAcc, profileInfo, eos);
      yield call(getCurrentAccountWorker);
      yield put(updateAccSuccess());
    }
  } catch (err) {
    yield put(updateAccErr(err));
  }
}

export function* getCommunityPropertyWorker(profile) {
  try {
    const profileInfo = profile || (yield select(makeSelectProfileInfo()));
    const eosService = yield select(selectEos);

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
  yield takeLatest(UPDATE_ACC_SUCCESS, updateStoredQuestionsWorker);
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
