import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';
import { redirectRoutesForSCM } from 'routes-config';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import LoadingIndicator from 'components/LoadingIndicator/HeightWidthCentered';

import reducer from 'containers/EthereumProvider/reducer';
import saga from 'containers/EthereumProvider/saga';
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
import { makeSelectEthereum, makeSelectInitializing } from './selectors';
import { addToast } from '../Toast/actions';
import {
  initEthereum,
  showModal,
  transactionCompleted,
  transactionFailed,
  transactionInPending,
  transactionInitialised,
} from './actions';
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
      id: `0x${Number(process.env.CHAIN_ID).toString(16)}`,
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
  showModalDispatch,
  transactionInPendingDispatch,
  transactionCompletedDispatch,
  waitForConfirmDispatch,
  transactionFailedDispatch,
  initializing,
  ethereum,
  addToast,
}) => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();
  const [web3Onboard, setWeb3Onboard] = useState(null);

  // TODO: After updating react to 17v and above use lib for recaptcha (e.g. react-google-recaptcha-v3)
  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        script.onload = () => {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    loadScriptByURL(
      'recaptcha-key',
      `https://www.google.com/recaptcha/api.js?render=${
        process.env.RECAPTCHA_SITE_KEY
      }`,
      () => {
        console.log('Script loaded!');
      },
    );
  }, []);

  const getRecaptchaToken = useCallback(
    () =>
      window.grecaptcha.execute(process.env.RECAPTCHA_SITE_KEY, {
        action: 'homepage',
      }),
    [window.grecaptcha],
  );

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
    getRecaptchaToken,
    showModalDispatch,
    transactionInPendingDispatch,
    transactionCompletedDispatch,
    transactionFailedDispatch,
    waitForConfirmDispatch,
    addToast,
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
  children: PropTypes.element,
  initializing: PropTypes.bool,
  ethereum: PropTypes.object,
  addToast: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    initializing: makeSelectInitializing(),
    ethereum: makeSelectEthereum(),
  }),
  dispatch => ({
    initEthereumDispatch: bindActionCreators(initEthereum, dispatch),
    showModalDispatch: bindActionCreators(showModal, dispatch),
    transactionInPendingDispatch: bindActionCreators(
      transactionInPending,
      dispatch,
    ),
    transactionCompletedDispatch: bindActionCreators(
      transactionCompleted,
      dispatch,
    ),
    transactionFailedDispatch: bindActionCreators(transactionFailed, dispatch),
    waitForConfirmDispatch: bindActionCreators(
      transactionInitialised,
      dispatch,
    ),
    addToast: bindActionCreators(addToast, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'ethereumProvider', reducer });
const withSaga = injectSaga({ key: 'ethereumProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EthereumProvider);
