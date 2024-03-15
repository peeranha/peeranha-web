const userGraph = `
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

const historyGraph = `
  transactionHash
  post {
    id
  }
  eventEntity
  eventName
  timeStamp
`;

const achievementGraph = `
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

const periodGraph = `
  id
  startPeriodTime
  endPeriodTime
`;

const communityGraph = `
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
  translations {
    communityId
    name
    description
    language
    enableAutotranslation
    id
  }
`;

const commentGraph = `
  id
  ipfsHash
  author {
    ${userGraph}
  }
  rating
  postTime
  postId
  parentReplyId
  content
  isDeleted
  properties
  translations {
    language
    content
  }
`;

const replyGraph = `
  id
  ipfsHash
  author {
    ${userGraph}
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
  language
  handle
  messengerType
  comments (
    orderBy: postTime,
    orderDirection: asc,
    where: { isDeleted: false },
  ) {
    ${commentGraph}
  }
  translations {
    language
    content
  }
`;

const postGraph = `
  id
  tags {
    id
    name
  }
  ipfsHash
  postType
  author {
    ${userGraph}
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
  networkId
  replies (
    orderBy: postTime,
    orderDirection: asc,
    where: { isDeleted: false },
  ) {
    ${replyGraph}
  }
  comments (
    orderBy: postTime,
    orderDirection: asc,
    where: { isDeleted: false },
  ) {
    ${commentGraph}
  }
  translations {
    language
    title
    content
  }
`;

const postForSearchGraph = `
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

export const usersByCommunityQueryGraph = `
      query(
        $limit: Int,
        $offset: Int,
        $communityId: String,
      ) {
        userCommunityRatings(
          first: $limit,
          skip: $offset,
          where: { communityId: $communityId }
        ) {
          user {
            ${userGraph}
            postCount
            replyCount
          }
        }
      }`;

export const userQueryGraph = `
      query(
        $id: ID!
      ) {
        user(id: $id) {
          ${userGraph}
          postCount
          replyCount
        }
      }`;

export const userPermissionsQueryGraph = `
      query(
        $id: ID!,
      ) {
        userPermissions(
          where: {user: $id},
        ) {
          permission
        }
      }`;

export const userStatsQueryGraph = `
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

export const communitiesQueryGraph = `
      query(
        $first: Int,
      ) {
        communities(
         first: $first,
        ) {
          ${communityGraph}
        }
      }`;

export const usersPostsQueryGraph = `
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
           ${postGraph}
        }
      }`;

export const usersAnswersQueryGraph = `
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

export const answeredPostsQueryGraph = `
      query (
        $ids: [String],
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $first,
          skip: $skip,
          where: { id_in: $ids, isDeleted: false, title_not: ""},
        ) {
           ${postGraph}
        }
      }`;

export const allTagsQueryGraph = `
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

export const communityQueryGraph = `
      query(
        $id: String,
      ) {
        community(id: $id ) {
          ${communityGraph}
        }
      }`;

export const tagsQueryGraph = `
      query(
        $communityId: String,
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

export const tagsByIdsQueryGraph = `
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

export const postsQueryGraph = `
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
           ${postGraph}
        }
      }`;

export const postsByCommQueryGraph = `
      query (
        $limit: Int,
        $offset: Int,
        $communityIds: [String],
        $postTypes: [Int],
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $limit,
          skip: $offset,
          where: { communityId_in: $communityIds, isDeleted: false, postType_in: $postTypes, title_not: ""},
        ) {
           ${postGraph}
        }
      }`;

export const postsByCommAndTagsQueryGraph = `
      query (
        $first: Int,
        $skip: Int,
        $communityIds: [String],
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
           ${postGraph}
        }
      }`;

export const faqByCommQueryGraph = `
      query (
        $communityId: String,
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          where: { communityId: $communityId, isDeleted: false, postType: 3 },
        ) {
           ${postGraph}
        }
      }`;

export const communityDocumentationQueryGraph = `
      query (
        $id: ID!
      ) {
         post (id: $id) {
           ${postGraph}
         }
      }`;

export const documentationMenuQueryGraph = `
      query (
        $id: ID!
      ) {
        communityDocumentation (id: $id) {
            id
            documentationJson
         }
      }`;

export const postsForSearchQueryGraph = `
  query (
    $text: String,
    $first: Int,
  ) {
    postSearch (
      text: $text,
      first: $first,
      where: {isDeleted: false, title_not: ""},
    ) {
        ${postForSearchGraph}
        tags {
          id
          name
        }
        author {
          ${userGraph}
        }
        properties
    }
  }`;

export const postQueryGraph = `
  query (
    $postId: String,
  ) {
    post (
      id: $postId,
      where: {isDeleted: false, title_not: ""},
    ) {
       ${postGraph}
    }
  }
`;

export const replyQueryGraph = `
  query (
    $replyId: String,
  ) {
    reply (id: $replyId) {
      ${replyGraph}
  }
}
`;

export const allAchievementsQueryGraph = `
  query (
    $userId: ID!
  ) {
    achievements {
      ${achievementGraph}
    }
    user (id: $userId) {
      achievements {
        id
       }
    }
  }`;

export const rewardsQueryGraph = `
  query (
    $userId: ID!,
    $periodsCount: Int
  ) {
    user (id: $userId) {
      ${userGraph}
    }
    userRewards (where: {user: $userId, tokenToReward_not: 0}) {
      id
      period {
        ${periodGraph}
      }
      tokenToReward
      isPaid
    }
    periods (orderBy: endPeriodTime, orderDirection: desc, first: $periodsCount) {
      ${periodGraph}
    }
  }
`;

export const currentPeriodQueryGraph = `
  query {
    periods (orderBy: endPeriodTime, orderDirection: desc, first: 1) {
      ${periodGraph}
    }
  }
`;

export const historiesQueryGraph = `
  query (
   $postId: String,
 ) {
  histories (
      orderBy: timeStamp,
      where: {post: $postId}
    ) {
      ${historyGraph}
      reply {
        id
      }
      comment {
        id
      }
    }
  }
`;

export const voteHistoryGraph = `
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

export const usersQueryGraph = `
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
          ${userGraph}
          postCount
          replyCount
        }
      }`;

export const moderationQueryGraph = `
  query(
    $roles: [String],
  ) {
    userPermissions (where: {permission_in: $roles}) {
      id
      user {
        ${userGraph}
      }
      permission
    }
  }
`;

export const historyIdQueryGraph = `
  query (
    $id: String,
  ) {
    history (
      id: $id
    ) {
      id
    }
}`;
