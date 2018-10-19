import { call, put, select, takeEvery } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isUserInSystem } from 'utils/accountManagement';

import { GET_CURRENT_ACCOUNT, SELECT_POPUP_ACCOUNT } from './constants';

import {
  getCurrentAccountSuccess,
  getCurrentAccountError,
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

export function* selectPopupAccountWorker(res) {
  try {
    const eosService = yield select(selectEos);
    const selectedScatterAccount = yield call(() => eosService.selectAccount());
    const userIsInSystem = yield call(() =>
      isUserInSystem(selectedScatterAccount, eosService),
    );

    yield put(
      selectPopupAccountSuccess(
        { userIsInSystem, selectedScatterAccount },
        selectedScatterAccount,
      ),
    );
    yield call(() => res.callbackFunction(null));
  } catch (err) {
    yield put(selectPopupAccountError(err));
  }
}

export default function*() {
  yield takeEvery(GET_CURRENT_ACCOUNT, getCurrentAccountWorker);
  yield takeEvery(SELECT_POPUP_ACCOUNT, selectPopupAccountWorker);
}
