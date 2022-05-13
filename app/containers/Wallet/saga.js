import { takeEvery, takeLatest, put, call, select } from 'redux-saga/effects';
import { getWeekStat, pickupReward } from 'utils/walletManagement';

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
import { selectEthereum } from '../EthereumProvider/selectors';

export function* getWeekStatWorker() {
  try {
    const ethereumService = yield select(selectEthereum);
    const profile = yield select(makeSelectProfileInfo());
    const user = yield select(makeSelectAccount());
    const weekStat = profile
      ? yield call(getWeekStat, ethereumService, user)
      : [];

    // TODO boost
    // const userBoostStat = profile ? yield call(getUserBoostStatistics, eosService, profile.user) : [];

    yield put(getWeekStatSuccess(weekStat));
  } catch (err) {
    yield put(getWeekStatErr(err));
  }
}

export function* pickupRewardWorker({ period, buttonId }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const account = yield select(makeSelectAccount());

    yield call(pickupReward, ethereumService, account, period);

    yield put(pickupRewardSuccess(buttonId));
  } catch (err) {
    yield put(pickupRewardErr(err, buttonId));
  }
}

export default function* defaultSaga() {
  yield takeLatest([GET_WEEK_STAT, PICKUP_REWARD_SUCCESS], getWeekStatWorker);
  yield takeEvery(PICKUP_REWARD, pickupRewardWorker);
}
