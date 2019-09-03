import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getWeekStat } from 'utils/walletManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import { GET_WEEK_STAT } from './constants';
import { getWeekStatSuccess, getWeekStatErr } from './actions';

export function* getWeekStatWorker() {
  try {
    const eosService = yield select(selectEos);
    const account = yield select(makeSelectAccount());

    const weekStat = yield call(() => getWeekStat(eosService, account));

    yield put(getWeekStatSuccess(weekStat));
  } catch (err) {
    yield put(getWeekStatErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_WEEK_STAT, getWeekStatWorker);
}
