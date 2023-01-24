export default {
  posts: {
    sortBy: 'postCount',
    order: 'desc',
    message: 'common.posts',
  },
  answers: {
    sortBy: 'replyCount',
    order: 'desc',
    message: 'common.answers',
  },
  tags: {
    sortBy: 'tags',
    order: 'desc',
    message: 'common.tags',
  },
  oldest: {
    sortBy: 'creationTime',
    order: 'asc',
    message: 'common.oldest',
  },
  newest: {
    sortBy: 'creationTime',
    order: 'desc',
    message: 'common.newest',
  },
  subscribers: {
    sortBy: 'followingUsers',
    order: 'desc',
    message: 'common.users',
  },
};
