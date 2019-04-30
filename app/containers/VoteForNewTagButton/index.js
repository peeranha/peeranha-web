/**
 *
 * VoteForNewTagButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { DAEMON } from 'utils/constants';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectSuggestedTags } from 'containers/Tags/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import { upVote, downVote } from './actions';

import { UPVOTE_METHOD, DOWNVOTE_METHOD } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class VoteForNewTagButton extends React.PureComponent {
  [UPVOTE_METHOD] = () => {
    const { communityId, tagId, buttonId } = this.props;
    this.props.upVoteDispatch(communityId, tagId, buttonId);
  };

  [DOWNVOTE_METHOD] = () => {
    const { communityId, tagId, buttonId } = this.props;
    this.props.downVoteDispatch(communityId, tagId, buttonId);
  };

  render() /* istanbul ignore next */ {
    const { tagId, clickMethod, render, suggestedTags, account } = this.props;

    const tag = suggestedTags.filter(x => x.id === +tagId)[0];

    if (!tag) return null;

    const isUpvoted = tag.upvotes.includes(account);
    const isDownvoted = tag.downvotes.includes(account);

    return render({
      upvotesNumber: tag.upvotes.length,
      downvotesNumber: tag.downvotes.length,
      isUpvoted,
      isDownvoted,
      onClick: this[clickMethod],
    });
  }
}

VoteForNewTagButton.propTypes = {
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tagId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  buttonId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
  suggestedTags: PropTypes.array,
  account: PropTypes.string,
  clickMethod: PropTypes.string,
  render: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  suggestedTags: selectSuggestedTags(),
  account: makeSelectAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    upVoteDispatch: (communityId, tagId, buttonId) =>
      dispatch(upVote(communityId, tagId, buttonId)),
    downVoteDispatch: (communityId, tagId, buttonId) =>
      dispatch(downVote(communityId, tagId, buttonId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'voteForNewTagButton', reducer });
const withSaga = injectSaga({ key: 'voteForNewTagButton', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VoteForNewTagButton);
