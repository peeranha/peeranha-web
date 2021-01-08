import OntLogo from './communities-configs/ont/images/ont.svg?inline';
import TelosLogo from './communities-configs/telos/images/telos-logo-dark.svg?inline';
import KandaLogo from './communities-configs/kanda/images/kanda.jpg';

import { TelosStyles } from './communities-configs/telos';
import { OntStyles } from './communities-configs/ont';
import { KandaStyles } from './communities-configs/kanda';
import { BloggerStyles } from './communities-configs/blogger';

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
    17: {
      origin: 'https://kanda.peeranha.io',
      src: KandaLogo,
      styles: KandaStyles,
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
    4: {
      origin: 'https://testcommunity.net',
    },
    5: {
      origin: 'https://kanda.testpeeranha.io',
      src: KandaLogo,
      styles: KandaStyles,
    },
    6: {
      origin: 'https://blogger.testpeeranha.io',
      isBloggerMod: true,
      styles: TelosStyles,
    },
  },
  dev: {
    3: {
      origin: 'http://localhost:3000',
      isBloggerMod: true,
      styles: BloggerStyles,
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
    communities: {
      1: {
        formKey: 'AIzaSyAdfxmajqH18qupbtTV361xhIMCj3gnXWo',
        engineKey: 'd9065fd30c7c4dd3e',
      },
      2: {
        formKey: 'AIzaSyCuOqi2jP7PqMS_e3rxWWbc69eo3BnEF8M',
        engineKey: '7afa8280bb505813e',
      },
      3: {
        formKey: 'AIzaSyCqvn3BIJHKIs5QX9XGFzPGnSvYAMv17hE',
        engineKey: 'dbdbdb5077be9fcbb',
      },
      4: {
        formKey: 'AIzaSyBqPKf_EfzpnbI-vb2yd6wLwyHn7XkN5BY',
        engineKey: '29ec0c27249bc1846',
      },
    },
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
