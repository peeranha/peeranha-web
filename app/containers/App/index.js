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
import ErrorBoundary from 'components/ErrorBoundary';

import Wrapper from './Wrapper';

import {
  HomePage,
  FaqFull,
  Faq,
  Users,
  EditQuestion,
  EditProfilePage,
  ViewProfilePage,
  NotFoundPage,
  ErrorPage,
  Questions,
  AskQuestion,
  ViewQuestion,
  EditAnswer,
  CreateCommunity,
  TagsOfCommunity,
  TagsCollection,
  CreateTag,
  SuggestedTags,
  NoAccess,
  Feed,
  Communities,
  SuggestedCommunities,
  EmailEnteringForm,
  EmailVerificationForm,
  ScatterSignUpForm,
  IHaveEOSAccountForm,
  IdontHaveEOSAccountForm,
  RegistrationAlmostDone,
  Login,
  ForgotPassword,
  Toast,
  Wallet,
  Search,
  Support,
  PrivacyPolicy,
} from './imports';

export default function App() {
  if (process.env.NODE_ENV !== 'development') {
    ReactGA.pageview(window.location.pathname);
  }

  return (
    <ErrorBoundary>
      <Toast />
      <Login />
      <ForgotPassword />

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
          path={routes.userWallet(':id')}
          render={props => Wrapper(Wallet, props)}
        />

        <Route
          path={routes.support()}
          render={props => Wrapper(Support, props)}
        />

        <Route
          path={routes.privacyPolicy()}
          render={props => Wrapper(PrivacyPolicy, props)}
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
          exact
          path={routes.users()}
          render={props => Wrapper(Users, props)}
        />

        <Route
          path={routes.noAccess()}
          render={props => Wrapper(NoAccess, props)}
        />

        <Route
          path={routes.search()}
          render={props => Wrapper(Search, props)}
        />

        <Route
          path={routes.errorPage()}
          render={props => Wrapper(ErrorPage, props)}
        />

        <Route path={routes.signup.email.name}>
          <React.Suspense fallback={<Loader />}>
            <EmailEnteringForm />
          </React.Suspense>
        </Route>

        <Route path={routes.signup.emailVerification.name}>
          <React.Suspense fallback={null}>
            <EmailVerificationForm />
          </React.Suspense>
        </Route>

        <Route path={routes.signup.displayName.name}>
          <React.Suspense fallback={null}>
            <ScatterSignUpForm />
          </React.Suspense>
        </Route>

        <Route path={routes.signup.haveEosAccount.name}>
          <React.Suspense fallback={null}>
            <IHaveEOSAccountForm />
          </React.Suspense>
        </Route>

        <Route path={routes.signup.dontHaveEosAccount.name}>
          <React.Suspense fallback={null}>
            <IdontHaveEOSAccountForm />
          </React.Suspense>
        </Route>

        <Route path={routes.signup.almostDone.name}>
          <React.Suspense fallback={null}>
            <RegistrationAlmostDone />
          </React.Suspense>
        </Route>

        <Route render={props => Wrapper(NotFoundPage, props)} />
      </Switch>
    </ErrorBoundary>
  );
}
