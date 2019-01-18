/**
 *
 * FollowCommunityButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';

import { followHandler } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { FOLLOW_BUTTON, UNFOLLOW_BUTTON } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class FollowCommunityButton extends React.Component {
  followHandler = e => {
    const isFollowed = JSON.parse(e.currentTarget.dataset.isfollowed);
    const { communityIdFilter } = this.props;

    this.props.followHandlerDispatch(communityIdFilter, isFollowed);
  };

  render() {
    const { communityIdFilter, followedCommunities } = this.props;

    if (!followedCommunities) return null;

    const isFollowed = followedCommunities.includes(communityIdFilter);

    return (
      <button
        className="btn btn-secondary ml-1"
        data-isfollowed={isFollowed}
        onClick={this.followHandler}
      >
        <FormattedMessage
          {...messages[isFollowed ? UNFOLLOW_BUTTON : FOLLOW_BUTTON]}
        />
      </button>
    );
  }
}

FollowCommunityButton.propTypes = {
  communityIdFilter: PropTypes.number.isRequired,
  followedCommunities: PropTypes.array.isRequired,
  followHandlerDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  followedCommunities: makeSelectFollowedCommunities(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    followHandlerDispatch: (communityIdFilter, isFollowed) =>
      dispatch(followHandler(communityIdFilter, isFollowed)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'followCommunityButton', reducer });
const withSaga = injectSaga({ key: 'followCommunityButton', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FollowCommunityButton);
