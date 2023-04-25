import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
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

import Header from './Header';
import { HIDDEN_COMMUNITIES_ID } from './constants';

export const Communities = ({
  locale,
  communities,
  communitiesLoading,
  Content,
  SubHeader,
  changeSorting,
  sorting,
  redirectToCreateCommunityDispatch,
  route,
  profile,
}) => {
  const { t } = useTranslation();

  const keywords = useMemo(() => communities.map((x) => x.name), [communities]);

  const [displayLoadingIndicator] = useMemo(
    () => [communitiesLoading && route === routes.communities()],
    [communitiesLoading, route],
  );
  const unhiddenCommunities = communities.filter(
    (community) => !HIDDEN_COMMUNITIES_ID.includes(community.id),
  );

  return (
    <div className="d-xl-flex">
      {process.env.ENV !== 'dev' && (
        <Seo
          title={t('common.titleCommunities')}
          description={t('common.descriptionCommunities')}
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
          communitiesNumber={unhiddenCommunities?.length ?? 0}
          profile={profile}
        />

        <Content
          communities={unhiddenCommunities}
          sorting={sorting}
          locale={locale}
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
  communitiesLoading: PropTypes.bool,
  redirectToCreateCommunityDispatch: PropTypes.func,
  profile: PropTypes.object,
};

export default memo(
  compose(
    connect(
      createStructuredSelector({
        locale: makeSelectLocale(),
        communities: selectCommunities(),
        communitiesLoading: selectCommunitiesLoading(),
        profile: makeSelectProfileInfo(),
      }),
      (dispatch) => ({
        redirectToCreateCommunityDispatch: bindActionCreators(redirectToCreateCommunity, dispatch),
      }),
    ),
  )(Communities),
);
