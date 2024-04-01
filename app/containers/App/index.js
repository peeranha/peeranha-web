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

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import Documentation from 'pages/Documentation';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import global from 'styles/global';
import { theme } from 'themes/default';
import { selectDocumentationMenu, selectPinnedItemMenu } from 'containers/AppWrapper/selectors';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import {
  DAEMON,
  POST_TYPE,
  REWARD_CLAIMING_ENABLED,
  POSITION_TOP,
  isSuiBlockchain,
  CONNECTED_WALLET,
} from 'utils/constants';
import { ScrollTo } from 'utils/animation';
import { closePopover as Popover } from 'utils/popover';
import {
  isSingleCommunityWebsite,
  singleCommunityDocumentationPosition,
} from 'utils/communityManagement';

import Loader from 'components/LoadingIndicator/HeightWidthCentered';
import ErrorBoundary from 'components/ErrorBoundary';

import Wrapper from 'containers/AppWrapper';

import saga from 'containers/App/saga';
import NewUserRegistrationForm from 'containers/SuiProvider/NewUserRegistrationForm';
import {
  hasCommunityAdminRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { getValueFromSearchString } from 'utils/url';
import { getCookie, setCookie } from 'utils/cookie';
import AISearch from 'containers/AISearch';
import {
  EditCommunity,
  HomePage,
  Administration,
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
  CreateTag,
  EditTag,
  NoAccess,
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
import { REFERRAL_CODE_URI } from './constants';
import { AUTOLOGIN_DATA } from '../Login/constants';
import { redirectToFeed, redirectToDocumentation, redirectToPreload } from './actions';
import CookieConsentPopup from '../../components/CookieConsentPopup';

const single = isSingleCommunityWebsite();
const isDocumentationPositionTop = singleCommunityDocumentationPosition() === POSITION_TOP;
const App = ({
  location: { pathname, search },
  redirectToFeedDispatch,
  redirectToDocumentationDispatch,
  history,
  documentationMenu,
  pinnedItemMenu,
  profileInfo,
  showLoginModalDispatch,
}) => {
  const previouslyConnectedWallet = getCookie(CONNECTED_WALLET);
  if (!profileInfo && !previouslyConnectedWallet) {
    showLoginModalDispatch();
  }

  const hasPinnedPost = pinnedItemMenu.id !== '';

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
    if (loginData && !single && pathname !== '/') {
      redirectToFeedDispatch();
    }
  }, []);

  useEffect(() => {
    if (isSuiBlockchain && !single && pathname === '/') {
      redirectToFeedDispatch();
    }
  }, []);

  useEffect(() => {
    window.goto = (page) => history.push(page);
  }, [history]);

  useEffect(() => {
    const isVisitedSite = getCookie('isVisitedSite');
    if (isVisitedSite && !single && pathname === '/') {
      redirectToFeedDispatch();
    }
  }, []);

  const isDocumentationExist = Array.isArray(documentationMenu)
    ? documentationMenu.length
    : Object.keys(documentationMenu).length;

  useEffect(() => {
    if (single && (pathname === '/' || pathname === '/feed') && !search) {
      if ((hasPinnedPost || isDocumentationPositionTop) && isDocumentationExist) {
        redirectToDocumentationDispatch();
      } else {
        single ? redirectToDocumentationDispatch() : redirectToFeedDispatch();
      }
    }
  }, [documentationMenu]);

  const hasCommunityOrProtocolAdminRole =
    single &&
    (hasGlobalModeratorRole() || hasProtocolAdminRole() || hasCommunityAdminRole(null, single));

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <Toast />

        <Login />

        <ScrollTo />
        <Popover />
        <CookieConsentPopup />

        {isSuiBlockchain && <NewUserRegistrationForm />}

        <Switch>
          <Route exact path={routes.home()}>
            <React.Suspense fallback={<Loader />}>
              <HomePage />
            </React.Suspense>
          </Route>

          <Route
            exact
            path={routes.preloaderPage()}
            render={(props) => Wrapper(FullWidthPreloader, props)}
          />

          <Route exact path={routes.feed()} render={(props) => Wrapper(Feed, props)} />

          {single && (
            <Route exact path={routes.defaultPath} render={(props) => Wrapper(AISearch, props)} />
          )}

          {/* {single && (hasPinnedPost || isDocumentationPositionTop) && ( */}
          {/*  <Route */}
          {/*    exact */}
          {/*    path={routes.documentationStartPage()} */}
          {/*    render={(props) => Wrapper(Documentation, props)} */}
          {/*  /> */}
          {/* )} */}

          {!single && (
            <Route
              path={routes.feed(':communityid', ':paginationpage')}
              render={(props) => Wrapper(Feed, props)}
            />
          )}

          <Route
            exact
            path={routes.profileView(':id')}
            render={(props) => Wrapper(ViewProfilePage, props)}
          />

          <Route
            path={routes.profileEdit(':id')}
            render={(props) => Wrapper(EditProfilePage, props)}
          />

          {!single && (
            <Route
              exact
              path={routes.communities()}
              render={(props) => Wrapper(Communities, props)}
            />
          )}

          {!single && (
            <Route
              path={routes.communitiesCreate()}
              render={(props) => Wrapper(CreateCommunity, props)}
            />
          )}

          <Route
            path={routes.communitiesEdit(':communityId')}
            render={(props) => Wrapper(EditCommunity, props)}
          />

          <Route
            exact
            path={routes.communityTags(':communityid')}
            render={(props) => Wrapper(TagsOfCommunity, props)}
          />

          <Route
            path={routes.tagsCreate(':communityid')}
            render={(props) => Wrapper(CreateTag, props)}
          />

          <Route
            path={routes.editTag(':communityId', ':tagid')}
            render={(props) => Wrapper(EditTag, props)}
          />

          <Route
            exact
            path={routes.termsAndConditions()}
            render={(props) => Wrapper(TermsOfService, props)}
          />

          <Route path={routes.userWallet(':id')} render={(props) => Wrapper(Wallet, props)} />

          {REWARD_CLAIMING_ENABLED && (
            <Route path={routes.userBoost(':id')} render={(props) => Wrapper(Boost, props)} />
          )}

          <Route path={routes.support()} render={(props) => Wrapper(Support, props)} />

          <Route path={routes.privacyPolicy()} render={(props) => Wrapper(PrivacyPolicy, props)} />

          <Route
            exact
            path={routes.questions()}
            render={(props) =>
              Wrapper(Questions, {
                ...props,
                postsTypes: [POST_TYPE.generalPost],
              })
            }
          />

          <Route
            exact
            path={routes.expertPosts()}
            render={(props) =>
              Wrapper(Questions, {
                ...props,
                postsTypes: [POST_TYPE.expertPost],
              })
            }
          />

          <Route
            path={routes.questions(':communityid', ':paginationpage')}
            render={(props) =>
              Wrapper(Questions, {
                ...props,
                postsTypes: [POST_TYPE.generalPost],
              })
            }
          />

          <Route
            path={routes.expertPosts(':communityid', ':paginationpage')}
            render={(props) =>
              Wrapper(Questions, {
                ...props,
                postsTypes: [POST_TYPE.expertPost],
              })
            }
          />

          <Route
            exact
            path={routes.tutorials()}
            render={(props) => Wrapper(Questions, { ...props, postsTypes: [POST_TYPE.tutorial] })}
          />

          <Route
            path={routes.tutorials(':communityid', ':paginationpage')}
            render={(props) => Wrapper(Questions, { ...props, postsTypes: [POST_TYPE.tutorial] })}
          />

          <Route path={routes.questionAsk()} render={(props) => Wrapper(AskQuestion, props)} />

          <Route
            path={routes.documentationCreate(':parentId')}
            render={(props) => Wrapper(AskQuestion, props)}
          />

          <Route
            path={routes.documentationCreate()}
            render={(props) => Wrapper(AskQuestion, props)}
          />

          <Route
            exact
            path={routes.questionView(':id', ':title')}
            render={(props) => Wrapper(ViewQuestion, props)}
          />

          <Route
            exact
            path={routes.questionView(':id', ':title', false, true)}
            render={(props) => Wrapper(ViewQuestion, props)}
          />

          <Route exact path={'/questions/:id'} render={(props) => Wrapper(ViewQuestion, props)} />

          <Route exact path={'/discussions/:id'} render={(props) => Wrapper(ViewQuestion, props)} />

          <Route
            exact
            path={routes.expertPostView(':id', ':title')}
            render={(props) => Wrapper(ViewQuestion, props)}
          />

          <Route exact path={'/experts/:id'} render={(props) => Wrapper(ViewQuestion, props)} />

          <Route
            exact
            path={routes.tutorialView(':id', ':title')}
            render={(props) => Wrapper(ViewQuestion, props)}
          />

          <Route exact path={'/tutorials/:id'} render={(props) => Wrapper(ViewQuestion, props)} />

          <Route
            path={routes.questionEdit(':postType', ':questionid', ':title')}
            render={(props) => Wrapper(EditQuestion, props)}
          />

          <Route
            path={routes.documentation(':sectionId', ':title')}
            render={(props) => Wrapper(Documentation, props)}
          />

          <Route
            path={routes.answerEdit(':postType', ':questionid', ':answerid')}
            render={(props) => Wrapper(EditAnswer, props)}
          />

          {(hasGlobalModeratorRole() || hasProtocolAdminRole() || single) && (
            <Route exact path={routes.users()} render={(props) => Wrapper(Users, props)} />
          )}

          {single && hasCommunityOrProtocolAdminRole && (
            <Route
              exact
              path={routes.administration()}
              render={(props) => Wrapper(Administration, props)}
            />
          )}

          {single && hasCommunityOrProtocolAdminRole && (
            <Route
              exact
              path={routes.administration()}
              render={(props) => Wrapper(Administration, props)}
            />
          )}

          <Route path={routes.noAccess()} render={(props) => Wrapper(NoAccess, props)} />

          <Route exact path={routes.search()} render={(props) => Wrapper(Search, props)} />

          <Route path={routes.search(':q')} render={(props) => Wrapper(Search, props)} />

          <Route path={routes.errorPage()} render={(props) => Wrapper(ErrorPage, props)} />

          <Route render={(props) => Wrapper(NotFoundPage, props)} />
        </Switch>
        <div id="portal-root">
          <MetaTransactionAgreement />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

App.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  redirectToFeedDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profileInfo: makeSelectProfileInfo(),
  documentationMenu: selectDocumentationMenu(),
  pinnedItemMenu: selectPinnedItemMenu(),
});

export default compose(
  withRouter,
  injectSaga({ key: 'app', saga, mode: DAEMON }),
  connect(mapStateToProps, (dispatch) => ({
    redirectToFeedDispatch: bindActionCreators(redirectToFeed, dispatch),
    redirectToDocumentationDispatch: bindActionCreators(redirectToDocumentation, dispatch),
    redirectToPreloadDispatch: bindActionCreators(redirectToPreload, dispatch),
    showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
  })),
)(App);
