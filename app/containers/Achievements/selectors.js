/**
 * Selectors to the Achievements state domain
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {
  achievementsArr,
  levelAchievementsArr,
  uniqueAchievementsArr,
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
  substate
    .toJS()
    .achievements.filter(
      el => el.value > 0 && el.user === substate.toJS().viewProfileAccount,
    )
    .map(el => el.achievements_id);

const selectReachedAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return achievementsArr
      .filter(el => reachedAchievementsIds.includes(el.id))
      .map(el => ({
        ...el,
        reached: true,
        value: substate
          .toJS()
          .achievements.find(item => item.achievements_id === el.id)?.value,
      }));
  });

const selectUnreachedAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);
    return achievementsArr
      .filter(el => !reachedAchievementsIds.includes(el.id))
      .map(el => ({
        ...el,
        reached: false,
        next:
          substate.toJS().nextAchievement?.id === el.id
            ? substate.toJS().nextAchievement
            : null,
      }));
  });

const selectReachedLevelAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return levelAchievementsArr
      .filter(el => {
        const itemValue = substate
          .toJS()
          .achievements.find(item => item.achievements_id === el.id)?.value;
        return (
          reachedAchievementsIds.includes(el.id) &&
          itemValue >= el.levels.bronze
        );
      })
      .map(el => ({
        ...el,
        reached: true,
        value: substate
          .toJS()
          .achievements.find(item => item.achievements_id === el.id)?.value,
      }));
  });

const selectUnreachedLevelAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return levelAchievementsArr
      .filter(el => {
        const itemValue = substate
          .toJS()
          .achievements.find(item => item.achievements_id === el.id)?.value;
        return (
          !reachedAchievementsIds.includes(el.id) ||
          itemValue < el.levels.bronze
        );
      })
      .map(el => ({
        ...el,
        reached: false,
        value:
          substate
            .toJS()
            .achievements.find(item => item.achievements_id === el.id)?.value ??
          0,
      }));
  });

const selectUniqueReachedAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return uniqueAchievementsArr
      .filter(el => reachedAchievementsIds.includes(el.id))
      .map(el => ({
        ...el,
        reached: true,
        value: substate
          .toJS()
          .achievements.find(item => item.achievements_id === el.id)?.value,
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
      .map(el => ({
        ...el,
        reached: false,
        totalAwarded: totalAwarded(el.id),
        next:
          substate.toJS().nextUniqueAchievement?.id === el.id
            ? substate.toJS().nextUniqueAchievement
            : null,
      }));
  });

const selectAchievementsLoading = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().userAchievementsLoading,
  );

export {
  selectViewProfileAccount,
  selectReachedAchievements,
  selectUnreachedAchievements,
  selectReachedLevelAchievements,
  selectUnreachedLevelAchievements,
  selectUniqueReachedAchievements,
  selectUniqueUnreachedAchievements,
  selectUserAchievements,
  selectAchievementsLoading,
};
