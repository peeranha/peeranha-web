import Documentation from 'pages/Documentation';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import global from 'styles/global';
import { theme } from 'themes/default';
import {
  selectDocumentationMenu,
  selectPinnedItemMenu,
} from 'containers/AppWrapper/selectors';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import { DAEMON, POSITION_TOP } from 'utils/constants';
import { ScrollTo } from 'utils/animation';
import { closePopover as Popover } from 'utils/popover';
import {
  isSingleCommunityWebsite,
  singleCommunityDocumentationPosition,
} from 'utils/communityManagement';

import ErrorBoundary from 'components/ErrorBoundary';
import Wrapper from 'containers/AppWrapper';

import saga from 'containers/App/saga';
import {
  Login,
  ForgotPassword,
  Toast,
  MetaTransactionAgreement,
  NotFoundPage,
} from './imports';
import { getValueFromSearchString } from '../../utils/url';
import { getCookie, setCookie } from '../../utils/cookie';
import { REFERRAL_CODE_URI } from './constants';
import { AUTOLOGIN_DATA } from '../Login/constants';
import {
  redirectToFeed,
  redirectToDocumentation,
  redirectToPreload,
} from './actions';
import { changeLocale as changeLocaleDispatch } from 'containers/AppWrapper/actions';
import CookieConsentPopup from '../../components/CookieConsentPopup';
import routesConfig from './routes';
import { APP_LOCALE } from 'containers/LanguageProvider/constants';
import i18next, { languages } from 'app/i18n';

const single = isSingleCommunityWebsite();
const isDocumentationPositionTop =
  singleCommunityDocumentationPosition() === POSITION_TOP;
const baseRouteUrl = '/:locale(en|es|vi|zh)?';

const App = ({
  location: { pathname, search },
  redirectToFeedDispatch,
  redirectToDocumentationDispatch,
  history,
  documentationMenu,
  pinnedItemMenu,
  changeLocale,
}) => {
  const hasPinnedPost = pinnedItemMenu.id !== '';
  const baseUrl = i18next.language === 'en' ? '' : `/${i18next.language}`;

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
    if (loginData && !single && pathname !== `${baseUrl}/`) {
      redirectToFeedDispatch();
    }
  }, []);

  useEffect(() => {
    const newLocale = getCookie(APP_LOCALE);

    if (newLocale && newLocale !== 'en') {
      i18next.changeLanguage(newLocale, () => {
        const lang = history.location.pathname.slice(0, 3);

        if (newLocale === 'en') {
          history.push(history.location.pathname.slice(3));
          return;
        }

        if (
          Object.keys(languages)
            .slice(1)
            .map((item) => `/${item}`)
            .includes(lang)
        ) {
          history.push(`/${newLocale}${history.location.pathname.slice(3)}`);
        } else {
          history.push(`/${newLocale}${history.location.pathname}`);
        }
      });
      changeLocale(newLocale);
    }
  }, []);

  useEffect(() => {
    window.goto = (page) => history.push(baseUrl + page);
  }, [history, baseUrl]);

  useEffect(() => {
    const isVisitedSite = getCookie('isVisitedSite');
    if (isVisitedSite && !single && pathname === `${baseUrl}/`) {
      redirectToFeedDispatch();
    }
  }, []);

  const isDocumentationExist = Array.isArray(documentationMenu)
    ? documentationMenu.length
    : Object.keys(documentationMenu).length;

  useEffect(() => {
    if (
      single &&
      (pathname === `${baseUrl}/` || pathname === `${baseUrl}/feed`)
    ) {
      if (
        (hasPinnedPost || isDocumentationPositionTop) &&
        isDocumentationExist
      ) {
        redirectToDocumentationDispatch();
      } else {
        redirectToFeedDispatch();
      }
    }
  }, [documentationMenu, baseUrl]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        <Toast />

        <Login />
        <ForgotPassword />
        <MetaTransactionAgreement />

        <ScrollTo />
        <Popover />
        <CookieConsentPopup />

        <Switch>
          {routesConfig.map((item, index) => {
            if (item.fallback) {
              return (
                <Route
                  exact={item?.exact}
                  path={baseRouteUrl + item.path}
                  key={index}
                >
                  <React.Suspense
                    fallback={
                      typeof item.fallback === 'boolean' ? null : (
                        <item.fallback />
                      )
                    }
                  >
                    <item.Component />
                  </React.Suspense>
                </Route>
              );
            }

            if (typeof item.isRender !== 'undefined' && !item.isRender) {
              return null;
            }

            return (
              <Route
                exact={item?.exact}
                path={baseRouteUrl + item.path}
                key={index}
                render={(props) =>
                  Wrapper(item.Component, {
                    ...props,
                    ...(item.props && item.props),
                  })
                }
              />
            );
          })}

          {single && (hasPinnedPost || isDocumentationPositionTop) && (
            <Route
              exact
              path={routes.documentationStartPage()}
              render={(props) => Wrapper(Documentation, props)}
            />
          )}

          <Route render={(props) => Wrapper(NotFoundPage, props)} />
        </Switch>
        <div id="portal-root" />
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
  documentationMenu: selectDocumentationMenu(),
  pinnedItemMenu: selectPinnedItemMenu(),
});

export default compose(
  withRouter,
  injectSaga({ key: 'app', saga, mode: DAEMON }),
  connect(mapStateToProps, (dispatch) => ({
    redirectToFeedDispatch: bindActionCreators(redirectToFeed, dispatch),
    redirectToDocumentationDispatch: bindActionCreators(
      redirectToDocumentation,
      dispatch,
    ),
    redirectToPreloadDispatch: bindActionCreators(redirectToPreload, dispatch),
    changeLocale: bindActionCreators(changeLocaleDispatch, dispatch),
  })),
)(App);
