import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ProfileDropdown from './ProfileDropdown';
import WalletDropdown from './WalletDropdown';
import EnergyDropdown from './EnergyDropdown';
import NotificationsDropdown from './NotificationsDropdown';

const ButtonGroupForAuthorizedUser = ({
  profileInfo,
  faqQuestions,
  isSearchFormVisible,
}) => {
  return (
    <React.Fragment>
      {!isSearchFormVisible && <NotificationsDropdown />}
      <EnergyDropdown
        rating={profileInfo.rating}
        energy={profileInfo.energy}
        faqQuestions={faqQuestions}
      />
      {/* TODO: return if Wallet will be needed in production */}
      {/* <WalletDropdown */}
      {/*  user={profileInfo.user} */}
      {/*  balance={profileInfo.availableBalance} */}
      {/*  boost={profileInfo.boost} */}
      {/* /> */}
      <ProfileDropdown profileInfo={profileInfo} />
    </React.Fragment>
  );
};

ButtonGroupForAuthorizedUser.propTypes = {
  profileInfo: PropTypes.object,
  faqQuestions: PropTypes.array,
  isSearchFormVisible: PropTypes.bool,
};

export default memo(ButtonGroupForAuthorizedUser);
