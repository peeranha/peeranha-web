import React from 'react';
import PropTypes from 'prop-types';

import ProfileDropdown from './ProfileDropdown';
import WalletDropdown from './WalletDropdown';
import EnergyDropdown from './EnergyDropdown';

const ButtonGroupForAuthorizedUser = ({
  profileInfo,
  isMenuVisible,
  expandLeftMenuNavigation,
}) => (
  <React.Fragment>
    <EnergyDropdown rating={profileInfo.rating} energy={profileInfo.energy} />
    <WalletDropdown
      isMenuVisible={isMenuVisible}
      user={profileInfo.user}
      balance={profileInfo.balance}
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
