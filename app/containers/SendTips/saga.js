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
import Eosio from 'utils/eosio';
import {
  callService,
  NOTIFICATIONS_TIPS_SERVICE,
} from 'utils/web_integration/src/util/aws-connector';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import formFieldsMessages from 'components/FormFields/messages.js';

import messages, {
  getAccountNotSelectedMessageDescriptor,
} from '../Login/messages';
import { SCATTER_MODE_ERROR, USER_IS_NOT_SELECTED } from '../Login/constants';

import {
  SEND_TIPS,
  AMOUNT_FIELD,
  PASSWORD_FIELD,
  CURRENCY_FIELD,
  WALLET_FIELD,
  SELECT_SCATTER_ACCOUNT,
  SELECT_KEYCAT_ACCOUNT,
  EOS_SEND_TO_ACCOUNT_FIELD,
  EOS_SEND_FROM_ACCOUNT_FIELD,
  TIPS_PRESELECT,
} from './constants';

import {
  hideSendTipsModal,
  sendTipsSuccess,
  selectScatterAccountSuccess,
  selectKeycatAccountSuccess,
  sendTipsErr,
  selectAccountErr,
  addScatterTipsEosService,
  addTipsKeycatEosService,
} from './actions';

import {
  selectTipsScatterEosService,
  selectTipsKeycatEosService,
  selectedKeycatAccountSelector,
} from './selectors';

import { formName } from './SendTipsForm';

export function* sendTipsWorker({ resetForm, val, questionId, answerId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    let eosService;

    const profile = yield select(makeSelectProfileInfo());

    const password = val[PASSWORD_FIELD];

    // check password and set eosService for users which logged with email
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
    }

    // set eosService for SCATTER wallet
    if (
      val[WALLET_FIELD].names ||
      val[WALLET_FIELD].name === WALLETS.SQRL.name ||
      val[WALLET_FIELD].name === WALLETS.WOMBAT.name ||
      val[WALLET_FIELD].name === WALLETS.SCATTER.name
    ) {
      eosService = yield select(selectTipsScatterEosService());

      if (!eosService) {
        eosService = new Eosio();
        yield put(addScatterTipsEosService(eosService));
      }
      if (!eosService.initialized) {
        yield call(eosService.initEosioWithScatter, SEND_TIPS_SCATTER_APP_NAME);
      }
    }

    // set eosService for KEYCAT wallet
    if (val[WALLET_FIELD].name === WALLETS.KEYCAT.name) {
      const selectedKeycatAccount = yield select(
        selectedKeycatAccountSelector(),
      );

      if (val[EOS_SEND_FROM_ACCOUNT_FIELD] === selectedKeycatAccount) {
        eosService = yield select(selectTipsKeycatEosService());
      } else {
        eosService = yield select(selectEos);
      }
    }

    const { response, data } = yield call(sendTokens, eosService, {
      from: val[EOS_SEND_FROM_ACCOUNT_FIELD],
      to: val[EOS_SEND_TO_ACCOUNT_FIELD],
      quantity: val[AMOUNT_FIELD],
      precision: val[CURRENCY_FIELD].precision,
      symbol: val[CURRENCY_FIELD].symbol,
      contractAccount: val[CURRENCY_FIELD].contractAccount,
    });

    yield call(callService, NOTIFICATIONS_TIPS_SERVICE, {
      ..._omit(data, 'memo'),
      questionId,
      answerId,
      transactionId: response.transaction_id,
      block: response.processed.block_num,
    });

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

export function* selectScatterAccountWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    let tipsEosService = yield select(selectTipsScatterEosService());

    if (!tipsEosService) {
      tipsEosService = new Eosio();
      yield put(addScatterTipsEosService(tipsEosService));
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
          translations[
            getAccountNotSelectedMessageDescriptor(
              tipsEosService.isScatterExtension,
            ).id
          ],
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
      selectScatterAccountSuccess(
        selectedAccount.eosAccountName
          ? selectedAccount.eosAccountName
          : selectedAccount,
      ),
    );
  } catch (err) {
    yield put(selectAccountErr(err));
  }
}

export function* selectKeycatAccountWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    let tipsKeycatEosService = yield select(selectTipsKeycatEosService());

    if (!tipsKeycatEosService) {
      tipsKeycatEosService = new Eosio();
      yield call(tipsKeycatEosService.initEosioWithoutScatter);
      yield put(addTipsKeycatEosService(tipsKeycatEosService));
    } else {
      yield call(tipsKeycatEosService.resetKeycatUserData);
    }

    const { accountName: keycatAccount } = yield call(
      tipsKeycatEosService.keycatSignIn,
    );

    if (!keycatAccount) {
      throw new WebIntegrationError(
        translations[messages[USER_IS_NOT_SELECTED].id],
      );
    }

    const receiver = (yield select(getFormValues(formName))).get(
      EOS_SEND_TO_ACCOUNT_FIELD,
    );

    if (receiver === keycatAccount) {
      throw new WebIntegrationError(
        translations[formFieldsMessages.exactFromAndToAccounts.id],
      );
    }

    yield put(selectKeycatAccountSuccess(keycatAccount));
  } catch (err) {
    yield put(selectAccountErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SELECT_SCATTER_ACCOUNT, selectScatterAccountWorker);
  yield takeLatest(SELECT_KEYCAT_ACCOUNT, selectKeycatAccountWorker);
  yield takeLatest(SEND_TIPS, sendTipsWorker);
}
