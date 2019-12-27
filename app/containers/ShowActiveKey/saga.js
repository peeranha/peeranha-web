import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectLoginData } from 'containers/AccountProvider/selectors';

import { SHOW_ACTIVE_KEY } from './constants';

import { showActiveKeySuccess, showActiveKeyErr } from './actions';

export function* showActiveKeyWorker({ resetForm, password }) {
  try {
    const locale = yield select(makeSelectLocale());
    const loginData = yield select(makeSelectLoginData());

    const translations = translationMessages[locale];
    const autoLogin = Boolean(loginData.authToken);

    const response = yield call(login, loginData.email, password, autoLogin);

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const { activeKey } = response.body;

    yield put(showActiveKeySuccess(activeKey.private));
    yield call(resetForm);
  } catch (err) {
    yield put(showActiveKeyErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SHOW_ACTIVE_KEY, showActiveKeyWorker);
}
