import { call, put, takeLatest, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import crypto from 'crypto';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  registerAccount,
  inviteUser,
  isUserInSystem,
} from 'utils/accountManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError, ApplicationError } from 'utils/errors';
import {
  followCommunity,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';
import { setCookie } from 'utils/cookie';

import { redirectToFeed } from 'containers/App/actions';
import { showWalletSignUpFormSuccess } from 'containers/SignUp/actions';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  getCurrentAccountWorker,
  getReferralInfo,
  getCommunityPropertyWorker,
} from 'containers/AccountProvider/saga';

import { ACCOUNT_NOT_CREATED_NAME } from 'containers/SignUp/constants';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { hideLeftMenu } from 'containers/AppWrapper/actions';
import { selectIsMenuVisible } from 'containers/AppWrapper/selectors';

import {
  loginWithEmailSuccess,
  loginWithEmailErr,
  finishRegistrationWithDisplayNameSuccess,
  finishRegistrationWithDisplayNameErr,
  hideLoginModal,
  finishRegistrationReferralErr,
  loginWithWalletSuccess,
  loginWithWalletErr,
  setFacebookLoginProcessing,
  setFacebookUserData,
  addFacebookError,
} from './actions';

import {
  FINISH_REGISTRATION,
  LOGIN_WITH_EMAIL,
  SCATTER_MODE_ERROR,
  USER_IS_NOT_REGISTERED,
  USER_IS_NOT_SELECTED,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  REMEMBER_ME_FIELD,
  WE_ARE_HAPPY_FORM,
  DISPLAY_NAME,
  AUTOLOGIN_DATA,
  REFERRAL_CODE,
  LOGIN_WITH_WALLET,
  FACEBOOK_LOGIN_BUTTON_CLICK,
  FACEBOOK_LOGIN_DATA_RECEIVE,
  AUTOLOGIN_WITH_FACEBOOK,
} from './constants';

import messages, { getAccountNotSelectedMessageDescriptor } from './messages';
import { makeSelectEosAccount, selectFacebookUserData } from './selectors';
import { addToast } from '../Toast/actions';
import { initEosioSuccess } from '../EosioProvider/actions';
import { getNotificationsInfoWorker } from '../../components/Notifications/saga';
import { addLoginData } from '../AccountProvider/actions';

import {
  callService,
  LOGIN_WITH_FACEBOOK_SERVICE,
  REGISTER_WITH_FACEBOOK_SERVICE,
} from '../../utils/web_integration/src/util/aws-connector';
import { decryptObject } from '../../utils/web_integration/src/util/cipher';
import { uploadImg } from '../../utils/profileManagement';
import { blobToBase64 } from '../../utils/blob';

function* continueLogin({ activeKey, eosAccountName }) {
  yield call(getCurrentAccountWorker, eosAccountName);
  const profileInfo = yield select(makeSelectProfileInfo());

  const eosService = yield select(selectEos);

  yield call(
    eosService.initEosioWithoutScatter,
    activeKey.private,
    eosAccountName,
  );

  yield call(getNotificationsInfoWorker, profileInfo?.user);

  yield call(getCommunityPropertyWorker);

  yield put(initEosioSuccess(eosService));

  if (
    profileInfo &&
    window.location.pathname.includes(routes.registrationStage)
  )
    yield put(redirectToFeed());

  yield put(loginWithEmailSuccess());

  // If user is absent - show window to finish registration
  if (!profileInfo) {
    yield put(loginWithEmailSuccess(eosAccountName, WE_ARE_HAPPY_FORM));
  }
}

export function* loginWithEmailWorker({ val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const email = val[EMAIL_FIELD];
    const password = val[PASSWORD_FIELD];
    const rememberMe = Boolean(val[REMEMBER_ME_FIELD]);

    const response = yield call(login, email, password, rememberMe);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    if (response.body.eosAccountName === ACCOUNT_NOT_CREATED_NAME) {
      throw new WebIntegrationError(
        translations[messages.accountNotCreatedName.id],
      );
    }

    yield put(addLoginData(response.peeranhaAutoLogin));
    yield call(continueLogin, response.body);
  } catch (err) {
    yield put(loginWithEmailErr(err));
  }
}

export function* loginWithWalletWorker({ keycat, scatter }) {
  try {
    const eosService = yield select(selectEos);
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    let currentAccount;
    let keycatUserData = null;

    if (keycat) {
      keycatUserData = yield call(eosService.keycatSignIn);

      if (!keycatUserData) {
        throw new WebIntegrationError(
          translations[messages[USER_IS_NOT_SELECTED].id],
        );
      }

      currentAccount = keycatUserData.accountName;
    }

    if (scatter) {
      yield call(eosService.forgetIdentity);
      yield call(eosService.initEosioWithScatter);

      if (!eosService.scatterInstalled) {
        throw new WebIntegrationError(
          translations[messages[SCATTER_MODE_ERROR].id],
        );
      }

      if (!eosService.selectedAccount) {
        throw new WebIntegrationError(
          translations[
            getAccountNotSelectedMessageDescriptor(
              eosService.isScatterExtension,
            ).id
          ],
        );
      }

      currentAccount = eosService.selectedAccount;
    }

    yield call(getCurrentAccountWorker, currentAccount);
    const profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      yield put(showWalletSignUpFormSuccess(currentAccount));
      yield call(createdHistory.push, routes.signup.displayName.name);

      yield put(hideLoginModal());
      throw new ApplicationError(
        translations[messages[USER_IS_NOT_REGISTERED].id],
      );
    }

    yield call(getNotificationsInfoWorker, profileInfo.user);

    yield call(getCommunityPropertyWorker);

    const autologinData = keycat
      ? { keycatUserData, loginWithKeycat: true }
      : { loginWithScatter: true };

    setCookie({
      name: AUTOLOGIN_DATA,
      value: JSON.stringify(autologinData),
      options: {
        allowSubdomains: true,
        defaultPath: true,
      },
    });

    yield put(addLoginData(autologinData));

    if (window.location.pathname.includes(routes.registrationStage))
      yield put(redirectToFeed());

    yield put(loginWithWalletSuccess());
  } catch (err) {
    yield put(loginWithWalletErr(err));
  }
}

export function* sendReferralCode(
  accountName,
  referralCode,
  eosService,
  error,
) {
  const info = yield call(getReferralInfo, accountName, eosService);
  if (info) {
    return true;
  }
  const isUserIn = yield call(isUserInSystem, referralCode, eosService);

  if (isUserIn) {
    try {
      yield call(inviteUser, accountName, referralCode, eosService);
    } catch (err) {
      yield put(error(err));
      return false;
    }
    return true;
  }
  const locale = yield select(makeSelectLocale());
  const text = translationMessages[locale][messages.inviterIsNotRegisterYet.id];
  yield put(addToast({ type: 'error', text }));
  yield put(error(new Error(text)));

  return false;
}

export function* finishRegistrationWorker({ val }) {
  try {
    const eosService = yield select(selectEos);
    const accountName = yield select(makeSelectEosAccount());

    const referralCode = val[REFERRAL_CODE];
    const profile = {
      accountName,
      displayName: val[DISPLAY_NAME],
    };

    if (referralCode) {
      const ok = yield call(
        sendReferralCode,
        accountName,
        referralCode,
        eosService,
        finishRegistrationReferralErr,
      );
      if (!ok) {
        return;
      }
    }

    const facebookUserData = yield select(selectFacebookUserData());
    let imgHash = null;

    if (facebookUserData.picture) {
      const img = yield call(async () => {
        const response = await fetch(facebookUserData.picture);
        const data = await blobToBase64(await response.blob());

        return data;
      });

      // eslint-disable-next-line prefer-destructuring
      imgHash = (yield call(uploadImg, img)).imgHash;
    }

    yield call(registerAccount, profile, eosService, imgHash);

    yield call(getCurrentAccountWorker);

    const singleCommunityId = isSingleCommunityWebsite();

    if (singleCommunityId) {
      yield call(followCommunity, eosService, singleCommunityId, accountName);
    }

    yield put(finishRegistrationWithDisplayNameSuccess());
  } catch (err) {
    yield put(finishRegistrationWithDisplayNameErr(err));
  }
}

export function* redirectToFeedWorker() {
  const isLeftMenuVisible = yield select(selectIsMenuVisible());
  const profileInfo = yield select(makeSelectProfileInfo());
  const singleCommunityId = isSingleCommunityWebsite();

  if (isLeftMenuVisible) {
    yield put(hideLeftMenu());
  }

  if (profileInfo && !singleCommunityId) {
    yield call(createdHistory.push, routes.feed());
  } else if (singleCommunityId) {
    yield call(createdHistory.push, routes.questions());
  }
}

export function* facebookLoginButtonClickedWorker() {
  yield put(setFacebookLoginProcessing(true));
}

export function* loginWithFacebookWorker({ data }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const facebookUserData = {
      name: data.name,
      picture: data.picture.data.url,
    };

    yield put(setFacebookUserData(facebookUserData));

    const response = yield call(callService, LOGIN_WITH_FACEBOOK_SERVICE, {
      accessToken: data.accessToken,
    });

    if (response.errorCode) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const decryptedData = decryptObject(
      response.body.response,
      crypto
        .createHash('sha256')
        .update(data.userID)
        .digest('base64')
        .substr(0, 64),
    );

    if (decryptedData.eosAccountName === ACCOUNT_NOT_CREATED_NAME) {
      throw new WebIntegrationError(
        translations[messages.accountNotCreatedName.id],
      );
    }

    yield call(continueLogin, decryptedData);
    setCookie({
      name: AUTOLOGIN_DATA,
      value: JSON.stringify({
        loginWithFacebook: true,
      }),
      options: {
        allowSubdomains: true,
        defaultPath: true,
      },
    });
  } catch (err) {
    yield put(addFacebookError(err));
  }
}

export function* facebookLoginCallbackWorker({ data, isLogin }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    if (isLogin && data.userID) {
      yield call(loginWithFacebookWorker, { data });
    } else if (data.userID) {
      const response = yield call(callService, REGISTER_WITH_FACEBOOK_SERVICE, {
        accessToken: data.accessToken,
        userID: data.userID,
      });

      if (!response.OK) {
        throw new WebIntegrationError(
          translations[webIntegrationErrors[response.errorCode].id],
        );
      }

      yield loginWithFacebookWorker({ data });

      yield call(createdHistory.push, routes.questions());
    } else if (data.status === 'unknown') {
      throw new WebIntegrationError(
        translations[messages[USER_IS_NOT_SELECTED].id],
      );
    } else {
      throw new Error(JSON.stringify(data));
    }
  } catch (e) {
    yield put(addFacebookError(e));
    if (data.userID) {
      window.FB.logout();
    }
  } finally {
    yield put(setFacebookLoginProcessing(false));
  }
}

export default function*() {
  yield takeLatest(LOGIN_WITH_EMAIL, loginWithEmailWorker);
  yield takeLatest(LOGIN_WITH_WALLET, loginWithWalletWorker);
  yield takeLatest(FINISH_REGISTRATION, finishRegistrationWorker);
  yield takeLatest(
    FACEBOOK_LOGIN_BUTTON_CLICK,
    facebookLoginButtonClickedWorker,
  );
  yield takeLatest(FACEBOOK_LOGIN_DATA_RECEIVE, facebookLoginCallbackWorker);
  yield takeLatest(AUTOLOGIN_WITH_FACEBOOK, loginWithFacebookWorker);
}
