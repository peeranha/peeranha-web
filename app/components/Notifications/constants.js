import answerIcon from 'images/answer.svg?inline';
import questionIcon from 'images/question2.svg?inline';
import bestAnswerIcon from 'images/bestAnswer.svg?inline';
import downVoteIcon from 'images/redFingerDownSingleQuestion.svg?inline';
import upVoteIcon from 'images/fingerUpSingleQuestionPage.svg?inline';
import coinsIcon from 'images/coins.svg?inline';

import messages from './messages';

export const ROW_HEIGHT = 40;
export const VERTICAL_OFFSET = 5 * ROW_HEIGHT;
export const NOTIFICATIONS_REQUEST_LIMIT = 20;
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

export const FILTER_UNREAD_TIMESTAMPS =
  'app/Notifications/FILTER_UNREAD_TIMESTAMPS';

export const NOTIFICATIONS_TYPES = {
  1: {
    ...messages.yourQuestionWasUpVoted,
    src: upVoteIcon,
  },
  2: {
    ...messages.yourQuestionWasDownVoted,
    src: downVoteIcon,
  },
  3: {
    ...messages.yourAnswerWasUpVoted,
    src: upVoteIcon,
  },
  4: {
    ...messages.yourAnswerWasDownVoted,
    src: downVoteIcon,
  },
  5: {
    ...messages.yourAnswerWasMarkedAsTheBest,
    src: bestAnswerIcon,
  },
  6: {
    ...messages.somebodyAnsweredYourQuestion,
    src: questionIcon,
  },
  7: {
    ...messages.somebodyLeftACommentToYourQuestion,
    src: questionIcon,
  },
  8: {
    ...messages.somebodyLeftACommentToYourAnswer,
    src: answerIcon,
  },
  9: {
    ...messages.yourQuestionWasTipped,
    src: coinsIcon,
  },
  10: {
    ...messages.yourAnswerWasTipped,
    src: coinsIcon,
  },
};
