/**
 * Selectors to the Achievements state domain
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { possibleAchievements } from './constants';

const selectUserAchievementsDomain = state =>
  state.get('userAchievements', initialState);

const selectUserAchievements = () =>
  createSelector(
    selectUserAchievementsDomain,
    substate => substate.toJS().achievements,
  );

const selectSortedUserAchievements = () =>
  createSelector(selectUserAchievementsDomain, substate => {
    const reachedAchievementsIds = substate
      .toJS()
      .achievements.filter(
        el => el.value > 0 && el.user === substate.toJS().currentAccount,
      )
      .map(el => el.achievements_id);

    const reachedAchievements = possibleAchievements
      .filter(el => reachedAchievementsIds.includes(el.id))
      .map(el => ({
        ...el,
        reached: true,
        value: substate
          .toJS()
          .achievements.filter(item => item.achievements_id === el.id)[0].value,
      }));

    const unreachedAchievements = possibleAchievements
      .filter(el => !reachedAchievementsIds.includes(el.id))
      .map(el => ({ ...el, reached: false }));

    return reachedAchievements.concat(unreachedAchievements);
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
  selectUserAchievements,
  selectSortedUserAchievements,
  selectAchievementsLoading,
  selectuserAchievementsError,
};
