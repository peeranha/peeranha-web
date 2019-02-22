import React from 'react';
import Profile from './Profile';

const UserProfileNav = /* istanbul ignore next */ ({
  profileInfo,
  isMenuVisible,
  expandLeftMenuNavigation,
}) => [
  <Profile
    key="UserProfileNav"
    isMenuVisible={isMenuVisible}
    profileInfo={profileInfo}
    expandLeftMenuNavigation={expandLeftMenuNavigation}
  />,
];

export default React.memo(UserProfileNav);
