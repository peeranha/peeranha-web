import { ACTION_FULFILLED, isSuiBlockchain } from 'utils/constants';
import { getCookie } from 'utils/cookie';
import { AaveStyles } from './communities-configs/aave';
import { AnkrStyles } from './communities-configs/ankr';
import { CartesiStyles } from './communities-configs/cartesi';
import { CyberconnectStyles } from './communities-configs/cyberconnect';
import { CyfrinStyles } from './communities-configs/cyfrin';
import { DeveloperDAOStyles } from './communities-configs/developerDAO';
import { EdgewareStyles } from './communities-configs/edgeware';
import { EngeniousStyles } from './communities-configs/engenious';
import { FilebaseStyles } from './communities-configs/filebase';
import { FilecoinStyles } from './communities-configs/filecoin';
import { ForceStyles } from './communities-configs/force';
import { FractalVisionsStyles } from './communities-configs/fractalVisions';
import { FunctionlandStyles } from './communities-configs/functionland';
import { GraphStyles } from './communities-configs/graph';
import { HarmonyStyles } from './communities-configs/harmony';
import { IndexerDAOStyles } from './communities-configs/indexerDAO';
import { IPFSStyles } from './communities-configs/IPFS';
import { KoiiStyles } from './communities-configs/koii';
import { LaunchpadStyles } from './communities-configs/launchpad';
import { Mark3dStyles } from './communities-configs/mark3d';
import { MintStateLabsStyles } from './communities-configs/mintStateLabs';
import { MoveStyles } from './communities-configs/move';
import { OrbisStyles } from './communities-configs/orbis';
import { PolygonStyles } from './communities-configs/polygon';
import { PolywrapStyles } from './communities-configs/polywrap';
import { SolidityStyles } from './communities-configs/solidity';
import { SuiCommunityStyles } from './communities-configs/suiCommunity';
import { SuiStyles } from './communities-configs/sui';
import { SuiGlobalStyles } from './communities-configs/suiGlobal';
import { SuiMainStyles } from './communities-configs/suiMain';
import { SuiNSStyles } from './communities-configs/suiNS';
import { ValistStyles } from './communities-configs/valist';
import { VyperStyles } from './communities-configs/vyper';

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
        '3-0xf48acddb048a800da068e4def7efc29bd7b279d6a0d9746179e81e73a4c3f75b': {
          origin: 'https://move.peeranha.io',
          src: 'https://images.peeranha.io/communities/move/logo.svg',
          styles: MoveStyles,
        },
        '3-0x050e1a5ffb4390917d025390f6838bbaac6c52d8aadbc3cff95b78722e4a859e': {
          origin: 'https://ipfs.peeranha.io',
          src: 'https://images.peeranha.io/communities/ipfs/ipfs-logo.svg',
          styles: IPFSStyles,
        },
        '3-0x947cc5fd538c091ea25dd46528e7299aa34091be0c1a6079e0341745d00dc1c9': {
          origin: 'https://university-engenious.peeranha.io',
          src: 'https://images.peeranha.io/communities/engenious/engenious-logo.svg',
          styles: EngeniousStyles,
        },
        '3-0xef2e1fe9b0499e032bfe696cb19a464067da7f27b85256a9deedf57e7f992a09': {
          origin: `https://sui-test${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/suiGlobal/logo.svg',
          styles: SuiMainStyles,
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
        '1-24': {
          origin: 'https://polygon-test.peeranha.io',
          src: 'https://images.peeranha.io/communities/polygon/logo.svg',
          styles: PolygonStyles,
        },
        '1-25': {
          origin: `https://cyfrin${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/cyfrin/logo.svg',
          styles: CyfrinStyles,
        },
        '1-26': {
          origin: `https://thegraph${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/graph/logo.svg',
          styles: GraphStyles,
        },
        '2-1': {
          origin: 'https://edgeware.peeranha.io',
          src: 'https://images.peeranha.io/communities/edgeware/edgeware-logo.svg',
          styles: EdgewareStyles,
        },
        '2-2': {
          origin: 'https://edgeware-test.peeranha.io',
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
        '3-0x45370791376075ddc9446384d980ce40b33992b651fc5eb9d3f98f7a4184549c': {
          origin: `https://cyfrin-sui-staging${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/cyfrin/logo.svg',
          styles: CyfrinStyles,
        },
        '3-0xaa7d3d2432c9091bde02f898fba1a33dd15863f45bd42ee157c6c7dca1c9e166': {
          origin: `https://sui-demo${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/suiCommunity/logo.svg',
          styles: SuiCommunityStyles,
        },
      }
    : {
        '1-1': {
          origin: 'https://demo-fxland.testpeeranha.io',
          src: 'https://images.peeranha.io/communities/functionland/logo.svg',
          styles: FunctionlandStyles,
        },
        '1-2': {
          origin: 'https://demo-msl.testpeeranha.io',
          src: 'https://images.peeranha.io/communities/graph/logo.svg',
          styles: GraphStyles,
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
        '1-14': {
          origin: 'https://thegraph.testpeeranha.io',
          src: 'https://images.peeranha.io/communities/graph/logo.svg',
          styles: GraphStyles,
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
          origin: `https://suins${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/suins/logo-2.svg',
          styles: SuiNSStyles,
        },
        '3-0xf1ec216ce7573b9b7f625d1cb618374b94f241787919f35da28f93c416e55cc6': {
          origin: `https://cartesi${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/cartesi/logo.svg',
          styles: CartesiStyles,
        },
        '3-0xdf71421e1693893fc5a71c1daf097a68468226e67f1f670d686f3eb1ffb9c8e9': {
          origin: `https://ipfs${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/ipfs/ipfs-logo.svg',
          styles: IPFSStyles,
        },
        '3-0x880fbd8d0915d567349291d801c38f3e4d06ea5cb1e4ed897ee0649d6c94a944': {
          origin: `https://engenious${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/engenious/engenious-logo.svg',
          styles: EngeniousStyles,
        },
        '3-0x06dd3239c44ec4596fcd01bedaf462bdfa7ddb30a7a8256f34b973eec3681fac': {
          origin: `https://cyfrin${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/cyfrin/logo.svg',
          styles: CyfrinStyles,
        },
      }
    : {
        '1-1': {
          origin: `https://mintstatelabs${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/mintStateLabs/logo.svg',
          styles: MintStateLabsStyles,
        },
        '1-2': {
          origin: `https://graph${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/graph/logo.svg',
          styles: GraphStyles,
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
        '1-22': {
          origin: `https://graph${process.env.COOKIE_DOMAIN}`,
          src: 'https://images.peeranha.io/communities/graph/logo.svg',
          styles: GraphStyles,
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
        '3-0x06dd3239c44ec4596fcd01bedaf462bdfa7ddb30a7a8256f34b973eec3681fac': {
          origin: `http://localhost:31000`,
          src: 'https://images.peeranha.io/communities/cyfrin/logo.svg',
          styles: CyfrinStyles,
        },
      }
    : {
        '1-2': {
          origin: 'http://localhost:3000',
          src: 'https://images.peeranha.io/communities/mintStateLabs/logo.svg',
          styles: MintStateLabsStyles,
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

export const isMeshServiceConfig = () => {
  const polygonNetworkId = 1;

  const singleCommunityId = Object.keys(communitiesConfig[process.env.ENV]).find(
    (id) => communitiesConfig[process.env.ENV]?.[id].origin === window.location.origin,
  );

  return !(Number(singleCommunityId?.split('-')[0]) === polygonNetworkId);
};

export const googleVerificationConfig = googleSiteVerificationsConfig[process.env.ENV];

export default communitiesConfig[process.env.ENV];
