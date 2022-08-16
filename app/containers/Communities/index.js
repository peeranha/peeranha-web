import React, { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { redirectToCreateCommunity } from 'containers/CreateCommunity/actions';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import Seo from 'components/Seo';

import {
  selectSuggestedCommunities,
  selectSuggestedCommunitiesLoading,
  selectIsLastFetch,
} from './selectors';

import { getSuggestedCommunities } from './actions';
import reducer from './reducer';
import saga from './saga';

import Header from './Header';

export const Communities = ({
  locale,
  communities,
  communitiesLoading,
  suggestedCommunities,
  suggestedCommunitiesLoading,
  isLastFetch,
  Content,
  SubHeader,
  changeSorting,
  sorting,
  redirectToCreateCommunityDispatch,
  route,
  getSuggestedCommunitiesDispatch,
  profile,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    getSuggestedCommunitiesDispatch();
  }, []);

  const keywords = useMemo(() => communities.map(x => x.name), [communities]);

  const [displayLoadingIndicator] = useMemo(
    () => [
      (communitiesLoading && route === routes.communities()) ||
        (suggestedCommunitiesLoading &&
          route === routes.suggestedCommunities()),
    ],
    [communitiesLoading, route, suggestedCommunitiesLoading],
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
          communitiesNumber={communities?.length ?? 0}
          profile={profile}
        />

        <Content
          suggestedCommunities={suggestedCommunities}
          suggestedCommunitiesLoading={suggestedCommunitiesLoading}
          getSuggestedCommunities={getSuggestedCommunitiesDispatch}
          isLastFetch={isLastFetch}
          communities={communities}
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
  suggestedCommunities: PropTypes.array,
  locale: PropTypes.string,
  route: PropTypes.string,
  sorting: PropTypes.object,
  changeSorting: PropTypes.func,
  SubHeader: PropTypes.any,
  Content: PropTypes.any,
  suggestedCommunitiesLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  communitiesLoading: PropTypes.bool,
  getSuggestedCommunitiesDispatch: PropTypes.func,
  redirectToCreateCommunityDispatch: PropTypes.func,
  profile: PropTypes.object,
};

export default memo(
  compose(
    injectReducer({ key: 'communities', reducer }),
    injectSaga({ key: 'communities', saga, mode: DAEMON }),
    connect(
      createStructuredSelector({
        locale: makeSelectLocale(),
        communities: selectCommunities(),
        communitiesLoading: selectCommunitiesLoading(),
        profile: makeSelectProfileInfo(),
        suggestedCommunities: selectSuggestedCommunities(),
        suggestedCommunitiesLoading: selectSuggestedCommunitiesLoading(),
        isLastFetch: selectIsLastFetch(),
      }),
      dispatch => ({
        redirectToCreateCommunityDispatch: bindActionCreators(
          redirectToCreateCommunity,
          dispatch,
        ),
        getSuggestedCommunitiesDispatch: bindActionCreators(
          getSuggestedCommunities,
          dispatch,
        ),
      }),
    ),
  )(Communities),
);
