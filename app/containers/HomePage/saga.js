import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { addToast } from 'containers/Toast/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { sendEmail, sendMessage } from 'utils/homepageManagement';

import {
  SEND_EMAIL,
  SEND_MESSAGE,
  EMAIL_FIELD,
  REFCODE_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from './constants';

import {
  sendEmailSuccess,
  sendEmailErr,
  sendMessageSuccess,
  sendMessageErr,
} from './actions';

import messages from './messages';

export function* sendEmailWorker({ val }) {
  const locale = yield select(makeSelectLocale());

  try {
    const { reset, form } = val[2];

    const formData = {
      email: val[0].get(EMAIL_FIELD),
      refCode: val[0].get(REFCODE_FIELD),
    };

    const pageInfo = {
      url: window.location.href,
      name: `${translationMessages[locale][messages.title.id]}, ${form}`,
    };

    yield call(() => sendEmail(formData, pageInfo));

    yield call(reset);

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
        text:
          err.message ||
          translationMessages[locale][messages.messageHasNotBeenSent.id],
      }),
    );
    yield put(sendEmailErr(err));
  }
}

export function* sendMessageWorker({ val }) {
  const locale = yield select(makeSelectLocale());

  try {
    const { reset, form } = val[2];

    const subject =
      typeof val[0].get(SUBJECT_FIELD) === 'object'
        ? val[0].get(SUBJECT_FIELD).value
        : val[0].get(SUBJECT_FIELD);

    const formData = {
      email: val[0].get(EMAIL_FIELD),
      firstname: val[0].get(NAME_FIELD),
      subject,
      message: val[0].get(MESSAGE_FIELD),
    };

    const pageInfo = {
      url: window.location.href,
      name: `${translationMessages[locale][messages.title.id]}, ${form}`,
    };

    yield call(() => sendMessage(formData, pageInfo));

    yield call(reset);

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
