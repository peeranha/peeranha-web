import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getWeekStat } from 'utils/walletManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import {
  GET_WEEK_STAT,
  CHANGE_BET,
} from './constants';

import {
  getWeekStatSuccess,
  getWeekStatErr,
  changeBetProcessing,
  changeBetSuccess,
  changeBetErr,
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

export function* changeBetWorker({ superPowerPrediction, currentBet, betType }) {
  try {
    yield put(changeBetProcessing());

    // TODO: post form bet data
    console.log({
      superPowerPrediction,
      currentBet,
      betType,
    })

    yield put(changeBetSuccess());
  } catch (err) {
    yield put(changeBetErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest([GET_WEEK_STAT], getWeekStatWorker);
  yield takeLatest(CHANGE_BET, changeBetWorker);
}
