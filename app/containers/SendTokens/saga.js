import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { CURRENCIES, WALLETS } from 'wallet-config';
import { sendTokens } from 'utils/walletManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import Eosio from 'utils/eosio';

import {
  SEND_TOKENS,
  EOS_ACCOUNT_FIELD,
  AMOUNT_FIELD,
  PASSWORD_FIELD,
  CURRENCY_FIELD,
  WALLET_FIELD,
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

    const eosService = new Eosio();
    const profile = yield select(makeSelectProfileInfo());

    const password = val[PASSWORD_FIELD];

    // check password for users which logged with email
    if (val[WALLET_FIELD].name === WALLETS.PEERANHA.name) {
      const response = yield call(
        login,
        profile.loginData.email,
        password,
        Boolean(profile.loginData.authToken),
      );

      if (!response.OK) {
        throw new WebIntegrationError(
          translations[webIntegrationErrors[response.errorCode].id],
        );
      }
    } else if (
      val[WALLET_FIELD].name === WALLETS.SQRL.name ||
      val[WALLET_FIELD].name === WALLETS.SCATTER.name
    ) {
      yield call(eosService.initEosioWithScatter);
    }

    yield call(sendTokens, eosService, {
      from: eosService.selectedAccount,
      to: val[EOS_ACCOUNT_FIELD],
      quantity: val[AMOUNT_FIELD],
      precision: val[CURRENCY_FIELD].precision,
      symbol: val[CURRENCY_FIELD].symbol,
      contractAccount: val[CURRENCY_FIELD].contractAccount,
    });

    yield put(sendTokensSuccess());
    yield put(hideSendTokensModal());
    yield call(resetForm);
  } catch (err) {
    yield put(sendTokensErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SEND_TOKENS, sendTokensWorker);
}
