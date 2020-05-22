import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import { getFormValues } from 'redux-form/lib/immutable';

import _isEqual from 'lodash/isEqual';
import _cloneDeep from 'lodash/cloneDeep';
import _omit from 'lodash/omit';

import { WALLETS } from 'wallet-config';
import { sendTokens } from 'utils/walletManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';
import { SEND_TIPS_SCATTER_APP_NAME } from 'utils/constants';
import { getCookie, setCookie } from 'utils/cookie';
import {
  callService,
  NOTIFICATIONS_TIPS_SERVICE,
} from 'utils/web_integration/src/util/aws-connector';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import formFieldsMessages from 'components/FormFields/messages.js';
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
  TIPS_PRESELECT,
} from './constants';

import {
  hideSendTipsModal,
  sendTipsSuccess,
  selectAccountSuccess,
  sendTipsErr,
  selectAccountErr,
  addTipsEosService,
} from './actions';
import messages from '../Login/messages';
import { SCATTER_MODE_ERROR, USER_IS_NOT_SELECTED } from '../Login/constants';
import { selectTipsEosService } from './selectors';
import { selectEos } from '../EosioProvider/selectors';
import { formName } from './SendTipsForm';

export function* sendTipsWorker({
  resetForm,
  val,
  communityId,
  questionId,
  answerId,
}) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    let eosService = yield select(selectTipsEosService());

    if (!eosService) {
      eosService = new Eosio();
      yield put(addTipsEosService(eosService));
    }

    const profile = yield select(makeSelectProfileInfo());

    const password = val[PASSWORD_FIELD];

    // check password for users which logged with email
    if (val[WALLET_FIELD].name === WALLETS.PEERANHA.name) {
      eosService = yield select(selectEos);

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
      (val[WALLET_FIELD].names ||
        val[WALLET_FIELD].name === WALLETS.SQRL.name ||
        val[WALLET_FIELD].name === WALLETS.SCATTER.name) &&
      !eosService.initialized
    ) {
      yield call(eosService.initEosioWithScatter, SEND_TIPS_SCATTER_APP_NAME);
    }

    const { response, data } = yield call(sendTokens, eosService, {
      from: val[EOS_SEND_FROM_ACCOUNT_FIELD],
      to: val[EOS_SEND_TO_ACCOUNT_FIELD],
      quantity: val[AMOUNT_FIELD],
      precision: val[CURRENCY_FIELD].precision,
      symbol: val[CURRENCY_FIELD].symbol,
      contractAccount: val[CURRENCY_FIELD].contractAccount,
    });

    yield call(
      callService,
      NOTIFICATIONS_TIPS_SERVICE,
      {
        ..._omit(data, 'memo'),
        communityId,
        questionId,
        answerId,
        transactionId: response.transaction_id,
        block: response.processed.block_num,
      },
      true,
    );

    // update preselect tips values
    const tipsPreselect = {
      [CURRENCY_FIELD]: val[CURRENCY_FIELD].name,
      [AMOUNT_FIELD]: {
        [val[CURRENCY_FIELD].name]: val[AMOUNT_FIELD],
      },
      [WALLET_FIELD]: val[WALLET_FIELD].name,
    };

    const tipsPreselectCookie = JSON.parse(getCookie(TIPS_PRESELECT) || '{}');
    const tipsPreselectToSave = _cloneDeep(tipsPreselect);
    tipsPreselectToSave[AMOUNT_FIELD] = {
      ...tipsPreselectCookie[AMOUNT_FIELD],
      ...tipsPreselect[AMOUNT_FIELD],
    };

    if (!_isEqual(tipsPreselectToSave, tipsPreselectCookie)) {
      setCookie({
        name: TIPS_PRESELECT,
        value: JSON.stringify(tipsPreselectToSave),
        options: {
          allowSubdomains: true,
          neverExpires: true,
          defaultPath: true,
        },
      });
    }

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
    let tipsEosService = yield select(selectTipsEosService());

    if (!tipsEosService) {
      tipsEosService = new Eosio();
      yield put(addTipsEosService(tipsEosService));
      yield call(
        tipsEosService.initEosioWithScatter,
        SEND_TIPS_SCATTER_APP_NAME,
      );
    } else {
      yield call(tipsEosService.forgetIdentity);
    }

    if (!tipsEosService.scatterInstalled) {
      yield call(tipsEosService.initEosioWithScatter);
      if (!tipsEosService.scatterInstalled) {
        throw new WebIntegrationError(
          translations[messages[SCATTER_MODE_ERROR].id],
        );
      }
    }

    let { selectedAccount } = tipsEosService;
    if (!selectedAccount) {
      selectedAccount = yield call(tipsEosService.selectAccount);
      if (!selectedAccount) {
        throw new WebIntegrationError(
          translations[messages[USER_IS_NOT_SELECTED].id],
        );
      }
    }
    const receiver = (yield select(getFormValues(formName))).get(
      EOS_SEND_TO_ACCOUNT_FIELD,
    );

    if (receiver === selectedAccount) {
      throw new WebIntegrationError(
        translations[formFieldsMessages.exactFromAndToAccounts.id],
      );
    }

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
