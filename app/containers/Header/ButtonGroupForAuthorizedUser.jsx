import React from 'react';
import PropTypes from 'prop-types';

import ProfileDropdown from './ProfileDropdown';
import WalletDropdown from './WalletDropdown';
import EnergyDropdown from './EnergyDropdown';

const ButtonGroupForAuthorizedUser = ({ profileInfo, faqQuestions }) => (
  <React.Fragment>
    <EnergyDropdown
      rating={profileInfo.rating}
      energy={profileInfo.energy}
      faqQuestions={faqQuestions}
    />
    <WalletDropdown user={profileInfo.user} balance={profileInfo.balance} />
    <ProfileDropdown profileInfo={profileInfo} />
  </React.Fragment>
);

ButtonGroupForAuthorizedUser.propTypes = {
  profileInfo: PropTypes.object,
  faqQuestions: PropTypes.array,
};

export default React.memo(ButtonGroupForAuthorizedUser);
