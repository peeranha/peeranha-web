import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import { reset as reduxFormReset } from 'redux-form';

import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';

import { changeCredentialsConfirm } from 'utils/web_integration/src/wallet/change-credentials/change-credentials';
import {
  getFacebookUserPrivateKey,
  sendFbVerificationCode,
} from 'utils/web_integration/src/wallet/facebook/facebook';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectLoginData } from 'containers/AccountProvider/selectors';
import { selectFacebookUserData } from 'containers/Login/selectors';

import {
  VERIFY_FB_ACTION_FORM,
  FB_VERIFICATION_CODE_FIELD,
} from 'components/FbVerificationCodeForm/constants';

import { SHOW_ACTIVE_KEY_TYPE } from 'utils/constants';

import {
  SEND_ANOTHER_CODE,
  SEND_FB_VERIFICATION_EMAIL,
  SHOW_ACTIVE_KEY,
  VERIFY_FB_ACTION,
} from './constants';

import {
  showActiveKeySuccess,
  showActiveKeyErr,
  setShowActiveKeyProcessing,
  showActiveKeyModal,
} from './actions';
import { successHandling } from '../Toast/saga';

export function* showActiveKeyWorker({ resetForm, password }) {
  try {
    const locale = yield select(makeSelectLocale());
    const loginData = yield select(makeSelectLoginData());

    const translations = translationMessages[locale];
    const autoLogin = Boolean(loginData.authToken);

    const response = yield call(login, loginData.email, password, autoLogin);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { activeKey } = response.body;

    yield put(showActiveKeySuccess(activeKey.private));
    yield call(resetForm);
  } catch (err) {
    yield put(showActiveKeyErr(err));
  }
}

export function* sendFacebookEmailWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    const { id } = yield select(selectFacebookUserData());

    const response = yield call(
      sendFbVerificationCode,
      id,
      locale,
      SHOW_ACTIVE_KEY_TYPE,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(setShowActiveKeyProcessing(false));
    yield put(showActiveKeyModal());
  } catch (err) {
    yield put(showActiveKeyErr(err));
  }
}

export function* sendAnotherCodeSuccess() {
  yield call(successHandling);
}

export function* verifyFacebookActionWorker({ verifyFormVals }) {
  try {
    yield put(setShowActiveKeyProcessing(true));

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    const { email, id } = yield select(selectFacebookUserData());
    const verificationCode = verifyFormVals[FB_VERIFICATION_CODE_FIELD];

    const response = yield call(
      changeCredentialsConfirm,
      email,
      verificationCode,
      SHOW_ACTIVE_KEY_TYPE,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const keyResponse = yield call(getFacebookUserPrivateKey, {
      id,
      isActiveKey: true,
    });

    if (!keyResponse.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[keyResponse.errorCode].id],
      );
    }

    const { privateKey } = keyResponse.body;

    yield put(showActiveKeySuccess(privateKey));
    yield put(reduxFormReset(VERIFY_FB_ACTION_FORM));
  } catch (err) {
    yield put(showActiveKeyErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SHOW_ACTIVE_KEY, showActiveKeyWorker);
  yield takeLatest(
    [SEND_ANOTHER_CODE, SEND_FB_VERIFICATION_EMAIL],
    sendFacebookEmailWorker,
  );
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  yield takeLatest(VERIFY_FB_ACTION, verifyFacebookActionWorker);
}
