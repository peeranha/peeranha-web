// Contracts

export const CONTRACT_TOKEN = ['contractToken', 'edgewareContractToken'];
export const CONTRACT_USER = ['contractUser', 'edgewareContractUser'];
export const CONTRACT_CONTENT = ['contractContent', 'edgewareContractContent'];
export const CONTRACT_COMMUNITY = ['contractCommunity', 'edgewareContractCommunity'];

export const getContentData = ['getContentDataWithArgs', 'getEdgewareContentDataWithArgs'];

export const ContractsMapping = {
  contractToken: ['token', process.env.PEERANHA_TOKEN],
  edgewareContractToken: ['token', process.env.EDGEWARE_TOKEN_ADDRESS],
  contractUser: ['user', process.env.USER_ADDRESS],
  edgewareContractUser: ['user', process.env.EDGEWARE_USER_ADDRESS],
  contractContent: ['content', process.env.CONTENT_ADDRESS],
  edgewareContractContent: ['content', process.env.EDGEWARE_CONTENT_ADDRESS],
  contractCommunity: ['community', process.env.COMMUNITY_ADDRESS],
  edgewareContractCommunity: ['community', process.env.EDGEWARE_COMMUNITY_ADDRESS],
};

// Transaction names
export const UPDATE_ACC = 'updateUser';
export const CREATE_COMMUNITY = 'createCommunity';
export const EDIT_COMMUNITY = 'updateCommunity';
export const FOLLOW_COMMUNITY = 'followCommunity';
export const UNFOLLOW_COMMUNITY = 'unfollowCommunity';
export const CREATE_TAG = 'createTag';
export const EDIT_TAG = 'updateTag';
export const POST_QUESTION = 'createPost';
export const UPDATE_DOCUMENTATION_TREE = 'updateDocumentationTree';
export const DELETE_DOCUMENTATION_POST = 'deleteDocumentationPost';
export const POST_ANSWER = 'createReply';
export const EDIT_ANSWER = 'editReply';
export const DELETE_ANSWER = 'deleteReply';
export const EDIT_POST = 'editPost';
export const DELETE_POST = 'deletePost';
export const POST_COMMENT = 'createComment';
export const EDIT_COMMENT = 'editComment';
export const DELETE_COMMENT = 'deleteComment';
export const CHANGE_STATUS_BEST = 'changeStatusBestReply';
export const VOTE_ITEM = 'voteItem';
export const CLAIM_REWARD = 'claimReward';
export const SET_STAKE = 'setStake';
export const GIVE_COMMUNITY_ADMIN_PERMISSION = 'giveCommunityAdminPermission';
export const GIVE_COMMUNITY_MODERATOR_PERMISSION = 'giveCommunityModeratorPermission';
export const REVOKE_COMMUNITY_ADMIN_PERMISSION = 'revokeCommunityAdminPermission';
export const REVOKE_COMMUNITY_MODERATOR_PERMISSION = 'revokeCommunityModeratorPermission';
export const BAN_COMMUNITY_USER = 'banCommunityUser';

// Query names
export const GET_POST = 'getPost';
export const GET_REPLY = 'getReply';
export const GET_STATUS_HISTORY = 'getStatusHistory';
export const GET_COMMENT = 'getComment';
export const GET_ITEM_PROPERTY = 'getItemProperty';
export const GET_USER_BALANCE = 'balanceOf';
export const GET_AVERAGE_STAKE = 'getAverageStake';
export const GET_AVAILABLE_BALANCE = 'availableBalanceOf';
export const GET_BOOST = 'getBoost';
export const GET_STAKE = 'getStake';
export const GET_USER_STAKE = 'getUserStake';
export const GET_USER_RATING = 'getUserRating';

export const UPVOTE_STATUS = 1;
export const DOWNVOTE_STATUS = -1;

// Model services
export const MESH_MODEL = 'Mesh';
export const GRAPH_MODEL = 'TheGraph';
