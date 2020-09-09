import { call, put, takeLatest, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import { GET_USER_ACHIEVEMENTS } from './constants';
import {
  getUserAchievementsSuccess,
  getUserAchievementsErr,
  setCurrentAccount,
  setUserAchievementLoading,
} from './actions';
import { selectuserAchievementsError } from './selectors';

export async function getUserAchievements(eosService, tableTitle, scope) {
  const { rows } = await eosService.getTableRows(tableTitle, scope);
  return rows;
}

export function* getUserAchievementsWorker() {
  try {
    const currentAccount = yield select(makeSelectAccount());
    const isErrorInState = yield select(selectuserAchievementsError());

    yield put(setUserAchievementLoading(true));
    yield put(setCurrentAccount(currentAccount));
    if (isErrorInState) yield put(getUserAchievementsErr(null));

    const eosService = yield select(selectEos);

    const achievements = yield call(
      getUserAchievements,
      eosService,
      'accachieve',
      currentAccount,
    );

    yield put(getUserAchievementsSuccess(achievements));
  } catch (err) {
    yield put(getUserAchievementsErr(err));
    yield put(setUserAchievementLoading(false));
  }
}

export default function* () {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
}
