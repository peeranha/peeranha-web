import messages from 'common-messages';

export default {
  posts: {
    sortBy: 'postCount',
    order: 'desc',
    message: messages.posts,
  },
  answers: {
    sortBy: 'replyCount',
    order: 'desc',
    message: messages.answers,
  },
  tags: {
    sortBy: 'tags',
    order: 'desc',
    message: messages.tags,
  },
  oldest: {
    sortBy: 'creationTime',
    order: 'asc',
    message: messages.oldest,
  },
  newest: {
    sortBy: 'creationTime',
    order: 'desc',
    message: messages.newest,
  },
  subscribed: {
    sortBy: 'followingUsers',
    //sortBy: 'users_subscribed',
    order: 'desc',
    message: messages.subscribed,
  },
};
