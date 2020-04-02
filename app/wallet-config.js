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
  SCATTER_SQRL: {
    names: ['Scatter', 'Sqrl'],
    logo: [peeranhaLogo, sqrlWallet],
  },
};

export const CURRENCIES = {
  PEER: {
    name: 'PEER',
    symbol: 'PEER',
    precision: 6,
    contractAccount: 'peeranhatken',
    blockchain: 'Telos',
    logo: peeranhaLogo,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER_SQRL],
  },
  TLOS: {
    name: 'TLOS',
    symbol: 'TLOS',
    precision: 6,
    contractAccount: 'peeranhatken',
    blockchain: 'Telos',
    logo: telosWallet,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER_SQRL],
  },
  SQRL: {
    name: 'SQRL',
    symbol: 'SQRL',
    precision: 6,
    contractAccount: 'peeranhatken',
    blockchain: 'Telos',
    logo: sqrlWallet,
    wallets: [WALLETS.PEERANHA, WALLETS.SQRL],
  },
};

export const CURRENCIES_VALUES = Object.values(CURRENCIES);
