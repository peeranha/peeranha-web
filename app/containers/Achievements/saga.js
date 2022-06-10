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
  GET_ALL_ACHIEVEMENTS,
} from './constants';

import {
  getUserAchievements,
  getUserAchievementsSuccess,
  setMemorizedAchievementData,
  getUserAchievementsErr,
  setUserAchievementLoading,
  setMaxGroupsLowerValues,
  getAllAchievementsSuccess,
  getAllAchievementsError,
} from './actions';

import {
  selectViewProfileAccount,
  selectMemorizedUserAchievements,
  selectMaxGroupsLowerValues,
} from './selectors';
import { getAllAchievements } from '../../utils/theGraph';
import { selectEthereum } from '../EthereumProvider/selectors';

export function* getAchievementsWorker() {
  try {
    const viewProfileAccount = yield select(selectViewProfileAccount());
    let { allAchievements, userAchievements } = yield call(
      getAllAchievements,
      viewProfileAccount,
    );
    userAchievements = userAchievements.map(achievement => achievement.id);
    yield put(
      getAllAchievementsSuccess(
        ['dev', 'test'].includes(process.env.ENV)
          ? allAchievements.slice(28)
          : allAchievements,
        userAchievements,
      ),
    );
  } catch (err) {
    yield put(getAllAchievementsError(err));
  }
}

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

  const nextUnreachedAchievement = sortedAchievements.find(el => {
    const totalAwarded =
      projectAchievements.find(item => item.id === el.id)?.count || 0;
    return (
      userRating < el.lowerValue &&
      !reachedAchievementsIds.includes(el.id) &&
      totalAwarded < el.limit
    );
  });

  if (nextUnreachedAchievement) return nextUnreachedAchievement.id;

  // there are no suitable achievemnts in the group
  return null;
};

export const getMaxGroupsLowerValues = () => {
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

  return {
    maxRatingLowerValue,
    maxQuestionLowerValue,
    maxAnswersLowerValue,
    maxBestAnswersLowerValue,
    maxFirstAnswerLowerValue,
    maxFirstIn15LowerValue,
  };
};

export const isProfileInfoUpdated = (
  currProfileInfo,
  prevProfileInfo,
  maxGroupsLowerValues,
) => {
  // profile info has initial values or undefined

  if (!currProfileInfo || !prevProfileInfo) return true;

  // check whether values, that influence on render, have changed

  const {
    maxRatingLowerValue,
    maxQuestionLowerValue,
    maxAnswersLowerValue,
    maxBestAnswersLowerValue,
    maxFirstAnswerLowerValue,
    maxFirstIn15LowerValue,
  } = maxGroupsLowerValues;

  const firstAnswerValue = profileInfo =>
    profileInfo.integer_properties?.find(el => el.key === 13)?.value ?? 0;

  const answersIn15Value = profileInfo =>
    profileInfo.integer_properties?.find(el => el.key === 12)?.value ?? 0;

  const ratingRelatedUpdated =
    currProfileInfo.rating !== prevProfileInfo.rating &&
    (!prevProfileInfo.rating || prevProfileInfo.rating < maxRatingLowerValue);

  const questionRelatedUpdated =
    currProfileInfo.postCount !== prevProfileInfo.postCount &&
    (!prevProfileInfo.postCount ||
      prevProfileInfo.postCount < maxQuestionLowerValue);

  const answersRelatedUpdated =
    currProfileInfo.answersGiven !== prevProfileInfo.answersGiven &&
    (!prevProfileInfo.answersGiven ||
      prevProfileInfo.answersGiven < maxAnswersLowerValue);

  const bestAnswersRelatedUpdated =
    currProfileInfo.correct_answers !== prevProfileInfo.correct_answers &&
    (!prevProfileInfo.correct_answers ||
      prevProfileInfo.correct_answers < maxBestAnswersLowerValue);

  const firstAnswersRelatedUpdated =
    firstAnswerValue(currProfileInfo) !== firstAnswerValue(prevProfileInfo) &&
    firstAnswerValue(prevProfileInfo) < maxFirstAnswerLowerValue;

  const answersIn15RelatedUpdated =
    answersIn15Value(currProfileInfo) !== answersIn15Value(prevProfileInfo) &&
    answersIn15Value(prevProfileInfo) < maxFirstIn15LowerValue;

  if (
    ratingRelatedUpdated ||
    questionRelatedUpdated ||
    answersRelatedUpdated ||
    bestAnswersRelatedUpdated ||
    firstAnswersRelatedUpdated ||
    answersIn15RelatedUpdated
  )
    return true;

  // no changes that influence on render

  return false;
};

export function* getUserAchievementsWorker() {
  try {
    const viewProfileAccount = yield select(selectViewProfileAccount());
    const profileInfo = yield select(selectUsers(viewProfileAccount));

    // get maximum achievements lowerValues of groups and set them to store

    let maxGroupsLowerValues = yield select(selectMaxGroupsLowerValues());

    if (Object.keys(maxGroupsLowerValues).length === 0) {
      maxGroupsLowerValues = yield call(getMaxGroupsLowerValues);

      yield put(setMaxGroupsLowerValues(maxGroupsLowerValues));
    }

    const memorizedUserAchievements = yield select(
      selectMemorizedUserAchievements(viewProfileAccount),
    );

    const profileInfoUpdated = yield call(
      isProfileInfoUpdated,
      profileInfo,
      memorizedUserAchievements.profileInfo,
      maxGroupsLowerValues,
    );

    if (memorizedUserAchievements && !profileInfoUpdated) {
      // set memorized achievements

      const {
        userAchievements,
        projectAchievements,
        nextUserAchievements,
        userProgressValues,
      } = memorizedUserAchievements;

      yield put(
        getUserAchievementsSuccess({
          userAchievements,
          projectAchievements,
          nextUserAchievements,
          userProgressValues,
        }),
      );
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

      const nextUniqueRatingAch = yield call(
        getNextUniqueAchievementId,
        userRating,
        userAchievements,
        projectAchievements,
      );

      const nextRatingAchId = yield call(
        getNextAchievementId,
        userRating,
        userAchievements,
        achievementsArr,
      );
      const nextQuestionAskedAchId = yield call(
        getNextAchievementId,
        questionsAskedValue,
        userAchievements,
        questionsAskedArr,
      );
      const nextAnswerGivenAchId = yield call(
        getNextAchievementId,
        answersGivenValue,
        userAchievements,
        answerGivenArr,
      );
      const nextAnswerBestAchId = yield call(
        getNextAchievementId,
        bestAnswersValue,
        userAchievements,
        bestAnswerArr,
      );
      const nextAnswerFirstAchId = yield call(
        getNextAchievementId,
        firstAnwersValue,
        userAchievements,
        firstAnswerArr,
      );
      const nextAnswerFirstIn15AchId = yield call(
        getNextAchievementId,
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
        getUserAchievementsSuccess({
          userAchievements,
          projectAchievements,
          nextUserAchievements,
          userProgressValues,
        }),
      );

      yield put(
        setMemorizedAchievementData(viewProfileAccount, memorizedAchievData),
      );
    }
  } catch (err) {
    yield put(getUserAchievementsErr(err));
    yield put(setUserAchievementLoading(false));
  }
}

export function* updateUserAchievementsWorker(
  userAccount,
  { updatedAchievements, updateRender = true } = {},
) {
  try {
    const eosService = yield select(selectEos);

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

      const viewProfileAccount = yield select(selectViewProfileAccount());

      // updated user achievements are currently displayed
      if (viewProfileAccount === userAccount && updateRender)
        yield put(getUserAchievements());
    }
  } catch (err) {
    yield put(getUserAchievementsErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
  yield takeLatest(GET_ALL_ACHIEVEMENTS, getAchievementsWorker);
}
