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
      query(
        $id: String,
      ) {
        user(
          where: { id: $id }
        ) {
          postCount
          replyCount
          userachievement { achievementId }
          usercommunityrating {
           communityId
           rating
          }
        }
      }`;

export const allTagsQueryMesh = `
      query (
       $skip: Int,
      ) {
        tag (
          skip: $skip,
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

export const userQueryMesh = `
      query(
        $id: String
      ) {
        user(where: { id: $id }) {
          ${userMesh}
          postCount
          replyCount
        }
      }`;

export const userPermissionsQueryMesh = `
  query(
    $id: String
  ) {
    userpermission(
      where: { userId: $id }
    ) {
      permission
    }
  }`;

export const communitiesQueryMesh = `
      query {
        community (where: {networkId: "(${getNetworkIds()})"}) {
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
          orderBy: { postTime: desc },
          limit: $offset,
          offset: $limit,
          where: { isDeleted: "0", author: $id, postType: "<3", networkId: "(${getNetworkIds()})" },
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
             orderBy: { postTime: desc },
             where: { isDeleted: "0", author: $id },
             limit: $limit,
             offset: $offset,
           ) {
          postId
        }
      }`;

export const answeredPostsQueryMesh = (ids: string) => `
      query {
        post (
          orderBy: { postTime: desc },
          where: { id: "(${ids})", isDeleted: "0" },
        ) {
           ${postMesh}
        }
      }`;

export const communityQueryMesh = `
      query(
        $id: String,
      ) {
        community(where: { id: $id }) {
          ${communityMesh}
        }
      }`;

export const tagsQueryMesh = `
      query(
        $communityId: String,
      ) {
        tag(
         where: { communityId: $communityId },
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
      where: { id: "(${ids})" },
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
      where: { isDeleted: "0" }
    ) {
      id
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
      orderBy: { postTime: desc },
      limit: $limit,
      offset: $offset,
      where: {isDeleted: "0", postType: "(${postTypes})", networkId: "(${getNetworkIds()})" },
    ) {
      ${postMeshShallow}
    }
    count_post (
      where: {isDeleted: "0", postType: "(${postTypes})", networkId: "(${getNetworkIds()})" },
    )
  }`;

export const postsByCommQueryMesh = (postTypes: string, communityIds: string) => `
  query (
    $limit: Int,
    $offset: Int
  ) {
    post (
      orderBy: { postTime: desc },
      limit: $limit,
      offset: $offset,
      where: { communityId: "(${communityIds})", isDeleted: "0", postType: "(${postTypes})", networkId: "(${getNetworkIds()})" },
    ) {
      ${postMeshShallow}
    }
    count_post (
      where: { communityId: "(${communityIds})", isDeleted: "0", postType: "(${postTypes})", networkId: "(${getNetworkIds()})" },
    )
  }`;

export const postsIdsByTagsQueryMesh = (tags: string) => `
  query (
    $first: Int,
    $skip: Int,
  ) {
    posttag (
      limit: $first,
      offset: $skip,
      where: { tagId: "(${tags})" },
    ) {
      postId
    }
  }`;

export const postsByCommAndTagsQueryMesh = (ids: string, postTypes: string) => `
  query {
    post (
      where: { id: "(${ids})", postType: "(${postTypes})", networkId: "(${getNetworkIds()})" },
      orderBy: { postTime: desc }
    ) {
      ${postMeshShallow}
    }
    count_post (
      where: { communityId: "(${ids})", isDeleted: "0", postType: "(${postTypes})", networkId: "(${getNetworkIds()})" },
    )
  }`;

export const faqByCommQueryMesh = `
  query (
    $communityId: String,
  ) {
    post (
      orderBy: { postTime: desc },
      where: { communityId: $communityId, isDeleted: "0", postType: "3" },
    ) {
       ${postMesh}
    }
  }`;

export const communityDocumentationQueryMesh = `
  query (
    $id: ID!
  ) {
     post (where: { id: $id }) {
       ${postMesh}
     }
  }`;

export const documentationMenuQueryMesh = `
  query (
    $id: String
  ) {
    communitydocumentation (where: { id: $id }) {
      id
      documentationJSON
     }
  }`;

export const postsForSearchQueryMesh = (text: string) => `
  query (
    $first: Int,
  ) {
    post (
      first: $first,
      where: { postContent: "*${text}*", isDeleted: "0", networkId: "(${getNetworkIds()})"},
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
      where: { id: $postId, isDeleted: "0" },
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
      where: { id: $replyId, isDeleted: "0" },
    ) {
      ${replyMesh}
    }
  }
`;

export const allAchievementsQueryMesh = `
  query (
    $userId: String
  ) {
    achievement (orderBy: { id: asc }) {
      ${achievementMesh}
    }
    user (where: { id: $userId }) {
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
    user (where: {id: $userId}) {
      ${userMesh}
    }
    userreward (where: {userId: $userId, tokenToReward: ">0"}) {
      id
      period {
        ${periodMesh}
      }
      tokenToReward
      isPaid
    }
    period (orderBy: { endPeriodTime: desc }, first: ${periodsCount}) {
      ${periodMesh}
    }
  }
`;

export const currentPeriodQueryMesh = `
  query {
    period (orderBy: { endPeriodTime: desc }, limit: 1) {
      ${periodMesh}
    }
  }
`;

export const historiesQueryMesh = `
  query (
   $postId: String,
 ) {
    history (
      orderBy: { timeStamp: asc },
      where: { postId: $postId }
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

export const voteHistoryMesh = `
      query(
        $postId: String,
        $userId: String,
      ) {
        postvotehistory(
          where: {
            postId: $postId,
            userId: $userId,
          }
        ) {
          direction
        }
      }`;

export const usersQueryMesh = (orderBy: string, orderDirection: string) =>
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

export const moderationQueryMesh = (roles: string) =>
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
