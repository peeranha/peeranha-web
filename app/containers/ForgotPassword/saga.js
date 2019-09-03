import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { errorToastHandling } from 'containers/Toast/saga';

import {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsGetKeysByMK,
  changeCredentialsComplete,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import {
  getVerificationCodeSuccess,
  getVerificationCodeErr,
  verifyEmailSuccess,
  verifyEmailErr,
  changePasswordSuccess,
  changePasswordErr,
} from './actions';

import {
  GET_VERIFICATION_CODE,
  GET_VERIFICATION_CODE_ERROR,
  VERIFY_EMAIL,
  VERIFY_EMAIL_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
} from './constants';

import { selectEmail, selectVerificationCode } from './selectors';

export function* getVerificationCodeWorker({ email }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(() => changeCredentialsInit(email));

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(getVerificationCodeSuccess());
  } catch (err) {
    yield put(getVerificationCodeErr(err.message));
  }
}

export function* verifyEmailWorker({ verificationCode }) {
  try {
    const email = yield select(selectEmail());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(() =>
      changeCredentialsConfirm(email, verificationCode),
    );

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(verifyEmailSuccess());
  } catch (err) {
    yield put(verifyEmailErr(err.message));
  }
}

export function* changePasswordWorker({ masterKey, password }) {
  try {
    const email = yield select(selectEmail());
    const verificationCode = yield select(selectVerificationCode());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const changeCredentialsGetKeysByMKResponse = yield call(() =>
      changeCredentialsGetKeysByMK(email, masterKey, verificationCode),
    );

    if (!changeCredentialsGetKeysByMKResponse.OK) {
      throw new Error(
        translations[
          webIntegrationErrors[
            changeCredentialsGetKeysByMKResponse.errorCode
          ].id
        ],
      );
    }

    const { keys, encryptionKey } = changeCredentialsGetKeysByMKResponse.body;

    const changePassword = {
      keys,
      password,
    };

    const changeCredentialsCompleteResponse = yield call(() =>
      changeCredentialsComplete(changePassword, email, encryptionKey),
    );

    if (!changeCredentialsCompleteResponse.OK) {
      throw new Error(
        translations[
          webIntegrationErrors[
            changeCredentialsGetKeysByMKResponse.errorCode
          ].id
        ],
      );
    }

    yield put(changePasswordSuccess());
  } catch (err) {
    yield put(changePasswordErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_VERIFICATION_CODE, getVerificationCodeWorker);
  yield takeLatest(VERIFY_EMAIL, verifyEmailWorker);
  yield takeLatest(CHANGE_PASSWORD, changePasswordWorker);
  yield takeLatest(
    [GET_VERIFICATION_CODE_ERROR, VERIFY_EMAIL_ERROR, CHANGE_PASSWORD_ERROR],
    errorToastHandling,
  );
}
