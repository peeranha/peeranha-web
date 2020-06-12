import telosWallet from 'images/telosWallet.svg?inline';
import sqrlWallet from 'images/sqrlWallet.svg?inline';
import peeranhaLogo from 'images/currencyPeer.svg?inline';
import scatterLogo from 'images/scatterLogo.svg?inline';

export const WALLETS = {
  PEERANHA: {
    name: 'Peeranha Wallet',
    logo: peeranhaLogo,
  },
  SCATTER: {
    name: 'Scatter',
    logo: scatterLogo,
  },
  SQRL: {
    name: 'Sqrl',
    logo: sqrlWallet,
  },
  SCATTER_SQRL: {
    name: 'Scatter/Sqrl',
    names: ['', 'Sqrl'],
    logo: [scatterLogo, sqrlWallet],
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
    precision: 4,
    contractAccount: 'eosio.token',
    blockchain: 'Telos',
    logo: telosWallet,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER_SQRL],
  },
  SQRL: {
    name: 'SQRL',
    symbol: 'SQRL',
    precision: 4,
    contractAccount: 'sqrlwalletio',
    blockchain: 'Telos',
    logo: sqrlWallet,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER_SQRL],
  },
};
