import { AaveStyles } from './communities-configs/aave';
import { AnkrStyles } from './communities-configs/ankr';
import { CyberconnectStyles } from './communities-configs/cyberconnect';
import { DeveloperDAOStyles } from './communities-configs/developerDAO';
import { FilebaseStyles } from './communities-configs/filebase';
import { FilecoinStyles } from './communities-configs/filecoin';
import { ForceStyles } from './communities-configs/force';
import { FractalVisionsStyles } from './communities-configs/fractalVisions';
import { FunctionlandStyles } from './communities-configs/functionland';
import { HarmonyStyles } from './communities-configs/harmony';
import { IndexerDAOStyles } from './communities-configs/indexerDAO';
import { KoiiStyles } from './communities-configs/koii';
import { LaunchpadStyles } from './communities-configs/launchpad';
import { Mark3dStyles } from './communities-configs/mark3d';
import { MintStateLabsStyles } from './communities-configs/mintStateLabs';
import { MoveStyles } from './communities-configs/move';
import { OrbisStyles } from './communities-configs/orbis';
import { PolygonStyles } from './communities-configs/polygon';
import { PolywrapStyles } from './communities-configs/polywrap';
import { SolidityStyles } from './communities-configs/solidity';
import { SuiStyles } from './communities-configs/sui';
import { SuiGlobalStyles } from './communities-configs/suiGlobal';
import { ValistStyles } from './communities-configs/valist';
import { VyperStyles } from './communities-configs/vyper';

const communitiesConfig = {
  prod: {
    1: {
      origin: 'https://meta.peeranha.io',
    },
    2: {
      origin: 'https://functionland.peeranha.io',
      src: 'https://images.peeranha.io/communities/functionland/logo.svg',
      styles: FunctionlandStyles,
    },
    3: {
      origin: 'https://polygon.peeranha.io',
      src: 'https://images.peeranha.io/communities/polygon/logo.svg',
      styles: PolygonStyles,
    },
    4: {
      origin: 'https://filecoin.peeranha.io',
      src: 'https://images.peeranha.io/communities/filecoin/logo.svg',
      styles: FilecoinStyles,
    },
    6: {
      origin: 'https://koii.peeranha.io',
      src: 'https://images.peeranha.io/communities/koii/logo.svg',
      styles: KoiiStyles,
    },
    7: {
      origin: 'https://filebase.peeranha.io',
      src: 'https://images.peeranha.io/communities/filebase/logo.svg',
      styles: FilebaseStyles,
    },
    8: {
      origin: 'https://polywrap.peeranha.io',
      src: 'https://images.peeranha.io/communities/polywrap/logo.svg',
      styles: PolywrapStyles,
    },
    9: {
      origin: 'https://cyberconnect.peeranha.io',
      src: 'https://images.peeranha.io/communities/cyberconnect/logo.svg',
      styles: CyberconnectStyles,
    },
    10: {
      origin: 'https://valist.peeranha.io',
      src: 'https://images.peeranha.io/communities/valist/logo.svg',
      styles: ValistStyles,
    },
    11: {
      origin: 'https://suiglobal.peeranha.io',
      src: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',
      styles: SuiGlobalStyles,
    },
    12: {
      origin: 'https://mintstatelabs.peeranha.io',
      src: 'https://images.peeranha.io/communities/mintStateLabs/logo.svg',
      styles: MintStateLabsStyles,
    },
    13: {
      origin: 'https://aave.peeranha.io',
      src: 'https://images.peeranha.io/communities/aave/logo.svg',
      styles: AaveStyles,
    },
    14: {
      origin: 'https://solidity.peeranha.io',
      src: 'https://images.peeranha.io/communities/solidity/logo.svg',
      styles: SolidityStyles,
    },
    15: {
      origin: 'https://ankr.peeranha.io',
      src: 'https://images.peeranha.io/communities/ankr/logo.svg',
      styles: AnkrStyles,
    },
    16: {
      origin: 'https://force.peeranha.io',
      src: 'https://images.peeranha.io/communities/force/logo.svg',
      styles: ForceStyles,
    },
    17: {
      origin: 'https://vyper.peeranha.io',
      src: 'https://images.peeranha.io/communities/vyper/logo.svg',
      styles: VyperStyles,
    },
    18: {
      origin: 'https://mark3d.peeranha.io',
      src: 'https://images.peeranha.io/communities/mark3d/logo.svg',
      styles: Mark3dStyles,
    },
    19: {
      origin: 'https://orbis.peeranha.io',
      src: 'https://images.peeranha.io/communities/orbis/logo.svg',
      styles: OrbisStyles,
    },
    20: {
      origin: 'https://fractalvisions.peeranha.io',
      src: 'https://images.peeranha.io/communities/fractalVisions/logo.svg',
      styles: FractalVisionsStyles,
    },
    21: {
      origin: 'https://move.peeranha.io',
      src: 'https://images.peeranha.io/communities/move/logo.svg',
      styles: MoveStyles,
    },
    22: {
      origin: 'https://developerdao.peeranha.io',
      src: 'https://images.peeranha.io/communities/communityDAO/logo.svg',
      styles: DeveloperDAOStyles,
    },
    23: {
      origin: 'https://pl-launchpad.peeranha.io',
      src: 'https://images.peeranha.io/communities/launchpad/logo.svg',
      styles: LaunchpadStyles,
    },
  },
  staging: {
    1: {
      origin: 'https://demo-harmony.testpeeranha.io',
      src: 'https://images.peeranha.io/communities/harmony/logo.svg',
      styles: HarmonyStyles,
    },
    2: {
      origin: 'https://demo-msl.testpeeranha.io',
      src: 'https://images.peeranha.io/communities/mintStateLabs/logo.svg',
      styles: MintStateLabsStyles,
    },
    3: {
      origin: `https://demo-ankr.testpeeranha.io`,
      src: 'https://images.peeranha.io/communities/ankr/logo.svg',
      styles: AnkrStyles,
    },
    4: {
      origin: 'https://demo-fxland.testpeeranha.io',
      src: 'https://images.peeranha.io/communities/functionland/logo.svg',
      styles: FunctionlandStyles,
    },
    5: {
      origin: 'https://demo-mintstatelabs.peeranha.io',
      src: 'https://images.peeranha.io/communities/mintStateLabs/logo.svg',
      styles: MintStateLabsStyles,
    },
    6: {
      origin: 'https://demo-sui.testpeeranha.io',
      src: 'https://images.peeranha.io/communities/sui/logo.svg',
      styles: SuiStyles,
    },
  },
  test: {
    1: {
      origin: `https://mintstatelabs${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/functionland/logo.svg',
      styles: FunctionlandStyles,
    },
    2: {
      origin: `https://suiglobal${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',
      styles: SuiGlobalStyles,
    },
    3: {
      origin: `https://indexerdao${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/indexerDAO/logo.jpg',
      styles: IndexerDAOStyles,
    },
    4: {
      origin: `https://aave${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/aave/logo.svg',
      styles: AaveStyles,
    },
    5: {
      origin: `https://solidity${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/solidity/logo.svg',
      styles: SolidityStyles,
    },
    6: {
      origin: `https://vyper${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/vyper/logo.svg',
      styles: VyperStyles,
    },
    7: {
      origin: `https://ankr${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/ankr/logo.svg',
      styles: AnkrStyles,
    },
    8: {
      origin: `https://force${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/force/logo.svg',
      styles: ForceStyles,
    },
    9: {
      origin: `https://mark3d${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/mark3d/logo.svg',
      styles: Mark3dStyles,
    },
    10: {
      origin: `https://move${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/move/logo.svg',
      styles: MoveStyles,
    },
    11: {
      origin: `https://orbis${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/orbis/logo.svg',
      styles: OrbisStyles,
    },
    12: {
      origin: `https://fractalvisions${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/fractalVisions/logo.svg',
      styles: FractalVisionsStyles,
    },
    16: {
      origin: `https://polygon${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/polygon/logo.svg',
      styles: PolygonStyles,
    },
    17: {
      origin: `https://developerdao${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/communityDAO/logo.svg',
      styles: DeveloperDAOStyles,
    },
    18: {
      origin: `https://pl-launchpad${process.env.COOKIE_DOMAIN}`,
      src: 'https://images.peeranha.io/communities/launchpad/logo.svg',
      styles: LaunchpadStyles,
    },
  },
  dev: {
    1: {
      origin: 'http://localhost:3000',
      // src: 'https://images.peeranha.io/communities/functionland/functionland-logo.svg',
      // styles: FunctionlandStyles,
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

export const googleVerificationConfig = googleSiteVerificationsConfig[process.env.ENV];

export default communitiesConfig[process.env.ENV];
