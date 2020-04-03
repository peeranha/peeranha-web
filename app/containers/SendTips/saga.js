import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import { WALLETS } from 'wallet-config';
import { sendTokens } from 'utils/walletManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import Eosio from 'utils/eosio';

import {
  SEND_TIPS,
  AMOUNT_FIELD,
  PASSWORD_FIELD,
  CURRENCY_FIELD,
  WALLET_FIELD,
  SELECT_ACCOUNT,
  EOS_SEND_TO_ACCOUNT_FIELD,
  EOS_SEND_FROM_ACCOUNT_FIELD,
} from './constants';

import {
  hideSendTipsModal,
  sendTipsSuccess,
  selectAccountSuccess,
  sendTipsErr,
  selectAccountErr,
} from './actions';
import messages from '../Login/messages';
import { SCATTER_MODE_ERROR } from '../Login/constants';
import { initEosioSuccess } from '../EosioProvider/actions';
import { selectEos } from '../EosioProvider/selectors';

export function* sendTipsWorker({ resetForm, val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    let eosService = yield select(selectEos);

    if (!eosService) {
      eosService = new Eosio();
      yield put(initEosioSuccess(eosService));
    }

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
      val[WALLET_FIELD].names ||
      val[WALLET_FIELD].name === WALLETS.SQRL.name ||
      val[WALLET_FIELD].name === WALLETS.SCATTER.name
    ) {
      yield call(eosService.initEosioWithScatter);
    }

    yield call(sendTokens, eosService, {
      from: val[EOS_SEND_FROM_ACCOUNT_FIELD],
      to: val[EOS_SEND_TO_ACCOUNT_FIELD],
      quantity: val[AMOUNT_FIELD],
      precision: val[CURRENCY_FIELD].precision,
      symbol: val[CURRENCY_FIELD].symbol,
      contractAccount: val[CURRENCY_FIELD].contractAccount,
    });

    yield put(sendTipsSuccess());
    yield put(hideSendTipsModal());
    yield call(resetForm);
  } catch (err) {
    yield put(sendTipsErr(err));
  }
}

export function* selectAccountWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    let eosService = yield select(selectEos);

    if (!eosService) {
      eosService = new Eosio();
      yield put(initEosioSuccess(eosService));
    }
    yield call(eosService.forgetIdentity);
    yield call(eosService.initEosioWithScatter);

    if (!eosService.scatterInstalled) {
      throw new WebIntegrationError(
        translations[messages[SCATTER_MODE_ERROR].id],
      );
    }

    const selectedAccount = yield call(eosService.getSelectedAccount);

    yield put(
      selectAccountSuccess(
        selectedAccount.eosAccountName
          ? selectedAccount.eosAccountName
          : selectedAccount,
      ),
    );
  } catch (err) {
    yield put(selectAccountErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SELECT_ACCOUNT, selectAccountWorker);
  yield takeLatest(SEND_TIPS, sendTipsWorker);
}
