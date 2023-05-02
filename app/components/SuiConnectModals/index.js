import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SuiConnectModals = ({ loginWithWallet, actionButtonWithLogin }) => {
  const wallet = useWallet();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (wallet.connected) {
      setShowModal(false);
      loginWithWallet(wallet.address);
    }
  }, [wallet.connected]);

  return (
    <ConnectModal
      open={showModal}
      onOpenChange={(open) => {
        if (wallet.connected) return;
        setShowModal(open);
      }}
    >
      {actionButtonWithLogin(showModal)}
    </ConnectModal>
  );
};

SuiConnectModals.propTypes = {
  loginWithWallet: PropTypes.func,
  actionButtonWithLogin: PropTypes.func,
};

export default SuiConnectModals;
