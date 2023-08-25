import { keccak256, toUtf8Bytes } from 'ethers/lib.esm/utils';
import { isSuiBlockchain } from './sui/sui';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const AWS_URL =
  'https://yb1ib2fyhc.execute-api.us-east-2.amazonaws.com/default/regsterPromo';
export const HUBSPOT_URL = 'https://api.hsforms.com/submissions/v3/integration/submit';
export const HUBSPOT_PORTAL_ID = '9131393';
export const HUBSPOT_SEND_EMAIL_FORM_ID = '05305f90-6546-4718-88e8-2d2c8e79c00c';
export const HUBSPOT_SEND_MESSAGE_FORM_ID = 'eb947c08-4d59-4fb5-87b7-3732e487dbd7';

export const ENDPOINTS_LIST = 'best_nodes_list';

// permissions
export const MODERATOR_KEY = 48;
export const DEFAULT_ADMIN_ROLE = 0x00;
export const PROTOCOL_ADMIN_ROLE = isSuiBlockchain
  ? '02'
  : keccak256(toUtf8Bytes('PROTOCOL_ADMIN_ROLE'));
export const COMMUNITY_ADMIN_ROLE = isSuiBlockchain
  ? '03'
  : keccak256(toUtf8Bytes('COMMUNITY_ADMIN_ROLE'));
export const COMMUNITY_MODERATOR_ROLE = isSuiBlockchain
  ? '04'
  : keccak256(toUtf8Bytes('COMMUNITY_MODERATOR_ROLE'));

export const COMMUNITY_ADMIN_INFINITE_IMPACT = 1;
export const COMMUNITY_ADMIN_CREATE_TAG = 4;
export const COMMUNITY_ADMIN_TOP_QUESTIONS = 6;
export const COMMUNITY_ADMIN_OFFICIAL_ANSWER = 7;
export const SECTION_ID = 'section_id';

export const REWARD_CLAIMING_ENABLED = process.env.REWARD_CLAIMING_ENABLED === 'true';

export const INIT_RATING = 10;

export const WEI_IN_ETH = String(10 ** 18);
export const BOOST_MULTIPLIER = 5;
export const BOOST_MODIFIER_HIGH = 5;
export const BOOST_MODIFIER_LOW = 1;
export const BOOSTS_SUM_VALUE_WITHOUT_STAKE = 2;

export const POST_TYPE = {
  expertPost: 0,
  generalPost: 1,
  tutorial: 2,
  documentation: 1000,
};

export const LANGUAGES_MAP = {
  en: 0,
  zh: 1,
  es: 2,
  vi: 3,
};

export const globalAdminPermissions = {
  PERMISSION_PROTOCOL_ADMIN_1: {
    code: 1,
    title: 'permissionProtocolAdmin_1',
  },
  PERMISSION_PROTOCOL_ADMIN_2: {
    code: 2,
    title: 'permissionProtocolAdmin_2',
  },
  PERMISSION_PROTOCOL_ADMIN_3: {
    code: 3,
    title: 'permissionProtocolAdmin_3',
  },
  PERMISSION_PROTOCOL_ADMIN_4: {
    code: 4,
    title: 'permissionProtocolAdmin_4',
  },
  PERMISSION_PROTOCOL_ADMIN_5: {
    code: 5,
    title: 'permissionProtocolAdmin_5',
  },
  PERMISSION_PROTOCOL_ADMIN_6: {
    code: 6,
    title: 'permissionProtocolAdmin_6',
  },
  PERMISSION_PROTOCOL_ADMIN_7: {
    code: 7,
    title: 'permissionProtocolAdmin_7',
  },
  PERMISSION_PROTOCOL_ADMIN_8: {
    code: 8,
    title: 'permissionProtocolAdmin_8',
  },
  PERMISSION_PROTOCOL_ADMIN_9: {
    code: 9,
    title: 'permissionProtocolAdmin_9',
  },
  PERMISSION_PROTOCOL_ADMIN_10: {
    code: 10,
    title: 'permissionProtocolAdmin_10',
  },
};
export const communityAdminPermissions = {
  PERMISSION_COMMUNITY_ADMIN_1: {
    code: 11,
    title: 'permissionCommunityAdmin_1',
  },
  PERMISSION_COMMUNITY_ADMIN_2: {
    code: 12,
    title: 'permissionCommunityAdmin_2',
  },
  PERMISSION_COMMUNITY_ADMIN_3: {
    code: 13,
    title: 'permissionCommunityAdmin_3',
  },
  PERMISSION_COMMUNITY_ADMIN_4: {
    code: 14,
    title: 'permissionCommunityAdmin_4',
  },
  PERMISSION_COMMUNITY_ADMIN_5: {
    code: 15,
    title: 'permissionCommunityAdmin_5',
  },
  PERMISSION_COMMUNITY_ADMIN_6: {
    code: 16,
    title: 'permissionCommunityAdmin_6',
  },
};
export const communityModeratorPermissions = {
  PERMISSION_COMMUNITY_MODERATOR_1: {
    code: 17,
    title: 'permissionCommunityModerator_1',
  },
  PERMISSION_COMMUNITY_MODERATOR_2: {
    code: 18,
    title: 'permissionCommunityModerator_2',
  },
  PERMISSION_COMMUNITY_MODERATOR_3: {
    code: 19,
    title: 'permissionCommunityModerator_3',
  },
  PERMISSION_COMMUNITY_MODERATOR_4: {
    code: 20,
    title: 'permissionCommunityModerator_4',
  },
  PERMISSION_COMMUNITY_MODERATOR_5: {
    code: 21,
    title: 'permissionCommunityModerator_5',
  },
  PERMISSION_COMMUNITY_MODERATOR_6: {
    code: 22,
    title: 'permissionCommunityModerator_6',
  },
};
export const USER_ACHIEVEMENTS_TABLE = 'accachieve';
export const PROJECT_ACHIEVEMENTS_TABLE = 'achieve';
export const ALL_ACHIEVEMENTS_SCOPE = 'allachieve';

// Datetime
export const MONTH_3LETTERS__DAY_TIME = 'datetime/MONTH_3LETTERS__DAY_TIME';
export const MONTH_3LETTERS__DAY_YYYY_TIME = 'datetime/MONTH_3LETTERS__DAY_YYYY_TIME';
export const MONTH_3LETTERS__DAY_YYYY = 'datetime/MONTH_3LETTERS__DAY_YYYY';
export const DD_MM_YYYY = 'datetime/DD_MM_YYYY';
export const DD_MM_YY = 'datetime/DD_MM_YY';
export const FULL_MONTH_NAME_DAY_YEAR = 'datetime/FULL_MONTH_NAME_DAY_YEAR';

export const NO_AVATAR = 'QmUyiWb3p3W16pAGJudZsZuQ59eiW4RtHwCjDCRNqqMwPE';

// Social Media Data
export const APP_TWITTER_NICKNAME = 'peeranhaio';
export const APP_MAIN_NAME = 'Peeranha';

// Temporary Account Data
export const TEMPORARY_ACCOUNT_KEY = 15;

// Messenger bot
export const BOT_ADDRESS = '0x0000000000000000000000000000000000000001';

export const MessengerTypes = {
  Unknown: 0,
  Telegram: 1,
  Discord: 2,
  Slack: 3,
};

// Bounty Status
export const BOUNTY_STATUS_ACTIVE = 1;
export const BOUNTY_STATUS_PAID = 2;
export const BOUNTY_STATUS_PENDING = 3;

// Cookies constants
export const SINGLE_COMMUNITY_DETAILS = 'singleCommunityDetails';

export const ONE_MONTH = 2592000;
export const TYPE_OF_TRANSACTIONS = 'transactionType';
export const META_TRANSACTIONS_ALLOWED = 'meta_tr_allowed';
export const TRANSACTIONS_ALLOWED = 'tr_allowed';
export const DISPATCHER_TRANSACTIONS_ALLOWED = 'dispatcher_tr_allowed';
export const CURRENCY = 'MATIC';
export const CONNECTED_WALLET = 'connectedWallet';
export const TORUS_WALLET = 'Torus';
export const WEB3_TOKEN = 'web3Token';
export const WEB3_TOKEN_USER_ADDRESS = 'web3Token_userAddress';

// verification codes types

export const METAMASK_ERROR_CODE = 1000001;
export const USER_MIN_RATING_ERROR_CODE = 1000005;
export const INVALID_ETHEREUM_PARAMETERS_ERROR_CODE = -32602;
export const INVALID_MIN_RATING_ERROR_CODE = -32603;
export const REJECTED_SIGNATURE_REQUEST = 4001;
// session storage keys
export const CHANGED_POSTS_KEY = 'changed-posts';

// amount of posts pagination
export const AMOUNT_POSTS_PAGINATION = 5;

// position documentation
export const POSITION_TOP = 'top';

export const LIMITED_EDITION_NFT_TYPE = 0;

// Attributes

export const TARGET_BLANK = '_blank';
