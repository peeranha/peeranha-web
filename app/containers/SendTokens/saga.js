import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { sendTokens } from 'utils/walletManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
  errorToastHandling,
} from 'containers/Toast/saga';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  SEND_TOKENS,
  SEND_TOKENS_SUCCESS,
  SEND_TOKENS_ERROR,
  EOS_ACCOUNT_FIELD,
  AMOUNT_FIELD,
  PASSWORD_FIELD,
} from './constants';

import {
  sendTokensSuccess,
  sendTokensErr,
  hideSendTokensModal,
} from './actions';

export function* sendTokensWorker({ resetForm, val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const eosService = yield select(selectEos);
    const profile = yield select(makeSelectProfileInfo());

    const password = val[PASSWORD_FIELD];

    // check password for users which logged with email
    if (profile.loginData.email) {
      const response = yield call(
        login,
        profile.loginData.email,
        password,
        Boolean(profile.loginData.authToken),
      );

      if (!response.OK) {
        throw new Error(
          translations[webIntegrationErrors[response.errorCode].id],
        );
      }
    }

    yield call(sendTokens, eosService, {
      from: profile.user,
      to: val[EOS_ACCOUNT_FIELD],
      quantity: val[AMOUNT_FIELD],
    });

    yield put(sendTokensSuccess());
    yield put(hideSendTokensModal());
    yield call(resetForm);
  } catch ({ message }) {
    yield put(sendTokensErr(message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SEND_TOKENS, sendTokensWorker);
  yield takeLatest(SEND_TOKENS_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(SEND_TOKENS_ERROR, errorToastHandlingWithDefaultText);
  yield takeLatest([SEND_TOKENS_ERROR], errorToastHandling);
}
