import { ConnectModal, useWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import notificationsReducer from 'components/Notifications/reducer';
import reducer from 'containers/Login/reducer';
import saga from 'containers/Login/saga';
import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { DAEMON } from 'utils/constants';
import { getCookie, setCookie } from 'utils/cookie';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

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

export default compose(
  injectReducer({ key: 'login', reducer: notificationsReducer }),
  injectReducer({ key: 'login', reducer }),
  injectSaga({ key: 'login', saga, mode: DAEMON }),
)(SuiConnectModals);
