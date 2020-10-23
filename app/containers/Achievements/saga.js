import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { selectUserRatingDCP } from 'containers/DataCacheProvider/selectors';

import {
  USER_ACHIEVEMENTS_TABLE,
  PROJECT_ACHIEVEMENTS_TABLE,
  ALL_ACHIEVEMENTS_SCOPE,
} from 'utils/constants';

import {
  GET_USER_ACHIEVEMENTS,
  uniqueAchievementsRating,
  achievementsRating,
} from './constants';

import {
  getUserAchievementsSuccess,
  getUserAchievementsErr,
  setUserAchievementLoading,
} from './actions';

import {
  selectViewProfileAccount,
  selectuserAchievementsError,
} from './selectors';

export async function getAchievements(eosService, tableTitle, scope) {
  const { rows } = await eosService.getTableRows(tableTitle, scope);
  return rows;
}

const getNextAchievement = userRating => {
  const currentRatingDiapasone = achievementsRating.filter(
    el => userRating >= el.minRating && userRating < el.maxRating,
  )[0];

  const nextAchievement = {
    id: currentRatingDiapasone.nextId,
    userRating,
    minRating:
      currentRatingDiapasone.maxRating !== Infinity
        ? currentRatingDiapasone.maxRating + 1
        : null,
    pointsToNext:
      currentRatingDiapasone.maxRating !== Infinity
        ? currentRatingDiapasone.maxRating + 1 - userRating
        : null,
  };
  return nextAchievement;
};

const getNextUniqueAchievement = userRating => {
  const currentUniqueRatingDiapasone = uniqueAchievementsRating.filter(
    el => userRating >= el.minRating && userRating < el.maxRating,
  )[0];

  const nextUniqueAchievement = {
    id: currentUniqueRatingDiapasone.nextId,
    userRating,
    minRating:
      currentUniqueRatingDiapasone.maxRating !== Infinity
        ? currentUniqueRatingDiapasone.maxRating + 1
        : null,
    pointsToNext:
      currentUniqueRatingDiapasone.maxRating !== Infinity
        ? currentUniqueRatingDiapasone.maxRating + 1 - userRating
        : null,
  };
  return nextUniqueAchievement;
};

export function* getUserAchievementsWorker() {
  try {
    const viewProfileAccount = yield select(selectViewProfileAccount());

    if (viewProfileAccount) {
      const isErrorInState = yield select(selectuserAchievementsError());

      yield put(setUserAchievementLoading(true));
      if (isErrorInState) yield put(getUserAchievementsErr(null));

      const eosService = yield select(selectEos);
      const userRating = yield select(selectUserRatingDCP(viewProfileAccount));

      const nextAchievement = getNextAchievement(userRating);
      const nextUniqueAchievement = getNextUniqueAchievement(userRating);

      const userAchievements = yield call(
        getAchievements,
        eosService,
        USER_ACHIEVEMENTS_TABLE,
        viewProfileAccount,
      );

      const projectAchievements = yield call(
        getAchievements,
        eosService,
        PROJECT_ACHIEVEMENTS_TABLE,
        ALL_ACHIEVEMENTS_SCOPE,
      );

      yield put(
        getUserAchievementsSuccess(
          userAchievements,
          projectAchievements,
          nextAchievement,
          nextUniqueAchievement,
        ),
      );
    }
  } catch (err) {
    yield put(getUserAchievementsErr(err));
    yield put(setUserAchievementLoading(false));
  }
}

export default function*() {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
}
