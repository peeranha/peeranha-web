import OntLogo from 'images/ont.svg?inline';

const PROD_ONT_ID = 10001111;

const TEST_BLOCKCHAIN_ID = 2;

export default {
  [PROD_ONT_ID]: {
    src: OntLogo,
    origin: 'http://localhost:3001',
  },

  [TEST_BLOCKCHAIN_ID]: {
    src: OntLogo,
    origin: 'https://blockchain-test.peeranha.io',
  },
};
