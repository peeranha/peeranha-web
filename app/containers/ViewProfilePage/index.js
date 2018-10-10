/**
 *
 * ViewProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Profile from 'containers/Profile';
import * as selectorsProfile from 'containers/Profile/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import ProfileViewForm from './ProfileViewForm';

/* eslint-disable react/prefer-stateless-function */
export class ViewProfilePage extends React.Component {
  render() {
    const { profile, isOwner, match } = this.props;

    const sendProps = {
      profile,
      isOwner,
      match,
    };

    return (
      <Profile>
        <ProfileViewForm {...sendProps} />
      </Profile>
    );
  }
}

ViewProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isOwner: selectorsProfile.selectIsOwner(),
  profile: selectorsProfile.selectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'viewProfilePage', reducer });
const withSaga = injectSaga({ key: 'viewProfilePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewProfilePage);
