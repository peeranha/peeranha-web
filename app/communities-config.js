import OntLogo from 'images/ont.svg?inline';

const communitiesConfig = {
  prod: {
    2: {
      origin: 'https://ontology.peeranha.io',
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
      origin: 'http://localhost:13000',
      src: OntLogo,
    },
  },
};

export default communitiesConfig[process.env.ENV];
