import messages from 'common-messages';

export default {
  questions: {
    sortBy: 'questions_asked',
    order: 'desc',
    message: messages.questions,
  },
  answers: {
    sortBy: 'answers_given',
    order: 'desc',
    message: messages.answers,
  },
  tags: {
    sortBy: 'tags',
    order: 'desc',
    message: messages.tags,
  },
  oldest: {
    sortBy: 'creation_time',
    order: 'ask',
    message: messages.oldest,
  },
  newest: {
    sortBy: 'creation_time',
    order: 'desc',
    message: messages.newest,
  },
  subscribed: {
    sortBy: 'users_subscribed',
    order: 'desc',
    message: messages.subscribed,
  },
};
