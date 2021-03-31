import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import { reset as reduxFormReset } from 'redux-form';

import {
  getOwnerKeyInitByPwd,
  getOwnerKeyByPwd,
} from 'utils/web_integration/src/wallet/get-owner-key/get-owner-key';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';

import {
  changeCredentialsConfirm,
  getFacebookUserPrivateKey,
  sendFbVerificationCode,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectLoginData } from 'containers/AccountProvider/selectors';
import { selectFacebookUserData } from 'containers/Login/selectors';

import {
  VERIFY_FB_ACTION_FORM,
  FB_VERIFICATION_CODE_FIELD,
} from 'components/FbVerificationCodeForm/constants';

import { selectPassword } from './selectors';

import {
  SHOW_OWNER_KEY,
  SEND_EMAIL,
  VERIFY_FB_ACTION,
  SEND_FB_VERIFICATION_EMAIL,
} from './constants';

import {
  showOwnerKeySuccess,
  showOwnerKeyErr,
  sendEmailSuccess,
  sendEmailErr,
  setShowOwnerProcessing,
  showOwnerKeyModal,
} from './actions';

export function* sendEmailWorker({ resetForm, email, password }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(getOwnerKeyInitByPwd, email, password, locale);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(sendEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(sendEmailErr(err));
  }
}

export function* showOwnerKeyWorker({ resetForm, verificationCode }) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const password = yield select(selectPassword());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(
      getOwnerKeyByPwd,
      loginData.email,
      password,
      verificationCode,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { keys } = response.body;

    yield put(showOwnerKeySuccess(keys.ownerKey.private));
    yield call(resetForm);
  } catch (err) {
    yield put(showOwnerKeyErr(err));
  }
}

export function* sendFbCodeEmailWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    const { id, email } = yield select(selectFacebookUserData());

    const response = yield call(sendFbVerificationCode, id, email, locale);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(setShowOwnerProcessing(false));
    yield put(showOwnerKeyModal());
  } catch (err) {
    yield put(showOwnerKeyErr(err));
  }
}

export function* verifyFacebookActionWorker({ verifyFormVals }) {
  try {
    yield put(setShowOwnerProcessing(true));

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    const { email, id } = yield select(selectFacebookUserData());
    const verificationCode = verifyFormVals[FB_VERIFICATION_CODE_FIELD];

    const response = yield call(
      changeCredentialsConfirm,
      email,
      verificationCode,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const keyResponse = yield call(getFacebookUserPrivateKey, {
      id,
      isOwnerKey: true,
    });

    if (!keyResponse.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[keyResponse.errorCode].id],
      );
    }

    const { privateKey } = keyResponse.body;

    yield put(showOwnerKeySuccess(privateKey));
    yield put(reduxFormReset(VERIFY_FB_ACTION_FORM));
  } catch (err) {
    yield put(showOwnerKeyErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SHOW_OWNER_KEY, showOwnerKeyWorker);
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
  yield takeLatest(SEND_FB_VERIFICATION_EMAIL, sendFbCodeEmailWorker);
  yield takeLatest(VERIFY_FB_ACTION, verifyFacebookActionWorker);
}
