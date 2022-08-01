import { fromJS } from 'immutable';

import {
  ADD_MODERATOR,
  ADD_MODERATOR_ERROR,
  ADD_MODERATOR_SUCCESS,
  GET_MODERATORS,
  GET_MODERATORS_ERROR,
  GET_MODERATORS_SUCCESS,
  REVOKE_MODERATOR,
  REVOKE_MODERATOR_ERROR,
  REVOKE_MODERATOR_SUCCESS,
} from './constants';

export const initialState = fromJS({
  moderatorsLoading: true,
  addModeratorLoading: false,
  revokeModeratorLoading: false,
  moderatorsList: [],
  moderatorsError: '',
});

function moderationReducer(state = initialState, action: any) {
  const { type, moderatorsList = [], moderatorsError } = action;

  switch (type) {
    case GET_MODERATORS:
      return state.set('moderatorsLoading', true);
    case GET_MODERATORS_SUCCESS:
      return state
        .set('moderatorsLoading', false)
        .set('moderatorsList', moderatorsList);
    case GET_MODERATORS_ERROR:
      return state
        .set('moderatorsLoading', false)
        .set('moderatorsError', moderatorsError);

    case ADD_MODERATOR:
      return state.set('addModeratorLoading', true);
    case ADD_MODERATOR_SUCCESS:
      return state.set('addModeratorLoading', false);
    case ADD_MODERATOR_ERROR:
      return state
        .set('addModeratorLoading', false)
        .set('moderatorsError', moderatorsError);

    case REVOKE_MODERATOR:
      return state.set('revokeModeratorLoading', true);
    case REVOKE_MODERATOR_SUCCESS:
      return state.set('revokeModeratorLoading', false);
    case REVOKE_MODERATOR_ERROR:
      return state
        .set('revokeModeratorLoading', false)
        .set('moderatorsError', moderatorsError);
    default:
      return state;
  }
}

export default moderationReducer;
