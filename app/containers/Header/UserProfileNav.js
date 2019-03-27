import React from 'react';
import PropTypes from 'prop-types';

import Profile from './Profile';

const UserProfileNav = /* istanbul ignore next */ ({
  profileInfo,
  isMenuVisible,
  expandLeftMenuNavigation,
}) => (
  <React.Fragment>
    <Profile
      isMenuVisible={isMenuVisible}
      profileInfo={profileInfo}
      expandLeftMenuNavigation={expandLeftMenuNavigation}
    />
  </React.Fragment>
);

UserProfileNav.propTypes = {
  profileInfo: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  expandLeftMenuNavigation: PropTypes.func,
};

export default React.memo(UserProfileNav);
