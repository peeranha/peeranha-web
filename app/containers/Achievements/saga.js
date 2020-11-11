import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import {
  selectUsers,
  selectUserAchievementsDCP,
  selectUserRatingDCP,
  selectQuestionsAskedValue,
  selectAnswersGivenValue,
  selectBestAnswersValue,
  selectFirstAnswersValue,
  selectFirstIn15AnswersValue,
} from 'containers/DataCacheProvider/selectors';

import { updateCachedUserAchievements } from 'containers/DataCacheProvider/actions';

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
  getUserAchievements,
  getUserAchievementsSuccess,
  setNextUserAchievements,
  setUserProgressValues,
  setMemorizedAchievementData,
  getUserAchievementsErr,
  setUserAchievementLoading,
} from './actions';

import {
  selectViewProfileAccount,
  selectMemorizedUserAchievements,
} from './selectors';

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
  // and next group achievement is not reached
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

  const currAchIndex = sortedAchievements.findIndex(
    el => userRating >= el.lowerValue && userRating <= el.upperValue,
  );

  // curret unique achievement is the last in the group

  if (currAchIndex === sortedAchievements.length - 1) return null;

  // current user value within lower and upper values of unique achievement
  // and next unique achievement is not reached and is not out of limit

  const isNextByOrder = () => {
    const nextAchievement = sortedAchievements[currAchIndex + 1];
    const nextTotalAwarded =
      projectAchievements.find(item => item.id === nextAchievement?.id)
        ?.count || 0;

    if (
      !reachedAchievementsIds.includes(nextAchievement.id) &&
      nextTotalAwarded < nextAchievement.limit
    )
      return true;

    return false;
  };

  if (isNextByOrder()) return sortedAchievements[currAchIndex + 1].id;

  // current user value less than lower achievement value
  const nextUnreachedAchievement = sortedAchievements
    .filter(
      (el, index) =>
        !reachedAchievementsIds.includes(el.id) && index !== currAchIndex + 1,
    )
    .find(el => {
      const totalAwarded =
        projectAchievements.find(item => item.id === el.id)?.count || 0;

      return !reachedAchievementsIds.includes(el.id) && totalAwarded < el.limit;
    });

  if (nextUnreachedAchievement) return nextUnreachedAchievement.id;

  // there are no suitable achievemnts in the group
  return null;
};

const isProfileInfoUpdated = (currProfileInfo, prevProfileInfo) => {
  // profile info has initial values or undefined

  if (!currProfileInfo || !prevProfileInfo) return true;

  // check whether values, that influence on render have changed

  const maxRatingLowerValue = achievementsArr.find(
    el => el.upperValue === Infinity,
  ).lowerValue;

  const maxQuestionLowerValue = questionsAskedArr.find(
    el => el.upperValue === Infinity,
  ).lowerValue;

  const maxAnswersLowerValue = answerGivenArr.find(
    el => el.upperValue === Infinity,
  ).lowerValue;

  const maxBestAnswersLowerValue = bestAnswerArr.find(
    el => el.upperValue === Infinity,
  ).lowerValue;

  const maxFirstAnswerLowerValue = firstAnswerArr.find(
    el => el.upperValue === Infinity,
  ).lowerValue;

  const maxFirstIn15LowerValue = firstIn15Arr.find(
    el => el.upperValue === Infinity,
  ).lowerValue;

  const firstAnswerValue = profileInfo =>
    profileInfo.integer_properties.find(el => el.key === 13)?.value ?? 0;

  const answersIn15Value = profileInfo =>
    profileInfo.integer_properties.find(el => el.key === 12)?.value ?? 0;

  const ratingRelatedUpdate =
    currProfileInfo.rating !== prevProfileInfo.rating &&
    currProfileInfo.rating < maxRatingLowerValue;

  const questionRelatedUpdate =
    currProfileInfo.questions_asked !== prevProfileInfo.questions_asked &&
    currProfileInfo.questions_asked < maxQuestionLowerValue;

  const answersRelatedUpdate =
    currProfileInfo.answers_given !== prevProfileInfo.answers_given &&
    currProfileInfo.answers_given < maxAnswersLowerValue;

  const bestAnswersRelatedUpdate =
    currProfileInfo.correct_answers !== prevProfileInfo.correct_answers &&
    currProfileInfo.correct_answers < maxBestAnswersLowerValue;

  const firstAnswersRelatedUpdate =
    firstAnswerValue(currProfileInfo) !== firstAnswerValue(prevProfileInfo) &&
    firstAnswersValue(currProfileInfo) < maxFirstAnswerLowerValue;

  const answersIn15RelatedUpdate =
    answersIn15Value(currProfileInfo) !== answersIn15Value(prevProfileInfo) &&
    answersIn15Value(currProfileInfo) < maxFirstIn15LowerValue;

  if (
    ratingRelatedUpdate ||
    questionRelatedUpdate ||
    answersRelatedUpdate ||
    bestAnswersRelatedUpdate ||
    firstAnswersRelatedUpdate ||
    answersIn15RelatedUpdate
  )
    return true;

  // no changes that influence on render

  return false;
};

export function* getUserAchievementsWorker() {
  try {
    const viewProfileAccount = yield select(selectViewProfileAccount());
    const profileInfo = yield select(selectUsers(viewProfileAccount));

    const memorizedUserAchievements = yield select(
      selectMemorizedUserAchievements(viewProfileAccount),
    );

    if (
      memorizedUserAchievements &&
      !isProfileInfoUpdated(profileInfo, memorizedUserAchievements.profileInfo)
    ) {
      // set memorized achievements

      const {
        userAchievements,
        projectAchievements,
        nextUserAchievements,
        userProgressValues,
      } = memorizedUserAchievements;

      yield put(
        getUserAchievementsSuccess(userAchievements, projectAchievements),
      );
      yield put(setNextUserAchievements(nextUserAchievements));
      yield put(setUserProgressValues(userProgressValues));

      yield put(setUserAchievementLoading(false));
    }

    // get new achievements data
    else {
      const eosService = yield select(selectEos);
      const cachedUserAchievements = yield select(
        selectUserAchievementsDCP(viewProfileAccount),
      );

      let userAchievements;

      if (cachedUserAchievements) {
        userAchievements = cachedUserAchievements;
      } else {
        userAchievements = yield call(
          getAchievements,
          eosService,
          USER_ACHIEVEMENTS_TABLE,
          viewProfileAccount,
        );

        // update cached user achievements, if they are differ from userAchievements

        yield call(updateUserAchievementsWorker, viewProfileAccount, {
          updatedAchievements: userAchievements,
          updateRender: false,
        });
      }

      const projectAchievements = yield call(
        getAchievements,
        eosService,
        PROJECT_ACHIEVEMENTS_TABLE,
        ALL_ACHIEVEMENTS_SCOPE,
      );

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

      const nextUserAchievements = {
        [ratingRelated]: nextRatingAchId,
        [uniqueRatingRelated]: nextUniqueRatingAch,
        [questionAskedRelated]: nextQuestionAskedAchId,
        [answerGivenRelated]: nextAnswerGivenAchId,
        [bestAnswerRelated]: nextAnswerBestAchId,
        [firstAnswerRelated]: nextAnswerFirstAchId,
        [firstAnswerIn15Related]: nextAnswerFirstIn15AchId,
      };

      const userProgressValues = {
        [ratingRelated]: userRating,
        [questionAskedRelated]: questionsAskedValue,
        [answerGivenRelated]: answersGivenValue,
        [bestAnswerRelated]: bestAnswersValue,
        [firstAnswerIn15Related]: firstIn15AnwersValue,
        [firstAnswerRelated]: firstAnwersValue,
      };

      const memorizedAchievData = {
        nextUserAchievements,
        userProgressValues,
        userAchievements,
        projectAchievements,
        profileInfo,
      };

      yield put(
        getUserAchievementsSuccess(userAchievements, projectAchievements),
      );
      yield put(setNextUserAchievements(nextUserAchievements));
      yield put(setUserProgressValues(userProgressValues));

      yield put(
        setMemorizedAchievementData(viewProfileAccount, memorizedAchievData),
      );

      yield put(setUserAchievementLoading(false));
    }
  } catch (err) {
    yield put(getUserAchievementsErr(err));
    yield put(setUserAchievementLoading(false));
  }
}

export function* updateUserAchievementsWorker(
  userAccount,
  { updatedAchievements, updateRender = true },
) {
  try {
    const eosService = yield select(selectEos);

    const viewProfileAccount = yield select(selectViewProfileAccount());

    // logged user achievements count changed

    let userAchievements;

    if (updatedAchievements) {
      userAchievements = updatedAchievements;
    } else {
      userAchievements = yield call(
        getAchievements,
        eosService,
        USER_ACHIEVEMENTS_TABLE,
        userAccount,
      );
    }

    const cachedUserAchievements = yield select(
      selectUserAchievementsDCP(userAccount),
    );

    if (cachedUserAchievements?.length !== userAchievements.length) {
      yield put(updateCachedUserAchievements(userAccount, userAchievements));

      if (viewProfileAccount === userAccount && updateRender)
        yield put(getUserAchievements());
    }
  } catch (err) {
    yield put(getUserAchievementsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
}
