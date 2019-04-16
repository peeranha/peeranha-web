import messages from 'common-messages';

export default {
  questions: {
    sortBy: 'questions',
    order: 'desc',
    message: messages.questions,
  },
  answers: {
    sortBy: 'answers',
    order: 'desc',
    message: messages.answers,
  },
  tags: {
    sortBy: 'tags',
    order: 'desc',
    message: messages.tags,
  },
  oldest: {
    sortBy: 'date',
    order: 'ask',
    message: messages.oldest,
  },
  newest: {
    sortBy: 'date',
    order: 'desc',
    message: messages.newest,
  },
  subscribed: {
    sortBy: 'subscribers',
    order: 'desc',
    message: messages.subscribed,
  },
};
