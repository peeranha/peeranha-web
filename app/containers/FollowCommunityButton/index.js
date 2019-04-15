/**
 *
 * FollowCommunityButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectFollowedCommunities } from 'containers/AccountProvider/selectors';

import { followHandler } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class FollowCommunityButton extends React.PureComponent {
  followHandler = e => {
    e.preventDefault();

    const isFollowed = JSON.parse(e.currentTarget.dataset.isfollowed);
    const { communityIdFilter } = this.props;

    this.props.followHandlerDispatch(communityIdFilter, isFollowed);
  };

  render() {
    const { communityIdFilter, followedCommunities, render } = this.props;

    if (!followedCommunities) return null;

    const isFollowed = followedCommunities.includes(communityIdFilter);

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
