import '@suiet/wallet-kit/style.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';

import { singleCommunityStyles } from 'utils/communityManagement';

const styles = singleCommunityStyles();

const ButtonGroupForNotAuthorizedUser = ({ loginWithWallet }) => {
  const { t } = useTranslation();

  const buttonWithLogin = (clickHandler) => (
    <LargeOutlinedButton
      className="d-none d-sm-flex"
      onClick={() => {
        ReactGA.event({
          category: 'Users',
          action: 'login_button_pushed',
        });
        clickHandler();
      }}
      customStyles={styles.headerLoginButtonStyles}
    >
      {t('common.login')}
    </LargeOutlinedButton>
  );

  return <>{buttonWithLogin(loginWithWallet)}</>;
};

ButtonGroupForNotAuthorizedUser.propTypes = {
  loginWithWallet: PropTypes.func,
  actionButtonWithLogin: PropTypes.func,
  isLoginButton: PropTypes.bool,
};

export default React.memo(ButtonGroupForNotAuthorizedUser);
