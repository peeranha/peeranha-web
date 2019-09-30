import React from 'react';
import PropTypes from 'prop-types';

import { LEFT_MENU_ID } from './constants';

import AdditionalLinks from './AdditionalLinks';
import MobileLinksInWallet from './MobileLinksInWallet';
import MainLinks from './MainLinks';
import MobileLinksInProfile from './MobileLinksInProfile';
import MobileAdditionalLinks from './MobileAdditionalLinks';
import MobileAutorizationButtons from './MobileAutorizationButtons';
import { ViewStyled } from './Styles';

const View = ({ profile, isMenuVisible, balance, showLoginModal }) => (
  <ViewStyled id={LEFT_MENU_ID} isMenuVisible={isMenuVisible}>
    <MobileAutorizationButtons
      profile={profile}
      isMenuVisible={isMenuVisible}
      showLoginModal={showLoginModal}
    />

    <MobileLinksInProfile profile={profile} isMenuVisible={isMenuVisible} />

    <MobileLinksInWallet
      profile={profile}
      isMenuVisible={isMenuVisible}
      balance={balance}
    />

    <MobileAdditionalLinks profile={profile} isMenuVisible={isMenuVisible} />

    <MainLinks profile={profile} />

    <AdditionalLinks />
  </ViewStyled>
);

View.propTypes = {
  profile: PropTypes.object,
  balance: PropTypes.number,
  isMenuVisible: PropTypes.bool,
  showLoginModal: PropTypes.func,
};

export default View;
