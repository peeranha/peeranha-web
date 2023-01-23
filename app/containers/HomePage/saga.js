import { takeLatest, call, put } from 'redux-saga/effects';

import { sendMessage } from 'utils/homepageManagement';

import { EMAIL_CHECKING } from 'containers/SignUp/constants';
import { emailCheckingWorker } from 'containers/SignUp/saga';

import {
  SEND_MESSAGE,
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from './constants';

import { sendMessageSuccess, sendMessageErr } from './actions';

import { addToast } from '../Toast/actions';

export function* sendMessageWorker({ val }) {
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
      name: `${val[3]('about.title')}, ${form}`,
    };

    yield call(sendMessage, formData, pageInfo);

    yield call(reset);

    yield put(
      addToast({
        type: 'success',
        text: 'common.messageSendedSuccessfully',
      }),
    );

    yield put(sendMessageSuccess());
  } catch (err) {
    yield put(sendMessageErr(err));
  }
}

export default function*() {
  yield takeLatest(SEND_MESSAGE, sendMessageWorker);
  yield takeLatest(EMAIL_CHECKING, emailCheckingWorker);
}
