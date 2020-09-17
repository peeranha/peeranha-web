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
    },
    3: {
      origin: 'https://ont.peeranha.io',
      src: OntLogo,
      styles: OntStyles,
    },
  },
  test: {
    1: {
      origin: 'https://community.testpeeranha.io',
    },
    2: {
      origin: 'https://telos.testpeeranha.io',
      src: TelosLogo,
      styles: TelosStyles,
    },
    3: {
      origin: 'https://ont.testpeeranha.io',
      src: OntLogo,
      styles: OntStyles,
    },
  },
  dev: {
    3: {
      origin: 'http://localhost:3000',
    },
  },
};

const googleSiteVerificationsConfig = {
  prod: {
    default: {
      formKey: 'AIzaSyA8OYoejHkhBWJnokE78JYndPY8M-4eN7U',
      engineKey: '012465490266412806753:wrajkcmcuob',
    },
    communities: {},
  },
  test: {
    default: {
      formKey: 'AIzaSyC-hxNXz2D16rCXB6yVPf2FbMCqcKsq8A8',
      engineKey: '002220552224929577704:ip529aw0r_k',
    },
    communities: {},
  },
  dev: {
    default: {
      formKey: 'AIzaSyC-hxNXz2D16rCXB6yVPf2FbMCqcKsq8A8',
      engineKey: '002220552224929577704:ip529aw0r_k',
    },
    communities: {},
  },
};

export const googleVerificationConfig =
  googleSiteVerificationsConfig[process.env.ENV];

export default communitiesConfig[process.env.ENV];
