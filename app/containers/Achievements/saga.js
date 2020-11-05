import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  selectUsers,
  selectUserRatingDCP,
  selectQuestionsAskedValue,
  selectAnswersGivenValue,
  selectBestAnswersValue,
  selectFirstAnswersValue,
  selectFirstIn15AnswersValue,
} from 'containers/DataCacheProvider/selectors';

import { updateUserAchievCount } from 'containers/DataCacheProvider/actions';

import { getAchievements } from 'utils/achievementsManagement';
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

export const getNextAchievementId = (
  currentValue,
  userAchievements,
  possibleAchievements,
) => {
  const reachedAchievementsIds = userAchievements.map(el => el.achievements_id);

  // sort achievements by lower value
  const sortedAchievements = [...possibleAchievements].sort(
    (next, curr) => next.lowerValue - curr.lowerValue,
  );

  const valuesStartFrom = sortedAchievements[0].lowerValue;
  const firstGroupId = sortedAchievements[0].id;

  // current user value less than minimal achievement group lower value
  if (
    currentValue < valuesStartFrom &&
    !reachedAchievementsIds.includes(firstGroupId)
  )
    return sortedAchievements[0].id;

  // current user value within lower and upper values of some group achievement
  const currAchIndex = sortedAchievements.findIndex(
    (el, i) =>
      currentValue >= el.lowerValue &&
      currentValue <= el.upperValue &&
      i < sortedAchievements.length - 1 &&
      !reachedAchievementsIds.includes(sortedAchievements[i + 1].id),
  );

  if (currAchIndex >= 0) return sortedAchievements[currAchIndex + 1].id;

  // current user value less than lower achievement value
  const nextUnreachedAchievement = sortedAchievements.find(
    el =>
      currentValue < el.lowerValue && !reachedAchievementsIds.includes(el.id),
  );

  if (nextUnreachedAchievement) return nextUnreachedAchievement.id;

  // there are no suitable achievemnts in the group
  return null;
};

export const getNextUniqueAchievementId = (
  userRating,
  userAchievements,
  projectAchievements = [],
) => {
  const reachedAchievementsIds = userAchievements.map(el => el.achievements_id);

  // sort achievements by lower value
  const sortedAchievements = [...uniqueAchievementsArr].sort(
    (next, curr) => next.lowerValue - curr.lowerValue,
  );

  // current user value within lower and upper values of some group achievement

  const currAchIndex = sortedAchievements.findIndex((el, i) => {
    const nextAchievement = sortedAchievements[i + 1];
    const nextTotalAwarded =
      projectAchievements.find(item => item.id === nextAchievement?.id)
        ?.count || 0;

    return (
      userRating >= el.lowerValue &&
      userRating <= el.upperValue &&
      i < sortedAchievements.length - 1 &&
      !reachedAchievementsIds.includes(nextAchievement.id) &&
      nextTotalAwarded < nextAchievement.limit
    );
  });

  if (currAchIndex >= 0) return sortedAchievements[currAchIndex + 1].id;

  // current user value less than lower achievement value
  const nextUnreachedAchievement = sortedAchievements.find((el, i) => {
    const nextAchievement = sortedAchievements[i + 1];
    const nextTotalAwarded =
      projectAchievements.find(item => item.id === nextAchievement?.id)
        ?.count || 0;

    return (
      userRating < el.lowerValue &&
      !reachedAchievementsIds.includes(el.id) &&
      nextTotalAwarded < nextAchievement.limit
    );
  });

  if (nextUnreachedAchievement) return nextUnreachedAchievement.id;

  // there are no suitable achievemnts in the group
  return null;
};

export function* getUserAchievementsWorker() {
  try {
    const viewProfileAccount = yield select(selectViewProfileAccount());

    if (typeof viewProfileAccount === 'string') {
      const eosService = yield select(selectEos);

      const userRating = yield select(selectUserRatingDCP(viewProfileAccount));
      const questionsAskedValue = yield select(
        selectQuestionsAskedValue(viewProfileAccount),
      );
      const answersGivenValue = yield select(
        selectAnswersGivenValue(viewProfileAccount),
      );
      const bestAnswersValue = yield select(
        selectBestAnswersValue(viewProfileAccount),
      );
      const firstAnwersValue = yield select(
        selectFirstAnswersValue(viewProfileAccount),
      );
      const firstIn15AnwersValue = yield select(
        selectFirstIn15AnswersValue(viewProfileAccount),
      );

      const userAchievements = yield call(
        getAchievements,
        eosService,
        USER_ACHIEVEMENTS_TABLE,
        viewProfileAccount,
      );

      const nextUniqueRatingAch = getNextUniqueAchievementId(
        userRating,
        userAchievements,
        projectAchievements,
      );
      const nextRatingAchId = getNextAchievementId(
        userRating,
        userAchievements,
        achievementsArr,
      );
      const nextQuestionAskedAchId = getNextAchievementId(
        questionsAskedValue,
        userAchievements,
        questionsAskedArr,
      );
      const nextAnswerGivenAchId = getNextAchievementId(
        answersGivenValue,
        userAchievements,
        answerGivenArr,
      );
      const nextAnswerBestAchId = getNextAchievementId(
        bestAnswersValue,
        userAchievements,
        bestAnswerArr,
      );
      const nextAnswerFirstAchId = getNextAchievementId(
        firstAnwersValue,
        userAchievements,
        firstAnswerArr,
      );
      const nextAnswerFirstIn15AchId = getNextAchievementId(
        firstIn15AnwersValue,
        userAchievements,
        firstIn15Arr,
      );

      const projectAchievements = yield call(
        getAchievements,
        eosService,
        PROJECT_ACHIEVEMENTS_TABLE,
        ALL_ACHIEVEMENTS_SCOPE,
      );

      // update cached user achievements_count if achievements count changed
      yield call(
        updateUserAchCountWorker,
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
          [bestAnswerRelated]: bestAnswersValue,
          [firstAnswerIn15Related]: firstIn15AnwersValue,
          [firstAnswerRelated]: firstAnwersValue,
        }),
      );

      yield put(setUserAchievementLoading(false));
    } else
      throw new Error(
        `viewProfileAccount must be a string value, but got ${viewProfileAccount}`,
      );
  } catch (err) {
    yield put(getUserAchievementsErr(err));
    yield put(setUserAchievementLoading(false));
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
  if (
    cachedUserProfile &&
    cachedUserProfile.achievements_reached !== achievementsCount
  ) {
    yield put(updateUserAchievCount(account, achievementsCount));
  }
}

export default function*() {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
}
