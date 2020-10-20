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
          .achievements.filter(item => item.achievements_id === el.id)[0]
          ?.value,
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
          .achievements.filter(item => item.achievements_id === el.id)[0]
          ?.value;
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
          .achievements.filter(item => item.achievements_id === el.id)[0]
          ?.value,
      }));
  });

const selectUnreachedLevelAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);

    return levelAchievementsArr
      .filter(el => {
        const itemValue = substate
          .toJS()
          .achievements.filter(item => item.achievements_id === el.id)[0]
          ?.value;
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
            .achievements.filter(item => item.achievements_id === el.id)[0]
            ?.value ?? 0,
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
          .achievements.filter(item => item.achievements_id === el.id)[0]
          ?.value,
      }));
  });

const selectUniqueUnreachedAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = getReachedAchievementsIds(substate);
    return uniqueAchievementsArr
      .filter(el => !reachedAchievementsIds.includes(el.id))
      .map(el => ({
        ...el,
        reached: false,
        totalAwarded:
          substate
            .toJS()
            .projectAchievements?.filter(item => item.id === el.id)[0]?.count ??
          0,
        next:
          substate.toJS().nextUniqueAchievement?.id === el.id
            ? substate.toJS().nextAchievement
            : null,
      }));
  });

const selectAchievementsLoading = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().userAchievementsLoading,
  );

const selectuserAchievementsError = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().userAchievementsError,
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
  selectuserAchievementsError,
};
