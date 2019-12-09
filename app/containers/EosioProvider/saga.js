import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import EosioService from 'utils/eosio';
import { ApplicationError } from 'utils/errors';
import { updateAcc } from 'utils/accountManagement';
import { autoLogin } from 'utils/web_integration/src/wallet/login/login';

import {
  makeSelectProfileInfo,
  makeSelectAccount,
} from 'containers/AccountProvider/selectors';

import { showLoginModal } from 'containers/Login/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';

import { initEosioSuccess, initEosioError } from './actions';
import { INIT_EOSIO } from './constants';

import validate from './validate';

export function* initEosioWorker() {
  try {
    const defaultEosioService = new EosioService();
    yield call(defaultEosioService.init);
    yield put(initEosioSuccess(defaultEosioService));

    const response = yield call(autoLogin);

    if (response.OK) {
      const advancedEosioService = new EosioService();

      yield call(
        advancedEosioService.init,
        response.body.activeKey.private,
        false,
        response.body.eosAccountName,
      );

      yield call(getCurrentAccountWorker, response.body.eosAccountName);
      yield put(initEosioSuccess(advancedEosioService));
      yield call(updateAcc, response.body.eosAccountName, advancedEosioService);
    }
  } catch (error) {
    yield put(initEosioError(error));
  }
}

export function* isAuthorized() {
  const profileInfo = yield select(makeSelectProfileInfo());

  if (!profileInfo) {
    yield put(showLoginModal());
    throw new ApplicationError('Not authorized');
  }
}

export function* isValid({ creator, buttonId, minRating, minEnergy }) {
  const locale = yield select(makeSelectLocale());
  const profileInfo = yield select(makeSelectProfileInfo());
  const selectedAccount = yield select(makeSelectAccount());

  yield call(() =>
    validate({
      rating: profileInfo.rating,
      translations: translationMessages[locale],
      actor: selectedAccount,
      creator,
      buttonId,
      energy: profileInfo.energy,
      minRating,
      minEnergy,
    }),
  );
}

export default function*() {
  yield takeLatest(INIT_EOSIO, initEosioWorker);
}
