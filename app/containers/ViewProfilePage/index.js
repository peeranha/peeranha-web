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

/* eslint-disable react/prefer-stateless-function */
export class ViewProfilePage extends React.Component {
  render() {
    const { profile, match, account } = this.props;

    const sendProps = {
      profile,
      match,
      account,
    };

    return (
      <Profile userId={match.params.id}>
        <ProfileViewForm {...sendProps} />
      </Profile>
    );
  }
}

ViewProfilePage.propTypes = {
  dispatch: PropTypes.func,
  profile: PropTypes.object,
  userKey: PropTypes.string,
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
