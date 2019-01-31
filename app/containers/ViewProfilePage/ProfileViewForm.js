import React from 'react';
import PropTypes from 'prop-types';

// import {
//  DISPLAY_NAME_FIELD,
//  POSITION_FIELD,
//  COMPANY_FIELD,
//  ABOUT_FIELD,
//  LOCATION_FIELD,
// } from 'containers/Profile/constants';

import UserNavigation from 'components/UserNavigation';
// import ViewFormListItem from './ViewFormListItem';

const ProfileViewForm = ({ profile, account, userId }) => (
  <div>
    <UserNavigation userId={userId} account={account} />
    {console.log(profile)}
    {/* {props.profile.ipfs_avatar && (
        <div className="d-flex justify-content-center">
          <img
            className="profile-image"
            src={props.profile.ipfs_avatar}
            alt=""
          />
        </div>
      )}
      <ViewFormListItem
        label={messages.displayNameLabel}
        message={profile && profile[DISPLAY_NAME_FIELD]}
      />
      <ViewFormListItem
        label={messages.positionLabel}
        message={profile && profile[POSITION_FIELD]}
      />
      <ViewFormListItem
        label={messages.companyLabel}
        message={profile && profile[COMPANY_FIELD]}
      />
      <ViewFormListItem
        label={messages.aboutLabel}
        message={profile && profile[ABOUT_FIELD]}
      />
      <ViewFormListItem
        label={messages.locationLabel}
        message={
          profile && profile[LOCATION_FIELD] && profile[LOCATION_FIELD].name
        }
      />
      <EditProfileButton account={account} userId={userId} />
      
      */}
  </div>
);

ProfileViewForm.propTypes = {
  profile: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
};

export default ProfileViewForm;
