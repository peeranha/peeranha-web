export async function executeMeshQuery(props) {
  const response = await fetch(process.env.MESH_QUERY_URL, {
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
  const user = { ...item };
  const ratings = user.usercommunityrating;
  const achievements = user.userachievement.map(({ achievementId }) => ({
    id: achievementId,
  }));
  delete user.userachievement;
  delete user.usercommunityrating;
  return {
    ...user,
    achievements,
    ratings,
  };
};

const getCommentDataFromMesh = (item) => {
  const comment = { ...item };
  const author = getUserDataFromMesh(item.user[0]);

  delete comment.user;
  return { ...item, author };
};

const getReplyDataFromMesh = (item, replyComments) => {
  const reply = { ...item };
  const comments = replyComments
    .filter(
      (comment) => comment.parentReplyId === Number(reply.id.split('-')[1]),
    )
    .map((comment) => getCommentDataFromMesh(comment));
  const author = getUserDataFromMesh(reply.user[0]);

  delete reply.comment;
  delete reply.user;
  return {
    ...reply,
    author,
    comments,
  };
};

export const getPostDataFromMesh = (item) => {
  const post = { ...item };
  const tags = post.posttag.map((postTag) => postTag.tagId);
  const replies = post.reply.map((reply) =>
    getReplyDataFromMesh(reply, post.comment),
  );

  const author = getUserDataFromMesh(post.user[0]);
  const comments = post.comment
    .filter((comment) => comment.parentReplyId === 0)
    .map((comment) => getCommentDataFromMesh(comment));

  delete post.posttag;
  delete post.reply;
  delete post.comment;
  delete post.user;
  return {
    ...post,
    tags,
    author,
    replies,
    comments,
  };
};

export const renameRepliesToAnswers = (post) => {
  const result = { ...post, answers: post.replies };
  delete result.replies;
  return result;
};

export const getHistoryDataFromMesh = (item) => {
  const history = { ...item };
  const reply = history.replyId ? { id: history.replyId } : undefined;
  const comment = history.commentId ? { id: history.commentId } : undefined;

  delete history.replyId;
  delete history.commentId;
  return {
    ...history,
    reply,
    comment,
  };
};
