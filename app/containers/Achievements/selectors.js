/**
 * Selectors to the Achievements state domain
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { achievementsArr, levelAchievementsArr } from './constants';

const selectUserAchievementsDomain = state =>
  state.get('userAchievements', initialState);

const selectUserAchievements = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().achievements,
  );

const getReachedAchievementsIds = substate =>
  substate
    .toJS()
    .achievements.filter(
      el => el.value > 0 && el.user === substate.toJS().currentAccount,
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
      .map(el => ({ ...el, reached: false }));
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
      .map(el => ({ ...el, reached: false }));
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
  selectReachedAchievements,
  selectUnreachedAchievements,
  selectReachedLevelAchievements,
  selectUnreachedLevelAchievements,
  selectUserAchievements,
  selectAchievementsLoading,
  selectuserAchievementsError,
};
