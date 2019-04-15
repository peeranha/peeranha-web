/**
 *
 * VoteForNewCommunityButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectSuggestedCommunities } from 'containers/Communities/selectors';

import { upVote, downVote } from './actions';
import reducer from './reducer';
import saga from './saga';

import { UPVOTE_METHOD, DOWNVOTE_METHOD } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class VoteForNewCommunityButton extends React.PureComponent {
  [UPVOTE_METHOD] = () => {
    const { communityId, id } = this.props;
    this.props.upVoteDispatch(communityId, id);
  };

  [DOWNVOTE_METHOD] = () => {
    const { communityId, id } = this.props;
    this.props.downVoteDispatch(communityId, id);
  };

  render() /* istanbul ignore next */ {
    const {
      communityId,
      clickMethod,
      render,
      suggestedCommunities,
      account,
    } = this.props;

    const community = suggestedCommunities.filter(
      x => x.id === +communityId,
    )[0];

    if (!community) return null;

    const isUpvoted = community.upvotes.includes(account);
    const isDownvoted = community.downvotes.includes(account);

    return render({
      upvotesNumber: community.upvotes.length,
      downvotesNumber: community.downvotes.length,
      isUpvoted,
      isDownvoted,
      onClick: this[clickMethod],
    });
  }
}

VoteForNewCommunityButton.propTypes = {
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  clickMethod: PropTypes.string,
  render: PropTypes.func,
  suggestedCommunities: PropTypes.array,
  account: PropTypes.string,
  id: PropTypes.string,
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  suggestedCommunities: selectSuggestedCommunities(),
  account: makeSelectAccount(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    dispatch,
    upVoteDispatch: (communityId, buttonId) =>
      dispatch(upVote(communityId, buttonId)),
    downVoteDispatch: (communityId, buttonId) =>
      dispatch(downVote(communityId, buttonId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'voteForNewCommunityButton',
  reducer,
});

const withSaga = injectSaga({ key: 'voteForNewCommunityButton', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VoteForNewCommunityButton);
