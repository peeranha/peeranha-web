import { call, put, takeLatest, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { selectUserRatingDCP } from 'containers/DataCacheProvider/selectors';

import {
  GET_USER_ACHIEVEMENTS,
  uniqueAchievementsArr,
  achievementsArr,
} from './constants';
import {
  getUserAchievementsSuccess,
  getUserAchievementsErr,
  setUserAchievementLoading,
} from './actions';
import { selectViewProfileAccount } from './selectors';

async function getAchievements(eosService, tableTitle, scope) {
  const { rows } = await eosService.getTableRows(tableTitle, scope);
  return rows;
}

export const getNextAchievement = userRating => {
  const currentAchievement = achievementsArr.find(
    el => userRating >= el.minRating && userRating < el.maxRating,
  );

  const nextAchievement = {
    id: currentAchievement.nextId,
    userRating,
    minRating:
      currentAchievement.maxRating !== Infinity
        ? currentAchievement.maxRating + 1
        : null,
    pointsToNext:
      currentAchievement.maxRating !== Infinity
        ? currentAchievement.maxRating + 1 - userRating
        : null,
  };
  return nextAchievement;
};

export const getNextUniqueAchievement = (
  userRating,
  projectAchievements = [],
) => {
  const currentUniqueAchievement =
    uniqueAchievementsArr.find(el => {
      const totalAwarded =
        projectAchievements.find(item => item.id === el.id)?.count ?? 0;

      return (
        userRating >= el.minRating &&
        userRating < el.maxRating &&
        el.limit > totalAwarded
      );
    }) || {};

  // current unique achievement is last possible or they are out of limit
  if (!currentUniqueAchievement.nextId) return null;

  // check whether next unique achievement is not out of limit
  let { nextId } = currentUniqueAchievement;
  let nextUniqueAchievement = uniqueAchievementsArr.find(
    el => el.id === nextId,
  );

  while (true) {
    const totalAwarded =
      projectAchievements.find(el => el.id === nextId)?.count || 0;
    if (totalAwarded < nextUniqueAchievement.limit) {
      break;
    }
    nextId = nextUniqueAchievement.nextId;
    nextUniqueAchievement = uniqueAchievementsArr.find(el => el.id === nextId);
    if (!nextUniqueAchievement) break;
  }

  // there is no availiable unique achievements
  if (!nextUniqueAchievement) return null;

  // return next unique achievement
  const { id, minRating } = nextUniqueAchievement;
  const pointsToNext = nextUniqueAchievement.minRating - userRating;
  return {
    id,
    userRating,
    minRating,
    pointsToNext,
  };
};

export function* getUserAchievementsWorker() {
  try {
    const viewProfileAccount = yield select(selectViewProfileAccount());

    if (viewProfileAccount) {
      yield put(setUserAchievementLoading(true));

      const eosService = yield select(selectEos);
      const userRating = yield select(selectUserRatingDCP(viewProfileAccount));

      const userAchievements = yield call(
        getAchievements,
        eosService,
        'accachieve',
        viewProfileAccount,
      );

      const projectAchievements = yield call(
        getAchievements,
        eosService,
        'achieve',
        'allachieve',
      );

      const nextAchievement = getNextAchievement(userRating);
      const nextUniqueAchievement = getNextUniqueAchievement(
        userRating,
        projectAchievements,
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
  }
}

export default function*() {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
}
