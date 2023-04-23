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
    communitydocumentation {
      id
      communityId
      title
      content
      creationTime
      author {
        id
        username
        displayName
        avatar
      }
    }
    post {
      id
      title
      content
      author {
        id
        username
        displayName
        avatar
      }
      creationTime
      community {
        id
        name
        avatar
      }
    }
    tag {
      id
      name
      postCount
    }
    usercommunity {
      id
      role
      user {
        id
        username
        displayName
        avatar
      }
    }
    usercommunityrating {
      id
      rating
      user {
        id
        username
        displayName
        avatar
      }
    }
`;

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
      commentTime
    }
    history {
      id
      postId
      eventType
      eventTime
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
      id
      tagId
      tag {
        id
        communityId
        name
        description
        postCount
        deletedPostCount
      }
    }
    reply {
      id
      author
      content
      replyTime
    }
`;

const tag = `
    id
    communityId
    name
    description
    postCount
    deletedPostCount
    ipfsHash
    ipfsHash2
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

export const postsQuery = `query {
    post {
      ${post}
    }
}`;
