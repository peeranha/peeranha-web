import { takeLatest } from 'redux-saga/effects';

import { GET_WEEK_STAT, CHANGE_STAKE } from './constants';

export function* getWeekStatWorker() {
  // try {
  //   const eosService = yield select(selectEos);
  //   const profile = yield select(makeSelectProfileInfo());
  //
  //   const weekStat = yield call(getWeekStat, eosService, profile);
  //   const globalBoostStat = yield call(getGlobalBoostStatistics, eosService);
  //   const userBoostStat = yield call(
  //     getUserBoostStatistics,
  //     eosService,
  //     profile.user,
  //   );
  //
  //   yield put(getWeekStatSuccess(weekStat, globalBoostStat, userBoostStat));
  // } catch (err) {
  //   yield put(getWeekStatErr(err));
  // }
}

export function* changeStakeWorker({ currentStake }) {
  // try {
  //   yield put(changeStakeProcessing());
  //
  //   const eosService = yield select(selectEos);
  //   const profile = yield select(makeSelectProfileInfo());
  //
  //   yield call(
  //     addBoost,
  //     eosService,
  //     profile.user,
  //     `${getFormattedNum5(currentStake)} PEER`,
  //   );
  //
  //   const globalBoostStat = yield call(getGlobalBoostStatistics, eosService);
  //   const userBoostStat = yield call(
  //     getUserBoostStatistics,
  //     eosService,
  //     profile.user,
  //   );
  //
  //   yield put(changeStakedInNextPeriod(+currentStake));
  //
  //   yield put(changeStakeSuccess(globalBoostStat, userBoostStat));
  // } catch (err) {
  //   yield put(changeStakeErr(err));
  // }
}

export default function* defaultSaga() {
  yield takeLatest([GET_WEEK_STAT], getWeekStatWorker);
  yield takeLatest(CHANGE_STAKE, changeStakeWorker);
}
