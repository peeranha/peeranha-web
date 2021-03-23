import { takeLatest, call, put, select, take } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsGetKeysByMK,
  changeCredentialsComplete,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { WebIntegrationError } from 'utils/errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { successHandling } from 'containers/Toast/saga';

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
  GET_VERIFICATION_CODE_SUCCESS,
  VERIFY_EMAIL,
  CHANGE_PASSWORD,
  SEND_ANOTHER_CODE,
} from './constants';

import { selectEmail, selectVerificationCode } from './selectors';

export function* getVerificationCodeWorker({ email }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(changeCredentialsInit, email, false, locale);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(getVerificationCodeSuccess());
  } catch (err) {
    yield put(getVerificationCodeErr(err));
  }
}

export function* sendAnotherCode() {
  const email = yield select(selectEmail());
  yield call(getVerificationCodeWorker, { email, resetForm: () => null });
}

export function* sendAnotherCodeSuccess() {
  yield take(GET_VERIFICATION_CODE_SUCCESS);
  yield call(successHandling);
}

export function* verifyEmailWorker({ verificationCode }) {
  try {
    const email = yield select(selectEmail());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

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

    yield put(verifyEmailSuccess());
  } catch (err) {
    yield put(verifyEmailErr(err));
  }
}

export function* changePasswordWorker({ masterKey, password }) {
  try {
    const email = yield select(selectEmail());
    const verificationCode = yield select(selectVerificationCode());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const changeCredentialsGetKeysByMKResponse = yield call(
      changeCredentialsGetKeysByMK,
      email,
      masterKey,
      verificationCode,
    );

    if (!changeCredentialsGetKeysByMKResponse.OK) {
      let message =
        webIntegrationErrors[changeCredentialsGetKeysByMKResponse.errorCode].id;

      if (changeCredentialsGetKeysByMKResponse.errorCode === 10) {
        message = webIntegrationErrors.wrongMasterKey.id;
      }

      throw new WebIntegrationError(translations[message]);
    }

    const { keys, encryptionKey } = changeCredentialsGetKeysByMKResponse.body;

    const changePassword = {
      keys,
      password,
    };

    const changeCredentialsCompleteResponse = yield call(
      changeCredentialsComplete,
      changePassword,
      email,
      encryptionKey,
    );

    if (!changeCredentialsCompleteResponse.OK) {
      throw new WebIntegrationError(
        translations[
          webIntegrationErrors[
            changeCredentialsGetKeysByMKResponse.errorCode
          ].id
        ],
      );
    }

    yield put(changePasswordSuccess());
  } catch (err) {
    yield put(changePasswordErr(err));
  }
}

export default function*() {
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCode);
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  yield takeLatest(GET_VERIFICATION_CODE, getVerificationCodeWorker);
  yield takeLatest(VERIFY_EMAIL, verifyEmailWorker);
  yield takeLatest(CHANGE_PASSWORD, changePasswordWorker);
}
