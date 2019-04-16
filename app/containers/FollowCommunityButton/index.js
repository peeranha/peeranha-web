/**
 *
 * FollowCommunityButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';

import { followHandler } from 'containers/ReusableLogic/actions';

/* eslint-disable react/prefer-stateless-function */
export class FollowCommunityButton extends React.PureComponent {
  followHandler = e => {
    e.preventDefault();

    const isFollowed = JSON.parse(e.currentTarget.dataset.isfollowed);
    const { communityIdFilter } = this.props;

    this.props.followHandlerDispatch(communityIdFilter, isFollowed);
  };

  render() /* istanbul ignore next */ {
    const { communityIdFilter, followedCommunities, render } = this.props;

    const isFollowed = followedCommunities
      ? followedCommunities.includes(communityIdFilter)
      : false;

    return render({ isFollowed, onClick: this.followHandler });
  }
}

FollowCommunityButton.propTypes = {
  communityIdFilter: PropTypes.number,
  followedCommunities: PropTypes.array,
  followHandlerDispatch: PropTypes.func,
  render: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  followedCommunities: makeSelectFollowedCommunities(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    dispatch,
    followHandlerDispatch: (communityIdFilter, isFollowed) =>
      dispatch(followHandler(communityIdFilter, isFollowed)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowCommunityButton);
