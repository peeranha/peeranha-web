import OntLogo from 'images/communities-logos/ont.svg?inline';
import TelosLogo from 'images/communities-logos/telos.png';

const communitiesConfig = {
  prod: {
    2: {
      origin: 'https://telos.peeranha.io',
      src: TelosLogo,
    },
    3: {
      origin: 'https://ont.peeranha.io',
      src: OntLogo,
    },
  },
  test: {
    2: {
      origin: 'https://blockchain-test.peeranha.io',
      src: OntLogo,
    },
  },
  dev: {
    2: {
      origin: 'http://localhost:3000',
      src: OntLogo,
    },
  },
};

export default communitiesConfig[process.env.ENV];
