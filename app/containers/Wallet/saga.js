import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getWeekStat, pickupReward } from 'utils/walletManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import {
  GET_WEEK_STAT,
  PICKUP_REWARD,
  PICKUP_REWARD_SUCCESS,
} from './constants';

import {
  getWeekStatSuccess,
  getWeekStatErr,
  pickupRewardSuccess,
  pickupRewardErr,
} from './actions';

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

export function* pickupRewardWorker({ period }) {
  try {
    const eosService = yield select(selectEos);
    const account = yield select(makeSelectAccount());

    yield call(pickupReward, eosService, account, period);

    yield put(pickupRewardSuccess());
  } catch (err) {
    yield put(pickupRewardErr(err.message));
  }
}

export default function* defaultSaga() {
  yield takeLatest([GET_WEEK_STAT, PICKUP_REWARD_SUCCESS], getWeekStatWorker);
  yield takeLatest(PICKUP_REWARD, pickupRewardWorker);
}
