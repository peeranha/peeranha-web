import { keccak256, toUtf8Bytes } from 'ethers/lib.esm/utils';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const BLOCKCHAIN_NAME = 'eos';
export const DEFAULT_EOS_PERMISSION = 'active';
export const SCATTER_APP_NAME = 'Peeranha';
export const SEND_TIPS_SCATTER_APP_NAME = 'PeeranhaSendTips';

export const EOS_IS_NOT_INIT = 'EOS is not initialized.';
export const SCATTER_IN_NOT_INSTALLED = 'Scatter is not installed.';
export const SCATTER_TIMEOUT_ERROR = 'Scatter timeout';
export const SCATTER_TIMEOUT_DURATION = 10000; // 1 sec

export const AWS_URL =
  'https://yb1ib2fyhc.execute-api.us-east-2.amazonaws.com/default/regsterPromo';
export const HUBSPOT_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit';
export const HUBSPOT_PORTAL_ID = '9131393';
export const HUBSPOT_SEND_EMAIL_FORM_ID =
  '05305f90-6546-4718-88e8-2d2c8e79c00c';
export const HUBSPOT_SEND_MESSAGE_FORM_ID =
  'eb947c08-4d59-4fb5-87b7-3732e487dbd7';

export const ENDPOINTS_LIST = 'best_nodes_list';

// question/answers properties
export const OFFICIAL_ANSWER_KEYS = [1, 3];

// permissions
export const MODERATOR_KEY = 48;
export const MODERATOR_CREATE_COMMUNITY = 3;

export const DEFAULT_ADMIN_ROLE = 0x00;
export const COMMUNITY_ADMIN_ROLE = keccak256(
  toUtf8Bytes('COMMUNITY_ADMIN_ROLE'),
);
export const COMMUNITY_MODERATOR_ROLE = keccak256(
  toUtf8Bytes('COMMUNITY_MODERATOR_ROLE'),
);

export const COMMUNITY_ADMIN_VALUE = 255;
export const COMMUNITY_ADMIN_INFINITE_IMPACT = 1;
export const COMMUNITY_ADMIN_CREATE_TAG = 4;
export const COMMUNITY_ADMIN_QUESTION_TYPE = 5;
export const COMMUNITY_ADMIN_TOP_QUESTIONS = 6;
export const COMMUNITY_ADMIN_OFFICIAL_ANSWER = 7;
export const SECTION_ID = 'section_id';
export const PERMISSION_GRANTED = '1';

export const PROPERTY_ANSWER_15_MINUTES = 12;
export const PROPERTY_FIRST_ANSWER = 13;

export const POST_TYPE = {
  expertPost: 0,
  generalPost: 1,
  tutorial: 2,
};

export const globalAdminPermissions = {
  ADMIN_INFINITE_IMPACT: {
    code: 1,
    title: 'permissionInfinite',
  },
  ADMIN_IGNORE_RATING: {
    code: 2,
    title: 'permissionIgnoreRating',
  },
  ADMIN_CREATE_COMMUNITY: {
    code: 3,
    title: 'permissionCreateCommunity',
  },
  ADMIN_CREATE_TAG: {
    code: 4,
    title: 'permissionCreateTag',
  },
  ADMIN_POST_TYPE: {
    code: 5,
    title: 'permissionChangePostType',
  },
  ADMIN_OFFICIAL_ANSWER: {
    code: 6,
    title: 'permissionOfficialAnswer',
  },
};
export const communityAdminPermissions = {
  COMMUNITY_MODERATOR_INFINITE_IMPACT1: {
    code: 8,
    title: 'givePermissions',
  },
};
export const communityModeratorPermissions = {
  COMMUNITY_MODERATOR_INFINITE_IMPACT: {
    code: 1,
    title: 'permissionInfinite',
  },
  COMMUNITY_MODERATOR_IGNORE_RATING: {
    code: 2,
    title: 'permissionIgnoreRating',
  },
  COMMUNITY_MODERATOR_CREATE_TAG: {
    code: 4,
    title: 'permissionCreateTag',
  },
  COMMUNITY_MODERATOR_QUESTION_TYPE: {
    code: 5,
    title: 'permissionChangeQuestionType',
  },
  COMMUNITY_MODERATOR_TOP_QUESTIONS: {
    code: 6,
    title: 'permissionSelectTopQuestion',
  },
  COMMUNITY_MODERATOR_OFFICIAL_ANSWER: {
    code: 7,
    title: 'permissionOfficialAnswer',
  },
};

export const GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION = 2;
export const GET_QUESTIONS_KEY_TYPE = 'i64';

export const GOOGLE_SEARCH_FORM_PATH = (key, cx) =>
  `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}`;

// Tables

export const ACCOUNT_TABLE = 'account';
export const ACCOUNTS_TABLE = 'accounts';
export const QUESTION_TABLE = 'question';
export const BOUNTY_TABLE = 'bounty';
export const USER_QUESTIONS_TABLE = 'usrquestions';
export const USER_ANSWERS_TABLE = 'usranswers';
export const TAGS_TABLE = 'tags';
export const COMMUNITIES_TABLE = 'communities';
export const CREATED_TAGS_TABLE = 'crtagtb';
export const CREATED_COMMUNITIES_TABLE = 'crcommtb';
export const GLOBAL_STAT_TABLE = 'globalstat';
export const PERIOD_REWARD_TABLE = 'periodreward';
export const PERIOD_RATING_TABLE = 'periodrating';
export const TOTAL_REWARD_TABLE = 'totalreward';
export const TOTAL_RATING_TABLE = 'totalrating';
export const USER_SUPPLY_TABLE = 'stat';
export const INVITED_USERS_TABLE = 'invited';
export const ALL_TOP_QUESTIONS_TABLE = 'topquestion';
export const ALL_PROPERTY_COMMUNITY_TABLE = 'propertycomm';
export const TG_ACCOUNT_TABLE = 'telegramacc';
export const USER_ACHIEVEMENTS_TABLE = 'accachieve';
export const PROJECT_ACHIEVEMENTS_TABLE = 'achieve';
export const BOOST_STATISTICS_TABLE = 'statboost';
export const USER_BOOST_TABLE = 'boost';
export const PROMOTED_QUESTIONS_TABLES = 'promquestion';
export const TOKEN_AWARDS_TABLE = 'tokenawards';

// Scopes

export const ALL_ACCOUNTS_SCOPE = 'allaccounts';
export const ALL_QUESTIONS_SCOPE = 'allquestions';
export const ALL_BOUNTIES_SCOPE = 'allbounties';
export const ALL_COMMUNITIES_SCOPE = 'allcomm';
export const ALL_STAT_SCOPE = 'allstat';
export const ALL_PERIODS_SCOPE = 'allperiods';
export const USER_SUPPLY_SCOPE = 'PEER';
export const INVITED_USERS_SCOPE = 'allinvited';
export const ALL_TOP_QUESTIONS_SCOPE = 'alltopquest';
export const ALL_PROPERTY_COMMUNITY_SCOPE = 'allprprtcomm';
export const ALL_TG_ACCOUNTS_SCOPE = 'alltelacc';
export const ALL_ACHIEVEMENTS_SCOPE = 'allachieve';
export const BOOST_STATISTICS_SCOPE = 'allboost';
export const TOKEN_AWARDS_SCOPE = 'allawards';

// Inf. limit
export const INF_LIMIT = -1;

// Methods

export const SAVE_PROFILE_METHOD = 'setaccprof';

export const REGISTER_ACC = 'registeracc';
export const UPDATE_ACC = 'updateacc';
export const INVITE_USER = 'inviteuser';
export const REWARD_REFER = 'rewardrefer';

export const VOTE_TO_DELETE_METHOD = 'reportforum';
export const CHANGE_QUESTION_TYPE_METHOD = 'chgqsttype';

export const POST_QUESTION_METHOD = 'postquestion';
export const SET_BOUNTY_METHOD = 'setbounty';
export const EDIT_BOUNTY_METHOD = 'editbounty';
export const PAY_BOUNTY_METHOD = 'paybounty';
export const EDIT_QUESTION_METHOD = 'modquestion';
export const DEL_QUESTION_METHOD = 'delquestion';

export const POST_ANSWER_METHOD = 'postanswer';
export const EDIT_ANSWER_METHOD = 'modanswer';
export const DEL_ANSWER_METHOD = 'delanswer';

export const EDIT_COMMENT_METHOD = 'modcomment';
export const DEL_COMMENT_METHOD = 'delcomment';

export const UP_VOTE_METHOD = 'upvote';
export const DOWN_VOTE_METHOD = 'downvote';
export const MARK_AS_CORRECT_METHOD = 'mrkascorrect';

export const UNFOLLOW_COMM = 'unfollowcomm';
export const FOLLOW_COMM = 'followcomm';
export const CREATE_COMMUNITY = 'crcommunity';
export const EDIT_COMMUNITY = 'editcomm';
export const VOTE_TO_CREATE_COMMUNITY = 'vtcrcomm';
export const VOTE_TO_DELETE_COMMUNITY = 'vtdelcomm';
export const CREATE_TAG = 'crtag';
export const EDIT_TAG_ACTION = 'edittag';
export const VOTE_TO_CREATE_TAG = 'vtcrtag';
export const VOTE_TO_DELETE_TAG = 'vtdeltag';

export const SEND_TOKEN_METHOD = 'transfer';
export const PICKUP_REWARD_METHOD = 'pickupreward';
export const ADD_BOOST_METHOD = 'addboost';

export const CONFIRM_TELEGRAM_ACCOUNT = 'apprvacc';
export const UNLINK_TELEGRAM_ACCOUNT = 'dsapprvacc';

export const PROMOTE_QUESTION_METHOD = 'addhotquestn';
export const CHANGE_PROMO_QUEST_COMM = 'chngpromcomm';

// Top community questions methods
export const ADD_TO_TOP_COMMUNITY_METHOD = 'addtotopcomm';
export const REMOVE_FROM_TOP_COMMUNITY_METHOD = 'remfrmtopcom';
export const UP_QUESTION_METHOD = 'upquestion';
export const DOWN_QUESTION_METHOD = 'downquestion';
export const MOVE_QUESTION_METHOD = 'movequestion';

// Datetime
export const MONTH_3LETTERS__DAY_TIME = 'datetime/MONTH_3LETTERS__DAY_TIME';
export const MONTH_3LETTERS__DAY_YYYY_TIME =
  'datetime/MONTH_3LETTERS__DAY_YYYY_TIME';
export const MONTH_3LETTERS__DAY_YYYY = 'datetime/MONTH_3LETTERS__DAY_YYYY';
export const DD_MM_YYYY = 'datetime/DD_MM_YYYY';
export const DD_MM_YY = 'datetime/DD_MM_YY';
export const FULL_MONTH_NAME_DAY_YEAR = 'datetime/FULL_MONTH_NAME_DAY_YEAR';

export const NO_AVATAR = 'QmUyiWb3p3W16pAGJudZsZuQ59eiW4RtHwCjDCRNqqMwPE';
export const NO_AVATAR_EDIT = 'QmVu3aRQU2fYJ12W632f1ST2LhBdH3FDYpWeKeiLsTVt9E';

// Currency
export const APP_CURRENCY = 'PEER';

// Social Media Data
export const APP_TWITTER_NICKNAME = 'peeranhaio';
export const APP_MAIN_NAME = 'Peeranha';

// Temporary Account Data
export const TEMPORARY_ACCOUNT_KEY = 15;

// Bounty Status
export const BOUNTY_STATUS_ACTIVE = 1;
export const BOUNTY_STATUS_PAID = 2;
export const BOUNTY_STATUS_PENDING = 3;

// Cookies constants
export const SINGLE_COMMUNITY_DETAILS = 'singleCommunityDetails';

export const KEY_LAST_RATING_UPDATE_TIME = 18;

// verification codes types
export const SEND_TIPS_TYPE = 'sendTips';
export const SEND_TOKENS_TYPE = 'sendTokens';
export const SHOW_ACTIVE_KEY_TYPE = 'showActiveKey';
export const SHOW_OWNER_KEY_TYPE = 'showOwnerKey';
export const DELETE_ACCOUNT_TYPE = 'deleteAccount';
export const DELETE_FB_DATA_TYPE = 'deleteFbData';

export const METAMASK_ERROR_CODE = 1000001;
export const ETHEREUM_USER_ERROR_CODE = 1000002;
export const USER_NOT_SELECTED_ERROR_CODE = 1000003;
export const INVALID_ETHEREUM_PARAMETERS_ERROR_CODE = -32602;
export const REJECTED_SIGNATURE_REQUEST = 4001;

//session storage keys
export const CHANGED_POSTS_KEY = 'changed-posts';
