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
    id
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
  postCount
  deletedPostCount`;

const post = `
    id
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
    comment {
      id
      author
      content
      postTime
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
    }
    user {
      ${user}
    }
    posttag {
      tag {
        ${tag}
      }
    }
    reply {
      id
      author
      content
      postTime
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
    deletedPostCount
    replyCount
    tagsCount
    followingUsers
    ipfsHash
    ipfsHash2
    tag {
      ${tag}
    }
    usercommunity {
      user {
        ${user}
      }
    }
    usercommunityrating {
      rating
      user {
        id
      }
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
      ${post}
    }
  }`;
