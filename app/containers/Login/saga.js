import { call, put, takeLatest, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import crypto from 'crypto';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  inviteUser,
  isUserInSystem,
  updateAcc,
  emptyProfile,
} from 'utils/accountManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { setCookie } from 'utils/cookie';

import { redirectToFeed } from 'containers/App/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  getCurrentAccountWorker,
  getReferralInfo,
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
  loginWithWalletSuccess,
  loginWithWalletErr,
  setFacebookLoginProcessing,
  setFacebookUserData,
  facebookLoginErr,
} from './actions';

import {
  FINISH_REGISTRATION,
  LOGIN_WITH_EMAIL,
  USER_IS_NOT_SELECTED,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  REMEMBER_ME_FIELD,
  DISPLAY_NAME,
  AUTOLOGIN_DATA,
  LOGIN_WITH_WALLET,
  FACEBOOK_LOGIN_BUTTON_CLICK,
  FACEBOOK_LOGIN_DATA_RECEIVE,
  AUTOLOGIN_WITH_FACEBOOK,
  HANDLE_FB_LOGIN_ERROR,
  FACEBOOK_LOGIN_ERROR,
  FACEBOOK_AUTOLOGIN_ERROR,
} from './constants';

import messages from './messages';
import { addToast } from '../Toast/actions';
import { addLoginData, getCurrentAccount } from '../AccountProvider/actions';

import {
  callService,
  LOGIN_WITH_FACEBOOK_SERVICE,
  REGISTER_WITH_FACEBOOK_SERVICE,
} from '../../utils/web_integration/src/util/aws-connector';
import { decryptObject } from '../../utils/web_integration/src/util/cipher';
import { selectEthereum } from '../EthereumProvider/selectors';
import { DISPLAY_NAME_FIELD } from '../Profile/constants';
import { saveProfileWorker } from '../EditProfilePage/saga';

function* continueLogin({ address }) {
  yield call(getCurrentAccountWorker, address);
  const profileInfo = yield select(makeSelectProfileInfo());

  if (
    profileInfo &&
    window.location.pathname.includes(routes.registrationStage)
  )
    yield put(redirectToFeed());

  yield put(loginWithEmailSuccess());
}

export function* loginWithEmailWorker({ val }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const email = val[EMAIL_FIELD];
    const password = val[PASSWORD_FIELD];
    const rememberMe = Boolean(val[REMEMBER_ME_FIELD]);

    const response = yield call(
      login,
      email,
      password,
      rememberMe,
      ethereumService,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    ethereumService.setSelectedAccount(response.body.address);

    yield put(addLoginData(response.peeranhaAutoLogin));
    if (!isSingleCommunityWebsite()) yield put(redirectToFeed());
    yield call(continueLogin, response.body);
  } catch (err) {
    yield put(loginWithEmailErr(err));
  }
}

export function* loginWithWalletWorker({ metaMask }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    let currentAccount;
    let metaMaskUserAddress = null;

    if (metaMask) {
      metaMaskUserAddress = yield call(ethereumService.walletLogIn);

      if (!metaMaskUserAddress) {
        throw new WebIntegrationError(
          translations[messages[USER_IS_NOT_SELECTED].id],
        );
      }

      currentAccount = metaMaskUserAddress;
    }

    yield call(getCurrentAccountWorker, currentAccount);
    let profileInfo = yield select(makeSelectProfileInfo());

    if (!profileInfo) {
      profileInfo = emptyProfile(currentAccount);
    }

    const connectedWalletLabel = ethereumService.connectedWallets[0].label;
    window.localStorage.setItem(
      'connectedWallet',
      JSON.stringify(connectedWalletLabel),
    );

    if (!isSingleCommunityWebsite()) yield put(redirectToFeed());

    yield put(loginWithWalletSuccess());
    yield call(updateAcc, profileInfo, ethereumService);
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
    const ethereumService = yield select(selectEthereum);
    const account = yield call(ethereumService.getSelectedAccount);

    let ethereumUserAddress = account;
    const isNavigate = false;

    if (typeof account !== 'string' && !!account?.ethereumUserAddress) {
      ethereumUserAddress = account.ethereumUserAddress;
    }

    yield call(
      saveProfileWorker,
      {
        profile: {
          [DISPLAY_NAME_FIELD]: val[DISPLAY_NAME],
        },
        userKey: ethereumUserAddress,
      },
      isNavigate,
    );

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
      id: data.id,
      name: data.name,
      picture: data.picture.data.url,
      email: data.email,
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

    yield put(addLoginData({ loginWithFacebook: true }));

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
    yield put(facebookLoginErr(err));
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
    yield put(facebookLoginErr(e));
    if (data.userID) {
      window.FB.logout();
    }
  } finally {
    yield put(setFacebookLoginProcessing(false));
  }
}

export function* fbLoginErrorCallbackWorker({ autoLogin }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    if (autoLogin) {
      yield put(getCurrentAccount());
      throw new WebIntegrationError(
        translations[messages[FACEBOOK_AUTOLOGIN_ERROR].id],
      );
    }

    yield put(setFacebookLoginProcessing(false));
    throw new WebIntegrationError(
      translations[messages[FACEBOOK_LOGIN_ERROR].id],
    );
  } catch (err) {
    yield put(facebookLoginErr(err));
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
  yield takeLatest(HANDLE_FB_LOGIN_ERROR, fbLoginErrorCallbackWorker);
}
