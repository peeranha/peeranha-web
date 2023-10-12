import { isSuiBlockchain } from 'utils/sui/sui';
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
import { SuiMainStyles } from './communities-configs/suiMain';
import { CartesiStyles } from './communities-configs/cartesi';
import { EdgewareStyles } from './communities-configs/edgeware';
import { SuiNSStyles } from './communities-configs/suiNS';

const communitiesConfig = {
  prod: isSuiBlockchain
    ? {
        1: {
          src: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',
          styles: SuiMainStyles,
        },
        '3-0x8feda08f11b31cb96d8ca75b1b100dca575438b54158631c829b4a1772eceea0': {
          origin: `https://cartesi${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/cartesi/logo.svg',
          styles: CartesiStyles,
        },
        '3-0xb44dbb445e89a75120188af82d83abec2dfbce87d9825edb38e10e3c2ed5f42e': {
          origin: `https://suins${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/suins/logo-2.svg',
          styles: SuiNSStyles,
        },
      }
    : {
        '1-1': {
          origin: 'https://meta.peeranha.io',
        },
        '1-2': {
          origin: 'https://functionland.peeranha.io',
          src: 'https://images.peeranha.io/communities/functionland/logo.svg',
          styles: FunctionlandStyles,
        },
        '1-3': {
          origin: 'https://polygon.peeranha.io',
          src: 'https://images.peeranha.io/communities/polygon/logo.svg',
          styles: PolygonStyles,
        },
        '1-4': {
          origin: 'https://filecoin.peeranha.io',
          src: 'https://images.peeranha.io/communities/filecoin/logo.svg',
          styles: FilecoinStyles,
        },
        '1-6': {
          origin: 'https://koii.peeranha.io',
          src: 'https://images.peeranha.io/communities/koii/logo.svg',
          styles: KoiiStyles,
        },
        '1-7': {
          origin: 'https://filebase.peeranha.io',
          src: 'https://images.peeranha.io/communities/filebase/logo.svg',
          styles: FilebaseStyles,
        },
        '1-8': {
          origin: 'https://polywrap.peeranha.io',
          src: 'https://images.peeranha.io/communities/polywrap/logo.svg',
          styles: PolywrapStyles,
        },
        '1-9': {
          origin: 'https://cyberconnect.peeranha.io',
          src: 'https://images.peeranha.io/communities/cyberconnect/logo.svg',
          styles: CyberconnectStyles,
        },
        '1-10': {
          origin: 'https://valist.peeranha.io',
          src: 'https://images.peeranha.io/communities/valist/logo.svg',
          styles: ValistStyles,
        },
        '1-11': {
          origin: 'https://suiglobal.peeranha.io',
          src: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',
          styles: SuiGlobalStyles,
        },
        '1-12': {
          origin: 'https://mintstatelabs.peeranha.io',
          src: 'https://images.peeranha.io/communities/mintStateLabs/logo.svg',
          styles: MintStateLabsStyles,
        },
        '1-13': {
          origin: 'https://aave.peeranha.io',
          src: 'https://images.peeranha.io/communities/aave/logo.svg',
          styles: AaveStyles,
        },
        '1-14': {
          origin: 'https://solidity.peeranha.io',
          src: 'https://images.peeranha.io/communities/solidity/logo.svg',
          styles: SolidityStyles,
        },
        '1-15': {
          origin: 'https://ankr.peeranha.io',
          src: 'https://images.peeranha.io/communities/ankr/logo.svg',
          styles: AnkrStyles,
        },
        '1-16': {
          origin: 'https://force.peeranha.io',
          src: 'https://images.peeranha.io/communities/force/logo.svg',
          styles: ForceStyles,
        },
        '1-17': {
          origin: 'https://vyper.peeranha.io',
          src: 'https://images.peeranha.io/communities/vyper/logo.svg',
          styles: VyperStyles,
        },
        '1-18': {
          origin: 'https://mark3d.peeranha.io',
          src: 'https://images.peeranha.io/communities/mark3d/logo.svg',
          styles: Mark3dStyles,
        },
        '1-19': {
          origin: 'https://orbis.peeranha.io',
          src: 'https://images.peeranha.io/communities/orbis/logo.svg',
          styles: OrbisStyles,
        },
        '1-20': {
          origin: 'https://fractalvisions.peeranha.io',
          src: 'https://images.peeranha.io/communities/fractalVisions/logo.svg',
          styles: FractalVisionsStyles,
        },
        '1-21': {
          origin: 'https://move.peeranha.io',
          src: 'https://images.peeranha.io/communities/move/logo.svg',
          styles: MoveStyles,
        },
        '1-22': {
          origin: 'https://developerdao.peeranha.io',
          src: 'https://images.peeranha.io/communities/communityDAO/logo.svg',
          styles: DeveloperDAOStyles,
        },
        '1-23': {
          origin: 'https://pl-launchpad.peeranha.io',
          src: 'https://images.peeranha.io/communities/launchpad/logo.svg',
          styles: LaunchpadStyles,
        },
        '2-1': {
          origin: 'https://edgeware.peeranha.io',
          src: 'https://images.peeranha.io/communities/edgeware/edgeware-logo.svg',
          styles: EdgewareStyles,
        },
      },
  staging: isSuiBlockchain
    ? {
        1: {
          src: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',
          styles: SuiMainStyles,
        },
        '3-0x305c327da8558d51395b3381509b6a03c8f4ce691feb3fa1579826f6f0e12803': {
          origin: `https://scm-sui-staging${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/suins/logo-2.svg',
          styles: SuiNSStyles,
        },
        // '3-0x176d1ff622ed604802c42ec15df79e67e1b97d9421f93ba1e77f19c569897b1d': {
        //   origin: `https://second-sui-staging${process.env.COOKIE_DOMAIN}`,
        //   src: 'https://images.peeranha.io/communities/move/logo.svg',
        //   styles: MoveStyles,
        // },
        '3-0xf42cfbc0ed7ec07d652d04dc5c5a4c3f053fa0cb83dc0edc9f371dd9abaf972b': {
          origin: `https://cartesi-sui-staging${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/cartesi/logo.svg',
          styles: CartesiStyles,
        },
      }
    : {
        '1-1': {
          origin: 'https://demo-harmony.testpeeranha.io',
          src: 'https://images.peeranha.io/communities/harmony/logo.svg',
          styles: HarmonyStyles,
        },
        '1-2': {
          origin: 'https://demo-msl.testpeeranha.io',
          src: 'https://images.peeranha.io/communities/mintStateLabs/logo.svg',
          styles: MintStateLabsStyles,
        },
        '1-4': {
          origin: 'https://demo-fxland.testpeeranha.io',
          src: 'https://images.peeranha.io/communities/functionland/logo.svg',
          styles: FunctionlandStyles,
        },
        '1-5': {
          origin: 'https://demo-mintstatelabs.peeranha.io',
          src: 'https://images.peeranha.io/communities/mintStateLabs/logo.svg',
          styles: MintStateLabsStyles,
        },
        '1-6': {
          origin: 'https://demo-sui.testpeeranha.io',
          src: 'https://images.peeranha.io/communities/sui/logo.svg',
          styles: SuiStyles,
        },
        '2-2': {
          origin: `https://demo-ankr.testpeeranha.io`,
          src: 'https://images.peeranha.io/communities/ankr/logo.svg',
          styles: AnkrStyles,
        },
      },
  test: isSuiBlockchain
    ? {
        1: {
          src: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',
          styles: SuiMainStyles,
        },
        '3-0x6320fa169fcf93bd30666e5612e799599ac6021fa59e84dab1d48fa120f56c47': {
          origin: `https://mark3d${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/mark3d/logo.svg',
          styles: Mark3dStyles,
        },
        '3-0x02e943bd6dd5ca34a8fdeb4f595f6c20bf8b529bdf03e830b0713ddc1f74d95c': {
          origin: `https://solidity${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/suins/logo-2.svg',
          styles: SuiNSStyles,
        },
        '3-0xf1ec216ce7573b9b7f625d1cb618374b94f241787919f35da28f93c416e55cc6': {
          origin: `https://cartesi${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/cartesi/logo.svg',
          styles: CartesiStyles,
        },
      }
    : {
        '1-1': {
          origin: `https://mintstatelabs${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/functionland/logo.svg',
          styles: FunctionlandStyles,
        },
        '1-2': {
          origin: `https://suiglobal${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',
          styles: SuiGlobalStyles,
        },
        '1-3': {
          origin: `https://indexerdao${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/indexerDAO/logo.jpg',
          styles: IndexerDAOStyles,
        },
        '1-4': {
          origin: `https://aave${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/aave/logo.svg',
          styles: AaveStyles,
        },
        '1-5': {
          origin: `https://solidity${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/solidity/logo.svg',
          styles: SolidityStyles,
        },
        '1-6': {
          origin: `https://vyper${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/vyper/logo.svg',
          styles: VyperStyles,
        },
        '1-7': {
          origin: `https://ankr${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/ankr/logo.svg',
          styles: AnkrStyles,
        },
        '1-8': {
          origin: `https://force${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/force/logo.svg',
          styles: ForceStyles,
        },
        '1-9': {
          origin: `https://mark3d${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/mark3d/logo.svg',
          styles: Mark3dStyles,
        },
        '1-10': {
          origin: `https://move${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/move/logo.svg',
          styles: MoveStyles,
        },
        '1-11': {
          origin: `https://orbis${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/orbis/logo.svg',
          styles: OrbisStyles,
        },
        '1-12': {
          origin: `https://fractalvisions${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/fractalVisions/logo.svg',
          styles: FractalVisionsStyles,
        },
        '1-16': {
          origin: `https://polygon${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/polygon/logo.svg',
          styles: PolygonStyles,
        },
        '1-17': {
          origin: `https://developerdao${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/communityDAO/logo.svg',
          styles: DeveloperDAOStyles,
        },
        '1-18': {
          origin: `https://pl-launchpad${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/launchpad/logo.svg',
          styles: LaunchpadStyles,
        },
        '1-21': {
          origin: `https://ankr${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/ankr/logo.svg',
          styles: AnkrStyles,
        },
        '2-1': {
          origin: `https://edgeware${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/edgeware/edgeware-logo.svg',
          styles: EdgewareStyles,
        },
      },
  dev: isSuiBlockchain
    ? {
        1: {
          src: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',
          styles: SuiMainStyles,
        },
        '3-0x176d1ff622ed604802c42ec15df79e67e1b97d9421f93ba1e77f19c569897b1d': {
          origin: `http://localhost:31000`,
          src: 'https://images.peeranha.io/communities/mark3d/logo.svg',
          styles: Mark3dStyles,
        },
      }
    : {
        '1-1': {
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
