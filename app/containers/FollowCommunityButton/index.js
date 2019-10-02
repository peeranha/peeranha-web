/**
 *
 * FollowCommunityButton
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
    followHandlerDispatch: bindActionCreators(followHandler, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'followCommunityButton', reducer });
const withSaga = injectSaga({
  key: 'followCommunityButton',
  saga,
  mode: DAEMON,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FollowCommunityButton);
