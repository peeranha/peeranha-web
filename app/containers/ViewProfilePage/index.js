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
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import TopCommunities from 'components/TopCommunities';

import ProfileViewForm from './ProfileViewForm';
import CommunitiesForm from './CommunitiesForm';

const ViewProfilePage = ({ match, profile, account, communities }) => (
  <Profile userId={match.params.id}>
    <ProfileViewForm
      userId={match.params.id}
      profile={profile}
      account={account}
    />

    <CommunitiesForm
      userId={match.params.id}
      profile={profile}
      account={account}
      communities={communities}
    />

    <TopCommunities
      userId={match.params.id}
      account={account}
      communities={communities}
      profile={profile}
    />
  </Profile>
);

ViewProfilePage.propTypes = {
  profile: PropTypes.object,
  account: PropTypes.string,
  match: PropTypes.object,
  communities: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  profile: selectorsProfile.selectProfile(),
  account: makeSelectAccount(),
  communities: selectCommunities(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(ViewProfilePage);
