import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCookie, setCookie } from 'utils/cookie';

const SuiConnectModals = ({ loginWithWallet, actionButtonWithLogin }) => {
  const wallet = useWallet();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const previouslyConnectedWallet = getCookie('connectedWallet');
    if (wallet.connected && previouslyConnectedWallet) {
      setShowModal(false);
      loginWithWallet(wallet.address);
    }
  }, [wallet.connected]);

  return (
    <ConnectModal
      open={showModal}
      onOpenChange={(open) => {
        setCookie({
          name: 'connectedWallet',
          value: wallet.name,
        });
        if (wallet.connected) {
          wallet.disconnect().then(() => setShowModal(open));
        }
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
