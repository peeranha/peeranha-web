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
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import ProfileViewForm from './ProfileViewForm';

const ViewProfilePage = ({ match, profile, account }) => (
  <Profile userId={match.params.id}>
    <ProfileViewForm
      userId={match.params.id}
      profile={profile}
      account={account}
    />
  </Profile>
);

ViewProfilePage.propTypes = {
  profile: PropTypes.object,
  account: PropTypes.string,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: selectorsProfile.selectProfile(),
  account: makeSelectAccount(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(ViewProfilePage);
