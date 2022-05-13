import { translationMessages } from 'i18n';
import { take, takeLatest, put, call, select } from 'redux-saga/effects';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsComplete,
  changeCredentialsGetKeysByPwd,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { WebIntegrationError } from 'utils/errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { successHandling } from 'containers/Toast/saga';
import { logout } from 'containers/Logout/actions';

import { selectEmail, selectVerificationCode } from './selectors';

import {
  CHANGE_EMAIL,
  SEND_OLD_EMAIL,
  CONFIRM_OLD_EMAIL,
  NEW_EMAIL_FIELD,
  PASSWORD_FIELD,
  SEND_ANOTHER_CODE,
  SEND_OLD_EMAIL_SUCCESS,
} from './constants';

import {
  changeEmailSuccess,
  changeEmailErr,
  sendOldEmailSuccess,
  sendOldEmailErr,
  confirmOldEmailSuccess,
  confirmOldEmailErr,
} from './actions';

export function* sendOldEmailWorker({ resetForm, email }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(changeCredentialsInit, email);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(sendOldEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(sendOldEmailErr(err));
  }
}

export function* sendAnotherCode() {
  const email = yield select(selectEmail());
  yield call(sendOldEmailWorker, { email, resetForm: () => null });
}

export function* sendAnotherCodeSuccess() {
  yield take(SEND_OLD_EMAIL_SUCCESS);
  yield call(successHandling);
}

export function* confirmOldEmailWorker({ resetForm, verificationCode }) {
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

    yield put(confirmOldEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(confirmOldEmailErr(err));
  }
}

export function* changeEmailWorker({ resetForm, values }) {
  try {
    const oldEmail = yield select(selectEmail());
    const verificationCode = yield select(selectVerificationCode());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const newEmail = values[NEW_EMAIL_FIELD];
    const password = values[PASSWORD_FIELD];

    const changeCredentialsGetKeysByPwdResponse = yield call(
      changeCredentialsGetKeysByPwd,
      oldEmail,
      password,
      verificationCode,
    );

    if (!changeCredentialsGetKeysByPwdResponse.OK) {
      throw new WebIntegrationError(
        translations[
          webIntegrationErrors[
            changeCredentialsGetKeysByPwdResponse.errorCode
          ].id
        ],
      );
    }

    const { encryptionKey } = changeCredentialsGetKeysByPwdResponse.body;

    const newProps = {
      email: newEmail,
    };

    const changeCredentialsCompleteResponse = yield call(
      changeCredentialsComplete,
      newProps,
      oldEmail,
      encryptionKey,
    );

    if (!changeCredentialsCompleteResponse.OK) {
      throw new WebIntegrationError(
        translations[
          webIntegrationErrors[changeCredentialsCompleteResponse.errorCode].id
        ],
      );
    }

    yield put(logout());

    yield put(changeEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(changeEmailErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCode);
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  yield takeLatest(SEND_OLD_EMAIL, sendOldEmailWorker);
  yield takeLatest(CONFIRM_OLD_EMAIL, confirmOldEmailWorker);
  yield takeLatest(CHANGE_EMAIL, changeEmailWorker);
}
