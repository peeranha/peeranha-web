// Contracts
export const CONTRACT_TOKEN = 'contractToken';
export const CONTRACT_USER = 'contractUser';
export const CONTRACT_CONTENT = 'contractContent';
export const CONTRACT_COMMUNITY = 'contractCommunity';

export const ContractsMapping = {
  [CONTRACT_TOKEN]: 'token',
  [CONTRACT_USER]: 'user',
  [CONTRACT_CONTENT]: 'content',
  [CONTRACT_COMMUNITY]: 'community',
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
export const GIVE_COMMUNITY_ADMIN_PERMISSION = 'giveCommunityAdminPermission';
export const REVOKE_COMMUNITY_ADMIN_PERMISSION = 'revokeCommunityAdminPermission';

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

const editUserQuery = (query: string) =>
  query
    .replace('ratings', 'usercommunityrating')
    .replace('achievements { id }', 'userachievement { achievementId }');

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

const userMesh = editUserQuery(user);

const comment = `
  id
  id2
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

const commentMesh = `
  id
  id2
  ipfsHash
  user {
    ${userMesh}
  }
  rating
  postTime
  postId
  parentReplyId
  content
  isDeleted
`;

const reply = `
  id
  id2
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
  handle
  messengerType
  comments (
    orderBy: postTime,
    orderDirection: asc,
    where: { isDeleted: false },
  ) {
    ${comment}
  }
`;

const replyMesh = `
  id
  id2
  ipfsHash
  user {
    ${userMesh}
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
  handle
  messengerType
  replyvotehistory {
    userId
    direction
  }
`;

const post = `
  id
  tags {
    id
    name
  }
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
  properties
  handle
  messengerType
  language
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

const postMesh = `
  id
  id2
  posttag {
    tag {
      id
      name
    }
  }
  ipfsHash
  postType
  user {
    ${userMesh}
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
  handle
  messengerType
  lastMod
  history {
    id
    transactionHash
    postId
    replyId
    commentId
    eventEntity
    eventName
    actionUser
    timeStamp
  }
  postvotehistory {
    userId
    direction
  }
  reply (
    orderBy: { postTime: desc },
    where: { isDeleted: "0" },
  ) {
    ${replyMesh}
  }
  comment (
    orderBy: { postTime: asc },
    where: { isDeleted: "0" },
  ) {
    ${commentMesh}
  }`;

const usersQuery = `
      query(
        $first: Int,
        $skip: Int,
        $orderBy: String,
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
  `query(
    $first: Int,
    $skip: Int
  ) {
    user(
      limit: $first,
      offset: $skip,
      orderBy: { ${orderBy}: ${orderDirection} },
    ) {
      ${userMesh}
      postCount
      replyCount
    }
  }`;

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
  `query {
    userpermission (where: { permission: "(${roles})" }) {
      id
      user {
        ${userMesh}
      }
      permission
    }
  }
`;

const usersByCommunityQuery = `
      query(
        $limit: Int,
        $offset: Int,
        $communityId: Int,
      ) {
        userCommunityRatings(
          first: $limit,
          skip: $offset,
          where: { communityId: $communityId }
        ) {
          user {
            ${user}
            postCount
            replyCount
          }
        }
      }`;

const usersByCommunityQueryMesh = `
  query(
    $limit: Int,
    $offset: Int,
    $communityId: Int,
  ) {
    usercommunityrating (
      limit: $limit,
      offset: $offset,
      where: { communityId: $communityId }
    ) {
      user {
        ${userMesh}
        postCount
        replyCount
      }
    }
  }`;

const userQuery = `
      query(
        $id: ID!
      ) {
        user(id: $id) {
          ${user}
          postCount
          replyCount
        }
      }`;

const userQueryMesh = `
      query(
        $id: String
      ) {
        user(where: { id: $id }) {
          ${userMesh}
          postCount
          replyCount
        }
      }`;

const userPermissionsQuery = `
      query(
        $id: ID!,
      ) {
        userPermissions(
          where: {user: $id},
        ) {
          permission
        }
      }`;

const userPermissionsQueryMesh = `
  query(
    $id: String
  ) {
    userpermission(
      where: { userId: $id }
    ) {
      permission
    }
  }`;

const userStatsQuery = `
      query(
        $id: ID!,
      ) {
        user(
          id: $id
        ) {
          postCount
          replyCount
          achievements { id }
          ratings {
           communityId
           rating
          }
        }
      }`;

const userStatsQueryMesh = editUserQuery(
  userStatsQuery.replace('ID!', 'String').replace('id: $id', 'where: { id: $id }'),
);

const community = `
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
`;

const communitiesQuery = `
      query(
        $first: Int,
      ) {
        communities(
         first: $first,
        ) {
          ${community}
        }
      }`;

const communitiesQueryMesh = `
      query(
        $first: Int,
      ) {
        community (
         limit: $first,
        ) {
          ${community}
        }
      }`;

const usersPostsQuery = `
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
          where: {isDeleted: false, author: $id, postType_lt: 3, title_not: ""},
        ) {
           ${post}
        }
      }`;

const usersPostsQueryMesh = `
      query(
        $id: String,
        $limit: Int,
        $offset: Int,
      ) {
        post (
          orderBy: { postTime: desc },
          limit: $offset,
          offset: $limit,
          where: { isDeleted: "0", author: $id, postType: "<3" },
        ) {
           ${postMesh}
        }
      }`;

const usersAnswersQuery = `
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

const usersAnswersQueryMesh = `
      query (
        $id: String,
        $limit: Int,
        $offset: Int,
      ) {
        reply (
             orderBy: { postTime: desc },
             where: { isDeleted: "0", author: $id },
             limit: $limit,
             offset: $offset,
           ) {
          postId
        }
      }`;

const answeredPostsQuery = `
      query (
        $ids: [Int],
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $first,
          skip: $skip,
          where: { id_in: $ids, isDeleted: false, title_not: ""},
        ) {
           ${post}
        }
      }`;

const answeredPostsQueryMesh = (ids: string) => `
      query {
        post (
          orderBy: { postTime: desc },
          where: { id: "(${ids})", isDeleted: "0" },
        ) {
           ${postMesh}
        }
      }`;

const allTagsQuery = `
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

const allTagsQueryMesh = allTagsQuery.replace('tags', 'tag');

const communityQuery = `
      query(
        $id: ID!,
      ) {
        community(
         id: $id,
        ) {
          ${community}
        }
      }`;

const communityQueryMesh = communityQuery.replace('ID!', 'String');

const tagsQuery = `
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

const tagsQueryMesh = tagsQuery.replace('ID!', 'String').replace('tags', 'tag');

const tagsByIdsQuery = `
      query(
        $ids: [String],
      ) {
        tags(
         where: { id_in: $ids },
        ) {
           id
           name
           description
           postCount
        }
      }`;

const tagsByIdsQueryMesh = (ids: string) => `
  query {
    tag(
      where: { id: "(${ids})" },
    ) {
      id
      name
      description
      postCount
    }
  }`;

const postsQuery = `
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
          where: {isDeleted: false, postType_in: $postTypes, title_not: ""},
        ) {
           ${post}
        }
      }`;

const postsQueryMesh = (postTypes: string) => `
  query (
    $first: Int,
    $skip: Int
  ) {
    post (
      orderBy: { postTime: desc },
      limit: $first,
      offset: $skip,
      where: {isDeleted: "0", postType: "(${postTypes})" },
    ) {
      ${postMesh}
    }
  }`;

const postsByCommQuery = `
      query (
        $limit: Int,
        $offset: Int,
        $communityIds: [Int],
        $postTypes: [Int],
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $limit,
          skip: $offset,
          where: { communityId_in: $communityIds, isDeleted: false, postType_in: $postTypes, title_not: ""},
        ) {
           ${post}
        }
      }`;

const postsByCommQueryMesh = (postTypes: string, communityIds: string) => `
  query (
    $limit: Int,
    $offset: Int
  ) {
    post (
      orderBy: { postTime: desc },
      limit: $limit,
      offset: $offset,
      where: { communityId: "(${communityIds})", isDeleted: "0", postType: "(${postTypes})" },
    ) {
      ${postMesh}
    }
  }`;

const postsByCommAndTagsQuery = `
  query (
    $first: Int,
    $skip: Int,
    $communityIds: [Int],
    $postTypes: [Int],
    $tags: [String],
  ) {
    posts (
      orderBy: postTime,
      orderDirection: desc,
      first: $first,
      skip: $skip,
      where: { communityId_in: $communityIds, isDeleted: false, postType_in: $postTypes, title_not: "", tags_contains: $tags},
    ) {
       ${post}
    }
  }`;

export const postsIdsByTagsQueryMesh = (tags: string) => `
  query (
    $first: Int,
    $skip: Int,
  ) {
    posttag (
      limit: $first,
      offset: $skip,
      where: { id: "(${tags})", },
    ) {
      postId
    }
  }`;

const postsByCommAndTagsQueryMesh = (ids: string, postTypes: string) => `
  query {
    post (
      where: { id: "(${ids})", postType: "(${postTypes})",},
      orderBy: { postTime: desc }
    ) {
      ${postMesh}
    }
  }`;

const faqByCommQuery = `
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

const faqByCommQueryMesh = `
      query (
        $communityId: Int,
      ) {
        post (
          orderBy: { postTime: desc },
          where: { communityId: $communityId, isDeleted: "0", postType: "3" },
        ) {
           ${postMesh}
        }
      }`;

const communityDocumentationQuery = `
      query (
        $id: ID!
      ) {
         post (id: $id) {
           ${post}
         }
      }`;

const communityDocumentationQueryMesh = `
      query (
        $id: ID!
      ) {
         post (where: { id: $id }) {
           ${postMesh}
         }
      }`;

const documentationMenuQuery = `
      query (
        $id: ID!
      ) {
        communityDocumentation (id: $id) {
            id
            documentationJSON
         }
      }`;

const documentationMenuQueryMesh = `
      query (
        $id: Int
      ) {
        communitydocumentation (where: { id: $id }) {
          id
          documentationJSON
         }
      }`;

const postForSearch = `
  id
  ipfsHash
  postType
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
`;

const postsForSearchQuery = `
  query (
    $text: String,
    $first: Int,
  ) {
    postSearch (
      text: $text,
      first: $first,
      where: {isDeleted: false, title_not: ""},
    ) {
        ${postForSearch}
        tags {
          id
          name
        }
        author {
          ${user}
        }
        properties
    }
  }`;

const postsForSearchQueryMesh = (text: string) => `
  query (
    $first: Int,
  ) {
    post (
      first: $first,
      where: { postContent: "*${text}*", isDeleted: "0"},
    ) {
        ${postForSearch}
        posttag {
          tag {
            id
            name
          }
        }
        user {
          ${userMesh}
        }
    }
  }`;

const postQuery = `
      query (
        $postId: Int,
      ) {
        post (
          id: $postId,
          where: {isDeleted: false, title_not: ""},
        ) {
           ${post}
        }
      }
`;

const postQueryMesh = `
  query (
    $postId: String
  ) {
    post (
      where: { id: $postId, isDeleted: "0" }
    ) {
      ${postMesh}
    }
  }
`;

const achievement = `
  id
  factCount
  maxCount
  achievementURI
  achievementsType
  lowerValue
  name
  description
  image
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
      userachievement { achievementId }
    }
  }`;

const period = `
  id
  startPeriodTime
  endPeriodTime
`;

const rewardsQuery = `
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
  `query (
    $userId: String
  ) {
    user (where: {id: $userId}) {
      ${userMesh}
    }
    userreward (where: {userId: $userId, tokenToReward: ">0"}) {
      id
      period {
        ${period}
      }
      tokenToReward
      isPaid
    }
    period (orderBy: { endPeriodTime: desc }, first: ${periodsCount}) {
      ${period}
    }
  }
`;

const currentPeriodQuery = `
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
      reply {
        id
      }
      comment {
        id
      }
    }
  }
`;

const historiesQueryMesh = `
  query (
   $postId: String,
 ) {
    history (
      orderBy: { timeStamp: asc },
      where: { postId: $postId }
    ) {
      ${history}
      replyId
      commentId
    }
  }
`;

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
  UserAnswers,
  PostsByCommAndTags,
  TagsByIds,
}

enum GraphService {
  TheGraph,
  Mesh,
}

type functionType = (...params: any[]) => string;
export const queries: {
  [queryKey in keyof typeof QueryName]: {
    [serviceKey in keyof typeof GraphService]: string | functionType;
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
    Mesh: rewardsQueryMesh,
  },
  Post: {
    TheGraph: postQuery,
    Mesh: postQueryMesh,
  },
  PostsForSearch: {
    TheGraph: postsForSearchQuery,
    Mesh: postsForSearchQueryMesh,
  },
  DocumentationMenu: {
    TheGraph: documentationMenuQuery,
    Mesh: documentationMenuQueryMesh,
  },
  CommunityDocumentation: {
    TheGraph: communityDocumentationQuery,
    Mesh: communityDocumentationQueryMesh,
  },
  FaqByComm: {
    TheGraph: faqByCommQuery,
    Mesh: faqByCommQueryMesh,
  },
  PostsByCommunity: {
    TheGraph: postsByCommQuery,
    Mesh: postsByCommQueryMesh,
  },
  Posts: {
    TheGraph: postsQuery,
    Mesh: postsQueryMesh,
  },
  Tags: {
    TheGraph: tagsQuery,
    Mesh: tagsQueryMesh,
  },
  Community: {
    TheGraph: communityQuery,
    Mesh: communityQueryMesh,
  },
  AllTags: {
    TheGraph: allTagsQuery,
    Mesh: allTagsQueryMesh,
  },
  AnsweredPosts: {
    TheGraph: answeredPostsQuery,
    Mesh: answeredPostsQueryMesh,
  },
  UserPermissions: {
    TheGraph: userPermissionsQuery,
    Mesh: userPermissionsQueryMesh,
  },
  UserStats: {
    TheGraph: userStatsQuery,
    Mesh: userStatsQueryMesh,
  },
  Communities: {
    TheGraph: communitiesQuery,
    Mesh: communitiesQueryMesh,
  },
  UserPosts: {
    TheGraph: usersPostsQuery,
    Mesh: usersPostsQueryMesh,
  },
  UserAnswers: {
    TheGraph: usersAnswersQuery,
    Mesh: usersAnswersQueryMesh,
  },
  PostsByCommAndTags: {
    TheGraph: postsByCommAndTagsQuery,
    Mesh: postsByCommAndTagsQueryMesh,
  },
  TagsByIds: {
    TheGraph: tagsByIdsQuery,
    Mesh: tagsByIdsQueryMesh,
  },
};

export const replyId2QueryMesh = `
  query (
    $replyId: String,
  ) {
    reply (
      where: { id: $replyId },
    ) {
      id2
    }
  }
`;

export const commentId2QueryMesh = `
  query (
    $commentId: String,
  ) {
    comment (
      where: { id: $commentId }
    ) {
      id2
    }
  }
`;
