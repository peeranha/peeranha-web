export const REGISTER_ACC = 'createUser';
export const UPDATE_ACC = 'updateUser';
export const GET_USER_BY_ADDRESS = 'getUserByAddress';
export const GET_USER_PERMISSIONS = 'getUserPermissions';
export const GET_USERS_COUNT = 'getUsersCount';
export const GET_COMMUNITIES_COUNT = 'getCommunitiesCount';
export const GET_COMMUNITY = 'getCommunity';
export const GET_TAGS = 'getTags';
export const GET_QUESTION = 'getPost';
export const CREATE_COMMUNITY = 'createCommunity';
export const CREATE_TAG = 'createTag';
export const POST_QUESTION = 'createPost';
export const GET_POST = 'getPost';
export const POST_ANSWER = 'createReply';

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
          id
          rating
          displayName
          company
          position
          location
          about
          avatar
          creationTime
          ipfsHash
          ipfsHash2
        }
      }`;

export const userQuery = `
      query(
        $id: ID!,
      ) {
        user(
          id: $id
        ) {
          id
          rating
          displayName
          company
          position
          location
          about
          avatar
          creationTime
          ipfsHash
          ipfsHash2
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
        }
      }`;

export const tagsQuery = `
      query(
        $first: Int,
        $communityId: ID!,
      ) {
        tags(
         first: $first,
         where: { communityId: $communityId },
        ) {
           name
           description
           id
        }
      }`;

export const postsQuery = `
      query (
        $first: Int,
        $skip: Int,
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $first,
          skip: $skip,
        ) {
           id
           tags
           postType
           author
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

export const repliesQuery = `
      query (
        $postId: Int,
      ) {
        replies (
          orderBy: postTime,
          orderDirection: desc,
          where: { postId: $postId },
        ) {
           id
           author
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
        }
      }`;

export const postsByCommQuery = `
      query (
        $first: Int,
        $skip: Int,
        $communityIds: [Int],
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $first,
          skip: $skip,
          where: { communityId_in: $communityIds },
        ) {
           id
           tags
           postType
           author
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
