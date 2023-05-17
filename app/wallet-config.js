import peeranhaLogo from 'images/currencyPeer.svg?inline';

export const WALLETS = {
  PEERANHA: {
    name: 'Peeranha Wallet',
    logo: peeranhaLogo,
    isMobile: true,
    doNotShowName: false,
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
    wallets: [WALLETS.PEERANHA],
  },
};
