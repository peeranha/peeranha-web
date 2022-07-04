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
import { selectIds } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class FollowCommunityButton extends React.PureComponent {
  followHandler = e => {
    e.preventDefault();

    const isFollowed = JSON.parse(e.currentTarget.dataset.isfollowed);
    const { communityIdFilter } = this.props;

    this.props.followHandlerDispatch(
      communityIdFilter,
      isFollowed,
      e.currentTarget.id,
    );
  };

  render() /* istanbul ignore next */ {
    const { communityIdFilter, followedCommunities, render, ids } = this.props;
    const id = `follow_community_${communityIdFilter}`;
    const disabled = ids.includes(id);

    const isFollowed = followedCommunities
      ? followedCommunities.includes(communityIdFilter)
      : false;

    return render({
      isFollowed,
      onClick: this.followHandler,
      id,
      disabled,
    });
  }
}

FollowCommunityButton.propTypes = {
  communityIdFilter: PropTypes.number,
  followedCommunities: PropTypes.array,
  ids: PropTypes.array,
  followHandlerDispatch: PropTypes.func,
  render: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  followedCommunities: makeSelectFollowedCommunities(),
  ids: selectIds(),
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
  disableEject: true,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FollowCommunityButton);
