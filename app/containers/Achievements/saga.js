import { call, put, takeLatest, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  makeSelectAccount,
  selectUserRating,
} from 'containers/AccountProvider/selectors';

import {
  GET_USER_ACHIEVEMENTS,
  uniqueAchievementsRating,
  achievementsRating,
} from './constants';
import {
  getUserAchievementsSuccess,
  getUserAchievementsErr,
  setCurrentAccount,
  setUserAchievementLoading,
} from './actions';
import { selectuserAchievementsError } from './selectors';

export async function getAchievements(eosService, tableTitle, scope) {
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
    const userRating = yield select(selectUserRating());

    const getRating = () =>
      achievementsRating.filter(
        el => userRating >= el.minRating && userRating < el.maxRating,
      )[0];

    const getUniqueRating = () =>
      uniqueAchievementsRating.filter(
        el => userRating >= el.minRating && userRating < el.maxRating,
      )[0];

    const nextAchievement = {
      id: getRating().nextId,
      userRating,
      minRating:
        getRating().maxRating !== Infinity ? getRating().maxRating + 1 : null,
      pointsToNext:
        getRating().maxRating !== Infinity
          ? getRating().maxRating + 1 - userRating
          : null,
    };

    const nextUniqueAchievement = {
      id: getUniqueRating().nextId,
      userRating,
      minRating:
        getUniqueRating().maxRating !== Infinity
          ? getUniqueRating().maxRating + 1
          : null,
      pointsToNext:
        getUniqueRating().maxRating !== Infinity
          ? getUniqueRating().maxRating + 1 - userRating
          : null,
    };

    const userAchievements = yield call(
      getAchievements,
      eosService,
      'accachieve',
      currentAccount,
    );

    const projectAchievements = yield call(
      getAchievements,
      eosService,
      'achieve',
      'allachieve',
    );

    yield put(
      getUserAchievementsSuccess(
        userAchievements,
        projectAchievements,
        nextAchievement,
        nextUniqueAchievement,
      ),
    );
  } catch (err) {
    yield put(getUserAchievementsErr(err));
    yield put(setUserAchievementLoading(false));
  }
}

export default function*() {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
}
