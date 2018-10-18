import { call, put, select, takeEvery } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isUserInSystem } from 'utils/accountManagement';

import {
  GET_CURRENT_ACCOUNT,
  INIT_SCATTER,
  SELECT_POPUP_ACCOUNT,
} from './constants';

import {
  getCurrentAccountSuccess,
  getCurrentAccountError,
  initScatterSuccess,
  initScatterError,
  selectPopupAccountSuccess,
  selectPopupAccountError,
} from './actions';

export function* getCurrentAccountWorker() {
  try {
    const eosService = yield select(selectEos);

    if (!eosService || !eosService.initialized)
      throw new Error('EOS is not initialized.');

    const selectedScatterAccount = yield eosService.scatterInstalled
      ? call(() => eosService.getSelectedAccount())
      : null;

    const userIsInSystem = yield call(() =>
      isUserInSystem(selectedScatterAccount, eosService),
    );

    const eosInit = {
      userIsInSystem,
      selectedScatterAccount,
      initialized: eosService.initialized,
      eosInstance: eosService.eosInstance,
      scatterInstance: eosService.scatterInstance,
      scatterInstalled: eosService.scatterInstalled,
    };

    yield put(getCurrentAccountSuccess(selectedScatterAccount, eosInit));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

export function* initScatterWorker() {
  try {
    const eosService = yield select(selectEos);

    yield call(() => eosService.initScatter());
    yield put(initScatterSuccess());
  } catch (err) {
    yield put(initScatterError(err));
  }
}

export function* selectPopupAccountWorker(res) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.selectAccount());
    const userIsInSystem = yield call(() =>
      isUserInSystem(selectedAccount, eosService),
    );

    yield put(selectPopupAccountSuccess(userIsInSystem, selectedAccount));
    yield call(() => res.callbackFunction(null));
  } catch (err) {
    console.log(err);
    yield put(selectPopupAccountError(err));
  }
}

export default function*() {
  yield takeEvery(GET_CURRENT_ACCOUNT, getCurrentAccountWorker);
  yield takeEvery(INIT_SCATTER, initScatterWorker);
  yield takeEvery(SELECT_POPUP_ACCOUNT, selectPopupAccountWorker);
}
