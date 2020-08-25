import OntLogo from './communities-configs/ont/images/ont.svg?inline';
import TelosLogo from './communities-configs/telos/images/telos-logo-dark.svg?inline';

import { TelosStyles } from './communities-configs/telos';
import { OntStyles } from './communities-configs/ont';

const communitiesConfig = {
  prod: {
    2: {
      origin: 'https://faq.telos.net',
      src: TelosLogo,
      styles: TelosStyles,
      officialSite: 'https://telos.net',
    },
    3: {
      origin: 'https://ont.peeranha.io',
      src: OntLogo,
      styles: OntStyles,
      officialSite: 'https://ont.io',
    },
  },
  test: {
    1: {
      origin: 'https://community.testpeeranha.io',
      officialSite: 'https://blockchain.com',
    },
    2: {
      origin: 'https://telos.testpeeranha.io',
      officialSite: 'https://telos.net',
      src: TelosLogo,
      styles: TelosStyles,
    },
    3: {
      origin: 'https://ont.testpeeranha.io',
      officialSite: 'https://ont.io',
      src: OntLogo,
      styles: OntStyles,
    },
  },
  dev: {
    3: {
      origin: 'http://localhost:3000',
      officialSite: 'https://en.wikipedia.org/wiki/Alpaca',
    },
  },
};

export default communitiesConfig[process.env.ENV];
