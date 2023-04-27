import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';
import InfoButton from 'components/Button/Outlined/InfoMedium';

import { singleCommunityStyles } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/sui/sui';
const styles = singleCommunityStyles();

const ButtonGroupForNotAuthorizedUser = ({ loginWithWallet, isFollowButton = false }) => {
  const wallet = useWallet();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (wallet.connected) {
      setShowModal(false);
      loginWithWallet(wallet.address);
    }
  }, [wallet.connected]);

  const { t } = useTranslation();

  if (isSuiBlockchain) {
    return (
      <ConnectModal
        open={showModal}
        onOpenChange={(open) => {
          if (wallet.connected) return;
          setShowModal(open);
        }}
      >
        {!isFollowButton ? (
          <LargeOutlinedButton
            className="d-none d-sm-flex"
            onClick={showModal}
            customStyles={styles.headerLoginButtonStyles}
          >
            {t('common.login')}
          </LargeOutlinedButton>
        ) : (
          <InfoButton onClick={showModal}>{t('common.followCommunity.subscribe')}</InfoButton>
        )}
      </ConnectModal>
    );
  }

  return (
    <>
      <LargeOutlinedButton
        className="d-none d-sm-flex"
        onClick={loginWithWallet}
        customStyles={styles.headerLoginButtonStyles}
      >
        {t('common.login')}
      </LargeOutlinedButton>
    </>
  );
};

ButtonGroupForNotAuthorizedUser.propTypes = {
  loginWithWallet: PropTypes.func,
  isMenuVisible: PropTypes.bool,
};

export default React.memo(ButtonGroupForNotAuthorizedUser);
