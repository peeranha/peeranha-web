import OntLogo from './communities-configs/ont/images/ont.svg?inline';
import FileiconLogo from './communities-configs/filecoin/images/filecoin-logo.svg?inline';
import TelosLogo from './communities-configs/telos/images/telos-logo-dark.svg?inline';
import PolygonLogo from './communities-configs/polygon/images/polygon-logo.svg?inline';
import KandaLogo from './communities-configs/kanda/images/kanda.jpg';

import { TelosStyles } from './communities-configs/telos';
import { PolygonStyles } from './communities-configs/polygon';
import { OntStyles } from './communities-configs/ont';
import { KandaStyles } from './communities-configs/kanda';
import { BloggerStyles } from './communities-configs/blogger';
import { FilecoinStyles } from './communities-configs/filecoin';

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
      origin: 'https://filecoin.testpeeranha.io',
      src: FileiconLogo,
      styles: FilecoinStyles,
    },
    3: {
      origin: 'https://polygon.testpeeranha.io',
      src: PolygonLogo,
      styles: PolygonStyles,
    },
    4: {
      origin: 'https://testcommunity.net',
    },
    // 5: {
    //   origin: 'https://kanda.testpeeranha.io',
    //   src: KandaLogo,
    //   styles: KandaStyles,
    // },
    // 6: {
    //   origin: 'https://bloggerdemo.testpeeranha.io',
    //   styles: BloggerStyles,
    // },
    // 10: {
    //   origin: 'https://ivan.testpeeranha.io',
    //   styles: BloggerStyles,
    // },
  },
  dev: {
    3: {
      origin: 'http://localhost:3100',
    },
  },
};

const googleSiteVerificationsConfig = {
  prod: {
    default: {
      formKey: 'AIzaSyA8OYoejHkhBWJnokE78JYndPY8M-4eN7U',
      engineKey: '012465490266412806753:wrajkcmcuob',
    },
    communities: {
      2: {
        formKey: 'AIzaSyCrGz9Gka40bQB3bjpqJwtTvGgpYYONb3s',
        engineKey: '8fc630517bd41e792',
      },
      3: {
        formKey: 'AIzaSyBEpmAAnxKwBc0D9MdVoZLUvWpN5fFrH5o',
        engineKey: '6cccae3655f3b04b0',
      },
      17: {
        formKey: 'AIzaSyAYkH1ZE_FXu3hFOFxQHmnxdEHzfChY4fM',
        engineKey: '08e10a06b882913c9',
      },
    },
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
      5: {
        formKey: 'AIzaSyBcJ5Lgy7Xr2NjVTzFc6ggLJcKWTDJ0dNo',
        engineKey: 'ce8d08fa7ebd09609',
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
