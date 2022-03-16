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

const selectMaxGroupsLowerValues = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().maxGroupsLowerValues,
  );

const selectMemorizedUserAchievements = userAccount =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().memorizedAchievData[userAccount] ?? {},
  );

const selectAllAchievements = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().allAchievements,
  );

const selectUserAchievements = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().userAchievements,
  );

const selectAchievementsLoading = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().userAchievementsLoading,
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

const selectRatingAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return [
      ...getReachedAchievements(achievementsArr, reachedAchievementsIds),
      ...getUnreachedAchievements(
        substate,
        achievementsArr,
        ratingRelated,
        reachedAchievementsIds,
      ),
    ];
  });

const selectQuestionAskedAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return [
      ...getReachedAchievements(questionsAskedArr, reachedAchievementsIds),
      ...getUnreachedAchievements(
        substate,
        questionsAskedArr,
        questionAskedRelated,
        reachedAchievementsIds,
      ),
    ];
  });

const selectAnwerGivenAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return [
      ...getReachedAchievements(answerGivenArr, reachedAchievementsIds),
      ...getUnreachedAchievements(
        substate,
        answerGivenArr,
        answerGivenRelated,
        reachedAchievementsIds,
      ),
    ];
  });

const selectBestAnswerAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return [
      ...getReachedAchievements(bestAnswerArr, reachedAchievementsIds),
      ...getUnreachedAchievements(
        substate,
        bestAnswerArr,
        bestAnswerRelated,
        reachedAchievementsIds,
      ),
    ];
  });

const selectFirstAnswerAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return [
      ...getReachedAchievements(firstAnswerArr, reachedAchievementsIds),
      ...getUnreachedAchievements(
        substate,
        firstAnswerArr,
        firstAnswerRelated,
        reachedAchievementsIds,
      ),
    ];
  });

const selectFirstIn15Achievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return [
      ...getReachedAchievements(firstIn15Arr, reachedAchievementsIds),
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
      .filter(el => {
        return (
          !reachedAchievementsIds.includes(el.id) &&
          totalAwarded(el.id) < el.limit
        );
      })
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

const selectUniqueAchievements = () =>
  createSelector(
    selectUniqueReachedAchievements(),
    selectUniqueUnreachedAchievements(),
    (uniqueReachedAchievements, uniqueUnreachedAchievements) => {
      return [...uniqueReachedAchievements, ...uniqueUnreachedAchievements];
    },
  );

export {
  selectUserAchievementsDomain,
  selectViewProfileAccount,
  selectRatingAchievements,
  selectQuestionAskedAchievements,
  selectAnwerGivenAchievements,
  selectBestAnswerAchievements,
  selectFirstAnswerAchievements,
  selectFirstIn15Achievements,
  selectUniqueAchievements,
  selectUniqueReachedAchievements,
  selectUniqueUnreachedAchievements,
  selectUserAchievements,
  selectAchievementsLoading,
  getReachedAchievementsIds,
  getReachedAchievements,
  getUnreachedAchievements,
  selectMemorizedUserAchievements,
  selectMaxGroupsLowerValues,
  selectAllAchievements,
};
