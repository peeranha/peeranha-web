import { takeLatest, put, call, select } from 'redux-saga/effects';
import {
  getWeekStat,
  getUserBoostStatistics,
  addBoost,
  calculateNewBoost,
} from 'utils/walletManagement';

import { changeStakedInNextPeriod } from 'containers/AccountProvider/actions';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from 'containers/AccountProvider/selectors';

import {
  GET_WEEK_STAT,
  CHANGE_STAKE,
  TOKENS_AFTER_ZERO,
  CURRENT_STAKE_FORM,
} from './constants';

import {
  getWeekStatSuccess,
  getWeekStatErr,
  changeStakeProcessing,
  changeStakeSuccess,
  changeStakeErr,
} from './actions';
import { selectEthereum } from '../EthereumProvider/selectors';
import { selectUserBoostStat } from './selectors';

export function* getWeekStatWorker() {
  try {
    const ethereumService = yield select(selectEthereum);
    const profile = yield select(makeSelectProfileInfo());
    const user = yield select(makeSelectAccount());
    const weekStat = profile
      ? yield call(getWeekStat, ethereumService, user)
      : [];
    //TODO boost
    // const userBoostStat = profile ? yield call(getUserBoostStatistics, eosService, profile.user) : [];

    const currentPeriod = weekStat[0].period;
    const boostStat = profile
      ? yield call(getUserBoostStatistics, ethereumService, user, currentPeriod)
      : {};

    yield put(getWeekStatSuccess(weekStat, null, boostStat));
  } catch (err) {
    yield put(getWeekStatErr(err));
  }
}

export function* changeStakeWorker({ currentStake }) {
  try {
    yield put(changeStakeProcessing());

    const ethereumService = yield select(selectEthereum);
    const profile = yield select(makeSelectProfileInfo());
    const boostStat = yield select(selectUserBoostStat());

    yield call(
      addBoost,
      ethereumService,
      profile.user,
      (currentStake * 10 ** 18).toString(),
    );

    yield put(changeStakedInNextPeriod(+currentStake));

    const [newBoost, newAverageStake] = calculateNewBoost(
      boostStat,
      currentStake,
    );

    boostStat.availableBalance -= currentStake;
    boostStat.averageStakeNext = newAverageStake;
    boostStat.userBoostNext = newBoost;
    boostStat.userStakeNext = +currentStake;

    yield put(changeStakeSuccess(boostStat));
    yield call(getWeekStatWorker);
  } catch (err) {
    yield put(changeStakeErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest([GET_WEEK_STAT], getWeekStatWorker);
  yield takeLatest(CHANGE_STAKE, changeStakeWorker);
}
