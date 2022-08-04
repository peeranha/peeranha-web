import React, { memo, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routes from 'routes-config';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { redirectToCreateCommunity } from 'containers/CreateCommunity/actions';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import Seo from 'components/Seo';
import messages from './messages';
import languages from './languagesOptions';

import Header from './Header';

export const Communities = ({
  locale,
  communities,
  communitiesLoading,
  isLastFetch,
  Content,
  SubHeader,
  changeSorting,
  sorting,
  redirectToCreateCommunityDispatch,
  route,
  profile,
}) => {
  const [language, setLanguage] = useState(languages.all);

  const keywords = useMemo(() => communities.map(x => x.name), [communities]);

  const [displayLoadingIndicator, displayBanner] = useMemo(
    () => [
      communitiesLoading && route === routes.communities(),
      !communitiesLoading && route === routes.communities(),
    ],
    [communitiesLoading, route],
  );

  return (
    <div className="d-xl-flex">
      {process.env.ENV !== 'dev' && (
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
          keywords={keywords}
        />
      )}

      <div className="flex-xl-grow-1">
        <Header
          goToCreateCommunityScreen={redirectToCreateCommunityDispatch}
          SubHeader={SubHeader}
          changeSorting={changeSorting}
          sorting={sorting}
          communitiesNumber={communities?.length ?? 0}
          setLang={setLanguage}
          language={language}
          profile={profile}
        />

        <Content
          isLastFetch={isLastFetch}
          communities={communities}
          sorting={sorting}
          locale={locale}
          language={language}
          profile={profile}
        />

        {displayLoadingIndicator && <LoadingIndicator />}
      </div>
    </div>
  );
};

Communities.propTypes = {
  communities: PropTypes.array,
  locale: PropTypes.string,
  route: PropTypes.string,
  sorting: PropTypes.object,
  changeSorting: PropTypes.func,
  SubHeader: PropTypes.any,
  Content: PropTypes.any,
  isLastFetch: PropTypes.bool,
  communitiesLoading: PropTypes.bool,
  redirectToCreateCommunityDispatch: PropTypes.func,
  profile: PropTypes.object,
};

export default memo(
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      communities: selectCommunities(),
      communitiesLoading: selectCommunitiesLoading(),
      profile: makeSelectProfileInfo(),
    }),
    dispatch => ({
      redirectToCreateCommunityDispatch: bindActionCreators(
        redirectToCreateCommunity,
        dispatch,
      ),
    }),
  )(Communities),
);
