import answerIcon from 'images/answer.svg?external';
import questionIcon from 'images/question2.svg?external';
import bestAnswerIcon from 'images/bestAnswer.svg?external';
import downVoteIcon from 'images/redFingerDownSingleQuestion.svg?external';
import greenUpVoteIcon from 'images/greenFingerUpSingleQuestion.svg?external';
import coinsIcon from 'images/coins.svg?external';

import messages from './messages';

export const ROW_HEIGHT = 40;
export const VERTICAL_OFFSET = 5 * ROW_HEIGHT;
export const NOTIFICATIONS_REQUEST_LIMIT = 50;
export const MARK_AS_READ_DELAY = 1000;

export const MARK_ALL_NOTIFICATIONS_AS_READ =
  'app/Notifications/MARK_ALL_NOTIFICATIONS_AS_READ';
export const MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS =
  'app/Notifications/MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS';
export const MARK_ALL_NOTIFICATIONS_AS_READ_ERROR =
  'app/Notifications/MARK_ALL_NOTIFICATIONS_AS_READ_ERROR';

export const LOAD_MORE_UNREAD_NOTIFICATIONS =
  'app/Notifications/LOAD_MORE_UNREAD_NOTIFICATIONS';
export const LOAD_MORE_UNREAD_NOTIFICATIONS_SUCCESS =
  'app/Notifications/LOAD_MORE_UNREAD_NOTIFICATIONS_SUCCESS';
export const LOAD_MORE_UNREAD_NOTIFICATIONS_ERROR =
  'app/Notifications/LOAD_MORE_UNREAD_NOTIFICATIONS_ERROR';

export const LOAD_MORE_NOTIFICATIONS =
  'app/Notifications/LOAD_MORE_NOTIFICATIONS';
export const LOAD_MORE_NOTIFICATIONS_SUCCESS =
  'app/Notifications/LOAD_MORE_NOTIFICATIONS_SUCCESS';
export const LOAD_MORE_NOTIFICATIONS_ERROR =
  'app/Notifications/LOAD_MORE_NOTIFICATIONS_ERROR';

export const MARK_AS_READ_NOTIFICATIONS_ALL =
  'app/Notifications/MARK_AS_READ_NOTIFICATIONS_ALL';
export const MARK_AS_READ_NOTIFICATIONS_UNREAD =
  'app/Notifications/SET_READ_NOTIFICATIONS_UNREAD';

export const MARK_AS_READ_SUCCESS = 'app/Notifications/MARK_AS_READ_SUCCESS';
export const MARK_AS_READ_ERROR = 'app/Notifications/MARK_AS_READ_ERROR';

export const CLEAR_NOTIFICATIONS_DATA =
  'app/Notifications/CLEAR_NOTIFICATIONS_DATA';

export const SET_NOTIFICATIONS_INFO =
  'app/Notifications/SET_NOTIFICATIONS_INFO';

export const FILTER_READ_TIMESTAMPS =
  'app/Notifications/FILTER_UNREAD_TIMESTAMPS';

export const NOTIFICATIONS_TYPES = {
  questionUpvoted: 1,
  questionDownvoted: 2,
  answerUpvoted: 3,
  answerDownvoted: 4,
  answerMarkedTheBest: 5,
  questionAnswered: 6,
  questionCommented: 7,
  answerCommented: 8,
  questionTipped: 9,
  answerTipped: 10,
};

export const NOTIFICATIONS_DATA = {
  [NOTIFICATIONS_TYPES.questionUpvoted]: {
    ...messages.yourQuestionWasUpVoted,
    src: greenUpVoteIcon,
  },
  [NOTIFICATIONS_TYPES.questionDownvoted]: {
    ...messages.yourQuestionWasDownVoted,
    src: downVoteIcon,
  },
  [NOTIFICATIONS_TYPES.answerUpvoted]: {
    ...messages.yourAnswerWasUpVoted,
    src: greenUpVoteIcon,
  },
  [NOTIFICATIONS_TYPES.answerDownvoted]: {
    ...messages.yourAnswerWasDownVoted,
    src: downVoteIcon,
  },
  [NOTIFICATIONS_TYPES.answerMarkedTheBest]: {
    ...messages.yourAnswerWasMarkedAsTheBest,
    src: bestAnswerIcon,
  },
  [NOTIFICATIONS_TYPES.questionAnswered]: {
    ...messages.somebodyAnsweredYourQuestion,
    src: questionIcon,
  },
  [NOTIFICATIONS_TYPES.questionCommented]: {
    ...messages.somebodyLeftACommentToYourQuestion,
    src: questionIcon,
  },
  [NOTIFICATIONS_TYPES.answerCommented]: {
    ...messages.somebodyLeftACommentToYourAnswer,
    src: answerIcon,
  },
  [NOTIFICATIONS_TYPES.questionTipped]: {
    ...messages.yourQuestionWasTipped,
    src: coinsIcon,
  },
  [NOTIFICATIONS_TYPES.answerTipped]: {
    ...messages.yourAnswerWasTipped,
    src: coinsIcon,
  },
};
