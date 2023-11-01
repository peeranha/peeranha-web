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
  const { userachievement, usercommunityrating, usercommunity, userpermission, ...user } = item;
  const achievements = userachievement?.map(({ achievementId }) => ({
    id: achievementId,
  }));
  return {
    ...user,
    id: user.id.toLowerCase(),
    achievements,
    ratings: usercommunityrating,
    followedCommunities: usercommunity
      ? usercommunity.map((community) => community.communityId)
      : [],
    permissions: userpermission ? userpermission.map((permission) => permission.permission) : [],
  };
};

const getCommentDataFromMesh = (item) => {
  const { user, ...comment } = item;
  return {
    ...comment,
    translations: comment.commenttranslation,
    author: getUserDataFromMesh(user[0]),
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
    author: user ? getUserDataFromMesh(user[0]) : {},
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

  const tags = posttag.map((postTag) => postTag.tag[0]);
  const replies = repliesMesh.map((reply) => getReplyDataFromMesh(reply, commentsMesh));
  const comments = commentsMesh
    ? commentsMesh
        .filter((comment) => comment.parentReplyId === 0)
        .map((comment) => getCommentDataFromMesh(comment))
    : [];

  return {
    ...post,
    tags,
    author: getUserDataFromMesh(user[0]),
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

export const getPostsDataFromMesh = ({ count_post, post }) => {
  const updatedPosts = post.map((postItem) =>
    renameRepliesToAnswers(getPostDataFromMesh(postItem)),
  );

  return {
    postCount: count_post,
    updatedPosts,
  };
};
