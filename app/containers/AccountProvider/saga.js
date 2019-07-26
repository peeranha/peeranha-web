import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';

import { getProfileInfo } from 'utils/profileManagement';

import { getCurrentAccountSuccess, getCurrentAccountError } from './actions';

import { GET_CURRENT_ACCOUNT } from './constants';

export function* getCurrentAccountWorker() {
  try {
    const eosService = yield select(selectEos);

    if (!eosService || !eosService.initialized)
      throw new Error('EOS is not initialized.');

    const selectedScatterAccount = yield call(() =>
      eosService.getSelectedAccount(),
    );

    const profileInfo = yield call(() =>
      getProfileInfo(selectedScatterAccount, eosService),
    );

    yield put(getCurrentAccountSuccess(selectedScatterAccount, profileInfo));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_CURRENT_ACCOUNT, getCurrentAccountWorker);
}
