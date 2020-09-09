import { call, put, takeLatest, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';

import { GET_USER_ACHIEVEMENTS } from './constants';
import {
  getUserAchievementsSuccess,
  getUserAchievementsErr,
  setCurrentAccount,
} from './actions';
import { selectuserAchievementsError } from './selectors';

export async function getUserAchievements(eosService, tableTitle, scope) {
  const { rows } = await eosService.getTableRows(tableTitle, scope);
  return rows;
}

export function* getUserAchievementsWorker(action) {
  try {
    yield put(setCurrentAccount(action.currentAccount));
    const isErrorInState = yield select(selectuserAchievementsError());
    if (isErrorInState) yield put(getUserAchievementsErr(null));
    const eosService = yield select(selectEos);

    const achievements = yield call(
      getUserAchievements,
      eosService,
      'accachieve',
      action.currentAccount,
    );

    yield put(getUserAchievementsSuccess(achievements));
  } catch (err) {
    yield put(getUserAchievementsErr(err));
  }
}

export default function* () {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
}
