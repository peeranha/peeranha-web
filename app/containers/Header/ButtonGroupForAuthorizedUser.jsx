import React from 'react';
import PropTypes from 'prop-types';

import ProfileDropdown from './ProfileDropdown';
import WalletDropdown from './WalletDropdown';
import EnergyDropdown from './EnergyDropdown';

const ButtonGroupForAuthorizedUser = ({ profileInfo }) => (
  <React.Fragment>
    <EnergyDropdown rating={profileInfo.rating} energy={profileInfo.energy} />
    <WalletDropdown user={profileInfo.user} balance={profileInfo.balance} />
    <ProfileDropdown profileInfo={profileInfo} />
  </React.Fragment>
);

ButtonGroupForAuthorizedUser.propTypes = {
  profileInfo: PropTypes.object,
};

export default React.memo(ButtonGroupForAuthorizedUser);
