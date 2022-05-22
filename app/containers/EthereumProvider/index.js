import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';
import { redirectRoutesForSCM } from 'routes-config';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import LoadingIndicator from 'components/LoadingIndicator/HeightWidthCentered';

import { initEthereum } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectEthereum, makeSelectInitializing } from './selectors';
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets,
} from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import torusModule from '@web3-onboard/torus';
import logo from 'images/LogoBlackOnboard.svg?inline';
import communitiesConfig from '../../communities-config';

const injected = injectedModule();
const coinbase = coinbaseModule();
const walletConnect = walletConnectModule();
const torus = torusModule({
  buttonPosition: 'bottom-right',
});
const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();

const src = styles.withoutSubHeader ? communitiesConfig[single].src : logo;

const initWeb3Onboard = init({
  wallets: [torus, injected, walletConnect, coinbase],
  chains: [
    {
      id: '0x13881',
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: process.env.ETHEREUM_NETWORK,
    },
  ],
  accountCenter: {
    desktop: {
      enabled: false,
    },
  },
  appMetadata: {
    name: 'Peeranha',
    icon: src,
    description: 'Knowledge sharing protocol for Web3',
    agreement: {
      version: '1.0.0',
      termsUrl: `${process.env.APP_LOCATION}/terms-and-conditions/`,
      privacyUrl: `${process.env.APP_LOCATION}/privacy-policy/`,
    },
  },
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          sidebar: {
            paragraph:
              'Connecting your wallet is like "logging in" to Web3. Not sure where to start? Select Torus wallet to log in with email, Google, or social media account.',
          },
        },
      },
    },
  },
});

export const EthereumProvider = ({
  children,
  initEthereumDispatch,
  initializing,
  ethereum,
}) => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();
  const [web3Onboard, setWeb3Onboard] = useState(null);

  useEffect(
    () => {
      if (ethereum) {
        ethereum.setData({
          wallet,
          connectedWallets,
          web3Onboard,
          connectedChain,
        });
      }
    },
    [wallet, connectedWallets, web3Onboard],
  );

  const sendProps = {
    connect,
    disconnect,
    setChain,
    connectedChain,
  };

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);
    const { pathname, hash } = window.location;
    const single = isSingleCommunityWebsite();
    if (single && pathname !== '/') {
      if (redirectRoutesForSCM.find(route => route.startsWith(pathname))) {
        const path =
          process.env.ENV === 'dev'
            ? `https://testpeeranha.io${pathname}${hash}`
            : `${process.env.APP_LOCATION}${pathname}${hash}`;
        window.open(path, '_parent');
      } else initEthereumDispatch(sendProps);
    } else {
      initEthereumDispatch(sendProps);
    }
  }, []);

  return (
    <div>{!initializing && ethereum ? children : <LoadingIndicator />}</div>
  );
};

EthereumProvider.propTypes = {
  initEthereum: PropTypes.func,
  children: PropTypes.element,
  initializing: PropTypes.bool,
  ethereum: PropTypes.object,
};

const withConnect = connect(
  createStructuredSelector({
    initializing: makeSelectInitializing(),
    ethereum: makeSelectEthereum(),
  }),
  dispatch => ({
    initEthereumDispatch: bindActionCreators(initEthereum, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'ethereumProvider', reducer });
const withSaga = injectSaga({ key: 'ethereumProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EthereumProvider);
