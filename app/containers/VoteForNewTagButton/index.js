/**
 *
 * VoteForNewTagButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { DAEMON } from 'utils/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectVoteForNewTagButton from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { upVote, downVote } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class VoteForNewTagButton extends React.PureComponent {
  upVote = () => {
    const { communityId, tagId, buttonId } = this.props;
    this.props.upVoteDispatch(communityId, tagId, buttonId);
  };

  downVote = () => {
    const { communityId, tagId, buttonId } = this.props;
    this.props.downVoteDispatch(communityId, tagId, buttonId);
  };

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

VoteForNewTagButton.propTypes = {
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tagId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  buttonId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  votefornewtagbutton: makeSelectVoteForNewTagButton(),
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
