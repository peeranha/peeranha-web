import OntLogo from 'images/communities-logos/ont.svg?inline';
import TelosLogo from 'images/communities-logos/telos.png';

import { TelosStyles } from './communities-configs/telos';
import { OntStyles } from './communities-configs/ont';

const communitiesConfig = {
  prod: {
    2: {
      origin: 'https://telos.peeranha.io',
      src: TelosLogo,
      styles: TelosStyles,
    },
    3: {
      origin: 'https://ont.peeranha.io',
      src: OntLogo,
      styles: OntStyles,
    },
  },
  test: {
    1: {
      origin: 'https://blockchain-test.peeranha.io',
      src: TelosLogo,
      styles: TelosStyles,
    },
  },
  dev: {
    1: {
      origin: 'http://localhost:3000',
      src: OntLogo,
      styles: OntStyles,
    },
  },
};

export default communitiesConfig[process.env.ENV];
