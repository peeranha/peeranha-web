import messages from 'common-messages';

export default {
  questions: {
    sortBy: 'questionsAsked',
    order: 'desc',
    message: messages.questions,
  },
  answers: {
    sortBy: 'answersGiven',
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
    order: 'ask',
    message: messages.oldest,
  },
  newest: {
    sortBy: 'creationTime',
    order: 'desc',
    message: messages.newest,
  },
  subscribed: {
    sortBy: 'users_subscribed',
    order: 'desc',
    message: messages.subscribed,
  },
};
