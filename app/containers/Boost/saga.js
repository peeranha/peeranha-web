import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getWeekStat } from 'utils/walletManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import {
  GET_WEEK_STAT,
  CHANGE_STAKE,
} from './constants';

import {
  getWeekStatSuccess,
  getWeekStatErr,
  changeStakeProcessing,
  changeStakeSuccess,
  changeStakeErr,
} from './actions';

export function* getWeekStatWorker() {
  try {
    const eosService = yield select(selectEos);
    const profile = yield select(makeSelectProfileInfo());

    const weekStat = yield call(getWeekStat, eosService, profile);

    yield put(getWeekStatSuccess(weekStat));
  } catch (err) {
    yield put(getWeekStatErr(err));
  }
}

export function* changeStakeWorker({ predictedBoost, currentStake }) {
  try {
    yield put(changeStakeProcessing());

    // TODO: post form stake data
    console.log({
      predictedBoost,
      currentStake,
    })

    yield put(changeStakeSuccess());
  } catch (err) {
    yield put(changeStakeErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest([GET_WEEK_STAT], getWeekStatWorker);
  yield takeLatest(CHANGE_STAKE, changeStakeWorker);
}
