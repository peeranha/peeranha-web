import OntLogo from './communities-configs/ont/images/ont.svg?inline';
import TelosLogo from './communities-configs/telos/images/telos-logo-light.svg?inline';

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
    },
    2: {
      origin: 'https://community1-test.peeranha.io/',
      src: TelosLogo,
      styles: TelosStyles,
    },
    3: {
      origin: 'https://community2-test.peeranha.io/',
      src: OntLogo,
      styles: OntStyles,
    },
  },
  dev: {
    1: {
      origin: 'http://localhost:3000',
    },
  },
};

export default communitiesConfig[process.env.ENV];
