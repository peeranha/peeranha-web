import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  selectUsers,
  selectUserRatingDCP,
  selectQuestionsAskedValue,
  selectAnswersGivenValue,
  selectAnswersBestValue,
  selectFirstAnswersValue,
  selectFirstIn15AnswersValue,
} from 'containers/DataCacheProvider/selectors';

import { updateUserAchievCount } from 'containers/DataCacheProvider/actions';

import {
  USER_ACHIEVEMENTS_TABLE,
  PROJECT_ACHIEVEMENTS_TABLE,
  ALL_ACHIEVEMENTS_SCOPE,
} from 'utils/constants';

import {
  GET_USER_ACHIEVEMENTS,
  uniqueAchievementsArr,
  achievementsArr,
  questionsAskedArr,
  answerGivenArr,
  bestAnswerArr,
  firstAnswerArr,
  firstIn15Arr,
  ratingRelated,
  uniqueRatingRelated,
  questionAskedRelated,
  answerGivenRelated,
  bestAnswerRelated,
  firstAnswerIn15Related,
  firstAnswerRelated,
} from './constants';

import {
  getUserAchievementsSuccess,
  setNextUserAchievements,
  setUserProgressValues,
  getUserAchievementsErr,
  setUserAchievementLoading,
} from './actions';

import { selectViewProfileAccount } from './selectors';

async function getAchievements(eosService, tableTitle, scope) {
  const { rows } = await eosService.getTableRows(tableTitle, scope);
  return rows;
}

export const getNextAchievementId = (currentValue, possibleAchievements) => {
  // find the minimum lower value of the achievement group
  let valuesStartFrom = possibleAchievements[0].lowerValue;
  let firstGroupAchievementPosition = 0;
  possibleAchievements.forEach((el, index) => {
    if (el.lowerValue < valuesStartFrom) {
      valuesStartFrom = el.lowerValue;
      firstGroupAchievementPosition = index;
    }
  });

  if (currentValue < valuesStartFrom)
    return possibleAchievements[firstGroupAchievementPosition].id;

  const currentAchievement = possibleAchievements.find(
    el => currentValue >= el.lowerValue && currentValue <= el.upperValue,
  );

  return currentAchievement.nextId;
};

export const getNextUniqueAchievementId = (
  userRating,
  projectAchievements = [],
) => {
  const currentUniqueAchievement =
    uniqueAchievementsArr.find(
      el => userRating >= el.lowerValue && userRating <= el.upperValue,
    ) || {};

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

  // return next unique achievement id
  return nextUniqueAchievement.id;
};

export function* getUserAchievementsWorker() {
  try {
    const viewProfileAccount = yield select(selectViewProfileAccount());

    if (typeof viewProfileAccount === 'string') {
      yield put(setUserAchievementLoading(true));

      const eosService = yield select(selectEos);

      const userRating = yield select(selectUserRatingDCP(viewProfileAccount));
      const questionsAskedValue = yield select(
        selectQuestionsAskedValue(viewProfileAccount),
      );
      const answersGivenValue = yield select(
        selectAnswersGivenValue(viewProfileAccount),
      );
      const answersBestValue = yield select(
        selectAnswersBestValue(viewProfileAccount),
      );
      const firstAnwersValue = yield select(
        selectFirstAnswersValue(viewProfileAccount),
      );
      const firstIn15AnwersValue = yield select(
        selectFirstIn15AnswersValue(viewProfileAccount),
      );

      const nextUniqueRatingAch = getNextUniqueAchievementId(
        userRating,
        projectAchievements,
      );
      const nextRatingAchId = getNextAchievementId(userRating, achievementsArr);
      const nextQuestionAskedAchId = getNextAchievementId(
        questionsAskedValue,
        questionsAskedArr,
      );
      const nextAnswerGivenAchId = getNextAchievementId(
        answersGivenValue,
        answerGivenArr,
      );
      const nextAnswerBestAchId = getNextAchievementId(
        answersBestValue,
        bestAnswerArr,
      );
      const nextAnswerFirstAchId = getNextAchievementId(
        firstAnwersValue,
        firstAnswerArr,
      );
      const nextAnswerFirstIn15AchId = getNextAchievementId(
        firstIn15AnwersValue,
        firstIn15Arr,
      );

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

      // update cached user achievements_count if achievements count changed
      yield updateUserAchCountWorker(
        viewProfileAccount,
        userAchievements.length,
      );

      yield put(
        getUserAchievementsSuccess(userAchievements, projectAchievements),
      );

      yield put(
        setNextUserAchievements({
          [ratingRelated]: nextRatingAchId,
          [uniqueRatingRelated]: nextUniqueRatingAch,
          [questionAskedRelated]: nextQuestionAskedAchId,
          [answerGivenRelated]: nextAnswerGivenAchId,
          [bestAnswerRelated]: nextAnswerBestAchId,
          [firstAnswerRelated]: nextAnswerFirstAchId,
          [firstAnswerIn15Related]: nextAnswerFirstIn15AchId,
        }),
      );

      yield put(
        setUserProgressValues({
          [ratingRelated]: userRating,
          [questionAskedRelated]: questionsAskedValue,
          [answerGivenRelated]: answersGivenValue,
          [bestAnswerRelated]: answersBestValue,
          [firstAnswerIn15Related]: firstAnwersValue,
          [firstAnswerRelated]: firstIn15AnwersValue,
        }),
      );

      yield put(setUserAchievementLoading(false));
    } else
      throw new Error(
        `viewProfileAccount must be a string value, but got ${viewProfileAccount}`,
      );
  } catch (err) {
    yield put(getUserAchievementsErr(err));
  }
}

export function* updateUserAchCountWorker(account, userAchievementsCount) {
  const cachedUserProfile = yield select(selectUsers(account));
  let achievementsCount;

  if (userAchievementsCount) {
    achievementsCount = userAchievementsCount;
  } else {
    const eosService = yield select(selectEos);
    const userAchievements = yield call(
      getAchievements,
      eosService,
      USER_ACHIEVEMENTS_TABLE,
      account,
    );
    achievementsCount = userAchievements.length;
  }
  if (cachedUserProfile.achievements_reached !== achievementsCount) {
    yield put(updateUserAchievCount(account, achievementsCount));
  }
}

export default function*() {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
}
