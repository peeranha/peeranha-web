/**
 * Selectors to the Achievements state domain
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {
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

const selectUserAchievementsDomain = state =>
  state.get('userAchievements', initialState);

const selectViewProfileAccount = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().viewProfileAccount,
  );

const selectUserAchievements = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().achievements,
  );

const getReachedAchievementsIds = substate =>
  substate.toJS().achievements.length
    ? substate
        .toJS()
        .achievements.filter(
          el => el.user === substate.toJS().viewProfileAccount,
        )
        .map(el => el.achievements_id)
    : [];

const getReachedAchievements = (possibleAchievements, reachedAchievementsIds) =>
  possibleAchievements
    .filter(el => reachedAchievementsIds.includes(el.id))
    .map(el => ({
      ...el,
      reached: true,
    }));

const selectReachedAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return [
      ...getReachedAchievements(achievementsArr, reachedAchievementsIds),
      ...getReachedAchievements(questionsAskedArr, reachedAchievementsIds),
      ...getReachedAchievements(answerGivenArr, reachedAchievementsIds),
      ...getReachedAchievements(bestAnswerArr, reachedAchievementsIds),
      ...getReachedAchievements(firstAnswerArr, reachedAchievementsIds),
      ...getReachedAchievements(firstIn15Arr, reachedAchievementsIds),
    ];
  });

const getUnreachedAchievements = (
  substate,
  possibleAchievements,
  achievementsGroupType,
  reachedAchievementsIds,
) =>
  possibleAchievements.filter(el => !reachedAchievementsIds.includes(el.id))
    .length
    ? possibleAchievements
        .filter(el => !reachedAchievementsIds.includes(el.id))
        .map(el => {
          const isNext =
            substate.toJS().nextUserAchievements[achievementsGroupType] ===
            el.id;

          const currentValue = substate.toJS().userProgressValues[
            achievementsGroupType
          ];

          const pointsToNext = isNext ? el.lowerValue - currentValue : null;

          return {
            ...el,
            reached: false,
            isNext,
            pointsToNext,
            currentValue,
            groupType: achievementsGroupType,
          };
        })
    : [];

const selectUnreachedAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return [
      ...getUnreachedAchievements(
        substate,
        achievementsArr,
        ratingRelated,
        reachedAchievementsIds,
      ),
      ...getUnreachedAchievements(
        substate,
        questionsAskedArr,
        questionAskedRelated,
        reachedAchievementsIds,
      ),
      ...getUnreachedAchievements(
        substate,
        answerGivenArr,
        answerGivenRelated,
        reachedAchievementsIds,
      ),
      ...getUnreachedAchievements(
        substate,
        bestAnswerArr,
        bestAnswerRelated,
        reachedAchievementsIds,
      ),
      ...getUnreachedAchievements(
        substate,
        firstAnswerArr,
        firstAnswerRelated,
        reachedAchievementsIds,
      ),
      ...getUnreachedAchievements(
        substate,
        firstIn15Arr,
        firstAnswerIn15Related,
        reachedAchievementsIds,
      ),
    ];
  });

const selectUniqueReachedAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return uniqueAchievementsArr
      .filter(el => reachedAchievementsIds.includes(el.id))
      .map(el => ({
        ...el,
        reached: true,
      }));
  });

const selectUniqueUnreachedAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);
    const totalAwarded = achievementId =>
      substate
        .toJS()
        .projectAchievements?.find(item => item.id === achievementId)?.count ??
      0;

    return uniqueAchievementsArr
      .filter(
        el =>
          !reachedAchievementsIds.includes(el.id) &&
          totalAwarded(el.id) < el.limit,
      )
      .map(el => {
        const isNext =
          substate.toJS().nextUserAchievements[uniqueRatingRelated] === el.id;

        const currentValue = substate.toJS().userProgressValues[ratingRelated];

        const pointsToNext = isNext ? el.lowerValue - currentValue : null;

        return {
          ...el,
          reached: false,
          totalAwarded: totalAwarded(el.id),
          isNext,
          pointsToNext,
          currentValue,
        };
      });
  });

const selectAchievementsLoading = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().userAchievementsLoading,
  );

export {
  selectUserAchievementsDomain,
  selectViewProfileAccount,
  selectReachedAchievements,
  selectUnreachedAchievements,
  selectUniqueReachedAchievements,
  selectUniqueUnreachedAchievements,
  selectUserAchievements,
  selectAchievementsLoading,
  getReachedAchievementsIds,
  getReachedAchievements,
  getUnreachedAchievements,
};
