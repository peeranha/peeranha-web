/**
 *
 * VoteForNewCommunityButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { DAEMON } from 'utils/constants';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectSuggestedCommunities } from 'containers/Communities/selectors';

import { upVote, downVote } from './actions';
import reducer from './reducer';
import saga from './saga';

import { UPVOTE_METHOD, DOWNVOTE_METHOD } from './constants';
import { selectIds } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class VoteForNewCommunityButton extends React.PureComponent {
  [UPVOTE_METHOD] = (e) => {
    const { communityId, upVoteDispatch } = this.props;
    upVoteDispatch(communityId, e.currentTarget.id);
  };

  [DOWNVOTE_METHOD] = (e) => {
    const { communityId, downVoteDispatch } = this.props;
    downVoteDispatch(communityId, e.currentTarget.id);
  };

  render() /* istanbul ignore next */ {
    const {
      communityId,
      clickMethod,
      render,
      suggestedCommunities,
      account,
      ids,
    } = this.props;

    const community = suggestedCommunities.filter(
      (x) => x.id === +communityId,
    )[0];

    if (!community) return null;

    const isUpvoted = community.upvotes.includes(account);
    const isDownvoted = community.downvotes.includes(account);

    const id = `vote-comm-${clickMethod}-${communityId}`;
    const disabled = ids.includes(id);

    return render({
      upvotesNumber: community.upvotes.length,
      downvotesNumber: community.downvotes.length,
      isUpvoted,
      isDownvoted,
      onClick: this[clickMethod],
      disabled,
      id,
    });
  }
}

VoteForNewCommunityButton.propTypes = {
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  clickMethod: PropTypes.string,
  render: PropTypes.func,
  suggestedCommunities: PropTypes.array,
  account: PropTypes.string,
  ids: PropTypes.array,
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  suggestedCommunities: selectSuggestedCommunities(),
  account: makeSelectAccount(),
  ids: selectIds(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    upVoteDispatch: bindActionCreators(upVote, dispatch),
    downVoteDispatch: bindActionCreators(downVote, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'voteForNewCommunityButton',
  reducer,
});

const withSaga = injectSaga({
  key: 'voteForNewCommunityButton',
  saga,
  mode: DAEMON,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VoteForNewCommunityButton);
