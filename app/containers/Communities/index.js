import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as routes from 'routes-config';
import { isSingleCommunityWebsite, singleSubcommunity } from 'utils/communityManagement';
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
import { HIDDEN_COMMUNITIES_ID, SUBCOMMUNITY_IDS_ARRAY } from './constants';

const isSingleMode = isSingleCommunityWebsite();
const subcommunityIds = singleSubcommunity();

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
  isSubCommunity,
}) => {
  const { t } = useTranslation();

  const keywords = useMemo(() => communities.map((x) => x.name), [communities]);

  const [displayLoadingIndicator] = useMemo(
    () => [
      communitiesLoading && (route === routes.communities() || route === routes.subcommunities()),
    ],
    [communitiesLoading, route],
  );

  const notHiddenCommunities = communities.filter((community) =>
    isSingleMode
      ? subcommunityIds.includes(community.id)
      : ![...HIDDEN_COMMUNITIES_ID, ...SUBCOMMUNITY_IDS_ARRAY].includes(community.id),
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
          communitiesNumber={notHiddenCommunities?.length ?? 0}
          profile={profile}
          isSubCommunity={isSubCommunity}
        />

        <Content
          communities={notHiddenCommunities}
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
  isSubCommunity: PropTypes.bool,
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
