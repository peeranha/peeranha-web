import { fromJS } from 'immutable';

import {
  ADD_ROLE,
  ADD_ROLE_ERROR,
  ADD_ROLE_SUCCESS,
  GET_MODERATORS,
  GET_MODERATORS_ERROR,
  GET_MODERATORS_SUCCESS,
  REVOKE_ROLE,
  REVOKE_ROLE_ERROR,
  REVOKE_ROLE_SUCCESS,
} from './constants';

export const initialState = fromJS({
  moderatorsLoading: true,
  addRoleLoading: false,
  revokeRoleLoading: false,
  addAdminLoading: false,
  revokeAdminLoading: false,
  moderatorsList: [],
  moderatorsError: '',
});

function moderationReducer(
  state = initialState,
  action: {
    type: string;
    moderatorsList: Array<Moderator>;
    moderatorsError: Error;
  },
) {
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

    case ADD_ROLE:
      return state.set('addRoleLoading', true);
    case ADD_ROLE_SUCCESS:
      return state.set('addRoleLoading', false);
    case ADD_ROLE_ERROR:
      return state
        .set('addRoleLoading', false)
        .set('moderatorsError', moderatorsError);

    case REVOKE_ROLE:
      return state.set('revokeRoleLoading', true);
    case REVOKE_ROLE_SUCCESS:
      return state.set('revokeRoleLoading', false);
    case REVOKE_ROLE_ERROR:
      return state
        .set('revokeRoleLoading', false)
        .set('moderatorsError', moderatorsError);
    default:
      return state;
  }
}

export default moderationReducer;
