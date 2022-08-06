import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { sendMessage } from 'utils/homepageManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  SEND_MESSAGE,
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from './constants';

import { sendMessageSuccess, sendMessageErr } from './actions';

import messages from './messages';
import { addToast } from '../Toast/actions';
import commonMessages from '../../common-messages';

export function* sendMessageWorker({ val }) {
  const locale = yield select(makeSelectLocale());
  const msg = translationMessages[locale];

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

    yield call(sendMessage, formData, pageInfo);

    yield call(reset);

    yield put(
      addToast({
        type: 'success',
        text: msg[commonMessages.messageSendedSuccessfully.id],
      }),
    );

    yield put(sendMessageSuccess());
  } catch (err) {
    yield put(sendMessageErr(err));
  }
}

export default function*() {
  yield takeLatest(SEND_MESSAGE, sendMessageWorker);
}
