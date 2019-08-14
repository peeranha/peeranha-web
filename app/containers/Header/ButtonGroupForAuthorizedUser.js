import React from 'react';
import PropTypes from 'prop-types';

import ProfileDropdown from './ProfileDropdown';
import WalletDropdown from './WalletDropdown';

const ButtonGroupForAuthorizedUser = /* istanbul ignore next */ ({
  profileInfo,
  isMenuVisible,
  expandLeftMenuNavigation,
}) => (
  <React.Fragment>
    <WalletDropdown
      isMenuVisible={isMenuVisible}
      profileInfo={profileInfo}
      expandLeftMenuNavigation={expandLeftMenuNavigation}
    />
    <ProfileDropdown
      isMenuVisible={isMenuVisible}
      profileInfo={profileInfo}
      expandLeftMenuNavigation={expandLeftMenuNavigation}
    />
  </React.Fragment>
);

ButtonGroupForAuthorizedUser.propTypes = {
  profileInfo: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  expandLeftMenuNavigation: PropTypes.func,
};

export default React.memo(ButtonGroupForAuthorizedUser);
