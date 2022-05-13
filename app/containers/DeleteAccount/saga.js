import { translationMessages } from 'i18n';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsComplete,
  changeCredentialsGetKeysByPwd,
  deleteFacebookAccService,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { WebIntegrationError } from 'utils/errors';

import { sendFbVerificationCode } from 'utils/web_integration/src/wallet/facebook/facebook';
import { DELETE_ACCOUNT_TYPE } from 'utils/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFacebookUserData } from 'containers/Login/selectors';
import { logout } from 'containers/Logout/actions';

import { selectEmail } from './selectors';

import {
  DELETE_ACCOUNT,
  SEND_EMAIL,
  PASSWORD_FIELD,
  CODE_FIELD,
  SEND_VERIFY_FB_EMAIL,
  DELETE_FACEBOOK_ACCOUNT,
} from './constants';

import {
  sendEmailSuccess,
  sendEmailErr,
  deleteAccountSuccess,
  deleteAccountErr,
  showDeleteAccountModalFB,
} from './actions';

export function* sendEmailWorker({ email, resetForm, withFacebook }) {
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

    if (resetForm) yield call(resetForm);
    if (withFacebook) yield put(showDeleteAccountModalFB());
  } catch (err) {
    yield put(sendEmailErr(err));
  }
}

export function* deleteAccountWorker({ resetForm, values, withFacebook }) {
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

    if (withFacebook) {
      const { id } = yield select(selectFacebookUserData());
      const deleteFacebookAccResponse = yield call(
        deleteFacebookAccService,
        id,
      );

      if (!deleteFacebookAccResponse.OK) {
        throw new WebIntegrationError(
          translations[webIntegrationErrors[response.errorCode].id],
        );
      }
    } else {
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
    }

    yield put(logout());

    yield put(deleteAccountSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(deleteAccountErr(err));
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
      DELETE_ACCOUNT_TYPE,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(sendEmailSuccess());
    yield put(showDeleteAccountModalFB());
  } catch (err) {
    yield put(sendEmailErr(err));
  }
}

export function* deleteFacebookAccountWorker({ resetForm, values }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const verificationCode = values[CODE_FIELD];
    const { email, id } = yield select(selectFacebookUserData());

    const response = yield call(
      changeCredentialsConfirm,
      email,
      verificationCode,
      DELETE_ACCOUNT_TYPE,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const deleteFacebookAccResponse = yield call(deleteFacebookAccService, id);

    if (!deleteFacebookAccResponse.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
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
  yield takeLatest(SEND_VERIFY_FB_EMAIL, sendFacebookEmailWorker);
  yield takeLatest(DELETE_FACEBOOK_ACCOUNT, deleteFacebookAccountWorker);
}
