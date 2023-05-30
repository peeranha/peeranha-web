import SuiConnectModals from 'components/SuiConnectModals';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';

const MobileAutorizationButtons = ({ profile, isMenuVisible, showLoginModal }) => {
  const { t } = useTranslation();

  if (profile || !isMenuVisible) {
    return null;
  }

  const buttonWithLogin = () => (
    <LargeOutlinedButton className="d-flex align-items-center" onClick={showLoginModal}>
      {t('common.login')}
    </LargeOutlinedButton>
  );

  return (
    <SuiConnectModals loginWithWallet={showLoginModal} actionButtonWithLogin={buttonWithLogin} />
  );
};

export default MobileAutorizationButtons;
