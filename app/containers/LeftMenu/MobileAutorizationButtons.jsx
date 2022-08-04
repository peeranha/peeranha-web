import React from 'react';
import { useTranslation } from 'react-i18next';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';

const MobileAutorizationButtons = ({
  profile,
  isMenuVisible,
  showLoginModal,
}) => {
  const { t } = useTranslation();

  if (profile || !isMenuVisible) {
    return null;
  }

  return (
    <div className="d-flex align-items-center">
      <LargeOutlinedButton onClick={showLoginModal}>
        {t('common.login')}
      </LargeOutlinedButton>
    </div>
  );
};

export default MobileAutorizationButtons;
