import { call, put, select, takeEvery } from 'redux-saga/effects';
import { selectEos } from 'containers/EosioProvider/selectors';
import { GET_CURRENT_ACCOUNT } from './constants';
import { getCurrentAccountSuccess, getCurrentAccountError } from './actions';

export function* getCurrentAccountWorker() {
  try {
    const eos = yield select(selectEos);

    if (!eos || !eos.initialized) throw new Error('EOS is not initialized.');

    const account = yield call(() => eos.getSelectedAccount());
    yield put(getCurrentAccountSuccess(account));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

export default function*() {
  yield takeEvery(GET_CURRENT_ACCOUNT, getCurrentAccountWorker);
}
