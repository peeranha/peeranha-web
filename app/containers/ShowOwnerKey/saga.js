import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import {
  getOwnerKeyInitByPwd,
  getOwnerKeyByPwd,
} from 'utils/web_integration/src/wallet/get-owner-key/get-owner-key';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectLoginData } from 'containers/AccountProvider/selectors';

import { selectPassword } from './selectors';

import { SHOW_OWNER_KEY, SEND_EMAIL } from './constants';

import {
  showOwnerKeySuccess,
  showOwnerKeyErr,
  sendEmailSuccess,
  sendEmailErr,
} from './actions';

export function* sendEmailWorker({ resetForm, email, password }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(getOwnerKeyInitByPwd, email, password);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(sendEmailSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(sendEmailErr(err));
  }
}

export function* showOwnerKeyWorker({ resetForm, verificationCode }) {
  try {
    const loginData = yield select(makeSelectLoginData());
    const password = yield select(selectPassword());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(
      getOwnerKeyByPwd,
      loginData.email,
      password,
      verificationCode,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { keys } = response.body;

    yield put(showOwnerKeySuccess(keys.ownerKey.private));
    yield call(resetForm);
  } catch (err) {
    yield put(showOwnerKeyErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SHOW_OWNER_KEY, showOwnerKeyWorker);
  yield takeLatest(SEND_EMAIL, sendEmailWorker);
}
