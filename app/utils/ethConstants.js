export const REGISTER_ACC = 'createUser';
export const UPDATE_ACC = 'updateUser';
export const GET_USER_BY_ADDRESS = 'getUserByAddress';
export const IS_USER_EXISTS = 'isUserExists';
export const GET_USER_PERMISSIONS = 'getUserPermissions';
export const GET_USERS_COUNT = 'getUsersCount';
export const GET_COMMUNITIES_COUNT = 'getCommunitiesCount';
export const GET_COMMUNITY = 'getCommunity';
export const GET_QUESTION = 'getPost';
export const CREATE_COMMUNITY = 'createCommunity';
export const EDIT_COMMUNITY = 'updateCommunity';
export const FOLLOW_COMMUNITY = 'followCommunity';
export const UNFOLLOW_COMMUNITY = 'unfollowCommunity';
export const CREATE_TAG = 'createTag';
export const EDIT_TAG = 'updateTag';
export const POST_QUESTION = 'createPost';
export const CHANGE_POST_TYPE = 'changePostType';
export const GET_POST = 'getPost';
export const GET_REPLY = 'getReply';
export const GET_STATUS_HISTORY = 'getStatusHistory';
export const GET_COMMENT = 'getComment';
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
export const GET_USER_RATING = 'getUserRating';
export const GET_USER_BALANCE = 'balanceOf';
export const CLAIM_REWARD = 'claimReward';

export const UPVOTE_STATUS = 1;
export const DOWNVOTE_STATUS = -1;

const user = `
    id
    ratings {
     communityId
     rating
    }
    displayName
    company
    position
    location
    about
    avatar
    creationTime
`;

const comment = `
    id
    ipfsHash
    author {
      ${user}
    }
    rating
    postTime
    postId
    parentReplyId
    content
    isDeleted
    properties
`;

const reply = `
    id
    ipfsHash
    author {
      ${user}
    }
    rating
    postTime
    postId
    parentReplyId
    content
    commentCount
    isDeleted
    isOfficialReply
    isBestReply
    isFirstReply
    isQuickReply
    properties
    comments (
      orderBy: postTime,
      orderDirection: asc,
      where: { isDeleted: false },
    ) {
      ${comment}
    }
`;

const post = `
    id
    tags
    ipfsHash
    postType
    author {
      ${user}
    }
    rating
    postTime
    communityId
    title
    content
    commentCount
    replyCount
    isDeleted
    officialReply
    bestReply
    isFirstReply
    isQuickReply
    properties
    replies (
      orderBy: postTime,
      orderDirection: desc,
      where: { isDeleted: false },
    ) {
      ${reply}
    }
    comments (
      orderBy: postTime,
      orderDirection: asc,
      where: { isDeleted: false },
    ) {
      ${comment}
    }
`;

export const usersQuery = `
      query(
        $first: Int,
        $skip: Int,
        $orderBy: BigInt,
      ) {
        users(
          first: $first,
          skip: $skip,
          orderBy: $orderBy,
          orderDirection: desc,
        ) {
          ${user}
          postCount
          replyCount
        }
      }`;

export const userQuery = `
      query(
        $id: ID!,
      ) {
        user(
          id: $id
        ) {
          ${user}
          postCount
          replyCount
        }
      }`;

export const userStatsQuery = `
      query(
        $id: ID!,
      ) {
        user(
          id: $id
        ) {
          postCount
          replyCount
          achievements {
            id
          }
          ratings {
           communityId
           rating
          }
        }
      }`;

export const communitiesQuery = `
      query(
        $first: Int,
      ) {
        communities(
         first: $first,
        ) {
          id
          name
          avatar
          description
          website
          language
          isFrozen
          creationTime
          postCount
          deletedPostCount
          followingUsers
          replyCount
        }
      }`;

export const usersPostsQuery = `
      query(
        $id: ID!,
        $limit: Int,
        $offset: Int,
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $limit,
          skip: $offset,
          where: {isDeleted: false, author: $id},
        ) {
           ${post}
        }
      }`;

export const usersAnswersQuery = `
      query (
        $id: ID!,
        $limit: Int,
        $offset: Int,
      ) {
        replies (
             orderBy: postTime,
             orderDirection: desc,
             where: { isDeleted: false, author: $id },
             first: $limit,
             skip: $offset,
           ) {
          postId
        }
      }`;

export const answeredPostsQuery = `
      query (
        $first: Int,
        $skip: Int,
        $ids: [Int],
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $first,
          skip: $skip,
          where: { id_in: $ids, isDeleted: false },
        ) {
           ${post}
        }
      }`;

export const allTagsQuery = `
      query {
        tags {
          id
          communityId
          name
          description
          postCount
        }
      }`;

export const communityQuery = `
      query(
        $id: ID!,
      ) {
        community(
         id: $id,
        ) {
          id
          name
          avatar
          description
          website
          language
          isFrozen
          creationTime
          postCount
          deletedPostCount
          followingUsers
          replyCount
        }
      }`;

export const tagsQuery = `
      query(
        $communityId: ID!,
      ) {
        tags(
         where: { communityId: $communityId },
        ) {
           name
           description
           id
           postCount
        }
      }`;

export const postsQuery = `
      query (
        $first: Int,
        $skip: Int,
        $postTypes: [Int],
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $first,
          skip: $skip,
          where: {isDeleted: false, postType_in: $postTypes},
        ) {
           ${post}
        }
      }`;

export const postsByCommQuery = `
      query (
        $first: Int,
        $skip: Int,
        $communityIds: [Int],
        $postTypes: [Int],
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $first,
          skip: $skip,
          where: { communityId_in: $communityIds, isDeleted: false, postType_in: $postTypes },
        ) {
           ${post}
        }
      }`;

export const postsForSearchQuery = `
      query (
        $text: String,
      ) {
        postSearch (
          text: $text,
        ) {
           id
           ipfsHash
           tags
           postType
           author {
              ${user}
           }
           rating
           postTime
           communityId
           title
           content
           commentCount
           replyCount
           isDeleted
           officialReply
           bestReply
           isFirstReply
           isQuickReply
           properties
        }
      }`;

export const postQuery = `
      query (
        $postId: Int,
      ) {
        post (
          id: $postId,
          where: {isDeleted: false},
        ) {
           ${post}
        }
      }
`;

export const allAchievementsQuery = `
       query (
        $userId: ID!,
       ) {
        achievements {
          id
          factCount
          maxCount
          achievementURI
          achievementsType
          name
          description
          image
          attributes
        }
        user (id: $userId) {
          achievements {
            id
          }
        }
      }`;

const period = `
  id
  startPeriodTime
  endPeriodTime
`;

export const rewardsQuery = `
  query (
    $userId: ID!,
  ) {
    userRewards (where: {user: $userId}) {
      id
      period {
        ${period}
      }
      user {
        ${user}
      }
      tokenToReward
      isPaid
    }
    periods (orderBy: endPeriodTime, orderDirection: desc, first: 2) {
      ${period}
    }
  }
`;

const history = `
  transactionHash
  post {
    ${post}
  }
  reply {
    ${reply}
  }
  comment {
    ${comment}
  }
  eventEntity
  eventName
  timeStamp
`;

export const historiesQuery = `
  query (
   $postId: ID!,
 ) {
    histories (
      orderBy: timeStamp,
      where: {post: $postId,}
    ) {
      ${history}
    }
  }
`;
