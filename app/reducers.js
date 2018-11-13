/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import profileReducer from 'containers/Profile/reducer';
import loginReducer from 'containers/Login/reducer';
import toastReducer from 'containers/Toast/reducer';
import accountProviderReducer from 'containers/AccountProvider/reducer';
import editProfileReducer from 'containers/EditProfilePage/reducer';
import signUpReducer from 'containers/SignUp/reducer';
import questionsReducer from 'containers/Questions/reducer';
import askQuestionReducer from 'containers/AskQuestion/reducer';
import viewQuestionReducer from 'containers/ViewQuestion/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    signup: signUpReducer,
    login: loginReducer,
    toast: toastReducer,
    account: accountProviderReducer,
    editProfileReducer,
    questionsReducer,
    askQuestionReducer,
    viewQuestion: viewQuestionReducer,
    profile: profileReducer,
    form: formReducer,
    ...injectedReducers,
  });
}
