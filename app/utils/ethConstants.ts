// Contracts
export const CONTRACT_TOKEN = 'contractToken';
export const CONTRACT_USER = 'contractUser';
export const CONTRACT_CONTENT = 'contractContent';
export const CONTRACT_COMMUNITY = 'contractCommunity';

// Transaction names
export const REGISTER_ACC = 'createUser';
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
export const CHANGE_POST_TYPE = 'changePostType';
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
export const GIVE_COMMUNITY_MODERATOR_PERMISSION =
  'giveCommunityModeratorPermission';
export const REVOKE_COMMUNITY_MODERATOR_PERMISSION =
  'revokeCommunityModeratorPermission';

// Query names
export const GET_USER_BY_ADDRESS = 'getUserByAddress';
export const IS_USER_EXISTS = 'isUserExists';
export const GET_USERS_COUNT = 'getUsersCount';
export const GET_COMMUNITIES_COUNT = 'getCommunitiesCount';
export const GET_COMMUNITY = 'getCommunity';
export const GET_POST = 'getPost';
export const GET_REPLY = 'getReply';
export const GET_STATUS_HISTORY = 'getStatusHistory';
export const GET_COMMENT = 'getComment';
export const GET_USER_BALANCE = 'balanceOf';
export const GET_AVERAGE_STAKE = 'getAverageStake';
export const GET_AVAILABLE_BALANCE = 'availableBalanceOf';
export const GET_BOOST = 'getBoost';
export const GET_STAKE = 'getStake';
export const GET_USER_STAKE = 'getUserStake';
export const GET_USER_RATING = 'getUserRating';

export const UPVOTE_STATUS = 1;
export const DOWNVOTE_STATUS = -1;

const editUserQuery = (query: string) =>
  query
    .replace('ratings', 'userCommunityRating')
    .replace('achievements { id }', 'userAchievement { achievementId }');

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
    achievements { id }
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

const usersQuery = `
      query(
        $first: Int,
        $skip: Int,
        $orderBy: BigInt,
        $orderDirection: String,
      ) {
        users(
          first: $first,
          skip: $skip,
          orderBy: $orderBy,
          orderDirection: $orderDirection,
        ) {
          ${user}
          postCount
          replyCount
        }
      }`;

const usersQueryMesh = (orderBy: string, orderDirection: string) =>
  editUserQuery(
    `query(
    $first: Int,
    $skip: Int
  ) {
    user(
      limit: $first,
      offset: $skip,
      orderBy: { ${orderBy}: ${orderDirection} },
    ) {
      ${user}
      postCount
      replyCount
    }
  }`,
  );

const moderationQuery = `
  query(
    $roles: [String],
  ) {
    userPermissions (where: {permission_in: $roles}) {
      id
      user {
        ${user}
      }
      permission
    }
  }
`;

const moderationQueryMesh = (roles: string) =>
  editUserQuery(`
  query {
    userPermission (where: { permission: (${roles}) }) {
      id
      user {
        ${user}
      }
      permission
    }
  }
`);

export const usersByCommunityQuery = `
      query(
        $first: Int,
        $skip: Int,
        $communityId: Int,
      ) {
        userCommunityRatings(
          first: $first,
          skip: $skip,
          where: { communityId: $communityId }
        ) {
          user {
            ${user}
            postCount
            replyCount
          }
        }
      }`;

const usersByCommunityQueryMesh = editUserQuery(`
  query(
    $limit: Int,
    $offset: Int,
    $communityId: Int,
  ) {
    userCommunityRating (
      limit: $limit,
      offset: $offset,
      where: { communityId: $communityId }
    ) {
      user {
        ${user}
        postCount
        replyCount
      }
    }
  }`);

export const userQuery = `
      query(
        $id: ID!
      ) {
        user(id: $id) {
          ${user}
          postCount
          replyCount
        }
      }`;

export const userQueryMesh = editUserQuery(`
      query(
        $id: String
      ) {
        user(where: { id: $id }) {
          ${user}
          postCount
          replyCount
        }
      }`);

export const userPermissionsQuery = `
      query(
        $id: ID!,
      ) {
        userPermissions(
          where: {user: $id},
        ) {
          permission
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
          tagsCount
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
          where: {isDeleted: false, author: $id, postType_lt: 3},
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
      query (
       $skip: Int,
      ) {
        tags (
          skip: $skip,
        ) {
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

export const faqByCommQuery = `
      query (
        $communityId: Int,
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          where: { communityId: $communityId, isDeleted: false, postType: 3 },
        ) {
           ${post}
        }
      }`;

export const communityDocumentationQuery = `
      query (
        $id: ID!
      ) {
         post (id: $id) {
           ${post}
         }
      }`;

export const communityDocumentationNotIncludedQuery = `
      query (
        $communityId: ID!,
        $includedIds: [String],
      ) {
         posts (where: {postType: 3, communityId: $communityId, isDeleted: false, id_not_in: $includedIds}) {
           ${post}
         }
      }`;

export const documentationMenuQuery = `
      query (
        $id: ID!
      ) {
        communityDocumentation (id: $id) {
            id
            documentationJSON
         }
      }`;

export const postsForSearchQuery = `
  query (
    $text: String,
    $first: Int,
  ) {
    postSearch (
      text: $text,
      first: $first,
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

const achievement = `
  id
  factCount
  maxCount
  achievementURI
  achievementsType
  name
  description
  image
  attributes
`;

const allAchievementsQuery = `
  query (
    $userId: ID!
  ) {
    achievements {
      ${achievement}
    }
    user (id: $userId) {
      achievements { id }
    }
  }`;

const allAchievementsQueryMesh = `
  query (
    $userId: String
  ) {
    achievement (orderBy: { id: asc }) {
      ${achievement}
    }
    user (where: { id: $userId }) {
      userAchievement { achievementId }
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
    $periodsCount: Int
  ) {
    user (id: $userId) {
      ${user}
    }
    userRewards (where: {user: $userId, tokenToReward_not: 0}) {
      id
      period {
        ${period}
      }
      tokenToReward
      isPaid
    }
    periods (orderBy: endPeriodTime, orderDirection: desc, first: $periodsCount) {
      ${period}
    }
  }
`;

const rewardsQueryMesh = (periodsCount: number) =>
  editUserQuery(`
  query (
    $userId: String
  ) {
    user (where: {id: $userId}) {
      ${user}
    }
    userRewards (where: {user: $userId, tokenToReward_not: 0}) {
      id
      period {
        ${period}
      }
      tokenToReward
      isPaid
    }
    periods (orderBy: { endPeriodTime: desc }, first: ${periodsCount}) {
      ${period}
    }
  }
`);

export const currentPeriodQuery = `
  query {
    periods (orderBy: endPeriodTime, orderDirection: desc, first: 1) {
      ${period}
    }
  }
`;

const currentPeriodQueryMesh = `
  query {
    period (orderBy: { endPeriodTime: desc }, limit: 1) {
      ${period}
    }
  }
`;

const history = `
  transactionHash
  post {
    id
  }
  reply {
    id
  }
  comment {
    id
  }
  eventEntity
  eventName
  timeStamp
`;

const historiesQuery = `
  query (
   $postId: ID!,
 ) {
    histories (
      orderBy: timeStamp,
      where: {post: $postId}
    ) {
      ${history}
    }
  }
`;

const historiesQueryMesh = `
  query (
   $postId: String,
 ) {
    histories (
      orderBy: { timeStamp: asc },
      where: { postId: $postId }
    ) {
      ${history}
    }
  }
`
  .replace('reply {', 'reply (where: { postId: $postId }) {')
  .replace('comment {', 'comment (where: { postId: $postId }) {');

enum QueryName {
  User,
  Users,
  Moderation,
  UsersByCommunity,
  Histories,
  CurrentPeriod,
  Rewards,
  AllAchievements,
  Post,
  PostsForSearch,
  DocumentationMenu,
  CommunityDocumentationNotIncluded,
  CommunityDocumentation,
  FaqByComm,
  PostsByCommunity,
  Posts,
  Tags,
  Community,
  AllTags,
  AnsweredPosts,
  UserPermissions,
  UserStats,
  Communities,
  UserPosts,
}

enum GraphService {
  TheGraph,
  Mesh,
}

export const queries: {
  [key in keyof typeof QueryName]: {
    [key in keyof typeof GraphService]: string | Function;
  };
} = {
  Users: {
    TheGraph: usersQuery,
    Mesh: usersQueryMesh,
  },
  User: {
    TheGraph: userQuery,
    Mesh: userQueryMesh,
  },
  Histories: {
    TheGraph: historiesQuery,
    Mesh: historiesQueryMesh,
  },
  AllAchievements: {
    TheGraph: allAchievementsQuery,
    Mesh: allAchievementsQueryMesh,
  },
  CurrentPeriod: {
    TheGraph: currentPeriodQuery,
    Mesh: currentPeriodQueryMesh,
  },
  Moderation: {
    TheGraph: moderationQuery,
    Mesh: moderationQueryMesh,
  },
  UsersByCommunity: {
    TheGraph: usersByCommunityQuery,
    Mesh: usersByCommunityQueryMesh,
  },
  Rewards: {
    TheGraph: rewardsQuery,
    Mesh: rewardsQueryMesh, //TODO: fix bigint issue
  },
  Post: {
    TheGraph: postQuery,
    Mesh: '',
  },
  PostsForSearch: {
    TheGraph: postsForSearchQuery,
    Mesh: '',
  },
  DocumentationMenu: {
    TheGraph: documentationMenuQuery,
    Mesh: '',
  },
  CommunityDocumentationNotIncluded: {
    TheGraph: communityDocumentationNotIncludedQuery,
    Mesh: '',
  },
  CommunityDocumentation: {
    TheGraph: communityDocumentationQuery,
    Mesh: '',
  },
  FaqByComm: {
    TheGraph: faqByCommQuery,
    Mesh: '',
  },
  PostsByCommunity: {
    TheGraph: postsByCommQuery,
    Mesh: '',
  },
  Posts: {
    TheGraph: postsQuery,
    Mesh: '',
  },
  Tags: {
    TheGraph: tagsQuery,
    Mesh: '',
  },
  Community: {
    TheGraph: communityQuery,
    Mesh: '',
  },
  AllTags: {
    TheGraph: allTagsQuery,
    Mesh: '',
  },
  AnsweredPosts: {
    TheGraph: answeredPostsQuery,
    Mesh: '',
  },
  UserPermissions: {
    TheGraph: userPermissionsQuery,
    Mesh: '',
  },
  UserStats: {
    TheGraph: userStatsQuery,
    Mesh: '',
  },
  Communities: {
    TheGraph: communitiesQuery,
    Mesh: '',
  },
  UserPosts: {
    TheGraph: usersPostsQuery,
    Mesh: '',
  },
};
