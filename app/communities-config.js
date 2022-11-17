import FileiconLogo from './communities-configs/filecoin/images/filecoin-logo.svg?inline';
import PolygonLogo from './communities-configs/polygon/images/polygon-logo.svg?inline';
import FunctionlandLogo from './communities-configs/functionland/images/functionland-logo.svg?inline';
import MintStateLabsLogo from './communities-configs/mintStateLabs/images/MSL-LogoMain.svg?inline';
import SuiLogo from './communities-configs/sui/images/sui-logo.svg?inline';
import SuiGlobalLogo from './communities-configs/suiGlobal/images/suiGlobal.svg?inline';
import FilebaseLogo from './communities-configs/filebase/images/filebaselogo.svg?inline';
import HarmonyLogo from './communities-configs/harmony/images/harmony-logo.svg?inline';
import KoiiLogo from './communities-configs/koii/images/koii-logo.svg?inline';
import CyberconnectLogo from './communities-configs/cyberconnect/images/CyberConnect_logo.svg?inline';
import PolywrapLogo from './communities-configs/polywrap/images/polywrap-horizontal.svg?inline';
import ValistLogo from './communities-configs/valist/images/valist.svg?inline';
import IndexerDAOLogo from './communities-configs/indexerDAO/images/svgviewerNew.jpg';
import VyperLogo from './communities-configs/vyper/images/vyperLogoFlat1.svg?inline';

import { PolygonStyles } from './communities-configs/polygon';
import { FilecoinStyles } from './communities-configs/filecoin';
import { FunctionlandStyles } from './communities-configs/functionland';
import { MintStateLabsStyles } from './communities-configs/mintStateLabs';
import { SuiStyles } from './communities-configs/sui';
import { FilebaseStyles } from './communities-configs/filebase';
import { HarmonyStyles } from './communities-configs/harmony';
import { KoiiStyles } from './communities-configs/koii';
import { CyberconnectStyles } from './communities-configs/cyberconnect';
import { PolywrapStyles } from './communities-configs/polywrap';
import { ValistStyles } from './communities-configs/valist';
import { SuiGlobalStyles } from './communities-configs/suiGlobal';
import { IndexerDAOStyles } from './communities-configs/indexerDAO';
import { VyperStyles } from './communities-configs/vyper';

const communitiesConfig = {
  prod: {
    1: {
      origin: 'https://meta.peeranha.io',
    },
    2: {
      origin: 'https://functionland.peeranha.io',
      src: FunctionlandLogo,
      styles: FunctionlandStyles,
    },
    3: {
      origin: 'https://polygon.peeranha.io',
      src: PolygonLogo,
      styles: PolygonStyles,
    },
    4: {
      origin: 'https://filecoin.peeranha.io',
      src: FileiconLogo,
      styles: FilecoinStyles,
    },
    6: {
      origin: 'https://koii.peeranha.io',
      src: KoiiLogo,
      styles: KoiiStyles,
    },
    7: {
      origin: 'https://filebase.peeranha.io',
      src: FilebaseLogo,
      styles: FilebaseStyles,
    },
    8: {
      origin: 'https://polywrap.peeranha.io',
      src: PolywrapLogo,
      styles: PolywrapStyles,
    },
    9: {
      origin: 'https://cyberconnect.peeranha.io',
      src: CyberconnectLogo,
      styles: CyberconnectStyles,
    },
    10: {
      origin: 'https://valist.peeranha.io',
      src: ValistLogo,
      styles: ValistStyles,
    },
    11: {
      origin: 'https://suiglobal.peeranha.io',
      src: SuiGlobalLogo,
      styles: SuiGlobalStyles,
    },
    12: {
      origin: 'https://mintstatelabs.peeranha.io',
      src: MintStateLabsLogo,
      styles: MintStateLabsStyles,
    },
  },
  staging: {
    1: {
      origin: 'https://demo-harmony.testpeeranha.io',
      src: HarmonyLogo,
      styles: HarmonyStyles,
    },
    2: {
      origin: 'https://demo-msl.testpeeranha.io',
      src: MintStateLabsLogo,
      styles: MintStateLabsStyles,
    },
    3: {
      origin: 'https://demo-filecoin.testpeeranha.io',
      src: FileiconLogo,
      styles: FilecoinStyles,
    },
    4: {
      origin: 'https://demo-fxland.testpeeranha.io',
      src: FunctionlandLogo,
      styles: FunctionlandStyles,
    },
    5: {
      origin: 'https://demo-mintstatelabs.peeranha.io',
      src: MintStateLabsLogo,
      styles: MintStateLabsStyles,
    },
    6: {
      origin: 'https://demo-sui.testpeeranha.io',
      src: SuiLogo,
      styles: SuiStyles,
    },
  },
  test: {
    1: {
      origin: `https://mintstatelabs${process.env.COOKIE_DOMAIN}`,
      src: MintStateLabsLogo,
      styles: MintStateLabsStyles,
    },
    2: {
      origin: `https://suiglobal${process.env.COOKIE_DOMAIN}`,
      src: SuiGlobalLogo,
      styles: SuiGlobalStyles,
    },
    3: {
      origin: `https://indexerdao${process.env.COOKIE_DOMAIN}`,
      src: IndexerDAOLogo,
      styles: IndexerDAOStyles,
    },
    // 1: {
    //   origin: `https://meta${process.env.COOKIE_DOMAIN}`,
    // },
    // 2: {
    //   origin: `https://polygon${process.env.COOKIE_DOMAIN}`,
    //   src: PolygonLogo,
    //   styles: PolygonStyles,
    // },
    // 3: {
    //   origin: `https://filecoin${process.env.COOKIE_DOMAIN}`,
    //   src: FileiconLogo,
    //   styles: FilecoinStyles,
    // },
    // 4: {
    //   origin: `https://community${process.env.COOKIE_DOMAIN}`,
    // },
    // 7: {
    //   origin: `https://fxland${process.env.COOKIE_DOMAIN}`,
    //   src: FunctionlandLogo,
    //   styles: FunctionlandStyles,
    // },
    // 10: {
    //   origin: `https://sui${process.env.COOKIE_DOMAIN}`,
    //   src: SuiLogo,
    //   styles: SuiStyles,
    // },
    // 12: {
    //   origin: `https://koii${process.env.COOKIE_DOMAIN}`,
    //   src: KoiiLogo,
    //   styles: KoiiStyles,
    // },
    // 13: {
    //   origin: `https://harmony${process.env.COOKIE_DOMAIN}`,
    //   src: HarmonyLogo,
    //   styles: HarmonyStyles,
    // },
    // 6: {
    //   origin: 'https://testcommunity.net',
    // },
    // 16: {
    //   origin: `https://filebase${process.env.COOKIE_DOMAIN}`,
    //   src: FilebaseLogo,
    //   styles: FilebaseStyles,
    // },
    // 17: {
    //   origin: `https://valist${process.env.COOKIE_DOMAIN}`,
    //   src: ValistLogo,
    //   styles: ValistStyles,
    // },
    // 18: {
    //   origin: `https://polywrap${process.env.COOKIE_DOMAIN}`,
    //   src: PolywrapLogo,
    //   styles: PolywrapStyles,
    // },
    // 19: {
    //   origin: `https://cyberconnect${process.env.COOKIE_DOMAIN}`,
    //   src: CyberconnectLogo,
    //   styles: CyberconnectStyles,
    // },
  },
  dev: {
    2: {
      origin: 'http://localhost:3000',
      src: VyperLogo,
      styles: VyperStyles,
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
