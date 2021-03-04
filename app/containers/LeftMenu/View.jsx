import React, { useEffect, useState } from 'react';
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
  boost,
}) => {
  const [currClientHeight, setClientHeight] = useState();

  useEffect(() => setClientHeight(document.documentElement.clientHeight), []);

  // change links display on window resize
  const windowResizeHandler = () =>
    setClientHeight(document.documentElement.clientHeight);

  useEffect(() => {
    window.addEventListener(`resize`, windowResizeHandler, false);
    return () => window.removeEventListener('resize', windowResizeHandler);
  }, []);
  return (
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
        boost={boost}
      />

      <MobileAdditionalLinks profile={profile} isMenuVisible={isMenuVisible} />

      <MainLinks profile={profile} currClientHeight={currClientHeight} />

      <AdditionalLinks currClientHeight={currClientHeight} />
    </ViewStyled>
  );
};

View.propTypes = {
  profile: PropTypes.object,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  boost: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  showLoginModal: PropTypes.func,
};

export default View;
