import React from 'react';
import Profile from './Profile';

const UserProfileNav = ({
  profileInfo,
  isMenuVisible,
  expandLeftMenuNavigation,
}) => [
  <Profile
    isMenuVisible={isMenuVisible}
    profileInfo={profileInfo}
    expandLeftMenuNavigation={expandLeftMenuNavigation}
  />,
];

export default React.memo(UserProfileNav);
