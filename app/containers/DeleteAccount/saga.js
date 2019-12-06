import { translationMessages } from 'i18n';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsComplete,
  changeCredentialsGetKeysByPwd,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { WebIntegrationError } from 'utils/errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { logout } from 'containers/Logout/actions';

import { selectEmail } from './selectors';

import {
  DELETE_ACCOUNT,
  SEND_EMAIL,
  PASSWORD_FIELD,
  CODE_FIELD,
} from './constants';

import {
  sendEmailSuccess,
  sendEmailErr,
  deleteAccountSuccess,
  deleteAccountErr,
} from './actions';

export function* sendEmailWorker({ resetForm, email }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(changeCredentialsInit, email);

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

export function* deleteAccountWorker({ resetForm, values }) {
  try {
    const email = yield select(selectEmail());
    const password = values[PASSWORD_FIELD];
    const verificationCode = values[CODE_FIELD];

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

    const changeCredentialsGetKeysByPwdResponse = yield call(
      changeCredentialsGetKeysByPwd,
      email,
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

    const newProps = null;

    const changeCredentialsCompleteResponse = yield call(
      changeCredentialsComplete,
      newProps,
      email,
      encryptionKey,
    );

    if (!changeCredentialsCompleteResponse.OK) {
      throw new WebIntegrationError(
        translations[
          webIntegrationErrors[
            changeCredentialsGetKeysByPwdResponse.errorCode
          ].id
        ],
      );
    }

    yield put(logout());

    yield put(deleteAccountSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(deleteAccountErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccountWorker);
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
}
