export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const BLOCKCHAIN_NAME = 'eos';
export const DEFAULT_EOS_PERMISSION = 'active';
export const SCATTER_APP_NAME = 'Peeranha';

export const EOS_IS_NOT_INIT = 'EOS is not initialized.';
export const SCATTER_IN_NOT_INSTALLED = 'Scatter is not installed.';
export const SCATTER_TIMEOUT_ERROR = 'Scatter timeout';
export const SCATTER_TIMEOUT_DURATION = 10000; // 1 sec

export const AWS_URL =
  'https://yb1ib2fyhc.execute-api.us-east-2.amazonaws.com/default/regsterPromo';
export const HUBSPOT_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit';
export const HUBSPOT_PORTAL_ID = '5258952';
export const HUBSPOT_SEND_EMAIL_FORM_ID =
  '05305f90-6546-4718-88e8-2d2c8e79c00c';
export const HUBSPOT_SEND_MESSAGE_FORM_ID =
  'b75c88d0-ecc7-49b5-a69d-18b666f1d1ea';

export const ENDPOINTS_LIST = 'best_nodes_list';

export const MODERATOR_KEY = 48;
export const GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION = 2;
export const GET_QUESTIONS_KEY_TYPE = 'i64';

const GOOGLE_SEARCH_FORM_KEY = 'AIzaSyA8OYoejHkhBWJnokE78JYndPY8M-4eN7U';
const GOOGLE_SEARCH_FORM_CX = '012465490266412806753:wrajkcmcuob';
export const GOOGLE_SEARCH_FORM_PATH = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_FORM_KEY}&cx=${GOOGLE_SEARCH_FORM_CX}`;

// Tables

export const ACCOUNT_TABLE = 'account';
export const ACCOUNTS_TABLE = 'accounts';
export const QUESTION_TABLE = 'question';
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

// Scopes

export const ALL_ACCOUNTS_SCOPE = 'allaccounts';
export const ALL_QUESTIONS_SCOPE = 'allquestions';
export const ALL_COMMUNITIES_SCOPE = 'allcomm';
export const ALL_STAT_SCOPE = 'allstat';
export const ALL_PERIODS_SCOPE = 'allperiods';
export const USER_SUPPLY_SCOPE = 'PEER';
export const INVITED_USERS_SCOPE = 'allinvited';

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
export const EDIT_QUESTION_METHOD = 'modquestion';
export const DEL_QUESTION_METHOD = 'delquestion';

export const POST_ANSWER_METHOD = 'postanswer';
export const EDIT_ANSWER_METHOD = 'modanswer';
export const DEL_ANSWER_METHOD = 'delanswer';

export const POST_COMMENT_METHOD = 'postcomment';
export const EDIT_COMMENT_METHOD = 'modcomment';
export const DEL_COMMENT_METHOD = 'delcomment';

export const UP_VOTE_METHOD = 'upvote';
export const DOWN_VOTE_METHOD = 'downvote';
export const MARK_AS_CORRECT_METHOD = 'mrkascorrect';

export const UNFOLLOW_COMM = 'unfollowcomm';
export const FOLLOW_COMM = 'followcomm';
export const CREATE_COMMUNITY = 'crcommunity';
export const VOTE_TO_CREATE_COMMUNITY = 'vtcrcomm';
export const VOTE_TO_DELETE_COMMUNITY = 'vtdelcomm';
export const CREATE_TAG = 'crtag';
export const VOTE_TO_CREATE_TAG = 'vtcrtag';
export const VOTE_TO_DELETE_TAG = 'vtdeltag';

export const SEND_TOKEN_METHOD = 'transfer';
export const PICKUP_REWARD_METHOD = 'pickupreward';

// Datetime
export const MONTH_3LETTERS__DAY_TIME = 'datetime/MONTH_3LETTERS__DAY_TIME';
export const MONTH_3LETTERS__DAY_YYYY_TIME =
  'datetime/MONTH_3LETTERS__DAY_YYYY_TIME';
export const DD_MM_YYYY = 'datetime/DD_MM_YYYY';
export const DD_MM_YY = 'datetime/DD_MM_YY';
export const FULL_MONTH_NAME_DAY_YEAR = 'datetime/FULL_MONTH_NAME_DAY_YEAR';

export const NO_AVATAR = 'QmUyiWb3p3W16pAGJudZsZuQ59eiW4RtHwCjDCRNqqMwPE';
export const NO_AVATAR_EDIT = 'QmVu3aRQU2fYJ12W632f1ST2LhBdH3FDYpWeKeiLsTVt9E';

// Currency
export const APP_CURRENCY = 'PEER';
