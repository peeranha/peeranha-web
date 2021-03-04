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

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import { ScrollTo } from 'utils/animation';
import { closePopover as Popover } from 'utils/popover';
import { isSingleCommunityWebsite, getSingleCommunityDetails } from 'utils/communityManagement';

import Loader from 'components/LoadingIndicator/HeightWidthCentered';
import ProgressIndicator from 'containers/ProgressIndicator';
import ErrorBoundary from 'components/ErrorBoundary';

import Wrapper from 'containers/AppWrapper';

import saga from './saga';
import {
  EditCommunity,
  HomePage,
  Faq,
  Tutorial,
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
  EditTag,
  NoAccess,
  Home,
  Feed,
  Communities,
  SuggestedCommunities,
  EmailEnteringForm,
  EmailVerificationForm,
  WalletsSignUpForm,
  IHaveEOSAccountForm,
  IdontHaveEOSAccountForm,
  RegistrationAlmostDoneWithAccount,
  RegistrationAlmostDoneNoAccount,
  Login,
  ForgotPassword,
  Toast,
  Wallet,
  Boost,
  Search,
  Support,
  PrivacyPolicy,
  FullWidthPreloader,
  TermsOfService,
} from './imports';
import { getValueFromSearchString } from '../../utils/url';
import { getCookie, setCookie } from '../../utils/cookie';
import { REFERRAL_CODE_URI } from './constants';
import { AUTOLOGIN_DATA } from '../Login/constants';
import { redirectToFeed } from './actions';

const single = isSingleCommunityWebsite();

const App = ({
  location: { pathname, search, hash },
  redirectToFeedDispatch,
  history,
}) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.pageview(window.location.pathname);
  }

  useEffect(() => {
    if (!getCookie(REFERRAL_CODE_URI)) {
      const value = getValueFromSearchString(search, REFERRAL_CODE_URI);
      if (value) {
        setCookie({
          name: REFERRAL_CODE_URI,
          value,
          options: {
            allowSubdomains: true,
            neverExpires: true,
            defaultPath: true,
          },
        });
      }
    }

    const loginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);
    if (loginData && !single && pathname === '/' && hash !== '#allquestions') {
      redirectToFeedDispatch();
    } else if (hash === '#allquestions') {
      history.push(pathname);
    }
  }, []);

  useEffect(
    () => {
      window.goto = page => history.push(page);
    },
    [history],
  );

  const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;

  return (
    <ErrorBoundary>
      <Toast />
      <ProgressIndicator />

      <Login />
      <ForgotPassword />

      <ScrollTo />
      <Popover />

      <Switch>
        <Route exact path={routes.home()}>
          <React.Suspense fallback={<Loader />}>
            <HomePage />
          </React.Suspense>
        </Route>

        <Route
          exact
          path={routes.preloaderPage()}
          render={props => Wrapper(FullWidthPreloader, props)}
        />

        {!!isBloggerMode && (
          <Route
            exact
            path={routes.detailsHomePage()}
            render={props => Wrapper(Home, props)}
          />
        )}

        {!single && (
          <Route
            exact
            path={routes.feed()}
            render={props => Wrapper(Feed, props)}
          />
        )}

        {!single && (
          <Route
            path={routes.feed(':communityid')}
            render={props => Wrapper(Feed, props)}
          />
        )}

        {!single && (
          <Route
            exact
            path={routes.communities()}
            render={props => Wrapper(Communities, props)}
          />
        )}

        {!single && (
          <Route
            path={routes.communitiesCreate()}
            render={props => Wrapper(CreateCommunity, props)}
          />
        )}

        {!single && (
          <Route
            path={routes.communitiesEdit(':communityId')}
            render={props => Wrapper(EditCommunity, props)}
          />
        )}

        {!single && (
          <Route
            path={routes.suggestedCommunities()}
            render={props => Wrapper(SuggestedCommunities, props)}
          />
        )}

        {!single && (
          <Route
            exact
            path={routes.tags()}
            render={props => Wrapper(TagsCollection, props)}
          />
        )}

        {!single && (
          <Route
            exact
            path={routes.tutorial()}
            render={props => Wrapper(Tutorial, props)}
          />
        )}

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
          path={routes.editTag(':communityId', ':tagid')}
          render={props => Wrapper(EditTag, props)}
        />

        <Route
          path={routes.suggestedTags(':communityid')}
          render={props => Wrapper(SuggestedTags, props)}
        />

        <Route
          exact
          path={routes.faq()}
          render={props => Wrapper(Faq, props)}
        />

        <Route
          exact
          path={routes.termsAndConditions()}
          render={props => Wrapper(TermsOfService, props)}
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
          path={routes.userBoost(':id')}
          render={props => Wrapper(Boost, props)}
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
          path={routes.questions(':communityid')}
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
          exact
          path={routes.search()}
          render={props => Wrapper(Search, props)}
        />

        <Route
          path={routes.search(':q')}
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
            <WalletsSignUpForm />
          </React.Suspense>
        </Route>

        <Route exact path={routes.signup.haveEosAccount.name}>
          <React.Suspense fallback={null}>
            <IHaveEOSAccountForm />
          </React.Suspense>
        </Route>

        <Route exact path={routes.signup.dontHaveEosAccount.name}>
          <React.Suspense fallback={null}>
            <IdontHaveEOSAccountForm />
          </React.Suspense>
        </Route>

        <Route path={routes.signup.almostDoneWithAccount.name}>
          <React.Suspense fallback={null}>
            <RegistrationAlmostDoneWithAccount />
          </React.Suspense>
        </Route>

        <Route path={routes.signup.almostDoneNoAccount.name}>
          <React.Suspense fallback={null}>
            <RegistrationAlmostDoneNoAccount />
          </React.Suspense>
        </Route>

        <Route render={props => Wrapper(NotFoundPage, props)} />
      </Switch>
    </ErrorBoundary>
  );
};

App.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  redirectToFeedDispatch: PropTypes.func,
};

export default compose(
  withRouter,
  injectSaga({ key: 'app', saga, mode: DAEMON }),
  connect(
    null,
    dispatch => ({
      redirectToFeedDispatch: bindActionCreators(redirectToFeed, dispatch),
    }),
  ),
)(App);
