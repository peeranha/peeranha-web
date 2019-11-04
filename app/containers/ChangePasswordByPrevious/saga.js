import { translationMessages } from 'i18n';
import { take, takeLatest, put, call, select } from 'redux-saga/effects';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsComplete,
  changeCredentialsGetKeysByPwd,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  errorToastHandling,
  successToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import { logout } from 'containers/Logout/actions';

import { selectEmail, selectVerificationCode } from './selectors';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SUBMIT_EMAIL,
  CHANGE_PASSWORD,
  SUBMIT_EMAIL_ERROR,
  CHANGE_PASSWORD_ERROR,
  NEW_PASSWORD_FIELD,
  OLD_PASSWORD_FIELD,
  SEND_ANOTHER_CODE,
} from './constants';

import {
  sendEmailSuccess,
  sendEmailErr,
  submitEmailSuccess,
  submitEmailErr,
  changePasswordSuccess,
  changePasswordErr,
} from './actions';

export function* sendEmailWorker({ resetForm, email }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(() => changeCredentialsInit(email));

    if (!response.OK) {
      throw new Error(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(sendEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(sendEmailErr(err.message));
  }
}

// TODO: test
export function* sendAnotherCode() {
  const email = yield select(selectEmail());
  yield call(sendEmailWorker, { email, resetForm: () => null });
}

// TODO: test
export function* sendAnotherCodeSuccess() {
  yield take(SEND_EMAIL_SUCCESS);
  yield call(successToastHandlingWithDefaultText);
}

export function* submitEmailWorker({ resetForm, verificationCode }) {
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

    yield put(submitEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(submitEmailErr(err.message));
  }
}

export function* changePasswordWorker({ resetForm, values }) {
  try {
    const oldEmail = yield select(selectEmail());
    const verificationCode = yield select(selectVerificationCode());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const oldPassword = values[OLD_PASSWORD_FIELD];
    const newPassword = values[NEW_PASSWORD_FIELD];

    const changeCredentialsGetKeysByPwdResponse = yield call(() =>
      changeCredentialsGetKeysByPwd(oldEmail, oldPassword, verificationCode),
    );

    if (!changeCredentialsGetKeysByPwdResponse.OK) {
      throw new Error(
        translations[
          webIntegrationErrors[
            changeCredentialsGetKeysByPwdResponse.errorCode
          ].id
        ],
      );
    }

    const { keys, encryptionKey } = changeCredentialsGetKeysByPwdResponse.body;

    const newProps = {
      keys,
      password: newPassword,
    };

    const changeCredentialsCompleteResponse = yield call(() =>
      changeCredentialsComplete(newProps, oldEmail, encryptionKey),
    );

    if (!changeCredentialsCompleteResponse.OK) {
      throw new Error(
        translations[
          webIntegrationErrors[
            changeCredentialsGetKeysByPwdResponse.errorCode
          ].id
        ],
      );
    }

    yield put(logout());

    yield put(changePasswordSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(changePasswordErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCode);
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
  yield takeLatest(SUBMIT_EMAIL, submitEmailWorker);
  yield takeLatest(CHANGE_PASSWORD, changePasswordWorker);
  yield takeLatest(
    [SEND_EMAIL_ERROR, SUBMIT_EMAIL_ERROR, CHANGE_PASSWORD_ERROR],
    errorToastHandling,
  );
}
