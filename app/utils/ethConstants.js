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
export const EDIT_COMMUNITY = 'updateCommunity';
export const FOLLOW_COMMUNITY = 'followCommunity';
export const UNFOLLOW_COMMUNITY = 'unfollowCommunity';
export const CREATE_TAG = 'createTag';
export const POST_QUESTION = 'createPost';
export const GET_POST = 'getPost';
export const GET_REPLY = 'getReply';
export const GET_STATUS_HISTORY = 'getStatusHistory';
export const GET_VOTED_USERS = 'getVotedUsers';
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

export const UPVOTE_STATUS = 1;
export const DOWNVOTE_STATUS = -1;

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
          deletedPostCount
          followingUsers
          replyCount
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
      ) {
        posts (
          orderBy: postTime,
          orderDirection: desc,
          first: $first,
          skip: $skip,
          where: {isDeleted: false},
        ) {
           id
           tags
           postType
           author {
              id
              rating
              displayName
              company
              position
              location
              about
              avatar
              creationTime
           }
           rating
           postTime
           communityId
           title
           content
           commentCount
           replyCount
           replies (
             orderBy: postTime,
             orderDirection: desc,
             where: { isDeleted: false },
           ) {
             id
             author {
                id
                rating
                displayName
                company
                position
                location
                about
                avatar
                creationTime
             }
             rating
             postTime
             postId
             parentReplyId
             content
             commentCount
             comments (
              orderBy: postTime,
              orderDirection: asc,
              where: { isDeleted: false },
             ) {
               id
               author {
                  id
                  rating
                  displayName
                  company
                  position
                  location
                  about
                  avatar
                  creationTime
               }
               rating
               postTime
               postId
               parentReplyId
               content
               isDeleted
               properties
             }
             isDeleted
             isOfficialReply
             isBestReply
             isFirstReply
             isQuickReply
             properties
           }
           comments (
            orderBy: postTime,
            orderDirection: asc,
            where: { isDeleted: false },
           ) {
             id
             author {
                id
                rating
                displayName
                company
                position
                location
                about
                avatar
                creationTime
             }
             rating
             postTime
             postId
             parentReplyId
             content
             isDeleted
             properties
           }
           isDeleted
           officialReply
           bestReply
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
          where: { communityId_in: $communityIds, isDeleted: false },
        ) {
           id
           tags
           postType
           author {
              id
              rating
              displayName
              company
              position
              location
              about
              avatar
              creationTime
           }
           rating
           postTime
           communityId
           title
           content
           commentCount
           replyCount
           replies (
             orderBy: postTime,
             orderDirection: desc,
             where: { isDeleted: false },
           ) {
             id
             author {
                id
                rating
                displayName
                company
                position
                location
                about
                avatar
                creationTime
             }
             rating
             postTime
             postId
             parentReplyId
             content
             commentCount
             comments (
              orderBy: postTime,
              orderDirection: asc,
              where: { isDeleted: false },
             ) {
               id
               author {
                  id
                  rating
                  displayName
                  company
                  position
                  location
                  about
                  avatar
                  creationTime
               }
               rating
               postTime
               postId
               parentReplyId
               content
               isDeleted
               properties
             }
             isDeleted
             isOfficialReply
             isBestReply
             isFirstReply
             isQuickReply
             properties
           }
           comments (
            orderBy: postTime,
            orderDirection: asc,
            where: { isDeleted: false },
           ) {
             id
             author {
                id
                rating
                displayName
                company
                position
                location
                about
                avatar
                creationTime
             }
             rating
             postTime
             postId
             parentReplyId
             content
             isDeleted
             properties
           }
           isDeleted
           officialReply
           bestReply
           isFirstReply
           isQuickReply
           properties
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
           tags
           postType
           author {
              id
              rating
              displayName
              company
              position
              location
              about
              avatar
              creationTime
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
           id
           tags
           postType
           author {
              id
              rating
              displayName
              company
              position
              location
              about
              avatar
              creationTime
           }
           rating
           postTime
           communityId
           title
           content
           commentCount
           replyCount
           replies (
             orderBy: postTime,
             orderDirection: desc,
             where: { isDeleted: false },
           ) {
             id
             author {
                id
                rating
                displayName
                company
                position
                location
                about
                avatar
                creationTime
             }
             rating
             postTime
             postId
             parentReplyId
             content
             commentCount
             comments (
              orderBy: postTime,
              orderDirection: asc,
              where: { isDeleted: false },
             ) {
               id
               author {
                  id
                  rating
                  displayName
                  company
                  position
                  location
                  about
                  avatar
                  creationTime
               }
               rating
               postTime
               postId
               parentReplyId
               content
               isDeleted
               properties
             }
             isDeleted
             isOfficialReply
             isBestReply
             isFirstReply
             isQuickReply
             properties
           }
           comments (
            orderBy: postTime,
            orderDirection: asc,
            where: { isDeleted: false },
           ) {
             id
             author {
                id
                rating
                displayName
                company
                position
                location
                about
                avatar
                creationTime
             }
             rating
             postTime
             postId
             parentReplyId
             content
             isDeleted
             properties
           }
           isDeleted
           officialReply
           bestReply
           isFirstReply
           isQuickReply
           properties
        }
      }
`;
