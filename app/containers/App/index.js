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
import { Global, ThemeProvider } from '@emotion/react';
import global from 'styles/global';
import { theme } from 'themes/default';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import { DAEMON, POST_TYPE, REWARD_CLAIMING_ENABLED } from 'utils/constants';
import { ScrollTo } from 'utils/animation';
import { closePopover as Popover } from 'utils/popover';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import Loader from 'components/LoadingIndicator/HeightWidthCentered';
import ErrorBoundary from 'components/ErrorBoundary';

import Wrapper from 'containers/AppWrapper';

import saga from 'containers/App/saga';
import {
  EditCommunity,
  HomePage,
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
  EditTag,
  NoAccess,
  Home,
  Feed,
  Communities,
  Login,
  Toast,
  Wallet,
  Boost,
  Search,
  Support,
  PrivacyPolicy,
  FullWidthPreloader,
  TermsOfService,
  MetaTransactionAgreement,
} from './imports';
import { getCookie } from '../../utils/cookie';
import { AUTOLOGIN_DATA } from '../Login/constants';
import { redirectToFeed } from './actions';
import { hasGlobalModeratorRole } from '../../utils/properties';
import CookieConsentPopup from '../../components/CookieConsentPopup';

const single = isSingleCommunityWebsite();

const App = ({
  location: { pathname, search },
  redirectToFeedDispatch,
  history,
}) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.pageview(window.location.pathname);
  }

  useEffect(() => {
    const loginData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);
    if (loginData && !single && pathname !== '/') {
      redirectToFeedDispatch();
    }
  }, []);

  useEffect(
    () => {
      window.goto = page => history.push(page);
    },
    [history],
  );

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <Toast />

        <Login />
        <MetaTransactionAgreement />

        <ScrollTo />
        <Popover />
        <CookieConsentPopup />

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

          <Route
            exact
            path={routes.feed()}
            render={props => Wrapper(Feed, props)}
          />

          {!single && (
            <Route
              path={routes.feed(':communityid')}
              render={props => Wrapper(Feed, props)}
            />
          )}

          <Route
            exact
            path={routes.profileView(':id')}
            render={props => Wrapper(ViewProfilePage, props)}
          />

          <Route
            path={routes.profileEdit(':id')}
            render={props => Wrapper(EditProfilePage, props)}
          />

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

          <Route
            path={routes.communitiesEdit(':communityId')}
            render={props => Wrapper(EditCommunity, props)}
          />

          {!single && (
            <Route
              exact
              path={routes.tags()}
              render={props => Wrapper(TagsCollection, props)}
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
            path={routes.userWallet(':id')}
            render={props => Wrapper(Wallet, props)}
          />

          {REWARD_CLAIMING_ENABLED && (
            <Route
              path={routes.userBoost(':id')}
              render={props => Wrapper(Boost, props)}
            />
          )}

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
            render={props =>
              Wrapper(Questions, {
                ...props,
                postsTypes: [POST_TYPE.generalPost],
              })
            }
          />

          <Route
            exact
            path={routes.expertPosts()}
            render={props =>
              Wrapper(Questions, {
                ...props,
                postsTypes: [POST_TYPE.expertPost],
              })
            }
          />

          <Route
            path={routes.questions(':communityid')}
            render={props =>
              Wrapper(Questions, {
                ...props,
                postsTypes: [POST_TYPE.generalPost],
              })
            }
          />

          <Route
            path={routes.expertPosts(':communityid')}
            render={props =>
              Wrapper(Questions, {
                ...props,
                postsTypes: [POST_TYPE.expertPost],
              })
            }
          />

          <Route
            exact
            path={routes.tutorials()}
            render={props =>
              Wrapper(Questions, { ...props, postsTypes: [POST_TYPE.tutorial] })
            }
          />

          <Route
            path={routes.tutorials(':communityid')}
            render={props =>
              Wrapper(Questions, { ...props, postsTypes: [POST_TYPE.tutorial] })
            }
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
            exact
            path={routes.expertPostView(':id')}
            render={props => Wrapper(ViewQuestion, props)}
          />

          <Route
            exact
            path={routes.tutorialView(':id')}
            render={props => Wrapper(ViewQuestion, props)}
          />

          <Route
            path={routes.questionEdit(':postType', ':questionid')}
            render={props => Wrapper(EditQuestion, props)}
          />

          <Route
            path={routes.answerEdit(':questionid', ':answerid')}
            render={props => Wrapper(EditAnswer, props)}
          />

          {(hasGlobalModeratorRole() || single) && (
            <Route
              exact
              path={routes.users()}
              render={props => Wrapper(Users, props)}
            />
          )}

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

          <Route render={props => Wrapper(NotFoundPage, props)} />
        </Switch>
      </ThemeProvider>
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
