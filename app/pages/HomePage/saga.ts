import { takeLatest, call, put } from 'redux-saga/effects';

import { sendMessage } from 'utils/homepageManagement';

import { EMAIL_CHECKING } from 'containers/SignUp/constants';
import { addToast } from 'containers/Toast/actions';
import { emailCheckingWorker } from 'containers/SignUp/saga';
import {
  EMAIL_FIELD,
  MESSAGE_FIELD,
  NAME_FIELD,
  SEND_MESSAGE,
  SUBJECT_FIELD,
} from './constants';

import { sendMessageSuccess, sendMessageErr } from './actions';

export function* sendMessageWorker({ val }): Generator<any> {
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

export default function* (): Generator<any> {
  yield takeLatest(SEND_MESSAGE, sendMessageWorker);
  yield takeLatest(EMAIL_CHECKING, emailCheckingWorker);
}
