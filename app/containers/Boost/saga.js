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

import { WEI_IN_ETH } from 'utils/constants';
import { GET_WEEK_STAT, CHANGE_STAKE } from './constants';

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
    // TODO boost
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
      (currentStake * WEI_IN_ETH).toString(),
    );

    yield put(changeStakedInNextPeriod(Number(currentStake)));

    const [newBoost, newAverageStake] = calculateNewBoost(
      boostStat,
      Number(currentStake),
    );

    const newBoosStat = {
      ...boostStat,
      availableBalance: boostStat.availableBalance - currentStake,
      averageStakeNext: newAverageStake,
      userBoostNext: newBoost,
      userStakeNext: Number(currentStake),
    };

    yield put(changeStakeSuccess(newBoosStat));
    yield call(getWeekStatWorker);
  } catch (err) {
    yield put(changeStakeErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest([GET_WEEK_STAT], getWeekStatWorker);
  yield takeLatest(CHANGE_STAKE, changeStakeWorker);
}
