import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import _get from 'lodash/get';
import { getProfileInfo } from 'utils/profileManagement';
import { updateAcc } from 'utils/accountManagement';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import {
  convertPeerValueToNumberValue,
  getBalance,
} from 'utils/walletManagement';
import {
  ALL_PROPERTY_COMMUNITY_SCOPE,
  ALL_PROPERTY_COMMUNITY_TABLE,
  INVITED_USERS_SCOPE,
  INVITED_USERS_TABLE,
  MODERATOR_KEY,
  REWARD_REFER,
} from 'utils/constants';
import {
  findOfficialRepresentativeProperty,
  isUserAdmin,
} from 'utils/properties';
import commonMessages from 'common-messages';

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

import { redirectToEditQuestionPageWorker } from 'containers/EditQuestion/saga';
import { redirectToEditAnswerPageWorker } from 'containers/EditAnswer/saga';

import {
  DOWNVOTE_SUCCESS as DOWNVOTE_COMM_SUCCESS,
  UPVOTE_SUCCESS as UPVOTE_COMM_SUCCESS,
} from 'containers/VoteForNewCommunityButton/constants';

import {
  DOWNVOTE_SUCCESS as DOWNVOTE_TAGS_SUCCESS,
  UPVOTE_SUCCESS as UPVOTE_TAGS_SUCCESS,
} from 'containers/VoteForNewTagButton/constants';

import { AUTOLOGIN_DATA, PROFILE_INFO_LS } from 'containers/Login/constants';

import { redirectToEditProfilePageWorker } from 'containers/EditProfilePage/saga';
import { REDIRECT_TO_EDIT_PROFILE_PAGE } from 'containers/EditProfilePage/constants';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';

import {
  DELETE_ANSWER_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  SAVE_COMMENT_SUCCESS,
} from 'containers/ViewQuestion/constants';

import { getCookie, setCookie } from 'utils/cookie';
import { addToast } from 'containers/Toast/actions';

import { getNotificationsInfoWorker } from 'components/Notifications/saga';

import {
  getCurrentAccountError,
  getCurrentAccountProcessing,
  getCurrentAccountSuccess,
  rewardReferErr,
  updateAccErr,
  updateAccSuccess,
} from './actions';

import {
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  NO_REFERRAL_INVITER,
  REFERRAL_REWARD_RATING,
  REFERRAL_REWARD_RECEIVED,
  REFERRAL_REWARD_SENT,
  UPDATE_ACC_SUCCESS,
} from './constants';

import { makeSelectProfileInfo } from './selectors';
import { translationMessages } from '../../i18n';
import { makeSelectLocale } from '../LanguageProvider/selectors';

const single = isSingleCommunityWebsite();

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
      const autoLoginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

      if (autoLoginData) {
        account = autoLoginData.eosAccountName;
      }
    }

    if (!prevProfileInfo) {
      const profileLS = JSON.parse(getCookie(PROFILE_INFO_LS) || null);
      if (
        profileLS &&
        (account === profileLS.user ||
          (account && account.eosAccountName === profileLS.user))
      ) {
        yield put(getUserProfileSuccess(profileLS));
        yield put(getCurrentAccountSuccess(profileLS.user, profileLS.balance));

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

    if (profileInfo) {
      yield call(getNotificationsInfoWorker, profileInfo.user);
    }

    if (profileInfo) {
      profileInfo.balance = balance;

      if (prevProfileInfo) {
        profileInfo.profile = prevProfileInfo.profile;
      }
    }

    setCookie({
      name: PROFILE_INFO_LS,
      value: JSON.stringify(profileInfo),
      options: {
        defaultPath: true,
        allowSubdomains: true,
      },
    });

    yield put(getUserProfileSuccess(profileInfo));
    yield call(getCommunityPropertyWorker, profileInfo);
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
    if (single) {
      const profileInfo = profile || (yield select(makeSelectProfileInfo()));
      const eosService = yield select(selectEos);

      const info = yield call(
        eosService.getTableRow,
        ALL_PROPERTY_COMMUNITY_TABLE,
        ALL_PROPERTY_COMMUNITY_SCOPE,
        profileInfo.user,
      );

      if (info) {
        const isAdmin = isUserAdmin(info.properties);
        const officialRepresentativeInfo = findOfficialRepresentativeProperty(
          info.properties,
        );

        if (isAdmin) {
          yield put(getUserProfileSuccess({ ...profileInfo, isAdmin: true }));
        }

        if (officialRepresentativeInfo) {
          yield put(
            getUserProfileSuccess({
              ...profile,
              isOfficialRepresentative: !!officialRepresentativeInfo,
              officialRepresentativeCommunity:
                officialRepresentativeInfo.community,
            }),
          );
        }
      }
    }
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
