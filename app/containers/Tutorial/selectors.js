import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tutorial state domain
 */

const selectTutorialDomain = state =>
  state.get('tutorial', initialState).toJS();

const selectTutorial = () =>
  createSelector(selectTutorialDomain, substate => substate.tutorial);

const selectTutorialProcessing = () =>
  createSelector(
    selectTutorialDomain,
    substate => substate.getTutorialProcessing,
  );

const selectTutorialError = () =>
  createSelector(selectTutorialDomain, substate => substate.getTutorialError);

export {
  selectTutorialDomain,
  selectTutorial,
  selectTutorialProcessing,
  selectTutorialError,
};
