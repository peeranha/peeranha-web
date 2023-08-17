import { postMeshShallow } from 'utils/mesh';

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
  ipfsHash
  ipfsHash2
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
      where: { isDeleted: "0" }
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
      where: { isDeleted: "0" }
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

export const userQuery = `query($id: String) {
    user(where: { id: $id }) {
      ${user}
    }
  }`;

export const usersQuery = `query {
    user {
      ${user}
    }
  }`;

export const communitiesQuery = `query {
    community {
      ${community}
    }
  }`;

export const communityQuery = `query($id: String) {
    community(where: { id: $id }) {
      ${community}
    }
  }`;

export const tagsQuery = `query {
    tag {
      ${tag}
    }
}`;

export const communityTagsQuery = `query($communityId: String) {
    tag(where: { communityId: $communityId }) {
      ${tag}
    }
  }`;

export const postsQuery = (postTypes: string) => `
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
      ${postMeshShallow}
    }
  }`;

export const postQuery = `
  query (
    $id: String,
  ) {
    post(where: { id: $id }) {
      ${post}
    }
}`;

export const historyIdQuery = `
  query (
    $id: String,
  ) {
    history(where: { id: $id }) {
      id
    }
}`;

export const postByIdQuery = `query($id: String) {
  post(where: { id: $id }) {
    ${post}
  }
}`;

export const postsByCommunityIdQuery = (postTypes: string, communityIds: string) => `
  query (
    $first: Int,
    $skip: Int
  ) {
    post (
      orderBy: { postTime: desc },
      limit: $first,
      offset: $skip,
      where: {isDeleted: "0", postType: "(${postTypes})", communityId: "(${communityIds})" },
    ) {
      ${postMeshShallow}
    }
}`;

export const followCommunityQuery = `query($userId: String) {
  usercommunity(where: { userId: $userId }) {
    ${usercommunity}
  }
}`;
