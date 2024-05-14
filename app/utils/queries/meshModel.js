export async function executeMeshQuery(props) {
  const response = await fetch(process.env.QUERY_INDEX_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  });

  return response.json();
}

export const getUserDataFromMesh = (item) => {
  const {
    userachievement,
    usercommunityrating,
    usercommunity,
    userpermission,
    communityBans,
    ...user
  } = item;

  return {
    ...user,
    id: user.id.toLowerCase(),
    achievements: userachievement,
    ratings: usercommunityrating.map((communityRating) => {
      if (communityBans?.includes(communityRating.communityId)) {
        return {
          communityId: communityRating.communityId,
          rating: -10,
        };
      }
      return communityRating;
    }),
    followedCommunities: usercommunity
      ? usercommunity.map((community) => community.communityId)
      : [],
    permissions: userpermission ? userpermission.map((permission) => permission.permission) : [],
    communityBans,
  };
};

const getCommentDataFromMesh = (item) => {
  const { user, ...comment } = item;
  return {
    ...comment,
    translations: comment.commenttranslation,
    author: getUserDataFromMesh(user),
  };
};

export const getReplyDataFromMesh = (item, postComments) => {
  const { replytranslation, user, ...reply } = item;
  const comments = postComments
    ? postComments
        .filter((comment) => comment.parentReplyId.toString() === reply.id.split('-')[2])
        .map((comment) => getCommentDataFromMesh(comment))
    : [];
  return {
    ...reply,
    author: user ? getUserDataFromMesh(user) : {},
    comments,
    translations: replytranslation,
  };
};

export const getPostDataFromMesh = (item) => {
  const {
    posttag,
    reply: repliesMesh,
    comment: commentsMesh,
    user,
    posttranslation,
    ...post
  } = item;

  const tags = posttag.map((postTag) => postTag.tag);
  const replies = repliesMesh.map((reply) => getReplyDataFromMesh(reply, commentsMesh));
  const comments = commentsMesh
    ? commentsMesh
        .filter((comment) => comment.parentReplyId === 0)
        .map((comment) => getCommentDataFromMesh(comment))
    : [];

  return {
    ...post,
    tags,
    author: getUserDataFromMesh(user),
    replies,
    comments,
    translations: posttranslation,
  };
};

export const renameRepliesToAnswers = (post) => {
  const { replies, ...rest } = post;

  return {
    ...rest,
    answers: replies,
  };
};

export const getHistoryDataFromMesh = (item) => {
  const { replyId, commentId, ...history } = item;
  const reply = replyId ? { id: replyId } : undefined;
  const comment = commentId ? { id: commentId } : undefined;

  return {
    ...history,
    reply,
    comment,
  };
};

export const getPostsDataFromMesh = ({ post, postsConnection }) => {
  const updatedPosts = post.map((postItem) =>
    renameRepliesToAnswers(getPostDataFromMesh(postItem)),
  );

  return {
    postCount: postsConnection.totalCount,
    updatedPosts,
  };
};
