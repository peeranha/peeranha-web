export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const IPFS_URL = 'http://localhost:8080/ipfs';

export const BLOCKCHAIN_NAME = 'eos';
export const DEFAULT_EOS_PERMISSION = 'active';
export const SCATTER_APP_NAME = 'Peerania';

export const EOS_IS_NOT_INIT = 'EOS is not initialized.';
export const SCATTER_IN_NOT_INSTALLED = 'Scatter is not installed.';

export const HUBSPOT_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit';
export const HUBSPOT_PORTAL_ID = '5258952';
export const HUBSPOT_SEND_EMAIL_FORM_ID =
  '05305f90-6546-4718-88e8-2d2c8e79c00c';
export const HUBSPOT_SEND_MESSAGE_FORM_ID =
  'b75c88d0-ecc7-49b5-a69d-18b666f1d1ea';

export const GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION = 2;
export const GET_QUESTIONS_KEY_TYPE = 'i64';

// Tables

export const ACCOUNT_TABLE = 'account';
export const QUESTION_TABLE = 'question';
export const USER_QUESTIONS_TABLE = 'usrquestions';
export const USER_ANSWERS_TABLE = 'usranswers';
export const TAGS_COMMUNITIES_TABLE = 'tagandcomm';
export const CREATED_TAGS_COMMUNITIES_TABLE = 'crtagcomm';

// Scopes

export const ALL_ACCOUNTS_SCOPE = 'allaccounts';
export const ALL_QUESTIONS_SCOPE = 'allquestions';
export const ALL_COMMUNITIES_SCOPE = 'allcomm';

// Methods

export const SAVE_PROFILE_METHOD = 'setaccprof';

export const REGISTER_ACC = 'registeracc';

export const VOTE_TO_DELETE_METHOD = 'votedelete';

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

// Datetime
export const MONTH_3LETTERS__DAY_TIME = 'datetime/MONTH_3LETTERS__DAY_TIME';
export const MONTH_3LETTERS__DAY_YYYY_TIME =
  'datetime/MONTH_3LETTERS__DAY_YYYY_TIME';
export const DD_MM_YYYY = 'datetime/DD_MM_YYYY';

export const NO_AVATAR = 'QmUyiWb3p3W16pAGJudZsZuQ59eiW4RtHwCjDCRNqqMwPE';
export const NO_AVATAR_EDIT = 'QmVu3aRQU2fYJ12W632f1ST2LhBdH3FDYpWeKeiLsTVt9E';
