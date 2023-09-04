import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';
import { styles } from 'containers/LeftMenu/MainLinks.styled';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/sui/sui';
import SuiConnectModals from 'components/SuiConnectModals';

const singleCommId = isSingleCommunityWebsite();

const MobileAutorizationButtons = ({ profile, isMenuVisible, showLoginModal }) => {
  const { t } = useTranslation();

  if (profile || !isMenuVisible) {
    return null;
  }

  const buttonWithLogin = (onClick) => (
    <div css={styles.logInButtonContainer}>
      <LargeOutlinedButton
        css={{ ...styles.logInButton, ...(singleCommId && styles.mb28) }}
        onClick={onClick}
      >
        {t('common.login')}
      </LargeOutlinedButton>
    </div>
  );

  if (isSuiBlockchain) {
    return (
      <SuiConnectModals loginWithWallet={showLoginModal} actionButtonWithLogin={buttonWithLogin} />
    );
  }

  return <>{buttonWithLogin(showLoginModal)}</>;
};

MobileAutorizationButtons.propTypes = {
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  showLoginModal: PropTypes.func,
};

export default MobileAutorizationButtons;
