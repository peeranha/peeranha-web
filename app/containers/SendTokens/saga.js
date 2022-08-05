import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import { reset as reduxFormReset } from 'redux-form';

import { sendTokens } from 'utils/walletManagement';
import { WebIntegrationError } from 'utils/errors';

import messages from 'common-messages';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  SEND_TOKENS,
  EOS_ACCOUNT_FIELD,
  AMOUNT_FIELD,
  SEND_TOKENS_FORM,
} from './constants';

import {
  sendTokensSuccess,
  sendTokensErr,
  hideSendTokensModal,
} from './actions';

export function* sendTokensWorker({ val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const eosService = yield select(selectEos);
    const profile = yield select(makeSelectProfileInfo());

    if (profile.user === val[EOS_ACCOUNT_FIELD]) {
      throw new WebIntegrationError(
        translations[messages.cannotTransferToYourself.id],
      );
    }

    const a = yield call(sendTokens, eosService, {
      from: profile.user,
      to: val[EOS_ACCOUNT_FIELD],
      quantity: val[AMOUNT_FIELD],
    });
    console.log(a);

    yield put(sendTokensSuccess());
    yield put(hideSendTokensModal());

    yield put(reduxFormReset(SEND_TOKENS_FORM));
  } catch (err) {
    yield put(sendTokensErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SEND_TOKENS, sendTokensWorker);
}
