import telosWallet from 'images/telosWallet.svg?inline';
import sqrlWallet from 'images/sqrlWallet.svg?inline';
import peeranhaLogo from 'images/currencyPeer.svg?inline';
import scatterLogo from 'images/scatterLogo.svg?inline';
import wombatLogo from 'images/wombat.png';

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
  WOMBAT: {
    name: 'Wombat',
    logo: wombatLogo,
  },
  SCATTER_SQRL_WOMBAT: {
    name: 'Scatter/Sqrl/Wombat',
    names: ['', 'Sqrl', ''],
    logo: [scatterLogo, sqrlWallet, wombatLogo],
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
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER_SQRL_WOMBAT],
  },
  TLOS: {
    name: 'TLOS',
    symbol: 'TLOS',
    precision: 4,
    contractAccount: 'eosio.token',
    blockchain: 'Telos',
    logo: telosWallet,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER_SQRL_WOMBAT],
  },
  SQRL: {
    name: 'SQRL',
    symbol: 'SQRL',
    precision: 4,
    contractAccount: 'sqrlwalletio',
    blockchain: 'Telos',
    logo: sqrlWallet,
    wallets: [WALLETS.PEERANHA, WALLETS.SCATTER_SQRL_WOMBAT],
  },
};
