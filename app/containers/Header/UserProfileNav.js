import React from 'react';

import Notification from './Notification';
import Profile from './Profile';

const UserProfileNav = ({ profileInfo }) => [
  <Notification />,
  <Profile profileInfo={profileInfo} />,
];

export default UserProfileNav;
