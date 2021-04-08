import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import { reset as reduxFormReset } from 'redux-form';

import { sendTokens } from 'utils/walletManagement';
import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';

import { changeCredentialsConfirm } from 'utils/web_integration/src/wallet/change-credentials/change-credentials';
import { sendFbVerificationCode } from 'utils/web_integration/src/wallet/facebook/facebook';

import messages from 'common-messages';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';
import { selectFacebookUserData } from 'containers/Login/selectors';

import { SEND_TOKENS_TYPE } from 'utils/constants';

import {
  VERIFY_FB_ACTION_FORM,
  FB_VERIFICATION_CODE_FIELD,
} from 'components/FbVerificationCodeForm/constants';

import {
  SEND_TOKENS,
  EOS_ACCOUNT_FIELD,
  AMOUNT_FIELD,
  PASSWORD_FIELD,
  SEND_TOKENS_FORM,
  VERIFY_FB_ACTION,
  SEND_ANOTHER_CODE,
  SEND_FB_VERIFICATION_EMAIL,
} from './constants';

import {
  sendTokensSuccess,
  sendTokensErr,
  hideSendTokensModal,
  setSendTokensProcessing,
  showVerifyFbModal,
} from './actions';
import { CURRENCIES } from '../../wallet-config';
import { selectFbSendTokensFormValues } from './selectors';

export function* sendTokensWorker({ val }) {
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
        throw new WebIntegrationError(
          translations[webIntegrationErrors[response.errorCode].id],
        );
      }
    }

    if (profile.user === val[EOS_ACCOUNT_FIELD]) {
      throw new WebIntegrationError(
        translations[messages.cannotTransferToYourself.id],
      );
    }

    const a = yield call(sendTokens, eosService, {
      from: profile.user,
      to: val[EOS_ACCOUNT_FIELD],
      quantity: val[AMOUNT_FIELD],
      ...CURRENCIES.PEER,
    });
    console.log(a);
    /* from: "tuesdaytest1"
to: "yuliachorno2"
quantity: "0.001"
precision: 4
symbol: "TLOS"
contractAccount: "eosio.token" */

    yield put(sendTokensSuccess());
    yield put(hideSendTokensModal());

    yield put(reduxFormReset(SEND_TOKENS_FORM));
  } catch (err) {
    yield put(sendTokensErr(err));
  }
}

export function* sendEmailWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    const { id } = yield select(selectFacebookUserData());

    const response = yield call(
      sendFbVerificationCode,
      id,
      locale,
      SEND_TOKENS_TYPE,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(setSendTokensProcessing(false));
    yield put(showVerifyFbModal());
  } catch (err) {
    yield put(sendTokensErr(err));
  }
}

export function* verifyFacebookActionWorker({ verifyFormVals }) {
  try {
    yield put(setSendTokensProcessing(true));

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    const { email } = yield select(selectFacebookUserData());
    const verificationCode = verifyFormVals[FB_VERIFICATION_CODE_FIELD];

    const response = yield call(
      changeCredentialsConfirm,
      email,
      verificationCode,
      SEND_TOKENS_TYPE,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const val = yield select(selectFbSendTokensFormValues());
    yield sendTokensWorker({ val });

    yield put(reduxFormReset(VERIFY_FB_ACTION_FORM));
  } catch (err) {
    yield put(sendTokensErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SEND_TOKENS, sendTokensWorker);
  yield takeLatest(
    [SEND_FB_VERIFICATION_EMAIL, SEND_ANOTHER_CODE],
    sendEmailWorker,
  );
  yield takeLatest(VERIFY_FB_ACTION, verifyFacebookActionWorker);
}
