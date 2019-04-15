/**
 *
 * Communities
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';

import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectCommunities,
  selectCommunitiesLoading,
} from 'containers/DataCacheProvider/selectors';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import BaseTransparent from 'components/Base/BaseTransparent';

import {
  selectSuggestedCommunities,
  selectSuggestedCommunitiesLoading,
  selectIsLastFetch,
} from './selectors';

import { createCommunityValidator } from './validate';
import { getSuggestedCommunities } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

import CommunitiesHeader from './CommunitiesHeader';
import NothingInterestingBanner from './NothingInterestingBanner';

/* eslint indent: 0 */
/* eslint-disable react/prefer-stateless-function */
export class Communities extends React.PureComponent {
  componentDidMount() {
    this.getSuggestedCommunities();
  }

  getSuggestedCommunities = () => {
    this.props.getSuggestedCommunitiesDispatch();
  };

  /* eslint consistent-return: 0 */
  goToCreateCommunityScreen = () => {
    const { profile, locale } = this.props;

    if (!profile) {
      this.props.showLoginModalDispatch();
      return null;
    }

    const isValid = createCommunityValidator(
      profile,
      translationMessages[locale],
    );

    if (!isValid) {
      return null;
    }

    createdHistory.push(routes.communitiesCreate());
  };

  render() {
    const {
      locale,
      communities,
      communitiesLoading,
      suggestedCommunities,
      suggestedCommunitiesLoading,
      isLastFetch,
      Content,
      Aside,
      SubHeader,
      changeSorting,
      sorting,
    } = this.props;

    return (
      <div className="d-flex justify-content-center">
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        <div
          className={`col-12 col-xl-${suggestedCommunities[0] ? 9 : 12} p-0`}
        >
          <CommunitiesHeader
            goToCreateCommunityScreen={this.goToCreateCommunityScreen}
            SubHeader={SubHeader}
            changeSorting={changeSorting}
            sorting={sorting}
            communitiesNumber={communities ? communities.length : 0}
          />

          <div className="my-3">
            <Content
              suggestedCommunities={suggestedCommunities}
              suggestedCommunitiesLoading={suggestedCommunitiesLoading}
              getSuggestedCommunities={this.getSuggestedCommunities}
              isLastFetch={isLastFetch}
              communities={communities}
              sorting={sorting}
              locale={locale}
            />
          </div>

          {(communitiesLoading || suggestedCommunitiesLoading) && (
            <LoadingIndicator />
          )}

          {isLastFetch && (
            <NothingInterestingBanner
              goToCreateCommunityScreen={this.goToCreateCommunityScreen}
            />
          )}
        </div>

        {suggestedCommunities[0] && (
          <BaseTransparent className="d-none d-xl-block col-xl-3 pr-0">
            <Aside
              suggestedCommunities={suggestedCommunities}
              communities={communities}
            />
          </BaseTransparent>
        )}
      </div>
    );
  }
}

Communities.propTypes = {
  communities: PropTypes.array,
  suggestedCommunities: PropTypes.array,
  locale: PropTypes.string,
  profile: PropTypes.object,
  sorting: PropTypes.object,
  showLoginModalDispatch: PropTypes.func,
  changeSorting: PropTypes.func,
  SubHeader: PropTypes.any,
  Aside: PropTypes.any,
  Content: PropTypes.any,
  suggestedCommunitiesLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  communitiesLoading: PropTypes.bool,
  getSuggestedCommunitiesDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  communitiesLoading: selectCommunitiesLoading(),
  profile: makeSelectProfileInfo(),
  suggestedCommunities: selectSuggestedCommunities(),
  suggestedCommunitiesLoading: selectSuggestedCommunitiesLoading(),
  isLastFetch: selectIsLastFetch(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showLoginModalDispatch: () => dispatch(showLoginModal()),
    getSuggestedCommunitiesDispatch: () => dispatch(getSuggestedCommunities()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'communities', reducer });
const withSaga = injectSaga({ key: 'communities', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Communities);
