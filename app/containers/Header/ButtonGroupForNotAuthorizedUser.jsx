import '@suiet/wallet-kit/style.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';
import SuiConnectModals from 'components/SuiConnectModals';

import { singleCommunityStyles } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/sui/sui';

const styles = singleCommunityStyles();

const ButtonGroupForNotAuthorizedUser = ({ loginWithWallet }) => {
  const { t } = useTranslation();

  const buttonWithLogin = (clickHandler) => (
    <LargeOutlinedButton
      className="d-none d-sm-flex"
      onClick={clickHandler}
      customStyles={styles.headerLoginButtonStyles}
    >
      {t('common.login')}
    </LargeOutlinedButton>
  );

  if (isSuiBlockchain) {
    return (
      <SuiConnectModals loginWithWallet={loginWithWallet} actionButtonWithLogin={buttonWithLogin} />
    );
  }

  return <>{buttonWithLogin(loginWithWallet)}</>;
};

ButtonGroupForNotAuthorizedUser.propTypes = {
  loginWithWallet: PropTypes.func,
  actionButtonWithLogin: PropTypes.func,
  isLoginButton: PropTypes.bool,
};

export default React.memo(ButtonGroupForNotAuthorizedUser);
