import React from 'react';
import PropTypes from 'prop-types';

import UserNavigation from 'components/UserNavigation';

import MainUserInformation from './MainUserInformation';
import AdditionalUserInformation from './AdditionalUserInformation';

const ProfileViewForm = ({ profile, account, userId }) => (
  <div>
    <UserNavigation userId={userId} account={account} />
    <MainUserInformation profile={profile} />
    <AdditionalUserInformation profile={profile} />
  </div>
);

ProfileViewForm.propTypes = {
  profile: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
};

export default ProfileViewForm;
