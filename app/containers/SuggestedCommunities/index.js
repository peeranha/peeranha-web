/**
 *
 * SuggestedCommunities
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getSuggestedCommunities, upVote, downVote } from './actions';

import SuggestedCommunitiesView from './SuggestedCommunitiesView';

/* eslint-disable react/prefer-stateless-function */
export class SuggestedCommunities extends React.Component {
  componentDidMount() {
    this.props.getSuggestedCommunitiesDispatch();
  }

  upVote = ev => {
    const { id, dataset } = ev.currentTarget;
    const { communityid } = dataset;
    this.props.upVoteDispatch(communityid, id);
  };

  downVote = ev => {
    const { id, dataset } = ev.currentTarget;
    const { communityid } = dataset;
    this.props.downVoteDispatch(communityid, id);
  };

  render() {
    const { communities, communitiesLoading, locale } = this.props;

    return (
      <div className="container">
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        {!communitiesLoading ? (
          <SuggestedCommunitiesView
            communities={communities}
            upVote={this.upVote}
            downVote={this.downVote}
          />
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

SuggestedCommunities.propTypes = {
  locale: PropTypes.string.isRequired,
  communities: PropTypes.array.isRequired,
  communitiesLoading: PropTypes.bool.isRequired,
  getSuggestedCommunitiesDispatch: PropTypes.func.isRequired,
  upVoteDispatch: PropTypes.func.isRequired,
  downVoteDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectors.selectCommunities(),
  communitiesLoading: selectors.selectCommunitiesLoading(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSuggestedCommunitiesDispatch: () => dispatch(getSuggestedCommunities()),
    upVoteDispatch: (communityid, buttonId) =>
      dispatch(upVote(communityid, buttonId)),
    downVoteDispatch: (communityid, buttonId) =>
      dispatch(downVote(communityid, buttonId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'suggestedCommunities', reducer });
const withSaga = injectSaga({ key: 'suggestedCommunities', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SuggestedCommunities);
