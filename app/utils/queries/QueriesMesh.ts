import { isSuiBlockchain } from 'utils/constants';

export const getNetworkIds = (): string => (isSuiBlockchain ? '3' : '1, 2');

const userMesh = `
  id
  usercommunityrating {
    communityId
    rating
  }
  displayName
  company
  position
  location
  customName
  walletAddress
  about
  avatar
  creationTime
  userachievement { achievementId }
  usercommunity {
    communityId
  }
  userpermission {
    permission
  }
  isGlobalBan
`;

const historyMesh = `
  transactionHash
  post {
    id
  }
  eventEntity
  eventName
  timeStamp
`;

const achievementMesh = `
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

const periodMesh = `
  id
  startPeriodTime
  endPeriodTime
`;

const communityMesh = `
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
  networkId
  followingUsers
  replyCount
  communitySite
  communitytranslation {
    communityId
    name
    description
    language
    enableAutotranslation
    id
  }
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
  language
  isDeleted
  commenttranslation {
    language
    content
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
  language
  handle
  messengerType
  replyvotehistory {
    userId
    direction
  }
  replytranslation {
    language
    content
  }
`;

const postMesh = `
  id
  id2
  ipfsHash
  posttag {
    tag {
      id
      name
    }
  }
  postType
  user {
    ${userMesh}
  }
  networkId
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
  messengerType
  language
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
  reply (
    orderBy: POST_TIME_ASC,
    condition: {
      isDeleted: false
    }
  ) {
    ${replyMesh}
  }
  comment (
    orderBy: POST_TIME_ASC,
    condition: {
      isDeleted: false
    }
  ) {
    ${commentMesh}
  }
  posttranslation {
     language
     title
     content
  }
   postvotehistory {
    userId
    direction
  }
  `;

const postForSearchMesh = `
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

const userMeshShallow = `
  id
  displayName
  avatar
  customName
  walletAddress
  userachievement {
    id
    isMinted
  }
  usercommunityrating {
    communityId
    rating
  }
`;

const tagMeshShallow = `
  id
  name
`;

export const userStatsQueryMesh = `
  query (
  $id: String!
) {
  userById(id: $id) {
    postCount
    replyCount
    userachievement { achievementId }
    usercommunityrating {
      communityId
      rating
    }
  }
}
`;

export const allTagsQueryMesh = `
  query (
  $skip: Int,
) {
  tag (
    offset: $skip,
  ) {
    id
    communityId
    name
    description
    postCount
  }
}`;

export const usersByCommunityQueryMesh = `
  query(
    $limit: Int,
    $offset: Int,
    $communityId: String,
  ) {
    usercommunityrating (
      first: $limit,
      offset: $offset,
      condition: { communityId: $communityId }
    ) {
      user {
        ${userMesh}
        postCount
        replyCount
      }
    }
  }`;

export const userQueryMesh = `
  query ($id: String!) {
    userById(id: $id) {
      ${userMesh}
      postCount
      replyCount
      usercommunityban {
        id
      }
    }
}`;

export const userCommunityBanQueryMesh = `
  query (
    $id: String
  ) {
    usercommunityban (
      condition: { userId: $id }
    ) {
      communityId
    }
}`;

export const userPermissionsQueryMesh = `
  query(
    $id: String
  ) {
    userpermission(
      condition: { userId: $id }
    ) {
      permission
    }
  }`;

export const communitiesQueryMesh = `
  query {
  community (
    filter: {
        networkId: {
            in: [${getNetworkIds()}]
        }
    }
  ) {
      ${communityMesh}
  }
}`;

export const usersPostsQueryMesh = `
  query(
  $id: String,
  $limit: Int,
  $offset: Int,
) {
  post (
    orderBy: POST_TIME_DESC
    first: $limit,
    offset: $offset,
    condition: {
        isDeleted: false,
        author: $id
    },
    filter: {
        postType: {
            in: [0,1,2]
        },
        networkId: {
            in: [${getNetworkIds()}]
        }
    }
  ) {
      ${postMesh}
  }
}`;

export const usersAnswersQueryMesh = `
query (
  $id: String,
  $limit: Int,
  $offset: Int,
) {
  reply (
    orderBy: POST_TIME_DESC,
    first: $limit,
    offset: $offset,
    condition: {
        isDeleted: false,
        author: $id
    }
  ) {
      postId
  }
}`;

export const answeredPostsQueryMesh = (ids: string) => `
  query {
  post (
    orderBy: POST_TIME_DESC,
    condition: {isDeleted: false},
    filter: {
        id: {
            in: [${ids}]
        }
      }
  ) {
      ${postMesh}
  }
}`;

export const communityQueryMesh = `
query (
  $id: String!
) {
    communityById(id: $id) {
      ${communityMesh}
  }
}`;

export const tagsQueryMesh = `
  query(
  $communityId: String,
) {
  tag(
    condition: {
       communityId: $communityId
    }
  ) {
    name
    description
    id
    postCount
  }
}`;

export const tagsByIdsQueryMesh = (ids: string) => `
  query {
  tag(
    filter: {
        id: {
            in: [${ids}]
        }
    }
  ) {
    id
    name
    description
    postCount
  }
}`;

export const postMeshShallow = `
    id
    id2
    postType
    author
    rating
    postTime
    communityId
    title
    replyCount
    isDeleted
    officialReply
    bestReply
    handle
    messengerType
    language
    community {
      id
      name
      language
      avatar
      communitytranslation {
        communityId
        id
        language
        name
      }
    }
    user {
      ${userMeshShallow}
    }
    posttag {
      tag {
        ${tagMeshShallow}
      }
    }
    reply (
      condition: { isDeleted: false }
    ) {
      id
      isOfficialReply
    }
    posttranslation {
      language
      title
    }
`;

export const postsQueryMesh = (postTypes: string) => `
  query (
  $limit: Int,
  $offset: Int
) {
  post (
    orderBy: POST_TIME_DESC,
    first: $limit,
    offset: $offset,
    condition: {
        isDeleted: false
    },
    filter: {
        postType: {
            in: [${postTypes}]
        },
        networkId: {
            in: [${getNetworkIds()}]
        }
    }
  ) {
    ${postMeshShallow}
  }
  postsConnection (
    condition: {
        isDeleted: false,
    },
    filter: {
        postType: {
            in: [${postTypes}]
        },
        networkId: {
            in: [${getNetworkIds()}]
        }
    }
  ) {
    totalCount
  }
}`;

export const postsByCommQueryMesh = (postTypes: string, communityIds: string) => `
  query (
  $limit: Int,
  $offset: Int
) {
  post (
    orderBy: POST_TIME_DESC,
    first: $limit,
    offset: $offset,
    condition: {
        isDeleted: false
    },
    filter: {
        communityId: {
            in: [${communityIds}]
        },
        postType: {
            in: [${postTypes}]
        },
        networkId: {
            in: [${getNetworkIds()}]
        }
    }
  ) {
    ${postMeshShallow}
  }
  postsConnection (
    condition: {
        isDeleted: false,
    },
    filter: {
      communityId: {
            in: [${communityIds}]
        },
        postType: {
            in: [${postTypes}]
        },
        networkId: {
            in: [${getNetworkIds()}]
        }
    }
  ) {
    totalCount
  }
}`;

export const postsCountByCommQueryMesh = (postTypes: string, communityIds: string) => `
  query (
  $limit: Int,
  $offset: Int
) {
  postsConnection (
    condition: {
        isDeleted: false,
    },
    filter: {
      communityId: {
            in: [${communityIds}]
        },
        postType: {
            in: [${postTypes}]
        },
        networkId: {
            in: [${getNetworkIds()}]
        }
    }
  ) {
    totalCount
  }
}`;

export const postsIdsByTagsQueryMesh = /* GraphQL */ `
  query ($tagIds: [String!], $postTypes: [Int!], $first: Int, $offset: Int) {
    filterposttagbytagids(tagids: $tagIds, posttypes: $postTypes, first: $first, offset: $offset)
  }
`;

export const postsByCommAndTagsQueryMesh = `
  query ($ids: [String!]) {
  post (
    orderBy: POST_TIME_DESC,
    filter: {
      id: {
          in: $ids
      }
  }
  ) {
    ${postMeshShallow}
  }
  postsConnection (
    filter: {
        id: {
            in: $ids
        }
    }
  ) {
    totalCount
  }
}`;

export const faqByCommQueryMesh = `
  query (
  $communityId: String,
) {
  post (
    orderBy: POST_TIME_DESC
    condition: {
        communityId: $communityId,
        isDeleted: false,
        postType: 3
    }
  ) {
      ${postMesh}
  }
}`;

export const communityDocumentationQueryMesh = `
  query ($id: String!) {
  postById(id: $id) {
    ${postMesh}
  }
}`;

export const documentationMenuQueryMesh = `
  query ($id: String!) {
  communitydocumentationById(id: $id) {
    id
    documentationJson
  }
}`;

export const postsForSearchQueryMesh = /* GraphQL */ `
query (
  $first: Int,
  $text: String
) {
  post (
    first: $first,
    condition: {
        isDeleted: false,
    },
    filter: {
      postContent: {
        includesInsensitive: $text,
      }
      networkId: {
          in: [${getNetworkIds()}]
      }
    }
  ) {
      ${postForSearchMesh}
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

export const postQueryMesh = `
query (
  $postId: String,
) {
  post (
    condition: {id: $postId }
  ) {
    ${postMesh}
  }
}
`;

export const replyQueryMesh = `
  query (
  $replyId: String,
) {
  reply (
    condition: { id: $replyId, isDeleted: false },
  ) {
    ${replyMesh}
  }
}
`;

export const allAchievementsQueryMesh = `
  query (
  $userId: String
) {
  achievement (orderBy: ID_ASC) {
    ${achievementMesh}
  }
  user (condition: {id: $userId}) {
    userachievement {
      achievementId
      isMinted
    }
  }
}`;

export const rewardsQueryMesh = (periodsCount: number) =>
  `query (
  $userId: String
) {
  user (condition: {id: $userId}) {
    ${userMesh}
  }
  userreward (
      condition: { userId: $userId }
      filter: { rating: { greaterThan: 0 } }
  ) {
    id
    period {
      ${periodMesh}
    }
    tokenToReward
    isPaid
  }
  period (
      orderBy: END_PERIOD_TIME_DESC, first: ${periodsCount}
    ) {
      ${periodMesh}
  }
}
`;

export const currentPeriodQueryMesh = `
query {
  period (
      orderBy: END_PERIOD_TIME_DESC,
      first: 1
  ) {
    ${periodMesh}
  }
}
`;

export const historiesQueryMesh = `
query (
  $postId: String,
) {
   history (
     orderBy: TIMESTAMP_ASC,
     condition: {postId: $postId}
   ) {
      ${historyMesh}
     replyId
     commentId
   }
 }
`;

export const replyId2QueryMesh = `
  query (
  $replyId: String,
) {
  reply (condition: {id: $replyId}) {
    id2
  }
}
`;

export const commentId2QueryMesh = `
query (
  $commentId: String,
) {
  comment (condition: {id: $commentId}) {
    id2
  }
}
`;

export const voteHistoryMesh = `
      query(
        $postId: String,
        $userId: String,
      ) {
        postvotehistory(
          condition: {
            postId: $postId,
            userId: $userId,
          }
        ) {
          direction
        }
      }`;

export const usersQueryMesh = (UsersOrderBy: string) =>
  `query(
        $first: Int,
        $skip: Int
      ) {
        user(
          first: $first,
          offset: $skip,
          orderBy: ${UsersOrderBy},
        ) {
          ${userMesh}
          postCount
          replyCount
        }
      }`;

export const moderationQueryMesh = (roles: string) =>
  `query {
        userpermission (
          filter: {
              permission: {
                  in: [${roles}]
              }
          }
        ) {
          id
          user {
            ${userMesh}
          }
          permission
        }
      }
    `;
