import React from 'react';
import { useTranslation } from 'react-i18next';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';
import { styles } from 'containers/LeftMenu/MainLinks.styled';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

const singleCommId = isSingleCommunityWebsite();

const MobileAutorizationButtons = ({ profile, isMenuVisible, showLoginModal }) => {
  const { t } = useTranslation();

  if (profile || !isMenuVisible) {
    return null;
  }

  return (
    <div className="d-flex align-items-center">
      <LargeOutlinedButton
        css={{ ...styles.logInButton, ...(singleCommId && styles.mb28) }}
        onClick={showLoginModal}
      >
        {t('common.login')}
      </LargeOutlinedButton>
    </div>
  );
};

export default MobileAutorizationButtons;
