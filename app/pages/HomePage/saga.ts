import { takeLatest, call, put } from 'redux-saga/effects';
import i18next from 'i18next';
import { sendMessage } from 'utils/homepageManagement';

import { addToast } from 'containers/Toast/actions';
import {
  EMAIL_FIELD,
  MESSAGE_FIELD,
  NAME_FIELD,
  SEND_MESSAGE,
} from './constants';

import { sendMessageSuccess, sendMessageErr } from './actions';

export function* sendMessageWorker({ val }): Generator<any> {
  try {
    const { reset, form } = val[2];

    const formData = {
      email: val[0].get(EMAIL_FIELD),
      firstname: val[0].get(NAME_FIELD),
      subject: 'Message from landing page',
      message: val[0].get(MESSAGE_FIELD),
    };

    const pageInfo = {
      url: window.location.href,
      name: `${i18next.t('homePage.title')}, ${form}`,
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
}
