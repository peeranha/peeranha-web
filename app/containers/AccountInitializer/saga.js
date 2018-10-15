import { call, put, select, takeEvery } from 'redux-saga/effects';
import { selectEos } from 'containers/EosioProvider/selectors';

import { GET_CURRENT_ACCOUNT } from './constants';
import { getCurrentAccountSuccess, getCurrentAccountError } from './actions';

export function* getCurrentAccountWorker() {
  try {
    const eosService = yield select(selectEos);

    if (!eosService || !eosService.initialized)
      throw new Error('EOS is not initialized.');

    const eosAccount = yield call(() => eosService.selectAccount());
    yield put(getCurrentAccountSuccess({ eosAccount }));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

export default function*() {
  yield takeEvery(GET_CURRENT_ACCOUNT, getCurrentAccountWorker);
}
