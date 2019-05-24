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
import * as routes from 'routes-config';

import Loader from 'components/LoadingIndicator/HeightWidthCentered';

import SignUp from 'containers/SignUp';
import Login from 'containers/Login';
import Toast from 'containers/Toast';

import Wrapper from './Wrapper';

const HomePage = React.lazy(() => import('containers/HomePage'));
const FaqFull = React.lazy(() => import('containers/HomePage/FaqFull'));

const Faq = React.lazy(() => import('containers/Faq'));
const Users = React.lazy(() => import('containers/Users'));
const EditQuestion = React.lazy(() => import('containers/EditQuestion'));
const EditProfilePage = React.lazy(() => import('containers/EditProfilePage'));
const ViewProfilePage = React.lazy(() => import('containers/ViewProfilePage'));
const NotFoundPage = React.lazy(() => import('containers/NotFoundPage'));
const Questions = React.lazy(() => import('containers/Questions'));
const AskQuestion = React.lazy(() => import('containers/AskQuestion'));
const ViewQuestion = React.lazy(() => import('containers/ViewQuestion'));
const EditAnswer = React.lazy(() => import('containers/EditAnswer'));
const CreateCommunity = React.lazy(() => import('containers/CreateCommunity'));
const TagsOfCommunity = React.lazy(() => import('containers/TagsOfCommunity'));
const TagsCollection = React.lazy(() => import('containers/TagsCollection'));
const CreateTag = React.lazy(() => import('containers/CreateTag'));
const SuggestedTags = React.lazy(() => import('containers/SuggestedTags'));
const NoAccess = React.lazy(() => import('components/NoAccess'));
const Feed = React.lazy(() => import('components/Feed'));
const Communities = React.lazy(() => import('components/ExistingCommunities'));
const SuggestedCommunities = React.lazy(() =>
  import('components/SuggestedCommunities'),
);

export default function App /* istanbul ignore next */() {
  if (process.env.NODE_ENV !== 'development') {
    ReactGA.pageview(window.location.pathname);
  }

  return (
    <div>
      <Toast />

      <Switch>
        <Route exact path={routes.home()}>
          <React.Suspense fallback={<Loader />}>
            <HomePage />
          </React.Suspense>
        </Route>

        <Route exact path={routes.faq()}>
          <React.Suspense fallback={<Loader />}>
            <FaqFull />
          </React.Suspense>
        </Route>

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
          path={routes.tags()}
          render={props => Wrapper(TagsCollection, props)}
        />
        <Route
          exact
          path={routes.communityTags(':communityid')}
          render={props => Wrapper(TagsOfCommunity, props)}
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
          path={routes.appFaq()}
          render={props => Wrapper(Faq, props)}
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

        <Route path={routes.users()} render={props => Wrapper(Users, props)} />

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
