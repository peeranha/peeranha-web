/**
 *
 * Communities
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

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
import AsideBox from 'components/Base/Aside';
import Seo from 'components/Seo';

import {
  selectSuggestedCommunities,
  selectSuggestedCommunitiesLoading,
  selectIsLastFetch,
} from './selectors';

import { getSuggestedCommunities } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

import languages from './languagesOptions';

import Header from './Header';
import Banner from './Banner';

/* eslint indent: 0 */
/* eslint-disable react/prefer-stateless-function */
export class Communities extends React.PureComponent {
  state = {
    language: languages.all,
  };

  setLang = language => {
    this.setState({ language });
  };

  componentDidMount() {
    this.getSuggestedCommunities();
  }

  getSuggestedCommunities = () => {
    this.props.getSuggestedCommunitiesDispatch();
  };

  render() /* istanbul ignore next */ {
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
      redirectToCreateCommunityDispatch,
    } = this.props;

    const keywords = communities.map(x => x.name);

    return (
      <div className="d-xl-flex">
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
          keywords={keywords}
        />

        <div className="flex-xl-grow-1">
          <Header
            goToCreateCommunityScreen={redirectToCreateCommunityDispatch}
            SubHeader={SubHeader}
            changeSorting={changeSorting}
            sorting={sorting}
            communitiesNumber={communities ? communities.length : 0}
            setLang={this.setLang}
            language={this.state.language}
          />

          <Content
            suggestedCommunities={suggestedCommunities}
            suggestedCommunitiesLoading={suggestedCommunitiesLoading}
            getSuggestedCommunities={this.getSuggestedCommunities}
            isLastFetch={isLastFetch}
            communities={communities}
            sorting={sorting}
            locale={locale}
            language={this.state.language}
          />

          {(communitiesLoading || suggestedCommunitiesLoading) && (
            <LoadingIndicator />
          )}

          {!communitiesLoading &&
            !suggestedCommunitiesLoading && (
              <Banner
                goToCreateCommunityScreen={redirectToCreateCommunityDispatch}
              />
            )}
        </div>

        <AsideBox className="d-none d-xl-block">
          <Aside
            suggestedCommunities={suggestedCommunities}
            communities={communities}
          />
        </AsideBox>
      </div>
    );
  }
}

Communities.propTypes = {
  communities: PropTypes.array,
  suggestedCommunities: PropTypes.array,
  locale: PropTypes.string,
  sorting: PropTypes.object,
  changeSorting: PropTypes.func,
  SubHeader: PropTypes.any,
  Aside: PropTypes.any,
  Content: PropTypes.any,
  suggestedCommunitiesLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  communitiesLoading: PropTypes.bool,
  getSuggestedCommunitiesDispatch: PropTypes.func,
  redirectToCreateCommunityDispatch: PropTypes.func,
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

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    redirectToCreateCommunityDispatch: bindActionCreators(
      redirectToCreateCommunity,
      dispatch,
    ),
    getSuggestedCommunitiesDispatch: bindActionCreators(
      getSuggestedCommunities,
      dispatch,
    ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'communities', reducer });
const withSaga = injectSaga({ key: 'communities', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Communities);
