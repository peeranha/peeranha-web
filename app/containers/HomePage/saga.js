import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import {
  errorToastHandling,
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  EMAIL_CHECKING,
  EMAIL_CHECKING_ERROR,
} from 'containers/SignUp/constants';

import { emailCheckingWorker } from 'containers/SignUp/saga';

import { sendMessage } from 'utils/homepageManagement';

import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from './constants';

import { sendMessageSuccess, sendMessageErr } from './actions';

import messages from './messages';

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

    yield put(sendMessageSuccess());
  } catch ({ message }) {
    yield put(sendMessageErr(message));
  }
}

export default function*() {
  yield takeLatest(SEND_MESSAGE, sendMessageWorker);
  yield takeLatest(EMAIL_CHECKING, emailCheckingWorker);
  yield takeLatest(SEND_MESSAGE_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(SEND_MESSAGE_ERROR, errorToastHandlingWithDefaultText);
  yield takeLatest(EMAIL_CHECKING_ERROR, errorToastHandling);
}
