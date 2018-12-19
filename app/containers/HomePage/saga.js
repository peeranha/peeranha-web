import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { addToast } from 'containers/Toast/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { sendEmail, sendMessage } from 'utils/homepageManagement';

import { SEND_EMAIL, SEND_MESSAGE } from './constants';

import {
  sendEmailSuccess,
  sendEmailErr,
  sendMessageSuccess,
  sendMessageErr,
} from './actions';

import messages from './messages';

export function* sendEmailWorker({ formData }) {
  const locale = yield select(makeSelectLocale());

  try {
    yield call(() => sendEmail(formData));

    yield put(
      addToast({
        type: 'success',
        text: translationMessages[locale][messages.yourEmailIsRegistred.id],
      }),
    );

    yield put(sendEmailSuccess());
  } catch (err) {
    yield put(
      addToast({
        type: 'error',
        text: translationMessages[locale][messages.messageHasNotBeenSent.id],
      }),
    );

    yield put(sendEmailErr(err));
  }
}

export function* sendMessageWorker({ formData }) {
  const locale = yield select(makeSelectLocale());

  try {
    yield call(() => sendMessage(formData));

    yield put(
      addToast({
        type: 'success',
        text: translationMessages[locale][messages.yourEmailIsRegistred.id],
      }),
    );

    yield put(sendMessageSuccess());
  } catch (err) {
    yield put(
      addToast({
        type: 'error',
        text: translationMessages[locale][messages.messageHasNotBeenSent.id],
      }),
    );

    yield put(sendMessageErr(err));
  }
}

export default function*() {
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
  yield takeLatest(SEND_MESSAGE, sendMessageWorker);
}
