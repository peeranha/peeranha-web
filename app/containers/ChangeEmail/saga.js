import { t } from 'i18next';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import {
  changeCredentialsComplete,
  changeCredentialsGetKeysByPwd,
  getVerificationCode,
  unsubscribeLinkEmail,
  subscribeLinkEmail,
  updateNotificationSettings,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { WebIntegrationError } from 'utils/errors';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { successHandling } from 'containers/Toast/saga';
import { addToast } from 'containers/Toast/actions';

import { logout } from 'containers/Logout/actions';

import {
  selectEmail,
  selectIsSubscribed,
  selectVerificationCode,
  selectContent,
  selectCurrentEmail,
} from './selectors';

import {
  CHANGE_EMAIL,
  SEND_OLD_EMAIL,
  CONFIRM_OLD_EMAIL,
  NEW_EMAIL_FIELD,
  PASSWORD_FIELD,
  SEND_ANOTHER_CODE,
  SHOW_CHANGE_EMAIL_MODAL,
} from './constants';

import {
  changeEmailSuccess,
  changeEmailErr,
  sendOldEmailSuccess,
  sendOldEmailErr,
  confirmOldEmailSuccess,
  confirmOldEmailErr,
  showChangeEmailModalSuccess,
  showChangeEmailModalErr,
} from './actions';

export function* sendOldEmailWorker({ email }) {
  try {
    const response = yield call(getVerificationCode, email);
    if (!response.OK) {
      throw new WebIntegrationError(t(`webIntegration.${response.errorCode}`));
    }

    yield put(sendOldEmailSuccess());
  } catch (err) {
    yield put(sendOldEmailErr(err));
  }
}

export function* sendAnotherCode() {
  const email = yield select(selectCurrentEmail());
  yield call(sendOldEmailWorker, { email });
}

export function* sendAnotherCodeSuccess() {
  yield call(successHandling);
}

export function* confirmOldEmailWorker({ resetForm, code }) {
  try {
    const email = yield select(selectCurrentEmail());
    const address = yield select(makeSelectAccount());

    const response = yield call(subscribeLinkEmail, email, address, code);
    if (!response.OK) {
      yield put(
        addToast({
          type: 'error',
          text: 'common.incorrectCode',
        }),
      );
      yield call(resetForm);
    }

    if (response.OK) {
      yield call(updateNotificationSettings, address);
      yield put(confirmOldEmailSuccess(email, true));
    }
  } catch (err) {
    yield put(confirmOldEmailErr(err));
  }
}

export function* changeEmailWorker({ resetForm, values }) {
  try {
    const oldEmail = yield select(selectEmail());
    const verificationCode = yield select(selectVerificationCode());

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
        t(`webIntegration.${changeCredentialsGetKeysByPwdResponse.errorCode}`),
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
        t(`webIntegration.${changeCredentialsCompleteResponse.errorCode}`),
      );
    }

    yield put(logout());

    yield put(changeEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(changeEmailErr(err));
  }
}

export function* showChangeEmailModalWorker({ email }) {
  try {
    const subscribedEmail = yield select(selectEmail());
    const content = yield select(selectContent());

    if (subscribedEmail === email) {
      yield put(
        addToast({
          type: 'error',
          text: 'signUp.emailSubscribed',
        }),
      );
    }
    if (email !== subscribedEmail && !content) {
      yield put(showChangeEmailModalSuccess(email));
    }
  } catch (err) {
    yield put(showChangeEmailModalErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCode);
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  yield takeLatest(SEND_OLD_EMAIL, sendOldEmailWorker);
  yield takeLatest(CONFIRM_OLD_EMAIL, confirmOldEmailWorker);
  yield takeLatest(CHANGE_EMAIL, changeEmailWorker);
  yield takeLatest(SHOW_CHANGE_EMAIL_MODAL, showChangeEmailModalWorker);
}
