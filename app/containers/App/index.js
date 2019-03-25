/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import ReactGA from 'react-ga';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FaqFull from 'containers/HomePage/FaqFull';

import EditProfilePage from 'containers/EditProfilePage/Loadable';
import ViewProfilePage from 'containers/ViewProfilePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SignUp from 'containers/SignUp';
import Login from 'containers/Login';
import Toast from 'containers/Toast';
import Questions from 'containers/Questions/Loadable';
import AskQuestion from 'containers/AskQuestion/Loadable';
import ViewQuestion from 'containers/ViewQuestion';
import EditQuestion from 'containers/EditQuestion';
import EditAnswer from 'containers/EditAnswer';
import Communities from 'containers/Communities';
import CreateCommunity from 'containers/CreateCommunity';
import SuggestedCommunities from 'containers/SuggestedCommunities';
import Tags from 'containers/Tags';
import CreateTag from 'containers/CreateTag';
import SuggestedTags from 'containers/SuggestedTags';

import NoAccess from 'components/NoAccess/Loadable';
import Feed from 'components/Feed';

import * as routes from 'routes-config';

import Wrapper from './Wrapper';

export default function App /* istanbul ignore next */() {
  if (process.env.NODE_ENV !== 'development') {
    ReactGA.pageview(window.location.pathname);
  }

  return (
    <div>
      <Toast />
      <Switch>
        <Route exact path={routes.home()} render={() => <HomePage />} />
        <Route path={routes.faq()} render={() => <FaqFull />} />
        <Route path={routes.feed()} render={props => Wrapper(Feed, props)} />

        <Route
          exact
          path={routes.communities()}
          render={props => Wrapper(Communities, props)}
        />
        <Route
          path={routes.communitiesCreate()}
          render={props => Wrapper(CreateCommunity, props)}
        />
        <Route
          path={routes.suggestedCommunities()}
          render={props => Wrapper(SuggestedCommunities, props)}
        />

        <Route
          exact
          path={routes.communityTags(':communityid')}
          render={props => Wrapper(Tags, props)}
        />
        <Route
          path={routes.tagsCreate(':communityid')}
          render={props => Wrapper(CreateTag, props)}
        />
        <Route
          path={routes.suggestedTags(':communityid')}
          render={props => Wrapper(SuggestedTags, props)}
        />

        <Route
          exact
          path={routes.profileView(':id')}
          render={props => Wrapper(ViewProfilePage, props)}
        />
        <Route
          path={routes.profileEdit(':id')}
          render={props => Wrapper(EditProfilePage, props)}
        />

        <Route
          exact
          path={routes.questions()}
          render={props => Wrapper(Questions, props)}
        />
        <Route
          path={routes.questionAsk()}
          render={props => Wrapper(AskQuestion, props)}
        />
        <Route
          exact
          path={routes.questionView(':id')}
          render={props => Wrapper(ViewQuestion, props)}
        />
        <Route
          path={routes.questionEdit(':questionid')}
          render={props => Wrapper(EditQuestion, props)}
        />

        <Route
          path={routes.answerEdit(':questionid', ':answerid')}
          render={props => Wrapper(EditAnswer, props)}
        />

        <Route
          path={routes.noAccess()}
          render={props => Wrapper(NoAccess, props)}
        />
        <Route render={props => Wrapper(NotFoundPage, props)} />
      </Switch>
      <SignUp />
      <Login />
    </div>
  );
}
