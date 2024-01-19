import { postMeshShallow } from 'utils/queries/QueriesMesh';

const suiNetworkId = '3';

const user = `
  id
  displayName
  postCount
  replyCount
  company
  position
  location
  about
  avatar
  creationTime
  customName
  walletAddress
  ipfsHash
  ipfsHash2
  networkId
  userachievement {
    id
    achievementId
  }
  usercommunity {
    id
    communityId
  }
  usercommunityrating {
    communityId
    rating
  }
  userpermission {
    id
    permission
  }
  userreward {
    id
    periodId
    tokenToReward
    isPaid
  }
`;

const tag = `id
  communityId
  name
  description
  postCount`;

const comment = `
  id
  id2
  parentReplyId
  author
  user {
    ${user}
  }
  content
  postTime
  ipfsHash
  language
  isDeleted
  commenttranslation {
    language
    content
  }`;

const reply = `
  id
  id2
  author
  user {
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
  ipfsHash
  handle
  messengerType
  language
  replytranslation {
    language
    content
  }
`;
// id - metadata
// id2 - private id
const post = `
    id
    id2
    ipfsHash
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
    handle
    messengerType
    language
    comment (
      condition: { isDeleted: false }
    ){
      ${comment}
    }
    history {
      postId
      eventName
      timeStamp
    }
    community {
      id
      name
      description
      website
      communitySite
      language
      avatar
      isFrozen
      creationTime
      postCount
      documentationCount
      replyCount
      tagsCount
      followingUsers
      ipfsHash
      ipfsHash2
      communitytranslation {
        communityId
        description
        enableAutotranslation
        id
        language
        name
      }
    }
    user {
      ${user}
    }
    posttag {
      tag {
        ${tag}
      }
    }
    reply (
      condition: { isDeleted: false }
    ) {
      ${reply}
    }
    posttranslation {
      language
      title
      content
    }
`;

const community = `
    id
    name
    description
    website
    communitySite
    language
    avatar
    isFrozen
    creationTime
    postCount
    documentationCount
    replyCount
    tagsCount
    followingUsers
    ipfsHash
    ipfsHash2
    tag {
      ${tag}
    }
    communitytranslation {
      communityId
      description
      enableAutotranslation
      id
      language
      name
    }
`;

const usercommunity = `
    id
    userId
    communityId
    user {
      ${user}
    }
    community {
      ${community}
    }
`;

export const userQuery = `
  query($id: String) {
    user(
      condition: {id: $id}
    ) {
      ${user}
    }
  }`;

export const usersQuery = `
  query {
    user(
      condition: {networkId: ${suiNetworkId}}
    ) {
      ${user}
    }
  }`;

export const usersByCommunityQuery = `
      query(
        $communityId: String,
      ) {
        usercommunityrating(
          condition: {communityId: $communityId}
        ) {
          user {
            ${user}
            postCount
            replyCount
          }
        }
      }`;

export const communitiesQuery = `query {
    community {
      ${community}
    }
  }`;

export const communityQuery = `query($id: String) {
    community(condition: {id: $id}) {
      ${community}
    }
  }`;

export const tagsQuery = `query {
    tag {
      ${tag}
    }
}`;

export const communityTagsQuery = `query($communityId: String) {
    tag(condition: {communityId: $communityId}) {
      ${tag}
    }
  }`;
//
export const postsQuery = (postTypes: string) => `
  query (
    $first: Int,
    $skip: Int
  ) {
    post (
      orderBy: POST_TIME_DESC
      first: $first,
      offset: $skip,
      condition: {
          isDeleted: false
      },
      filter: {
          postType: {
              in: [${postTypes}]
          }
      }
    ) {
      ${postMeshShallow}
    }
  }`;

export const postQuery = `
  query (
    $id: String,
  ) {
    post(condition: {id: $id}) {
      ${post}
    }
}`;

export const historyIdQuery = `
  query (
    $id: String,
  ) {
    history(condition: {id: $id}) {
      id
    }
}`;

export const postByIdQuery = `query($id: String) {
  post(condition: { id: $id }) {
    ${post}
  }
}`;
// todo
export const postsByCommunityIdQuery = (postTypes: string, communityIds: string) => `
  query (
    $first: Int,
    $skip: Int
  ) {
    post (
      condition: { isDeleted: false },
      filter: {
        postType: {
            in: [${postTypes}]
        },
        communityId: {
            in: [${communityIds}]
        }
      },
      first: $first,
      offset: $skip,
      orderBy: POST_TIME_DESC
    ) {
      ${postMeshShallow}
    }
}`;

export const followCommunityQuery = `query($userId: String) {
  usercommunity(condition: { userId: $userId }) {
    ${usercommunity}
  }
}`;
