/**
 *
 * VoteForNewTagButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { DAEMON } from 'utils/constants';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import { upVote, downVote } from './actions';

import { UPVOTE_METHOD, DOWNVOTE_METHOD } from './constants';
import { selectIds } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class VoteForNewTagButton extends React.PureComponent {
  [UPVOTE_METHOD] = e => {
    const { communityId, tagId } = this.props;
    this.props.upVoteDispatch(communityId, tagId, e.currentTarget.id);
  };

  [DOWNVOTE_METHOD] = e => {
    const { communityId, tagId } = this.props;
    this.props.downVoteDispatch(communityId, tagId, e.currentTarget.id);
  };

  render() /* istanbul ignore next */ {
    const {
      tagId,
      clickMethod,
      render,
      suggestedTags,
      account,
      ids,
    } = this.props;

    const tag = suggestedTags.filter(x => x.id === +tagId)[0];

    if (!tag) return null;

    const isUpvoted = tag.upvotes.includes(account);
    const isDownvoted = tag.downvotes.includes(account);

    const id = `vote-tag-${clickMethod}-${tagId}`;
    const disabled = ids.includes(id);

    return render({
      upvotesNumber: tag.upvotes.length,
      downvotesNumber: tag.downvotes.length,
      isUpvoted,
      isDownvoted,
      onClick: this[clickMethod],
      id,
      disabled,
    });
  }
}

VoteForNewTagButton.propTypes = {
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tagId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
  suggestedTags: PropTypes.array,
  ids: PropTypes.array,
  account: PropTypes.string,
  clickMethod: PropTypes.string,
  render: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  ids: selectIds(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    upVoteDispatch: bindActionCreators(upVote, dispatch),
    downVoteDispatch: bindActionCreators(downVote, dispatch),
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
