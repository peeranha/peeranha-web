/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';

import loginReducer from 'containers/Login/reducer';
import toastReducer from 'containers/Toast/reducer';
import accountProviderReducer from 'containers/AccountProvider/reducer';
import editProfileReducer from 'containers/EditProfilePage/reducer';
import questionsReducer from 'containers/Questions/reducer';
import documentationReducer from 'pages/Documentation/reducer';
import askQuestionReducer from 'containers/AskQuestion/reducer';
import existingQuestionReducer from 'containers/AskQuestion/reducer';
import viewQuestionReducer from 'containers/ViewQuestion/reducer';
import editQuestionReducer from 'containers/EditQuestion/reducer';
import editAnswerReducer from 'containers/EditAnswer/reducer';
import homepageReducer from 'pages/HomePage/reducer';
import dataCacheProviderReducer from 'containers/DataCacheProvider/reducer';
import followCommunityButtonReducer from 'containers/FollowCommunityButton/reducer';
import createCommunityReducer from 'containers/CreateCommunity/reducer';
import createTagReducer from 'containers/CreateTag/reducer';
import tagsReducer from 'containers/Tags/reducer';
import editTagReducer from 'containers/EditTag/reducer';
import questionsOfUserReducer from 'containers/QuestionsOfUser/reducer';
import questionsWithAnswersOfUserReducer from 'containers/QuestionsWithAnswersOfUser/reducer';
import usersReducer from 'containers/Users/reducer';
import logoutReducer from 'containers/Logout/reducer';
import changeEmailReducer from 'containers/ChangeEmail/reducer';
import searchReducer from 'containers/Search/reducer';
import appWrapperReducer from 'containers/AppWrapper/reducer';
import notificationsReducer from './components/Notifications/reducer';
import homeReducer from './containers/Home/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
export const routeInitialState = fromJS({
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
export default (injectedReducers) =>
  combineReducers({
    route: routeReducer,
    login: loginReducer,
    logout: logoutReducer,
    toast: toastReducer,
    account: accountProviderReducer,
    editProfileReducer,
    questionsReducer,
    documentationReducer,
    askQuestionReducer,
    existingQuestionReducer,
    viewQuestion: viewQuestionReducer,
    editQuestion: editQuestionReducer,
    editAnswer: editAnswerReducer,
    homepage: homepageReducer,
    dataCacheProvider: dataCacheProviderReducer,
    followCommunityButton: followCommunityButtonReducer,
    createCommunity: createCommunityReducer,
    createTag: createTagReducer,
    tags: tagsReducer,
    editTag: editTagReducer,
    questionsOfUser: questionsOfUserReducer,
    questionsWithAnswersOfUser: questionsWithAnswersOfUserReducer,
    users: usersReducer,
    form: formReducer,
    changeEmail: changeEmailReducer,
    search: searchReducer,
    appWrapper: appWrapperReducer,
    notifications: notificationsReducer,
    homePageKey: homeReducer,
    ...injectedReducers,
  });
