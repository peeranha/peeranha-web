import hexWallet from 'images/hexWallet.svg?inline';
import telosWallet from 'images/telosWallet.svg?inline';
import sqrlWallet from 'images/sqrlWallet.svg?inline';
import peeranhaLogo from 'images/currencyPeer.svg?inline';

export const WALLETS = {
  PEERANHA: {
    name: 'Peeranha Wallet',
    logo: peeranhaLogo,
  },
  SCATTER: {
    name: 'Scatter',
    logo: peeranhaLogo,
  },
  SQRL: {
    name: 'Sqrl',
    logo: sqrlWallet,
  },
};

export const CURRENCIES = {
  PEER: {
    name: 'PEER',
    symbol: 'PEER',
    precision: 6,
    contractAccount: 'peeranha',
    blockchain: 'Telos',
    logo: peeranhaLogo,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER, WALLETS.SQRL],
  },
  TLOS: {
    name: 'TLOS',
    symbol: 'TLOS',
    precision: 6,
    contractAccount: 'peeranha',
    blockchain: 'Telos',
    logo: telosWallet,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER, WALLETS.SQRL],
  },
  SQRL: {
    name: 'SQRL',
    symbol: 'SQRL',
    precision: 6,
    contractAccount: 'peeranha',
    blockchain: 'Telos',
    logo: sqrlWallet,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER, WALLETS.SQRL],
  },
  HEART: {
    name: 'HEART',
    symbol: 'HEART',
    precision: 6,
    contractAccount: 'peeranha',
    blockchain: 'Telos',
    logo: hexWallet,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER, WALLETS.SQRL],
  },
};

export const CURRENCIES_VALUES = Object.values(CURRENCIES);
