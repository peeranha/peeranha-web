import { takeEvery, takeLatest, put, call, select } from 'redux-saga/effects';
import {
  getWeekStat,
  pickupReward,
  getUserBoostStatistics,
} from 'utils/walletManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

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
    const profile = yield select(makeSelectProfileInfo());

    const weekStat = profile ? yield call(getWeekStat, eosService, profile) : [];
    const userBoostStat = profile ? yield call(getUserBoostStatistics, eosService, profile.user) : [];

    yield put(getWeekStatSuccess(weekStat, userBoostStat));
  } catch (err) {
    yield put(getWeekStatErr(err));
  }
}

export function* pickupRewardWorker({ period, buttonId }) {
  try {
    const eosService = yield select(selectEos);
    const account = yield select(makeSelectAccount());

    yield call(pickupReward, eosService, account, period);

    yield put(pickupRewardSuccess(buttonId));
  } catch (err) {
    yield put(pickupRewardErr(err, buttonId));
  }
}

export default function* defaultSaga() {
  yield takeLatest([GET_WEEK_STAT, PICKUP_REWARD_SUCCESS], getWeekStatWorker);
  yield takeEvery(PICKUP_REWARD, pickupRewardWorker);
}
