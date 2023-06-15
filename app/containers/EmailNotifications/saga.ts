import { t } from 'i18next';
import { Action } from 'redux';
import { takeLatest, put, call, select, StrictEffect } from 'redux-saga/effects';
import {
  getVerificationCode,
  unsubscribeLinkEmail,
  subscribeLinkEmail,
  updateNotificationSettings,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { WebIntegrationError } from 'utils/errors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { successHandling } from 'containers/Toast/saga';

import {
  selectEmail,
  selectIsSubscribed,
  selectVerificationCode,
  selectContent,
  selectCurrentEmail,
} from './selectors';

import {
  SEND_EMAIL,
  CONFIRM_EMAIL,
  SEND_ANOTHER_CODE,
  SHOW_CHANGE_EMAIL_MODAL,
  UNSUBSCRIBE_EMAIL_ADDRESS,
} from './constants';

import {
  sendEmailSuccess,
  sendEmailErr,
  confirmEmailSuccess,
  confirmEmailErr,
  showChangeEmailModalSuccess,
  showChangeEmailModalErr,
  sendVerificationCodeSuccess,
  unsubscribeEmailAddressSuccess,
  unsubscribeEmailAddressErr,
} from './actions';

import { emailProps, codeProps, subscribeProps } from './types';

export interface ActionResult<T> extends Action<string> {
  type: string;
  payload: T;
}

export function* showEmailNotificationsModalWorker(
  action: ActionResult<emailProps>,
): Generator<any> {
  try {
    const { email } = action;
    const subscribedEmail = yield select(selectEmail());
    const content = yield select(selectContent());
    if (email !== subscribedEmail && !content) {
      yield put(showChangeEmailModalSuccess(email));
    }
  } catch (err) {
    yield put(showChangeEmailModalErr(err));
  }
}

export function* sendEmailWorker(action: ActionResult<emailProps>): Generator<any> {
  try {
    const { email } = action;
    const response: any = yield call(getVerificationCode, email);
    if (!response.OK) {
      throw new WebIntegrationError(t(`webIntegration.${response.errorCode}`));
    }
    yield put(sendEmailSuccess());
  } catch (err) {
    yield put(sendEmailErr(err));
  }
}

export function* sendAnotherCode(): Generator<any> {
  const email = yield select(selectCurrentEmail());
  yield call(sendEmailWorker, { email });
}

export function* sendAnotherCodeSuccess() {
  yield put(sendVerificationCodeSuccess());
}

export function* confirmEmailWorker(action: ActionResult<codeProps>): Generator<any> {
  try {
    const { code } = action;
    const email = yield select(selectCurrentEmail());
    const address = yield select(makeSelectAccount());

    const response: any = yield call(subscribeLinkEmail, email, address, code);

    if (!response.OK) {
      yield put(confirmEmailErr(response.errorMessage));
    }

    if (response.OK) {
      yield call(updateNotificationSettings, address);
      yield put(confirmEmailSuccess(email, true));
    }
  } catch (err) {
    yield put(confirmEmailErr(err));
  }
}

export function* unsubscribeEmailWorker(action: ActionResult<subscribeProps>): Generator<any> {
  try {
    const { subscribe } = action;
    const address = yield select(makeSelectAccount());

    const response: any = yield call(updateNotificationSettings, address, subscribe);

    if (response.OK) {
      yield put(unsubscribeEmailAddressSuccess());
    }
  } catch (err) {
    yield put(unsubscribeEmailAddressErr(err));
  }
}

export default function* defaultSaga(): Generator<StrictEffect> {
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCode);
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  yield takeLatest(SHOW_CHANGE_EMAIL_MODAL, showEmailNotificationsModalWorker);
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
  yield takeLatest(CONFIRM_EMAIL, confirmEmailWorker);
  yield takeLatest(UNSUBSCRIBE_EMAIL_ADDRESS, unsubscribeEmailWorker);
}
