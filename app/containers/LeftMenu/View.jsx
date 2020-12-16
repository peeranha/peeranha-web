import React from 'react';
import PropTypes from 'prop-types';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { LEFT_MENU_ID } from './constants';

import AdditionalLinks from './AdditionalLinks';
import MobileLinksInWallet from './MobileLinksInWallet';
import MainLinks from './MainLinks';
import MobileLinksInProfile from './MobileLinksInProfile';
import MobileAdditionalLinks from './MobileAdditionalLinks';
import MobileAutorizationButtons from './MobileAutorizationButtons';
import { ViewStyled } from './Styles';
import MobileSubHeader from './MobileSubHeader';

const single = isSingleCommunityWebsite();

const View = ({
  profile,
  isMenuVisible,
  balance,
  showLoginModal,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
}) => (
  <ViewStyled id={LEFT_MENU_ID} single={single} isMenuVisible={isMenuVisible}>
    {single && isMenuVisible ? <MobileSubHeader profile={!!profile} /> : null}

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
      stakedInCurrentPeriod={stakedInCurrentPeriod}
      stakedInNextPeriod={stakedInNextPeriod}
    />

    <MobileAdditionalLinks profile={profile} isMenuVisible={isMenuVisible} />

    <MainLinks profile={profile} />

    <AdditionalLinks />
  </ViewStyled>
);

View.propTypes = {
  profile: PropTypes.object,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  isMenuVisible: PropTypes.bool,
  showLoginModal: PropTypes.func,
};

export default View;
