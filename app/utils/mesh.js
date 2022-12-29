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
  const ratings = user.userCommunityRating;
  const achievements = user.userAchievement.map(({ achievementId }) => ({
    id: achievementId,
  }));
  delete user.userAchievement;
  delete user.userCommunityRating;
  return {
    ...user,
    achievements,
    ratings,
  };
};

const getCommentDataFromMesh = (comment) => ({
  ...comment,
  author: getUserDataFromMesh(comment.user[0]),
});

const getReplyDataFromMesh = (item) => {
  const reply = { ...item };
  const comments = reply.comment.map((comment) =>
    getCommentDataFromMesh(comment),
  );

  delete reply.comment;
  return {
    ...reply,
    author: getUserDataFromMesh(reply.user[0]),
    comments,
  };
};

export const getPostDataFromMesh = (item) => {
  const post = { ...item };
  const tags = post.postTag.map((postTag) => postTag.tagId);
  const replies = post.reply.map((reply) => getReplyDataFromMesh(reply));
  const comments = post.comment.map((comment) =>
    getCommentDataFromMesh(comment),
  );

  delete post.postTag;
  delete post.reply;
  delete post.comment;
  return {
    ...post,
    tags,
    author: getUserDataFromMesh(post.user[0]),
    replies,
    comments,
  };
};

export const renameRepliesToAnswers = (post) => {
  const result = { ...post, answers: post.replies };
  delete result.replies;
  return result;
};
